# 🛡️ Modular Stack Adapter: Backend & Data Architecture (Node / Prisma / PostgreSQL)

> **Apex v6.1.0 Adapter Module · Domain: Server API, Database ORM & Backend Security**
> Covers Node.js runtimes, TypeScript server engines (Nitro, Express, Next Route Handlers), Prisma ORM, PostgreSQL, Server Session Guards, Concurrency Control, Idempotency, and Pragmatic OOP Patterns.

---

## 🎯 1. Trigger Conditions (Detection Gate)

Activate this adapter when ANY of the following conditions are met:
- **Primary Manifest:** `package.json` contains dependencies or devDependencies:
  - `@prisma/client`, `prisma`, `@prisma/adapter-pg`
  - `drizzle-orm`, `pg`, `postgres`
  - `better-auth`, `@better-auth/prisma-adapter`
  - `zod`, `h3`, `express`, `fastify`
- **File Signatures:**
  - `prisma/schema.prisma`
  - `server/api/`, `server/services/`, `server/middleware/`, `server/utils/prisma.ts`
  - `app/api/v1/*/route.ts`, `src/services/`
  - `shared/contracts/*.contract.ts`
- **High-Risk Override Gate:** Regardless of file count, if an edit touches Auth, RBAC, Financial/PII mutations, Database schemas, Concurrency (OCC/atomic), or API breaking contracts, this adapter MUST be loaded.

---

## 🏛️ 2. Architectural Boundaries & Clean Separation

- **In Scope:**
  - Standard 4-step API handler pipeline (`Validate` $\to$ `Authorize` $\to$ `Service` $\to$ `Structured Response`).
  - Database schema modeling, migrations safety, and connection pooling.
  - Multi-table transactions, atomic increments, and Optimistic Concurrency Control (OCC).
  - Multi-tenant data isolation via Prisma Client Extensions (`$extends`).
  - Idempotency guarantees, webhook replay prevention, and timing-safe signature validation.
  - Centralized seeding architecture (`prod.seed.ts` vs `dev.seed.ts`).
  - Safe data egress and PII masking (`templates/utils/mask.ts`).
  - Pragmatic OOP patterns (Strategy, Adapter, State, Facade) when $\ge 3$ variants exist.
- **Out of Scope (Zero Cross-Domain Pollution):**
  - UI templates, CSS/Tailwind layouts, and frontend components $\to$ Delegated to `adapters/web-fullstack.md`.
  - Python / C# / Shell runtimes $\to$ Delegated to `adapters/polyglot-core.md`.

---

## 📐 3. Core Architecture Rules & Patterns

### A. Standard 4-Step Handler Pipeline
Every protected backend handler must execute in order:
`Validate (Zod)` $\longrightarrow$ `Authorize (Server Session & Role)` $\longrightarrow$ `Service Layer Execution` $\longrightarrow$ `Structured Response`

```typescript
// server/api/v1/orders/index.post.ts
export default defineEventHandler(async (event): Promise<ApiResponse<OrderResponse>> => {
  // 1. Session & Role Guard (Server Authority)
  const session = await requireAuthSession(event);
  requireRole(session, ['ADMIN', 'MANAGER']);

  // 2. Schema Validation (Fail Fast)
  const body = await readValidatedBody(event, CreateOrderSchema.parse);

  // 3. Service Layer Execution (Pass tenantId & validated DTO)
  const order = await processOrderTransaction(session.user.tenantId, body);

  // 4. Structured Safe Response
  return { success: true, data: order, error: null };
});
```

### B. Database Safety & Migration Gates
- **Tier 3 Destructive Gate:** Never drop columns, tables, or truncate databases without explicit blast radius assessment and explicit user approval.
- **Pre-Flight Schema Grounding Check:** NEVER hallucinate database fields. You MUST use a tool to read the schema file (e.g., `schema.prisma` or `drizzle.schema.ts`) before writing database logic or specifications.
- **Backward-Compatible Columns:** New columns added to existing production tables must be optional (`?`) or have `@default(...)` values.
- **Prisma 7 Driver Adapter Rule:** In Prisma v7+, configure the driver adapter explicitly (`new PrismaClient({ adapter: new PrismaPg(pool) })`) inside a shared singleton (`server/utils/prisma.ts`).
- **Index Placement Strategy:** Place `@@index` on frequently filtered foreign keys, `tenantId`, `status`, and sorting timestamps (`createdAt`). Avoid blanket unmeasured indexing.

