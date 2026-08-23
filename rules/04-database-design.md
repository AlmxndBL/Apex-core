# 04. Database Design & Operations Standards

> **Priority 4:** Database architecture, relational modeling, data integrity, and safe seeding strategies.

---

## 🗄️ 1. Tools & ORM
- Use **Prisma** or **Drizzle** with PostgreSQL for 100% static type safety.
- **Never modify database tables directly:** All schema changes must go through versioned migrations (`prisma migrate dev`).
- **Migration Safety:**
  - **Never drop columns, tables, or rename columns without explicit user approval.**
  - **New columns must have default values or be optional (`?`)** to prevent NOT NULL crashes against existing production rows.
  - Review generated SQL (`prisma migrate diff`) before applying migrations to production.

---

## 📐 2. Schema Design & Naming Conventions
- **Table Names:** `PascalCase` singular (e.g. `User`, `OrderItem`).
- **Column Names:** `camelCase` in Prisma schema, mapped to `snake_case` in SQL via `@map` (e.g. `createdAt DateTime @map("created_at")`).
- **Foreign Keys:** `fk_{table}_{ref_table}`.
- **Indexes:** `idx_{table}_{columns}` (place indexes on frequently filtered, joined, or ordered columns).
- **Timestamps:** Every table must include `created_at` and `updated_at`.

---

## 🛡️ 3. Query Performance, Concurrency & Safety
- **No Raw String SQL Concatenation:** Prevent SQL injection by using parameterized queries or ORM methods.
- **Prevent N+1 Queries:** Use `include` or explicit `select` to join relations rather than querying inside loops.
- **Transaction Management:**
  - Wrap multi-table state mutations in `prisma.$transaction()`.
  - Enforce transaction timeouts (under 5 seconds) to prevent prolonged table locks.
- **⚡ Concurrency Control & Lost Update Prevention:**
  - For sensitive balance, stock, or booking tables:
    1. **Atomic Operations:** Use Prisma's `increment` / `decrement` instead of read-modify-write in application memory.
    2. **Optimistic Concurrency Control (OCC):** Add a `version Int @default(0)` column and perform conditional updates:
       ```typescript
       const updated = await prisma.wallet.updateMany({
         where: { id: walletId, version: currentVersion },
         data: { balance: newBalance, version: { increment: 1 } },
       });
       if (updated.count === 0) throw new Error("CONCURRENCY_CONFLICT: Record modified by another process. Please retry.");
       ```
- **🚪 Automated Tenant Scoping (Prisma Client Extension):**
  - Enforce tenant isolation automatically via Prisma extensions rather than manual `where: { tenantId }` clauses:
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
  - Tables storing payment transactions or webhook events must enforce `@unique` indexes on `transactionRef` or `slipHash`.

---

## 🌱 4. Centralized Seeding Strategy (Prisma Seeding)

To prevent `npx prisma db seed` failures and avoid test data polluting production, use a **Central Seeding Dispatcher**:

```text
prisma/
├── seed.ts           # 🌟 Main entry point called by Prisma
├── seeds/
│   ├── dev.seed.ts   # Mock fixtures and test accounts for local dev
│   └── prod.seed.ts  # System essentials (Roles, Permissions, Settings)
```

### 🔒 Standard `prisma/seed.ts` Pattern:
```typescript
import { PrismaClient } from '@prisma/client'
import { seedDev } from './seeds/dev.seed'
import { seedProd } from './seeds/prod.seed'

const prisma = new PrismaClient()

async function main() {
  const env = process.env.APP_ENV || process.env.NODE_ENV || 'development'
  console.log(`🌱 Running seed for environment: ${env}`)

  // 1. Run Production Master Seed (Roles, Permissions)
  await seedProd(prisma)

  // 2. Run Mock Fixtures strictly in Development / Test
  if (env === 'development' || env === 'test') {
    await seedDev(prisma)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```
