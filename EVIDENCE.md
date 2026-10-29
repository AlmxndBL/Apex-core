# 🔬 Apex Evidence Register

> **Official Evidence Registry, Public Claims Audit, and Empirical Boundary Log for Apex-core**  
> **Last Verified Date:** 2026-09-09  
> **Auditor:** Agent A (Public Claims & Documentation Audit)  
> **Status:** Active Standard · Single Source of Truth for Evidence

---

## v7.0.0 Checkpoint — 2026-10-29

The v7 release's current packaging evidence is recorded in [the checkpoint review](./docs/reviews/2026-10-29-apex-v7-release-checkpoint.md): `npm test` passed 141/141 integrity checks; syntax and diff checks passed, and temporary-copy fault injection confirmed rejection of a missing Build reference and inconsistent Codex version. Historical counts and commit references below describe their original audits, not the v7 suite.

Build workflow walkthroughs are static inspections. Live agent effectiveness, plugin installation behavior, and comparative token/latency/quality improvements remain unverified. The optional external skill validator could not run because PyYAML is absent; repository and narrow scalar-frontmatter fallback checks were used instead.

## 1. Epistemic Doctrine & Classification Framework

Apex-core operates under a strict anti-sycophancy and evidence-grounding policy ([`AGENTS.md [RULE 0]`](./AGENTS.md)). No performance metrics, token savings, or accuracy claims may be presented as verified facts without reproducible, empirical proof.

To eliminate ambiguity and prevent misleading representations, all public claims associated with Apex-core and its historical evaluation suites are categorized into four epistemic statuses:

| Status | Definition & Verification Criteria |
|---|---|
| **Verified** | Supported by accessible raw artifacts, recorded commit SHAs, automated reproducible commands, and transparent disclosure of operational limitations. |
| **Modeled** | Derived from theoretical calculations, static AST code analysis, or idealized structural models rather than end-to-end multi-turn runtime trials. |
| **Unverified** | Lacks conclusive raw execution telemetry, exhibits empirical discrepancies between published text and raw data, or relies on unproven assumptions across arbitrary repositories. |
| **Historical** | Derived from legacy experiments, mock execution dry-runs (`isMock: true`), or superseded prototypes that cannot be replicated as live agent trials in the current codebase. |

> [!IMPORTANT]
> **Repository Integrity vs. General Coding Agent Effectiveness:**  
> The internal verification test in Apex-core (`npm test` / `node scripts/verify-framework.js`) proves **only repository and protocol integrity** (verifying that rule documents, skills, templates, manifest files, and internal cross-references exist, are populated, and resolve cleanly).  
> **Passing `npm test` does NOT prove general coding agent effectiveness, task completion rates, bug resolution accuracy, or token efficiency on real-world engineering projects.** Operational proof in a target project must always come from local terminal verification logs and targeted failure-path tests.

---

## 2. Evidence Register Table

The following register audits all major public claims made across current and historical versions of Apex-core and its evaluation artifacts.

