# Apex: Master AI Agent Operating Protocol (v4.0)

> **The Disciplined Senior Engineering Engine for AI Coding Agents**  
> Pragmatic Full-Stack Architecture · Nuxt 4 (Vue 3) & React (Next.js 15) · Better Auth · Prisma · PostgreSQL · Tailwind CSS

---

## 5 Golden Rules (Non-Negotiable)

0. **[RULE 0] Absolute Context Grounding & Zero Hedging:**
   - **"Apex" ALWAYS means `Apex-core` in this workspace.** NEVER list Oracle APEX, Salesforce Apex, ApexCharts, or external unrelated products.
   - For ANY system design, architecture request, or feature proposal: **MUST strictly follow Apex-core 3-Tier Architecture** ([`rules/03-system-architecture.md`](./rules/03-system-architecture.md)), apply the Karpathy Test (YAGNI), and use Prisma, Strict TypeScript, Better Auth, and Tailwind CSS. NEVER output generic ungrounded chatbot dumps.
1. **[RULE 1] Hard Intent Lock & Mixed Intent Protocol (Safety First):**
   - If the user asks to "explain", "investigate", "why", or "audit": **STRICTLY READ-ONLY**.
   - **Mixed Intent (Audit + Action):** If a request combines diagnosis and modification (e.g. *"Why is this slow and fix it"*), MUST diagnose the root cause in the first step BEFORE proposing or making any code changes. Never perform speculative refactoring without identifying the bottleneck first.
   - Diagnose root cause and propose a plan. **DO NOT edit any code** until explicitly approved (e.g. "fix it", "proceed", "implement").
2. **[RULE 2] Fast In-Memory Verification & Polyglot Fallback (1-3 Seconds):**
   - Run lockfile-aware in-RAM type checks (`pnpm/npm/bun vue-tsc --noEmit` or `pnpm/npm/bun tsc --noEmit`) and targeted tests (`pnpm/npm/bun vitest run <file>`).
   - **Polyglot / Non-TS Repos:** Use project-appropriate fast check (e.g., Python `pytest -q` / `mypy`, Go `go test` / `go vet`, Plain JS `node --check`).
   - **NEVER** run full `npm run build` / `next build` / `nuxt build` for minor single-file edits.
3. **[RULE 3] Mandatory Evidence Delivery (No Evidence = Not Done):**
   - Never claim a task is complete without providing actual terminal output verification logs.
4. **[RULE 4] Surgical Diffs, Anti-Overengineering (YAGNI) & Monorepo Propagation:**
   - Modify ONLY lines directly related to the user's request. Strictly zero drive-by refactoring of unrelated files.
   - **Atomic Dependency Chains (Monorepo):** Modifying strictly required shared types/contracts (e.g. `schema.prisma` -> `types.ts` -> `api.ts` -> `ui.vue`) is permitted as part of the core task. Strictly prohibit adding `as any` type workarounds to avoid touching shared packages.
   - Use the simplest scalable solution. No single-use wrappers or speculative abstractions. Strict TypeScript (no `any`).


---

## Core 4-State Execution Loop

Agent runs under a strict 4-state finite workflow:

```text
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  S1: DISCOVERY  │ ──> │ S2: SYSTEM PLAN │ ──> │ S3: SURGICAL DO │ ──> │ S4: FAST VERIFY │
│  Scope & Triage │     │ Minimal & Type  │     │ Clean Native Diff│    │ In-RAM TypeCheck│
└─────────────────┘     └─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                                                 │ Fail 2x
                                                                                 ▼
                                                                        [FAIL] 2-Strike Report
```

### State 1: Discovery & Scope
- **Task Triage:** [Fast Track: 1-2 files] -> Implement & Verify immediately (NEVER bypasses Rule 1 Intent Lock or DB schema drop approval) | [Heavy Track: 3+ files / Schema / Auth] -> Summarize scope and blast radius first.
- **Token Diet:** Search target symbols first (`grep_search` / `find_by_name`). Read bounded line slices (max 150-200 lines). **Exception:** Allow reading full or larger bounded slices (up to 600 lines) for `schema.prisma`, OpenAPI specs, and core shared type contracts to prevent broken bidirectional relations (`@relation`) or fragmented union types.
- **Stack Detection:** Inspect lockfile (`pnpm` default) and `package.json` for Nuxt 4 (Vue) vs React (Next.js 15) vs Polyglot stack.

### State 2: System Design (The Pragmatic Way)
- Check domain rules in `rules/` and load relevant skills (`skills/frontend`, `skills/backend-data`).
- Apply the 3-question Karpathy test: 1. Did the user ask for this? 2. Is this the simplest scalable way? 3. Is any abstraction single-use?

### State 3: Surgical Implementation
- Write 100% executable production code (no placeholders).
- Use native file tools (`replace_file_content`, `write_to_file`) for clear diff visibility.

### State 4: Verification & 2-Strike Loop Breaker
- Run fast in-memory typecheck and targeted test suite (`skills/quality-verify`).
- **Cumulative 2-Strike Rule:** Strike count is cumulative per task (Attempt 1 + Attempt 2). If 2 consecutive verification runs fail—even if the error signature changed (no whack-a-mole)—**STOP immediately**.
- **Safe Turn Rollback:** Roll back ONLY the specific files modified during the current agent turn (restoring from pre-edit baseline snapshot). NEVER run global destructive `git restore .` that wipes the developer's pre-existing uncommitted work. Present the Failure Report below. Never loop blindly.


---

## Failure Report Template

When a fix fails twice consecutively, halt and output:

```markdown
## [FAIL] Failure Report

### What Was Attempted
- [Goal description]

### Failed Attempts (2 Strikes)
1. [Attempt 1] -> Error: [output]
2. [Attempt 2] -> Error: [output]

### Root Cause Hypothesis
- [Current best hypothesis]

### Required from User
- [Decision / Missing context needed]
```

---

## Rule & Skill Quick Lookup

| Domain | Engineering Rule | Specialized Skill |
|---|---|---|
| **Security & Auth** | [`rules/01-security-auth.md`](./rules/01-security-auth.md) | [`skills/backend-data`](./skills/backend-data/SKILL.md) |
| **Code Quality & TS** | [`rules/02-coding-standards.md`](./rules/02-coding-standards.md) | [`skills/backend-data`](./skills/backend-data/SKILL.md) |
| **System Architecture** | [`rules/03-system-architecture.md`](./rules/03-system-architecture.md) | [`skills/backend-data`](./skills/backend-data/SKILL.md) |
| **Database & Prisma** | [`rules/04-database-design.md`](./rules/04-database-design.md) | [`skills/backend-data`](./skills/backend-data/SKILL.md) |
| **Frontend UI/UX** | [`rules/05-ux-ui-design.md`](./rules/05-ux-ui-design.md) | [`skills/frontend`](./skills/frontend/SKILL.md) |
| **Testing & DevOps** | [`rules/06-testing-devops.md`](./rules/06-testing-devops.md) | [`skills/quality-verify`](./skills/quality-verify/SKILL.md) |
| **Codebase Mapping** | [`rules/03-system-architecture.md`](./rules/03-system-architecture.md) | [`skills/cartography`](./skills/cartography/SKILL.md) |
