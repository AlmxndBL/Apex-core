# ⚡ Apex-core 5 — The Deterministic AI Agent Operating Protocol

> **The Disciplined Senior Engineering Engine & Token Economy Control Plane for AI Coding Agents**  
> สถาปัตยกรรมระบบควบคุมเชิงวิศวกรรม (Deterministic Control Plane) สำหรับกำกับคุณภาพการพัฒนาซอฟต์แวร์ของ AI Coding Agents รองรับ Nuxt 4 (Vue 3), Next.js 15 (React 19), Better Auth, Prisma ORM, และ Full-Stack Architecture — ผ่านการพิสูจน์เชิงประจักษ์ว่าช่วยลดภาระ Token ขาเข้าได้เฉลี่ย **58.4% (และลดได้สูงสุดถึง 88.9% บนระบบขนาดใหญ่)** (*p* = 4.87 × 10⁻¹¹) จากการทดสอบบนชุดงานจริง 50 งาน

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
                 🔻 ลดขนาด Context ลง 96.4% (<0.14ms V8 In-RAM Extraction)
```

Apex-core 5 เปลี่ยนการสั่งงานแบบคำขอร้อง (`.cursorrules`) ให้กลายเป็น **Deterministic Control Plane**:
1. **AST Codebase Cartography:** กรองเนื้อในฟังก์ชันทิ้ง ส่งเฉพาะ Type Interface เข้าโมเดล (**-77.6% Context Diet**, p = 0.0031)
2. **In-RAM Closed-Loop Verifier:** รัน `vue-tsc` / `tsc` ใน RAM ทันที (< 1s) ตั้งเป้าจบงานในรอบเดียว ($N \to 1.04$ รอบ — เป้าหมายเชิงดีไซน์)
3. **2-Strike Circuit Breaker:** ตัดวงจร Freeze ทันทีเมื่อแก้ไม่ผ่าน 2 ครั้งติด หยุดการเผาผลาญ Token โดยเปล่าประโยชน์

---

## ⚡ 2. วิธีเริ่มใช้งาน (Setup & Installation 3 รูปแบบ)

### รูปแบบที่ 1: Global Agent Plugin (แนะนำสำหรับ Dev ที่ทำหลายโปรเจกต์)
Clone `Apex-core` ลงเครื่องครั้งเดียว แล้วเชื่อมต่อเป็น Global Skill / Workspace ใน AI Coding Agent (Antigravity, Cursor, Claude Desktop, Windsurf):
```bash
git clone https://github.com/AlmxndBL/Apex-core.git ~/.agents/Apex-core
cd ~/.agents/Apex-core && npm install
```
*AI Agent จะอ่านและบังคับใช้กฎ `AGENTS.md`, กฎ 6 เสาหลัก, และ Skills โดยอัตโนมัติในทุกโปรเจกต์โดยไม่ต้องแก้ไขหรือเพิ่มไฟล์ใน Repository ของงาน*

### รูปแบบที่ 2: ติดตั้งเฉพาะโปรเจกต์ (Single Project / Team Drop-in)
ก๊อปปี้ไฟล์ [`AGENTS.md`](./AGENTS.md) ไปวางที่ Root Directory ของโปรเจกต์:
```bash
# สำหรับ Cursor IDE
cp AGENTS.md .cursorrules

# สำหรับ Claude Code CLI
cp AGENTS.md CLAUDE.md

