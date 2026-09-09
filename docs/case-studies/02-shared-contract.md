# Case Study 02: Shared Contract & Cross-Layer API Change

> **Case ID:** `CS-CONTRACT-001`  
> **Archetype:** Shared Contract / API Change  
> **Intent Tier:** Tier 2 (Actionable Flow — Direct Intent)  
> **Risk Classification:** Medium (Atomic Dependency Chain Across Layers)  
> **Target Stack:** Next.js 15 (React 19, TypeScript, Zod, Route Handlers)  
> **Execution Mode:** Synthesis & Atomic Chain Propagation

---

## 1. Task Intent & Description

### 1.1 User Prompt (Raw Input)
```text
เราต้องการเพิ่มฟิลด์ mandatory ชื่อ auditReason (string, min 10 chars) และ optional departmentCode (string, max 5 chars) ใน API อัปเดตสิทธิ์ผู้ใช้ (POST /api/v1/users/[id]/roles) โดยต้องอัปเดต Zod DTO schema, Route Handler, และ Form component ฝั่งหน้าบ้านให้ส่งค่านี้ด้วย ห้ามใช้ as any เด็ดขาด
```

### 1.2 Engineering Context & Problem Statement
* Current role assignment endpoint accepts only `{ role: RoleEnum }`.
* Compliance audit requires capturing a non-empty `auditReason` whenever administrative roles are granted.
* Modifying the schema in isolation breaks either the server validation or the frontend form caller. The change must traverse the full stack:
  1. `types/role.contract.ts`: Zod schema and TypeScript inferred types.
  2. `app/api/v1/users/[id]/roles/route.ts`: Server route handler validation and payload processing.
  3. `features/user-management/components/UserRoleForm.tsx`: UI presenter input controls and submission payload.
  4. `tests/api/user-roles.spec.ts`: Server integration test verifying schema rejection and acceptance.

---

## 2. Risk Classification & Blast Radius Impact

* **Blast Radius Assessment:**
  * Files in scope: 4 files spanning contract, backend handler, frontend UI, and integration tests.
  * Risk Level: **Medium / Risk Override Triggered**.
  * Rule 5 Compliance: Because this modifies shared contracts across client and server boundaries, an executive plan (S2) with consumer mapping is required before code changes, even if file count is right at the 4-file threshold.

---

## 3. Observable Acceptance Criteria

1. **[AC-1: Contract Validation]:** Zod schema `UpdateUserRoleSchema` requires `auditReason` ($\ge 10$ chars) and accepts optional `departmentCode` ($\le 5$ chars).
2. **[AC-2: Server Handler Rejection]:** Route handler returns HTTP 400 with structured validation error when `auditReason` is missing or $< 10$ chars.
3. **[AC-3: Frontend Integration]:** `UserRoleForm.tsx` includes accessible textarea for `auditReason`, displays client-side validation hint, and passes payload conforming to the contract type.
4. **[AC-4: Type Purity (Zero Escape Hatches)]:** Zero instances of `as any`, `@ts-ignore`, or loose type casting introduced in modified files.
5. **[AC-5: End-to-End Type Safety]:** `pnpm tsc --noEmit` exits with 0 errors across both client and server codebases.

---

## 4. Expected Execution Path

```text
[S1: Discovery] -> Trace contract dependencies: types -> route -> presenter -> test
[S2: Adaptive Plan] -> Produce compact Task Spec & Blast-Radius mapping:
                       Contract: types/role.contract.ts
                       Server: app/api/v1/users/[id]/roles/route.ts
                       Client: features/user-management/components/UserRoleForm.tsx
                       Test: tests/api/user-roles.spec.ts
[S3: Execution] -> Atomic Dependency Chain:
                   Step 1: Update Zod schema & export DTO types
                   Step 2: Update Server Route Handler & service invocation
                   Step 3: Update Client Form Presenter
                   Step 4: Update API integration tests
[S4: Fast Verify] -> In-RAM tsc --noEmit + vitest tests/api/user-roles.spec.ts
```

---

## 5. Expected Verification & Commands

```bash
# 1. Full-Chain In-Memory Type Check
pnpm tsc --noEmit

# 2. Targeted API Integration Test
pnpm vitest run tests/api/user-roles.spec.ts
```

* **Expected Terminal Outcome:**
  ```text
  ✓ tests/api/user-roles.spec.ts (5 tests) 28ms
  Test Files  1 passed (1)
       Tests  5 passed (5)
    Duration  510ms
  ```

---

## 6. Failure Path & Negative Assertions

1. **Negative Case 1 (Short/Missing Audit Reason):** Submitting `{ role: "ADMIN", auditReason: "too short" }` must be rejected with HTTP 400 and validation message indicating minimum length of 10 characters.
2. **Negative Case 2 (Oversized Department Code):** Submitting `{ role: "ADMIN", auditReason: "Valid reason for promotion", departmentCode: "TOOLONG" }` must be rejected with HTTP 400.
3. **Negative Case 3 (Contract Bypass):** If client form tries to send payload using `data as any` to bypass TypeScript errors instead of properly typing the form hook, verification fails immediately.

---

## 7. Evidence to Record

### 7.1 Changed Files Footprint
```text
[Files Changed]
- types/role.contract.ts (+8, -2)
- app/api/v1/users/[id]/roles/route.ts (+12, -4)
- features/user-management/components/UserRoleForm.tsx (+22, -3)
- tests/api/user-roles.spec.ts (+18, -2)
Total: 4 files changed, 60 insertions, 11 deletions.
```

### 7.2 Terminal Verification Output Logs
```text
[Files Changed] -> types/role.contract.ts, app/api/v1/users/[id]/roles/route.ts, features/user-management/components/UserRoleForm.tsx, tests/api/user-roles.spec.ts
[Verification Command] -> pnpm tsc --noEmit && pnpm vitest run tests/api/user-roles.spec.ts
[Terminal Result: 0 errors]
✓ In-RAM tsc check: 0 errors
✓ Integration tests: 5 passed in 510ms
```

### 7.3 Verification Vocabulary Status
* **Core Functional Behavior:** `[Verified]` (Valid submissions succeed and persist)
* **Authorization & Server Authority:** `[Verified]` (Role mutation gated behind server auth guard)
* **Shared Contract Integrity:** `[Verified]` (Client form strictly matches backend Zod schema)
* **Response Projection:** `[Verified]` (Safe projection returned without leaking internal session hashes)

---

## 8. Limitations & Known Constraints

* Does not migrate historical database records (audit reasons are only required on future role mutations).
* Form styling adheres to existing Tailwind tokens without introducing custom external CSS libraries.
