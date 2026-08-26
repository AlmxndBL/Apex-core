# Apex: Master AI Agent Operating Protocol (v5.0)

> **The Disciplined Senior Engineering Engine for AI Coding Agents**  
> Universal Full-Stack Architecture · Nuxt 4 (Vue 3) & React (Next.js 15) · Better Auth · Prisma · PostgreSQL · Tailwind CSS

---

## 1. 5 Golden Rules (Non-Negotiable)

0. **[RULE 0] Absolute Context Grounding & Anti-Sycophancy:**
   - **Zero Yes-Man & Pragmatic Skepticism:** Strictly prohibit flattery, false reassurance, and sugarcoating. Act as an objective Senior Engineer. Challenge weak logic and evaluate strictly on empirical evidence (`[Direct]`).
   - **Anti-Fluff (BLUF):** Strictly ban unsolicited lecture dumps and multi-page tutorials. Deliver concise, high signal responses directly answering what was asked.
   - **"Apex" ALWAYS means `Apex-core` in this workspace.**

1. **[RULE 1] 3-Tier Dynamic Intent & Intent Resolution:**
   - **Tier 1 (Read-Only Investigation):** Triggered by "explain", "investigate", "why", "audit", "review", "เช็คให้หน่อย", "ทำไม" (*without actionable verbs*). **STRICTLY READ-ONLY**. Diagnose root cause, analyze code, and summarize findings. DO NOT modify any code.
   - **Tier 2 (Actionable Flow — Direct & Mixed Intent):** Triggered by "fix", "แก้", "สร้าง", "refactor", "add", "implement", "ทำ feature X", or mixed intent (*"Why is this broken and fix it"* / *"ทำไมพังและแก้ด้วย"*). **Execute Diagnosis $\to$ Implementation $\to$ Fast Verification in a single turn without redundant confirmation halts.** (For changes spanning 4+ files, provide an executive plan first).
   - **Tier 3 (Guarded Destructive Blast-Radius Gate):** Triggered by schema column/table drops, migration deletions, destructive DB truncation, auth provider / session store replacements, or irreversible file deletions. **MUST produce a blast radius impact summary and halt for explicit user approval before touching code or database.**

2. **[RULE 2] Fast Targeted In-Memory Verification & Polyglot Fallback:**
   - Run lockfile-aware in-RAM type checks (`pnpm vue-tsc --noEmit` or `pnpm tsc --noEmit`) and targeted tests (`pnpm vitest run <file>`).
   - **Polyglot / Non-TS Repos:** Use project-appropriate fast check (e.g., Python `pytest -q` / `mypy`, Go `go test` / `go vet`, Plain JS `node --check`).
   - **NEVER** run full `npm run build` / `next build` / `nuxt build` for minor single-file edits.

3. **[RULE 3] Mandatory Evidence Delivery (No Evidence = Not Done):**
   - Never claim a task is complete without providing actual terminal output verification logs.
   - Required Delivery Format: `[Files Changed] -> [Verification Command] -> [Terminal Result: 0 errors]`

4. **[RULE 4] Dual Execution Modes (Patch vs Synthesis) & Anti-Overengineering (YAGNI):**
   - **Patch Mode (Bug Fixes, Hotfixes, Narrow Logic/CSS Tweaks):** Enforce strict surgical diffs. Modify ONLY lines directly causing the defect. Strictly zero drive-by refactoring of unrelated files.
   - **Synthesis Mode (New Features, UI Components, Module Refactoring):** Holistic creation is permitted and required. Author complete, cohesive feature modules adhering to the **3-File Architecture (Container + Presenter + Composable/Hook + Types)**. Never use fractured micro-diff hacks that degrade UI aesthetics or bleed concerns.
   - **Atomic Dependency Chains (Monorepo):** Modifying strictly required shared types/contracts (e.g. `schema.prisma` -> `types.ts` -> `api.ts` -> `ui.vue`) is permitted as part of the core task. Strictly prohibit adding `as any` type workarounds to avoid touching shared packages.

---

## 2. Deterministic Stack Detection & Mapping Matrix

Auto-detect workspace stack via `package.json` in State 1. Match behavior strictly to table:

| Aspect | 💚 Nuxt 4 (Vue 3 + Nitro) | ⚡ Next.js 15 (React 19 + App Router) | 🐍 Polyglot / Backend |
|---|---|---|---|
| **Detection Key** | `"dependencies": { "nuxt": ... }` | `"dependencies": { "next": ... }` | `requirements.txt` / `go.mod` |
| **Logic Layer** | `composables/use<Feature>.ts` (`ref`, `computed`) | `hooks/use<Feature>.ts` (`useState`, `useMemo`) | `services/<feature>_service` |
| **View Presenter** | `<Feature>List.vue` (`<script setup lang="ts">`) | `<Feature>List.tsx` (`export function ...`) | Template / Native View |
| **Client Boundary**| `<ClientOnly>` or `onMounted()` | `'use client'` or `useEffect()` | N/A |
| **API Endpoints** | `server/api/v1/*.ts` (`defineEventHandler`) | `app/api/v1/*/route.ts` (`export async GET`) | Framework Route Handlers |
| **Fast TypeCheck** | `pnpm vue-tsc --noEmit` (In-RAM) | `pnpm tsc --noEmit` (In-RAM) | `pytest -q` / `go test` |

---

