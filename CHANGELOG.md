# 📜 Apex-core Changelog

All notable changes to the Apex AI Agent Behavioral Framework and Rules Engine will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.3.0] - 2026-08-26 — Statistical Integrity, Honest Reporting & Test Suite 🧪

### Fixed
- **Exact t-Distribution Statistics (`benchmark/lib/statistics.js`):** Replaced hardcoded p-value lookup thresholds with exact Student's t p-values via the regularized incomplete beta function `I_x(df/2, 1/2)`, and replaced the fixed CI critical value (2.262) with per-df bisection-derived critical values (n = 5 now correctly uses t* = 2.77645).
- **No More Fabricated Significance (`benchmark/runner.js`):** Reports, terminal output, and `results.json` render the actually-computed p-value instead of a static `p < 0.0001` string. After fixture expansion the compression comparison is now genuinely significant (p = 0.0031); Surgical-Patch-vs-Whole-File is significant (p = 0.046).
- **Broken npm Scripts Removed:** `install:apex` / `shield` / `scan` proxies required `.cjs` files deleted in the v5.2.2 cleanup — broken proxies and their package.json entries are now removed (caught by new Script Integrity checks).
- **Dead `--live-api` Flag Removed:** flag was declared in runner but never implemented while documented as a feature in the whitepaper; replaced by a planned live-agent experiment protocol.
- **Projection Honesty:** Multi-turn session figures (-94%) explicitly labeled assumption-driven linear projections; turn counts (incl. 1.04 design target) and overhead constants documented in `PROJECTION_ASSUMPTIONS` and serialized into `results.json`.
- **Honest Trade-off Disclosure:** Benchmark reports state plainly that the Surgical Patch costs +50.9% more output tokens than Aider's Unified Diff (value = deterministic apply + closed-loop verification, not raw token cost).
- **Latency Labeling:** Measured metric documented as a line-scan proxy; vue-tsc/tsc typecheck is explicitly out-of-scope for this benchmark.
- **Tokenizer Fallback Warning:** character-estimate fallback no longer silently mixes with exact BPE counts (warn-once). Cost label corrected to Claude-class pricing (GPT-4o differs).

### Added
- **Unit Test Suites wired into `npm test`:** statistics (28 checks vs published t-tables, df = 1…10000) and ast-extractor golden tests (27 checks locking TS / Vue SFC / Prisma extraction behavior).
- **Fixture Expansion n = 5 → n = 13:** new domains (RBAC guard, payment provider service, paginated-query & form-validation composables, audit-table SFC, analytics Prisma schema) plus an intentional low-compression config fixture for honest variance. Output-burden arm remains on the defect-paired subset; report table generation is now data-driven.
- **CI Workflow (`​.github/workflows/test.yml`):** unit tests + integrity suite + benchmark regeneration on push/PR with artifact upload.
- **Experiment Protocol (`benchmark/EXPERIMENT_PROTOCOL.md`):** pre-registerable design for live-agent validation of turn-count/token/success-rate claims.
- **Script Integrity Checks (`verify-framework` §9):** validates every `package.json` script target and every `require()` proxy target exists.
- **2-Strike Reset Semantics (`AGENTS.md`, `skills/quality-verify`):** strike counter resets only on a new task or explicit user direction after a Freeze Report.
- **Stack Matrix Override Hatch (`AGENTS.md`):** mappings declared in `AI-Context-Index.md` take precedence over default conventions; never force-refactor healthy structures.

### Changed
- **Extractor Honesty & Robustness (`benchmark/lib/ast-extractor.js`):** header renamed to a heuristic line-based scanner with documented KNOWN LIMITATIONS; handles default-exported functions, class signature lines, attribute-order-tolerant Vue `<script>` matching, and single-line interface declarations.

## [5.2.2] - 2026-08-26 — Lean Storefront & Dedicated Benchmark Encapsulation 🚀

### Changed
- **Documentation Restructuring (Lean Storefront):** Streamlined `README.md` and `README.th.md` into high-impact storefront documentation (~120 lines, 90-second read) with visual AST payload comparisons and minimal centered badge strips.
- **Dedicated Benchmark Encapsulation (`benchmark/README.md`):** Moved full academic empirical research whitepaper into `benchmark/README.md` and `benchmark/reports/` for strict domain encapsulation.
- **Standalone Benchmark HTML Reports:** Added dedicated HTML editions in `benchmark/reports/BENCHMARK.html` (EN) and `benchmark/reports/BENCHMARK.th.html` (TH) with MathJax $\mathcal{O}(N^2)$ math equations, full statistical tables, and 6 academic literature citations.
- **Repository Cleanliness:** Removed redundant legacy simulation scripts, duplicate CJS files, and unused artifacts.

---

## [5.2.1] - 2026-08-26 — Empirical 3-Way Benchmark & Telemetry Engine 📊

### Added
- **Dedicated Benchmark Root (`benchmark/`):** Established isolated testing and telemetry suite with modular dataset (`tasks.json`), statistical computer (`statistics.js`), tokenizer cost model (`tokenizer.js`), and automated runner (`runner.js`).
- **3-Way Comparative Benchmark Evaluation:** Empirically evaluated $N=50$ trials across 5 full-stack domains comparing Generic Unconstrained Prompts, Industry Accepted Standards (Cursor Directory / Official Claude Guidelines), and Apex Protocol v5.0.
- **Empirical Whitepaper & Statistical Reports (`BENCHMARK.md` & `benchmark/reports/STATISTICAL_REPORT.md`):** Formally documented quadratic context accumulation ($\mathcal{O}(N^2)$), paired Student's t-test significance ($p < 0.0001$), In-RAM AST verification latency (1.85s vs 21.75s), and 83.3% token savings over industry standards.
- **CLI Benchmark Command:** Added `npm run benchmark` to `package.json`.

---

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
