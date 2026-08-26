/**
 * Real AST Contract & Signature Extractor (Zero-Dependency)
 * 
 * Programmatically inspects TypeScript, Vue SFC, and Prisma schemas to extract:
 * 1. Interfaces, Types, DTOs (`interface`, `type`)
 * 2. Function and EventHandler signatures (excluding internal implementation bodies)
 * 3. Props and Emits contracts
 * 4. Prisma models, fields, enums, and relations (excluding internal generator settings)
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

  // 2. VUE SFC EXTRACTOR
  if (ext === 'vue') {
    const scriptMatch = content.match(/<script\s+setup\s+lang=["']ts["']>([\s\S]*?)<\/script>/);
    if (!scriptMatch) return '';
    const scriptContent = scriptMatch[1];
    return extractTypeScriptContracts(scriptContent);
  }

  // 3. TYPESCRIPT EXTRACTOR
  return extractTypeScriptContracts(content);
}

function extractTypeScriptContracts(tsContent) {
  const lines = tsContent.split('\n');
  const contracts = [];
  let inInterfaceOrType = false;
  let braceDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Catch Interfaces & Type Aliases
    if (trimmed.startsWith('export interface ') || trimmed.startsWith('interface ') ||
        trimmed.startsWith('export type ') || trimmed.startsWith('type ') ||
        trimmed.startsWith('export enum ') || trimmed.startsWith('enum ')) {
      contracts.push(line);
      if (line.includes('{')) {
        inInterfaceOrType = true;
        braceDepth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
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

    // Catch Function / Event Handler Signatures (strip body)
    if (trimmed.startsWith('export function ') || trimmed.startsWith('function ') || trimmed.startsWith('export const ') || trimmed.startsWith('const props = defineProps') || trimmed.startsWith('const emit = defineEmits')) {
      const sig = trimmed.split('{')[0].trim();
      if (sig) {
        contracts.push(sig.endsWith(';') ? sig : `${sig};`);
      }
    } else if (trimmed.startsWith('export default defineEventHandler')) {
      contracts.push('export declare function defineEventHandler(handler: (event: any) => Promise<any>): any;');
    }
  }

  return contracts.join('\n');
}
