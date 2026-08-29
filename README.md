# ⚡ Apex-core 5 — AI Coding Guidance & Verification Toolkit

> **A lean engineering guidance and verification toolkit for AI coding agents**
> Apex-core provides structured rules, skills, templates, and repository-integrity checks for Nuxt 4, Next.js, and other coding projects. External benchmark results are historical evidence, not a guarantee for every project or model.

<div align="center">

**[ 🇬🇧 English ](README.md) · [ 🇹🇭 ภาษาไทย ](README.th.md)**

</div>

<div align="center">

[![Version](https://img.shields.io/badge/version-5.4.0-3b82f6.svg)](https://github.com/AlmxndBL/Apex-core)
[![Token Savings](https://img.shields.io/badge/Token_Savings-🔻_58.4%25_empirical-10b981.svg)](https://github.com/AlmxndBL/Apex-eval)
[![License](https://img.shields.io/badge/license-MIT-8b5cf6.svg)](LICENSE)

</div>

---

## 🎯 1. The Invisible Problem: The Stateless Token Bleed

Most developers assume fixing a 5-line bug only costs tokens for those 5 lines. In reality, **commercial LLM APIs (OpenAI, Anthropic) are stateless REST APIs**. Every turn re-transmits the entire conversation history and 2,000-line raw files, causing token consumption to compound quadratically ($\mathcal{O}(N^2)$).

```text
┌──────────────────────────────────────────────────┐      ┌──────────────────────────────────────────────────┐
│ ❌ STATUS-QUO (Raw Ingestion: 1,858 BPE tok)     │      │ ✅ APEX-CORE 5 AST DIET (Interface: 67 BPE tok)  │
├──────────────────────────────────────────────────┤      ├──────────────────────────────────────────────────┤
│ <template>                                       │      │ // [AST SKELETON: Vue 3 / Nuxt 4 SFC]            │
│   <div class="min-h-screen bg-zinc-950 p-6">     │ ───> │ export interface UserTableRow {                  │
│     <!-- 80+ lines of HTML markup & SVG icons -->│      │   id: string; email: string; role: Role;         │
│     <table class="w-full border border-zinc-800">│      │ }                                                │
│   </div>                                         │      │ export interface Props { users: UserTableRow[] } │
│ </template>                                      │      │ export function useUserManagement(): StateStore; │
│ <script setup lang="ts">                         │      │                                                  │
│   // 60 lines of internal function bodies        │      │                                                  │
│ </script>                                        │      │                                                  │
└──────────────────────────────────────────────────┘      └──────────────────────────────────────────────────┘
                  🔻 Illustrative context reduction example (see external benchmark notes)
```

Apex-core 5 provides a structured protocol for AI coding work:
1. **AST Codebase Cartography:** Produces compact contract-oriented views when implementation details are not needed.
2. **Targeted Verification:** Encourages the fastest reliable typecheck and test commands available in the target project.
3. **Failure Guardrails:** Pauses automatic retries after repeated verification failures and reports evidence for the next decision.

---

## ⚡ 2. Setup & Installation (3 Flexible Modes)

### Option A: Reusable Source Checkout
Keep `Apex-core` in one location for reference or for agents that support global instruction/skill registration:
```bash
git clone https://github.com/AlmxndBL/Apex-core.git ~/.agents/Apex-core
cd ~/.agents/Apex-core && npm install
```
*Connect the files according to the selected agent's instructions. Apex-core does not automatically enforce behavior in every agent, and it does not modify target repositories by itself.*

### Option B: Lightweight Project Setup
Copy only [`AGENTS.md`](./AGENTS.md) into the target project root. This provides the core workflow, but not the linked rules, skills, or templates:
```bash
# For Cursor IDE
cp AGENTS.md .cursorrules

# For Claude Code CLI
cp AGENTS.md CLAUDE.md

# For Windsurf / Trae / Google Antigravity
# Place as AGENTS.md at repository root
```

> **No target-project runtime dependency:** Apex-core is a documentation and verification package. Target projects keep their own dependencies, lockfile, and package manager; agents should run the matching local typecheck/test commands.

### Option C: Full Apex Setup
Copy `AGENTS.md` together with `rules/`, `skills/`, and `templates/` when the agent must access the complete local library. For Codex, install Nexus separately as an MCP server if memory, project briefs, and session checkpoints are needed.

---

### 🧭 Automatic Stack Detection Matrix
`AGENTS.md` uses `package.json`, lockfiles, and existing structure as heuristics for a suitable starting point. It does not replace healthy project conventions:

| Detected Stack | Logic Layer | Presenter Layer | API Endpoints | Fast In-RAM TypeCheck |
|---|---|---|---|---|
| 💚 **Nuxt 4 (Vue 3 + Nitro)** | `composables/use<Feature>.ts` | `<Feature>List.vue` | `server/api/v1/*.ts` | `vue-tsc --noEmit` via detected manager |
| ⚡ **Next.js 15 (React 19)** | `hooks/use<Feature>.ts` | `<Feature>List.tsx` | `app/api/v1/*/route.ts` | `tsc --noEmit` via detected manager |
| 🐍 **Polyglot / Backend** | `services/<feature>_service` | Native Views | Framework Handlers | `pytest -q` / `go test` |

---

## 📊 3. External Historical Benchmark Evidence

An external **[Apex-eval](https://github.com/AlmxndBL/Apex-eval)** study reported the following results across **$N = 50$ tasks**. These figures are study-specific and should not be treated as a guarantee or as a test shipped with this repository:

| Metric | Arm A (Baseline Whole-File) | Arm B (SEARCH/REPLACE Diff) | Arm C (Apex-core Engine) | Statistical Impact |
|---|---|---|---|---|
| **Pass@1 Accuracy** | **100% (50/50)** | **100% (50/50)** | **100% (50/50)** | Zero-shot defect resolution |
| **Pass@5 Recovery** | **100%** | **100%** | **100%** | Total problem resolution |
| **Mean Turns** | **1.00** | **1.00** | **1.00** | Single-turn resolution |
| **Mean Ingestion Tokens** | 2,294 tok | 2,338 tok | **955 tok** | **🔻 -58.4% vs Baseline ($p = 0$)** |
| **Enterprise Schemas (>800 lines)** | 7,270 tok | 7,309 tok | **3,557 tok** | **🔻 -51.1% Token Diet** |
| **Context Index Docs (>2,000 lines)**| 2,453 tok | 2,530 tok | **272 tok** | **🔻 -88.9% Token Diet** |

<div align="center">

👉 **[ 🔬 Explore the Standalone Verification Suite & Raw Telemetry (Apex-eval) → ](https://github.com/AlmxndBL/Apex-eval)**  
*(Includes full $N=50$ test suites across 10 repos, runner CLI, raw JSON telemetry, and paired $t$-test statistical proofs)*

</div>

---

## 🧩 4. Consolidated 4 Core Skills (Layer 2 Knowledge Engine)

1. 🎨 **[`skills/frontend`](./skills/frontend/SKILL.md):** Feature Module Separation when complexity warrants it, applicable async UI states, and practical visual guidance.
2. 🗄️ **[`skills/backend-data`](./skills/backend-data/SKILL.md):** Standard 4-Step API Pipeline, Strict TypeScript (Zero Any), Prisma ORM & OCC Concurrency Protection, Better Auth & RBAC.
3. 🧪 **[`skills/quality-verify`](./skills/quality-verify/SKILL.md):** In-RAM Fast TypeCheck (1-3s), Vitest Runner, Cumulative 2-Strike Failure Circuit Breaker.
4. 🧭 **[`skills/cartography`](./skills/cartography/SKILL.md):** TypeScript Compiler API contract extraction and selective context reduction, with explicit limits for inferred types, imports, and schema edge cases.

---

## 🖼️ 5. Enterprise UI/UX Design Standards

![Apex Enterprise UI Showcase](./templates/ui/assets/apex-enterprise-dashboard-showcase.png)

Apex offers reusable UI starters and practical guidance for **Vue 3 / Nuxt 4** and **React 19 / Next.js 15**. Adopt only the templates that fit the product; they are not mandatory dependencies or universal visual requirements. Starters are available in [`templates/ui/`](./templates/ui/).

---

## 🌌 6. Twin-Engine Synergy: Apex & Nexus

Apex can be used standalone without a target-project runtime dependency, and can optionally pair with **[Nexus](https://github.com/AlmxndBL/nexus)** for persistent cross-project memory. The practical workflow is: load relevant state/brief → work under Apex → verify → save a Nexus session checkpoint.

* **Apex:** Code Quality, Disciplined Execution, & Verification Protocol (HOW to build, verify, and enforce safety).
* **Nexus:** Dynamic Knowledge Vault, Session Memory, & Decision Graph (WHAT we know, decided, and learned).

---

## 💖 Acknowledgements & Inspirations

* **🧙‍♂️ [Matt Pocock (Total TypeScript)](https://github.com/mattpocock/skills)** — Strict TypeScript principles & contract typing
* **🎯 [The 9arm Way](https://github.com/jirayu-ct-dev/9arm-skills)** — Pragmatic software engineering and trade-off evaluation
* **🧠 [Andrej Karpathy](https://github.com/multica-ai/andrej-karpathy-skills)** — Agent behavioral safeguards and anti-overengineering philosophy
