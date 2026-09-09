# Case Study Specification Template

> **Apex Protocol Real-World Validation Framework**  
> Use this template to document and execute validation trials against real codebases.

---

## 1. Metadata & Classification

* **Case ID:** `CS-[ARCHETYPE]-[NUMBER]` (e.g., `CS-PATCH-001`)
* **Title:** Concise, descriptive title of the engineering task
* **Archetype:** `[Small Surgical Patch | Shared Contract / API | Protected Mutation | Read-Only Audit]`
* **Intent Tier:** `[Tier 1 (Read-Only) | Tier 2 (Actionable Flow) | Tier 3 (Guarded Destructive Gate)]`
* **Risk Classification:** `[Low (Fast Track) | Medium (Atomic Chain) | High (Guarded State/Security) | Critical/Destructive]`
* **Target Repository & Stack:** `[e.g., Nuxt 4 (Vue 3, Nitro, Prisma) | Next.js 15 (React 19, App Router) | Polyglot / Backend]`
* **Execution Mode:** `[Patch Mode | Synthesis Mode | Audit / Read-Only]`

---

## 2. Task Intent & Description

### 2.1 User Prompt (Raw Input)
```text
[Exact verbatim prompt submitted by user/developer]
```

### 2.2 Engineering Context & Problem Statement
* Describe the starting state of the codebase.
* State why the change or diagnosis is needed.
* Define relevant architectural boundaries and affected layers.

---

## 3. Observable Acceptance Criteria

State between 2 and 5 concrete, binary-verifiable criteria. Avoid vague statements like "works well" or "clean code".

1. **[AC-1: Functional / State]:** Specific observable runtime behavior or output when input $X$ is provided.
2. **[AC-2: Boundary / Contract]:** Type signature, schema contract, or HTTP status returned.
3. **[AC-3: Scope Invariance]:** Exactly $N$ files modified; zero changes to unrelated modules or formatting.
4. **[AC-4: Security / Authority (If Applicable)]:** Server-side guard enforces session/role check prior to state transition.

---

## 4. Expected Execution Path & Protocol Gates

* **Discovery (S1):** Relevant files located without full codebase traversal.
* **Planning (S2):**
  * *Fast Track (1-3 files):* Skipped directly to S3.
  * *Heavy Track (4+ files or High Risk):* Executive plan stated with blast-radius summary.
* **Execution (S3):** Surgical diff or Feature Module Separation applied.
* **Verification (S4):** Targeted fast in-RAM typecheck and test executed.

---

## 5. Expected Verification & Commands

List the exact fast in-RAM type checks and targeted tests to run. Do NOT run full production builds unless build config changed.

```bash
# 1. Targeted Fast In-Memory Type Check
pnpm vue-tsc --noEmit # Or: pnpm tsc --noEmit / pytest -q / node --check

# 2. Targeted Behavior Test (Specific test suite only)
pnpm vitest run tests/unit/<feature>.spec.ts
```

* **Expected Terminal Outcome:**
  * Clean exit code (`0`)
  * `0 errors, 0 warnings` on touched files
  * Target test passing with specified assertions

---

## 6. Failure Path & Negative Assertions

Identify explicitly what MUST fail or be rejected to prevent security flaws, data corruption, or regressions:

1. **Negative Case 1 (Unauthorized / Invalid Input):** When unauthenticated actor or malformed payload is passed, system must reject with expected error code (e.g. `401 Unauthorized` or `400 Bad Request`) without mutating state.
2. **Negative Case 2 (Concurrency / Race Hazard):** Contested or stale version mutation must abort with `409 Conflict` rather than overwriting data.
3. **Negative Case 3 (Scope Leak):** Editing files outside the designated boundary is flagged as a failure.

---

## 7. Evidence to Record

Mandatory evidence required before marking task complete (per Rule 3 & `skills/quality-verify`):

### 7.1 Changed Files Footprint
```text
[Files Changed]
- path/to/file1.ts (+X, -Y)
- path/to/file2.ts (+A, -B)
```

### 7.2 Terminal Verification Output Logs
```text
[Verification Command] -> [Terminal Result]
$ <command executed>
<paste raw stdout/stderr here>
```

### 7.3 Verification Vocabulary Status
* **Core Functional Behavior:** `[Verified]`
* **Authorization & Server Authority:** `[Verified | Static only | Not checked (Reason)]`
* **State / Concurrency / Idempotency:** `[Verified | Static only | Not checked (Reason)]`
* **Response Projection:** `[Verified | Static only | Not checked (Reason)]`

---

## 8. Limitations & Known Constraints

* Environmental prerequisites (e.g., local database container, seeded test records).
* Mock boundaries (e.g., third-party payment gateway mocked via MSW or local stub).
* Inherent trade-offs acknowledged during this implementation.
