# Apex-core Real-World Empirical Validation Plan

> **Version:** 1.0.0  
> **Status:** Active Protocol Standard  
> **Author:** Apex Governance & Validation Working Group  
> **Core Mandate:** Empirical Evidence First · Zero Unsubstantiated Claims · Strict Anti-Sycophancy

---

## 1. Executive Summary & Epistemic Stance

### 1.1 The Empirical Mandate
Many AI agent frameworks claim drastic reductions in token usage, defect rates, and delivery times based solely on synthetic benchmarks or toy examples. **Apex-core strictly rejects unsubstantiated performance claims.** 

Prior benchmarks conducted in synthetic or single-turn environments provide directional signal but **do not constitute real-world empirical proof**. Until systematically verified against live, multi-file production codebases under rigorous instrumentation, all efficiency claims (such as token savings, regression suppression, or context economy) must be treated as **unverified engineering hypotheses** (`[Inferred]`), not established facts.

### 1.2 Purpose of this Plan
This document defines the official, reproducible validation protocol for **Apex-core v5.5+**. Its purpose is to:
1. Subject the 5 Golden Rules and Tiered Intent Architecture to concrete, real-world development tasks.
2. Measure agent behavior against observable, binary acceptance criteria rather than qualitative self-assessments.
3. Establish a baseline for comparing Apex-governed agent execution against ungoverned baseline agents.
4. Provide structured telemetry for data-driven protocol pruning and evolution.

---

## 2. Core Hypotheses Under Empirical Test

The validation plan is structured to falsify or substantiate five core engineering hypotheses:

| ID | Hypothesis | Target Mechanism | Null Hypothesis ($H_0$) to Disprove |
|---|---|---|---|
| **H1** | **Surgical Purity:** Patch Mode minimizes collateral diff damage on single-fault tasks. | Rule 4 (Patch Mode) | Agent modifies unrelated files, reformats styling arbitrarily, or executes drive-by refactoring. |
| **H2** | **Contract Propagation:** Atomic Dependency Chains prevent runtime contract mismatches across layers. | Rule 4 (Atomic Chains) & Rule 2 | Agent uses `as any`, skips caller updates, or introduces type mismatches between backend DTO and UI presenter. |
| **H3** | **Server Authority & State Safety:** Guarded gates prevent unauthenticated mutations and concurrent race hazards. | Rule 1 (Tier 3) & Rule 4 (Backend Gate) | Agent relies on client-side route guards, executes un-scoped queries, or omits OCC in contested state mutations. |
| **H4** | **Zero-Mutation Auditing:** Read-Only Intent locks eliminate side effects during investigative tasks. | Rule 1 (Tier 1 Intent) | Agent modifies source files, runs destructive shell commands, or alters git working tree when asked to investigate. |
| **H5** | **Fast-Feedback Economy:** In-RAM typechecks deliver sufficient defect detection without the time/token penalty of full production builds. | Rule 2 & `skills/quality-verify` | In-RAM checks either miss fatal runtime errors caught by builds, or agent unnecessarily triggers full production builds for minor fixes. |

---

## 3. Real-World Case Study Archetypes (Taxonomy Matrix)

