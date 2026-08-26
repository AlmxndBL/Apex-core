# ⚡ Empirical Research Study: Deterministic Control Plane vs Internationally Recognized Agent Protocols

> **Objective Evaluation on Real Code Fixtures across 5 Full-Stack Domains**  
> Evaluated at: `2026-08-26T11:38:45.728Z` | Framework Version: `Apex-core 5` | Tokenizer: `cl100k_base (gpt-tokenizer BPE)`

---

## 1. Internationally Recognized Baselines & Academic Citations

This benchmark strictly compares the architectural metrics of **Apex-core 5** against the two most prominent, peer-recognized standards in AI software engineering:

```text
[1] Jimenez, C. E., et al. (2024). "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?" 
    International Conference on Learning Representations (ICLR 2024). arXiv:2310.06770.

[2] Gauthier, P. (2024). "Aider: AI Pair Programming in Your Terminal - Benchmark Suite & Edit Formats." 
    https://aider.chat/docs/benchmarks.html

[3] Anthropic. (2024). "Building Effective Agents: Architectural Patterns and Tool Design." 
    Anthropic Research. https://www.anthropic.com/research/building-effective-agents

[4] Microsoft TypeScript Team. (2024). "TypeScript Compiler Architecture & Language Service API." 
    https://github.com/microsoft/TypeScript/wiki/Architectural-Overview
```

---

## 2. Empirical Findings: Context Ingestion Compression (ACCR)

Measured by executing programmatic AST extraction directly on real source code files in `benchmark/fixtures/` using **exact cl100k_base BPE tokenization**:

| Fixture File | Domain | Raw BPE Tokens | AST Skeleton Tokens | Compression Ratio | Extraction Latency |
|---|---|---|---|---|---|
| **01_backend_nitro.ts** | Backend & Database | **635 tok** | **138 tok** | **🔻 -78.3%** | 0.405ms |
| **02_frontend_view.vue** | Frontend UI/UX | **1858 tok** | **67 tok** | **🔻 -96.4%** | 0.083ms |
| **03_state_store.ts** | State Layer | **544 tok** | **69 tok** | **🔻 -87.3%** | 0.056ms |
| **04_schema.prisma** | Database Architecture | **399 tok** | **166 tok** | **🔻 -58.4%** | 0.136ms |
| **05_webhook_hmac.ts** | Security & Auth | **562 tok** | **95 tok** | **🔻 -83.1%** | 0.041ms |
| **GLOBAL MEAN (μ)** | **All 5 Domains** | **799.6 tok** | **107 tok** | **🔻 -80.7% (p = 0.0679)** | **< 1.0ms** |

> **Statistical disclosure:** n = 5 fixtures per arm (paired t-test, df = 4). With this sample size the compression result is **not statistically significant** at α = 0.05 (p = 0.0679). The direction of reduction is consistent across all five fixtures, but inferential strength requires a larger fixture set.

---

## 3. Edit Format Burden: Aider Benchmark Standards vs Apex-core 5 Surgical Patch

Measured directly from **actual code modifications across 5 concrete defect scenarios** using exact BPE tokens:

| Edit Paradigm | Mean Output Tokens per Defect | Token Efficiency vs Baseline | Determinism Guarantee |
|---|---|---|---|
| **Aider Whole-File Format** (Monolithic Rewrite) | **821.8 tokens** | Baseline (0%) | ⚠️ Risk of lost imports / regressions |
| **Aider Unified Diff Format** (Hunk Header + Context) | **116.6 tokens** | 🔻 -85.8% lower output | ⚠️ Sensitive to line offset drifts |
| **Apex-core 5 Surgical Patch Mode** (Rule 4 Exact Slice) | **176 tokens** | **🔻 -78.6% vs Whole-File** (p = 0.0462) · **+50.9% vs Unified Diff** (p = 0.0863) | ✅ Exact character/line lock with In-RAM check |

> **Honest trade-off:** against Aider's Unified Diff format, the Surgical Patch averages **+50.9% MORE output tokens** (p = 0.0863, not significant at n = 5). Its engineering value is deterministic line-locked application plus closed-loop verification — not raw token cost. Prefer Unified Diff when raw output cost dominates.

---

## 4. Multi-Turn Session Token Projection (Modeled)

$$\text{Cumulative Session Tokens} = \sum_{k=1}^{N} \Big[ C_{\text{init}} + \sum_{j=1}^{k-1} (\Delta I_j + \Delta O_j) + \Delta O_k \Big]$$

> **Modeling disclosure:** the comparison below is an **assumption-driven linear projection**, not an end-to-end measurement. Turn counts follow published baselines for [A]/[B]; N = 1.04 for [C] is a protocol design target pending live-agent validation. Overhead constants (4500 / 2800 / 1100 tokens per extra turn) are documented estimates — see `PROJECTION_ASSUMPTIONS` in `benchmark/runner.js`.

```text
======================================================================================================
📊 3-WAY CUMULATIVE SESSION COMPARISON (Multi-Turn Task Resolution)
======================================================================================================
⚙ MODEL    : Assumption-driven linear projection (see modeling disclosure above)
⚙ TURNS    : [A]=3.62 · [B]=2.38 · [C]=1.04 (design target, pending live-agent validation)
⚙ OVERHEAD : per-extra-turn payload estimates [A]=4500 · [B]=2800 · [C]=1100 tok
• [A] Aider Whole-File / Generic Baseline:      17,659 tokens ($0.0954 USD)
• [B] Anthropic MCP / Industry Prompt Baseline: 6,045 tokens ($0.0326 USD)
• [C] Apex-core 5 (Our Engine):                 338 tokens ($0.0018 USD)
------------------------------------------------------------------------------------------------------
⭐ NET EFFICIENCY:
   • Apex-core 5 vs Aider Baseline:     🔻 -98.1% Cumulative Token Reduction
   • Apex-core 5 vs Anthropic Baseline: 🔻 -94.4% Cumulative Token Reduction
======================================================================================================
```

---

## 5. Summary Conclusion

By replacing open-loop whole-file prompting with **AST Codebase Cartography** and **In-RAM Closed-Loop Verification**, Apex-core 5 achieves:
1. **80.7% reduction in context window ingestion footprint** (measured via exact BPE tokenization)
2. **78.6% reduction in output edit token burden** compared to whole-file rewrites (measured from real defect patches)
3. **94.4% projected cumulative session token savings** over multi-turn agent iterations (assumption-driven linear model — validate with live-agent telemetry before citing as measured fact).
