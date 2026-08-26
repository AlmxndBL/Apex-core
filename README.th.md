# ⚡ Apex-core 5 — The Deterministic AI Agent Operating Protocol

> **The Disciplined Senior Engineering Engine & Token Economy Control Plane for AI Coding Agents**  
> สถาปัตยกรรมระบบควบคุมเชิงวิศวกรรม (Deterministic Control Plane) สำหรับกำกับคุณภาพการพัฒนาซอฟต์แวร์ของ AI Coding Agents รองรับ Nuxt 4 (Vue 3), Next.js 15 (React 19), Better Auth, Prisma ORM, และ Full-Stack Architecture ลดการใช้ Token สะสมลง **94.4%** เมื่อเทียบกับแนวทางปฏิบัติทั่วไปในอุตสาหกรรม

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

## 1. ⚠️ จุดบอดที่ไม่มีใครบอกคุณเกี่ยวกับ AI Coding Agents (The Invisible Token Bleed)

โปรแกรมเมอร์และทีมวิศวกรรมส่วนใหญ่มีโมเดลความคิดว่า:  
> *"เมื่อเราสั่งให้ AI แก้บั๊ก 5 บรรทัด เราจ่ายค่า Token แค่เท่ากับปริมาณโค้ด 5 บรรทัดนั้น"*

**แต่ในความเป็นจริงของระบบ LLM API (OpenAI, Anthropic) มันไม่เคยเป็นแบบนั้นเลย:**

```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ 📦 ก้อน Stateless HTTP Payload ที่ต้องส่งไปให้ AI ใหม่ทุกๆ 1 รอบ (Turn)                 │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. System Prompt:       ไฟล์คำสั่งและกฎระเบียบทั้งหมด                                    │
│ 2. Ingested Full Files: โค้ดไฟล์ดิบทั้งก้อน (1,000–2,000 บรรทัด รวม HTML, CSS, SVG)      │
│ 3. Tool Error Outputs:  Log การพัง, Compiler Stack Trace, และประวัติการรันคำสั่ง         │
│ 4. Conversation History:ประวัติการคุยและการแก้ผิดในรอบก่อนหน้าทั้งหมด                     │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### ปรากฏการณ์ดอกเบี้ยทบต้น $\mathcal{O}(N^2)$ (The Quadratic Context Trap)
เนื่องจากเซิร์ฟเวอร์ของ LLM API ทำงานแบบ **Stateless (ไม่จำสถานะใดๆ ข้ามรอบ)** ทุกครั้งที่ AI แก้โค้ดไม่ผ่านและต้องวนลูปแก้รอบที่ 2, 3, 4 ตัวโปรแกรมจะต้อง **หอบเอาประวัติเดิมและไฟล์ดิบเดิมทั้งหมดส่งซ้ำเข้าไปใหม่ทุกครั้ง**

$$\text{Cumulative Session Tokens} = \sum_{k=1}^{N} \Big[ C_{\text{init}} + \sum_{j=1}^{k-1} (\Delta I_j + \Delta O_j) + \Delta O_k \Big] \in \mathbf{\Theta(N^2)}$$

* **รอบที่ 1:** ส่งไฟล์เต็ม (800 tok) + คำสั่ง $\to$ ใช้ไป 2,500 tokens
* **รอบที่ 2 (แก้ไม่ผ่าน):** ส่งรอบ 1 ทั้งหมด + โค้ดที่เขียนผิด + Error $\to$ บวมเป็น 5,500 tokens
* **รอบที่ 3 (ยังติดบั๊ก):** ส่งรอบ 1 + 2 + โค้ดที่ยังพัง $\to$ บวมทะลุ 9,500 tokens
* **ผลลัพธ์สุทธิ:** งานแก้บั๊กสั้นๆ จบลงที่การเผาผลาญ **17,000+ Tokens ($0.10+ USD)** โดยที่โปรแกรมเมอร์ไม่เคยรู้ตัวว่ากำลังจ่ายค่าอ่านไฟล์เดิมซ้ำๆ ซากๆ

---

## 2. ❌ ทำไมแค่ `.cursorrules` หรือ Prompt ทั่วไปถึงแก้ปัญหานี้ไม่ได้? (Why Soft Prompts Fail)

หลายคนพยายามแก้ปัญหานี้ด้วยการเขียนข้อความลงใน `.cursorrules` หรือ `CLAUDE.md` เช่น *"ช่วยเขียนโค้ดให้สะอาดนะ ห้ามแก้นอกเหนือจากที่สั่งนะ"*

**แต่ในเชิงวิทยาการคอมพิวเตอร์ กฎพวกนี้เป็นแค่ "คำขอร้องเชิงสถิติ (Soft Prompt Suggestion)" ไม่ใช่ระบบควบคุม:**

```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ 🔴 THE SOFT PROMPT PARADOX:                                                             │
│ การใส่ Prompt ธรรมดา ไม่สามารถห้ามไม่ให้โปรแกรมโหลดไฟล์ดิบ 2,000 บรรทัดเข้ามาได้,        │
│ ไม่สามารถตรวจสอบ Compiler Type ใน RAM ได้, และไม่มีระบบตัดไฟเมื่อ AI เริ่มหลอนวนลูป     │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

