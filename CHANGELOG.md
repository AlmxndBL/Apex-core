# 📜 Apex-core Changelog

All notable changes to the Apex AI Agent Behavioral Framework and Rules Engine will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.1.0] - 2026-08-22

### Added
- **Karpathy-Infused Behavioral Safeguards:** Integrated 4 core tenets into Master Orchestration (`AGENTS.md`):
  - *Confusion Surfacing Protocol:* Explicit clarity grading (🟢 Clear / 🟡 Partially Clear / 🔴 Confused) preventing silent assumptions on ambiguous requirements.
  - *Anti-Overengineering Litmus Test:* 3-question Karpathy gate preventing single-use abstractions and speculative flexibility.
  - *Success Criteria Declaration:* Goal-driven execution declaring testable criteria prior to implementation loops.
  - *Line Budget Gate & Diff Trace Accountability:* 200-line simplicity check and surgical diff tracking ensuring every diff line maps to user intent.
- **Context Budget & Token Diet Skill (`skills/context-budget`):** Specialized skill enforcing bounded file retrieval, token diet, and proactive session handoffs for deep-turn conversations.

### Changed
- Expanded Specialized Skills suite to 8 skills with full verification integrity coverage.
- Synchronized master rule references and test suite assertions across the framework.

---

## [3.0.0] - 2026-08-22

### Added
- **Capability-Seams Architecture:** Declared decoupled Seam Registry (Execution, Filesystem, Database, Verification, Memory, Knowledge) separating agent tool interfaces from swappable underlying execution providers.
- **Dynamic Skill Mounting & Unmounting Protocol:** Context-aware skill lifecycle reducing prompt clutter by mounting only active profile skills during Step 3 and cleanly unmounting on DoD pass.
- **1-Click Profile Presets Matrix:** Introduced bundle presets (`profile:nuxt4-fullstack`, `profile:react-nextjs`, `profile:api-backend`, `profile:security-audit`, `profile:devops-infra`) for single-lookup rule and skill resolution.
- **Session Evidence Stream:** Added structured Action-Evidence Chain protocol recording intents, file changes, verification commands, and outputs for deterministic session replay in Nexus.
- **Environment Seam Detection:** Step 1 discovery sub-step automatically inspecting local vs containerized runtime and database providers.

### Changed
- Upgraded `AGENTS.md` to v3.0.0 master orchestration format.
- Simplified Rule & Skill Loading Matrix to a profile-first resolution table.

---

## [2.6.0] - 2026-08-22

### Added
- **Multi-Stack Standards Enhancement:** Expanded explicit coding standards and architecture rules for React 19, Next.js 15 App Router, Server Actions Zod validation, and RSC boundary discipline alongside Nuxt 4 / Nitro.
- **Automated Framework Verification:** Added `scripts/verify-framework.js` (and `.cjs`) testing rule integrity, skill frontmatter metadata, template validity, and cross-reference coherence.
- **Package Runner Integration:** Added `package.json` with `verify`, `scan`, and `test` scripts.
- **Enhanced Gotchas Interoperability:** Synchronized Pre-flight Gotchas Gate with extended Nexus knowledge base.

### Changed
- Refined `02-coding-standards.md` with explicit React hooks cleanup, Server Actions error handling, and state immutability patterns.
- Refined `03-system-architecture.md` with dual-stack API validation guidelines (Next.js Route Handlers vs Nitro Event Handlers).
- Refined `05-ux-ui-design.md` with dual React (Shadcn/Radix/Zustand) and Vue (Nuxt UI/Pinia) component conventions.

---

## [2.5.3] - 2026-08-20

### Added
- **Domain-Driven Routing Integrity:** Enforced Anti-God Dashboard rule across all admin layouts.
- **Visual Reference Scope Protocol:** 3-tier classification to prevent design hallucination.
- **Git Shield Protection:** Pre-commit secret scanning and destructive command guards.

### Changed
- Standardized package manager auto-detection favoring `pnpm` as primary default.
- Upgraded 4-Step Methodology with right-sized Codebase Cartographer modes (Scan, Focus, Full).

---

## [2.0.0] - 2026-07-15

### Added
- **3-Tier AI Behavioral Architecture:** Split framework into Master Orchestration (`AGENTS.md`), 6 Engineering Pillars (`rules/`), and Reusable Blueprints (`templates/`).
- **7 Specialized AI Skills:** `codebase-cartographer`, `database-architect`, `design-taste-frontend`, `docker-devops-master`, `impeccable-audit`, `sandbox-testing`, `typescript-wizard`.
- **Hard Intent Classifier:** Read-only locks on investigative/audit commands to prevent premature modifications.

---

## [1.0.0] - 2026-06-01

### Added
- Initial release of Apex Agent Rules for Nuxt 3/4 and Prisma applications.
