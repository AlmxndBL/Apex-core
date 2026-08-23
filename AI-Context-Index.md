# 🗺️ AI Context Index & Project Architecture Map

> **Agent Guidance:** Single source of truth architectural map for AI coding agents to onboard instantly without scanning the entire workspace.
> ⚠️ **Security Notice:** Never store raw connection strings, API keys, or credentials in this file. Use environment variables or `<secret:VAR_NAME>` placeholders.

---

## 📌 1. Project Overview
- **Project Name:** Apex-core
- **Description:** Lean AI Agent Operating Protocol & Disciplined Engineering Engine
- **Core Tech Stack:** Strict TypeScript, Node.js, Prisma ORM, PostgreSQL, Nuxt 4 (Vue 3) / Next.js 15 (React 19), Tailwind CSS
- **Environment Status:** Active Protocol

---

## 📁 2. Directory Blueprint

```text
.
├── AGENTS.md                  # Master Agent Operating Protocol (v4.0)
├── AI-Context-Index.md        # AI Context Index & System Architecture Map (This file)
├── README.md                  # Global English Documentation & Quickstart
├── README_TH.md               # Thai Documentation & Community Guide
├── package.json               # Engine Configuration & Scripts
├── plugin.json                # Live Antigravity Plugin Metadata
├── presets/                   # Framework & Scope Presets (nano, nextjs, nuxt4)
├── rules/                     # 6 Domain Engineering Standards
│   ├── 01-security-auth.md
│   ├── 02-coding-standards.md
│   ├── 03-system-architecture.md
│   ├── 04-database-design.md
│   ├── 05-ux-ui-design.md
│   └── 06-testing-devops.md
├── skills/                    # 4 Consolidated Skills
│   ├── backend-data/
│   ├── cartography/
│   ├── frontend/
│   └── quality-verify/
└── templates/                 # Production Starter Templates & Utilities
```

---

## 🗄️ 3. Core Capabilities & Domains
- **Security & Auth:** Better Auth, RBAC, Dual-Token Rotation, CORS, Rate Limiting
- **Code Quality:** Strict TypeScript (no any), Zod validation, JSDoc/TSDoc
- **Architecture:** Modular Monolith, Domain-Driven Granular Routing, Spec-Driven Development (SDD)
- **Database:** Prisma ORM, PostgreSQL, OCC Concurrency Control, Zero DB Pollution Seeding
- **Frontend UI/UX:** 4-Tier Component Layering, Semantic HSL Palette, Dual Responsive Tables
- **Verification:** Sub-second In-Memory TypeCheck, Vitest, 2-Strike Loop-Breaker

---

## 🚨 4. Project-Specific Red Lines
1. **Hard Intent Lock:** Treat "explain", "investigate", "why", and "audit" requests as STRICTLY READ-ONLY until approved.
2. **Fast In-Memory Checks:** Run `tsc --noEmit` or `vue-tsc --noEmit` (1–3s). Never run full production builds for minor single-file edits.
3. **Mandatory Evidence:** Always provide actual terminal verification output before claiming completion.
4. **Surgical Diffs (YAGNI):** Edit only lines directly relevant to the user request. Zero drive-by refactoring.
