# ⚡ Apex-core 5 — The Deterministic AI Agent Operating Protocol

> **The Disciplined Senior Engineering Engine & Token Economy Control Plane for AI Coding Agents**  
> A deterministic control plane engineered for autonomous AI coding agents across Nuxt 4 (Vue 3), Next.js 15 (React 19), Better Auth, Prisma ORM, and full-stack ecosystems. Empirically proven to reduce input token consumption by **58.4% on average (and up to 88.9% on large production schemas)** ($p = 0.000000$) across 50 real-world benchmark tasks.

<div align="center">

**[ 🇬🇧 English ](README.md) · [ 🇹🇭 ภาษาไทย ](README.th.md)**

</div>

<div align="center">

[![Version](https://img.shields.io/badge/version-5.3.0-3b82f6.svg)](https://github.com/AlmxndBL/Apex-core)
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
                 🔻 96.4% Context Payload Eliminated (<0.14ms V8 In-RAM Extraction)
```

Apex-core 5 replaces probabilistic soft prompts (`.cursorrules`) with a **Deterministic Control Plane**:
1. **AST Codebase Cartography:** Prunes implementation bodies, passing pure type contracts (**-77.6% Context Diet**, p = 0.0031).
2. **In-RAM Closed-Loop Verifier:** Runs `vue-tsc` / `tsc` in RAM in $<1\text{s}$, targeting single-turn resolution ($N \to 1.04$ design target).
3. **2-Strike Circuit Breaker:** Hard-freezes execution on the 2nd failure, permanently eliminating infinite loops.

---

## ⚡ 2. Single Drop-in Setup (5 Seconds)

Copy [`AGENTS.md`](./AGENTS.md) into your project root to activate the protocol immediately:

```bash
# For Cursor IDE
cp AGENTS.md .cursorrules

# For Claude Code CLI
cp AGENTS.md CLAUDE.md

# For Windsurf / Trae / Google Antigravity
# Place as AGENTS.md at repository root
```

### 🧭 Automatic Stack Detection Matrix
`AGENTS.md` automatically detects your stack from `package.json` and enforces the matching pipeline:

| Detected Stack | Logic Layer | Presenter Layer | API Endpoints | Fast In-RAM TypeCheck |
|---|---|---|---|---|
| 💚 **Nuxt 4 (Vue 3 + Nitro)** | `composables/use<Feature>.ts` | `<Feature>List.vue` | `server/api/v1/*.ts` | `pnpm vue-tsc --noEmit` |
| ⚡ **Next.js 15 (React 19)** | `hooks/use<Feature>.ts` | `<Feature>List.tsx` | `app/api/v1/*/route.ts` | `pnpm tsc --noEmit` |
| 🐍 **Polyglot / Backend** | `services/<feature>_service` | Native Views | Framework Handlers | `pytest -q` / `go test` |

---

## 📊 3. Empirical Benchmark & Verification Evidence

Apex-core is empirically verified using the dedicated **[Apex-eval](https://github.com/AlmxndBL/Apex-eval)** execution-based benchmark suite across **$N = 50$ real-world production tasks** extracted from 10 actual GitHub repositories (150 live trajectories evaluated on Frontier APIs):

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

## 🧰 4. Consolidated 4 Core Skills (Layer 2 Knowledge Engine)

1. 🎨 **[`skills/frontend`](./skills/frontend/SKILL.md):** 3-File Feature Module Architecture (`use<Feature>`, `<Feature>List`, `<feature>.contract`), Mandatory 4-State UI (Skeleton, Empty, Error, Data), Modern 3-Tier Surface Elevation.
2. 🗄️ **[`skills/backend-data`](./skills/backend-data/SKILL.md):** Standard 4-Step API Pipeline, Strict TypeScript (Zero Any), Prisma ORM & OCC Concurrency Protection, Better Auth & RBAC.
3. 🧪 **[`skills/quality-verify`](./skills/quality-verify/SKILL.md):** In-RAM Fast TypeCheck (1-3s), Vitest Runner, Cumulative 2-Strike Failure Circuit Breaker.
4. 🧭 **[`skills/cartography`](./skills/cartography/SKILL.md):** AST Codebase Skeleton Mapping, Selective Token Diet (reduces context overhead by 70-90%).

---

## 🖼️ 5. Enterprise UI/UX Design Standards

![Apex Enterprise UI Showcase](./templates/ui/assets/apex-enterprise-dashboard-showcase.png)

Apex enforces **Ultra-Compact Modern SaaS Density**, 3-Tier Surface Elevation, Magic UI Theme Toggler, Interactive Sort/Filter Data Tables, and Crisp SVG Lucide Icons (Strict Zero Emojis) across **Vue 3 / Nuxt 4** and **React 19 / Next.js 15**. Starters are available in [`templates/ui/`](./templates/ui/).

---

## 🌌 6. Twin-Engine Synergy: Apex & Nexus

Apex operates **100% Standalone (Zero Dependencies)**, but seamlessly pairs with **[Nexus](https://github.com/AlmxndBL/nexus)** for persistent cross-project memory:

* **Apex:** Code Quality, Disciplined Execution, & Verification Protocol (HOW to build, verify, and enforce safety).
* **Nexus:** Dynamic Knowledge Vault, Session Memory, & Decision Graph (WHAT we know, decided, and learned).

---

## 💖 Acknowledgements & Inspirations

* **🧙‍♂️ [Matt Pocock (Total TypeScript)](https://github.com/mattpocock/skills)** — Strict TypeScript principles & contract typing
* **🎯 [The 9arm Way](https://github.com/jirayu-ct-dev/9arm-skills)** — Pragmatic software engineering and trade-off evaluation
* **🧠 [Andrej Karpathy](https://github.com/multica-ai/andrej-karpathy-skills)** — Agent behavioral safeguards and anti-overengineering philosophy
