# ⚡ Apex 5.0 — The Production Velocity Engine

> **เปลี่ยน AI Coding Agent ของคุณให้กลายเป็น Senior Software Engineer ผู้มีวินัยใน 10 วินาที**  
> ชุด System Rules & Guardrails สำหรับ AI Coding Assistant (Cursor, Claude Code, Google Antigravity, Windsurf) เพื่อปลดล็อกความเร็วในการพัฒนา ควบคุมคุณภาพ UI/UX และบังคับใช้สถาปัตยกรรมระดับ **Production-Ready**

[![Version](https://img.shields.io/badge/version-5.1.2-blue.svg)](https://github.com/AlmxndBL/Apex-core)
[![Supported Tools](https://img.shields.io/badge/Agent-Cursor%20%7C%20Claude%20Code%20%7C%20Antigravity%20%7C%20Windsurf-818CF8.svg)](https://github.com/AlmxndBL/Apex-core)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ⚡ เริ่มใช้งานใน 5 วินาที (Single Drop-in Setup)

ก๊อปปี้ไฟล์ [`AGENTS.md`](./AGENTS.md) ไปวางที่ Root Directory ของโปรเจกต์คุณ (หรือเปลี่ยนชื่อตามเครื่องมือที่ใช้):

* **Cursor IDE:** วางเป็น `.cursorrules` หรือ `AGENTS.md`
* **Claude Code:** วางเป็น `CLAUDE.md` หรือ `AGENTS.md`
* **Windsurf / Trae:** วางเป็น `AGENTS.md`
* **Google Antigravity:** เชื่อมต่อเป็น Global Plugin ผ่าน `~/.gemini/config/plugins.json`

> 💡 **Unified Auto-Detection:** `AGENTS.md` จะอ่าน `package.json` ของคุณโดยอัตโนมัติ เพื่อเลือกไวยากรณ์ที่ถูกต้องทันที ไม่ว่าโปรเจกต์ของคุณจะเป็น **Nuxt 4 (Vue 3)** หรือ **Next.js 15 (React 19)** หรือ **Python / Go Backend** โดยไม่มีการสับสนไวยากรณ์

---

## ⚔️ ปัญหาจริงที่ Apex เข้ามาแก้ (Before vs After)

| ❌ AI ทั่วไป (Generic AI Agent) | ✅ เมื่อใช้ Apex 5.0 (The Production Velocity Engine) |
|---|---|
| **AI เป็นง่อย / รอคอนเฟิร์มซ้ำซ้อน:** สั่งแก้บั๊ก แต่ AI หยุดรอถาม confirm ทำให้เสียเวลา | **🎯 3-Tier Dynamic Intent:** คำสั่งแก้ไข/สร้าง ทำการวินิจฉัย + ลงมือแก้ + Fast Verify จบใน 1 Turn ทันที |
| **โค้ดยำแปะปลาสเตอร์ (Patch-on-Patch):** บีบแก้ทีละ 2 บรรทัดจน UI จืด/แตก และ Code Architecture พัง | **✂️ Dual Execution Modes:** ปลดล็อก **Synthesis Mode** ให้เขียน Feature Module ทั้งก้อนแบบ Holistic |
| **มโนว่างานเสร็จ:** บอก "เสร็จแล้วครับ" ทั้งที่โค้ดยังรันไม่ผ่านหรือคอมไพล์พัง | **📜 Mandatory Evidence:** บังคับรัน TypeCheck/Test จริง และต้องโชว์ผลลัพธ์จาก Terminal เสมอ |
| **สั่ง Build ใหญ่ทุกครั้ง:** รัน `npm run build` ตลอดเวลาจนเสียเวลา 2-3 นาที | **🧪 Fast In-Memory Check:** ตรวจ TypeCheck ใน RAM ผ่าน `tsc`/`vue-tsc` ใน 1-3 วินาที |
| **แก้บั๊กวนลูปไม่รู้จบ:** แก้ผิดซ้ำๆ แล้ววนลูปเดิม 10 รอบจนเปลือง token | **🚨 2-Strike Loop Breaker:** หากแก้ไม่ผ่าน 2 ครั้ง ต้องหยุดและออกรายงานสรุป Failure Report ทันที |

---

## 🏛️ สถาปัตยกรรม 2 ระดับ (The Two-Layer Model)

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🟢 Layer 1: Core Directives (`AGENTS.md` — ~150 บรรทัด)                     │
│    • Single Drop-in: ก๊อปปี้ไฟล์เดียวได้ทั้ง 5 กฎเหล็ก + Stack Matrix + Blueprints│
│    • เหมาะสำหรับ: โปรเจกต์ทั่วไปที่ต้องการ Setup ไวใน 5 วินาที และประหยัด Context│
│    • รองรับ: Cursor, Claude Code, Windsurf, Antigravity, ทุก Agent          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🟣 Layer 2: Deep Knowledge Engine (`rules/` + `skills/` + `templates/`)      │
│    • Full Repository: 6 เสาหลักความปลอดภัย, ฐานข้อมูล Prisma OCC, และ UI Tokens │
│    • เหมาะสำหรับ: โปรเจกต์ขนาดกลาง-ใหญ่, Enterprise Monorepo, และ Multi-Agent    │
│    • รองรับ: ทุก AI Agent ที่มีระบบอ่านไฟล์ / Indexing (On-Demand Deep Dives)│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧰 ชุดสกิล 4 โดเมนหลัก (Consolidated Skills in v5.0)

1. 🎨 **[`skills/frontend`](./skills/frontend/SKILL.md):** 3-File Feature Module Architecture (`use<Feature>`, `<Feature>List`, `<feature>.contract`), Mandatory 4-State UI (Skeleton, Empty, Error, Data), Modern 3-Tier Surface Elevation, Dual Responsive Tables.
2. 🗄️ **[`skills/backend-data`](./skills/backend-data/SKILL.md):** Standard API Handler Pipeline, Dedicated Service Layer, Database Transactions, Strict TypeScript (No Any), Prisma ORM & OCC Concurrency, Better Auth Integration.
3. 🧪 **[`skills/quality-verify`](./skills/quality-verify/SKILL.md):** In-Memory Fast TypeCheck (1-3s), Vitest Runner, Safe Turn Rollback, Cumulative 2-Strike Failure Recovery.
4. 🧭 **[`skills/cartography`](./skills/cartography/SKILL.md):** AST Codebase Skeleton Mapping, Search-First Token Diet, Session Handoff.

---

## 🖼️ มาตรฐานงาน UI/UX ระดับ Enterprise (Live Showcase)

![Apex Enterprise UI Showcase](./templates/ui/assets/apex-enterprise-dashboard-showcase.png)

Apex บังคับใช้ **Ultra-Compact Modern SaaS Density**, 3-Tier Surface Elevation, Magic UI Theme Toggler, Interactive Sort/Filter Data Tables, และ Crisp SVG Lucide Icons (Strict Zero Emojis) ทั้งใน **Vue 3 / Nuxt 4** และ **React 19 / Next.js 15** โดยมีชุด Starter Component Templates พร้อมใช้งานใน [`templates/ui/`](./templates/ui/)

---

## 🌌 Twin-Engine Synergy: Apex & Nexus

Apex ถูกออกแบบให้ทำงานแบบ **100% Standalone (Zero-Dependency)** แต่สามารถเชื่อมต่อกับ **[Nexus](https://github.com/AlmxndBL/nexus)** เพื่อปลดล็อกระบบบันทึกความจำระยะยาวข้ามโปรเจกต์ (Long-Term Memory Vault):

* **Apex:** กฎเกณฑ์และวินัยการเขียนโค้ด (HOW to build & verify)
* **Nexus:** คลังความจำและบทเรียนข้ามโปรเจกต์ (WHAT we know & learned)

---

## 💖 Acknowledgements & Inspirations

* **🧙‍♂️ [Matt Pocock (Total TypeScript)](https://github.com/mattpocock/skills)** — Strict TypeScript principles
* **🎯 [The 9arm Way](https://github.com/jirayu-ct-dev/9arm-skills)** — Pragmatic software engineering and trade-off evaluation
* **🧠 [Andrej Karpathy](https://github.com/multica-ai/andrej-karpathy-skills)** — Agent behavioral safeguards and anti-overengineering philosophy

