# ⚡ Apex 5.0 — The Production Velocity Engine

> **เปลี่ยน AI Coding Agent ของคุณให้กลายเป็น Senior Software Engineer ผู้มีวินัยใน 10 วินาที**  
> ชุด System Rules & Guardrails สำหรับ AI Coding Assistant (Cursor, Claude Code, Google Antigravity, Windsurf) เพื่อปลดล็อกความเร็วในการพัฒนา ควบคุมคุณภาพ UI/UX และบังคับใช้สถาปัตยกรรมระดับ **Production-Ready**

[![Version](https://img.shields.io/badge/version-5.0.0-blue.svg)](https://github.com/AlmxndBL/Apex-core)
[![Supported Tools](https://img.shields.io/badge/Agent-Cursor%20%7C%20Claude%20Code%20%7C%20Antigravity%20%7C%20Windsurf-818CF8.svg)](https://github.com/AlmxndBL/Apex-core)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ⚡ เริ่มใช้งานใน 10 วินาที (10-Second Quickstart)

เลือกรูปแบบที่ต้องการ แล้วก๊อปปี้ไปวางที่ Root Directory ของโปรเจกต์ได้ทันที:

### 🟢 1. Apex Nano (แนะนำสำหรับทุกคน — 1 ไฟล์เดี่ยว จบในตัว)
ก๊อปปี้ไฟล์ [`presets/nano/AGENTS.md`](./presets/nano/AGENTS.md) ไปวางที่ Root โปรเจกต์ของคุณ (หรือเปลี่ยนชื่อเป็น `.cursorrules` / `CLAUDE.md`):

```markdown
# ⚡ Apex Nano — Senior AI Coding Guardrails (v5.0)

1. 🎯 3-TIER DYNAMIC INTENT: 
   - Tier 1 (Read-Only): If user asks "why/explain/audit", diagnose in READ-ONLY mode.
   - Tier 2 (Actionable Flow): If user asks "fix/build/refactor", diagnose, implement, and fast-verify in 1 turn.
   - Tier 3 (Guarded Destructive): Schema drops, auth rewrites, or deletions require user approval first.
2. 🧪 FAST IN-MEMORY CHECK: Run `tsc --noEmit` / `vue-tsc --noEmit` (1-2s). NEVER run full build for single edits.
3. 📜 EVIDENCE DELIVERY: No terminal output proof = Task is NOT complete.
4. ✂️ DUAL EXECUTION MODES: 
   - Patch Mode for targeted bug fixes (surgical diffs).
   - Synthesis Mode for new features and UI components (holistic 3-file modules).
5. 🚨 2-STRIKE LOOP BREAKER: If a fix fails twice, STOP immediately and ask the user.
```

---

### 🟡 2. Stack-Specific Presets (พร้อมใช้เฉพาะ Framework)
* ⚡ **Next.js 15 / React 19:** ใช้ [`presets/nextjs/AGENTS.md`](./presets/nextjs/AGENTS.md) (RSC, Server Actions, 4-State UI, Zod, Prisma)
* 💚 **Nuxt 4 / Vue 3:** ใช้ [`presets/nuxt4/AGENTS.md`](./presets/nuxt4/AGENTS.md) (Nitro, Composables, 4-State UI, Hydration-Safe, Prisma)

---

### 🟣 3. Apex Pro Engine (สำหรับ Google Antigravity & Studio Workspaces)
เชื่อมต่อเป็น Global Live Plugin ผ่าน `~/.gemini/config/plugins.json`:
```json
{
  "entries": [
    { "path": "/absolute/path/to/Apex-core" }
  ]
}
```

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

## 🏛️ สถาปัตยกรรม 3 ระดับ (The 3-Tier Model)

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🟢 Tier 1: Apex Nano (1-File Drop-in — ~30 บรรทัด)                          │
│    • เหมาะสำหรับ: Solo Devs, โปรเจกต์ทั่วไป, ก๊อปปี้ไปวางใน 5 วินาที         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🟡 Tier 2: Apex Core (Stack Presets — Next.js 15 / Nuxt 4)                  │
│    • เหมาะสำหรับ: Full-Stack Devs ที่ต้องการมาตรฐานเฉพาะ Framework          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🟣 Tier 3: Apex Pro Studio (Apex Engine + 4 Consolidated Skills + Templates)│
│    • เหมาะสำหรับ: Multi-Agent Workspaces, Monorepos, และ Enterprise Projects│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧰 ชุดสกิล 4 โดเมนหลัก (Consolidated Skills in v5.0)

1. 🎨 **[`skills/frontend`](./skills/frontend/SKILL.md):** 3-File Feature Module Architecture (`use<Feature>`, `<Feature>List`, `<feature>.contract`), Mandatory 4-State UI (Skeleton, Empty, Error, Data), Modern 3-Tier Surface Elevation, Dual Responsive Tables.
2. 🗄️ **[`skills/backend-data`](./skills/backend-data/SKILL.md):** Standard API Handler Pipeline, Dedicated Service Layer, Database Transactions, Strict TypeScript (No Any), Prisma ORM & OCC Concurrency, Better Auth Integration.
3. 🧪 **[`skills/quality-verify`](./skills/quality-verify/SKILL.md):** In-Memory Fast TypeCheck (1-3s), Vitest Runner, Safe Turn Rollback, Cumulative 2-Strike Failure Recovery.
4. 🧭 **[`skills/cartography`](./skills/cartography/SKILL.md):** AST Codebase Skeleton Mapping, Search-First Token Diet, Session Handoff.

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

