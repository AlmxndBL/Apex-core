# 🛡️ Production `.gitignore` Preset for Web & Full-Stack Projects

> Preset ไฟล์ `.gitignore` มาตรฐานสำหรับโปรเจกต์ Nuxt 4, Next.js, Vite, Node.js + PostgreSQL/Prisma และระบบแยก AI Artifacts / Secrets ออกจาก Git 100%

```gitignore
# ==========================================
# 1. Dependencies & Package Managers
# ==========================================
node_modules/
.pnpm-store/
.yarn/cache/
.yarn/unplugged/
.npm/

# ==========================================
# 2. Build & Production Outputs
# ==========================================
dist/
build/
.output/
.nuxt/
.next/
.nitro/
.cache/
*.tsbuildinfo

# ==========================================
# 3. Environment Variables & Secrets (CRITICAL)
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
# 4. Database & Local Storage
# ==========================================
*.sqlite
*.sqlite3
*.db
postgres-data/
redis-data/

# ==========================================
# 5. Testing & Code Quality Coverage
# ==========================================
coverage/
.nyc_output/
playwright-report/
test-results/

# ==========================================
# 6. Logs & Runtime Debugging
# ==========================================
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# ==========================================
# 7. OS & IDE Specifics
# ==========================================
.DS_Store
Thumbs.db
.idea/
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json

# ==========================================
# 8. AI Agent Workspaces & Brain Logs (ISOLATION)
# ==========================================
.system_generated/
.gemini/
.antigravity/
brain/
scratch/
tmp/
*.ai.log

# ==========================================
# 9. (Optional) Stealth AI Rules in Target Project
# ถ้าไม่อยากให้ทีมเห็นไฟล์ config หรือ skill ของ AI ในโปรเจกต์นี้
# ==========================================
# AGENTS.md
# CLAUDE.md
# AI-Context-Index.md
# .cursorrules
# .cursor/
# .windsurf/
# skills/
# rules/
```
