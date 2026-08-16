#!/usr/bin/env node

/**
 * 🗺️ AI Context Index Auto-Scanner & Generator
 * 
 * สคริปต์สแกนโปรเจกต์อัตโนมัติ (Zero-dependency) เพื่อสร้างหรืออัปเดตไฟล์ AI-Context-Index.md
 * ตรวจจับ: Framework, UI Libraries, State Management, Prisma Models, และ API Endpoints
 */

const fs = require('fs')
const path = require('path')

const CWD = process.cwd()
const TARGET_FILE = path.join(CWD, 'AI-Context-Index.md')
const PACKAGE_JSON_PATH = path.join(CWD, 'package.json')
const PRISMA_SCHEMA_PATH = path.join(CWD, 'prisma', 'schema.prisma')

function log(msg) {
  console.log(`[AI-Context-Scanner] ${msg}`)
}

// 1. ตรวจสอบ package.json
let pkg = {}
if (fs.existsSync(PACKAGE_JSON_PATH)) {
  try {
    pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'))
  } catch (e) {
    log('⚠️ Failed to parse package.json')
  }
}

const allDeps = {
  ...(pkg.dependencies || {}),
  ...(pkg.devDependencies || {})
}

// 2. วิเคราะห์ Tech Stack
function detectStack() {
  const stack = []
  
  // Framework
  if (allDeps['nuxt']) stack.push('Nuxt 4 / Nitro (Vue 3)')
  else if (allDeps['next']) stack.push('Next.js (React App Router)')
  else if (allDeps['vite'] && allDeps['react']) stack.push('React (Vite SPA)')
  else if (allDeps['vite'] && allDeps['vue']) stack.push('Vue 3 (Vite SPA)')
  else if (allDeps['express']) stack.push('Express.js Node Backend')
  else if (allDeps['@nestjs/core']) stack.push('NestJS Backend')
  else stack.push('TypeScript / Node.js')

  // ORM / Database
  if (allDeps['@prisma/client'] || allDeps['prisma']) stack.push('Prisma ORM (PostgreSQL)')
  else if (allDeps['drizzle-orm']) stack.push('Drizzle ORM')
  else if (allDeps['mongoose']) stack.push('MongoDB (Mongoose)')

  // Styling & UI
  if (allDeps['@nuxt/ui']) stack.push('Nuxt UI')
  if (allDeps['tailwindcss']) stack.push('Tailwind CSS')
  if (allDeps['@radix-ui/react-primitive'] || allDeps['shadcn-ui']) stack.push('Shadcn UI / Radix')

  // State Management
  if (allDeps['pinia']) stack.push('Pinia Store')
  if (allDeps['zustand']) stack.push('Zustand Store')
  if (allDeps['@tanstack/vue-query'] || allDeps['@tanstack/react-query']) stack.push('TanStack Query')

  return stack.join(' + ')
}

// 3. สแกน Prisma Models
function scanPrismaModels() {
  if (!fs.existsSync(PRISMA_SCHEMA_PATH)) return []
  
  const content = fs.readFileSync(PRISMA_SCHEMA_PATH, 'utf-8')
  const modelRegex = /model\s+(\w+)\s+\{([\s\S]*?)\}/g
  const models = []

  let match
  while ((match = modelRegex.exec(content)) !== null) {
    const modelName = match[1]
    const body = match[2]
    
    // ดึงฟิลด์สำคัญ
    const fields = body
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('//') && !line.startsWith('@@'))
      .map(line => line.split(/\s+/)[0])
      .filter(field => !['id', 'createdAt', 'updatedAt', 'deletedAt', 'created_at', 'updated_at', 'deleted_at'].includes(field))
      .slice(0, 5)

    models.push({
      name: modelName,
      fieldsSummary: fields.length > 0 ? fields.join(', ') : 'standard fields'
    })
  }

  return models
}

