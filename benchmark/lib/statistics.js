/**
 * Statistical Computing Module (Zero-Dependency)
 *
 * Implements Descriptive & Inferential Statistics with EXACT methods:
 * - Mean (μ), Standard Deviation (σ), Variance (σ²)
 * - 95% Confidence Interval using the t critical value for the sample's own df
 * - Paired two-tailed Student's t-test with EXACT p-values computed from the
 *   regularized incomplete beta function I_x(df/2, 1/2) — no hardcoded lookup tables.
 */

/**
 * Natural log of the Gamma function (Lanczos approximation, g=7).
 */
export function logGamma(x) {
  const lanczos = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];

  if (x < 0.5) {
    // Reflection formula: Γ(x)Γ(1-x) = π / sin(πx)
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
  }

  x -= 1;
  let a = lanczos[0];
  const t = x + 7.5;
  for (let i = 1; i < lanczos.length; i++) {
    a += lanczos[i] / (x + i);
  }
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

/**
 * Continued-fraction expansion for the incomplete beta function (Lentz's method).
 * Reference: Numerical Recipes in C, §6.4 (betacf).
 */
function betacf(x, a, b) {
  const MAX_ITERS = 300;
  const EPS = 3e-14;
  const FPMIN = 1e-300;

  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;

  let c = 1;
  let d = 1 - (qab * x) / qap;
  if (Math.abs(d) < FPMIN) d = FPMIN;
  d = 1 / d;
  let h = d;

  for (let m = 1; m <= MAX_ITERS; m++) {
    const m2 = 2 * m;

    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    h *= d * c;

    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    const del = d * c;
    h *= del;

    if (Math.abs(del - 1) < EPS) break;
  }

  return h;
}

/**
 * Regularized incomplete beta function I_x(a, b).
 */
export function incompleteBeta(x, a, b) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  const logBeta = logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x);
  const front = Math.exp(logBeta);

  if (x < (a + 1) / (a + b + 2)) {
    return (front * betacf(x, a, b)) / a;
  }
  return 1 - (front * betacf(1 - x, b, a)) / b;
}

/**
 * Two-tailed p-value of Student's t distribution for a given t statistic and df.
 * Uses the identity: p = I_{df/(df+t²)}(df/2, 1/2) — exact for the given df.
 */
export function tTestPValue(tStat, df) {
  if (typeof tStat !== 'number' || Number.isNaN(tStat)) return NaN;
  if (!Number.isFinite(df) || df <= 0) return NaN;
  const t = Math.abs(tStat);
  if (!Number.isFinite(t)) return 0;
  return incompleteBeta(df / (df + t * t), df / 2, 0.5);
}

/**
 * Two-sided t critical value for a given df and alpha (default 0.05),
 * solved by bisection on the monotonic p(t) curve — replaces hardcoded tables.
 */
export function tCriticalValue(df, alpha = 0.05) {
  if (!Number.isFinite(df) || df <= 0) return NaN;
  let lo = 0;
  let hi = 1;
  while (tTestPValue(hi, df) > alpha && hi < 1e8) hi *= 2;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (tTestPValue(mid, df) > alpha) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/**
 * Calculate arithmetic mean
 */
export function mean(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((acc, v) => acc + v, 0) / arr.length;
}

/**
 * Calculate sample standard deviation
 */
export function standardDeviation(arr) {
  if (!arr || arr.length <= 1) return 0;
  const avg = mean(arr);
  const variance = arr.reduce((acc, v) => acc + Math.pow(v - avg, 2), 0) / (arr.length - 1);
  return Math.sqrt(variance);
}

/**
 * Calculate 95% Confidence Interval [lower, upper]
 * Critical value is derived from the t distribution at df = n - 1
 * (e.g., n=5 → t=2.776, n=10 → t=2.262, n=30 → t=2.045).
 */
export function confidenceInterval95(arr) {
  if (!arr || arr.length === 0) return [0, 0];
  const avg = mean(arr);
  if (arr.length <= 1) return [avg, avg];
  const sd = standardDeviation(arr);
  const tCritical = tCriticalValue(arr.length - 1, 0.05);
  const marginOfError = tCritical * (sd / Math.sqrt(arr.length));
  return [avg - marginOfError, avg + marginOfError];
}

/**
 * Paired two-tailed t-test between two sample arrays.
 * Returns the EXACT p-value from the t distribution at df = n - 1.
 */
export function pairedTTest(sampleA, sampleB) {
  if (
    !Array.isArray(sampleA) || !Array.isArray(sampleB) ||
    sampleA.length !== sampleB.length || sampleA.length <= 1
  ) {
    return { tStat: 0, pValue: 1.0, significant: false };
  }

  const diffs = sampleA.map((val, idx) => val - sampleB[idx]);
  const diffMean = mean(diffs);
  const diffSd = standardDeviation(diffs);
  const n = diffs.length;
  const df = n - 1;

  // All differences identical
  if (diffSd === 0) {
    if (diffMean === 0) return { tStat: 0, pValue: 1.0, significant: false };
    // Deterministic effect: t → ∞, p → 0. Cap tStat so results stay valid JSON.
    return { tStat: 9999, pValue: 0, significant: true };
  }

  const rawT = diffMean / (diffSd / Math.sqrt(n));
  const rawP = tTestPValue(rawT, df);

  return {
    tStat: Number(Math.min(Math.abs(rawT), 9999).toFixed(4)) * Math.sign(rawT || 1),
    pValue: Number(rawP.toFixed(6)),
    significant: rawP < 0.05,
  };
}

/**
 * Format summary metrics object
 */
export function computeMetrics(arr) {
  const avg = mean(arr);
  const sd = standardDeviation(arr);
  const [ciLower, ciUpper] = confidenceInterval95(arr);
  return {
    mean: Number(avg.toFixed(2)),
    stdDev: Number(sd.toFixed(2)),
    ci95: [Number(ciLower.toFixed(2)), Number(ciUpper.toFixed(2))],
    min: Math.min(...arr),
    max: Math.max(...arr),
    count: arr.length
  };
}
