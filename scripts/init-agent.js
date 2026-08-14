#!/usr/bin/env node

/**
 * init-agent.js - Script สำหรับคัดลอกไฟล์ AGENTS.md, rules/, และ AI-Context-Index.md ไปยังโปรเจกต์เป้าหมาย
 * วิธีรัน: node scripts/init-agent.js <target-directory-path>
 */

const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const sourceDir = path.resolve(__dirname, '..');

console.log(`🚀 กำลังคัดลอก agent-skill ไปยัง: ${targetDir}\n`);

// 1. คัดลอก AGENTS.md
const agentsSource = path.join(sourceDir, 'AGENTS.md');
const agentsTarget = path.join(targetDir, 'AGENTS.md');
if (fs.existsSync(agentsSource)) {
  fs.copyFileSync(agentsSource, agentsTarget);
  console.log('✅ คัดลอก AGENTS.md สำเร็จ');
}

// 2. คัดลอกโฟลเดอร์ rules/
const rulesSource = path.join(sourceDir, 'rules');
const rulesTarget = path.join(targetDir, 'rules');
if (fs.existsSync(rulesSource)) {
  fs.mkdirSync(rulesTarget, { recursive: true });
  const files = fs.readdirSync(rulesSource);
  files.forEach(file => {
    fs.copyFileSync(path.join(rulesSource, file), path.join(rulesTarget, file));
  });
  console.log(`✅ คัดลอก rules/ (${files.length} โมดูล) สำเร็จ`);
}

// 3. คัดลอก AI-Context-Index.md
const contextSource = path.join(sourceDir, 'templates', 'AI-Context-Index.md');
const contextTarget = path.join(targetDir, 'AI-Context-Index.md');
if (fs.existsSync(contextSource) && !fs.existsSync(contextTarget)) {
  fs.copyFileSync(contextSource, contextTarget);
  console.log('✅ คัดลอก AI-Context-Index.md สำเร็จ');
}

console.log('\n🎉 ติดตั้ง agent-skill เรียบร้อยแล้ว! AI Agent พร้อมทำงานตามมาตรฐานระดับ Production');
