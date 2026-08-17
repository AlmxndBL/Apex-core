#!/usr/bin/env node

/**
 * 🛡️ Git Shield & Secret Leak Prevention Setup Script
 * 
 * ใช้สำหรับติดตั้งระบบป้องกัน .env หลุด, Secret Leaks, และป้องกันไฟล์ AI/Skills หลุดขึ้น Git
 * ในโปรเจกต์เป้าหมาย (Zero-dependency - รันได้ทันทีด้วย Node.js)
 * 
 * Usage:
 *   node scripts/setup-git-shield.js [path-to-target-project] [--stealth]
 * 
 * Options:
 *   --stealth   บันทึกการ Ignore ลงใน .git/info/exclude แทน .gitignore
 *               (เหมาะสำหรับกรณีทำงานกับทีม ไม่อยากให้ทีมเห็นว่าเรา ignore ไฟล์ AI หรือแก้ .gitignore)
 */

const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const isStealth = args.includes('--stealth')
const targetArg = args.find(a => !a.startsWith('--'))
const TARGET_DIR = targetArg ? path.resolve(process.cwd(), targetArg) : process.cwd()

console.log(`\n🛡️ [Git Shield] Initializing security guard in: ${TARGET_DIR}`)
if (isStealth) {
  console.log(`🕵️ Mode: STEALTH (Writing to .git/info/exclude)`)
}

// 1. ตรวจสอบ Git Repository
const gitDir = path.join(TARGET_DIR, '.git')
if (!fs.existsSync(gitDir)) {
  console.warn(`⚠️ Warning: No .git directory found at ${TARGET_DIR}. Initializing git repository...`)
  try {
    const { execSync } = require('child_process')
    execSync('git init', { cwd: TARGET_DIR, stdio: 'ignore' })
    console.log(`✅ Git repository initialized.`)
  } catch (e) {
    console.error(`❌ Failed to initialize git. Please run 'git init' manually.`)
  }
}

// 2. รายการ Rules สำหรับ Ignore
const SHIELD_RULES = `
# ==========================================
# 🛡️ Git Shield: Secrets & Environment
# ==========================================
.env
.env.*
.env*.local
.env.production
.env.staging
!.env.example
*.pem
*.key
*.cert
*.pfx
*.pkcs12
id_rsa
id_ed25519

# ==========================================
# 🤖 Git Shield: AI Agents & Local Brain Cache
# ==========================================
.gemini/
.system_generated/
.antigravity/
brain/
scratch/
tmp/
*.ai.log

# ==========================================
# 📦 Build Artifacts & Dependencies
# ==========================================
node_modules/
.pnpm-store/
.output/
.nuxt/
.next/
dist/
build/
.cache/
`

const STEALTH_AI_RULES = `
# ==========================================
# 🕵️ Stealth AI Files (Ignore AI configuration in target project)
# ==========================================
AGENTS.md
CLAUDE.md
AI-Context-Index.md
.cursorrules
.cursor/
.windsurf/
skills/
rules/
`

// 3. เขียนลง .gitignore หรือ .git/info/exclude
const targetIgnorePath = isStealth
  ? path.join(gitDir, 'info', 'exclude')
  : path.join(TARGET_DIR, '.gitignore')

try {
  let existingContent = ''
  if (fs.existsSync(targetIgnorePath)) {
    existingContent = fs.readFileSync(targetIgnorePath, 'utf-8')
  }

  const rulesToAdd = isStealth ? (SHIELD_RULES + STEALTH_AI_RULES) : SHIELD_RULES
  
  if (!existingContent.includes('Git Shield: Secrets & Environment')) {
    const newContent = existingContent.trim() + '\n\n' + rulesToAdd.trim() + '\n'
    fs.mkdirSync(path.dirname(targetIgnorePath), { recursive: true })
    fs.writeFileSync(targetIgnorePath, newContent, 'utf-8')
    console.log(`✅ Updated ignore rules in: ${path.relative(TARGET_DIR, targetIgnorePath)}`)
  } else {
    console.log(`ℹ️ Ignore rules already present in: ${path.relative(TARGET_DIR, targetIgnorePath)}`)
  }
} catch (err) {
  console.error(`❌ Failed to update ignore file: ${err.message}`)
}