| มิติการทำงาน | `.cursorrules` / System Prompt ทั่วไป | Apex-core 5 (Deterministic Control Plane) |
|---|---|---|
| **กลไกการควบคุม** | ข้อความขอร้อง (ความน่าจะเป็น $P(\text{fail}) > 0$) | **Finite State Machine (FSM):** ล็อกสถานะทางวิศวกรรมเด็ดขาด |
| **การโหลด Context** | โหลดไฟล์ดิบ 1,000+ บรรทัด (799.6 BPE tok) | **AST Codebase Cartography:** กรองเหลือแต่ Interface (107 BPE tok, **-80.7%**) |
| **การส่งโค้ดกลับ** | เขียนทับใหม่ทั้งไฟล์ (821.8 tok, เสี่ยง Import หลุด) | **Surgical Line Patch:** ส่งเฉพาะบรรทัดที่ผ่าตัด (176.0 tok, **-78.6%**) |
| **การตรวจรับงาน** | หวังว่า AI จะทำถูก หรือรอคนมากดรัน Full Build (~30s) | **In-RAM Closed-Loop Verifier:** รัน `vue-tsc` ใน RAM ทันที (< 1 วินาที) |
| **เมื่อแก้ไม่ผ่าน** | วนลูปแก้เรื่อยๆ จน Token บวมทะลุเพดาน | **2-Strike Circuit Breaker:** สั่ง Freeze สถานะทันทีเมื่อพัง 2 ครั้งติด |

---

## 3. 🛡️ สถาปัตยกรรม Apex-core 5: เปลี่ยนการเดาสุ่มเป็นระบบควบคุมที่แน่นอน (The 3 Engineering Moats)

Apex-core 5 แก้ไขปัญหานี้ด้วยการสร้าง **Control Plane** ครอบกระบวนการทำงานของ AI ทั้งหมด:

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

### เสาหลักที่ 1: AST Codebase Cartography (กินแต่เนื้อ ไม่กินไขมัน)
ก่อนที่ AI จะอ่านโค้ด ระบบจะสกัดเฉพาะ **Type Contracts, DTOs, และ Zod Schemas** ตัดส่วน HTML, Tailwind CSS Class และ Logic ภายในฟังก์ชันทิ้งไป:
* ไฟล์ Vue ขนาด 1,858 Tokens $\longrightarrow$ ถูกบีบเหลือ **67 Tokens (ลดลง 96.4%)** โดยใช้เวลาประมวลผลบน RAM แค่ $0.14\text{ms}$ (สอดคล้องกับงานวิจัย *Lost in the Middle* ของ Stanford [3] ที่ชี้ว่าการลด Context Noise ช่วยป้องกัน Attention Decay)

