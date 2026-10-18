---
name: quality-verify
description: Fast In-Memory Verification Engine, Vitest / Sandbox Testing, 2-Strike Loop-Breaker, and Evidence Delivery
---

# Quality Verification & Fast Test Engine Skill (v6.1.0)

> In-memory verification protocols (Universal Definition of Done) with fast targeted checks and automated loop-breaking safeguards.

---

## 1. Tiered Verification Strategy (Fast In-Memory First)

* [FORBIDDEN] **Never run full production builds (`npm run build` / `next build` / `nuxt build`)** for minor single-file edits.
* [STANDARD] **Fast In-Memory TypeCheck (Targeted & Incremental):**
  * **Nuxt / Vue 3:** `pnpm vue-tsc --noEmit` (or `npm`/`bun` matching lockfile)
  * **React / Next.js:** `pnpm tsc --noEmit` (or `npm`/`bun` matching lockfile)
  * **Polyglot / Other Stacks:** Run language-specific checks (e.g. `pytest -q`, `go test`, `node --check`).
* [STANDARD] **Targeted Behavior Test:** Run the smallest test suite that observes the changed behavior, direct affected callers/consumers, and a justified failure path. Modified files help locate tests; they do not define the full test scope.
* [STANDARD] **Risk-Based Scope:** Strengthen verification for shared contracts, auth/RBAC, money, PII, durable state, schema/database work, concurrency, and cross-layer user journeys, even if only one file changed.

---

## 2. Mandatory Evidence Delivery & Strict Seam Taxonomy

* Never mark a task as complete without attaching actual **Terminal Output Logs**.
* **Strict Seam Taxonomy (4 Levels of Verification Truth):**
  1. `[Verified: Test]`: Function-specific automated test suite ran and observed the exact changed logic.
  2. `[Verified: Compiler]`: In-RAM typecheck passed (`tsc`, `vue-tsc`, `mypy`). Confirms type contract only; never claim logic is tested.
  3. `[Syntax-Only]`: Script grammar/syntax check passed (`node --check`, `py_compile`, `bash -n`) for dynamic or untyped codebases.
  4. `[Unverified: Visual]`: Visual UI, CSS styling, or copy edits. Never mask with fake commands. Provide responsive viewport coordinates for human visual review.
* **Graceful Fallback Ladder:** Finish tasks at the highest verified seam genuinely present in the repository. Never stall, refuse completion, or inject unrequested test libraries into a repo without test tooling.
* Required Delivery Format:
  ```text
  [Files Changed] -> [Seam: Level] -> [Verification Command] -> [Terminal Result: 0 errors]
  ```

## 3. Adaptive Post-Implementation Review

Review the result on two independent axes:

1. **Acceptance:** Does the changed behavior meet the task's observable acceptance criteria without scope creep?
2. **Standards & Risk:** Does the diff follow project conventions and avoid relevant regression, security, state, or usability defects?

Always check:

* **Acceptance:** Recheck the requested outcome and each applicable acceptance criterion.
* **Diff & Impact:** Confirm the change is within scope and recheck direct affected callers/consumers for regressions.
* **Evidence:** Run the required terminal verification. Static inspection never substitutes for this evidence.

Open only the modules that match the change:

* **Async UI:** loading, empty, error, retry, and stale-result behavior.
* **Form or mutation:** client/server validation, pending state, duplicate action prevention, failure feedback, and post-success data refresh.
* **API or protected action:** input validation, server-side authorization, safe response projection, and expected error status.
* **Persistent or concurrent state:** allowed transition, partial-failure behavior, idempotency/OCC, and audit requirements where applicable.
* **Shared contract:** direct callers remain compatible and error/data shapes remain intentional.
* **Layout or interaction:** relevant viewport, keyboard/focus behavior, and empty or long-content cases.

For each selected check, report one status: **Verified** (test or runtime reproduction), **Static only** (code evidence), or **Not checked** (with reason). Do not list skipped modules as N/A. A **Design Risk** is a threat-model or design gap, not evidence that a defect was reproduced.

### High-Risk Completion Floor

For auth/RBAC, money, PII, durable state, schema/database work, concurrency, or shared contracts, select the relevant critical authorization, state-transition, idempotency, ownership, or response-projection checks. When a safe test or runtime seam exists, those critical checks must be **Verified**. If a safe seam cannot be exercised, report the delivery as **not fully verified** with the reason; static inspection must not be described as a passing critical behavior.

---

## 4. Test-First and the Two-Strike Loop Breaker

When a bug or behavior gap has a stable observable seam, prefer an expected-red test or reproduction before the fix. It must demonstrate the known defect or unmet acceptance criterion and be recorded as intentionally failing. It does **not** count as a verification strike.

Do not force test-first work for copy, styling, or other changes without a meaningful behavior seam. Tests should observe public behavior rather than implementation details.

Enforce strict failure recovery when errors occur:
1. **Strike 1 (Surgical Fix):** Analyze the root cause and execute one targeted fix after an **unexpected** verification failure.
2. **Strike 2 (Pause automatic retries & Failure Report):** If two consecutive **unexpected** verification runs fail, stop automatic retries and report the root cause, logs, and repair options. Do not claim that the working tree is frozen; the user may explicitly direct the next attempt. The strike counter resets ONLY when a new task begins or when the user replies with explicit direction.
3. **Report & Await Guidance:** Present a structured Failure Report (1. Root Cause, 2. Raw Error Logs, 3. Proposed Targeted Fix Options) and request user guidance. Never loop blindly.

