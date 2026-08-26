# ⚡ Apex-core 5 — The Deterministic AI Agent Operating Protocol

> **The Disciplined Senior Engineering Engine & Token Economy Control Plane for AI Coding Agents**  
> สถาปัตยกรรม Deterministic Control Plane สำหรับควบคุมคุณภาพการพัฒนาซอฟต์แวร์ของ AI Coding Agents รองรับ Nuxt 4 (Vue 3), Next.js 15 (React 19), Better Auth, Prisma ORM, และ Full-Stack Architecture ลดการใช้ Token สะสมลง **94.4%** เมื่อเทียบกับมาตรฐานอุตสาหกรรม

<div align="center">

**[ 🇬🇧 English ](README.md) · [ 🇹🇭 ภาษาไทย ](README.th.md)**

</div>

[![Version](https://img.shields.io/badge/version-5.2.1-blue.svg)](https://github.com/AlmxndBL/Apex-core)
[![Token Reduction vs Industry](https://img.shields.io/badge/Token_Savings_vs_Industry-🔻_94.4%25-green.svg)](BENCHMARK.md)
[![BPE Tokenizer](https://img.shields.io/badge/Tokenizer-cl100k__base-purple.svg)](BENCHMARK.md)
[![Verification Speed](https://img.shields.io/badge/AST_Diet_Latency-<1ms-orange.svg)](BENCHMARK.md)
[![Supported Tools](https://img.shields.io/badge/Agents-Cursor%20%7C%20Claude%20Code%20%7C%20Antigravity%20%7C%20Windsurf-818CF8.svg)](https://github.com/AlmxndBL/Apex-core)
[![Statistical Significance](https://img.shields.io/badge/t--test-p_<_0.0001-purple.svg)](benchmark/reports/EMPIRICAL_STUDY.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 1. 🎯 สรุปความสามารถและจุดเด่น (Overview & Core Highlights)

Apex-core 5 ไม่ใช่แค่ชุด System Prompt ทั่วไป แต่เป็น **สถาปัตยกรรมระบบควบคุม (Deterministic Control Plane)** ที่ถูกออกแบบมาเพื่อแก้ไขจุดบกพร่องหลัก 3 ประการของ AI Coding Agents ในปัจจุบัน ได้แก่: **อาการหลอนโค้ด (Hallucinations)**, **การวนลูปแก้โค้ดซ้ำซาก (Runaway Multi-Turn Loops)**, และ **การเผาผลาญ Token โดยไม่จำเป็น (Context Inefficiency)**

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 🛡️ 3 เสาหลักทางวิศวกรรมของ Apex-core 5 (Core Engineering Moats)                                        │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Deterministic Control Plane (Finite State Machine):                                                 │
│    ควบคุมพฤติกรรม AI ด้วย 3-Tier Intent Lock แบ่งแยกคำสั่ง อ่าน, แก้ไข, และ คำสั่งทำลายล้างอย่างเด็ดขาด   │
│    ป้องกันไม่ให้ AI แก้ไขโค้ดโดยไม่ได้รับอนุญาต และตัดวงจรการวนลูปซ้ำเมื่อแก้ไม่ผ่าน                   │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. AST Codebase Cartography (Token Diet Engine):                                                       │
│    สกัดเฉพาะ Interface, DTOs, Zod Schemas, และ Type Contracts ก่อนส่งเข้า LLM ตัดส่วน Implementation    │
│    และ Template ทิ้ง ทำให้ลดขนาด Context Window ลงทันที 80.7% (วัดด้วย cl100k_base BPE Tokenizer)      │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. In-RAM Closed-Loop Verifier (<1.0ms):                                                               │
│    ตรวจสอบความถูกต้องของไวยากรณ์และ Type Graph ทันทีในหน่วยความจำ (RAM) ผ่าน Compiler API              │
│    รับประกันว่าโค้ดที่ส่งมอบต้องมีผลการตรวจสอบเป็นศูนย์ Error เสมอ (No Evidence = Not Done)            │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. ⚡ วิธีเริ่มใช้งานใน 5 วินาที (Single Drop-in Setup)

ก๊อปปี้ไฟล์ [`AGENTS.md`](./AGENTS.md) ไปวางที่ Root Directory ของโปรเจกต์คุณเพื่อเปิดใช้งาน Protocol ทันที:

```bash
# สำหรับ Cursor IDE
cp AGENTS.md .cursorrules

# สำหรับ Claude Code CLI
cp AGENTS.md CLAUDE.md

# สำหรับ Windsurf / Trae / Google Antigravity
# วางเป็น AGENTS.md ที่ Root หรือเชื่อมต่อเป็น Workspace Rule
```

### 🧭 ระบบตรวจจับ Stack อัตโนมัติ (Deterministic Stack Matrix)
`AGENTS.md` จะอ่าน `package.json` ของโปรเจกต์เพื่อแมปสถาปัตยกรรมและคำสั่งตรวจสอบ Type ที่ถูกต้องโดยอัตโนมัติ:

| สแตกที่ตรวจพบ | Logic Layer | Presenter Layer | API Endpoints | Fast In-RAM TypeCheck |
|---|---|---|---|---|
| 💚 **Nuxt 4 (Vue 3 + Nitro)** | `composables/use<Feature>.ts` | `<Feature>List.vue` | `server/api/v1/*.ts` | `pnpm vue-tsc --noEmit` |
| ⚡ **Next.js 15 (React 19)** | `hooks/use<Feature>.ts` | `<Feature>List.tsx` | `app/api/v1/*/route.ts` | `pnpm tsc --noEmit` |
| 🐍 **Polyglot / Backend** | `services/<feature>_service` | Native Views | Framework Handlers | `pytest -q` / `go test` |

---

## 3. 🏛️ เจาะลึกสถาปัตยกรรมระบบ (Deep Architecture & Skills)

สถาปัตยกรรมของ Apex-core 5 ถูกจัดโครงสร้างแบบ **2 ระดับ (The Two-Layer Model)** ที่ผสานการทำงานระหว่างกฎเหล็กระดับ Core Directives และคลังความรู้เชิงลึก:

```text
                                  ┌────────────────────────────────────────────────────────┐
                                  │                  USER / TASK INPUT                     │
                                  └──────────────────────────┬─────────────────────────────┘
                                                             │
                                   ┌─────────────────────────▼─────────────────────────┐
                                   │       1. AST Cartographer (Token Diet Engine)     │
                                   │  Prunes Function Bodies, JSX/Templates & Comments │
                                   │     Extracts DTOs, Zod Schemas & Prisma AST       │
                                   └─────────────────────────┬─────────────────────────┘
                                                             │ Context Ingestion Reduced by 80.7%
                                   ┌─────────────────────────▼─────────────────────────┐
                                   │      2. 3-Tier Finite State Machine (FSM)         │
                                   │  Tier 1: Read-Only  |  Tier 2: Single-Turn Patch  │
                                   │        Tier 3: Guarded Blast-Radius Gate          │
                                   └─────────────────────────┬─────────────────────────┘
                                                             │
                                            ┌────────────────┴────────────────┐
                                            ▼                                 ▼
                                  [ Patch Mode ]                    [ Synthesis Mode ]
                             Surgical AST Line Diff              3-File Architecture Standard
                             (Rule 4 Exact Slice)                (Container + Presenter + Logic)
                                            │                                 │
                                            └────────────────┬────────────────┘
                                                             │
                                   ┌─────────────────────────▼─────────────────────────┐
                                   │     3. In-RAM Closed-Loop Verifier (<1.0ms)       │
                                   │     `vue-tsc --noEmit` / `tsc --noEmit` in RAM    │
                                   └─────────────────────────┬─────────────────────────┘
                                                             │
                                            ┌────────────────┴────────────────┐
                                            ▼ [PASS: 0 Errors]                ▼ [FAIL: 1st Strike]
                                  ┌───────────────────┐             ┌───────────────────┐
                                  │ Emit Evidence Log │             │ Targeted Retry    │
                                  │ Task Complete     │             └─────────┬─────────┘
                                  └───────────────────┘                       │ [FAIL: 2nd Strike]
                                                                    ┌─────────▼─────────┐
                                                                    │ 2-Strike Freeze   │
                                                                    │ Halt Token Burn   │
                                                                    └───────────────────┘
```

---

### 3.1 ระบบ Finite State Machine 3 ระดับ (3-Tier Intent Lock)
ควบคุมระดับการทำงานของ Agent ตามเจตนาของผู้ใช้ เพื่อป้องกันการแก้โค้ดเกินขอบเขต:
1. **Tier 1 (Read-Only Investigation):** ถูกเรียกใช้เมื่อมีคำสั่ง "explain", "investigate", "audit", "ทำไม" $\to$ **ล็อกสถานะเป็นอ่านอย่างเดียว 100% ห้ามแก้ไขโค้ดเด็ดขาด**
2. **Tier 2 (Actionable Single-Turn Flow):** ถูกเรียกใช้เมื่อมีคำสั่ง "fix", "แก้", "สร้าง", "refactor" $\to$ **ดำเนินการ วินิจฉัย $\to$ แก้ไข $\to$ ตรวจสอบ TypeCheck ให้เสร็จสิ้นใน 1 Turn เดียว**
3. **Tier 3 (Guarded Blast-Radius Gate):** ถูกเรียกใช้เมื่อมีคำสั่งกระทบโครงสร้างฐานข้อมูล (Drop Column/Table), ลบ Migration, หรือเปลี่ยนระบบ Auth $\to$ **ต้องสรุปผลกระทบและหยุดรอการอนุมัติจากผู้ใช้ก่อนแตะต้องโค้ดเสมอ**

---

### 3.2 สถาปัตยกรรม Frontend มาตรฐาน 3 ไฟล์ และ สัญญา UI 4 สถานะ
Apex-core 5 บังคับใช้ **3-File Architecture** เพื่อแยก Logic, Presenter, และ Contract ออกจากกันอย่างเด็ดขาด:

```text
features/<domain>/
├── composables/ (or hooks/)
│   └── use<Feature>.ts          # Pure Logic: การ Fetch ข้อมูล, Mutation, Cache, Zod Validation
├── components/
│   ├── <Feature>List.vue (.tsx) # Pure Presentation (Dumb UI): รับ Props แสดงผล และส่ง Emits
│   ├── <Feature>Form.vue (.tsx) # Form UI และ Client-Side Validation
│   └── <Feature>Skeleton.vue    # Loading Skeleton จำลองมิติเรขาคณิตของ Layout
├── types/
│   └── <feature>.contract.ts    # Zod Schemas, TypeScript Interfaces, และ DTO Definitions
└── index.vue (or Page.tsx)       # Smart Container: รวม Composable เข้ากับ Presenters
```

* **Mandatory 4-State UI Contract:** ทุกหน้าจอที่แสดงข้อมูลต้องรองรับ 4 สถานะอย่างสมบูรณ์:
  1. **Loading State:** Skeleton Loader ตามขนาดจริง (ห้ามใช้ Spinner หมุนกลางจอแบบไร้มิติ)
  2. **Empty State:** กล่องขอบประ (Dashed Container) + Icon + คำอธิบาย + ปุ่ม Action CTA
  3. **Error State:** การ์ดสีคอนทราสต์ชัดเจน + ข้อความแจ้งเตือน + ปุ่ม **Retry** สำหรับโหลดซ้ำ
  4. **Data State:** ตาราง Enterprise Table หรือ Card List ที่รองรับ Mobile และ Desktop

---

### 3.3 สถาปัตยกรรม Backend Pipeline 4 ขั้นตอน และ OCC Concurrency
* **4-Step Pipeline:** `Validate (Zod Schema)` $\longrightarrow$ `Authorize (Session & RBAC)` $\longrightarrow$ `Service Layer Execution` $\longrightarrow$ `Structured JSON Response`
* **Optimistic Concurrency Control (OCC):** เพิ่ม `version Int @default(0)` บน Entity สำคัญ (เช่น ยอดเงิน, คลังสินค้า) เพื่อป้องกันสภาวะ Lost Updates
* **N+1 Prevention:** บังคับใช้ explicit `select` หรือ bounded `include` ห้าม Query Database ภายใน Loop

---

### 3.4 ระบบตัดวงจรเมื่อเกิดข้อผิดพลาด (2-Strike Circuit Breaker)
เมื่อ Agent ทำการแก้ไขโค้ดแล้วผล TypeCheck ไม่ผ่าน:
* **Strike 1:** อนุญาตให้วิเคราะห์ Error และแก้ไขเฉพาะจุดซ้ำได้อีก 1 ครั้ง
* **Strike 2 (Freeze):** หากยังไม่ผ่านเป็นครั้งที่ 2 **ระบบจะสั่ง Freeze State ทันที** หยุดการวนลูปเผาผลาญ Token และออกรายงาน Failure Report พร้อมทางเลือกในการซ่อมแซมให้ผู้ใช้ตัดสินใจ

---

### 3.5 ชุด 4 เสาหลักสกิลความรู้เชิงลึก (Consolidated Skills)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 🧰 CONSOLIDATED PRODUCTION SKILLS (Layer 2 Knowledge Engine)                                           │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. 🎨 skills/frontend:                                                                                 │
│    สถาปัตยกรรม 3-File Feature Module, 4-State UI Contract, Tailwind CSS, และ 3-Tier Surface Elevation  │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. 🗄️ skills/backend-data:                                                                             │
│    Strict TypeScript Mastery (Zero Any), 4-Step API Pipeline, Prisma ORM, Better Auth, RBAC, และ OCC   │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. 🧪 skills/quality-verify:                                                                           │
│    In-RAM Fast TypeCheck (1-3s), Vitest Sandbox Runner, และ 2-Strike Loop-Breaker Engine               │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. 🧭 skills/cartography:                                                                              │
│    AST Codebase Skeleton Mapping และ Selective Token Diet (ลด Context Overhead ลง 70-90%)              │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. 🔬 การประเมินผลเชิงประจักษ์และแหล่งข้อมูลอ้างอิง (Empirical Benchmark & References)

การประเมินประสิทธิภาพของ **Apex-core 5** ดำเนินการผ่านการวัดผลเชิงประจักษ์ (Empirical Telemetry) บนชุดโค้ดจริง 5 โดเมนของระบบ Full-Stack ใน [`benchmark/fixtures/`](./benchmark/fixtures/) โดยใช้ Byte-Pair Encoding (`cl100k_base` BPE Tokenizer) และการจับเวลาประมวลผลระดับ Hardware Sub-millisecond เพื่อเปรียบเทียบกับรูปแบบการทำงานของ Agent ที่ได้รับการยอมรับ:

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
  • [C] Apex-core 5 (Our Engine):                  338 tokens (เฉลี่ย 1.04 Turns ด้วย In-RAM Verifier) ──> 🔻 -94.4%
======================================================================================================================
⭐ สรุปผล: การใช้ AST Cartography ร่วมกับ Closed-Loop Verifier ช่วยลด Token สะสมลง 94.4% และยุติการวนลูปซ้ำ
======================================================================================================================
```

### ตารางเปรียบเทียบเชิงสถาปัตยกรรม (Comparative Architecture Matrix)

| มิติการทำงาน | [A] Generic Unconstrained Prompt | [B] Industry Guideline (Aider / Anthropic) | [C] Apex-core 5 (Deterministic Control Plane) |
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

## 5. 🖼️ มาตรฐานงาน UI/UX ระดับ Enterprise (Live Showcase)

![Apex Enterprise UI Showcase](./templates/ui/assets/apex-enterprise-dashboard-showcase.png)

Apex บังคับใช้ **Ultra-Compact Modern SaaS Density**, 3-Tier Surface Elevation, Magic UI Theme Toggler, Interactive Sort/Filter Data Tables, และ Crisp SVG Lucide Icons (Strict Zero Emojis) ทั้งใน **Vue 3 / Nuxt 4** และ **React 19 / Next.js 15** โดยมีชุด Starter Component Templates พร้อมใช้งานใน [`templates/ui/`](./templates/ui/)

---

## 6. 🌌 Twin-Engine Synergy: Apex & Nexus

Apex ถูกออกแบบให้ทำงานแบบ **100% Standalone (Zero-Dependency)** แต่สามารถเชื่อมต่อกับ **[Nexus](https://github.com/AlmxndBL/nexus)** เพื่อปลดล็อกระบบบันทึกความจำระยะยาวข้ามโปรเจกต์ (Long-Term Memory Vault):

* **Apex:** กฎเกณฑ์และวินัยการเขียนโค้ด (HOW to build, verify, and enforce safety)
* **Nexus:** คลังความจำและบทเรียนข้ามโปรเจกต์ (WHAT we know, decided, and learned)

---

## 💖 Acknowledgements & Inspirations

* **🧙‍♂️ [Matt Pocock (Total TypeScript)](https://github.com/mattpocock/skills)** — Strict TypeScript principles & contract typing
* **🎯 [The 9arm Way](https://github.com/jirayu-ct-dev/9arm-skills)** — Pragmatic software engineering and trade-off evaluation
* **🧠 [Andrej Karpathy](https://github.com/multica-ai/andrej-karpathy-skills)** — Agent behavioral safeguards and anti-overengineering philosophy
