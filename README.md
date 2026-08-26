# ⚡ Apex-core 5 — The Deterministic AI Agent Operating Protocol

> **The Disciplined Senior Engineering Engine & Token Economy Control Plane for AI Coding Agents**  
> A deterministic control plane engineered for autonomous AI coding agents across Nuxt 4 (Vue 3), Next.js 15 (React 19), Better Auth, Prisma ORM, and full-stack ecosystems. Reduces cumulative multi-turn token consumption by **94.4%** compared to standard industry practices.

<div align="center">

**[ 🇬🇧 English ](README.md) · [ 🇹🇭 ภาษาไทย ](README.th.md) | [ 🌐 Open in Browser (HTML) ](README.html)**

</div>

[![Version](https://img.shields.io/badge/version-5.2.1-blue.svg)](https://github.com/AlmxndBL/Apex-core)
[![Token Reduction vs Industry](https://img.shields.io/badge/Token_Savings_vs_Industry-🔻_94.4%25-green.svg)](BENCHMARK.md)
[![BPE Tokenizer](https://img.shields.io/badge/Tokenizer-cl100k__base-purple.svg)](BENCHMARK.md)
[![Verification Speed](https://img.shields.io/badge/AST_Diet_Latency-<1ms-orange.svg)](BENCHMARK.md)
[![Supported Tools](https://img.shields.io/badge/Agents-Cursor%20%7C%20Claude%20Code%20%7C%20Antigravity%20%7C%20Windsurf-818CF8.svg)](https://github.com/AlmxndBL/Apex-core)
[![Statistical Significance](https://img.shields.io/badge/t--test-p_<_0.0001-purple.svg)](BENCHMARK.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

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
1. **AST Codebase Cartography:** Prunes implementation bodies, passing pure type contracts (**-80.7% Context Diet**).
2. **In-RAM Closed-Loop Verifier:** Runs `vue-tsc` / `tsc` in RAM in $<1\text{s}$, driving single-turn resolution ($N \to 1.04$).
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

## 📊 3. Empirical Benchmark Summary

Evaluated across 5 production-grade full-stack fixtures using exact Byte-Pair Encoding (`cl100k_base` BPE Tokenizer):

| Metric | Status-Quo (Aider / Generic) | Anthropic Best Practice | Apex-core 5 Control Plane | Net Impact |
|---|---|---|---|---|
| **Context Ingestion** | 799.6 BPE tok (Full File) | 799.6 BPE tok | **107.0 BPE tok (AST)** | **🔻 -80.7% Context Diet** |
| **Output Edit Burden** | 821.8 tok (Whole Rewrite) | 116.6 tok (Unified Diff) | **176.0 tok (Surgical Patch)** | **🔻 -78.6% vs Rewrite** |
| **Average Turns** | 3.62 turns (SWE-bench) | 2.38 turns | **1.04 turns (In-RAM)** | **Single-Turn Resolution** |
| **Cumulative Session Tokens** | 17,659 tokens ($0.0954) | 6,045 tokens ($0.0326) | **338 tokens ($0.0018)** | **🔻 -94.4% Savings** |
| **Annual Org API Cost (100 devs)** | $50,371 USD / yr | $17,212 USD / yr | **$950 USD / yr** | **💰 Saves +$49,420 / yr** |

<div align="center">

👉 **[ 🔬 Read the Complete Empirical Research Whitepaper (BENCHMARK.md) → ](BENCHMARK.md)**  
*(Includes $\mathcal{O}(N^2)$ mathematical proofs, 5-domain telemetry data, and 6 academic literature citations)*

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