### เสาหลักที่ 2: In-RAM Closed-Loop Verifier (ตัดวงจร $\mathcal{O}(N^2)$ เหลือ $\mathcal{O}(1)$)
เมื่อ AI เขียนโค้ดเสร็จ ระบบจะรัน TypeCheck บน RAM ทันที หากผ่านจะปิดงานทันที ทำให้ **จำนวน Turn เฉลี่ยลดลงเหลือ 1.04 รอบ (รอบเดียวจบ)** $\to$ ตัดรอบที่ 2, 3, 4 ทิ้งทั้งหมด

### เสาหลักที่ 3: 2-Strike Circuit Breaker & Surgical Patch
* **Surgical Patch:** ส่งโค้ดกลับเฉพาะบรรทัดที่มีการแก้ไข พร้อมระบุพิกัดบรรทัดชัดเจน (ใช้เพียง ~176 tokens)
* **Circuit Breaker:** ประยุกต์ทฤษฎี *Circuit Breaker Pattern* [5] หากแก้โค้ดแล้ว TypeCheck ไม่ผ่าน 2 ครั้งติด ระบบจะสั่ง **Freeze ทันที** หยุดการเผาผลาญ Token และออกรายงานสรุปให้คนตรวจ

---

## 4. 🔬 ผลการประเมินเชิงประจักษ์และแหล่งข้อมูลอ้างอิง (Empirical Benchmark & References)

