#!/usr/bin/env node

/**
 * Unit tests for benchmark/lib/statistics.js
 * Validates exact t-distribution math against published reference values:
 * - Student's t critical values (standard statistical tables)
 * - Two-tailed p-values for known (t, df) pairs
 * - CI95 width scaling by correct per-df critical value
 * Exit code 1 on any failure.
 */

import {
  mean,
  standardDeviation,
  confidenceInterval95,
  pairedTTest,
  tTestPValue,
  tCriticalValue,
  incompleteBeta,
} from '../benchmark/lib/statistics.js';

let passed = 0;
let failed = 0;
const failures = [];

function check(condition, message) {
  if (condition) {
    passed++;
    console.log(`  \x1b[32m✔\x1b[0m ${message}`);
  } else {
    failed++;
    failures.push(message);
    console.log(`  \x1b[31m✖\x1b[0m ${message}`);
  }
}

function assertClose(actual, expected, tol, label) {
  check(
    Math.abs(actual - expected) <= tol,
    `${label}: got ${actual}, expected ${expected} ±${tol}`
  );
}

console.log('\n\x1b[1m\x1b[36m🧪 [Apex Statistics Unit Tests] Validating t-distribution math...\x1b[0m\n');

// ── 1. Incomplete beta sanity ────────────────────────────────────────────────
console.log('\x1b[1m1. Regularized Incomplete Beta Function\x1b[0m');
check(incompleteBeta(0, 2, 0.5) === 0, 'I_0(a,b) = 0');
check(incompleteBeta(1, 2, 0.5) === 1, 'I_1(a,b) = 1');
assertClose(incompleteBeta(0.5, 1, 1), 0.5, 1e-9, 'I_0.5(1,1) = 0.5 (uniform)');
assertClose(incompleteBeta(0.5, 2, 2), 0.5, 1e-9, 'I_0.5(2,2) = 0.5 (symmetry)');

// ── 2. Two-tailed p-values vs published references ───────────────────────────
console.log('\n\x1b[1m2. Exact Two-Tailed p-values (reference: Student t table)\x1b[0m');
assertClose(tTestPValue(2.0, 4), 0.1161122, 1e-5, 'p(t=2.00, df=4) = 0.11611');
assertClose(tTestPValue(2.7764451052, 4), 0.05, 1e-6, 'p(t=2.77645, df=4) = 0.05');
assertClose(tTestPValue(4.6040948714, 4), 0.01, 1e-6, 'p(t=4.60409, df=4) = 0.01');
assertClose(tTestPValue(2.2621571582, 9), 0.05, 1e-6, 'p(t=2.26216, df=9) = 0.05');
assertClose(tTestPValue(2.0, 10), 0.0733880, 1e-5, 'p(t=2.00, df=10) = 0.07339');
assertClose(tTestPValue(1.0, 5), 0.3632109, 1e-5, 'p(t=1.00, df=5) = 0.36321');
assertClose(tTestPValue(12.7062047362, 1), 0.05, 1e-5, 'p(t=12.70620, df=1) = 0.05 (two-tailed)');
assertClose(tTestPValue(6.3137515148, 1), 0.10, 1e-5, 'p(t=6.31375, df=1) = 0.10 (two-tailed)');

// ── 3. Critical values solved by bisection vs tables ─────────────────────────
console.log('\n\x1b[1m3. t Critical Values (bisection vs published tables)\x1b[0m');
assertClose(tCriticalValue(4, 0.05), 2.7764451052, 1e-6, 't*(df=4, α=.05) = 2.77645');
assertClose(tCriticalValue(9, 0.05), 2.2621571582, 1e-6, 't*(df=9, α=.05) = 2.26216');
assertClose(tCriticalValue(29, 0.05), 2.0452296421, 1e-6, 't*(df=29, α=.05) = 2.04523');
assertClose(tCriticalValue(4, 0.01), 4.6040948714, 1e-6, 't*(df=4, α=.01) = 4.60409');
check(tCriticalValue(10000, 0.05) > 1.95 && tCriticalValue(10000, 0.05) < 1.97,
  `t*(df=10000, α=.05) ≈ normal 1.96 (got ${tCriticalValue(10000, 0.05).toFixed(4)})`);

// ── 4. CI95 uses correct per-df critical value ───────────────────────────────
console.log('\n\x1b[1m4. 95% Confidence Interval (df-aware)\x1b[0m');
{
  const arr = [850, 900, 700, 950]; // n=4, df=3, t*=3.182446
  const avg = mean(arr);             // 850
  const sd = standardDeviation(arr); // 108.0123...
  const expectedMoe = 3.1824463053 * (sd / Math.sqrt(4)); // ≈171.8717
  const [lo, hi] = confidenceInterval95(arr);
  assertClose(avg, 850, 1e-9, 'mean([850,900,700,950]) = 850');
  assertClose(sd, 108.01234497346434, 1e-6, 'sample sd = 108.0123');
  assertClose(lo, avg - expectedMoe, 1e-4, `CI lower = ${lo}`);
  assertClose(hi, avg + expectedMoe, 1e-4, `CI upper = ${hi}`);
}
{
  // n=5 must use t*=2.776445, NOT the old hardcoded 2.262
  const arr = [1, 2, 3, 4, 5];
  const moeExpected = 2.7764451052 * (1.5811388 / Math.sqrt(5));
  const [lo, hi] = confidenceInterval95(arr);
  assertClose(hi - lo, 2 * moeExpected, 1e-4, 'CI width for n=5 uses t*(df=4)=2.77645');
}

// ── 5. Paired t-test behavior ────────────────────────────────────────────────
console.log('\n\x1b[1m5. Paired t-test\x1b[0m');
{
  const a = [850, 900, 700, 950];
  const b = [600, 650, 650, 700];
  // diffs = [250,250,50,250] → mean=200, sd=100, n=4 → t=4.0000, df=3
  const r = pairedTTest(a, b);
  assertClose(r.tStat, 4.0, 1e-3, 'paired t-stat = 4.0000');
  assertClose(r.pValue, tTestPValue(4.0, 3), 1e-5, 'p-value consistent with tTestPValue(t, df=n-1)');
  check(r.significant === true, 'p < 0.05 flagged significant');
}
{
  const r = pairedTTest([5, 5, 5], [5, 5, 5]);
  check(r.tStat === 0 && r.pValue === 1 && r.significant === false,
    'identical samples → t=0, p=1, not significant');
  const r2 = pairedTTest([10, 20, 30], [5, 15, 25]);
  check(r2.tStat === 9999 && r2.pValue === 0 && r2.significant === true,
    'constant nonzero diff → deterministic effect path (JSON-safe tStat cap)');
}
{
  const r = pairedTTest([1, 2], [1, 2, 3]);
  check(r.tStat === 0 && r.pValue === 1, 'length mismatch → neutral result');
}

// ── Summary ──────────────────────────────────────────────────────────────────
console.log('\n------------------------------------------------------------');
console.log(`\x1b[1mResults: ${passed}/${passed + failed} checks passed.\x1b[0m`);
if (failed === 0) {
  console.log('\x1b[32m✔ Statistics module matches published t-distribution references. (100%)\x1b[0m\n');
  process.exit(0);
} else {
  console.log(`\x1b[31m✖ ${failed} checks failed:\x1b[0m`);
  for (const f of failures) console.log(`   - ${f}`);
  process.exit(1);
}
