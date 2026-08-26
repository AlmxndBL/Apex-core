# ⚡ Apex-core 5 — The Deterministic AI Agent Operating Protocol

> **The Disciplined Senior Engineering Engine & Token Economy Control Plane for AI Coding Agents**  
> A deterministic control plane architecture engineered for autonomous AI coding agents across Nuxt 4 (Vue 3), Next.js 15 (React 19), Better Auth, Prisma ORM, and full-stack ecosystems. Reduces cumulative multi-turn token consumption by **94.4%** compared to standard industry practices.

<div align="center">

**[ 🇬🇧 English ](README.md) · [ 🇹🇭 ภาษาไทย ](README.th.md)**

</div>

[![Version](https://img.shields.io/badge/version-5.2.1-blue.svg)](https://github.com/AlmxndBL/Apex-core)
[![Token Reduction vs Industry](https://img.shields.io/badge/Token_Savings_vs_Industry-🔻_94.4%25-green.svg)](BENCHMARK.md)
[![BPE Tokenizer](https://img.shields.io/badge/Tokenizer-cl100k__base-purple.svg)](BENCHMARK.md)
[![Verification Speed](https://img.shields.io/badge/AST_Diet_Latency-<1ms-orange.svg)](BENCHMARK.md)
[![Supported Tools](https://img.shields.io/badge/Agents-Cursor%20%7C%20Claude%20Code%20%7C%20Antigravity%20%7C%20Windsurf-818CF8.svg)](https://github.com/AlmxndBL/Apex-core)
[![Statistical Significance](https://img.shields.io/badge/t--test-p_<_0.0001-purple.svg)](benchmark/reports/EMPIRICAL_STUDY.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 1. 🎯 Overview & Core Highlights

Apex-core 5 is not merely a collection of loose system prompts—it is a **Deterministic Control Plane Architecture** engineered to eliminate the 3 primary structural failure modes of modern AI coding agents: **hallucinated implementations**, **runaway multi-turn repair loops**, and **quadratic context token waste**.

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 🛡️ 3 Core Engineering Moats of Apex-core 5                                                            │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Deterministic Control Plane (Finite State Machine):                                                 │
│    Enforces strict 3-tier intent locking to separate read-only analysis, surgical patches, and         │
│    destructive operations. Prevents unprompted refactoring and freezes execution upon repeated errors. │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. AST Codebase Cartography (Token Diet Engine):                                                       │
│    Prunes implementation bodies, CSS utility classes, and HTML templates before ingestion. Feeds only │
│    type contracts, DTOs, and Zod schemas into the LLM context, reducing input tokens by 80.7% (BPE).   │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. In-RAM Closed-Loop Verifier (<1.0ms):                                                               │
│    Executes high-speed in-memory type and syntax verification (via V8/Compiler API) prior to delivery. │
│    Enforces a strict evidence-first contract (No Evidence = Not Done).                                 │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. ⚡ Single Drop-in Setup (5 Seconds)

Copy [`AGENTS.md`](./AGENTS.md) directly into your project's root directory to activate the protocol immediately:

```bash
# For Cursor IDE
cp AGENTS.md .cursorrules

# For Claude Code CLI
cp AGENTS.md CLAUDE.md

# For Windsurf / Trae / Google Antigravity
# Place as AGENTS.md at root or link as a workspace instruction file
```

### 🧭 Deterministic Stack Detection Matrix
`AGENTS.md` automatically detects your project stack via `package.json` and maps framework patterns and verification commands dynamically:

| Detected Stack | Logic Layer | Presenter Layer | API Endpoints | Fast In-RAM TypeCheck |
|---|---|---|---|---|
| 💚 **Nuxt 4 (Vue 3 + Nitro)** | `composables/use<Feature>.ts` | `<Feature>List.vue` | `server/api/v1/*.ts` | `pnpm vue-tsc --noEmit` |
| ⚡ **Next.js 15 (React 19)** | `hooks/use<Feature>.ts` | `<Feature>List.tsx` | `app/api/v1/*/route.ts` | `pnpm tsc --noEmit` |
| 🐍 **Polyglot / Backend** | `services/<feature>_service` | Native Views | Framework Handlers | `pytest -q` / `go test` |

---

## 3. 🏛️ Deep Architecture & Skills

Apex-core 5 operates on a **Two-Layer Architecture** that pairs concise, low-token core operating directives with an on-demand, deep engineering knowledge engine:

```text
                                  ┌────────────────────────────────────────────────────────┐
                                  │                  USER / TASK INPUT                     │
                                  └──────────────────────────┬─────────────────────────────┘
                                                             │
                                   ┌─────────────────────────▼─────────────────────────┐
                                   │       1. AST Cartographer (Token Diet Engine)     │
                                   │  Prunes Function Bodies, JSX/Templates & Comments │
                                   │     Extracts DTOs, Zod Schemas & Prisma AST       │
                                   └─────────────────────────┬─────────────────────────┘
                                                             │ Context Ingestion Reduced by 80.7%
                                   ┌─────────────────────────▼─────────────────────────┐
                                   │      2. 3-Tier Finite State Machine (FSM)         │
                                   │  Tier 1: Read-Only  |  Tier 2: Single-Turn Patch  │
                                   │        Tier 3: Guarded Blast-Radius Gate          │
                                   └─────────────────────────┬─────────────────────────┘
                                                             │
                                            ┌────────────────┴────────────────┐
                                            ▼                                 ▼
                                  [ Patch Mode ]                    [ Synthesis Mode ]
                             Surgical AST Line Diff              3-File Architecture Standard
                             (Rule 4 Exact Slice)                (Container + Presenter + Logic)
                                            │                                 │
                                            └────────────────┬────────────────┘
                                                             │
                                   ┌─────────────────────────▼─────────────────────────┐
                                   │     3. In-RAM Closed-Loop Verifier (<1.0ms)       │
                                   │     `vue-tsc --noEmit` / `tsc --noEmit` in RAM    │
                                   └─────────────────────────┬─────────────────────────┘
                                                             │
                                            ┌────────────────┴────────────────┐
                                            ▼ [PASS: 0 Errors]                ▼ [FAIL: 1st Strike]
                                  ┌───────────────────┐             ┌───────────────────┐
                                  │ Emit Evidence Log │             │ Targeted Retry    │
                                  │ Task Complete     │             └─────────┬─────────┘
                                  └───────────────────┘                       │ [FAIL: 2nd Strike]
                                                                    ┌─────────▼─────────┐
                                                                    │ 2-Strike Freeze   │
                                                                    │ Halt Token Burn   │
                                                                    └───────────────────┘
```

---

### 3.1 3-Tier Finite State Machine (Intent Resolution Engine)
Guards agent execution boundaries based on deterministic user intent:
1. **Tier 1 (Read-Only Investigation):** Triggered by "explain", "investigate", "audit", "why". **Strictly read-only; zero file modifications permitted.**
2. **Tier 2 (Actionable Single-Turn Flow):** Triggered by "fix", "add", "implement", "refactor". **Executes Diagnosis $\to$ Implementation $\to$ Fast Verification in a single turn without intermediate stalls.**
3. **Tier 3 (Guarded Blast-Radius Gate):** Triggered by schema drops, migration deletions, or auth provider swaps. **Mandates a blast-radius summary and halts for explicit user approval before touching code or database.**

---

### 3.2 Universal Frontend 3-File Architecture & Mandatory 4-State Contract
Enforces strict separation of concerns across UI features:

```text
features/<domain>/
├── composables/ (or hooks/)
│   └── use<Feature>.ts          # Pure Logic: API mutations, caching, and Zod validation
├── components/
│   ├── <Feature>List.vue (.tsx) # Pure Presentation (Dumb UI): renders props, emits actions
│   ├── <Feature>Form.vue (.tsx) # Form UI & client-side validation
│   └── <Feature>Skeleton.vue    # Loading skeleton matching exact layout geometry
├── types/
│   └── <feature>.contract.ts    # Zod schemas, TypeScript interfaces, and DTO definitions
└── index.vue (or Page.tsx)       # Smart Container: binds composable to presentation components
```

* **Mandatory 4-State UI Contract:** Every data-driven UI feature view must implement:
  1. **Loading State:** Geometric layout skeleton loader (no full-screen spinners).
  2. **Empty State:** Distinct dashed container + icon + explanation + primary CTA button.
  3. **Error State:** High-contrast alert card + explicit error message + interactive `Retry` button.
  4. **Data State:** Fully rendered presentation with responsive table/card layout.

---

### 3.3 Universal Backend 4-Step Pipeline & OCC Concurrency
* **4-Step Pipeline:** `Validate (Zod Schema)` $\longrightarrow$ `Authorize (Session & RBAC)` $\longrightarrow$ `Service Layer Execution` $\longrightarrow$ `Structured JSON Response`
* **Optimistic Concurrency Control (OCC):** Adds `version Int @default(0)` on critical models (balances, inventory) to prevent lost updates during race conditions.
* **N+1 Prevention:** Enforces explicit `select` or bounded `include`; strictly prohibits querying models inside loops.

---

### 3.4 2-Strike Circuit Breaker (Anti-Runaway Protocol)
When an agent's code change fails type verification:
* **Strike 1:** Allows one targeted retry focusing solely on the reported compile error.
* **Strike 2 (Freeze):** If verification fails a second consecutive time, **execution freezes immediately**. Halts token burn and presents a structured Root Cause Report with actionable options for human direction.

---

### 3.5 Consolidated 4 Core Skills (Layer 2 Knowledge Engine)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 🧰 CONSOLIDATED PRODUCTION SKILLS                                                                      │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. 🎨 skills/frontend:                                                                                 │
│    3-File Feature Module Pattern, 4-State UI Contract, Tailwind CSS, and 3-Tier Surface Elevation.     │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. 🗄️ skills/backend-data:                                                                             │
│    Strict TypeScript (Zero Any), 4-Step API Pipeline, Prisma ORM, Better Auth, RBAC, and OCC.          │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. 🧪 skills/quality-verify:                                                                           │
│    In-RAM Fast TypeCheck (1-3s), Vitest Sandbox Runner, and 2-Strike Circuit Breaker Engine.           │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. 🧭 skills/cartography:                                                                              │
│    AST Codebase Skeleton Mapping and Selective Token Diet (reduces context overhead by 70-90%).        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. 🔬 Empirical Benchmark & References

The architectural performance of **Apex-core 5** was evaluated via empirical telemetry across 5 full-stack code fixtures in [`benchmark/fixtures/`](./benchmark/fixtures/) using exact Byte-Pair Encoding (`cl100k_base` BPE Tokenizer) and sub-millisecond hardware timers against standard peer-recognized agent workflows:

```text
======================================================================================================================
📊 EMPIRICAL BENCHMARK TELEMETRY (Real Code Fixtures across 5 Full-Stack Domains)
======================================================================================================================
Pricing Baseline: $3.00 / 1M Input Tokens · $15.00 / 1M Output Tokens (Standard Frontier Tier)

[ 1. Context Ingestion Diet (AST Context Compression Ratio - ACCR) ]
  • Raw Codebase File Mean:                  799.6 ± 597.82 BPE tokens
  • AST Skeleton (Apex-core 5 Mean):         107.0 ± 43.67 BPE tokens  ──> 🔻 -80.7% Context Diet (p < 0.0001)
  • In-RAM Extraction Latency:               < 0.35ms (Sub-millisecond High-Speed Parsing)

[ 2. Real Defect Edit Output Burden (Aider Benchmark Standard) ]
  • [A] Aider Whole-File Format [2] (Rewrite):  821.8 BPE tokens (Base 0%)
  • [B] Aider Unified Diff Format [2] (Hunk):   116.6 BPE tokens (🔻 -85.8%)
  • [C] Apex-core 5 Surgical Patch Mode:        176.0 BPE tokens (🔻 -78.6% vs Whole File Rewrite)

[ 3. Cumulative Multi-Turn Session Projection ]
  • [A] Unconstrained Baseline [1, 2]:          17,659 tokens (avg 3.62 turns per SWE-bench statistics)
  • [B] Anthropic Industry Baseline [2, 3]:      6,045 tokens (avg 2.38 turns per Anthropic best practice)
  • [C] Apex-core 5 (Our Engine):                  338 tokens (avg 1.04 turns via In-RAM verifier) ──> 🔻 -94.4%
======================================================================================================================
⭐ Conclusion: AST Cartography combined with In-RAM Verification cuts cumulative tokens by 94.4% and breaks loops.
======================================================================================================================
```

### Comparative Architecture Matrix

| Dimension | [A] Generic Unconstrained Prompt | [B] Industry Guideline (Aider / Anthropic) | [C] Apex-core 5 (Deterministic Control Plane) |
|---|---|---|---|
| **Context Ingestion** | Ingests full raw files (799.6 tok) | Ingests full files for analysis | **AST Cartography:** Extracts interfaces & contracts (107.0 tok, 80.7% diet) |
| **Command Control** | Open-loop with no hard guardrails | Prompt instructions without hard gates | **3-Tier Finite State Machine:** Hard locks Read-Only, Patch, and Guarded Gates |
| **Code Modification** | Rewrites entire file (821.8 tok) | Unified Diff Hunk (116.6 tok) | **Surgical Line Patch:** Replaces exact lines (176.0 tok with exact line lock) |
| **Code Verification** | Full project build (~30s) | Partial lint or disk build (~22s) | **In-RAM V8 Verification:** `vue-tsc --noEmit` (<1s, 10x+ faster feedback) |
| **Failure Handling** | Runaway retry loops until token cap | Manual user interruption required | **2-Strike Circuit Breaker:** Freezes state on 2 consecutive failures |
| **UI Completeness** | Happy path only | Recommends basic error handling | **Mandatory 4-State UI Contract:** Skeleton, Empty CTA, Error Retry, Data Table |

### 📚 References

* **[1] SWE-bench (ICLR 2024):** Jimenez, C. E., et al. *"SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"*, International Conference on Learning Representations (ICLR 2024). [arXiv:2310.06770](https://arxiv.org/abs/2310.06770)
* **[2] Aider Benchmark Suite:** Gauthier, P. (2024). *"Aider: AI Pair Programming in Your Terminal - Benchmark Suite & Edit Formats"*, [Aider Official Documentation](https://aider.chat/docs/benchmarks.html)
* **[3] Anthropic Agent Architecture:** Anthropic Research (2024). *"Building Effective Agents: Architectural Patterns and Tool Design"*, [Anthropic AI Research](https://www.anthropic.com/research/building-effective-agents)
* **[4] TypeScript Compiler Architecture:** Microsoft Engineering Team (2024). *"TypeScript Compiler Architecture & Language Service API"*, [Microsoft Wiki](https://github.com/microsoft/TypeScript/wiki/Architectural-Overview)

> 📊 **Full Empirical Whitepaper:** [`BENCHMARK.md`](./BENCHMARK.md) & [`benchmark/reports/EMPIRICAL_STUDY.md`](./benchmark/reports/EMPIRICAL_STUDY.md)  
> 🧪 **Reproduce Locally:** `npm run benchmark`

---

## 5. 🖼️ Enterprise UI/UX Design Standards (Live Showcase)

![Apex Enterprise UI Showcase](./templates/ui/assets/apex-enterprise-dashboard-showcase.png)

Apex enforces **Ultra-Compact Modern SaaS Density**, 3-Tier Surface Elevation, Magic UI Theme Toggler, Interactive Sort/Filter Data Tables, and Crisp SVG Lucide Icons (Strict Zero Emojis) across both **Vue 3 / Nuxt 4** and **React 19 / Next.js 15**. Production starter templates are available in [`templates/ui/`](./templates/ui/).

---

## 6. 🌌 Twin-Engine Synergy: Apex & Nexus

Apex is designed to operate **100% Standalone (Zero Dependencies)**, but seamlessly integrates with **[Nexus](https://github.com/AlmxndBL/nexus)** to unlock cross-project persistent intelligence:

* **Apex:** Code Quality, Disciplined Execution, & Verification Protocol (HOW to build, verify, and enforce safety).
* **Nexus:** Dynamic Knowledge Vault, Session Memory, & Decision Graph (WHAT we know, decided, and learned).

---

## 💖 Acknowledgements & Inspirations

* **🧙‍♂️ [Matt Pocock (Total TypeScript)](https://github.com/mattpocock/skills)** — Strict TypeScript principles & contract typing
* **🎯 [The 9arm Way](https://github.com/jirayu-ct-dev/9arm-skills)** — Pragmatic software engineering and trade-off evaluation
* **🧠 [Andrej Karpathy](https://github.com/multica-ai/andrej-karpathy-skills)** — Agent behavioral safeguards and anti-overengineering philosophy
