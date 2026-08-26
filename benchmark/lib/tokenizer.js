/**
 * Industry-Standard BPE Tokenizer & Cost Calculation Engine
 * 
 * Uses exact cl100k_base / o200k_base Byte-Pair Encoding (BPE) via gpt-tokenizer.
 */

import { encode } from 'gpt-tokenizer';

let fallbackWarned = false;

/**
 * Counts exact BPE tokens using OpenAI cl100k_base tokenizer.
 * Falls back to a character estimate ONLY if encoding fails — emits a warning so
 * estimated values never silently mix with exact ones.
 */
export function countExactTokens(text) {
  if (!text) return 0;
  try {
    return encode(text).length;
  } catch (err) {
    if (!fallbackWarned) {
      console.warn(`⚠ [tokenizer] BPE encode failed (${err.message}) — falling back to chars÷3.85 estimate. Results may include estimated tokens.`);
      fallbackWarned = true;
    }
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
 * Calculates API Cost in USD based on Claude-class frontier pricing:
 * - Input:  $3.00 per 1,000,000 tokens
 * - Output: $15.00 per 1,000,000 tokens
 * (Note: GPT-4o uses different pricing — $2.50 input / $10.00 output per 1M.)
 */
export function calculateCostUSD(inputTokens, outputTokens = 0) {
  const inputCost = (inputTokens / 1_000_000) * 3.00;
  const outputCost = (outputTokens / 1_000_000) * 15.00;
  return Number((inputCost + outputCost).toFixed(6));
}
