# 04. Database Design & Operations Standards

> **Priority 4:** สถาปัตยกรรมฐานข้อมูล การจัดการข้อมูล และกระบวนการ Seeding ที่ปลอดภัย

---

## 🗄️ 1. Tools & ORM
- ใช้ **Prisma** หรือ **Drizzle** เป็น ORM หลักร่วมกับ PostgreSQL เพื่อความ Type-safe 100%
- **ห้ามแก้ไข Table ใน Database โดยตรง:** ทุกการเปลี่ยนแปลง Schema ต้องผ่านกระบวนการ Migration (`prisma migrate dev`) เสมอ
- **Migration Safety (ป้องกัน Data Loss):**
  - **ห้ามสร้าง Migration ที่ Drop Column / Drop Table / Rename Column โดยไม่ถามผู้ใช้ก่อน** — หากจำเป็นต้องลบหรือเปลี่ยนชื่อ ต้องแจ้งผลกระทบและขออนุมัติก่อนเสมอ
  - **เพิ่ม Column ใหม่ต้องมี Default Value หรือเป็น Optional (`?`)** เสมอ เพื่อป้องกัน NOT NULL Crash กับข้อมูลเดิมที่มีอยู่แล้ว
  - **ก่อนรัน `migrate deploy` บน Production:** ต้องรีวิว SQL ที่ Migration สร้างขึ้น (`prisma migrate diff`) ก่อนทุกครั้ง

---

## 📐 2. Schema Design & Naming Conventions
- **Table Names:** `PascalCase` เอกพจน์ (เช่น `User`, `OrderItem`)
- **Column Names:** ใน Prisma Schema ใช้ `camelCase` และแมปเป็น `snake_case` ใน Database ด้วย `@map` (เช่น `createdAt DateTime @map("created_at")`)
- **Foreign Keys:** `fk_{table}_{ref_table}`
- **Indexes:** `idx_{table}_{columns}` (ใส่ Index ให้กับคอลัมน์ที่ถูกค้นหาด้วย `WHERE`, `JOIN` หรือ `ORDER BY` บ่อยๆ)
- **Timestamps:** ทุก Table ต้องมี `created_at` และ `updated_at` เสมอ

---

## 🛡️ 3. Query Performance, Concurrency & Safety

- **ห้ามต่อ String Raw SQL เด็ดขาด:** ป้องกัน SQL Injection 100% โดยใช้ Parameterized Query หรือ ORM Methods
- **ป้องกันปัญหา N+1 Query:** ใช้ `include` หรือ `select` ใน Prisma เพื่อ Join ข้อมูลแทนการยิง Query ใน Loop
- **Transaction Management:**
  - ใช้ `prisma.$transaction()` เมื่อมีการเปลี่ยนแปลงข้อมูลมากกว่า 1 Table พร้อมกัน
  - กำหนด Timeout ของ Transaction (ไม่เกิน 5 วินาที) เพื่อป้องกัน Table Lock ค้าง
- **⚡ Concurrency Control & Lost Update Prevention (ป้องกัน Double-Spending & Overbooking):**
  - สำหรับ Table ที่มีความอ่อนไหวสูง เช่น กระเป๋าเงิน/ยอดเงินคงเหลือ (Wallet/Balance), สต็อกสินค้า (Stock/Inventory), หรือสถานะการจองห้อง (Room Booking):
    1. **Atomic Operations (อันดับแรก):** ใช้ `increment` / `decrement` ของ Prisma แทนการอ่านค่ามาบวกลบใน Javascript
    2. **Optimistic Concurrency Control (OCC):** ใส่คอลัมน์ `version Int @default(0)` ใน Schema และทำการ Update ด้วยเงื่อนไข:
       ```typescript
       const updated = await prisma.wallet.updateMany({
         where: { id: walletId, version: currentVersion },
         data: { balance: newBalance, version: { increment: 1 } },
       });
       if (updated.count === 0) throw new Error("CONCURRENCY_CONFLICT: ข้อมูลถูกเปลี่ยนแปลงโดยผู้อื่น กรุณาลองใหม่อีกครั้ง");
       ```
- **🚪 Automated Tenant Scoping (Prisma Client Extension):**
  - ในระบบ Multi-Tenant ให้สร้าง Scoped Prisma Client ผ่าน Extension แทนการใส่ `where: { tenantId }` ทีละจุด (ครอบคลุมทั้ง Query และ Mutation):
    ```typescript
    export const getTenantPrisma = (tenantId: string) =>
      prisma.$extends({
        query: {
          $allModels: {
            async $allOperations({ model, operation, args, query }) {
              if (['Room', 'Bill', 'Contract', 'Order'].includes(model)) {
                if (operation === 'create') {
                  args.data = { ...args.data, tenantId };
                } else if (operation === 'createMany') {
                  args.data = Array.isArray(args.data)
                    ? args.data.map((item: any) => ({ ...item, tenantId }))
                    : { ...args.data, tenantId };
                } else {
                  args.where = { ...args.where, tenantId };
                }
              }
              return query(args);
            },
          },
        },
      });
    ```
