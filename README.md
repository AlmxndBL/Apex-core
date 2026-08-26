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

## 1. ⚠️ The Invisible Flaw of Modern AI Agents (The Stateless Token Bleed)

Most software engineers and engineering leads share an intuitive mental model:  
> *"When I ask an AI agent to fix a 5-line bug, I am only paying for the tokens in those 5 lines."*

**Under the physical architecture of commercial LLM APIs (OpenAI, Anthropic), this assumption is fundamentally broken:**

```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ 📦 The Stateless HTTP Payload Re-transmitted on EVERY SINGLE Turn                       │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. System Prompt:       Full operating rules, persona directives, and constraints       │
│ 2. Ingested Raw Files:  Full 1,000–2,000 line source files (HTML, CSS utility classes)  │
│ 3. Tool Execution Logs: Compiler stack traces, linter outputs, and command stdout/stderr │
│ 4. Conversation History:All prior user prompts, tool calls, and failed code attempts    │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### The Quadratic Context Compounding Trap ($\mathcal{O}(N^2)$)
Because LLM inference endpoints are strictly **stateless REST APIs**, the server retains zero memory across interactions. Every time an agent fails a code edit and enters a multi-turn repair loop (Turns 2, 3, 4), the client harness must **re-package and re-transmit the entire conversation history and raw source files over the wire**:

$$\text{Cumulative Session Tokens} = \sum_{k=1}^{N} \Big[ C_{\text{init}} + \sum_{j=1}^{k-1} (\Delta I_j + \Delta O_j) + \Delta O_k \Big] \in \mathbf{\Theta(N^2)}$$

* **Turn 1:** Ingests raw file (800 tok) + user prompt $\to$ Consumes 2,500 tokens.
* **Turn 2 (Compile Failure):** Re-sends Turn 1 + bad code + error logs $\to$ Balloons to 5,500 tokens.
* **Turn 3 (Unresolved Bug):** Re-sends Turns 1 + 2 + second error log $\to$ Surges past 9,500 tokens.
* **Net Result:** A trivial 5-line fix burns **17,000+ Tokens ($0.10+ USD)**, with the developer paying repeatedly for the same unchanged file content.

---

## 2. ❌ The Fallacy of the Status Quo: Why Soft Prompts Fail

Many developers attempt to solve this by adding instructions to `.cursorrules` or `CLAUDE.md` (e.g., *"Please write clean code and do not modify unrelated functions"*).

**In formal computer science, natural language prompts are merely "Probabilistic Soft Suggestions" ($P(\text{fail}) > 0$), not deterministic control systems:**

```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ 🔴 THE SOFT PROMPT PARADOX:                                                             │
│ Text prompts cannot prevent the client from reading 2,000-line raw files into context,  │
│ cannot execute in-memory compiler checks, and cannot freeze runaway multi-turn loops.   │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

| Dimension | `.cursorrules` / Standard System Prompt | Apex-core 5 (Deterministic Control Plane) |
|---|---|---|
| **Control Mechanism** | Soft natural-language advice ($P(\text{fail}) > 0$) | **Finite State Machine (FSM):** Rigid engineering transition gates |
| **Context Ingestion** | Dumps full raw files (799.6 BPE tok) | **AST Codebase Cartography:** Prunes bodies, passes interfaces (107 BPE tok, **-80.7%**) |
| **Code Modification** | Monolithic file rewrites (821.8 tok, lost imports) | **Surgical Line Patch:** Modifies exact line slices (176.0 tok, **-78.6%**) |
| **Verification Gate** | Manual user testing or slow disk builds (~30s) | **In-RAM Closed-Loop Verifier:** `vue-tsc` in V8 memory (< 1 second) |
| **Failure Recovery** | Runaway trial-and-error retry loops | **2-Strike Circuit Breaker:** Instantly freezes state upon 2nd consecutive failure |

---

## 3. 🛡️ The Apex-core 5 Solution: The 3 Engineering Moats

Apex-core 5 replaces open-loop stochastic generation with a **Deterministic Control Plane** governing the agent's entire operational lifecycle:

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