# สำหรับ Windsurf / Trae / Google Antigravity
# วางเป็น AGENTS.md ที่ Root Directory
```

> **Zero Runtime Overhead:** โปรเจกต์ของ User **ไม่ต้องติดตั้ง Apex Dependency ใดๆ** โปรเจกต์จะใช้ `package.json` และ lockfile เดิมของตัวเอง โดย AI จะรัน In-RAM TypeCheck ผ่าน `pnpm vue-tsc --noEmit` หรือ `pnpm tsc --noEmit` ของโปรเจกต์นั้นโดยตรง

---

### 🧭 ระบบตรวจจับ Stack อัตโนมัติ (Deterministic Stack Matrix)
`AGENTS.md` จะอ่าน `package.json` ของโปรเจกต์เพื่อแมปสถาปัตยกรรมและคำสั่งตรวจสอบ Type ที่ถูกต้องโดยอัตโนมัติ:

| สแตกที่ตรวจพบ | Logic Layer | Presenter Layer | API Endpoints | Fast In-RAM TypeCheck |
|---|---|---|---|---|
| 💚 **Nuxt 4 (Vue 3 + Nitro)** | `composables/use<Feature>.ts` | `<Feature>List.vue` | `server/api/v1/*.ts` | `pnpm vue-tsc --noEmit` |
| ⚡ **Next.js 15 (React 19)** | `hooks/use<Feature>.ts` | `<Feature>List.tsx` | `app/api/v1/*/route.ts` | `pnpm tsc --noEmit` |
| 🐍 **Polyglot / Backend** | `services/<feature>_service` | Native Views | Framework Handlers | `pytest -q` / `go test` |

---

## 📊 3. การประเมินและหลักฐานเชิงประจักษ์ (Empirical Evidence)
 
Apex-core ผ่านการพิสูจน์และตรวจสอบอย่างเป็นอิสระผ่านชุดทดสอบมาตรฐานวิจัย **[Apex-eval](https://github.com/AlmxndBL/Apex-eval)** บน **$N = 50$ งานพัฒนาจริง** จาก 10 โค้ดเบสบน GitHub (รวม 150 Trajectories รันสดบน Frontier API):
 
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

1. 🎨 **[`skills/frontend`](./skills/frontend/SKILL.md):** 3-File Feature Module Architecture (`use<Feature>`, `<Feature>List`, `<feature>.contract`), Mandatory 4-State UI (Skeleton, Empty, Error, Data), Modern 3-Tier Surface Elevation.
2. 🗄️ **[`skills/backend-data`](./skills/backend-data/SKILL.md):** Standard 4-Step API Pipeline, Strict TypeScript (Zero Any), Prisma ORM & OCC Concurrency Protection, Better Auth & RBAC.
3. 🧪 **[`skills/quality-verify`](./skills/quality-verify/SKILL.md):** In-RAM Fast TypeCheck (1-3s), Vitest Runner, Cumulative 2-Strike Failure Circuit Breaker.
4. 🧭 **[`skills/cartography`](./skills/cartography/SKILL.md):** High-Precision TypeScript Compiler AST Extraction (`ts.createSourceFile`), Selective Token Diet (ลด Context Overhead 58-90% แม่นยำ 100% ไม่หลอน Syntax).

---

## 🖼️ 5. มาตรฐานงาน UI/UX ระดับ Enterprise

![Apex Enterprise UI Showcase](./templates/ui/assets/apex-enterprise-dashboard-showcase.png)

Apex บังคับใช้ **Ultra-Compact Modern SaaS Density**, 3-Tier Surface Elevation, Magic UI Theme Toggler, Interactive Sort/Filter Data Tables, และ Crisp SVG Lucide Icons (Strict Zero Emojis) ครอบคลุมทั้ง **Vue 3 / Nuxt 4** และ **React 19 / Next.js 15** สามารถดูชุด Starter ได้ที่ [`templates/ui/`](./templates/ui/)

---

## 🌌 6. ทำงานคู่ขนานอย่างไร้รอยต่อ (Apex & Nexus)

Apex ทำงานได้ **100% แบบ Standalone (ไม่ต้องติดตั้งอะไรเพิ่ม)** และสามารถเชื่อมต่อคู่ขนานกับ **[Nexus](https://github.com/AlmxndBL/nexus)** เพื่อดึงความทรงจำข้ามโปรเจกต์:

* **Apex:** มาตรฐานวิศวกรรม, การควบคุม Execution, และการตรวจสอบความถูกต้อง (ทำอย่างไรให้โค้ดมีคุณภาพและปลอดภัย)
* **Nexus:** คลังความรู้ Dynamic Knowledge Vault, Session Memory, และ Decision Graph (เรารู้อะไร ตัดสินใจอะไร และได้บทเรียนอะไร)

---

## 💖 ขอบคุณและแรงบันดาลใจ (Acknowledgements)

* **🧙‍♂️ [Matt Pocock (Total TypeScript)](https://github.com/mattpocock/skills)** — ปรัชญา Strict TypeScript และ Contract Typing
* **🎯 [The 9arm Way](https://github.com/jirayu-ct-dev/9arm-skills)** — แนวคิด Pragmatic Engineering และการวิเคราะห์ Trade-off
* **🧠 [Andrej Karpathy](https://github.com/multica-ai/andrej-karpathy-skills)** — ปรัชญาการวางระบบป้องกันพฤติกรรมของ Agent และ Anti-Overengineering
