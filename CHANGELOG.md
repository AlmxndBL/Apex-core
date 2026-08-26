# 📜 Apex-core Changelog

All notable changes to the Apex AI Agent Behavioral Framework and Rules Engine will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.1.2] - 2026-08-26 — Template-First UI Architecture & Blueprint Registry 🎨

### Added
- **Production UI Component Registry (`skills/frontend/SKILL.md` Section 6):** Cataloged production-ready UI templates for Vue 3 / Nuxt 4 and React 19 / Next.js 15 (`App4StateContainer`, `AppAdminDataTable`, `AdminLayoutShell`, `AppFloatingBulkBar`, `AppKpiCard`, `AnimatedThemeToggler`, `admin-ui-tokens.ts`).
- **Template-First Adoption Rule (`rules/05-ux-ui-design.md` & `AGENTS.md`):** Mandated that agents inspect and adopt pre-built blueprints in `templates/ui/` before hand-crafting unstandardized UI components or table implementations. Added blueprint verification to the anti-generic checklist.

### Changed
- **Quick Lookup Blueprint Mapping (`AGENTS.md` & `AGENTS_TH.md` Section 6):** Added dedicated Production Blueprints & Templates column linking Frontend UI/UX directly to `templates/ui/`.

---

## [5.1.0] - 2026-08-26 — The Resilient Control & UI Shell Engine 🛡️

### Changed
- **2-Strike Freeze State Gate (`AGENTS.md` Rule 5 & `skills/quality-verify`):** Upgraded cumulative 2-strike loop breaker from destructive auto-rollback to a **Freeze State & Failure Report Gate**. Automatically halts execution and presents root causes and repair options without destroying partial progress or uncommitted changes.
- **Fast Targeted In-Memory Verification (`AGENTS.md` Rule 2):** Refined verification protocol definition from fixed "1-3 seconds" claim to **Targeted In-Memory Incremental Verification**, accurately scaling with large enterprise monorepos while strictly banning full production build overhead.
- **Universal Multi-Agent Compatibility Architecture (`README.md`):** Clarified Layer 1 (Core Directives) and Layer 2 (Deep Knowledge Engine) as architectural depth levels with 100% universal compatibility across Cursor, Claude Code, Windsurf, and Antigravity.

### Added
- **Top-Right Header User Menu Cluster (`templates/ui/`):** Standardized user account identity, workspace switcher, and logout actions into a responsive Top-Right Header trigger with 4-tier popover dropdown and click-outside handler across Vue 3 and React 19 templates.
- **Minimalist System Footer (Option 3) (`templates/ui/`):** Replaced heavy sidebar footer profile popovers and fake storage gauges with a clean 1-line system identifier (`Apex Enterprise · v5.1`), ensuring zero-noise layout integrity for systems without telemetry quotas.

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
