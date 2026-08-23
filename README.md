# ⚡ Apex 4.0 — Lean AI Agent Operating Protocol

> **Turn your AI Coding Agent into a Disciplined Senior Software Engineer in 10 Seconds.**  
> ชุด System Rules & Guardrails สำหรับ AI Coding Agent (Cursor, Claude Code, Google Antigravity, Windsurf) เพื่อล็อกคอให้ AI ทำงานละเอียด รอบคอบ มีวินัย และรันเทสต์จริงระดับ **Production-Ready**

[![Version](https://img.shields.io/badge/version-4.0.0-blue.svg)](https://github.com/AlmxndBL/Apex-core)
[![Supported Tools](https://img.shields.io/badge/Agent-Cursor%20%7C%20Claude%20Code%20%7C%20Antigravity%20%7C%20Windsurf-818CF8.svg)](https://github.com/AlmxndBL/Apex-core)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ⚡ เริ่มใช้งานใน 10 วินาที (10-Second Quickstart)

เลือกความต้องการของคุณ แล้วก๊อปปี้ไปวางที่ Root Directory ของโปรเจกต์ได้ทันที:

### 🟢 1. Apex Nano (แนะนำสำหรับทุกคน — 1 ไฟล์เดี่ยว จบในตัว)
ก๊อปปี้ไฟล์ [`presets/nano/AGENTS.md`](./presets/nano/AGENTS.md) ไปวางที่ Root โปรเจกต์ของคุณ (หรือเปลี่ยนชื่อเป็น `.cursorrules` / `CLAUDE.md`):

```markdown
# ⚡ Apex Nano — Senior AI Coding Guardrails

1. 🛑 HARD INTENT LOCK: If user asks "why/how/audit", DO NOT edit code. Report root cause first.
2. 🧪 TIERED FAST CHECK: Run `tsc --noEmit` / `vue-tsc --noEmit` (1-2s). NEVER run full build for single edits.
3. 📜 EVIDENCE DELIVERY: No terminal output proof = Task is NOT complete.
4. ✂️ SURGICAL DIFFS: Modify ONLY targeted lines. Zero drive-by refactoring. Strict TypeScript (no any).
5. 🚨 2-STRIKE LOOP BREAKER: If a fix fails twice, STOP immediately and ask the user.
```

---

### 🟡 2. Stack-Specific Presets (พร้อมใช้เฉพาะ Stack)
* ⚡ **Next.js 15 / React 19:** ใช้ [`presets/nextjs/AGENTS.md`](./presets/nextjs/AGENTS.md) (RSC, Server Actions, Zod, Prisma)
* 💚 **Nuxt 4 / Vue 3:** ใช้ [`presets/nuxt4/AGENTS.md`](./presets/nuxt4/AGENTS.md) (Nitro, Composables, Hydration-Safe, Prisma)

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

| ❌ AI ทั่วไป (Generic AI Agent) | ✅ เมื่อใช้ Apex (Disciplined Senior Agent) |
|---|---|
| **ชอบแอบแก้โค้ดชิงสุกก่อนห่าม:** แค่ถามหาสาเหตุ แต่ AI ดันทะลึ่งแก้ไฟล์จนเละ | **🛑 Hard Intent Lock:** ถ้าคำสั่งเป็นการ "วิเคราะห์/หาสาเหตุ" ห้ามแตะต้องไฟล์โค้ดเด็ดขาด |
| **มโนว่างานเสร็จ:** บอก "เสร็จแล้วครับ" ทั้งที่โค้ดยังรันไม่ผ่านหรือคอมไพล์พัง | **📜 Mandatory Evidence:** บังคับรัน TypeCheck/Test จริง และต้องโชว์ผลลัพธ์จาก Terminal เสมอ |
| **สั่ง Build ใหญ่ทุกครั้ง:** รัน `npm run build` ตลอดเวลาจนเสียเวลา 2-3 นาที | **🧪 Fast In-Memory Check:** ตรวจ TypeCheck ใน RAM ผ่าน `tsc`/`vue-tsc` ใน 1-3 วินาที |
| **แก้บั๊กวนลูปไม่รู้จบ:** แก้ผิดซ้ำๆ แล้ววนลูปเดิม 10 รอบจนเปลือง token | **🚨 2-Strike Loop Breaker:** หากแก้ไม่ผ่าน 2 ครั้ง ต้องหยุดและออกรายงานสรุป Root Cause ทันที |
| **มือซนแอบแก้ไฟล์ข้างเคียง:** เปลี่ยน single quote เป็น double quote ทั่วโปรเจกต์ | **✂️ Surgical Diffs:** แก้เฉพาะบรรทัดที่เกี่ยวข้อง ห้ามทำ Drive-by Refactoring เด็ดขาด |

---

## 🏛️ สถาปัตยกรรม 3 ระดับ (The 3-Tier Model)

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🟢 Tier 1: Apex Nano (1-File Drop-in — ~40 บรรทัด)                          │
│    • เหมาะสำหรับ: Solo Devs, โปรเจกต์ทั่วไป, ก๊อปปี้ไปวางใน 5 วินาที         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🟡 Tier 2: Apex Core (Stack Presets — Next.js / Nuxt 4)                     │
│    • เหมาะสำหรับ: Full-Stack Devs ที่ต้องการมาตรฐานเฉพาะ Framework          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🟣 Tier 3: Apex Pro Studio (Apex Engine + 4 Consolidated Skills + Templates)│
│    • เหมาะสำหรับ: Multi-Agent Workspaces, Monorepos, และ Enterprise Projects│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧰 ชุดสกิล 4 โดเมนหลัก (Consolidated Skills in v4.0)

1. 🎨 **[`skills/frontend`](./skills/frontend/SKILL.md):** Enterprise UI/UX, Tailwind CSS, Dual Responsive Tables, HSL Palette, Vue/React Component Layers
2. 🗄️ **[`skills/backend-data`](./skills/backend-data/SKILL.md):** Strict TypeScript (No Any), PostgreSQL, Prisma Optimization, Indexing, Transactions, API Security
3. 🧪 **[`skills/quality-verify`](./skills/quality-verify/SKILL.md):** In-Memory TypeCheck, Vitest Runner, Sandbox DB Rollback, 2-Strike Failure Recovery
4. 🧭 **[`skills/cartography`](./skills/cartography/SKILL.md):** AST Codebase Skeleton Map, Search-First Token Diet, Session Handoff

---

## 🌌 Twin-Engine Synergy: Apex & Nexus

Apex ถูกออกแบบให้ทำงานแบบ **100% Standalone (Zero-Dependency)** แต่สามารถเชื่อมต่อกับ **[Nexus](https://github.com/AlmxndBL/nexus)** เพื่อปลดล็อกระบบบันทึกความจำระยะยาวข้ามโปรเจกต์ (Long-Term Memory Vault):

* **Apex:** กฎเกณฑ์และวินัยการเขียนโค้ด (HOW to build & verify)
* **Nexus:** คลังความจำและบทเรียนข้ามโปรเจกต์ (WHAT we know & learned)

---

## 💖 Acknowledgements & Inspirations

* **🧙‍♂️ [Matt Pocock (Total TypeScript)](https://github.com/mattpocock/skills)** — ปรัชญา Strict Type-Safe
* **🎯 [The 9arm Way](https://github.com/jirayu-ct-dev/9arm-skills)** — แนวคิด Pragmatic Engineering และ Trade-off evaluation
* **🧠 [Andrej Karpathy](https://github.com/multica-ai/andrej-karpathy-skills)** — แรงบันดาลใจด้าน Agent Behavioral Safeguards & Anti-Overengineering

---

<div align="center">

**Built for Developers who demand Production-Grade AI Engineering.**  
Distributed under the MIT License.

</div>
