#!/usr/bin/env node

/**
 * Apex Framework Verification Suite
 * Validates integrity, metadata, YAML frontmatter, and cross-references
 * across Rules, Skills, Templates, and Configuration.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const REQUIRED_RULES = [
  '01-security-auth.md',
  '02-coding-standards.md',
  '03-system-architecture.md',
  '04-database-design.md',
  '05-ux-ui-design.md',
  '06-testing-devops.md',
];

const REQUIRED_SKILLS = [
  'codebase-cartographer',
  'context-budget',
  'database-architect',
  'design-taste-frontend',
  'docker-devops-master',
  'impeccable-audit',
  'sandbox-testing',
  'typescript-wizard',
];

const REQUIRED_TEMPLATES = [
  'AI-Context-Index.md',
  'gitignore-production.md',
  'blueprints/enterprise-data-table.md',
  'blueprints/idempotent-webhook-receiver-with-hmac-signature.md',
  'blueprints/rbac-multi-role.md',
  'blueprints/responsive-enterprise-sidebar.md',
];

const REQUIRED_ROOT_FILES = [
  'AGENTS.md',
  'AI-Context-Index.md',
  'README.md',
  'CHANGELOG.md',
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

console.log('\n\x1b[1m\x1b[36m⚡ [Apex Verification Suite] Starting Framework Integrity Check...\x1b[0m\n');

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
  const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf-8'));
  assert(pluginJson.version === packageJson.version, `Version match: plugin.json (${pluginJson.version}) === package.json (${packageJson.version})`);
  assert(Boolean(pluginJson.name) && Boolean(pluginJson.description), 'plugin.json has valid name and description');
} catch (err) {
  assert(false, `Failed to parse plugin.json or package.json: ${err.message}`);
}

// 3. Rules Verification
console.log('\n\x1b[1m3. Engineering Rules (6 Pillars)\x1b[0m');
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
}

// 4. Skills Verification (YAML frontmatter + Structure)
console.log('\n\x1b[1m4. Specialized Skills (7 Skills)\x1b[0m');
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
  assert(content.length > 500, `Skill ${skillName} has detailed actionable instructions (${content.length} chars)`);
}

// 5. Templates & Blueprints
console.log('\n\x1b[1m5. Templates & Blueprints\x1b[0m');
for (const tmpl of REQUIRED_TEMPLATES) {
  const filePath = path.join(ROOT_DIR, 'templates', tmpl);
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  assert(exists && size > 100, `Template templates/${tmpl} exists (${size} bytes)`);
}

// 6. Master AGENTS.md Orchestrator Cross-References
console.log('\n\x1b[1m6. Master Orchestration Cross-References\x1b[0m');
const masterAgentsContent = fs.readFileSync(path.join(ROOT_DIR, 'AGENTS.md'), 'utf-8');
for (const ruleFile of REQUIRED_RULES) {
  assert(masterAgentsContent.includes(`rules/${ruleFile}`), `AGENTS.md references rules/${ruleFile}`);
}
for (const skillName of REQUIRED_SKILLS) {
  assert(masterAgentsContent.includes(`skills/${skillName}`), `AGENTS.md references skills/${skillName}`);
}

// 7. Multi-Stack Coverage Check
console.log('\n\x1b[1m7. Multi-Stack Coverage Check\x1b[0m');
const archRuleContent = fs.readFileSync(path.join(ROOT_DIR, 'rules/03-system-architecture.md'), 'utf-8');
assert(archRuleContent.includes('Nuxt 4') && archRuleContent.includes('Nitro'), 'Architecture rule covers Nuxt 4 & Nitro');
assert(archRuleContent.includes('React') && archRuleContent.includes('Next.js'), 'Architecture rule covers React & Next.js');

// Summary
console.log('\n------------------------------------------------------------');
console.log(`\x1b[1mResults: ${passedChecks}/${totalChecks} checks passed.\x1b[0m`);

if (errors.length > 0) {
  console.log(`\x1b[31m❌ Framework verification FAILED with ${errors.length} error(s).\x1b[0m`);
  process.exit(1);
} else {
  console.log(`\x1b[32m✔ All Framework Integrity Gates PASSED successfully! (100%)\x1b[0m\n`);
  process.exit(0);
}
