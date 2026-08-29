# ⚡ Apex-core 5 — ชุดคำแนะนำและตัวตรวจสอบสำหรับ AI Coding

> **ชุดคำแนะนำและตัวตรวจสอบแบบ lean สำหรับ AI coding agents**
> Apex-core รวม rules, skills, templates และตัวตรวจความครบถ้วนของ repository สำหรับ Nuxt 4, Next.js และโปรเจกต์เขียนโค้ดอื่น ๆ ผล benchmark เป็นหลักฐานจากการทดสอบภายนอกในอดีต ไม่ใช่การรับประกันผลกับทุกโปรเจกต์หรือทุกโมเดล

<div align="center">

**[ 🇬🇧 English ](README.md) · [ 🇹🇭 ภาษาไทย ](README.th.md)**

</div>

<div align="center">

[![Version](https://img.shields.io/badge/version-5.4.0-3b82f6.svg)](https://github.com/AlmxndBL/Apex-core)
[![Token Savings](https://img.shields.io/badge/Token_Savings-🔻_58.4%25_empirical-10b981.svg)](https://github.com/AlmxndBL/Apex-eval)
[![License](https://img.shields.io/badge/license-MIT-8b5cf6.svg)](LICENSE)

</div>

---

## 🎯 1. จุดบอดที่ไม่มีใครบอกคุณ: การรั่วไหลของ Token (Stateless Token Bleed)

โปรแกรมเมอร์ส่วนใหญ่คิดว่าการแก้บั๊ก 5 บรรทัดจ่ายค่า Token แค่ 5 บรรทัดนั้น แต่ในความเป็นจริง **LLM API (OpenAI, Anthropic) ทำงานแบบ Stateless REST** ทุกรอบที่คุยจึงต้องส่งประวัติเก่าและไฟล์ดิบ 2,000 บรรทัดซ้ำเข้าไปใหม่ ทำให้เกิดการสะสม Token แบบยกกำลัง $\mathcal{O}(N^2)$

```text
┌──────────────────────────────────────────────────┐      ┌──────────────────────────────────────────────────┐
│ ❌ ระบบทั่วไป (โหลดไฟล์เต็ม: 1,858 BPE tok)      │      │ ✅ APEX-CORE 5 AST DIET (สกัด Interface: 67 tok) │
├──────────────────────────────────────────────────┤      ├──────────────────────────────────────────────────┤
│ <template>                                       │      │ // [AST SKELETON: Vue 3 / Nuxt 4 SFC]            │
│   <div class="min-h-screen bg-zinc-950 p-6">     │ ───> │ export interface UserTableRow {                  │
│     <!-- 80+ บรรทัด HTML markup & SVG icons -->  │      │   id: string; email: string; role: Role;         │
│     <table class="w-full border border-zinc-800">│      │ }                                                │
│   </div>                                         │      │ export interface Props { users: UserTableRow[] } │
│ </template>                                      │      │ export function useUserManagement(): StateStore; │
│ <script setup lang="ts">                         │      │                                                  │
│   // 60 บรรทัดของเนื้อในฟังก์ชัน                 │      │                                                  │
│ </script>                                        │      │                                                  │
└──────────────────────────────────────────────────┘      └──────────────────────────────────────────────────┘
                  🔻 ตัวอย่างการลด Context เชิงภาพประกอบ (ดู benchmark ภายนอก)
```

Apex-core 5 เป็น protocol แบบมีโครงสร้างสำหรับงานเขียนโค้ดด้วย AI:
1. **AST Codebase Cartography:** สร้างมุมมอง contract แบบกระชับเมื่อไม่จำเป็นต้องอ่าน implementation ทั้งหมด
2. **Targeted Verification:** แนะนำให้ใช้ typecheck และ test ที่เร็วและน่าเชื่อถือที่สุดของโปรเจกต์เป้าหมาย
3. **Failure Guardrails:** หยุดการ retry อัตโนมัติหลัง verification ล้มเหลวซ้ำ และรายงานหลักฐานเพื่อใช้ตัดสินใจรอบถัดไป

---

## ⚡ 2. วิธีเริ่มใช้งาน (Setup & Installation 3 รูปแบบ)

### รูปแบบที่ 1: เก็บ Source ไว้ใช้อ้างอิงร่วมกัน
เก็บ `Apex-core` ไว้ตำแหน่งเดียวเพื่อใช้อ้างอิง หรือเชื่อมต่อเป็น global instruction/skill ใน agent ที่รองรับ:
```bash
git clone https://github.com/AlmxndBL/Apex-core.git ~/.agents/Apex-core
cd ~/.agents/Apex-core && npm install
```
*ให้เชื่อมต่อไฟล์ตามวิธีของ AI agent ที่เลือกใช้ Apex-core ไม่สามารถบังคับพฤติกรรมใน agent ทุกชนิดโดยอัตโนมัติ และไม่แก้ไข repository เป้าหมายเอง*

### รูปแบบที่ 2: ติดตั้งแบบ Lightweight
ก๊อปปี้เฉพาะ [`AGENTS.md`](./AGENTS.md) ไปวางที่ root ของโปรเจกต์ วิธีนี้ได้ workflow หลัก แต่ยังไม่มี rules, skills และ templates ที่ลิงก์ไว้:
```bash
# สำหรับ Cursor IDE
cp AGENTS.md .cursorrules

# สำหรับ Claude Code CLI
cp AGENTS.md CLAUDE.md

# สำหรับ Windsurf / Trae / Google Antigravity
# วางเป็น AGENTS.md ที่ Root Directory
```

> **ไม่เพิ่ม runtime dependency ในโปรเจกต์เป้าหมาย:** Apex-core เป็นชุดเอกสารและตัวตรวจสอบ โปรเจกต์เป้าหมายยังใช้ dependency, lockfile และ package manager เดิมของตัวเอง โดย agent ควรรันคำสั่ง typecheck/test ที่ตรงกับโปรเจกต์นั้น

### รูปแบบที่ 3: ติดตั้ง Apex แบบเต็ม
คัดลอก `AGENTS.md` พร้อม `rules/`, `skills/` และ `templates/` ไปด้วยเมื่อ agent ต้องใช้คลังภายในครบชุด สำหรับ Codex ให้ติดตั้ง Nexus แยกเป็น MCP server หากต้องการ memory, project brief และ session checkpoint

---

### 🧭 ระบบตรวจจับ Stack อัตโนมัติ (Deterministic Stack Matrix)
`AGENTS.md` ใช้ `package.json`, lockfile และโครงสร้างเดิมเป็นข้อมูลช่วยเลือกแนวทางเริ่มต้น ไม่ได้แทนที่ convention ที่ดีของโปรเจกต์:

| สแตกที่ตรวจพบ | Logic Layer | Presenter Layer | API Endpoints | Fast In-RAM TypeCheck |
|---|---|---|---|---|
| 💚 **Nuxt 4 (Vue 3 + Nitro)** | `composables/use<Feature>.ts` | `<Feature>List.vue` | `server/api/v1/*.ts` | `vue-tsc --noEmit` ตาม package manager |
| ⚡ **Next.js 15 (React 19)** | `hooks/use<Feature>.ts` | `<Feature>List.tsx` | `app/api/v1/*/route.ts` | `tsc --noEmit` ตาม package manager |
| 🐍 **Polyglot / Backend** | `services/<feature>_service` | Native Views | Framework Handlers | `pytest -q` / `go test` |

---

## 📊 3. หลักฐานจาก Benchmark ภายนอกในอดีต
 
การศึกษาโดย **[Apex-eval](https://github.com/AlmxndBL/Apex-eval)** รายงานผลดังต่อไปนี้จากงานจำนวน **$N = 50$ งาน** ผลลัพธ์เป็นข้อมูลเฉพาะของการศึกษานั้น ไม่ใช่การรับประกัน และชุดทดสอบไม่ได้อยู่ใน repository นี้:
 
| ตัวชี้วัด | Arm A (โมเดลทั่วไป/เขียนทับเต็มไฟล์) | Arm B (มาตรฐาน Search/Replace Diff) | Arm C (Apex-core Engine) | นัยสำคัญทางสถิติ |
|---|---|---|---|---|
| **ความแม่นยำ Pass@1** | **100% (50/50)** | **100% (50/50)** | **100% (50/50)** | แก้โค้ดผ่าน Unit Test 100% |
| **การกู้คืน Pass@5** | **100%** | **100%** | **100%** | ปิดงานได้ในรอบแรกทั้งหมด |
| **จำนวนรอบเฉลี่ย** | **1.00 รอบ** | **1.00 รอบ** | **1.00 รอบ** | จบงานในรอบเดียวสมบูรณ์ |
| **ค่าเฉลี่ย Token ขาเข้า** | 2,294 tok | 2,338 tok | **955 tok** | **🔻 ประหยัดลง -58.4% ($p = 0$)** |
| **Schema ใหญ่ (>800 บรรทัด)** | 7,270 tok | 7,309 tok | **3,557 tok** | **🔻 ลด Token ลง -51.1%** |
| **เอกสาร Context (>2,000 บรรทัด)**| 2,453 tok | 2,530 tok | **272 tok** | **🔻 ลด Token ลง -88.9%** |
 
<div align="center">
 
👉 **[ 🔬 ดูโค้ดชุดทดสอบและไฟล์ Telemetry ละเอียดทั้งหมด (Apex-eval) → ](https://github.com/AlmxndBL/Apex-eval)**  
*(รวมชุดทดสอบ 50 ข้อจาก 10 โปรเจกต์, ตัวรันเนอร์อัตโนมัติ, ข้อมูล Telemetry ดิบ, และสมการพิสูจน์ Paired t-Test)*
 
</div>

---

## 🧩 4. ชุด 4 เสาหลักสกิลความรู้เชิงลึก (Consolidated Skills)

1. 🎨 **[`skills/frontend`](./skills/frontend/SKILL.md):** การแยก Feature Module เมื่อความซับซ้อนเหมาะสม, สถานะ async ที่จำเป็น และแนวทาง visual ที่ใช้งานได้จริง
2. 🗄️ **[`skills/backend-data`](./skills/backend-data/SKILL.md):** Standard 4-Step API Pipeline, Strict TypeScript (Zero Any), Prisma ORM & OCC Concurrency Protection, Better Auth & RBAC.
3. 🧪 **[`skills/quality-verify`](./skills/quality-verify/SKILL.md):** In-RAM Fast TypeCheck (1-3s), Vitest Runner, Cumulative 2-Strike Failure Circuit Breaker.
4. 🧭 **[`skills/cartography`](./skills/cartography/SKILL.md):** การสกัด contract ด้วย TypeScript Compiler API และลด context อย่างเลือกเฉพาะส่วน พร้อมระบุข้อจำกัดเรื่อง inferred types, imports และ schema edge cases

---

## 🖼️ 5. มาตรฐานงาน UI/UX ระดับ Enterprise

![Apex Enterprise UI Showcase](./templates/ui/assets/apex-enterprise-dashboard-showcase.png)

Apex มี UI starter และแนวทางสำหรับ **Vue 3 / Nuxt 4** และ **React 19 / Next.js 15** ให้เลือกใช้เฉพาะส่วนที่เหมาะกับผลิตภัณฑ์ ไม่ใช่ dependency หรือข้อบังคับด้าน visual สำหรับทุกโปรเจกต์ ดูชุด Starter ได้ที่ [`templates/ui/`](./templates/ui/)

---

## 🌌 6. ทำงานคู่ขนานอย่างไร้รอยต่อ (Apex & Nexus)

Apex ใช้งานแบบ standalone ได้โดยไม่เพิ่ม runtime dependency ในโปรเจกต์เป้าหมาย และสามารถเชื่อมต่อกับ **[Nexus](https://github.com/AlmxndBL/nexus)** เพื่อเก็บความทรงจำข้ามโปรเจกต์ได้ โดย workflow คือ โหลด state/brief ที่เกี่ยวข้อง → ทำงานตาม Apex → verify → บันทึก session กลับ Nexus:

* **Apex:** มาตรฐานวิศวกรรม, การควบคุม Execution, และการตรวจสอบความถูกต้อง (ทำอย่างไรให้โค้ดมีคุณภาพและปลอดภัย)
* **Nexus:** คลังความรู้ Dynamic Knowledge Vault, Session Memory, และ Decision Graph (เรารู้อะไร ตัดสินใจอะไร และได้บทเรียนอะไร)

---

## 💖 ขอบคุณและแรงบันดาลใจ (Acknowledgements)

* **🧙‍♂️ [Matt Pocock (Total TypeScript)](https://github.com/mattpocock/skills)** — ปรัชญา Strict TypeScript และ Contract Typing
* **🎯 [The 9arm Way](https://github.com/jirayu-ct-dev/9arm-skills)** — แนวคิด Pragmatic Engineering และการวิเคราะห์ Trade-off
* **🧠 [Andrej Karpathy](https://github.com/multica-ai/andrej-karpathy-skills)** — ปรัชญาการวางระบบป้องกันพฤติกรรมของ Agent และ Anti-Overengineering
