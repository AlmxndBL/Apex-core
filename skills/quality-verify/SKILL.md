---
name: quality-verify
description: Fast In-Memory Verification Engine, Vitest / Sandbox Testing, 2-Strike Loop-Breaker, and Evidence Delivery
---

# Quality Verification & Fast Test Engine Skill

> In-memory verification protocols (Universal Definition of Done) delivering sub-second checks and automated loop-breaking safeguards.

---

## 1. Tiered Verification Strategy (Fast In-Memory First)

* [FORBIDDEN] **Never run full production builds (`npm run build` / `next build` / `nuxt build`)** for minor single-file edits.
* [STANDARD] **Fast In-Memory TypeCheck (1–3 Seconds):**
  * **Nuxt / Vue 3:** `pnpm vue-tsc --noEmit` (or `npm`/`bun` matching lockfile)
  * **React / Next.js:** `pnpm tsc --noEmit` (or `npm`/`bun` matching lockfile)
  * **Polyglot / Other Stacks:** Run language-specific checks (e.g. `pytest -q`, `go test`, `node --check`).
* [STANDARD] **Targeted Logic Test:** Execute tests strictly against modified files (`pnpm vitest run path/to/test.spec.ts`).

---

## 2. Mandatory Evidence Delivery (No Evidence = Not Done)

* Never mark a task as complete without attaching actual **Terminal Output Logs**.
* Required Delivery Format:
  ```text
  [Files Changed] -> [Verification Command] -> [Terminal Result: 0 errors]
  ```

---

## 3. The Cumulative 2-Strike Loop Breaker

Enforce strict failure recovery when errors occur:
1. **Strike 1 (Surgical Fix):** Analyze the root cause and execute one targeted fix.
2. **Strike 2 (Safe Snapshot Rollback & Halt):** If verification fails a second time (cumulative per task, regardless of error change), **immediately restore modified files to their pre-turn baseline** (never run global `git restore .` that wipes uncommitted developer work).
3. **Report:** Halt execution, present the 2 attempted strategies with raw error logs, and request guidance from the user. Never loop blindly.

