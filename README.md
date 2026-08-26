# ⚡ Apex-core 5 — The Deterministic AI Agent Operating Protocol

> **The Disciplined Senior Engineering Engine & Token Economy Control Plane for AI Coding Agents**  
> ปลดล็อกความเร็วในการพัฒนา ควบคุมคุณภาพระดับ Production และประหยัด Token ได้มากกว่ามาตรฐานอุตสาหกรรม (Aider / Anthropic Industry Standards) ถึง **94.4%** ด้วยสถาปัตยกรรม Deterministic Control Plane

[![Version](https://img.shields.io/badge/version-5.2.1-blue.svg)](https://github.com/AlmxndBL/Apex-core)
[![Token Reduction vs Industry](https://img.shields.io/badge/Token_Savings_vs_Industry-🔻_94.4%25-green.svg)](BENCHMARK.md)
[![BPE Tokenizer](https://img.shields.io/badge/Tokenizer-cl100k__base-purple.svg)](BENCHMARK.md)
[![Verification Speed](https://img.shields.io/badge/AST_Diet_Latency-<1ms-orange.svg)](BENCHMARK.md)
[![Supported Tools](https://img.shields.io/badge/Agents-Cursor%20%7C%20Claude%20Code%20%7C%20Antigravity%20%7C%20Windsurf-818CF8.svg)](https://github.com/AlmxndBL/Apex-core)
[![Statistical Significance](https://img.shields.io/badge/t--test-p_<_0.0001-purple.svg)](benchmark/reports/EMPIRICAL_STUDY.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 🏆 ผลการทดสอบเปรียบเทียบเชิงประจักษ์กับมาตรฐานสากล (Empirical Benchmark)

Apex-core 5 ได้รับการประเมินเทียบกับ **2 มาตรฐานการวัดผล AI Agent ระดับสากล** บนชุดโค้ดจริง 5 โดเมน Full-Stack ([`benchmark/fixtures/`](./benchmark/fixtures/)) ด้วย Tokenizer มาตรฐาน `cl100k_base` BPE:

```text
======================================================================================================================
📊 EMPIRICAL BENCHMARK SHOWDOWN (Real Code Fixtures across 5 Full-Stack Domains)
======================================================================================================================
Baseline Pricing: $3.00 / 1M Input Tokens · $15.00 / 1M Output Tokens (Standard Frontier Tier)

[ 1. Context Ingestion Diet (AST Cartography) ]
  • โค้ดไฟล์เต็ม (Raw Codebase Mean):        799.6 ± 597.82 BPE tokens
  • AST Skeleton (Apex-core 5 Mean):        107.0 ± 43.67 BPE tokens  ──> 🔻 -80.7% Context Diet (p < 0.0001)
  • RAM Execution Latency:                   < 0.35ms (Sub-millisecond high-speed extraction)

[ 2. Real Defect Edit Output Burden (Aider Benchmark Standard) ]
  • [A] Aider Whole-File Format (Rewrite):   821.8 BPE tokens (Base 0%)
  • [B] Aider Unified Diff Format (Hunk):    116.6 BPE tokens (🔻 -85.8%)
  • [C] Apex-core 5 Surgical Patch Mode:     176.0 BPE tokens (🔻 -78.6% vs Whole File Rewrite)

[ 3. Cumulative Multi-Turn Session Projection ]
  • [A] Aider Whole-File Baseline:           17,659 tokens ($0.0954 USD)
  • [B] Anthropic Industry Baseline:          6,045 tokens ($0.0326 USD)
  • [C] Apex-core 5 (Our Engine):               338 tokens ($0.0018 USD) ──> 🔻 -94.4% Saved vs Anthropic!
======================================================================================================================
⭐ สรุป: Apex-core 5 ลดการกิน Token สะสมลง 94.4% และตัดวงจรการลองผิดลองถูกแบบ Multi-Turn ได้อย่างเด็ดขาด
======================================================================================================================
```

---

## 🏛️ แหล่งข้อมูลอ้างอิงมาตรฐานสากล (Academic & Industry Citations)

การวัดผลทั้งหมดอ้างอิงจากระเบียบวิธีวิจัยและสถิติที่ได้รับการยอมรับระดับโลก:

* **[1] SWE-bench (ICLR 2024):** Jimenez et al., *"SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"*, International Conference on Learning Representations (ICLR 2024). [arXiv:2310.06770](https://arxiv.org/abs/2310.06770)
* **[2] Aider Benchmark Suite:** Paul Gauthier (2024), *"Aider: AI Pair Programming in Your Terminal - Benchmark Suite & Edit Formats"*, [Official Documentation](https://aider.chat/docs/benchmarks.html)
* **[3] Anthropic Agent Architecture:** Anthropic AI Research (2024), *"Building Effective Agents: Architectural Patterns and Tool Design"*, [Anthropic Research](https://www.anthropic.com/research/building-effective-agents)
* **[4] TypeScript Compiler Architecture:** Microsoft Engineering Team (2024), *"TypeScript Compiler Architecture & Language Service API"*, [Microsoft Wiki](https://github.com/microsoft/TypeScript/wiki/Architectural-Overview)

> 📊 **อ่านรายงานการทดลองและตารางสถิติฉบับเต็มได้ที่:** [`BENCHMARK.md`](./BENCHMARK.md) & [`benchmark/reports/EMPIRICAL_STUDY.md`](./benchmark/reports/EMPIRICAL_STUDY.md)  
> 🧪 **รันการทดสอบด้วยตัวเองบนเครื่องคุณ:** `npm run benchmark`

---

## ⚔️ ตารางเปรียบเทียบ 3 แนวทาง (Architecture & Engineering Moats)

```
[ A: Generic Prompt ]        Prompt ภาษาพูดยาวเหยียด ──> AI สับสน ──> ติดลูปแก้บั๊ก ──> Token บวม O(N²)

[ B: Industry Standard ]     Prompt มี Guideline (Cursor/Anthropic) ──> โหลดไฟล์เต็ม ──> ลดรอบแก้ลงได้บ้าง แต่ยังช้า

[ C: Apex-core 5 ]           3-Tier Intent Lock ──> AST Token Diet ──> In-RAM Fast Verify ──> จบใน 1 Turn
```

| มิติการทำงาน | [A] Generic Unconstrained Prompt | [B] Industry Standard (Aider / Anthropic Guidelines) | [C] Apex-core 5 (Deterministic Control Plane) |
|---|---|---|---|
| **การอ่าน Context** | โหลดไฟล์ดิบ 1,000+ บรรทัด | โหลดไฟล์ดิบทั้งไฟล์เพื่อวิเคราะห์ | **AST Codebase Cartography:** สกัดเฉพาะ Interface & Signatures (ลด Context 80.7%) |
| **การควบคุมคำสั่ง** | Open-loop ไม่มี Guard | ทำตาม Prompt ไม่มี Hard Gate | **3-Tier Finite State Machine:** ล็อก Read-Only, Patch, และ Guarded Gate |
| **การส่งโค้ดกลับ** | เขียนใหม่ทั้งไฟล์ (821.8 tok) | Unified Diff Hunk (116.6 tok) | **Surgical Line Patch:** แทนที่เฉพาะบรรทัดที่พัง (176.0 tok ล็อก Line Coordinates เป๊ะ) |
| **การตรวจสอบโค้ด** | รัน `npm run build` เต็ม (~30s) | รัน Linting หรือ Full Build (~22s) | **In-RAM V8 Verification:** `vue-tsc --noEmit` (<1s เร็วกว่า 10+ เท่า) |
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
