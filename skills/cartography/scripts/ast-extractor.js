import ts from 'typescript';

/**
 * AST Skeleton Extraction Engine for Apex-core Protocol
 * Uses TypeScript Compiler API for compact top-level contract extraction and body pruning.
 */
export function extractAstSkeleton(filename, content) {
  if (!content) return '';

  const ext = filename.split('.').pop()?.toLowerCase();

  // 1. PRISMA SCHEMA EXTRACTOR
  if (ext === 'prisma') {
    return extractPrismaContracts(content);
  }

  // 2. VUE SFC EXTRACTOR
  if (ext === 'vue') {
    const scriptMatch =
      content.match(/<script\b[^>]*\blang=["']ts["'][^>]*>([\s\S]*?)<\/script>/i) ||
      content.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
    if (!scriptMatch) return '';
    return extractTypeScriptContracts(scriptMatch[1], filename);
  }

  // 3. TYPESCRIPT / JAVASCRIPT EXTRACTOR
  return extractTypeScriptContracts(content, filename);
}

function extractPrismaContracts(prismaContent) {
  const lines = prismaContent.split('\n');
  const skeletonLines = [];
  let inBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//')) continue;

    if (trimmed.startsWith('model ') || trimmed.startsWith('enum ') || trimmed.startsWith('type ')) {
      skeletonLines.push(trimmed);
      if (trimmed.includes('{')) {
        inBlock = true;
      }
    } else if (inBlock) {
      if (trimmed === '}') {
        skeletonLines.push('}\n');
        inBlock = false;
      } else {
        // Keep field definitions and model-level attributes (@@index, @@unique, @@id, @@map)
        skeletonLines.push('  ' + trimmed);
      }
    }
  }
  return skeletonLines.join('\n').trim();
}

function extractTypeScriptContracts(tsContent, filename = 'source.ts') {
  try {
    const sf = ts.createSourceFile(filename, tsContent, ts.ScriptTarget.Latest, true);
    const contracts = [];

    for (const st of sf.statements) {
      // 1. Interfaces, Types, Enums
      if (ts.isInterfaceDeclaration(st) || ts.isTypeAliasDeclaration(st) || ts.isEnumDeclaration(st)) {
        contracts.push(st.getText(sf));
        continue;
      }

      // 2. Function Declarations
      if (ts.isFunctionDeclaration(st)) {
        const isExport = st.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
        const isDefault = st.modifiers?.some(m => m.kind === ts.SyntaxKind.DefaultKeyword);
        const isAsync = st.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword);
        const name = st.name ? st.name.text : 'default';
        const typeParams = st.typeParameters ? '<' + st.typeParameters.map(tp => tp.getText(sf)).join(', ') + '>' : '';
        const params = st.parameters.map(p => p.getText(sf)).join(', ');
        const returnType = st.type ? ': ' + st.type.getText(sf) : '';

        const prefix = [isExport ? 'export' : '', isDefault ? 'default' : '', isAsync ? 'async' : '', 'function'].filter(Boolean).join(' ');
        contracts.push(`${prefix} ${name}${typeParams}(${params})${returnType};`);
        continue;
      }

      // 3. Class Declarations
      if (ts.isClassDeclaration(st)) {
        const isExport = st.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
        const isAbstract = st.modifiers?.some(m => m.kind === ts.SyntaxKind.AbstractKeyword);
        const name = st.name ? st.name.text : 'AnonymousClass';
        const heritage = st.heritageClauses ? ' ' + st.heritageClauses.map(h => h.getText(sf)).join(' ') : '';
        const prefix = [isExport ? 'export' : '', isAbstract ? 'abstract' : '', 'class'].filter(Boolean).join(' ');

        const memberSigs = [];
        for (const member of st.members) {
          if (ts.isPropertyDeclaration(member)) {
            const mMods = member.modifiers ? member.modifiers.map(m => m.getText(sf)).join(' ') + ' ' : '';
            const mName = member.name.getText(sf);
            const mType = member.type ? ': ' + member.type.getText(sf) : '';
            memberSigs.push(`  ${mMods}${mName}${mType};`);
          } else if (ts.isMethodDeclaration(member)) {
            const mMods = member.modifiers ? member.modifiers.map(m => m.getText(sf)).join(' ') + ' ' : '';
            const mName = member.name.getText(sf);
            const mParams = member.parameters.map(p => p.getText(sf)).join(', ');
            const mRet = member.type ? ': ' + member.type.getText(sf) : '';
            memberSigs.push(`  ${mMods}${mName}(${mParams})${mRet};`);
          } else if (ts.isConstructorDeclaration(member)) {
            const cParams = member.parameters.map(p => p.getText(sf)).join(', ');
            memberSigs.push(`  constructor(${cParams});`);
          }
        }
        contracts.push(`${prefix} ${name}${heritage} {\n${memberSigs.join('\n')}\n}`);
        continue;
      }

      // 4. Variables / Arrow Functions / Constants
      if (ts.isVariableStatement(st)) {
        const isExport = st.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
        const decls = st.declarationList.declarations.map(d => {
          const dName = d.name.getText(sf);
          if (d.type) {
            return `${dName}: ${d.type.getText(sf)}`;
          } else if (d.initializer && (ts.isArrowFunction(d.initializer) || ts.isFunctionExpression(d.initializer))) {
            const fn = d.initializer;
            const isAsync = fn.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword);
            const params = fn.parameters.map(p => p.getText(sf)).join(', ');
            const ret = fn.type ? ': ' + fn.type.getText(sf) : '';
            return `${dName}: ${isAsync ? 'async ' : ''}(${params})${ret} => unknown`;
          } else {
            return dName;
          }
        }).join(', ');
        contracts.push(`${isExport ? 'export const ' : 'const '}${decls};`);
        continue;
      }

      // 5. Custom Nitro Event Handlers & Plugins
      if (ts.isExportAssignment(st)) {
        const expr = st.expression.getText(sf);
        if (expr.includes('defineEventHandler')) {
          contracts.push('export default defineEventHandler(handler: (event: unknown) => Promise<unknown>);');
        } else {
          contracts.push(`export default ${expr.split('(')[0] || 'defaultExport'};`);
        }
        continue;
      }

      // 6. Export Declarations (export { a, b } from './mod')
      if (ts.isExportDeclaration(st)) {
        contracts.push(st.getText(sf));
      }
    }

    return contracts.join('\n\n');
  } catch (err) {
    return `// [AST Extraction Fallback: ${err.message}]`;
  }
}
