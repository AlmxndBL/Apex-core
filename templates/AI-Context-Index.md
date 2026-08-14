# 🗺️ AI Context Index & Project Architecture Map

> **คำชี้แจงสำหรับ AI Agent:** ไฟล์นี้คือแผนที่สรุปบริบทของโปรเจกต์ (Single Source of Truth) เพื่อให้ Agent อ่านและเข้าใจโครงสร้างระบบทันทีโดยไม่ต้องสแกนหาไฟล์ทั้งโปรเจกต์

---

## 📌 1. ภาพรวมโปรเจกต์ (Project Overview)
- **ชื่อโปรเจกต์:** [ระบุชื่อโปรเจกต์]
- **คำอธิบาย:** [ระบุเป้าหมายหลักและฟังก์ชันของระบบ]
- **Tech Stack หลัก:** [ระบุ เช่น Nuxt 4 + Nitro + Prisma หรือ React Vite + Tailwind + Zustand]
- **Environment Status:** Development / Staging / Production

---

## 📁 2. โครงสร้างโฟลเดอร์หลัก (Root Directory Blueprint)

### [เลือก Preset ที่ตรงกับโปรเจกต์]

#### 🟢 Preset A: Nuxt 4 (Vue Full-stack)
```text
.
├── AGENTS.md                  # Master Agent Rules
├── AI-Context-Index.md        # แผนที่สรุปบริบทโปรเจกต์สำหรับ AI (ไฟล์นี้)
├── rules/                     # โฟลเดอร์เก็บกฎเฉพาะทาง 12 โมดูล
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
└── public/                    # Static Assets (Images, Icons)
```

#### 🔵 Preset B: React (Next.js / Vite)
```text
.
├── AGENTS.md                  # Master Agent Rules
├── AI-Context-Index.md        # แผนที่สรุปบริบทโปรเจกต์สำหรับ AI (ไฟล์นี้)
├── rules/                     # โฟลเดอร์เก็บกฎเฉพาะทาง 12 โมดูล
├── src/                       # React Application Source
│   ├── layouts/               # App Shell Layouts (RootLayout.tsx, AdminLayout.tsx)
│   ├── pages/                 # Page View Components per Route
│   ├── features/              # Feature Domain Modules (components, hooks, types)
│   ├── components/ui/         # Shared Atomic Components (Shadcn UI / Radix)
│   ├── store/                 # Global Client State Stores (Zustand)
│   └── routes/                # Router Configuration & Outlets
├── prisma/ (ถ้าทำ backend)    # Database Schema & Migrations
└── public/                    # Static Assets
```

---

## 🗄️ 3. Core Domain Models (ฐานข้อมูลหลัก)
- **User / Account:** [ระบุสั้นๆ เช่น ระบบสิทธิ์ RBAC, Auth Session]
- **[Domain Model 2]:** [รายละเอียดสั้นๆ]

---

## 🔌 4. Key API Endpoints Map
- `GET /api/v1/health` $\rightarrow$ System Health Check
- `POST /api/v1/auth/login` $\rightarrow$ User Authentication
- `GET /api/v1/[resource]` $\rightarrow$ Resource List (Paginated)

---

## 🚨 5. Project-Specific Red-Lines (ข้อห้ามเฉพาะโปรเจกต์นี้)
1. [ระบุข้อห้ามเฉพาะ เช่น ห้ามแก้ไฟล์ schema.prisma โดยไม่ทำ migration]
2. [ระบุข้อห้าม เช่น ห้าม import component ข้าม feature domain]
