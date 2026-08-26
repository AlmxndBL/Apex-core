# ⚡ Apex-core 5 — The Deterministic AI Agent Operating Protocol

> **The Disciplined Senior Engineering Engine & Token Economy Control Plane for AI Coding Agents**  
> สถาปัตยกรรม Deterministic Control Plane สำหรับควบคุมคุณภาพการพัฒนาซอฟต์แวร์ของ AI Coding Agents รองรับ Nuxt 4, Next.js 15, Better Auth, Prisma และ Full-Stack Architecture ลดการใช้ Token สะสมลง **94.4%** เมื่อเทียบกับแนวทางปฏิบัติทั่วไปในอุตสาหกรรม

[![Version](https://img.shields.io/badge/version-5.2.1-blue.svg)](https://github.com/AlmxndBL/Apex-core)
[![Token Reduction vs Industry](https://img.shields.io/badge/Token_Savings_vs_Industry-🔻_94.4%25-green.svg)](BENCHMARK.md)
[![BPE Tokenizer](https://img.shields.io/badge/Tokenizer-cl100k__base-purple.svg)](BENCHMARK.md)
[![Verification Speed](https://img.shields.io/badge/AST_Diet_Latency-<1ms-orange.svg)](BENCHMARK.md)
[![Supported Tools](https://img.shields.io/badge/Agents-Cursor%20%7C%20Claude%20Code%20%7C%20Antigravity%20%7C%20Windsurf-818CF8.svg)](https://github.com/AlmxndBL/Apex-core)
[![Statistical Significance](https://img.shields.io/badge/t--test-p_<_0.0001-purple.svg)](benchmark/reports/EMPIRICAL_STUDY.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ⚡ เริ่มใช้งานใน 5 วินาที (Single Drop-in Setup)

ก๊อปปี้ไฟล์ [`AGENTS.md`](./AGENTS.md) ไปวางที่ Root Directory ของโปรเจกต์คุณ:

* **Cursor IDE:** วางเป็น `.cursorrules` หรือ `AGENTS.md`
* **Claude Code:** วางเป็น `CLAUDE.md` หรือ `AGENTS.md`
* **Windsurf / Trae:** วางเป็น `AGENTS.md`
* **Google Antigravity:** เชื่อมต่อเป็น Global Plugin ใน Config

> 💡 **Deterministic Auto-Detection:** `AGENTS.md` จะตรวจสอบ `package.json` ของโปรเจกต์โดยอัตโนมัติ เพื่อแมปไวยากรณ์และคำสั่ง TypeCheck ที่ถูกต้องทันที ไม่ว่าโปรเจกต์ของคุณจะเป็น **Nuxt 4 (Vue 3)**, **Next.js 15 (React 19)** หรือ **Python / Go Backend**

---

## 🔬 การประเมินผลเชิงประจักษ์และแหล่งข้อมูลอ้างอิง (Empirical Evaluation & References)

การประเมินประสิทธิภาพของ **Apex-core 5** ดำเนินการผ่านการวัดผลเชิงประจักษ์ (Empirical Telemetry) บนชุดโค้ดจริง 5 โดเมนของระบบ Full-Stack ใน [`benchmark/fixtures/`](./benchmark/fixtures/) โดยประมวลผลผ่าน Byte-Pair Encoding (`cl100k_base` BPE Tokenizer) และการจับเวลาประมวลผลระดับ Hardware Sub-millisecond เพื่อเปรียบเทียบกับรูปแบบการทำงานของ Agent ที่ได้รับการยอมรับในระดับสากล:

```text
======================================================================================================================
📊 รายงานผลการทดสอบเชิงประจักษ์บนชุดโค้ดจริง (Empirical Benchmark Telemetry)
======================================================================================================================
Pricing Baseline: $3.00 / 1M Input Tokens · $15.00 / 1M Output Tokens (Standard Frontier Tier)

[ 1. การลดขนาด Context Window (AST Context Compression Ratio - ACCR) ]
  • ขนาดโค้ดเต็มเฉลี่ย (Raw Codebase Mean):     799.6 ± 597.82 BPE tokens
  • ขนาด AST Skeleton (Apex-core 5):           107.0 ± 43.67 BPE tokens  ──> 🔻 ลดลง 80.7% (p < 0.0001)
  • ระยะเวลาการสกัดโครงสร้างบน RAM:             < 0.35ms (High-Speed In-RAM Parsing)

[ 2. ภาระของ Output Token ในการแก้ไขข้อผิดพลาด (Edit Output Burden) ]
  • [A] Aider Whole-File Format [2] (Rewrite):  821.8 BPE tokens (เกณฑ์ฐาน 0%)
  • [B] Aider Unified Diff Format [2] (Hunk):   116.6 BPE tokens (🔻 ลดลง 85.8%)
  • [C] Apex-core 5 Surgical Patch Mode:        176.0 BPE tokens (🔻 ลดลง 78.6% เทียบกับ Whole-File)

[ 3. แบบจำลองการสะสม Token ตลอดการทำงานแบบต่อเนื่อง (Multi-Turn Session Accumulation) ]
  • [A] Unconstrained Baseline [1, 2]:          17,659 tokens (เฉลี่ย 3.62 Turns ตามสถิติ SWE-bench)
  • [B] Anthropic Industry Baseline [2, 3]:      6,045 tokens (เฉลี่ย 2.38 Turns ตาม Anthropic Best Practice)
  • [C] Apex-core 5:                               338 tokens (เฉลี่ย 1.04 Turns ด้วย In-RAM Verifier) ──> 🔻 ประหยัดกว่า 94.4%
======================================================================================================================
⭐ สรุปผล: การใช้ AST Cartography ร่วมกับ Closed-Loop Verifier ช่วยลด Token สะสมลง 94.4% และยุติการวนลูปซ้ำ
======================================================================================================================
```

### ตารางเปรียบเทียบเชิงสถาปัตยกรรม (Comparative Architecture Matrix)

| มิติการทำงาน | [A] Generic Unconstrained Prompt [1] | [B] Industry Guideline (Aider / Anthropic) [2, 3] | [C] Apex-core 5 (Deterministic Control Plane) |
|---|---|---|---|
| **การอ่าน Context** | โหลดไฟล์เต็ม (799.6 tok) | โหลดไฟล์เต็มเพื่อวิเคราะห์ | **AST Codebase Cartography:** สกัดเฉพาะ Type/Interface (107.0 tok, ลดลง 80.7%) |
| **การควบคุมสิทธิ์คำสั่ง** | Open-loop ไม่มี Guard | ปฏิบัติตามคำสั่งตาม Prompt | **3-Tier Finite State Machine:** บังคับ Read-Only, Patch, และ Guarded Gate |
| **การส่งโค้ดกลับ** | เขียนใหม่ทั้งไฟล์ (821.8 tok) | Unified Diff Hunk (116.6 tok) | **Surgical Line Patch:** แทนที่เฉพาะบรรทัดที่เกิด Defect (176.0 tok ล็อกพิกัดบรรทัด) |
| **การตรวจสอบโค้ด** | รัน `npm run build` เต็ม (~30s) | รัน Linting หรือ Full Build (~22s) | **In-RAM V8 Verification:** `vue-tsc --noEmit` (<1s เร็วกว่า 10+ เท่า) |
| **การตัดวงจรเมื่อผิดพลาด** | วนลูปแก้เรื่อยๆ จน Token หมด | ผู้ใช้ต้องสั่งหยุดด้วยตนเอง | **2-Strike Circuit Breaker:** Freeze สถานะทันทีเมื่อแก้ไม่ผ่าน 2 ครั้งต่อเนื่อง |
| **ความสมบูรณ์ของ UI** | สร้างเฉพาะส่วน Happy Path | แนะนำให้มีสถานะ Error | **Mandatory 4-State UI Contract:** ครอบคลุม Skeleton, Empty, Error, และ Data Table |

### 📚 แหล่งข้อมูลอ้างอิง (References)

* **[1] SWE-bench (ICLR 2024):** Jimenez, C. E., et al. *"SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"*, International Conference on Learning Representations (ICLR 2024). [arXiv:2310.06770](https://arxiv.org/abs/2310.06770)
* **[2] Aider Benchmark Suite:** Gauthier, P. (2024). *"Aider: AI Pair Programming in Your Terminal - Benchmark Suite & Edit Formats"*, [Aider Official Documentation](https://aider.chat/docs/benchmarks.html)
* **[3] Anthropic Agent Architecture:** Anthropic Research (2024). *"Building Effective Agents: Architectural Patterns and Tool Design"*, [Anthropic AI Research](https://www.anthropic.com/research/building-effective-agents)
* **[4] TypeScript Compiler Architecture:** Microsoft Engineering Team (2024). *"TypeScript Compiler Architecture & Language Service API"*, [Microsoft Wiki](https://github.com/microsoft/TypeScript/wiki/Architectural-Overview)

> 📊 **รายงานผลการทดลองฉบับสมบูรณ์:** [`BENCHMARK.md`](./BENCHMARK.md) & [`benchmark/reports/EMPIRICAL_STUDY.md`](./benchmark/reports/EMPIRICAL_STUDY.md)  
> 🧪 **คำสั่งรันการทดสอบในเครื่อง:** `npm run benchmark`

---

## 🏛️ สถาปัตยกรรมระบบและ 4 เสาหลักสกิล (System Architecture & Consolidated Skills)

### 1. สถาปัตยกรรม 2 ระดับ (The Two-Layer Model)

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

### 2. ชุด 4 เสาหลักสกิล (Consolidated Skills in v5.0)

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
