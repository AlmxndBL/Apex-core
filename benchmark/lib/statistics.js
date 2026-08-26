/**
 * Statistical Computing Module (Zero-Dependency)
 * Implements Descriptive & Inferential Statistics:
 * - Mean (μ)
 * - Standard Deviation (σ)
 * - Variance (σ²)
 * - 95% Confidence Interval (CI95)
 * - Student's t-test p-value approximation for paired observations
 */

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
 */
export function confidenceInterval95(arr) {
  if (!arr || arr.length <= 1) return [0, 0];
  const avg = mean(arr);
  const sd = standardDeviation(arr);
  // Using standard z/t critical value for N >= 10 (~2.262 for df=9, approx 2.0)
  const tCritical = 2.262;
  const marginOfError = tCritical * (sd / Math.sqrt(arr.length));
  return [avg - marginOfError, avg + marginOfError];
}

/**
 * Approximate Paired t-test p-value between two sample arrays
 */
export function pairedTTest(sampleA, sampleB) {
  if (sampleA.length !== sampleB.length || sampleA.length <= 1) {
    return { tStat: 0, pValue: 1.0, significant: false };
  }

  const diffs = sampleA.map((val, idx) => val - sampleB[idx]);
  const diffMean = mean(diffs);
  const diffSd = standardDeviation(diffs);
  const n = diffs.length;

  if (diffSd === 0) {
    return { tStat: 99.9, pValue: 0.00001, significant: true };
  }

  const tStat = diffMean / (diffSd / Math.sqrt(n));
  
  // Rough p-value approximation for high t-statistics (t > 4 => p < 0.001)
  let pValue = 0.001;
  if (Math.abs(tStat) > 8) pValue = 0.00001;
  else if (Math.abs(tStat) > 5) pValue = 0.0001;
  else if (Math.abs(tStat) > 3) pValue = 0.005;
  else if (Math.abs(tStat) > 2) pValue = 0.05;
  else pValue = 0.2;

  return {
    tStat: Number(tStat.toFixed(4)),
    pValue,
    significant: pValue < 0.05
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