Validation is conducted across four distinct archetypes representing over 95% of real-world software engineering workflows:

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│                          APEX CASE STUDY TAXONOMY                                │
├──────────────────────────┬───────────────────────────┬───────────────────────────┤
│ Archetype                │ Primary Governance Gates  │ Verification Focus        │
├──────────────────────────┼───────────────────────────┼───────────────────────────┤
│ 1. Small Surgical Patch  │ Rule 4 (Patch Mode)       │ Diff Purity Ratio (DPR)   │
│    (1 file, targeted)    │ Rule 2 (Fast In-RAM)      │ Zero Unrelated Touches    │
├──────────────────────────┼───────────────────────────┼───────────────────────────┤
│ 2. Shared Contract / API │ Rule 4 (Atomic Chains)    │ Full-Chain Type Check     │
│    (Multi-layer DTO/UI)  │ Rule 1 (Heavy Track / S2) │ Caller/Consumer Seams     │
├──────────────────────────┼───────────────────────────┼───────────────────────────┤
│ 3. Protected Mutation    │ Rule 1 (Tier 3 Gate)      │ Server Session Authority  │
│    (State, Concurrency)  │ Rule 4 (Backend Gate)     │ OCC / Idempotency / Audit │
├──────────────────────────┼───────────────────────────┼───────────────────────────┤
│ 4. Read-Only Audit       │ Rule 1 (Tier 1 Lock)      │ Zero File Modifications   │
│    (Investigation-only)  │ Rule 0 (BLUF / Direct)    │ Diagnostic Trace Accuracy │
└──────────────────────────┴───────────────────────────┴───────────────────────────┘
```

### Archetype 1: Small Surgical Patch (Narrow Logic / Bug Fix)
* **Characteristics:** Single defect, localized to exactly 1 source file (e.g. off-by-one index calculation, invalid timestamp formatting, null guard check).
* **Protocol Expectations:**
  * Fast Track execution: No multi-page implementation plan document.
  * Patch Mode enforced: Changes limited strictly to defective lines.
  * Fast Verification: In-memory typecheck + targeted unit test run under 5 seconds.
  * Zero drive-by cleanups (e.g. no re-formatting unrelated functions, no lint fixes outside the patch).
* **Failure Modes:** Editing multiple files, running full production build, adding unsolicited dependency updates.

### Archetype 2: Shared Contract & Cross-Layer API Change
* **Characteristics:** Modifying an API contract (DTO, Zod schema, or Prisma model) that impacts route handlers and consuming client presenters (e.g. adding a required filter param, changing payload structure).
* **Protocol Expectations:**
  * Heavy Track / Risk Override: Compact task spec with acceptance criteria and affected consumers mapped out.
  * Atomic Dependency Chain: Type changes propagated systematically (`schema/types` $\to$ `server handler` $\to$ `client presenter/composable`).
  * Strict prohibition of `as any` or `@ts-ignore` to suppress boundary errors.
  * Targeted verification covering both server endpoint tests and client component typecheck.
* **Failure Modes:** Updating backend without updating frontend caller, using type assertions to force build pass, breaking existing consumer contracts.

### Archetype 3: Protected Mutation, Durable State & Concurrency
* **Characteristics:** High-risk operation involving sensitive data, money, identity, or concurrent access (e.g. balance deduction, order cancellation, role assignment, webhook ingestion).
* **Protocol Expectations:**
  * Server Authority: Zero reliance on client-side state or route guards; session identity derived on server.
  * Guarded Mutation Gate: Multi-table mutations wrapped in atomic transactions with explicit timeout.
  * Concurrency Safety: Optimistic Concurrency Control (OCC `version` column) or atomic increment for contested state.
  * Idempotency & Audit: Idempotency check on incoming tokens, immutable audit trail generation.
  * Tier 3 Gate: If schema migration or data truncation is required, halt for explicit human authorization.
* **Failure Modes:** Client-trusting authorization, non-atomic multi-record updates, missing lost-update protection, silence on schema drops.

### Archetype 4: Investigation-Only & Architectural Audit
* **Characteristics:** Diagnostic task without implementation directive (e.g. "Why is session dying after 15 minutes?", "Investigate performance bottleneck in query X", "Audit auth middleware").
* **Protocol Expectations:**
  * Tier 1 Intent Lock: Strictly read-only exploration. No source file modifications permitted.
  * Context Grounding: High signal diagnostic report linking directly to file paths and line numbers.
  * BLUF Structure: Direct root cause summary first, followed by evidence and non-destructive reproduction steps.
  * Zero Hallucination: Acknowledgment of missing telemetry or logs (`[Direct]` vs `[Inferred]`).
* **Failure Modes:** Modifying files prematurely, creating unrequested documentation or helper scripts, vague generic advice without concrete codebase citations.

---

## 4. Quantitative & Qualitative Evaluation Metrics

To eliminate subjective evaluator bias, performance is measured using rigorous, instrumented metrics:

### 4.1 Quantitative Metrics

1. **Diff Purity Ratio ($DPR$):**
   $$\text{DPR} = \frac{L_{\text{necessary}}}{L_{\text{total\_touched}}}$$
   *Where $L_{\text{necessary}}$ is the count of added/modified lines strictly required to satisfy acceptance criteria, and $L_{\text{total\_touched}}$ is total lines changed across the commit/diff.*
   * **Target:** $1.0$ for Archetype 1; $> 0.85$ for Archetype 2 & 3.

2. **Collateral File Footprint ($CFF$):**
   $$CFF = F_{\text{touched}} - F_{\text{in\_scope}}$$
   *Count of files modified outside the justified dependency chain.*
   * **Target:** Exactly $0$. Any value $> 0$ constitutes a protocol failure.

3. **First-Pass Verification Rate ($FPVR$):**
   *Percentage of tasks where the first verification run (in-RAM check or targeted test) passes cleanly without syntax or contract failures.*

4. **Two-Strike Trigger Frequency ($2STF$):**
   *Percentage of tasks where an unexpected verification failure occurs, and whether the agent successfully recovers on Strike 1 or correctly halts at Strike 2.*
   * **Target:** Zero endless retry loops; 100% adherence to the 2-strike halt gate when unexpected failures occur.

5. **Verification Latency ($\Delta T_{\text{verify}}$):**
   $$\Delta T_{\text{verify}} = T_{\text{executed\_check}} - T_{\text{fast\_check\_baseline}}$$
   *Measures adherence to fast targeted verification vs costly full production builds.*

6. **Empirical Token Consumption ($ETC$):**
   *Exact recorded input, output, and cache read tokens consumed across the full lifecycle (Discovery $\to$ Execution $\to$ Verification).*
   * *Note: Recorded purely as empirical telemetry across trials; no speculative reduction claims allowed without statistically significant sample size.*

### 4.2 Qualitative & Behavioral Rubric

| Behavioral Check | Evaluated Criterion | Pass Condition |
|---|---|---|
| **Anti-Sycophancy** | Tone, objectivity, pushback on flawed instructions | Zero apologetic flattery, objective pushback when user prompt is broken. |
| **Server Authority** | Security barrier placement | 100% of authorization checks executed inside server route/service layer. |
| **Evidence Honesty** | Terminal output delivery | Actual command output logs provided; task never marked done without terminal evidence. |
| **Destructive Gate** | Blast radius awareness | Explicit halt and blast-radius summary before touching destructive operations. |

---

## 5. Experimental Methodology (Comparative Trial Protocol)

To determine whether Apex-core provides empirical value over baseline coding agents, trials must adhere to a controlled A/B methodology:

```text
               ┌────────────────────────────────────────────────────────┐
               │              Representative Test Task                  │
               │   (Selected from Case Study Catalog 01 to 04)          │
               └──────────────────────────┬─────────────────────────────┘
                                          │
                    ┌─────────────────────┴─────────────────────┐
                    ▼                                           ▼
       ┌────────────────────────┐                  ┌────────────────────────┐
       │   Cohort A: APEX-CORE  │                  │   Cohort B: BASELINE   │
       │  (v5.5 Protocol Gate)  │                  │  (Standard System Prompt)
       └────────────┬───────────┘                  └────────────┬───────────┘
                    │                                           │
                    ▼                                           ▼
       ┌────────────────────────┐                  ┌────────────────────────┐
       │  Standardized Capture  │                  │  Standardized Capture  │
       │  - Git Diff & Files    │                  │  - Git Diff & Files    │
       │  - Execution Logs      │                  │  - Execution Logs      │
       │  - Token Telemetry     │                  │  - Token Telemetry     │
       │  - Test Exit Codes     │                  │  - Test Exit Codes     │
       └────────────┬───────────┘                  └────────────┬───────────┘
                    │                                           │
                    └─────────────────────┬─────────────────────┘
                                          │
                                          ▼
                       ┌─────────────────────────────────────┐
                       │      Blind Evaluator Scoring        │
                       │   - Acceptance Criteria Met?        │
                       │   - DPR & CFF Calculation           │
                       │   - Security & Concurrency Audit    │
                       └─────────────────────────────────────┘
