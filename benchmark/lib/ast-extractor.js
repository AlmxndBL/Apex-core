/**
 * Signature & Contract Extractor (heuristic, line-based)
 *
 * Extracts type contracts and callable signatures from TypeScript, Vue SFC,
 * and Prisma schema sources WITHOUT a compiler-grade parser:
 * 1. Interfaces, Type Aliases, Enums (bodies kept)
 * 2. Function / EventHandler / Class / Arrow-const signatures (bodies pruned)
 * 3. Prisma models, fields, enums, and relations (attributes/indexes pruned)
 *
 * HONESTY NOTE — this is NOT a compiler AST. It is a fast heuristic scanner
 * (<0.5ms on typical files). Known limitations:
 * - Multi-line signatures split across lines capture only the first line
 * - Decorators, generics constraints spanning lines, and nested namespace
 *   blocks are not modeled
 * - Non-TS script blocks in .vue files yield JS-level signatures only
 * For compiler-grade extraction, integrate ts-morph / @vue/compiler-sfc
 * (tracked as future work — see benchmark/EXPERIMENT_PROTOCOL.md).
 */

export function extractAstSkeleton(filename, content) {
  if (!content) return '';

  const ext = filename.split('.').pop()?.toLowerCase();

  // 1. PRISMA SCHEMA EXTRACTOR
  if (ext === 'prisma') {
    const lines = content.split('\n');
    const skeletonLines = [];
    let inModel = false;
    let inEnum = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('model ') || trimmed.startsWith('enum ')) {
        skeletonLines.push(trimmed);
        if (trimmed.includes('{')) {
          inModel = trimmed.startsWith('model ');
          inEnum = trimmed.startsWith('enum ');
        }
      } else if (inModel || inEnum) {
        if (trimmed === '}') {
          skeletonLines.push('}');
          inModel = false;
          inEnum = false;
        } else if (trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('@@')) {
          // Keep field name, type, and primary attributes
          const parts = trimmed.split(/\s+/);
          if (parts.length >= 2) {
            const fieldName = parts[0];
            const fieldType = parts[1];
            const isId = trimmed.includes('@id');
            const isUnique = trimmed.includes('@unique');
            const isRelation = trimmed.includes('@relation');
            const flags = [isId ? '@id' : '', isUnique ? '@unique' : '', isRelation ? '@relation' : ''].filter(Boolean).join(' ');
            skeletonLines.push(`  ${fieldName} ${fieldType} ${flags}`.trimEnd());
          }
        }
      }
    }
    return skeletonLines.join('\n');
  }

  // 2. VUE SFC EXTRACTOR — accepts <script setup lang="ts">, <script lang="ts">,
  //    and plain <script> blocks regardless of attribute order.
  if (ext === 'vue') {
    const scriptMatch =
      content.match(/<script\b[^>]*\blang=["']ts["'][^>]*>([\s\S]*?)<\/script>/i) ||
      content.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
    if (!scriptMatch) return '';
    return extractTypeScriptContracts(scriptMatch[1]);
  }

  // 3. TYPESCRIPT EXTRACTOR
  return extractTypeScriptContracts(content);
}

function extractTypeScriptContracts(tsContent) {
  const lines = tsContent.split('\n');
  const contracts = [];
  let inInterfaceOrType = false;
  let braceDepth = 0;

  const pushSignature = (trimmed) => {
    const sig = trimmed.split('{')[0].trim();
    if (sig) {
      contracts.push(sig.endsWith(';') ? sig : `${sig};`);
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Catch Interfaces & Type Aliases & Enums
    if (trimmed.startsWith('export interface ') || trimmed.startsWith('interface ') ||
        trimmed.startsWith('export type ') || trimmed.startsWith('type ') ||
        trimmed.startsWith('export enum ') || trimmed.startsWith('enum ')) {
      contracts.push(line);
      if (line.includes('{')) {
        braceDepth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
        // Self-closing single-line declaration (e.g. `type X = { a: string }`)
        inInterfaceOrType = braceDepth > 0;
      }
      continue;
    }

    if (inInterfaceOrType) {
      contracts.push(line);
      braceDepth += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      if (braceDepth <= 0) {
        inInterfaceOrType = false;
      }
      continue;
    }

    // Catch class declarations (signature line only — methods/body pruned)
    if (/^(export\s+)?(default\s+)?(abstract\s+)?class\s+\w+/.test(trimmed)) {
      pushSignature(trimmed);
      continue;
    }

    // Catch default exports of functions
    if (/^export\s+default\s+(async\s+)?function\b/.test(trimmed)) {
      pushSignature(trimmed);
      continue;
    }

    // Catch Function / Event Handler Signatures (strip body)
    if (trimmed.startsWith('export function ') || trimmed.startsWith('function ') ||
        trimmed.startsWith('export async function ') || trimmed.startsWith('async function ') ||
        trimmed.startsWith('export const ') || trimmed.startsWith('const props = defineProps') ||
        trimmed.startsWith('const emit = defineEmits')) {
      pushSignature(trimmed);
    } else if (trimmed.startsWith('export default defineEventHandler')) {
      contracts.push('export declare function defineEventHandler(handler: (event: any) => Promise<any>): any;');
    }
  }

  return contracts.join('\n');
}
