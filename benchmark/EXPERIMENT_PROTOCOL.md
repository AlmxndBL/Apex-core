# Live-Agent Validation Experiment Protocol

> **Status:** PLANNED — not yet executed. Until this study is run, all multi-turn
> session figures (-94% savings, N → 1.04 turns) must be cited as **modeled projections**,
> not empirical measurements.

## 1. Objective
Replace the assumption-driven linear projection in `benchmark/runner.js`
(`PROJECTION_ASSUMPTIONS`) with measured telemetry from real agent runs, so that
turn counts, cumulative tokens, and success rates become empirical values.

## 2. Hypotheses
- **H1 (turns):** Apex-protocol agents resolve tasks in fewer turns than
  unconstrained/diff-only baselines (design target: mean ≤ 1.04).
- **H2 (tokens):** Cumulative session tokens are lower for Apex despite any
  per-turn overhead from rules context.
- **H3 (safety trade-off):** Success rates are not lower under Apex constraints
  (discipline should not cost correctness).

## 3. Experimental Arms
| Arm | Protocol | Context strategy | Edit format |
|---|---|---|---|
| A | Unconstrained baseline | Full-file ingestion on demand | Whole-file rewrite |
| B | Diff-based industry standard | Full-file ingestion | Unified diff |
| C | Apex-core protocol | Signature-skeleton ingestion | Surgical patch + fast typecheck |

Each arm uses the **same model**, temperature, and tool budget. Only the protocol layer differs.

## 4. Task Corpus
- ≥ 20 (target 50) real bug-fix / small-feature tasks drawn from public repos or
  project backlogs with existing test suites.
- Tasks are frozen and identical across arms; order randomized per arm.
- Each task records: repo state hash, prompt, full transcript, final diff, test results.

## 5. Metrics (per task)
1. **Turns:** number of model↔tool round trips until terminal state.
2. **Cumulative tokens:** exact BPE count over the full transcript
   (input + output, including re-transmitted history).
3. **Success rate:** task passes its hidden acceptance tests within budget.
4. **Cost:** tokens × pricing table (state model + date of pricing).

## 6. Analysis Plan
- Paired two-tailed t-test per metric across arms (same tasks = paired samples),
  exact p-values via the incomplete-beta implementation in `benchmark/lib/statistics.js`.
- Report effect sizes and CIs alongside p-values; no claim rests on n < 10.
- Pre-register this file's commit hash before running; deviations require a
  documented amendment.

## 7. Reporting
Results land in `benchmark/data/live-agent-results.json` using the schema below,
then replace the projection constants in `PROJECTION_ASSUMPTIONS` (turn counts +
overhead estimates become measured means):

```json
{
  "arm": "C",
  "taskId": "...",
  "turns": 1,
  "cumulativeTokens": { "input": 0, "output": 0 },
  "success": true,
  "wallClockMs": 0,
  "model": "...",
  "protocolVersion": "..."
}
```
