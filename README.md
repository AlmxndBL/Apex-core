# ⚡ Apex 5.0 — The Deterministic AI Agent Operating Protocol

> **The Disciplined Senior Engineering Engine & Token Economy Control Plane for AI Coding Agents**  
> ปลดล็อกความเร็วในการพัฒนา ควบคุมคุณภาพระดับ Production และประหยัด Token ได้มากกว่ามาตรฐานอุตสาหกรรม (Cursor/Claude Top Rules) ถึง **83.3%** ด้วยสถาปัตยกรรม Deterministic Control Plane

[![Version](https://img.shields.io/badge/version-5.2.1-blue.svg)](https://github.com/AlmxndBL/Apex-core)
[![Token Reduction vs Industry](https://img.shields.io/badge/Token_Savings_vs_Industry-🔻_83.3%25-green.svg)](BENCHMARK.md)
[![Verification Speed](https://img.shields.io/badge/Feedback_Speed-⚡_11.8x_Faster-orange.svg)](BENCHMARK.md)
[![Supported Tools](https://img.shields.io/badge/Agents-Cursor%20%7C%20Claude%20Code%20%7C%20Antigravity%20%7C%20Windsurf-818CF8.svg)](https://github.com/AlmxndBL/Apex-core)
[![Statistical Significance](https://img.shields.io/badge/t--test-p_<_0.0001-purple.svg)](benchmark/reports/STATISTICAL_REPORT.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 🏆 ผลการทดสอบเปรียบเทียบ 3 ฝ่าย (3-Way Empirical Benchmark)

Apex ผ่านการทดสอบเปรียบเทียบเชิงสถิติ ($N=50$ Trials ใน 5 โดเมน Full-Stack) ประชันระหว่าง **[A] Generic Prompts**, **[B] Industry Accepted Standard (Cursor Directory / Official Claude Guidelines)**, และ **[C] Apex Operating Protocol v5.0**:

```text
======================================================================================================================
📊 3-WAY EMPIRICAL BENCHMARK SHOWDOWN (N=50 Trials across 5 Full-Stack Domains)
======================================================================================================================
Baseline Pricing: $3.00 / 1M Input Tokens · $15.00 / 1M Output Tokens (Standard Frontier Tier)

[ 1. Cumulative Session Token Accumulation ]
  • [A] Generic Unconstrained Prompt:    23,163.68 ± 5,581.39 tokens ($0.1251 USD)
  • [B] Industry Accepted Skill (Cursor): 9,001.32 ± 2,498.68 tokens ($0.0486 USD)
  • [C] Apex Protocol v5.0 (Our Engine):  1,503.76 ± 439.24 tokens   ($0.0081 USD) ──> 🔻 -83.3% Saved vs Industry!

[ 2. Turns to Resolution (Agent Roundtrips) ]
  • [A] Generic Unconstrained Prompt:    3.62 turns (avg)
  • [B] Industry Accepted Skill (Cursor): 2.38 turns (avg)
  • [C] Apex Protocol v5.0 (Our Engine):  1.04 turns (avg) ──────────────────────────> ⚡ 2.3x Fewer Turns vs Industry

[ 3. Verification Feedback Loop Latency ]
  • [A] Generic Unconstrained Prompt:    30.28s (Full Disk Build)
  • [B] Industry Accepted Skill (Cursor): 21.75s (Partial Build / Lint)
  • [C] Apex Protocol v5.0 (Our Engine):   1.85s (In-RAM `vue-tsc` / `vitest`) ──────> ⚡ 11.8x Faster vs Industry

[ 4. Inferential Statistical Significance (Apex vs Industry Standard) ]
  • Paired Student's t-test:             t = 22.124, p < 0.0001 (Extremely Significant rejecting H₀)
======================================================================================================================
⭐ สรุป: Apex ประหยัด Token มากกว่ามาตรฐานอุตสาหกรรม 83.3% และฟีดแบ็กเร็วกว่า 11.8 เท่า
======================================================================================================================
```
> 📊 **อ่านรายงานการทดลองและตารางสถิติฉบับเต็มได้ที่:** [`BENCHMARK.md`](./BENCHMARK.md) & [`benchmark/reports/STATISTICAL_REPORT.md`](./benchmark/reports/STATISTICAL_REPORT.md)  
> 🧪 **รันการทดสอบด้วยตัวเอง:** `npm run benchmark`

---

## ⚔️ ตารางเปรียบเทียบ 3 แนวทาง (Architecture & Engineering Moats)

```
[ A: Generic Prompt ]        Prompt ภาษาพูดยาวเหยียด ──> AI สับสน ──> ติดลูปแก้บั๊ก ──> Token บวม O(N²)

[ B: Industry Standard ]     Prompt มี Guideline (Cursor) ──> โหลดไฟล์เต็ม ──> ลดรอบแก้ลงได้บ้าง แต่ยังช้า

[ C: Apex Protocol v5.0 ]    3-Tier Intent Lock ──> AST Token Diet ──> In-RAM Fast Verify ──> จบใน 1 Turn
```

| มิติการทำงาน | [A] Generic Unconstrained Prompt | [B] Industry Standard (Cursor / Claude Rules) | [C] Apex Protocol (v5.0 Control Plane) |
|---|---|---|---|
| **การอ่าน Context** | โหลดไฟล์ดิบ 1,000+ บรรทัด | Prompt แนะนำ Clean Code แต่ยังโหลดไฟล์จริง | **AST Codebase Cartography:** สกัดเฉพาะ Interface & Signatures (ลด Context 74%) |
| **การควบคุมคำสั่ง** | Open-loop ไม่มี Guard | ทำตาม Prompt ไม่มี Hard Gate | **3-Tier Finite State Machine:** ล็อก Read-Only, Patch, และ Guarded Gate |
| **การตรวจสอบโค้ด** | รัน `npm run build` เต็ม (~30s) | รัน Linting หรือ Full Build (~22s) | **In-RAM V8 Verification:** `vue-tsc --noEmit` (1.85s เร็วกว่า 11.8 เท่า) |
| **การตัดวงจรเมื่อพัง** | วนลูปแก้เรื่อยๆ จน Token หมด | ไม่มี (ต้องให้คนกด Stop เอง) | **2-Strike Circuit Breaker:** Freeze State ทันทีเมื่อแก้ไม่ผ่าน 2 ครั้งติด |
| **ความสมบูรณ์ของ UI** | เจนเฉพาะ Happy Path | แนะนำให้เขียน Error State | **Mandatory 4-State UI Contract:** Skeleton, Empty CTA, Error Retry, Data Table |

---

## ⚡ เริ่มใช้งานใน 5 วินาที (Single Drop-in Setup)

ก๊อปปี้ไฟล์ [`AGENTS.md`](./AGENTS.md) ไปวางที่ Root Directory ของโปรเจกต์คุณ:

* **Cursor IDE:** วางเป็น `.cursorrules` หรือ `AGENTS.md`
* **Claude Code:** วางเป็น `CLAUDE.md` หรือ `AGENTS.md`
* **Windsurf / Trae:** วางเป็น `AGENTS.md`
* **Google Antigravity:** เชื่อมต่อเป็น Global Plugin ใน Config

> 💡 **Deterministic Auto-Detection:** `AGENTS.md` จะอ่าน `package.json` ของคุณโดยอัตโนมัติ เพื่อแมปไวยากรณ์ที่ถูกต้องทันที ไม่ว่าโปรเจกต์ของคุณจะเป็น **Nuxt 4 (Vue 3)** หรือ **Next.js 15 (React 19)** หรือ **Python / Go Backend**

---

## 🏛️ สถาปัตยกรรม 2 ระดับ (The Two-Layer Model)

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🟢 Layer 1: Core Directives (`AGENTS.md` — ~150 บรรทัด)                     │
│    • Single Drop-in: ไฟล์เดียวได้ทั้ง 5 กฎเหล็ก + Stack Matrix + Safety Gates│
│    • เหมาะสำหรับ: โปรเจกต์ทั่วไปที่ต้องการ Setup ไวใน 5 วินาที และประหยัด Context│
│    • รองรับ: Cursor, Claude Code, Windsurf, Antigravity ทุกค่าย             │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🟣 Layer 2: Deep Knowledge Engine (`rules/` + `skills/` + `templates/`)      │
│    • Full Repository: 6 เสาหลักความปลอดภัย, ฐานข้อมูล Prisma OCC, และ UI Tokens │
│    • เหมาะสำหรับ: โปรเจกต์ Enterprise, Monorepo ขนาดใหญ่, และ Multi-Agent    │
│    • รองรับ: ระบบ Agent ที่มี File Search & On-Demand Retrieval              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧰 ชุด 4 เสาหลักสกิล (Consolidated Skills in v5.0)

1. 🎨 **[`skills/frontend`](./skills/frontend/SKILL.md):** 3-File Feature Module Architecture (`use<Feature>`, `<Feature>List`, `<feature>.contract`), Mandatory 4-State UI (Skeleton, Empty, Error, Data), Modern 3-Tier Surface Elevation.
2. 🗄️ **[`skills/backend-data`](./skills/backend-data/SKILL.md):** Standard 4-Step API Pipeline, Strict TypeScript (Zero Any), Prisma ORM & OCC Concurrency Protection, Better Auth & RBAC.
3. 🧪 **[`skills/quality-verify`](./skills/quality-verify/SKILL.md):** In-RAM Fast TypeCheck (1-3s), Vitest Runner, Cumulative 2-Strike Failure Circuit Breaker.
4. 🧭 **[`skills/cartography`](./skills/cartography/SKILL.md):** AST Codebase Skeleton Mapping, Selective Token Diet (ลด Context Overhead 70-90%).

---

## 🖼️ มาตรฐานงาน UI/UX ระดับ Enterprise (Live Showcase)

![Apex Enterprise UI Showcase](./templates/ui/assets/apex-enterprise-dashboard-showcase.png)

Apex บังคับใช้ **Ultra-Compact Modern SaaS Density**, 3-Tier Surface Elevation, Magic UI Theme Toggler, Interactive Sort/Filter Data Tables, และ Crisp SVG Lucide Icons (Strict Zero Emojis) ทั้งใน **Vue 3 / Nuxt 4** และ **React 19 / Next.js 15** โดยมีชุด Starter Component Templates พร้อมใช้งานใน [`templates/ui/`](./templates/ui/)

---

## 🌌 Twin-Engine Synergy: Apex & Nexus

Apex ถูกออกแบบให้ทำงานแบบ **100% Standalone (Zero-Dependency)** แต่สามารถเชื่อมต่อกับ **[Nexus](https://github.com/AlmxndBL/nexus)** เพื่อปลดล็อกระบบบันทึกความจำระยะยาวข้ามโปรเจกต์ (Long-Term Memory Vault):

* **Apex:** กฎเกณฑ์และวินัยการเขียนโค้ด (HOW to build, verify, and enforce safety)
* **Nexus:** คลังความจำและบทเรียนข้ามโปรเจกต์ (WHAT we know, decided, and learned)

---

## 💖 Acknowledgements & Inspirations

* **🧙‍♂️ [Matt Pocock (Total TypeScript)](https://github.com/mattpocock/skills)** — Strict TypeScript principles & contract typing
* **🎯 [The 9arm Way](https://github.com/jirayu-ct-dev/9arm-skills)** — Pragmatic software engineering and trade-off evaluation
* **🧠 [Andrej Karpathy](https://github.com/multica-ai/andrej-karpathy-skills)** — Agent behavioral safeguards and anti-overengineering philosophy