// 4. สแกนหา API Endpoints
function scanApiEndpoints() {
  const endpoints = []
  
  // ตรวจ Nuxt / Nitro APIs (server/api)
  const nuxtApiPath = path.join(CWD, 'server', 'api')
  if (fs.existsSync(nuxtApiPath)) {
    function walkNuxt(dir, prefix = '/api') {
      const entries = fs.readdirSync(dir, { withFileTypes: true })
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          walkNuxt(fullPath, `${prefix}/${entry.name}`)
        } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.js'))) {
          const baseName = entry.name.replace(/\.(ts|js)$/, '')
          const parts = baseName.split('.')
          let method = 'ALL'
          let routeName = parts[0]
          
          if (parts.length > 1 && ['get', 'post', 'put', 'patch', 'delete'].includes(parts[parts.length - 1])) {
            method = parts[parts.length - 1].toUpperCase()
            routeName = parts.slice(0, -1).join('.')
          }
          
          const finalRoute = routeName === 'index' ? prefix : `${prefix}/${routeName}`
          endpoints.push(`${method.padEnd(6)} ${finalRoute}`)
        }
      }
    }
    walkNuxt(nuxtApiPath)
  }

  // ตรวจ Next.js Route Handlers (app/api หรือ src/app/api)
  const nextApiPaths = [path.join(CWD, 'app', 'api'), path.join(CWD, 'src', 'app', 'api')]
  for (const nextApiPath of nextApiPaths) {
    if (fs.existsSync(nextApiPath)) {
      function walkNext(dir, prefix = '/api') {
        const entries = fs.readdirSync(dir, { withFileTypes: true })
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name)
          if (entry.isDirectory()) {
            walkNext(fullPath, `${prefix}/${entry.name}`)
          } else if (entry.name === 'route.ts' || entry.name === 'route.js') {
            endpoints.push(`ROUTE  ${prefix}`)
          }
        }
      }
      walkNext(nextApiPath)
    }
  }

  return endpoints
}

// 5. อ่าน Red-lines เดิมถ้ามีไฟล์อยู่แล้ว
function extractExistingRedlines() {
  if (!fs.existsSync(TARGET_FILE)) return null
  const content = fs.readFileSync(TARGET_FILE, 'utf-8')
  const redlinesSection = content.split('## 🚨 5. Project-Specific Red-Lines')
  if (redlinesSection.length > 1) {
    return redlinesSection[1].trim()
  }
  return null
}