### C. Concurrency Control & Transaction Safeguards
For contested resources (wallets, inventory stock, booking seats):
1. **Atomic In-Database Operations:** Use Prisma's `increment` / `decrement` instead of memory-based read-modify-write.
2. **Optimistic Concurrency Control (OCC):** Add a `version Int @default(0)` column. Execute conditional updates:
   ```typescript
   const updated = await prisma.wallet.updateMany({
     where: { id: walletId, version: currentVersion },
     data: { balance: newBalance, version: { increment: 1 } },
   });
   if (updated.count === 0) {
     throw createError({ statusCode: 409, statusMessage: 'CONCURRENCY_CONFLICT: Record modified by another process. Please retry.' });
   }
   ```
3. **Transaction Timeouts:** Wrap multi-table mutations in `prisma.$transaction()` with a strict 5-second timeout (`{ timeout: 5000 }`).

### D. Automated Multi-Tenant Query Scoping
In multi-tenant systems, prevent IDOR/BOLA leaks at the data layer using Prisma extensions (`$extends.query`):
- Automatically inject `tenantId` into `create`, `createMany`, `findMany`, and `update` operations.
- Never trust client-supplied `tenantId` or user IDs for scoped operations.

### E. Idempotency & Webhook Replay Prevention
- **Idempotency Key Header:** High-impact mutations must accept `Idempotency-Key: <UUID>`. Cache keys and responses for 24 hours.
- **Webhook Deduplication:** Persist webhook events with `@unique` index on `transactionRef` or `slipHash` to prevent double processing.
- **HMAC Signature Verification:** Webhook endpoints must verify incoming payloads using timing-safe comparisons (`crypto.timingSafeEqual`) before parsing data.

### F. Pragmatic OOP & Design Patterns in Backend Services
Apply the **Rule of Three ($\ge 3$ concrete variants)** before adopting patterns:
1. **Strategy Pattern:** Use an interface for interchangeable business operations:
   ```typescript
   export interface PaymentStrategy {
     process(amount: number, orderId: string): Promise<PaymentResult>;
   }
   export class StripeStrategy implements PaymentStrategy { /* ... */ }
   export class PromptPayStrategy implements PaymentStrategy { /* ... */ }
   export class OmiseStrategy implements PaymentStrategy { /* ... */ }
   ```
2. **Adapter Pattern:** Encapsulate third-party services behind a unified internal contract:
   ```typescript
   export interface StorageAdapter {
     upload(path: string, buffer: Buffer): Promise<string>;
   }
   export class S3StorageAdapter implements StorageAdapter { /* ... */ }
   export class CloudflareR2Adapter implements StorageAdapter { /* ... */ }
   ```
3. **State Pattern:** Manage discrete domain states with transition guards:
   ```typescript
   export interface OrderState {
     cancel(order: Order): Promise<void>;
     ship(order: Order): Promise<void>;
   }
   ```
4. **Facade Pattern:** Unify multi-service operations into a clean entry point:
   ```typescript
   export class CheckoutFacade {
     constructor(private payment: PaymentService, private inventory: InventoryService, private notify: NotificationService) {}
     async execute(orderId: string, userId: string) { /* ... */ }
   }
   ```

### G. SQL Injection & Dynamic Query Safety
- Prefer Prisma/Drizzle query builders. Bind every data value in raw SQL; never concatenate user input into query text or pass it to `$queryRawUnsafe` / `$executeRawUnsafe`.
- SQL identifiers and sort directions cannot be bound as values. Map client choices through a fixed allowlist to known columns/directions; never accept table or column names directly.
- Preserve intentional `LIKE` search semantics; parameter binding prevents SQL syntax injection but does not remove wildcard behavior.

### H. Personal Data Lifecycle
- Collect and return only personal data required for the feature's stated purpose. Treat masking as a presentation safeguard, not a substitute for access control or minimization.
- Before adding personal-data fields, identify project-approved retention and deletion rules and where they apply (including exports and derived records). Follow the project's process for access, correction, restriction, or deletion requests and legal holds; escalate unclear policy to the owner.
- Keep personal data out of logs and error payloads. Review processors and external data transfers against the project's approved privacy requirements; escalate suspected exposure through its incident process.

---

## ⚡ 4. Fast Targeted In-Memory Verification

- **Fast TypeCheck Gate:** `pnpm tsc --noEmit` via detected package manager.
- **Target Environment Sanity Check:** Before executing ANY tests or scripts that mutate state, you MUST verify the `.env` file. If external cloud environments or remote databases (e.g., Supabase, AWS) are detected, HALT and request explicit user confirmation to prevent accidental production mutations.
- **Targeted Integration Tests:** Run single-file tests targeting modified API route handlers (e.g., `pnpm vitest run tests/server/orders.test.ts`).
- **Never Run Full Production Build:** Do not execute `pnpm build` for isolated API or database service tweaks.