| # | Claim Text | Status | Scope | Source Repo / Path | Commit SHA | Reproducible Command | Raw Artifact Location | Limitations & Disclosures | Last Verified |
|---|---|---|---|---|---|---|---|---|---|
| **C-01** | Framework integrity gates pass 100% (98/98 checks) across rules, skills, templates, and links. | **Verified** | Apex-core repository self-consistency | `Apex-core/scripts/verify-framework.js` | `2b2d7ea` | `npm test` | Terminal output (`node scripts/verify-framework.js`) | Verifies internal protocol structure and doc links only. Does not measure coding agent task performance or real-world accuracy. | 2026-09-09 |
| **C-02** | AST skeleton extraction reduces static type declaration context size by 50–90% for large schemas (>800 lines). | **Modeled** | Context ingestion of static declaration/schema files | `Apex-core/skills/cartography/SKILL.md`, `Apex-eval/lib/ast-extractor.js` | `39b97ca` | `node scripts/verify-framework.js` (skill frontmatter & content) | `Apex-eval/tasks/*/task.json` dependency contracts | Purely structural file pruning. Assumes implementation bodies and unexported types are unneeded. Does not reflect multi-turn conversation token usage. | 2026-09-09 |
| **C-03** | Mean ingestion token reduction of -58.4% vs baseline whole-file ingestion ($p = 4.87 \times 10^{-11}$). | **Unverified** | Ingestion token counts across 50 tasks | `Apex-eval/results/live-agent-results.json`, historical README | `e3b3a0d`, `cfeef83` | `npm run eval:mock` (in Apex-eval) | `Apex-eval/results/live-agent-results.json` | Raw telemetry in `live-agent-results.json` records `isMock: true` and 23.4% combined token savings, directly conflicting with the -58.4% claim. Not verified on live frontier models. | 2026-09-09 |
| **C-04** | 100% Pass@1 accuracy (50/50 tasks resolved zero-shot) on benchmark defect repair. | **Historical** | 50 benchmark tasks in Apex-eval | `Apex-eval/runner.js`, `Apex-eval/protocols/arm-c-apex.js` | `e3b3a0d` | `node runner.js --mock` (in Apex-eval) | `Apex-eval/results/live-agent-results.json` | Generated by a deterministic mock runner injecting pre-written solutions (`task.mockSolution.surgicalPatch`). Does not reflect autonomous agent problem solving. | 2026-09-09 |
| **C-05** | 150 live trajectories evaluated on Frontier APIs (DeepSeek-V3, Claude 3.5 Sonnet, GPT-4o). | **Historical** | 3 arms × 50 tasks on frontier LLM APIs | `Apex-eval/README.md`, historical README | `e3b3a0d` | None (no live API logs preserved) | `Apex-eval/results/live-agent-results.json` (`isMock: true`) | Stored evaluation artifact specifies `isMock: true` with `model: "mock-engine"`. No raw API transcripts, token logs, or billing artifacts exist for 150 live runs. | 2026-09-09 |
| **C-06** | Single-turn defect resolution across all evaluation arms (Mean Turns = 1.00). | **Historical** | Multi-turn loop across 50 tasks | `Apex-eval/runner.js`, `Apex-eval/results/live-agent-results.json` | `e3b3a0d` | `node runner.js --mock` (in Apex-eval) | `Apex-eval/results/live-agent-results.json` | Direct artifact of mock runner injecting the pre-written patch and exiting immediately on turn 1. Does not reflect multi-turn agent exploration. | 2026-09-09 |
| **C-07** | Statistically significant token savings demonstrated via Paired Student's t-test ($p < 0.0001$). | **Unverified** | Paired t-test between baseline and Apex arms | `Apex-eval/lib/statistics.js`, `Apex-eval/results/live-agent-results.json` | `aa16953`, `232482e` | `node runner.js --mock` (in Apex-eval) | `Apex-eval/results/live-agent-results.json` | Statistical tests executed on deterministic mock values violate assumptions of inferential statistics. Mock outputs cannot produce valid empirical p-values. | 2026-09-09 |
| **C-08** | "Deterministic Control Plane" eliminating probabilistic agent failures. | **Historical** | Operating protocol enforcement on LLMs | Historical `README.md` (v5.0–v5.2) | `dd53206` | None (retracted in v5.5.0) | None | LLMs are non-deterministic stochastic systems. Markdown prompts cannot deterministically constrain agent execution without runtime execution interception. | 2026-09-09 |
| **C-09** | "Zero syntax hallucinations" / "100% accurate AST extraction". | **Historical** | AST cartography code pruning | Historical `skills/cartography/SKILL.md` | `39b97ca` | None (retracted in v5.5.0) | None | Edge cases such as invalid syntax, macro transformations, circular type aliases, or dynamic exports can cause AST extraction failures. | 2026-09-09 |
| **C-10** | In-RAM Fast TypeCheck completes in 1–3 seconds via `vue-tsc` or `tsc`. | **Modeled** | Typecheck on small-to-medium modules | `Apex-core/rules/06-testing-devops.md`, `skills/quality-verify/SKILL.md` | `2b2d7ea` | `npx tsc --noEmit` (target project) | Benchmark timings on small fixture repos | Typecheck latency scales with project size, monorepo graph complexity, and hardware. Large enterprise codebases take 10–30+ seconds. | 2026-09-09 |
| **C-11** | -94.0% context payload elimination in multi-turn sessions. | **Historical** | Theoretical projection in v5.2 | Historical `CHANGELOG.md` (v5.2.1) | `2d65ae9` | None (superseded in v5.4.0) | None | Purely theoretical mathematical projection assuming whole files are re-ingested every turn. Superseded and retracted. | 2026-09-09 |

---

## 3. Deep-Dive Claim Audits