- **🔁 Webhook & Payment Slip Replay Prevention:**
  - ตารางที่บันทึกข้อมูลสลิปหรือ Transaction ธนาคาร **ต้องมี `@unique` Index ที่ `transactionRef` หรือ `slipHash`** เพื่อป้องกันการส่งสลิปเดิมซ้ำ (Replay Attack)

---

## 🌱 4. Centralized Seeding Strategy (Prisma Seeding)

เพื่อป้องกันปัญหา `npx prisma db seed` พัง และป้องกันข้อมูลทดสอบหลุดขึ้น Production ให้ใช้โครงสร้าง **Central Seeding Dispatcher**:

```text
prisma/
├── seed.ts           # 🌟 Main Entrypoint ที่ Prisma เรียกใช้
├── seeds/
│   ├── dev.seed.ts   # ข้อมูลจำลองและบัญชีทดสอบทุก Role สำหรับ Dev/Local
│   └── prod.seed.ts  # ข้อมูลเริ่มต้นระบบ (เฉพาะ Roles, Permissions, System Settings)
```

### 🔒 โค้ดมาตรฐานใน `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client'
import { seedDev } from './seeds/dev.seed'
import { seedProd } from './seeds/prod.seed'

const prisma = new PrismaClient()

async function main() {
  const env = process.env.APP_ENV || process.env.NODE_ENV || 'development'
  console.log(`🌱 Running seed for environment: ${env}`)

  // 1. รัน Production Master Seed เสมอ (Roles, Permissions)
  await seedProd(prisma)

  // 2. รัน Dev Mock Data เฉพาะเมื่อไม่ใช่ Production
  if (env === 'development' || env === 'test' || env === 'local') {
    await seedDev(prisma)
  } else {
    console.log('🔒 Production mode detected: Skipping mock user seeds.')
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

---

## 🗑️ 5. Soft Delete & Data Purge Policy
- ข้อมูลธุรกิจสำคัญห้าม Hard Delete (ใช้ `deleted_at DateTime?` แทน)
- ทุก Query ปกติต้องกรอง `WHERE deleted_at IS NULL` เสมอ (ใช้ Prisma `$extends` สร้าง Default Scope)
- **Unique Constraint with Soft Delete:** สร้าง Constraint แบบ `@@unique([email, deleted_at])` เพื่อให้สามารถสมัครด้วย Email เดิมได้หลังถูก Soft Delete
- **Cascading Soft Delete:** เมื่อ Soft Delete ข้อมูลแม่ ต้องทำการ Soft Delete ข้อมูลลูกที่เกี่ยวข้องใน Application Layer
- **Data Purge:** กำหนด Purge Job กวาดลบข้อมูลจริงหลังผ่านไป 90 วัน เพื่อความสอดคล้องกับกฎหมาย PDPA/GDPR

---

## 💾 6. Backup & Recovery Strategy
- ทำ Automated Backup ประจำวันด้วย `pg_dump` และ Continuous WAL Archiving
- **Retention Policy:** รายวันเก็บ 7 วันล่าสุด, รายสัปดาห์เก็บ 4 สัปดาห์, รายเดือนเก็บ 3 เดือน
- **Test Restore:** ซ้อมกู้คืนข้อมูลทดสอบบน Staging อย่างน้อยทุกไตรมาส (Quarterly)

---

## ⚡ 7. Connection Pooling & Resource Limits (Anti-Pool Exhaustion)

- **Connection Pool Overflow Prevention (กฎเหล็ก):**
  - ห้ามปล่อยให้ Prisma เชื่อมต่อฐานข้อมูลโดยไม่กำหนดขนาด Connection Pool บน Production เด็ดขาด
  - **Connection Limits Parameter:** ในไฟล์ `.env` ของ Production ต้องกำหนด `connection_limit` และ `pool_timeout` เสมอ:
    ```env
    # สำหรับ Container / VPS (กำหนดขนาด Pool ตาม Worker Instance)
    DATABASE_URL="postgresql://user:password@localhost:5432/dbname?connection_limit=5&pool_timeout=10"
    ```
- **Serverless & Cloud DB Pooling (Supabase / Neon / PgBouncer):**
  - **Application Runtime (Nitro / Next.js):** ต้องชี้ไปยัง **Transaction Pooler URL (เช่น Port 6543 บน Supabase)** เสมอ เพื่อให้ PgBouncer ช่วยจัดการสลับ Connection
  - **Prisma CLI & Migrations:** คำสั่ง `prisma migrate dev / deploy` ต้องใช้ Direct Connection URL (Port 5432) โดยแยกเป็นตัวแปร `DIRECT_URL` ใน `schema.prisma`:
    ```prisma
    datasource db {
      provider  = "postgresql"
      url       = env("DATABASE_URL")
      directUrl = env("DIRECT_URL")
    }
    ```

