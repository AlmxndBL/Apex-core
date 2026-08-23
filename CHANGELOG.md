# 📜 Apex-core Changelog

All notable changes to the Apex AI Agent Behavioral Framework and Rules Engine will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
