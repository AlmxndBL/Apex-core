/**
 * Tokenizer & Cost Calculation Engine (Zero-Dependency)
 */

export const PRICING = {
  INPUT_PER_M: 3.00,   // $3.00 per 1M input tokens (Claude 3.5 Sonnet / GPT-4o standard tier)
  OUTPUT_PER_M: 15.00, // $15.00 per 1M output tokens
};

/**
 * Standard BPE Token Estimation for Code (~3.85 characters per token in TS/Vue/Prisma)
 */
export function estimateTokens(text) {
  if (!text) return 0;
  return Math.ceil(text.length / 3.85);
}

/**
 * Calculate USD cost for given token counts
 */
export function calculateCostUSD(inputTokens, outputTokens) {
  const inputCost = (inputTokens / 1_000_000) * PRICING.INPUT_PER_M;
  const outputCost = (outputTokens / 1_000_000) * PRICING.OUTPUT_PER_M;
  return inputCost + outputCost;
}
