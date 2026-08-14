# Database Design & Operations

> กฎเกณฑ์และข้อปฏิบัติด้าน Database

## 1. Schema Design
- ออกแบบโดยคำนึงถึง Data Normalization เบื้องต้น
- Naming Convention ต้องสอดคล้องกัน (เช่น snake_case สำหรับคอลัมน์ใน RDBMS, camelCase สำหรับ JSON Object ใน NoSQL)
- ต้องมี Timestamp พื้นฐานเสมอ เช่น `created_at`, `updated_at`

## 2. Tools & ORM
- พยายามใช้ ORM ที่ Type-safe เช่น **Prisma** หรือ **Drizzle** เมื่อทำงานร่วมกับ TypeScript
- ทุก Schema ต้องมี Migration history ห้ามแก้ Table ตรงๆ โดยไม่ผ่านกระบวนการ Migration

## 3. Query Performance & Safety
- **ห้าม** ยิง Raw SQL ด้วย String Concatenation เด็ดขาด เพื่อป้องกัน SQL Injection (ให้ใช้ Parameterized query หรือ Query Builder แทน)
- คำนึงถึง Indexing เสมอสำหรับคอลัมน์ที่ถูกใช้ใน `WHERE`, `JOIN` หรือ `ORDER BY` บ่อยๆ

## 4. Soft Deletion
- ข้อมูลสำคัญห้าม Hard Delete (ใช้ `deleted_at` หรือ `is_active: false` แทน)

## 5. Backup & Recovery
- ต้องมี automated backup สำหรับ production database เสมอ (ดูรายละเอียด Retention Policy, Automation, Storage ที่ `rules/infrastructure.md` — Section 6)
- **Database-specific:** ใช้ `pg_dump` สำหรับ logical backup + Continuous WAL archiving สำหรับ Point-in-time Recovery (PostgreSQL)
- ต้อง test restore อย่างน้อยทุก quarter เพื่อยืนยันว่า backup ใช้ได้จริง
- Document ขั้นตอน recovery ไว้ใน runbook (รวมถึง connection strings, restore commands, verification steps)

## 6. Transaction Management
- ใช้ Transaction เมื่อมีการเปลี่ยนแปลงข้อมูลมากกว่า 1 table พร้อมกัน (atomicity)
- ใช้ Transaction เมื่อต้องการ read-then-write consistency
- Prisma: ใช้ `prisma.$transaction()` สำหรับ interactive transactions
- ตั้ง timeout ให้ transaction (เช่น 5 วินาที) ป้องกัน long-running locks
- ระวัง deadlock: access tables ในลำดับเดียวกันเสมอ
- Isolation level: ใช้ `Read Committed` เป็น default (PostgreSQL default)

## 7. Connection Management
- ใช้ Connection Pooling เสมอ (Prisma มี built-in, หรือใช้ PgBouncer สำหรับ production)
- กำหนด pool size ตาม: `pool_size = (num_cores * 2) + effective_spindle_count` (rule of thumb)
- Connection timeout: 5 วินาที
- Idle timeout: 10 นาที
- ตรวจสอบ connection health ก่อนใช้งาน (validation query)

## 8. Data Seeding
- Development seed: ข้อมูลจำลองสำหรับพัฒนา ใส่ไว้ใน `prisma/seed.ts`
- Test fixtures: ข้อมูลสำหรับ automated tests (แยกจาก dev seed)
- Production seed: ข้อมูลเริ่มต้นที่จำเป็น (เช่น roles, permissions, default settings)
- ห้ามใส่ข้อมูลส่วนบุคคลจริงใน seed files
- Seed ต้อง idempotent (รันซ้ำได้โดยไม่ duplicate)

## 9. Soft Delete (Extended)
- ทุก query ปกติต้อง filter `WHERE deleted_at IS NULL` เสมอ (ใช้ Prisma middleware หรือ `$extends` สร้าง default scope)
- Unique constraints ต้องรวม `deleted_at` ด้วย: `@@unique([email, deleted_at])` เพื่อให้สร้าง record ใหม่ด้วย email เดิมได้หลัง soft delete
- Cascading soft delete: เมื่อ soft delete parent ต้อง soft delete children ด้วย (implement ใน application layer)
- Data Purge Policy: กำหนดเวลาที่จะ hard delete จริง (เช่น 90 วันหลัง soft delete) สำหรับ PDPA/GDPR compliance

## 10. Naming Conventions (Extended)
- Table names: `PascalCase` singular (Prisma convention) เช่น `User`, `OrderItem`
- Column names: `camelCase` ใน Prisma schema → map เป็น `snake_case` ใน DB ด้วย `@map`
- Index names: `idx_{table}_{columns}` เช่น `idx_user_email`
- Foreign key names: `fk_{table}_{ref_table}` เช่น `fk_order_user`
- Migration files: ใช้ timestamp + descriptive name (Prisma auto-generates)
- Enum names: `PascalCase` เช่น `OrderStatus`
