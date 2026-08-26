# ⚡ Apex Statistical Benchmark Suite

> Dedicated Empirical Benchmark & Telemetry Engine for **Apex Operating Protocol (v5.0)**

---

## 📁 Directory Structure

```text
benchmark/
├── README.md                 # Documentation & Execution Guide
├── runner.js                 # Multi-Task Statistical Runner (5 Tasks x 10 Iterations = 50 Trials)
├── data/
│   ├── tasks.json            # 5 Diverse Full-Stack Domain Scenarios (Backend, UI, State, DB, Security)
│   └── results.json          # Persisted Raw Telemetry Data (Means, StdDevs, Confidence Intervals)
├── lib/
│   ├── tokenizer.js          # BPE Code Token Estimation & Cost Modeling
│   └── statistics.js         # Descriptive & Inferential Statistics (Mean, SD, CI95, Paired t-test)
└── reports/
    └── STATISTICAL_REPORT.md # Generated Full Markdown Report
```

---

## 🚀 How to Run

Execute the automated suite directly:

```bash
# Run via npm script
npm run benchmark

# Or run zero-dependency directly with Node:
node benchmark/runner.js
```

---

## 📊 Scientific Methodology

* **5 Diverse Domains:** Backend API, Vue 3 4-State Presenter, State Management Composable, Prisma Database Refactor, and HMAC Security.
* **$N=50$ Multi-Trial Dataset:** 10 trials per task to eliminate stochastic outlier effects.
* **Rigorous Statistics:** Computes $\mu \pm \sigma$, 95% Confidence Intervals, and paired Student's t-test ($p < 0.001$).
