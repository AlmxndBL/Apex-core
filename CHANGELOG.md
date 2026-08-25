# 📜 Apex-core Changelog

All notable changes to the Apex AI Agent Behavioral Framework and Rules Engine will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [5.0.0] - 2026-08-25 — The Production Velocity Engine ⚡

### Changed
- **3-Tier Dynamic Intent Protocol (`AGENTS.md` Rule 1):** Replaced binary Hard Intent Lock with a calibrated 3-tier model (Tier 1: Read-Only, Tier 2: Actionable Flow for instant 1-turn fix/verify, Tier 3: Guarded Destructive Gate). Eliminates redundant confirmation friction on direct bug fixes and mixed intent commands.
- **Dual Execution Modes (`AGENTS.md` Rule 4):**
  - **Patch Mode:** Strict surgical diffs for targeted bug fixes.
  - **Synthesis Mode:** Holistic module creation for new features, UI design, and refactoring to eliminate "Frankenstein / patch-on-patch" degradation.
- **Adaptive 4-State Execution Loop (`AGENTS.md`):** Fast Track (1–3 files) executes directly; Heavy Track (4+ files / schema) creates an adaptive system plan first.
- **Separation of Concerns (SOC) Standard (`rules/02-coding-standards.md`):** Formalized Container-Presenter architectural standard separating views, presentational dumb UI, and composables/services.

### Added
- **Production Frontend Architecture Blueprint (`skills/frontend/SKILL.md`):**
  - Strict 3-File Feature Module Pattern (`composables/use<Feature>.ts`, `components/<Feature>List.vue`, `types/<feature>.contract.ts`, `index.vue`).
  - Mandatory 4-State UI Contract (`LoadingSkeleton`, `EmptyState`, `ErrorRecovery`, `DataContent`).
  - 3-Tier Surface Elevation Hierarchy, typography rhythm, and interaction polish.
  - Dual Responsive Layouts (Desktop Table vs Mobile Touch Cards).
- **Production Backend Architecture Blueprint (`skills/backend-data/SKILL.md`):**
  - Standard API Handler Blueprint with 4-step pipeline (Validate $\to$ Authorize $\to$ Service $\to$ Response).
  - Dedicated Service Layer & Database Transaction Pattern.
  - End-to-End Spec-Driven Development (SDD) contract sharing between client and server.
- **UI Quality Gates & Anti-Generic Checklist (`rules/05-ux-ui-design.md`):** Added Section 9 (Mandatory 4-State Contract) and Section 10 (Anti-Generic UI Quality Checklist).

---

## [4.0.0] - 2026-08-23 — The Lean Pragmatic Symphony 🚀

### Added
- **3-Tier Drop-in Architecture:**
  - `Apex Nano` (`presets/nano/AGENTS.md`): Single-file, 35-line drop-in guardrail for Cursor, Claude Code, and Windsurf.
  - `Stack Presets` (`presets/nextjs/AGENTS.md`, `presets/nuxt4/AGENTS.md`): Dedicated full-stack starter templates.
- **4 Consolidated Core Skills:** Refactored 8 fragmented skills into 4 clean domain pillars:
  - `skills/frontend`: UI/UX, Tailwind CSS, Responsive Tables, Component Layering.
  - `skills/backend-data`: Strict TS, Prisma ORM, PostgreSQL, Indexing, Transactions, API Security.
  - `skills/quality-verify`: In-Memory TypeCheck, Vitest, 2-Strike Loop Breaker, Rollback.
  - `skills/cartography`: AST Skeleton Mapping, Token Diet, Session Handoff.

### Changed
- **Master Orchestration Rewrite (`AGENTS.md`):** Reduced from 240+ lines (~36KB) down to ~90 lines (~4KB) using an affirmative 4-State Machine ($S_1 \to S_2 \to S_3 \to S_4$), cutting System Prompt overhead by 70%.
- **Clean Nexus Decoupling:** Apex is now 100% standalone with zero external dependencies, treating Nexus as an optional Long-Term Memory Vault.
- **README 4.0 Overhaul:** Replaced dense academic architecture with a 10-second quickstart, 3-tier matrix, and before/after comparison table.

### Removed
- Removed overlapping legacy skills (`typescript-wizard`, `database-architect`, `design-taste-frontend`, `docker-devops-master`, `impeccable-audit`, `sandbox-testing`, `context-budget`, `codebase-cartographer`) in favor of the 4 consolidated skills.
- Removed Placebo Rules (Dynamic Skill Unmounting, 3-file Subagent Review Gate, Academic Seam jargon).

---

## [3.1.0] - 2026-08-22

### Added
- **Karpathy-Infused Behavioral Safeguards:** Integrated 4 core tenets into Master Orchestration (`AGENTS.md`).
- **Context Budget & Token Diet Skill (`skills/context-budget`):** Specialized skill enforcing bounded file retrieval.

---

## [3.0.0] - 2026-08-22

### Added
- **Capability-Seams Architecture:** Declared decoupled Seam Registry.
- **Dynamic Skill Mounting & Unmounting Protocol:** Context-aware skill lifecycle.
