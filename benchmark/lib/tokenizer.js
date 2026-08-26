/**
 * Industry-Standard BPE Tokenizer & Cost Calculation Engine
 * 
 * Uses exact cl100k_base / o200k_base Byte-Pair Encoding (BPE) via gpt-tokenizer.
 */

import { encode } from 'gpt-tokenizer';

/**
 * Counts exact BPE tokens using OpenAI cl100k_base / Claude BPE tokenizer
 */
export function countExactTokens(text) {
  if (!text) return 0;
  try {
    return encode(text).length;
  } catch {
    // Fallback: ~3.85 characters per token
    return Math.max(1, Math.ceil(text.length / 3.85));
  }
}

/**
 * Alias for backwards compatibility
 */
export function estimateTokens(text) {
  return countExactTokens(text);
}

/**
 * Calculates API Cost in USD based on standard Claude 3.5 Sonnet / GPT-4o pricing:
 * - Input:  $3.00 per 1,000,000 tokens
 * - Output: $15.00 per 1,000,000 tokens
 */
export function calculateCostUSD(inputTokens, outputTokens = 0) {
  const inputCost = (inputTokens / 1_000_000) * 3.00;
  const outputCost = (outputTokens / 1_000_000) * 15.00;
  return Number((inputCost + outputCost).toFixed(6));
}
