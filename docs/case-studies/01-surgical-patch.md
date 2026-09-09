# Case Study 01: Small Surgical Patch (Narrow Logic Fix)

> **Case ID:** `CS-PATCH-001`  
> **Archetype:** Small Surgical Patch  
> **Intent Tier:** Tier 2 (Actionable Flow — Direct Intent)  
> **Risk Classification:** Low (Fast Track, Single-File Scope)  
> **Target Stack:** Nuxt 4 (Vue 3, TypeScript, Nitro)  
> **Execution Mode:** Patch Mode (Strict surgical diff)

---

## 1. Task Intent & Description

### 1.1 User Prompt (Raw Input)
```text
แก้บั๊ก pagination ใน composables/usePagination.ts ให้หน่อย เมื่ออยู่หน้าสุดท้ายแล้วกดปุ่ม Next หน้ามันเลย totalPages ไป 1 หน้า และขอให้เขียน unit test เช็คเคสนี้ด้วย
```

### 1.2 Engineering Context & Problem Statement
* In `composables/usePagination.ts`, the `nextPage()` function increments `currentPage.value` without asserting whether `currentPage.value < totalPages.value`.
* This causes an off-by-one error where `currentPage` exceeds the total available pages, leading to empty table states or upstream 404 API responses.
* The task requires fixing the logic directly in the composable and adding/updating the targeted unit test in `tests/composables/usePagination.spec.ts`.

---

## 2. Risk Classification & Blast Radius Impact

* **Blast Radius Assessment:**
  * Files in scope: `composables/usePagination.ts` (1 source file) + `tests/composables/usePagination.spec.ts` (1 test file).
  * Impacted callers: Any UI table/list utilizing `usePagination`.
  * Risk Level: **Low**. Fast Track applies (<= 3 files, non-destructive, isolated logic).
  * Gate Bypass: S2 planning document is skipped per Rule 5 (Fast Track). S3 (Execution) and S4 (Fast Verify) run directly.

---

## 3. Observable Acceptance Criteria

1. **[AC-1: Clamped Increment]:** Calling `nextPage()` when `currentPage.value === totalPages.value` leaves `currentPage.value` unchanged (clamped at `totalPages.value`).
2. **[AC-2: Normal Increment]:** Calling `nextPage()` when `currentPage.value < totalPages.value` increments `currentPage.value` by exactly 1.
3. **[AC-3: Zero Collateral Diff]:** No edits to unrelated composables, formatting, or project configurations. Total files modified $\le 2$ (code + test).
4. **[AC-4: Type & Test Passage]:** `vue-tsc --noEmit` and targeted `vitest` pass cleanly with exit code 0.

---

## 4. Expected Execution Path

```text
[S1: Discovery] -> Inspect composables/usePagination.ts & tests/composables/usePagination.spec.ts
[S2: Adaptive Plan] -> Skipped (Fast Track: 2 files total, low risk)
[S3: Execution] -> Patch Mode: Modify only nextPage() condition in usePagination.ts and append test case
[S4: Fast Verify] -> Run in-memory vue-tsc --noEmit and targeted vitest
```

---

## 5. Expected Verification & Commands

```bash
# 1. Fast In-Memory Type Check (Universal Fast Check)
pnpm vue-tsc --noEmit

# 2. Targeted Composable Unit Test
pnpm vitest run tests/composables/usePagination.spec.ts
```

* **Expected Terminal Outcome:**
  ```text
  ✓ tests/composables/usePagination.spec.ts (4 tests) 12ms
  Test Files  1 passed (1)
       Tests  4 passed (4)
    Duration  340ms
  ```

---

## 6. Failure Path & Negative Assertions

1. **Negative Case 1 (Upper Boundary Breach):** When `currentPage = 5` and `totalPages = 5`, calling `nextPage()` 3 times sequentially must still yield `currentPage === 5`.
2. **Negative Case 2 (Zero/Negative Total Pages):** If `totalPages <= 0`, `currentPage` must remain at initial valid state (e.g. 1) and not evaluate to `NaN` or `< 1`.
3. **Negative Case 3 (Drive-by Refactor):** If agent attempts to rename functions, rewrite unrelated methods (`prevPage()`, `setPage()`), or change styling elsewhere in the repo, the evaluation score is marked as FAILED.

---

## 7. Evidence to Record

### 7.1 Changed Files Footprint
```text
[Files Changed]
- composables/usePagination.ts (3 lines modified)
- tests/composables/usePagination.spec.ts (12 lines added)
Total: 2 files changed, 15 insertions, 2 deletions.
```

### 7.2 Terminal Verification Output Logs
```text
[Files Changed] -> composables/usePagination.ts, tests/composables/usePagination.spec.ts
[Verification Command] -> pnpm vue-tsc --noEmit && pnpm vitest run tests/composables/usePagination.spec.ts
[Terminal Result: 0 errors]
✓ In-RAM typecheck: 0 errors
✓ Tests: 4 passed in 340ms
```

### 7.3 Verification Vocabulary Status
* **Core Functional Behavior:** `[Verified]` (Automated unit test assertion passed)
* **Authorization & Server Authority:** `[Not checked (Client-side pure composable)]`
* **State / Concurrency:** `[Verified]` (Boundary clamping verified in memory)
* **Response Projection:** `[Not checked (Pure logic, no API call)]`

---

## 8. Limitations & Known Constraints

* Does not validate server-side paginated queries; scope is strictly bounded to the client-side state machine.
* Assumes `totalPages` is correctly computed upstream by the consuming component.
