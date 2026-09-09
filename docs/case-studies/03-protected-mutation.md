# Case Study 03: Protected Mutation, Durable State & Concurrency

> **Case ID:** `CS-MUTATE-001`  
> **Archetype:** Protected Mutation / Durable State  
> **Intent Tier:** Tier 2 (Guarded Actionable Flow) / Tier 3 Trigger Review  
> **Risk Classification:** High (Financial Ledger, OCC Concurrency, Server Authority)  
> **Target Stack:** Node.js 20, TypeScript, Prisma ORM, PostgreSQL  
> **Execution Mode:** Synthesis & Guarded Transaction Pipeline

---

## 1. Task Intent & Description

### 1.1 User Prompt (Raw Input)
```text
สร้าง backend handler สำหรับหักเงินในกระเป๋า (POST /api/v1/wallets/:id/debit) ต้องมีการเช็ค session จาก server (ห้ามเชื่อ actor จาก body), เช็คความเป็นเจ้าของ wallet, ป้องกัน race condition ด้วย OCC version column, บันทึกประวัติลง TransactionLedger แบบ immutable ใน Prisma transaction เดียวกัน timeout ไม่เกิน 5 วิ และต้องรองรับ Idempotency-Key
```

### 1.2 Engineering Context & Problem Statement
* A multi-tenant financial application requires debiting user balances safely.
* In concurrent environments, two simultaneous debit requests could read the same balance and execute two deductions, resulting in a negative balance or lost update if not protected by Optimistic Concurrency Control (OCC) or row locking.
* The endpoint must enforce strict server authority:
  1. Actor extracted solely from verified server session (`req.auth.userId`).
  2. Wallet ownership verified against `req.auth.tenantId`.
  3. `Idempotency-Key` header checked against cached/stored keys.
  4. Balance decrement and `TransactionLedger` record executed inside `prisma.$transaction()` with OCC version assertion.

---

## 2. Risk Classification & Blast Radius Impact

* **Blast Radius Assessment:**
  * Risk Level: **High**. Affects financial balances, durable ledger state, and security boundaries.
  * Rules Enforced:
    * Rule 1 (§4 Scope & Security Gates): Server authority mandatory; OCC required on contested financial state.
    * Rule 4 (Database Concurrency): Atomic transactions with explicit 5-second timeout.
    * Rule 3 (Quality Verify): Critical authorization and OCC failure paths must be **Verified** in automated integration tests, not merely statically inspected.

---

## 3. Observable Acceptance Criteria

1. **[AC-1: Server Authority]:** Session authentication is resolved server-side. Request body cannot override caller identity or tenant ID.
2. **[AC-2: Ownership Isolation]:** Requests attempting to debit a wallet belonging to another tenant or user return HTTP 403 Forbidden with zero balance changes.
3. **[AC-3: Atomic OCC Deduction]:** Debit executes via `UPDATE ... WHERE id = :id AND version = :expectedVersion AND balance >= :amount`. If version does not match, transaction aborts with HTTP 409 Conflict.
4. **[AC-4: Immutable Ledger Entry]:** Every successful debit generates an immutable record in `TransactionLedger` containing `walletId`, `amount`, `balanceBefore`, `balanceAfter`, and `actorId`.
5. **[AC-5: Idempotency Protection]:** Resubmitting the same request with identical `Idempotency-Key` returns the original result without executing a second debit.

---

## 4. Expected Execution Path

```text
[S1: Discovery] -> Inspect Prisma schema (Wallet, TransactionLedger) & session guard utilities
[S2: Adaptive Plan] -> Produce compact Task Spec with Security & Concurrency threat model:
                       - Auth & Tenant Boundary
                       - OCC Version Update Logic
                       - Prisma Transaction (timeout: 5000ms)
                       - Idempotency store integration
[S3: Execution] -> Implement 4-step pipeline:
                   1. Validate schema (Zod) & headers (Idempotency-Key)
                   2. Authorize via server session & tenant ownership
                   3. Execute atomic service transaction with OCC increment
                   4. Return structured response with safe projection
[S4: Fast Verify] -> In-RAM typecheck + integration suite with concurrent race simulation
```

---

## 5. Expected Verification & Commands

```bash
# 1. Fast In-Memory Type Check
pnpm tsc --noEmit

# 2. Targeted Concurrency & Security Test Suite
pnpm vitest run tests/integration/wallet-debit.spec.ts
```

* **Expected Terminal Outcome:**
  ```text
  ✓ tests/integration/wallet-debit.spec.ts (6 tests) 142ms
    ✓ rejects unauthenticated caller with 401
    ✓ rejects cross-tenant caller with 403
    ✓ rejects insufficient balance with 422
    ✓ executes valid debit and writes ledger atomically
    ✓ prevents double-debit via Idempotency-Key
    ✓ detects OCC version conflict under concurrent simulated race with 409
  Test Files  1 passed (1)
       Tests  6 passed (6)
    Duration  890ms
  ```

---

## 6. Failure Path & Negative Assertions

1. **Negative Case 1 (Spoofed Actor in Payload):** If client passes `{ actorId: "victim_user" }` in the JSON body, the server completely ignores it and strictly uses `req.auth.userId`. If an agent wires `actorId` from body, test must fail.
2. **Negative Case 2 (Cross-Tenant Access):** Calling debit on `wallet_tenant_B` using a session token for `tenant_A` must immediately abort with HTTP 403 before any balance query or transaction lock.
3. **Negative Case 3 (Concurrent Double-Spend):** When two identical debit requests of $100 arrive simultaneously against a wallet holding $100 with version 1:
   * Exactly ONE request must succeed (updating balance to 0, version to 2).
   * The second request must receive HTTP 409 Conflict (version mismatch) or 422 Unprocessable (insufficient funds), and must NOT leave balance at -$100.

---

## 7. Evidence to Record

### 7.1 Changed Files Footprint
```text
[Files Changed]
- server/api/v1/wallets/[id]/debit.post.ts (new route handler: +65 lines)
- server/services/wallet.service.ts (+48 lines)
- tests/integration/wallet-debit.spec.ts (+110 lines)
Total: 3 files changed, 223 insertions.
```

### 7.2 Terminal Verification Output Logs
```text
[Files Changed] -> server/api/v1/wallets/[id]/debit.post.ts, server/services/wallet.service.ts, tests/integration/wallet-debit.spec.ts
[Verification Command] -> pnpm tsc --noEmit && pnpm vitest run tests/integration/wallet-debit.spec.ts
[Terminal Result: 0 errors]
✓ In-RAM typecheck: 0 errors
✓ Integration tests: 6 passed (including concurrency & cross-tenant tests)
```

### 7.3 Verification Vocabulary Status
* **Core Functional Behavior:** `[Verified]` (Debit calculation & ledger persist passed)
* **Authorization & Server Authority:** `[Verified]` (401 & 403 test seams executed)
* **State / Concurrency / Idempotency:** `[Verified]` (OCC race condition and Idempotency key verified)
* **Response Projection:** `[Verified]` (Safe balance projection returned; internal secrets omitted)

---

## 8. Limitations & Known Constraints

* Uses in-memory or Redis-backed idempotency store; long-term key TTL configured to 24 hours.
* OCC retry loops (if implemented) must have an upper bound of 3 attempts with exponential backoff to avoid thread starvation under extreme burst contention.
