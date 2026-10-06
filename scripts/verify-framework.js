#!/usr/bin/env node

/**
 * Apex Framework Verification Suite (version follows package.json)
 * Validates integrity, metadata, YAML frontmatter, presets, and cross-references
 * across Micro-Kernel, Universal Principles, Adapters, Rules, Skills, and Templates.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const packageJsonPath = path.join(ROOT_DIR, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const frameworkVersion = packageJson.version;

const REQUIRED_CORE = [
  'principles.md',
];

const REQUIRED_ADAPTERS = [
  'web-fullstack.md',
  'backend-data.md',
  'polyglot-core.md',
];

const REQUIRED_RULES = [
  '01-security-auth.md',
  '02-coding-standards.md',
  '03-system-architecture.md',
  '04-database-design.md',
  '05-ux-ui-design.md',
  '06-testing-devops.md',
];

const REQUIRED_SKILLS = [
  'apex-core',
  'frontend',
  'backend-data',
  'quality-verify',
  'cartography',
];

const REQUIRED_TEMPLATES = [
  'AI-Context-Index.md',
  'gitignore-production.md',
  'blueprints/enterprise-data-table.md',
  'blueprints/idempotent-webhook-receiver-with-hmac-signature.md',
  'blueprints/rbac-multi-role.md',
  'blueprints/responsive-enterprise-sidebar.md',
  'blueprints/healthcheck-endpoints.md',
  'docker/compose.dev.yaml',
  'docker/Dockerfile.fullstack',
  'ci/github-ci.yml',
];

const REQUIRED_ROOT_FILES = [
  'AGENTS.md',
  'AI-Context-Index.md',
  'README.md',
  'CHANGELOG.md',
  'LICENSE',
  'plugin.json',
  'package.json',
];

let totalChecks = 0;
let passedChecks = 0;
const errors = [];

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  \x1b[32m✔\x1b[0m ${message}`);
  } else {
    errors.push(message);
    console.log(`  \x1b[31m✖\x1b[0m ${message}`);
  }
}

console.log(`\n\x1b[1m\x1b[36m⚡ [Apex Verification Suite v${frameworkVersion}] Starting Framework Integrity Check...\x1b[0m\n`);

// 1. Root Files Check
console.log('\x1b[1m1. Root Files & Manifests\x1b[0m');
for (const file of REQUIRED_ROOT_FILES) {
  const filePath = path.join(ROOT_DIR, file);
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  assert(exists && size > 50, `Root file ${file} exists and is populated (${size} bytes)`);
}

// 2. Plugin & Package Version Sync
console.log('\n\x1b[1m2. Version Synchronization\x1b[0m');
try {
  const pluginJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'plugin.json'), 'utf-8'));
  assert(pluginJson.version === frameworkVersion, `Version match: plugin.json (${pluginJson.version}) === package.json (${frameworkVersion})`);
  assert(Boolean(pluginJson.name) && Boolean(pluginJson.description), 'plugin.json has valid name and description');
} catch (err) {
  assert(false, `Failed to parse plugin.json or package.json: ${err.message}`);
}

// 3. Universal Principles (Core)
console.log('\n\x1b[1m3. Universal Principles (Core Layer)\x1b[0m');
for (const coreFile of REQUIRED_CORE) {
  const filePath = path.join(ROOT_DIR, 'core', coreFile);
  const exists = fs.existsSync(filePath);
  if (!exists) {
    assert(false, `Core file core/${coreFile} exists`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  assert(content.length > 2000, `Core file core/${coreFile} is comprehensive (${content.length} chars)`);
  assert(content.startsWith('# '), `Core file core/${coreFile} has valid H1 title`);
  assert(content.includes('Server Authority'), `core/${coreFile} includes Server Authority`);
  assert(content.includes('Rule of Three'), `core/${coreFile} includes Rule of Three for Design Patterns`);
}

// 4. Pluggable Adapters (Domain Layer)
console.log('\n\x1b[1m4. Pluggable Modular Adapters\x1b[0m');
for (const adapterFile of REQUIRED_ADAPTERS) {
  const filePath = path.join(ROOT_DIR, 'adapters', adapterFile);
  const exists = fs.existsSync(filePath);
  if (!exists) {
    assert(false, `Adapter file adapters/${adapterFile} exists`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  assert(content.length > 2000, `Adapter adapters/${adapterFile} is comprehensive (${content.length} chars)`);
  assert(content.startsWith('# '), `Adapter adapters/${adapterFile} has valid H1 title`);
  assert(content.includes('Trigger Conditions'), `Adapter adapters/${adapterFile} defines Trigger Conditions`);
}

// 5. Backward-Compatible Legacy Rules (with Deprecation Bridges)
console.log('\n\x1b[1m5. Legacy Rules & Deprecation Bridges\x1b[0m');
for (const ruleFile of REQUIRED_RULES) {
  const filePath = path.join(ROOT_DIR, 'rules', ruleFile);
  const exists = fs.existsSync(filePath);
  if (!exists) {
    assert(false, `Rule file rules/${ruleFile} exists`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  assert(content.length > 500, `Rule rules/${ruleFile} is comprehensive (${content.length} chars)`);
  assert(content.startsWith('# '), `Rule rules/${ruleFile} has valid H1 title`);
  assert(content.includes('Apex v6.0 Migration Notice'), `Rule rules/${ruleFile} contains migration notice`);
}

// 6. Skills & Strict Seam Vocabulary
console.log('\n\x1b[1m6. Skills & Seam Taxonomy\x1b[0m');
for (const skillName of REQUIRED_SKILLS) {
  const skillDir = path.join(ROOT_DIR, 'skills', skillName);
  const skillFile = path.join(skillDir, 'SKILL.md');
  const exists = fs.existsSync(skillFile);
  if (!exists) {
    assert(false, `Skill file skills/${skillName}/SKILL.md exists`);
    continue;
  }
  const content = fs.readFileSync(skillFile, 'utf-8');
  const hasYamlFrontmatter = content.startsWith('---') && content.includes('name:') && content.includes('description:');
  assert(hasYamlFrontmatter, `Skill ${skillName} contains valid YAML frontmatter (name & description)`);
  assert(content.length > 300, `Skill ${skillName} has detailed actionable instructions (${content.length} chars)`);
}

const verifySkillContent = fs.readFileSync(path.join(ROOT_DIR, 'skills/quality-verify/SKILL.md'), 'utf-8');
assert(verifySkillContent.includes('[Verified: Test]'), 'quality-verify skill contains [Verified: Test] seam');
assert(verifySkillContent.includes('[Verified: Compiler]'), 'quality-verify skill contains [Verified: Compiler] seam');
assert(verifySkillContent.includes('[Syntax-Only]'), 'quality-verify skill contains [Syntax-Only] seam');
assert(verifySkillContent.includes('[Unverified: Visual]'), 'quality-verify skill contains [Unverified: Visual] seam');

// 7. Micro-Kernel Token Budget & Invariants
console.log('\n\x1b[1m7. Micro-Kernel Token Budget & Invariants\x1b[0m');
const kernelContent = fs.readFileSync(path.join(ROOT_DIR, 'AGENTS.md'), 'utf-8');
const kernelBytes = Buffer.byteLength(kernelContent, 'utf-8');
const kernelWords = kernelContent.trim().split(/\s+/).length;
assert(kernelBytes < 6000, `AGENTS.md adheres to Micro-Kernel byte budget (${kernelBytes} < 6000 bytes)`);
assert(kernelWords < 600, `AGENTS.md adheres to Micro-Kernel word budget (${kernelWords} < 600 words)`);
assert(kernelContent.includes('[R0] Absolute Context Grounding'), 'AGENTS.md contains [R0]');
assert(kernelContent.includes('[R1] 3-Tier Dynamic Intent'), 'AGENTS.md contains [R1]');
assert(kernelContent.includes('[R2] In-RAM Fast Targeted Verification'), 'AGENTS.md contains [R2]');
assert(kernelContent.includes('[R3] Strict Seam Binding'), 'AGENTS.md contains [R3]');
assert(kernelContent.includes('[R4] Surgical Diffs & Working Tree Purity'), 'AGENTS.md contains [R4]');
assert(kernelContent.includes('Deterministic JIT Adapter Bus & Risk Override Gate'), 'AGENTS.md contains Deterministic Adapter Bus & Risk Override');

// 8. Templates & Blueprints
console.log('\n\x1b[1m8. Templates & Blueprints\x1b[0m');
for (const tmpl of REQUIRED_TEMPLATES) {
  const filePath = path.join(ROOT_DIR, 'templates', tmpl);
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  assert(exists && size > 100, `Template templates/${tmpl} exists (${size} bytes)`);
}

// 9. Master Orchestration Cross-References
console.log('\n\x1b[1m9. Master Orchestration Cross-References\x1b[0m');
assert(kernelContent.includes('core/principles.md'), 'AGENTS.md references core/principles.md');
for (const adapterFile of REQUIRED_ADAPTERS) {
  assert(kernelContent.includes(`adapters/${adapterFile}`), `AGENTS.md references adapters/${adapterFile}`);
}

// 10. Multi-Stack Coverage Check in Adapters
console.log('\n\x1b[1m10. Multi-Stack Coverage in Adapters\x1b[0m');
const webAdapter = fs.readFileSync(path.join(ROOT_DIR, 'adapters/web-fullstack.md'), 'utf-8');
assert(webAdapter.includes('Nuxt 4') && webAdapter.includes('Next.js 15'), 'Web adapter covers Nuxt 4 & Next.js 15');
assert(webAdapter.includes('Four-State UI Contract'), 'Web adapter defines Four-State UI Contract');

const backendAdapter = fs.readFileSync(path.join(ROOT_DIR, 'adapters/backend-data.md'), 'utf-8');
assert(backendAdapter.includes('Prisma') && backendAdapter.includes('PostgreSQL'), 'Backend adapter covers Prisma & PostgreSQL');
assert(backendAdapter.includes('Standard 4-Step Handler Pipeline'), 'Backend adapter defines 4-Step Pipeline');

const polyglotAdapter = fs.readFileSync(path.join(ROOT_DIR, 'adapters/polyglot-core.md'), 'utf-8');
assert(polyglotAdapter.includes('Python') && polyglotAdapter.includes('C#'), 'Polyglot adapter covers Python & C#');

// 11. Script Integrity (package.json wiring)
console.log('\n\x1b[1m11. Script Integrity\x1b[0m');
const pkgScripts = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf-8')).scripts || {};
for (const [scriptName, command] of Object.entries(pkgScripts)) {
  for (const m of command.matchAll(/scripts[\\/](\S+?\.js)/g)) {
    const target = path.join(ROOT_DIR, 'scripts', m[1]);
    assert(fs.existsSync(target), `npm script "${scriptName}" -> scripts/${m[1]} exists`);
  }
}

// 12. Documentation Consistency
console.log('\n\x1b[1m12. Documentation Consistency\x1b[0m');
const readme = fs.readFileSync(path.join(ROOT_DIR, 'README.md'), 'utf-8');
const readmeThai = fs.readFileSync(path.join(ROOT_DIR, 'README.th.md'), 'utf-8');
assert(!readme.includes('npm run benchmark') && !readmeThai.includes('npm run benchmark'), 'README files do not advertise removed benchmark scripts');
assert(!readme.includes('100% accurate') && !readmeThai.includes('แม่นยำ 100%'), 'README files avoid absolute extractor accuracy claims');
assert(!readme.includes('Deterministic Control Plane') && !readmeThai.includes('Deterministic Control Plane'), 'README files avoid unsupported deterministic-enforcement claims');
assert(kernelContent.includes('Optional Nexus MCP'), 'AGENTS.md documents optional Nexus MCP');

// 13. Local Markdown Link Check
console.log('\n\x1b[1m13. Local Documentation Links\x1b[0m');
for (const file of ['README.md', 'README.th.md', 'AGENTS.md', 'AI-Context-Index.md']) {
  const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf-8');
  for (const match of content.matchAll(/\]\((\.\/[^)#]+)(?:#[^)]+)?\)/g)) {
    const target = path.resolve(ROOT_DIR, match[1]);
    assert(fs.existsSync(target), `${file} local link ${match[1]} resolves`);
  }
}

// Summary
console.log('\n------------------------------------------------------------');
console.log(`\x1b[1mResults: ${passedChecks}/${totalChecks} checks passed.\x1b[0m`);

if (errors.length === 0) {
  console.log('\x1b[32m✔ All Framework Integrity Gates PASSED successfully! (100%)\x1b[0m\n');
  process.exit(0);
} else {
  console.log(`\x1b[31m✖ ${errors.length} checks failed.\x1b[0m\n`);
  process.exit(1);
}
