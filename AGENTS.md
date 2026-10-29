# Apex Micro-Kernel (v7.0.0)

> Universal, polyglot operating protocol for AI coding agents.

## 1. Golden Rules

- **[R0] Absolute Context Grounding:** Act objectively; challenge weak assumptions. Distinguish `[Direct]` from `[Inferred]`; avoid flattery and false certainty; lead with the conclusion. Apex means Apex-core. Keep all agent instructions in this `AGENTS.md`; do not create parallel agent config files.
- **[R1] 3-Tier Dynamic Intent:**
  - Read-only intent (`explain`, `audit`, `why`, `เช็คให้หน่อย` without an action verb) means diagnose only; make no edits.
  - Actionable intent (`fix`, `add`, `refactor`, `implement`) means diagnose, implement, and verify in one turn.
  - Before destructive changes (schema drops, data truncation, auth/session replacement, important file deletion), summarize impact and get explicit approval.
  - 1–3 files: fast track, no plan file. 4+ files or architecture changes: create a concise plan in `docs/plans/YYYY-MM-DD-<slug>.md`; mark it Commit or Ephemeral. Keep strategic memory in Nexus.
- **[R2] In-RAM Fast Targeted Verification:** Run a fast, project-native targeted check (for example `vue-tsc --noEmit`, `tsc --noEmit`, `pytest -q`, or `dotnet test`). Do not run production builds for minor edits.
- **[R3] Strict Seam Binding:** Include terminal results and label the seam `[Verified: Test]`, `[Verified: Compiler]`, `[Syntax-Only]`, or `[Unverified: Visual]`. Never invent tests or stall when a suitable check is unavailable; state the fallback. After two consecutive unexpected failures, stop and report root cause and repair options. For legacy failures, prevent regressions rather than requiring an impossible clean baseline.
- **[R4] Surgical Diffs & Working Tree Purity:** Change only what the defect requires; avoid drive-by refactors. Do not commit scratch/demo/dummy tests. Put architecture, PRD, and test specs under `docs/`; keep root to manifests, README, and configuration.

## 2. Deterministic JIT Adapter Bus & Risk Override Gate

Inspect the target file and root manifest together. Load only relevant domain adapters; high-risk work loads the adapter matching the touched stack.

| Signal | Adapter | Fast check |
|---|---|---|
| `package.json` uses Next, Nuxt, React, or Vue | [`adapters/web-fullstack.md`](./adapters/web-fullstack.md) | `vue-tsc --noEmit` or `tsc --noEmit` |
| Prisma, Drizzle, or `server/api` | [`adapters/backend-data.md`](./adapters/backend-data.md) | Targeted API/route test |
| `pyproject.toml`, `*.csproj`, or `*.sh` | [`adapters/polyglot-core.md`](./adapters/polyglot-core.md) | `pytest -q`, `dotnet test`, or `bash -n` |
| Universal principles or security | [`core/principles.md`](./core/principles.md) | Apply universal baseline |

Low-risk work touching 1–3 files uses R0–R4 without loading adapters. For Auth, RBAC, money, PII, schemas, concurrency/OCC, or breaking APIs, load the adapter matching the touched stack: `web-fullstack.md` for UI, `backend-data.md` for Node/Prisma, or `polyglot-core.md` for Python/.NET. Load multiple adapters only for cross-stack changes.

## 3. Execution Loop

`S1 Discovery → S2 Adaptive Plan → S3 Execution → S4 Fast Verify`

For new systems or substantial features, load [Build workflow](./skills/apex-core/references/build-workflow.md). Plan by uncertainty, dependencies, and risk as well as file count; retain the low-risk fast track. Use [quality-verify](./skills/quality-verify/SKILL.md) for completion review. Kernel invariants govern references and adapters; user instructions and project conventions take precedence.

Optional Nexus MCP: When available, call `nexus_get_state` at project start and `nexus_save_session` at completion. Never invent memory when it is unavailable.