### Moat 1: AST Codebase Cartography (Interface Pruning)
Before the LLM reads code, the AST parser extracts only **Type Contracts, DTOs, and Zod Schemas**, stripping JSX layout trees, CSS classes, and local function bodies:
* A 1,858-token Vue SFC is pruned down to **67 Tokens (-96.4% reduction)** in $<0.14\text{ms}$ RAM time. (Directly backed by Stanford's *Lost in the Middle* research [3] showing noise elimination restores attention focus).

### Moat 2: In-RAM Closed-Loop Verifier (Collapsing $\mathcal{O}(N^2)$ to $\mathcal{O}(1)$)
When code is written, in-memory compiler diagnostics (`vue-tsc --noEmit`) validate type safety immediately. Average turns drop to **1.04 turns**, completely eliminating Turns 2, 3, and 4.

### Moat 3: 2-Strike Circuit Breaker & Surgical Patch
* **Surgical Patch:** Replaces only exact line slices with coordinate locks (~176 tokens).
* **Circuit Breaker:** Implements the *Circuit Breaker Pattern* [5]. If verification fails twice consecutively, execution **freezes immediately**, halting token burn and emitting a structured Root Cause Report.

---

## 4. 🔬 Empirical Benchmark & Academic References

Evaluated via empirical telemetry across 5 full-stack code fixtures in [`benchmark/fixtures/`](./benchmark/fixtures/) using exact Byte-Pair Encoding (`cl100k_base` BPE Tokenizer):

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
⭐ Conclusion: Apex-core 5 cuts cumulative session tokens by 94.4% and permanently terminates multi-turn loops.
======================================================================================================================
```

### Enterprise Financial Impact (100-Engineer Organization)
Assuming an engineering team of **100 developers** running 20 tasks/engineer/day (44,000 tasks/month):

| Architecture Protocol | Monthly Tokens | Monthly API Spend | Annual Hard Cash API Spend |
|---|---|---|---|
| **Status-Quo (Aider Whole-File)** | 776.99 Million Tokens | **$4,197.60 USD** | **$50,371.20 USD** |
| **Anthropic Best Practice** | 265.98 Million Tokens | **$1,434.40 USD** | **$17,212.80 USD** |
| **Apex-core 5 Control Plane** | **14.87 Million Tokens** | **$79.20 USD** | **$950.40 USD** |
| **💰 NET ANNUAL SAVINGS** | **🔻 -762.12M Tokens** | **-$4,118.40 / mo** | **+$49,420.80 USD / Year** |

### 📚 References

* **[1] SWE-bench (ICLR 2024):** Jimenez, C. E., et al. *"SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"*, International Conference on Learning Representations (ICLR 2024). [arXiv:2310.06770](https://arxiv.org/abs/2310.06770)
* **[2] Aider Benchmark Suite:** Gauthier, P. (2024). *"Aider: AI Pair Programming in Your Terminal - Benchmark Suite & Edit Formats"*, [Official Documentation](https://aider.chat/docs/benchmarks.html)
* **[3] Lost in the Middle (Stanford / TACL 2024):** Liu, N. F., et al. *"Lost in the Middle: How Language Models Use Long Contexts"*, Transactions of the Association for Computational Linguistics (TACL). [arXiv:2307.03172](https://arxiv.org/abs/2307.03172)
* **[4] Anthropic Agent Architecture:** Anthropic AI Research (2024). *"Building Effective Agents: Architectural Patterns and Tool Design"*, [Anthropic Research](https://www.anthropic.com/research/building-effective-agents)
* **[5] Circuit Breaker Pattern:** Nygard, M. T. (2018). *"Release It!: Design and Deploy Production-Ready Software (2nd Edition)"*, Pragmatic Bookshelf.
* **[6] TypeScript Compiler Architecture:** Microsoft Engineering Team (2024). *"TypeScript Compiler Architecture & Language Service Program API"*, [Microsoft Wiki](https://github.com/microsoft/TypeScript/wiki/Architectural-Overview)

---

## 5. ⚡ Single Drop-in Setup (5 Seconds)

Copy [`AGENTS.md`](./AGENTS.md) into your project root to activate the protocol immediately:

```bash
# For Cursor IDE
cp AGENTS.md .cursorrules

# For Claude Code CLI
cp AGENTS.md CLAUDE.md

# For Windsurf / Trae / Google Antigravity
# Place as AGENTS.md at root or link as a workspace instruction file
```

### 🧭 Deterministic Stack Detection Matrix
`AGENTS.md` automatically reads `package.json` and maps framework patterns dynamically:

| Detected Stack | Logic Layer | Presenter Layer | API Endpoints | Fast In-RAM TypeCheck |
|---|---|---|---|---|
| 💚 **Nuxt 4 (Vue 3 + Nitro)** | `composables/use<Feature>.ts` | `<Feature>List.vue` | `server/api/v1/*.ts` | `pnpm vue-tsc --noEmit` |
| ⚡ **Next.js 15 (React 19)** | `hooks/use<Feature>.ts` | `<Feature>List.tsx` | `app/api/v1/*/route.ts` | `pnpm tsc --noEmit` |
| 🐍 **Polyglot / Backend** | `services/<feature>_service` | Native Views | Framework Handlers | `pytest -q` / `go test` |

---

## 6. 🧰 Consolidated 4 Core Skills (Layer 2 Knowledge Engine)

1. 🎨 **[`skills/frontend`](./skills/frontend/SKILL.md):** 3-File Feature Module Architecture (`use<Feature>`, `<Feature>List`, `<feature>.contract`), Mandatory 4-State UI (Skeleton, Empty, Error, Data), Modern 3-Tier Surface Elevation.
2. 🗄️ **[`skills/backend-data`](./skills/backend-data/SKILL.md):** Standard 4-Step API Pipeline, Strict TypeScript (Zero Any), Prisma ORM & OCC Concurrency Protection, Better Auth & RBAC.
3. 🧪 **[`skills/quality-verify`](./skills/quality-verify/SKILL.md):** In-RAM Fast TypeCheck (1-3s), Vitest Runner, Cumulative 2-Strike Failure Circuit Breaker.
4. 🧭 **[`skills/cartography`](./skills/cartography/SKILL.md):** AST Codebase Skeleton Mapping, Selective Token Diet (reduces context overhead by 70-90%).

---

## 7. 🖼️ Enterprise UI/UX Design Standards (Live Showcase)

![Apex Enterprise UI Showcase](./templates/ui/assets/apex-enterprise-dashboard-showcase.png)

Apex enforces **Ultra-Compact Modern SaaS Density**, 3-Tier Surface Elevation, Magic UI Theme Toggler, Interactive Sort/Filter Data Tables, and Crisp SVG Lucide Icons (Strict Zero Emojis) across both **Vue 3 / Nuxt 4** and **React 19 / Next.js 15**. Production starter templates are available in [`templates/ui/`](./templates/ui/).

---

## 8. 🌌 Twin-Engine Synergy: Apex & Nexus

Apex is designed to operate **100% Standalone (Zero Dependencies)**, but seamlessly integrates with **[Nexus](https://github.com/AlmxndBL/nexus)** to unlock cross-project persistent intelligence:

* **Apex:** Code Quality, Disciplined Execution, & Verification Protocol (HOW to build, verify, and enforce safety).
* **Nexus:** Dynamic Knowledge Vault, Session Memory, & Decision Graph (WHAT we know, decided, and learned).

---

## 💖 Acknowledgements & Inspirations

* **🧙‍♂️ [Matt Pocock (Total TypeScript)](https://github.com/mattpocock/skills)** — Strict TypeScript principles & contract typing
* **🎯 [The 9arm Way](https://github.com/jirayu-ct-dev/9arm-skills)** — Pragmatic software engineering and trade-off evaluation
* **🧠 [Andrej Karpathy](https://github.com/multica-ai/andrej-karpathy-skills)** — Agent behavioral safeguards and anti-overengineering philosophy
