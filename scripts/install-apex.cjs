#!/usr/bin/env node

/**
 * ⚡ Apex Installer & Setup Engine
 * Installs Apex AI Framework into a target project using the Clean .apex Container Architecture.
 *
 * Usage:
 *   node install-apex.js <target-directory> [--stealth]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetArg = process.argv[2] || process.cwd();
const targetDir = path.resolve(targetArg);
const isStealth = process.argv.includes('--stealth');

const apexRoot = path.resolve(__dirname, '..');
const apexContainer = path.join(targetDir, '.apex');

console.log('\n⚡ [Apex-Core] Installing Clean Architecture into:', targetDir);

// 1. Create .apex container
if (!fs.existsSync(apexContainer)) {
  fs.mkdirSync(apexContainer, { recursive: true });
}

// 2. Copy rules, skills, templates, scripts into .apex/
const foldersToCopy = ['rules', 'skills', 'templates', 'scripts'];
for (const folder of foldersToCopy) {
  const src = path.join(apexRoot, folder);
  const dest = path.join(apexContainer, folder);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true, force: true });
    console.log(`  📦 Copied ${folder} -> .apex/${folder}`);
  }
}

// 3. Generate clean root AGENTS.md pointing to .apex/
const masterAgentsPath = path.join(apexRoot, 'AGENTS.md');
if (fs.existsSync(masterAgentsPath)) {
  let agentsContent = fs.readFileSync(masterAgentsPath, 'utf8');
  agentsContent = agentsContent
    .replace(/(?<!\.apex\/)rules\//g, '.apex/rules/')
    .replace(/(?<!\.apex\/)skills\//g, '.apex/skills/')
    .replace(/(?<!\.apex\/)templates\//g, '.apex/templates/')
    .replace(/(?<!\.apex\/)scripts\//g, '.apex/scripts/');
  
  fs.writeFileSync(path.join(targetDir, 'AGENTS.md'), agentsContent, 'utf8');
  console.log('  🧠 Generated clean root AGENTS.md (pointing to .apex/)');
}

// 4. Run Context Scanner
const scannerScript = path.join(apexContainer, 'scripts', 'scan-context.cjs');
if (fs.existsSync(scannerScript)) {
  try {
    console.log('\n🗺️ [Apex-Core] Generating Project AI Context Map...');
    execSync(`node "${scannerScript}"`, { cwd: targetDir, stdio: 'inherit' });
  } catch (err) {
    console.warn('  ⚠️ Scan context completed with warnings.');
  }
}

// 5. Setup Git Shield
const shieldScript = path.join(apexContainer, 'scripts', 'setup-git-shield.cjs');
if (fs.existsSync(shieldScript)) {
  try {
    console.log('\n🛡️ [Apex-Core] Setting up Git Shield & Secret Protection...');
    const flag = isStealth ? '--stealth' : '';
    execSync(`node "${shieldScript}" ${flag}`, { cwd: targetDir, stdio: 'inherit' });
  } catch (err) {
    console.warn('  ⚠️ Git shield setup completed with warnings.');
  }
}

console.log('\n✨ [Apex-Core] Installation Complete! Project is now 100% AI-Ready with Clean Root Architecture.\n');