การประเมินประสิทธิภาพดำเนินการผ่านการวัดผลเชิงประจักษ์บนชุดรหัสต้นฉบับจริง 5 โดเมน Full-Stack ([`benchmark/fixtures/`](./benchmark/fixtures/)) ด้วย Tokenizer มาตรฐาน `cl100k_base` BPE:

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
⭐ สรุปผล: Apex-core 5 ประหยัด Token สะสมลง 94.4% และตัดวงจรการวนลูปซ้ำได้อย่างเด็ดขาด
======================================================================================================================
```

### ตัวเลขต้นทุนทางการเงินระดับองค์กร (Enterprise Financial Impact)
สมมติทีมวิศวกรรมขนาด **100 คน** ทำงาน 20 Tasks/คน/วัน (รวม 44,000 Tasks/เดือน):

| สถาปัตยกรรม | ปริมาณ Token ต่อเดือน | ค่าใช้จ่าย API ต่อเดือน | ค่าใช้จ่าย API ต่อปี |
|---|---|---|---|
| **รูปแบบเดิม (Aider Whole-File)** | 776.99 ล้าน Tokens | **$4,197.60 USD** | **$50,371.20 USD** |
| **แนวทางปฏิบัติของ Anthropic** | 265.98 ล้าน Tokens | **$1,434.40 USD** | **$17,212.80 USD** |
| **Apex-core 5 Control Plane** | **14.87 ล้าน Tokens** | **$79.20 USD** | **$950.40 USD** |
| **💰 เงินสดที่ประหยัดได้ต่อปีสุทธิ** | **🔻 ประหยัด 762 ล้าน Tokens** | **ลดลง -$4,118 / เดือน** | **ประหยัดเงินได้ +$49,420 / ปี** |

### 📚 แหล่งข้อมูลอ้างอิงมาตรฐานสากล (References)

* **[1] SWE-bench (ICLR 2024):** Jimenez, C. E., et al. *"SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"*, International Conference on Learning Representations (ICLR 2024). [arXiv:2310.06770](https://arxiv.org/abs/2310.06770)
* **[2] Aider Benchmark Suite:** Gauthier, P. (2024). *"Aider: AI Pair Programming in Your Terminal - Benchmark Suite & Edit Formats"*, [Official Documentation](https://aider.chat/docs/benchmarks.html)
* **[3] Lost in the Middle (Stanford / TACL 2024):** Liu, N. F., et al. *"Lost in the Middle: How Language Models Use Long Contexts"*, Transactions of the Association for Computational Linguistics (TACL). [arXiv:2307.03172](https://arxiv.org/abs/2307.03172)
* **[4] Anthropic Agent Architecture:** Anthropic AI Research (2024). *"Building Effective Agents: Architectural Patterns and Tool Design"*, [Anthropic Research](https://www.anthropic.com/research/building-effective-agents)
* **[5] Circuit Breaker Pattern:** Nygard, M. T. (2018). *"Release It!: Design and Deploy Production-Ready Software (2nd Edition)"*, Pragmatic Bookshelf.
* **[6] TypeScript Compiler Architecture:** Microsoft Engineering Team (2024). *"TypeScript Compiler Architecture & Language Service Program API"*, [Microsoft Wiki](https://github.com/microsoft/TypeScript/wiki/Architectural-Overview)

---

## 5. ⚡ วิธีเริ่มใช้งานใน 5 วินาที (Single Drop-in Setup)

ก๊อปปี้ไฟล์ [`AGENTS.md`](./AGENTS.md) ไปวางที่ Root Directory ของโปรเจกต์คุณ:

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

## 6. 🧰 ชุด 4 เสาหลักสกิลความรู้เชิงลึก (Consolidated Skills in v5.0)

1. 🎨 **[`skills/frontend`](./skills/frontend/SKILL.md):** 3-File Feature Module Architecture (`use<Feature>`, `<Feature>List`, `<feature>.contract`), Mandatory 4-State UI (Skeleton, Empty, Error, Data), Modern 3-Tier Surface Elevation.
2. 🗄️ **[`skills/backend-data`](./skills/backend-data/SKILL.md):** Standard 4-Step API Pipeline, Strict TypeScript (Zero Any), Prisma ORM & OCC Concurrency Protection, Better Auth & RBAC.
3. 🧪 **[`skills/quality-verify`](./skills/quality-verify/SKILL.md):** In-RAM Fast TypeCheck (1-3s), Vitest Runner, Cumulative 2-Strike Failure Circuit Breaker.
4. 🧭 **[`skills/cartography`](./skills/cartography/SKILL.md):** AST Codebase Skeleton Mapping, Selective Token Diet (ลด Context Overhead 70-90%).

---

## 7. 🖼️ มาตรฐานงาน UI/UX ระดับ Enterprise (Live Showcase)

![Apex Enterprise UI Showcase](./templates/ui/assets/apex-enterprise-dashboard-showcase.png)

Apex บังคับใช้ **Ultra-Compact Modern SaaS Density**, 3-Tier Surface Elevation, Magic UI Theme Toggler, Interactive Sort/Filter Data Tables, และ Crisp SVG Lucide Icons (Strict Zero Emojis) ทั้งใน **Vue 3 / Nuxt 4** และ **React 19 / Next.js 15** โดยมีชุด Starter Component Templates พร้อมใช้งานใน [`templates/ui/`](./templates/ui/)

---

## 8. 🌌 Twin-Engine Synergy: Apex & Nexus

Apex ถูกออกแบบให้ทำงานแบบ **100% Standalone (Zero-Dependency)** แต่สามารถเชื่อมต่อกับ **[Nexus](https://github.com/AlmxndBL/nexus)** เพื่อปลดล็อกระบบบันทึกความจำระยะยาวข้ามโปรเจกต์ (Long-Term Memory Vault):

* **Apex:** กฎเกณฑ์และวินัยการเขียนโค้ด (HOW to build, verify, and enforce safety)
* **Nexus:** คลังความจำและบทเรียนข้ามโปรเจกต์ (WHAT we know, decided, and learned)

---

## 💖 Acknowledgements & Inspirations

* **🧙‍♂️ [Matt Pocock (Total TypeScript)](https://github.com/mattpocock/skills)** — Strict TypeScript principles & contract typing
* **🎯 [The 9arm Way](https://github.com/jirayu-ct-dev/9arm-skills)** — Pragmatic software engineering and trade-off evaluation
* **🧠 [Andrej Karpathy](https://github.com/multica-ai/andrej-karpathy-skills)** — Agent behavioral safeguards and anti-overengineering philosophy
