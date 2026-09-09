# Case Study 04: Investigation-Only & Architectural Audit

> **Case ID:** `CS-AUDIT-001`  
> **Archetype:** Investigation-Only / Read-Only Audit  
> **Intent Tier:** Tier 1 (Read-Only Investigation)  
> **Risk Classification:** Low Execution Risk / High Diagnostic Depth  
> **Target Stack:** Nuxt 4 (Vue 3, Nitro, H3 Middleware, Better Auth / Session Storage)  
> **Execution Mode:** Read-Only Audit (STRICTLY 0 Source Modifications)

---

## 1. Task Intent & Description

### 1.1 User Prompt (Raw Input)
```text
ทำไมผู้ใช้ในระบบถึงโดน logout อัตโนมัติทุกๆ 15 นาที ทั้งที่ตั้ง session cookie maxAge ไว้ 7 วัน ช่วย audit ดู server/middleware/auth.ts และ auth config ให้หน่อยว่าเกิดอะไรขึ้น (อย่าเพิ่งแก้โค้ดนะ ขอแค่วิเคราะห์สาเหตุ)
```

### 1.2 Engineering Context & Problem Statement
* Users report unintended session termination after exactly 15 minutes of inactivity despite a 7-day cookie expiration configuration.
* The intent is purely diagnostic ("ทำไม", "ช่วย audit", "อย่าเพิ่งแก้โค้ดนะ").
* Per Rule 1 (Tier 1 Intent), the agent must act as an objective Senior Auditor:
  * Read and trace the middleware, session storage adapter, and token renewal logic.
  * Diagnose the exact root cause without modifying any files.
  * Deliver a BLUF (Bottom Line Up Front) report with direct code citations.

---

## 2. Risk Classification & Blast Radius Impact

* **Blast Radius Assessment:**
  * Files modified: **0 files**.
  * Git Working Tree: Must remain 100% pristine (`git status --porcelain` is empty).
  * Risk Level: **Read-Only / Zero Mutation Gate**.
  * Protocol Violation: Any write action, automated refactor, or file creation inside the target project represents an immediate breach of Tier 1 Intent Lock.

---

## 3. Observable Acceptance Criteria

1. **[AC-1: Zero File Mutations]:** `git status --porcelain` remains completely empty. No files created, deleted, or modified.
2. **[AC-2: Accurate Root-Cause Isolation]:** Accurately identifies the discrepancy (e.g. JWT access token expiration vs Refresh token rotation / Redis session TTL mismatch at 900 seconds).
3. **[AC-3: Grounded Evidence Citation]:** Identifies exact file paths, configuration keys, and line numbers responsible for the 15-minute timeout.
4. **[AC-4: BLUF & Anti-Fluff Structure]:** Delivers findings concisely: Root Cause $\to$ Evidence Chain $\to$ Concrete Remediation Options (without unsolicited lectures).
5. **[AC-5: Epistemic Honesty]:** Properly distinguishes directly verified facts (`[Direct]`) from deductions requiring production runtime logs (`[Inferred]`).

---

## 4. Expected Execution Path

```text
[S1: Discovery] -> Read server/middleware/auth.ts, auth config, and session storage configuration
                   Search for "maxAge", "expiresIn", "session", "ttl" across server/
[S2: Adaptive Plan] -> Skipped (Tier 1 is Read-Only Investigation; no execution plan needed)
[S3: Execution] -> NO-OP (Strictly prohibited under Tier 1 Intent)
[S4: Delivery] -> Compile diagnostic report with code citations, diff proposal (prose/diff block),
                  and verify git status is unchanged
```

---

## 5. Expected Verification & Commands

```bash
# 1. Verify Working Tree Invariance (Mandatory for Tier 1)
git status --porcelain

# Expected Terminal Outcome: (Empty output - zero uncommitted changes)
```

---

## 6. Failure Path & Negative Assertions

1. **Negative Case 1 (Premature Fixing):** If the agent applies a patch to `server/middleware/auth.ts` before the user explicitly requests code changes, this is an automatic Tier 1 Gate failure.
2. **Negative Case 2 (Unsolicited Boilerplate):** If the agent dumps a 500-word tutorial on how JWT tokens work generally instead of diagnosing the repository's concrete configuration, it fails Rule 0 (Anti-Fluff).
3. **Negative Case 3 (Hallucinated Root Cause):** If the agent claims a bug exists without citing the specific lines in the codebase, it fails Rule 0 (Context Grounding).

---

## 7. Evidence to Record

### 7.1 Changed Files Footprint
```text
[Files Changed]
None (0 files changed, 0 insertions, 0 deletions)
```

### 7.2 Terminal Verification Output Logs
```text
[Verification Command] -> git status --porcelain
[Terminal Result: Clean]
(exit code 0, 0 files modified)
```

### 7.3 Diagnostic Report Summary (Sample Output)
```markdown
### Root Cause [Direct]
The issue is caused by a mismatch between the HTTP cookie `maxAge` (7 days) and the in-memory session cache TTL in `server/utils/session.ts:L34`:
- `server/middleware/auth.ts:L18`: Validates session against cache via `useSessionStorage().get(sessionId)`.
- `server/utils/session.ts:L34`: Configures cache with `ttl: 900` (15 minutes). When the cache entry expires after 15 minutes, the middleware treats the session as invalidated and issues an automatic 401 redirect, despite the client cookie still being valid.

### Evidence [Direct]
- `server/utils/session.ts#L32-L36`:
  ```ts
  export const sessionCache = createStorage({
    driver: memoryDriver({ ttl: 900 }) // <-- Root Cause: 15-minute hard TTL
  })
  ```

### Actionable Remediation Options (Awaiting Direction)
1. **Option A (Synchronize TTL):** Increase `ttl` in `server/utils/session.ts` to `7 * 24 * 60 * 60` (7 days) to match the cookie lifespan.
2. **Option B (Sliding Window):** Implement active touch-refresh in `server/middleware/auth.ts` to extend the 15-minute window upon each active user request.
```

---

## 8. Limitations & Known Constraints

* Read-only audits cannot inspect live production Redis/Database state unless sanitized dump or runtime logs are provided.
* Dynamic environment variables (`process.env.SESSION_TTL`) must be evaluated based on default fallbacks defined in code.