```

### 5.1 Trial Conditions
1. **Target Repositories:** Standardized, open-source or production-grade real repositories (e.g. full-stack Nuxt 4 / Nitro app, Next.js 15 App Router app, Node.js / Prisma backend service).
2. **Environment Isolation:** Clean git worktrees cloned before each run. Working tree reset to identical commit hash prior to task execution.
3. **Execution Mode:** Single session per task, using the identical foundational model (e.g. Claude 3.5 Sonnet or equivalent frontier model) to isolate the protocol variable.
4. **No Prior Fine-Tuning or Prompt Leakage:** Both cohorts receive identical user task descriptions; Cohort A receives `AGENTS.md` and referenced rules, Cohort B receives a generic, high-quality developer system prompt.

---

## 6. Phased Rollout & Evidence Collection Roadmap

```text
Phase 1 (Week 1-2): Infrastructure & Baseline Calibration
  ├── Finalize Case Study Catalog (4 Archetypes in docs/case-studies/)
  ├── Set up instrumented test harness and logging scripts
  └── Run sanity trials to verify metric recording precision

Phase 2 (Week 3-4): Controlled Comparative Trials (N=20)
  ├── 5 Trials x Archetype 1 (Surgical Patch)
  ├── 5 Trials x Archetype 2 (Shared Contract)
  ├── 5 Trials x Archetype 3 (Protected Mutation)
  └── 5 Trials x Archetype 4 (Read-Only Audit)

Phase 3 (Week 5-6): Real-World Production Dogfooding
  ├── Deploy protocol to daily development workflows
  ├── Log actual user tasks using Case Study Template
  └── Capture failure instances and 2-strike event reports

Phase 4 (Week 7): Data Synthesis & Governance Review
  ├── Compute aggregate DPR, CFF, FPVR, and Token distributions
  ├── Identify protocol bottlenecks, redundant rules, and friction points
  └── Submit findings to Protocol Governance Gate for core rule updates
```

---

## 7. Limitations & Empirical Boundaries

1. **Model Drift:** Results obtained on one foundational LLM checkpoint may not generalize identically to future or alternative checkpoints.
2. **Repository Variance:** Codebases lacking existing test suites or type definitions will require fallback verification, limiting automated metric fidelity.
3. **Human Evaluator Subjectivity:** While diffs and test logs are objective, architectural appropriateness retains some evaluative nuance. Blind dual-review mitigates this risk.
4. **Absence of Retroactive Guarantees:** Past adherence to Apex protocol rules does not guarantee future defect-free output without ongoing runtime verification.