// 6. ประกอบเนื้อหา AI-Context-Index.md
function generateMarkdown() {
  const projectName = pkg.name || path.basename(CWD)
  const projectDesc = pkg.description || 'ระบบจัดการแอปพลิเคชันและบริการส่วนกลาง'
  const stack = detectStack()
  const models = scanPrismaModels()
  const endpoints = scanApiEndpoints()
  const existingRedlines = extractExistingRedlines()

  const isNuxt = allDeps['nuxt'] || fs.existsSync(path.join(CWD, 'server'))
  const isReact = allDeps['next'] || allDeps['react'] || fs.existsSync(path.join(CWD, 'src'))

  let treeStructure = ''
  if (isNuxt) {
    treeStructure = `\`\`\`text
.
├── AGENTS.md                  # Master Agent Rules
├── AI-Context-Index.md        # แผนที่สรุปบริบทโปรเจกต์สำหรับ AI (ไฟล์นี้)
├── rules/                     # โฟลเดอร์เก็บกฎมาตรฐาน 6 เสาหลัก
├── app/ (หรือ root)
│   ├── layouts/               # App Shell Layouts (default.vue, admin.vue)
│   ├── pages/                 # File-based Routes & Route Views
│   ├── features/              # Feature Domain Components & Logic
│   ├── components/ui/         # Shared / Atomic Dumb Components (Nuxt UI)
│   └── composables/           # Shared Custom Hooks / Composables
├── server/                    # Nitro Backend Server Engine
│   ├── api/v1/                # Server REST API Endpoints
│   ├── middleware/            # Server Auth & Logging Middleware
│   └── utils/                 # Prisma Client & Server Utilities
├── prisma/                    # Database Schema & Migrations
└── public/                    # Static Assets
\`\`\``
  } else {
    treeStructure = `\`\`\`text
.
├── AGENTS.md                  # Master Agent Rules
├── AI-Context-Index.md        # แผนที่สรุปบริบทโปรเจกต์สำหรับ AI (ไฟล์นี้)
├── rules/                     # โฟลเดอร์เก็บกฎมาตรฐาน 6 เสาหลัก
├── src/                       # React Application Source
│   ├── layouts/               # App Shell Layouts (RootLayout.tsx, AdminLayout.tsx)
│   ├── pages/                 # Page View Components per Route
│   ├── features/              # Feature Domain Modules (components, hooks, types)
│   ├── components/ui/         # Shared Atomic Components (Shadcn UI / Radix)
│   ├── store/                 # Global Client State Stores (Zustand)
│   └── routes/                # Router Configuration & Outlets
├── prisma/ (ถ้าทำ backend)    # Database Schema & Migrations
└── public/                    # Static Assets
\`\`\``
  }

  let modelsText = ''
  if (models.length > 0) {
    modelsText = models.map(m => `- **${m.name}:** [${m.fieldsSummary}]`).join('\n')
  } else {
    modelsText = `- **User / Account:** ระบบสิทธิ์ RBAC และข้อมูลบัญชี\n- [เพิ่ม Domain Models อื่นๆ ตาม Schema]`
  }

  let endpointsText = ''
  if (endpoints.length > 0) {
    endpointsText = endpoints.slice(0, 10).map(e => `- \`${e}\``).join('\n')
    if (endpoints.length > 10) endpointsText += `\n- *...และอีก ${endpoints.length - 10} endpoints*`
  } else {
    endpointsText = `- \`GET    /api/v1/health\` $\\rightarrow$ System Health Check\n- \`POST   /api/v1/auth/login\` $\\rightarrow$ User Authentication\n- \`GET    /api/v1/[resource]\` $\\rightarrow$ Resource List (Paginated)`
  }

  let redlinesText = existingRedlines || `1. ห้ามแก้ไขไฟล์ \`schema.prisma\` โดยไม่ผ่านกระบวนการ Migration
2. ห้าม Import component หรือฟังก์ชันข้าม Feature Domain โดยตรง (ให้ใช้ Shared Service / Store แทน)
3. รหัสผ่านหรือข้อมูลลับทั้งหมดต้องเก็บใน Environment Variables ห้าม Hardcode เด็ดขาด`

  return `# 🗺️ AI Context Index & Project Architecture Map

> **คำชี้แจงสำหรับ AI Agent:** ไฟล์นี้คือแผนที่สรุปบริบทของโปรเจกต์ (Single Source of Truth) เพื่อให้ Agent อ่านและเข้าใจโครงสร้างระบบทันทีโดยไม่ต้องสแกนหาไฟล์ทั้งโปรเจกต์
> ⚠️ **Security Notice:** ห้ามใส่ Connection String, API Keys, Passwords หรือ Secrets จริงลงในไฟล์นี้โดยเด็ดขาด ให้ใช้ Environment Variables หรือ Pattern \`<secret:VAR_NAME>\` แทนเสมอ

---

## 📌 1. ภาพรวมโปรเจกต์ (Project Overview)
- **ชื่อโปรเจกต์:** ${projectName}
- **คำอธิบาย:** ${projectDesc}
- **Tech Stack หลัก:** ${stack}
- **Environment Status:** Development / Staging / Production

---

## 📁 2. โครงสร้างโฟลเดอร์หลัก (Root Directory Blueprint)

${treeStructure}

---

## 🗄️ 3. Core Domain Models (ฐานข้อมูลหลัก)
${modelsText}

---

## 🔌 4. Key API Endpoints Map
${endpointsText}

---

## 🚨 5. Project-Specific Red-Lines (ข้อห้ามเฉพาะโปรเจกต์นี้)
${redlinesText}
`
}

// 7. รันและบันทึกไฟล์
function main() {
  log('Scanning project dependencies, models, and routes...')
  const output = generateMarkdown()
  fs.writeFileSync(TARGET_FILE, output, 'utf-8')
  log(`✅ Successfully generated AI Context Map at: ${TARGET_FILE}`)
}

main()
