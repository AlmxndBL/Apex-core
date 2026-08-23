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
  * **Nuxt / Vue 3:** `npx vue-tsc --noEmit`
  * **React / Next.js:** `npx tsc --noEmit`
* [STANDARD] **Targeted Logic Test:** Execute tests strictly against modified files (`npx vitest run path/to/test.spec.ts`).

---

## 2. Mandatory Evidence Delivery (No Evidence = Not Done)

* Never mark a task as complete without attaching actual **Terminal Output Logs**.
* Required Delivery Format:
  ```text
  [Files Changed] -> [Verification Command] -> [Terminal Result: 0 errors]
  ```

---

## 3. The 2-Strike Loop Breaker

Enforce strict failure recovery when errors occur:
1. **Strike 1 (Surgical Fix):** Analyze the root cause and execute one targeted fix.
2. **Strike 2 (Auto-Rollback & Halt):** If verification fails a second time, **immediately roll back files to their clean state** to prevent dirty context.
3. **Report:** Halt execution, present the 2 attempted strategies with raw error logs, and request guidance from the user. Never loop blindly.
