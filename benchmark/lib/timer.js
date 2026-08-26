/**
 * High-Resolution Hardware Timer Engine (Zero-Dependency)
 * Uses process.hrtime.bigint() for sub-millisecond precision.
 */

export function startTimer() {
  const start = process.hrtime.bigint();
  return {
    stop() {
      const end = process.hrtime.bigint();
      const elapsedNs = Number(end - start);
      const elapsedMs = elapsedNs / 1_000_000;
      return {
        nanoseconds: elapsedNs,
        milliseconds: Number(elapsedMs.toFixed(3)),
        seconds: Number((elapsedMs / 1000).toFixed(4)),
      };
    },
  };
}

/**
 * Measures the execution time of an asynchronous or synchronous function
 */
export async function measureExecutionTime(fn) {
  const timer = startTimer();
  const result = await fn();
  const duration = timer.stop();
  return { result, duration };
}