// 4. สร้าง .env.example อัตโนมัติ (ถ้ามี .env แต่ยังไม่มี .env.example)
const envPath = path.join(TARGET_DIR, '.env')
const envExamplePath = path.join(TARGET_DIR, '.env.example')

if (fs.existsSync(envPath) && !fs.existsSync(envExamplePath)) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf-8')
    const exampleLines = envContent.split('\n').map(line => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) return line
      const eqIdx = line.indexOf('=')
      if (eqIdx === -1) return line
      const key = line.slice(0, eqIdx).trim()
      return `${key}=""`
    })
    fs.writeFileSync(envExamplePath, exampleLines.join('\n'), 'utf-8')
    console.log(`✅ Generated safe .env.example from .env (all secret values stripped)`)
  } catch (err) {
    console.error(`⚠️ Failed to generate .env.example: ${err.message}`)
  }
}

// 5. ติดตั้ง Pre-commit Hook
const hooksDir = path.join(gitDir, 'hooks')
const preCommitPath = path.join(hooksDir, 'pre-commit')

const PRE_COMMIT_SCRIPT = `#!/bin/sh
# 🛡️ Git Shield Pre-Commit Verification Gate

# 1. ตรวจสอบไฟล์ Sensitive / .env ที่กำลังจะถูก Commit
STAGED_FILES=$(git diff --cached --name-only)

if [ -z "$STAGED_FILES" ]; then
  exit 0
fi

# ตรวจสอบ .env (ยกเว้น .env.example)
LEAKED_ENV=$(echo "$STAGED_FILES" | grep -E '^(\.env|\.env\..*)$' | grep -v '\.env\.example$')
if [ -n "$LEAKED_ENV" ]; then
  echo ""
  echo "❌ [GIT SHIELD REJECT] ตรวจพบไฟล์ Environment กำลังจะถูก Commit:"
  echo "$LEAKED_ENV"
  echo ""
  echo "👉 โปรด unstage ด้วยคำสั่ง: git reset HEAD <file>"
  exit 1
fi

# ตรวจสอบ Private Keys & Certificates
LEAKED_KEYS=$(echo "$STAGED_FILES" | grep -E '\.(pem|key|pfx|pkcs12)$|id_rsa|id_ed25519')
if [ -n "$LEAKED_KEYS" ]; then
  echo ""
  echo "❌ [GIT SHIELD REJECT] ตรวจพบไฟล์ Private Key หรือ Secret Certificate:"
  echo "$LEAKED_KEYS"
  echo ""
  exit 1
fi

# ตรวจสอบ Hardcoded Common Secrets ใน Staged Diff
SECRETS_PATTERN="(sk_live_[0-9a-zA-Z]{24}|ghp_[0-9a-zA-Z]{36}|AIza[0-9A-Za-z_-]{35}|xox[baprs]-[0-9a-zA-Z]{10,48})"
LEAKED_DIFF=$(git diff --cached -U0 | grep -E "^\\+" | grep -E "$SECRETS_PATTERN")

if [ -n "$LEAKED_DIFF" ]; then
  echo ""
  echo "❌ [GIT SHIELD REJECT] ตรวจพบ API Keys / Tokens ที่น่าสงสัยถูก Hardcode ลงในโค้ด!"
  echo "$LEAKED_DIFF"
  echo ""
  echo "👉 โปรดย้าย Secret ไปไว้ใน .env แทน"
  exit 1
fi

exit 0
`

if (fs.existsSync(gitDir)) {
  try {
    fs.mkdirSync(hooksDir, { recursive: true })
    fs.writeFileSync(preCommitPath, PRE_COMMIT_SCRIPT, { mode: 0o755, encoding: 'utf-8' })
    console.log(`✅ Installed Pre-commit Secret Guard Hook in: .git/hooks/pre-commit`)
  } catch (err) {
    console.error(`⚠️ Failed to install git hook: ${err.message}`)
  }
}

console.log(`\n🎉 [Git Shield] Setup complete! Your project is protected against accidental secret & .env leaks.\n`)
