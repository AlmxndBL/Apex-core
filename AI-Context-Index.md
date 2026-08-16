# 🗺️ AI Context Index & Project Architecture Map

> **คำชี้แจงสำหรับ AI Agent:** ไฟล์นี้คือแผนที่สรุปบริบทของโปรเจกต์ (Single Source of Truth) เพื่อให้ Agent อ่านและเข้าใจโครงสร้างระบบทันทีโดยไม่ต้องสแกนหาไฟล์ทั้งโปรเจกต์
> ⚠️ **Security Notice:** ห้ามใส่ Connection String, API Keys, Passwords หรือ Secrets จริงลงในไฟล์นี้โดยเด็ดขาด ให้ใช้ Environment Variables หรือ Pattern `<secret:VAR_NAME>` แทนเสมอ

---

## 📌 1. ภาพรวมโปรเจกต์ (Project Overview)
- **ชื่อโปรเจกต์:** agent_skill
- **คำอธิบาย:** ระบบจัดการแอปพลิเคชันและบริการส่วนกลาง
- **Tech Stack หลัก:** TypeScript / Node.js
- **Environment Status:** Development / Staging / Production

---

## 📁 2. โครงสร้างโฟลเดอร์หลัก (Root Directory Blueprint)

```text
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
```

---

## 🗄️ 3. Core Domain Models (ฐานข้อมูลหลัก)
- **User / Account:** ระบบสิทธิ์ RBAC และข้อมูลบัญชี
- [เพิ่ม Domain Models อื่นๆ ตาม Schema]

---

## 🔌 4. Key API Endpoints Map
- `GET    /api/v1/health` $\rightarrow$ System Health Check
- `POST   /api/v1/auth/login` $\rightarrow$ User Authentication
- `GET    /api/v1/[resource]` $\rightarrow$ Resource List (Paginated)

---

## 🚨 5. Project-Specific Red-Lines (ข้อห้ามเฉพาะโปรเจกต์นี้)
1. ห้ามแก้ไขไฟล์ `schema.prisma` โดยไม่ผ่านกระบวนการ Migration
2. ห้าม Import component หรือฟังก์ชันข้าม Feature Domain โดยตรง (ให้ใช้ Shared Service / Store แทน)
3. รหัสผ่านหรือข้อมูลลับทั้งหมดต้องเก็บใน Environment Variables ห้าม Hardcode เด็ดขาด
