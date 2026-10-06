# 🗺️ AI Context Index & Project Architecture Map

> **Agent Guidance:** Single source of truth architectural map for AI coding agents to onboard instantly without scanning the entire workspace.
> ⚠️ **Security Notice:** Never store raw connection strings, API keys, or credentials in this file. Use environment variables or `<secret:VAR_NAME>` placeholders.

---

## 📌 1. Project Overview
- **Project Name:** Apex-core
- **Description:** Lean AI Agent Operating Protocol & Disciplined Engineering Engine
- **Supported Stack Examples:** Strict TypeScript, Node.js, Prisma ORM, PostgreSQL, Nuxt 4 (Vue 3), Next.js 15 (React 19), and Tailwind CSS. These are presets, not mandatory dependencies.
- **Environment Status:** Active Protocol

---

## 📁 2. Directory Blueprint

```text
.
├── AGENTS.md                  # Micro-Kernel Operating Protocol (v6.0.0)
├── AI-Context-Index.md        # AI Context Index & System Architecture Map (This file)
├── README.md                  # Master Documentation & Single Drop-in Guide
├── package.json               # Engine Configuration & Scripts
├── plugin.json                # Live Antigravity Plugin Metadata
├── core/                      # Universal Principles & Architecture Bounds
│   └── principles.md          # Language-Agnostic Security, Error Handling, Git & OOP Rules
├── adapters/                  # JIT Pluggable Modular Adapters
│   ├── web-fullstack.md       # Nuxt 4, Next.js 15, Tailwind, 4-State UI
│   ├── backend-data.md        # Node, Prisma 7, PostgreSQL, OCC, Concurrency
│   └── polyglot-core.md       # Python (FastAPI/mypy), C# (.NET 8), Shell/CLI
├── rules/                     # Legacy Rules (Preserved with v6.0 Deprecation Bridges)
│   ├── 01-security-auth.md
│   ├── 02-coding-standards.md
│   ├── 03-system-architecture.md
│   ├── 04-database-design.md
│   ├── 05-ux-ui-design.md
│   └── 06-testing-devops.md
├── skills/                    # Specialized Skills (Entry Point + Domain Pillars)
│   ├── apex-core/             # Entry Point: Dispatches Micro-Kernel & JIT Adapters
│   ├── backend-data/
│   ├── cartography/
│   ├── frontend/
│   └── quality-verify/        # Fast Verification Engine & Strict Seam Taxonomy
└── templates/                 # Production Starter Templates, DevOps & Blueprints
    ├── docker/                # compose.dev.yaml & Dockerfile.fullstack
    ├── ci/                    # github-ci.yml (4-Stage Fail-Fast)
    └── blueprints/            # Reference Blueprints & Dual Healthchecks
```

---

## 🗄️ 3. Core Capabilities & Domains
- **Security & Auth:** Threat-model-driven authentication, RBAC, CORS, and rate limiting; Better Auth and dual-token rotation are optional patterns.
- **Code Quality:** Strict TypeScript (no any), Zod validation, JSDoc/TSDoc, Container-Presenter pattern
- **Architecture:** Modular Monolith, Domain-Driven Granular Routing, Spec-Driven Development (SDD)
- **Database:** Relational database patterns, optional Prisma/PostgreSQL, OCC for contested state, and safe seeding when a database exists.
- **Frontend UI/UX:** Feature Module Separation when useful, applicable async states, and optional responsive table patterns
- **Verification:** Fast targeted typechecks and behavior tests, adaptive completion checks, and a two-strike loop breaker for consecutive unexpected verification failures

---

## 🚨 4. Project-Specific Red Lines
1. **3-Tier Dynamic Intent:** Tier 1 (Read-Only) vs Tier 2 (Actionable: diagnose+fix in 1 turn) vs Tier 3 (Guarded Destructive: halt for approve).
2. **Dual Execution Modes:** Patch Mode (surgical diffs for bug fixes) vs Synthesis Mode (holistic feature modules — only the files the feature needs — for new features & UI).
3. **Fast In-Memory Checks:** Run `tsc --noEmit` or `vue-tsc --noEmit` via the detected package manager. Never run full production builds for minor single-file edits.
4. **Mandatory Evidence:** Always provide actual terminal verification output before claiming completion.