### 3.1 Benchmark & Token Reduction Claims (-58.4%, 100% Pass@1, 150 Trajectories, N=50)

- **Audit Findings:**
  1. In version 5.4.0, documentation and release notes cited an empirical benchmark of **$N = 50$ real-world tasks**, claiming **-58.4% mean token reduction**, **100% Pass@1**, and **150 live trajectories evaluated on Frontier APIs**.
  2. Inspection of the underlying evaluation repository ([Apex-eval](https://github.com/AlmxndBL/Apex-eval)) reveals that the stored result artifact (`results/live-agent-results.json`) was generated with:
     ```json
     {
       "timestamp": "2026-08-26T17:34:32.973Z",
       "model": "mock-engine",
       "isMock": true,
       "tasksEvaluated": 50,
       "combined": {
         "tokenSavingsVsA": 23.4,
         "passAt1Percent": 100
       }
     }
     ```
  3. In `Apex-eval/protocols/arm-c-apex.js` (lines 85–98), `executeMockTurn` directly loads `task.mockSolution.surgicalPatch` and applies it to the workspace. This explains the 100% Pass@1 and 1.00 mean turns: the mock runner executes a deterministic playback of pre-written human solutions.
  4. Furthermore, the combined token savings in the JSON file is **23.4%**, which directly contradicts the **-58.4%** claim in the published summary.
- **Epistemic Verdict:** **Historical / Unverified**. These figures cannot be cited as empirical facts or live agent benchmarks. They must be clearly identified as artifacts of a deterministic mock test harness.

### 3.2 Statistical Significance ($p = 4.87 \times 10^{-11}$, Paired t-Test)

- **Audit Findings:**
  1. Statistical significance testing (`lib/statistics.js`) was applied to the token count outputs of the mock evaluation.
  2. Because the inputs were deterministic mock executions rather than randomized, independent trials of non-deterministic models, the resulting *p*-values are mathematical artifacts of fixed string lengths rather than valid inferential statistics.
- **Epistemic Verdict:** **Unverified**. All statistical significance claims derived from mock data are invalid for general claims about AI agent performance.

### 3.3 AST Skeleton Extraction & Token Diet (Cartography)

- **Audit Findings:**
  1. The cartography skill (`skills/cartography/SKILL.md`) uses the TypeScript Compiler API (`ts.createSourceFile`) to extract type declarations and interface signatures while stripping function bodies.
  2. On large declaration files and Prisma schemas (>800 lines), stripping bodies substantially reduces token counts (often 50–90% for pure type surfaces).
  3. However, this is a **Modeled** structural reduction. When an agent actually requires function bodies or unexported internal logic to understand a bug, stripping that context can lead to incomplete diagnosis or failed edits.
- **Epistemic Verdict:** **Modeled**. Structural reduction is demonstrable on static declaration files, but operational token savings in live multi-turn agent workflows vary depending on task requirements.

### 3.4 Framework Integrity Verification (`npm test`)

- **Audit Findings:**
  1. Running `npm test` executes `node scripts/verify-framework.js`, running 98 automated assertions.
  2. The test verifies:
     - Root manifests and configuration files exist and are populated.
     - Version synchronizes across `package.json` and `plugin.json`.
     - All 6 engineering rules and 5 core skills have valid frontmatter and required sections.
     - Architecture blueprints and templates exist and match references.
     - Cross-references in `AGENTS.md` and local Markdown links resolve cleanly.
     - Deprecated or misleading claims (such as "Deterministic Control Plane", "100% accurate", "npm run benchmark") are absent.
- **Epistemic Verdict:** **Verified**. The protocol repository is internally consistent, syntactically valid, and cleanly organized.
- **Boundary Note:** This test verifies **protocol packaging integrity**, not external agent coding performance.

---

## 4. Governance & Policy Directives

1. **No Fact Claims on Unverified Metrics:** Public documentation (`README.md`, `README.th.md`, external articles) MUST NOT cite $N=50$, -58.4%, 100% Pass@1, or "150 live trajectories" as established facts or live model benchmarks.
2. **Mandatory Cross-Link:** Any discussion of benchmarks or evaluation must link directly to this document (`EVIDENCE.md`) and state clearly that historical benchmark numbers in Apex-eval derive from a deterministic mock runner.
3. **Evidence Over Confidence:** An agent operating under Apex must provide concrete terminal verification output and failure-path testing for the specific task at hand, rather than relying on abstract claims of system capability.