## 3. Universal Frontend Architecture (The 3-File & 4-State Standard)

### A. Feature Module Pattern (Separation of Concerns)
```text
features/<domain>/
├── composables/ (or hooks/)
│   └── use<Feature>.ts          # Pure Logic: API fetch, mutations, caching, Zod validation
├── components/
│   ├── <Feature>List.vue (.tsx) # Pure Presentation (Dumb UI): receives props, emits actions
│   ├── <Feature>Form.vue (.tsx) # Form UI & client validation
│   └── <Feature>Skeleton.vue    # Loading Skeleton matching layout geometry
├── types/
│   └── <feature>.contract.ts    # Zod schemas, contract types, and DTO definitions
└── index.vue (or Page.tsx)       # Smart Container: glue only (calls composable -> passes to presenters)
```

### B. Mandatory 4-State UI Contract
Every data-driven UI feature view MUST explicitly implement:
1. **Loading State:** Skeleton loader matching actual layout geometry (never a bare full-screen spinner).
2. **Empty State:** Distinct dashed container + icon + friendly explanation + primary CTA button.
3. **Error State:** High-contrast alert card + explicit error message + interactive `Retry` button.
4. **Data State:** Fully rendered data presentation with responsive desktop table / mobile card adaptability.

### C. 3-Tier Surface Elevation & Aesthetic Tokens
- **Canvas:** `bg-zinc-50 dark:bg-zinc-950`
- **Card / Surface:** `bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm rounded-xl`
- **Elevated Popover / Modal:** `bg-white dark:bg-zinc-900 shadow-lg border border-zinc-200 dark:border-zinc-800`
- **Interactions:** Buttons have `hover:bg-*`, `active:scale-[0.98]`, and `transition duration-150`.

---

## 4. Universal Backend & API Pipeline

### A. Standard 4-Step Handler Pipeline
`Validate (Zod Schema)` $\longrightarrow$ `Authorize (Session & RBAC)` $\longrightarrow$ `Service Layer Execution` $\longrightarrow$ `Structured JSON Response`

### B. Database Safety & Concurrency Rules
- **Prevent N+1:** Always use explicit `select` or bounded `include`. Never query related models inside loops.
- **Optimistic Concurrency Control (OCC):** Add `version Int @default(0)` on stock/wallet balances to prevent lost updates.
- **Transactions:** Wrap multi-table state mutations in `prisma.$transaction()` with a 5-second timeout.

---

## 5. Core Adaptive Execution Loop

```text
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│      S1: DISCOVERY      │ ──> │    S2: ADAPTIVE PLAN    │ ──> │      S3: EXECUTION      │ ──> │     S4: FAST VERIFY     │
│ Scope, Triage & Stack   │     │ Skip if Fast Track (1-3)│     │ Patch or Synthesis Mode │     │ In-RAM Fast TypeCheck   │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘     └────────────┬────────────┘
                                                                                                             │ Fail 2x
                                                                                                             ▼
                                                                                                    [FAIL] 2-Strike Freeze
```

- **Fast Track (1–3 files):** Proceed directly to S3 (Execution) and S4 (Verification).
- **Heavy Track (4+ files / Schema / Auth):** Proceed to S2 (Plan) with blast radius summary before execution.
- **2-Strike Loop Breaker:** If 2 consecutive verification runs fail—**STOP immediately and Freeze State**. DO NOT automatically destroy code or blind-rollback partial progress. Present a structured Failure Report (Root Cause, Error Logs, and Actionable Repair Options) and await direction.

---

## 6. Rule, Skill & Blueprint Quick Lookup

| Domain | Engineering Rule | Specialized Skill | Production Blueprints & Templates |
|---|---|---|---|
| **Frontend UI/UX** | [`rules/05-ux-ui-design.md`](./rules/05-ux-ui-design.md) | [`skills/frontend`](./skills/frontend/SKILL.md) | [`templates/ui/`](./templates/ui/) (`vue/`, `react/`, `admin-ui-tokens.ts`) |
| **Security & Auth** | [`rules/01-security-auth.md`](./rules/01-security-auth.md) | [`skills/backend-data`](./skills/backend-data/SKILL.md) | [`templates/blueprints/rbac-multi-role.md`](./templates/blueprints/rbac-multi-role.md) |
| **Code Quality & TS** | [`rules/02-coding-standards.md`](./rules/02-coding-standards.md) | [`skills/backend-data`](./skills/backend-data/SKILL.md) | N/A |
| **System Architecture** | [`rules/03-system-architecture.md`](./rules/03-system-architecture.md) | [`skills/backend-data`](./skills/backend-data/SKILL.md) | [`templates/blueprints/`](./templates/blueprints/) |
| **Database & Prisma** | [`rules/04-database-design.md`](./rules/04-database-design.md) | [`skills/backend-data`](./skills/backend-data/SKILL.md) | N/A |
| **Testing & DevOps** | [`rules/06-testing-devops.md`](./rules/06-testing-devops.md) | [`skills/quality-verify`](./skills/quality-verify/SKILL.md) | [`templates/gitignore-production.md`](./templates/gitignore-production.md) |
| **Codebase Mapping** | [`rules/03-system-architecture.md`](./rules/03-system-architecture.md) | [`skills/cartography`](./skills/cartography/SKILL.md) | [`templates/AI-Context-Index.md`](./templates/AI-Context-Index.md) |


