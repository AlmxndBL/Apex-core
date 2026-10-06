# Apex v6.0 Architecture & Implementation Master Plan

> **Codename:** Apex Kernel  
> **Target Version:** `v6.0.0`  
> **Status:** Approved Architecture Plan · Granular Implementation Breakdown  
> **Date:** 2026-10-06  
> **Lifecycle:** `Commit` (Durable Architecture Specification)  
> **Author:** Antigravity (AI Assistant) & Jack (StxrFxll)  

---

## 1. Executive Summary & Core Objectives

Apex v6.0 เป็นการยกเครื่องสถาปัตยกรรมครั้งสำคัญที่สุดของ Apex-core เพื่อเปลี่ยนผ่านจาก **"Monolithic Framework"** ไปสู่ **"Micro-Kernel + Universal Principles + Pluggable Adapters" (Option b')** มุ่งแก้ปัญหาคอขวด 4 ด้านหลักที่ตรวจพบใน v5.5.0:
1. **Context Bloat:** `AGENTS.md` เดิมมีขนาด 13.8 KB (~2,800 tokens) สิ้นเปลือง Context Window เริ่มต้นในทุกเทิร์นแม้แก้โค้ดเพียงบรรทัดเดียว
2. **Stack Bleed:** กฎ Nuxt/Vue, Next/React, Prisma, Python, C# ปะปนกันในไฟล์เดียว ทำให้เกิด Cross-Domain Pollution
3. **Verification Theater:** การอ้างอิงผลเทสต์หรือผลไทป์เช็กที่ไม่ตรงกับ Seam ความจริงของโปรเจกต์
4. **Adoption Confusion:** ความสับสนระหว่าง Point Mode และ Vendor Mode จากเวอร์ชันก่อนหน้า

### 5 เป้าหมายเชิงประจักษ์ (Core Objectives)
* **[Modeled] 81.8% Initial Token Reduction:** ลดขนาด Root `AGENTS.md` เหลือ **~510 tokens (<380 คำ)** ในรูปแบบ Micro-Kernel
* **Single Universal Adoption Mode:** ยุบโหมดการติดตั้งเดิมเหลือโหมดเดียว: **Global Path Reference** สำหรับเครื่อง Dev ส่วนตัว และ **Single-File Copy** (`AGENTS.md` 2.6 KB) สำหรับโปรเจกต์ทีมภายนอก
* **Strict Seam Binding & Fallback Ladder:** สถาปนาเกณฑ์ส่งมอบงาน 4 ระดับความจริง (`[Verified: Test]`, `[Verified: Compiler]`, `[Syntax-Only]`, `[Unverified: Visual]`) พร้อม Fallback ป้องกัน AI ติดหล่ม
* **Pluggable Modular Adapters:** รวมกฎเฉพาะทางเป็น 3 Adapters หลัก (`web-fullstack`, `backend-data`, `polyglot-core`) โหลดเฉพาะเมื่อตรงกับไฟล์ Manifest และมีความเสี่ยงตรงกับโดเมน
* **Dual-Speed Environment & Production CI/CD:** มาตรฐาน **"Code บน Host (เร็ว 1–3s), Stateful Infra บน Docker (สะอาด)"** พร้อมพิมพ์เขียว 4-Stage Fail-Fast CI และ Healthcheck Probes

---

## 2. Master Architecture Specification (Option b')

สถาปัตยกรรม v6.0 ใช้โครงสร้างแบบ 4 เลเยอร์ที่แยก Invariants (กฎแก่นที่ไม่เปลี่ยนตามภาษา), Universal Principles (หลักการวิศวกรรมสากล), และ Domain Adapters (กฎเฉพาะทาง) ออกจากกันอย่างเด็ดขาด:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              APEX v6.0 KERNEL ARCHITECTURE                             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. ROOT MICRO-KERNEL (Apex-core/AGENTS.md ~510 tokens [Modeled])                       │
│    ├── [R0] Grounding & Anti-Sycophancy: Senior Engineer objectivity, BLUF, Direct      │
│    ├── [R1] 3-Tier Dynamic Intent & Tiered Planning Gate (Tier A vs Tier B docs/plans/)   │
│    ├── [R2] In-RAM Fast Targeted Feedback: Native host check (pnpm, pytest -q, dotnet)  │
│    ├── [R3] Strict Seam Binding: [Test] | [Compiler] | [Syntax-Only] | [Unverified-UI]   │
│    └── [R4] Surgical Diffs & Anti-Pollution: DPR = 1.0, Zero scratch files in target repo│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. UNIVERSAL PRINCIPLES (Apex-core/core/principles.md ~1.2k tokens [Modeled])           │
│    ├── Universal Security Baseline (Server authority, session guards, secret redact)   │
│    ├── Fail-Fast Error Handling & State Invariants                                      │
│    ├── Git Discipline & Atomic Commit Standards (English only, BLUF, DPR = 1.0)        │
│    └── Architecture Bounds: Monolith-First, YAGNI, Pragmatic OOP & Rule of Three        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. JIT MODULAR ADAPTERS (Apex-core/adapters/*.md)                                      │
│    ├── adapters/web-fullstack.md (Nuxt 4 / Next 15, Tailwind, 4-State UI, Responsive)  │
│    ├── adapters/backend-data.md  (Node/Prisma 7, Postgres, OCC version, 5s Tx, Security)│
│    └── adapters/polyglot-core.md (Python 3.10+ FastAPI/mypy, C# .NET 8, Shell/POSIX)   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. DETERMINISTIC ADAPTER BUS & RISK-OVERRIDE DISPATCHER (Resolving C1)                 │
│    ├── Fast Track (1–3 files, Low Risk) ──> Zero Adapter Loading (รันจบด้วย Micro-Kernel)│
│    └── High-Risk Override Gate ────────────> บังคับโหลด Adapter ทันที แม้แก้ไฟล์เดียว:     │
│        (Auth/RBAC, Money/PII, Schema/DB, Concurrency/OCC, Contested State, API Contract)│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 5. DUAL-SPEED ENVIRONMENT & LIFECYCLE CLOSURE                                          │
│    ├── Host Execution: Node 22, pnpm, Python uv, .NET 8 on Windows Host (In-RAM 1-3s)  │
│    ├── Stateful Infra: PostgreSQL 17 + Redis 7 in Docker Compose (compose.dev.yaml)     │
│    ├── Fail-Fast CI: 4-Stage GitHub Actions (Lint -> TypeCheck -> FastTest -> Audit)   │
│    └── Lifecycle: 2-Strike Loop-Breaker + Ephemeral Plan Cleanup + Nexus Memory Vault  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Key Architectural Pillars & Decisions

### Pillar 1: Micro-Kernel (`AGENTS.md`) & Single Universal Mode
* **Token Budget:** ควบคุมขนาดไม่เกิน 6 KB หรือ ~500 คำ (~510 tokens BPE `[Modeled]`)
* **Core Invariants (R0–R4):** ปราศจากโค้ดหรือ syntax เฉพาะภาษา ทุกกฎเป็น Language-Agnostic Behavioral Invariants
* **Single Universal Mode (แก้ปัญหาความสับสน Point/Vendor):**
  * **Default (เครื่อง Dev / Single Machine):** ชี้ไปยัง Global Master `Apex-core/AGENTS.md` ใน System Prompt หรือ IDE Agent Config
  * **Team / Vendor Distribution:** หากจำเป็นต้องวางใน repo ปลายทาง ให้คัดลอกเฉพาะ `AGENTS.md` (ไฟล์เดียว ~2.6 KB) ไปไว้ที่ Root ปราศจากการสร้างโฟลเดอร์พ่วง
* **Anti-Pollution:** ห้ามทิ้งไฟล์ชั่วคราว, scratch script หรือ dummy test ใน repo เป้าหมายเด็ดขาด

### Pillar 2: Universal Principles (`core/principles.md`) & Legacy Rules Migration (Option b')
รวมหลักการพื้นฐานที่ใช้ร่วมกันทุกโปรเจกต์ไว้ที่ `core/principles.md` และย้ายกฎเดิมใน `rules/` ไปยังบ้านใหม่ตามตาราง:

| ไฟล์เดิมใน v5.5.0 (`rules/`) | หมวดหมู่เนื้อหา | ปลายทางใหม่ใน v6.0.0 | สถานะใน v6.0 |
|---|---|---|---|
| `rules/01-security-auth.md` | Server Authority, Secret Masking, Audit Logs | `core/principles.md` §1 | Consolidation |
| `rules/01-security-auth.md` | Session Guard, RBAC, Rate Limiting, Better Auth | `adapters/backend-data.md` §2 | Specialized |
| `rules/02-coding-standards.md` | Clean Code, Fail-Fast, Naming Conventions | `core/principles.md` §2 | Consolidation |
| `rules/02-coding-standards.md` | Strict TS, Zod Validation, Async Patterns | `adapters/backend-data.md` §1 | Specialized |
| `rules/03-system-architecture.md` | Monolith First, YAGNI, Separation of Concerns | `core/principles.md` §3 | Consolidation |
| `rules/03-system-architecture.md` | 4-Step Pipeline, REST API Contracts, OCC | `adapters/backend-data.md` §3 | Specialized |
| `rules/04-database-design.md` | Prisma 7, 5s Tx Timeout, Atomic Inc, Migration | `adapters/backend-data.md` §4 | Specialized |
| `rules/05-ux-ui-design.md` | Feature Module, 4-State UI, Responsive Data Table | `adapters/web-fullstack.md` §1-§3 | Specialized |
| `rules/06-testing-devops.md` | Git Discipline, Clean Commit Standards | `core/principles.md` §4 | Consolidation |
| `rules/06-testing-devops.md` | In-RAM Fast Check, Vitest, CI/CD, Docker | `skills/quality-verify` & Blueprints | Specialized |

> **Backward Compatibility Bridge:** ในช่วง v6.0.0 โฟลเดอร์ `rules/01-06.md` เดิมจะถูกใส่ Deprecation Notice และลิงก์ชี้ทางไปยัง `core/principles.md` และ `adapters/` เพื่อป้องกันโปรเจกต์ภายนอกที่อาจเคยลิงก์มาพังกะทันหัน

### Pillar 3: Dynamic Intent & Risk-Override Adapter Bus (Resolving C1)
แก้ปัญหาช่องโหว่ความเสี่ยงสูงจากการรัน Fast Track:
1. **Low-Risk Fast Track (1–3 ไฟล์):** งานแก้ CSS, ข้อความ, บั๊กตรรกะระดับฟังก์ชันเดี่ยว $\to$ **ข้ามการโหลด Adapter ทันที** ทำงานจบในตัวด้วย R0–R4 ประหยัด Token สูงสุด
2. **High-Risk Override Gate:** แม้จะแก้เพียง 1 ไฟล์ หากตรวจพบว่างานแตะต้องประเด็นต่อไปนี้ **ต้องโหลด Adapter ที่เกี่ยวข้องทันทีก่อนลงมือเขียนโค้ด:**
   - **Authentication / RBAC:** สิทธิ์การเข้าถึง, Session guard, Role permission
   - **Financial / Identity / PII:** ข้อมูลเงิน, เลขบัตร, รหัสผ่าน, ข้อมูลส่วนบุคคล
   - **Database Schema / Migration:** แก้ `schema.prisma`, Migration scripts
   - **Concurrency / Contested State:** ยอดเงิน, สต็อกสินค้า, OCC `version`, Webhook signature
   - **API / Contract Breaking:** เปลี่ยนแปลง Request/Response schema สาธารณะ

### Pillar 4: OOP & Pragmatic Design Patterns Policy
สร้างความชัดเจนในการใช้ Object-Oriented Programming และ Design Patterns ใน v6.0:
* **Pragmatic Modern Standard:** ใช้ Functional-first / Composition API เป็นค่าเริ่มต้นสำหรับ TypeScript/Web แต่สนับสนุน OOP เต็มรูปแบบในจุดที่เพิ่มความสะอาดและการบำรุงรักษา
* **The Rule of Three:** **ห้ามใส่ Design Pattern ล่วงหน้า (Anti-Overengineering/YAGNI)** จะนำ Design Pattern มาใช้ได้ก็ต่อเมื่อตรวจพบว่ามีกรณีการทำงานหรือ Variants ที่แตกต่างกันจริงตั้งแต่ **3 กรณีขึ้นไป ($\ge 3$)**
* **Top 4 Approved Design Patterns:**
  1. **Strategy Pattern:** ใช้สำหรับอัลกอริทึมหรือ Business Logic ที่สลับเปลี่ยนได้ เช่น ระบบชำระเงิน (Stripe vs PromptPay vs Omise), การคำนวณภาษี, รูปแบบการ Export รายงาน
  2. **Adapter Pattern:** ใช้สำหรับหุ้ม (Wrap) และแปลง Interface ของ Third-party SDKs หรือ Driver ภายนอก เช่น Object Storage (S3 vs MinIO vs Cloudflare R2), SMS Provider
  3. **State Pattern:** ใช้สำหรับ Finite State Machine ของ Entity ที่มีวงจรชีวิตซับซ้อน เช่น Order Status (`Draft -> PendingPayment -> Paid -> Fulfilled -> Cancelled`), Ticket Workflow
  4. **Facade Pattern:** ใช้สำหรับรวบรวม Subsystem ซับซ้อนหลายตัวให้เหลือ Entry Point เดียวสำหรับ API หรือ UI Controller เช่น `CheckoutFacade.processOrder()`
* **Banned / Discouraged Anti-Patterns:**
  - ❌ Manual Singleton Classes (ให้ใช้ ES Module Singletons หรือ Dependency Injection ของ Framework แทน)
  - ❌ Abstract Factory ซ้อนหลายชั้น (ให้ใช้ Factory Function แบบตรงไปตรงมา)
  - ❌ Deep Inheritance Hierarchies (>2 ระดับห้ามเด็ดขาด; ยึดหลัก Favor Composition Over Inheritance)

### Pillar 5: Dual-Speed Environment & DevOps Blueprint
* **Dual-Speed Separation:**
  - **Host Runtime:** Node 22, pnpm, Python uv, .NET 8 SDK รันบน Windows Host เพื่อ In-RAM Fast Check (1–3 วินาที)
  - **Stateful Infra:** PostgreSQL 17 และ Redis 7 รันใน Docker Compose (`compose.dev.yaml`) พร้อม Healthcheck
* **Containerization Standard:**
  - Production Multi-stage Dockerfile (`node:22-slim`, non-root user `nodejs:nodejs`, dumb-init/tini)
  - Healthcheck Probes มาตรฐาน:
    - Liveness Probe: `GET /api/health/live` (ตอบ 200 เมื่อ Node Event Loop ยังทำงาน)
    - Readiness Probe: `GET /api/health/ready` (ตอบ 200 เมื่อต่อ Database Pool และ Redis สำเร็จ)
* **4-Stage Fail-Fast CI Pipeline (`.github/workflows/ci.yml`):**
  1. *Stage 1: Lint & Syntax Check* (ESLint / Biome / Black) — < 30 วินาที
  2. *Stage 2: In-RAM TypeCheck* (`tsc --noEmit` / `vue-tsc` / `mypy`) — < 45 วินาที
  3. *Stage 3: Targeted / Fast Unit Tests* (Vitest / pytest) — < 60 วินาที
  4. *Stage 4: Security & License Audit* (Audit, Secret Scan) — รันคู่ขนาน
* **Database Migration CD Gate:**
  - รัน `prisma migrate deploy` เป็นส่วนหนึ่งของ Pre-Deployment Hook ก่อนสลับ Traffic
  - ห้ามรัน migration ที่มี table/column drop โดยไม่มีขั้นตอนรองรับ backward compatibility

### Pillar 6: Strict Seam Binding & Verification Taxonomy
กำจัด "Verification Theater" ด้วยการระบุระดับความจริงในการส่งมอบงาน 4 ระดับอย่างซื่อสัตย์:
1. `[Verified: Test]`: มี Automated Test รันเจาะจงฟังก์ชันที่แก้จริงและผ่าน
2. `[Verified: Compiler]`: ผ่าน In-RAM TypeCheck (`tsc`, `vue-tsc`, `mypy`) — ยืนยันเฉพาะ Type Contract ห้ามเคลมว่า Logic ถูกต้อง
3. `[Syntax-Only]`: ผ่านการตรวจไวยากรณ์ (`node --check`, `py_compile`) สำหรับโปรเจกต์ที่ไม่มี Type System
4. `[Unverified: Visual]`: งาน UI/CSS/Markdown — ห้ามรันคำสั่งอื่นมากลบเกลื่อน ต้องระบุพิกัด Responsive Breakpoint ให้ผู้ใช้ตรวจสอบด้วยตาเปล่า
* **Graceful Fallback:** จบงานได้ตาม Seam สูงสุดที่มีจริงในโปรเจกต์ ห้าม AI ปฏิเสธงานหรือแอบเขียน Test เองนอกคำสั่ง

---

## 4. Granular Implementation Roadmap (Phases 1–5)

แผนการดำเนินงานถูกจัดลำดับอย่างเคร่งครัดตามข้อกำหนด **C3 (Phase Reordering & Zero-Downtime Verification Integrity)** เพื่อให้ `scripts/verify-framework.js` ผ่านตลอดทุกขั้นตอน โดยไม่เกิดสถานะ Broken CI:

```text
Phase 1: Foundations (core/ & adapters/) 
   └──> Phase 2: Micro-Kernel Transformation (AGENTS.md & rules/)
         └──> Phase 3: Verification Suite Synchronization (verify-framework.js)
               └──> Phase 4: DevOps & CI/CD Blueprints (templates/docker/ & ci/)
                     └──> Phase 5: Release Governance & Sign-Off (v6.0.0)
```

---

### Phase 1: Universal Principles & Multi-Stack Adapters Preparation
> **เป้าหมาย:** สร้างรากฐาน `core/principles.md` และเตรียม Adapter ทั้ง 3 ตัวใน `adapters/` ให้สมบูรณ์ก่อน เพื่อรองรับการอ้างอิงจาก Micro-Kernel โดยไม่เกิด Dead Link

#### Detailed Tasks:
* [ ] **Task 1.1: สร้าง `core/principles.md` (Universal Engineering Principles)**
  - รวมกฎวิศวกรรมสากล: Server Authority, Universal Security Baseline, Fail-Fast Invariants, Clean Commits, Monolith-First, The Rule of Three สำหรับ Design Patterns
  - ขนาดเป้าหมาย: ~1,200 tokens (`[Modeled]`), ไม่มี syntax ผูกขาดกับภาษาใดภาษาหนึ่ง
  - ไฟล์เป้าหมาย: `c:\Users\Admin\Desktop\work\Apex-core\core\principles.md`
* [ ] **Task 1.2: กู้คืนและขัดเกลา `adapters/web-fullstack.md`**
  - นำไฟล์ draft จาก scratch directory กลับมาปรับแต่ง
  - เนื้อหา: Nuxt 4 (Vue 3 / Nitro), Next.js 15 (React 19 / App Router), Feature Module Pattern, Four-State UI Contract, Dual Responsive Data View, Tailwind CSS Surface Elevation
  - ไฟล์เป้าหมาย: `c:\Users\Admin\Desktop\work\Apex-core\adapters\web-fullstack.md`
* [ ] **Task 1.3: กู้คืนและขัดเกลา `adapters/backend-data.md`**
  - นำไฟล์ draft จาก scratch directory กลับมาปรับแต่ง
  - เนื้อหา: Standard 4-Step Handler Pipeline, Prisma 7 Driver Adapters, 5s Transaction Timeout, Atomic Increments & OCC `version`, Tenant Scoping, Idempotency Keys, Top 4 OOP Design Patterns (Strategy, Adapter, State, Facade)
  - ไฟล์เป้าหมาย: `c:\Users\Admin\Desktop\work\Apex-core\adapters\backend-data.md`
* [ ] **Task 1.4: กู้คืนและขัดเกลา `adapters/polyglot-core.md`**
  - นำไฟล์ draft จาก scratch directory กลับมาปรับแต่ง
  - เนื้อหา: Python 3.10+ (FastAPI, Pydantic v2, pytest -q, mypy), C# .NET 8+ (EF Core, xUnit, dotnet test), POSIX Bash (`set -euo pipefail`), PowerShell 7+
  - ไฟล์เป้าหมาย: `c:\Users\Admin\Desktop\work\Apex-core\adapters\polyglot-core.md`

#### Verification Criteria & Seam:
* ตรวจสอบว่าไฟล์ทั้ง 4 มีอยู่จริง และขนาดไฟล์สอดคล้องกับงบประมาณ:
  - `core/principles.md`: > 3,000 ตัวอักษร
  - `adapters/web-fullstack.md`: > 4,000 ตัวอักษร
  - `adapters/backend-data.md`: > 4,000 ตัวอักษร
  - `adapters/polyglot-core.md`: > 3,500 ตัวอักษร
* ตรวจสอบ Markdown Link ทั้งหมดว่าไม่มี broken relative links

#### Rollback Seam:
* ลบไฟล์ใน `core/` และ `adapters/` (`git clean -fd core adapters`)

---

### Phase 2: Micro-Kernel Transformation & Deprecation Migration
> **เป้าหมาย:** สกัด `AGENTS.md` ให้เป็น Micro-Kernel ฉบับสมบูรณ์ พร้อมเชื่อมต่อระบบ Risk-Override Adapter Bus และทำ Deprecation Bridge ให้กับโฟลเดอร์ `rules/` เดิม

#### Detailed Tasks:
* [ ] **Task 2.1: ร่างและเขียน `AGENTS.md` v6.0 Micro-Kernel**
  - สกัดเนื้อหาเหลือเฉพาะ: R0 (Context Grounding & Anti-Sycophancy), R1 (Dynamic Intent & Tiered Planning Gate Tier A/B/C), R2 (In-RAM Fast Targeted Feedback), R3 (Strict Seam Binding 4 ระดับ), R4 (Surgical Diffs DPR=1.0 & Anti-Pollution)
  - เพิ่ม **Deterministic Adapter Bus & Risk-Override Clause (C1)** ชัดเจน
  - เพิ่มส่วนอ้างอิง `core/principles.md` และ `adapters/`
  - ไฟล์เป้าหมาย: `c:\Users\Admin\Desktop\work\Apex-core\AGENTS.md`
  - งบประมาณ: ขนาดไฟล์ < 6.0 KB, คำรวม < 500 คำ (~510 tokens BPE `[Modeled]`)
* [ ] **Task 2.2: สร้าง Deprecation Bridges ใน `rules/01-06.md`**
  - ใส่ Header แจ้งเตือน Deprecation ในทุกไฟล์ของ `rules/` เดิม
  - ระบุลิงก์ชี้ทางไปยัง `core/principles.md` และ `adapters/*.md` ตาม Migration Matrix
  - คงเนื้อหาเดิมไว้เป็น Secondary Reference ชั่วคราวเพื่อป้องกัน CI หรือโปรเจกต์ภายนอกพัง
  - ไฟล์เป้าหมาย: `rules/01-security-auth.md` ถึง `rules/06-testing-devops.md`
* [ ] **Task 2.3: ปรับปรุง Skills กลางให้สอดคล้องกับ v6.0**
  - ปรับปรุง `skills/apex-core/SKILL.md`: ให้อ่านและกระจายงานไปยัง `core/principles.md` และ `adapters/` แทนการอ่าน `rules/` ทั้งหมด
  - ปรับปรุง `skills/quality-verify/SKILL.md`: บันทึกข้อกำหนด Strict Seam Taxonomy และ 2-Strike Failure Report format
  - ไฟล์เป้าหมาย: `skills/apex-core/SKILL.md`, `skills/quality-verify/SKILL.md`

#### Verification Criteria & Seam:
* ตรวจสอบขนาดไฟล์ `AGENTS.md` ด้วยคำสั่ง Node.js/PowerShell: ต้องน้อยกว่า 6,000 bytes และคำรวม < 500 คำ
* ตรวจสอบว่ากฎ R0–R4 มีอยู่ครบถ้วนใน `AGENTS.md`
* ตรวจสอบว่าลิงก์ใน `rules/*.md` และ `skills/*.md` สามารถ Resolve ได้ 100%

#### Rollback Seam:
* `git checkout -- AGENTS.md rules/ skills/`

---

### Phase 3: Verification Suite Synchronization
> **เป้าหมาย:** ปรับปรุง `scripts/verify-framework.js` ให้รองรับสถาปัตยกรรม v6.0 อย่างสมบูรณ์ เพื่อเป็น Automated Integrity Gate ที่ทดสอบผ่าน 100%

#### Detailed Tasks:
* [ ] **Task 3.1: เพิ่มการตรวจสอบ `core/principles.md` และ `adapters/` ใน Verification Suite**
  - เพิ่ม `REQUIRED_ADAPTERS`: `web-fullstack.md`, `backend-data.md`, `polyglot-core.md`
  - เพิ่มการตรวจสอบ `core/principles.md` (ขนาด > 2 KB, มีหัวข้อหลักครบ)
  - เพิ่มการตรวจสอบงบประมาณขนาดไฟล์ `AGENTS.md` (< 6 KB)
  - ไฟล์เป้าหมาย: `c:\Users\Admin\Desktop\work\Apex-core\scripts\verify-framework.js`
* [ ] **Task 3.2: ปรับปรุงการตรวจสอบ Unified Protocol ใน `scripts/verify-framework.js`**
  - ย้ายการตรวจสอบ Feature Module Pattern และ Four-State UI ไปตรวจที่ `adapters/web-fullstack.md`
  - ย้ายการตรวจสอบ 4-Step Pipeline ไปตรวจที่ `adapters/backend-data.md`
  - อัปเดตการตรวจสอบ Cross-References ของ `AGENTS.md` ให้ตรวจหา `core/principles.md` และ `adapters/`
* [ ] **Task 3.3: เพิ่ม Seam Vocabulary Validation**
  - เพิ่มการตรวจเช็กว่า `skills/quality-verify/SKILL.md` มีคีย์เวิร์ด Seam ทั้ง 4 (`[Verified: Test]`, `[Verified: Compiler]`, `[Syntax-Only]`, `[Unverified: Visual]`) ครบถ้วน
* [ ] **Task 3.4: รันการทดสอบและแก้ปัญหาทั้งหมดจนได้ 100% Pass**
  - รันคำสั่ง `node scripts/verify-framework.js`
  - ตรวจสอบว่า Exit code = 0 และไม่มีข้อผิดพลาดหลงเหลือ

#### Verification Criteria & Seam:
* รันคำสั่ง `node scripts/verify-framework.js` ใน PowerShell
* ผลลัพธ์: `Results: X/X checks passed. ✔ All Framework Integrity Gates PASSED successfully! (100%)` (Exit code = 0)

#### Rollback Seam:
* `git checkout -- scripts/verify-framework.js`

---

### Phase 4: DevOps & CI/CD Blueprints
> **เป้าหมาย:** สร้าง Blueprint สำหรับ Docker Containerization, Local Dev Services, Healthcheck Probes, และ GitHub Actions CI ตามมาตรฐานใหม่

#### Detailed Tasks:
* [ ] **Task 4.1: สร้าง `templates/docker/compose.dev.yaml`**
  - Multi-service Local Dev Stack: PostgreSQL 17 (alpine) + Redis 7 (alpine)
  - Healthcheck Probes สำหรับทุก Service (`pg_isready -U postgres`, `redis-cli ping`)
  - Persistent Volumes สำหรับข้อมูล (`postgres_data`, `redis_data`)
  - พอร์ตมาตรฐาน: `5432:5432`, `6379:6379` พร้อม Environment Interpolation
  - ไฟล์เป้าหมาย: `c:\Users\Admin\Desktop\work\Apex-core\templates\docker\compose.dev.yaml`
* [ ] **Task 4.2: สร้าง `templates/docker/Dockerfile.fullstack`**
  - Production Multi-stage build สำหรับ Nuxt 4 / Next 15 (Node 22-slim)
  - แยก Stage ชัดเจน: `base` $\to$ `dependencies` $\to$ `builder` $\to$ `runner`
  - Security: รันด้วย Non-root user (`nodejs:nodejs`, UID 10001), ใช้งาน `dumb-init`
  - Layer Caching: คัดลอก `package.json` และ lockfile ก่อนซอร์สโค้ด
  - ไฟล์เป้าหมาย: `c:\Users\Admin\Desktop\work\Apex-core\templates\docker\Dockerfile.fullstack`
* [ ] **Task 4.3: สร้าง `templates/ci/github-ci.yml`**
  - 4-Stage Fail-Fast GitHub Actions Pipeline:
    1. Lint & Format (pnpm lint / biome check)
    2. TypeCheck (vue-tsc / tsc --noEmit)
    3. Targeted Test (vitest run)
    4. Security Audit (pnpm audit --audit-level=high)
  - Concurrency cancel-in-progress, Path-filtering (ข้าม build เมื่อแก้เฉพาะ docs), pnpm cache
  - ไฟล์เป้าหมาย: `c:\Users\Admin\Desktop\work\Apex-core\templates\ci\github-ci.yml`
* [ ] **Task 4.4: สร้าง Blueprint Healthcheck Endpoint**
  - สร้าง `templates/blueprints/healthcheck-endpoints.md`
  - ตัวอย่างโค้ด Dual Healthcheck:
    - Liveness: `/api/health/live` (Process state, Uptime)
    - Readiness: `/api/health/ready` (Database Prisma pool check, Redis ping check)
  - ไฟล์เป้าหมาย: `c:\Users\Admin\Desktop\work\Apex-core\templates\blueprints\healthcheck-endpoints.md`

#### Verification Criteria & Seam:
* ตรวจสอบความถูกต้องทางไวยากรณ์ของไฟล์ YAML ทั้งหมด (`compose.dev.yaml`, `github-ci.yml`) ด้วย Node YAML parser หรือ schema check
* ตรวจสอบว่า Dockerfile มีครบทุก Stage และไม่มี syntax ผิดพลาด
* ตรวจสอบว่า `scripts/verify-framework.js` ตรวจพบ template ใหม่โดยไม่ error

#### Rollback Seam:
* `git clean -fd templates/docker templates/ci templates/blueprints`

---

### Phase 5: Release Governance, Documentation & Sign-Off
> **เป้าหมาย:** สรุปการยกระดับสู่ v6.0.0, ปรับปรุงเอกสารคู่มือการใช้งาน (README ทั้งสองภาษา), อัปเดต Changelog, และส่งมอบงานขั้นสมบูรณ์

#### Detailed Tasks:
* [ ] **Task 5.1: ปรับปรุงเวอร์ชันใน Manifests สู่ `6.0.0`**
  - อัปเดต `package.json`: `"version": "6.0.0"`
  - อัปเดต `plugin.json`: `"version": "6.0.0"`
  - อัปเดต `AI-Context-Index.md`: ปรับปรุงแผนผังโครงสร้างโฟลเดอร์ให้ตรงกับ v6.0.0
* [ ] **Task 5.2: ปรับปรุง `README.md` และ `README.th.md`**
  - อัปเดตคำอธิบาย Architecture: เปลี่ยนสู่ Micro-Kernel + Adapters
  - ตัดหัวข้อ Mode 1 (Point) / Mode 2 (Vendor) ที่ล้าสมัยออก แทนที่ด้วย **Single Universal Mode**
  - อธิบายคำแนะนำ Dual-Speed Environment (Host Runtime + Docker Compose Infra)
  - เพิ่มตาราง Adapter Directory และ Design Patterns Policy
* [ ] **Task 5.3: บันทึกประวัติใน `CHANGELOG.md`**
  - เพิ่มหัวข้อ `## [6.0.0] - 2026-10-06 — The Micro-Kernel, Multi-Stack Adapters & Dual-Speed Infrastructure Release 🚀`
  - บันทึกรายการ Added, Changed, Deprecated, Fixed อย่างละเอียดตามมาตรฐาน Keep a Changelog
* [ ] **Task 5.4: รัน Comprehensive Verification Suite & Final Seam Closure**
  - รัน `node scripts/verify-framework.js` ให้ผ่าน 100%
  - ตรวจสอบ `git status`: สถานะสะอาด (Clean working tree), ไม่มีไฟล์ขยะหรือ scratch หลงเหลือ
  - สรุปผลการส่งมอบงานด้วย Seam Vocabulary ที่ถูกต้องตามข้อกำหนด Apex

#### Verification Criteria & Seam:
* `node scripts/verify-framework.js` $\to$ Exit code = 0 (100% Pass)
* `git status --porcelain` $\to$ แสดงเฉพาะไฟล์ที่อยู่ในแผนงาน v6.0.0 ปราศจาก untracked junk
* ขนาด `AGENTS.md` < 6 KB และคำรวม < 500 คำ

---

## 5. Risk Assessment & Rollback Matrix

| ความเสี่ยง (Risk) | โอกาส/ผลกระทบ | มาตรการป้องกัน (Mitigation) | จุดถอยกลับ (Rollback Seam) |
|---|:---:|---|---|
| **R1: Broken Links ใน External Repos**<br>Repo ภายนอกอ้างอิง `rules/*.md` เดิม | ปานกลาง / สูง | คงไฟล์ `rules/01-06.md` ไว้โดยใส่ Deprecation Banner และลิงก์ชี้ทางไปยัง `core/` และ `adapters/` | คืนค่าไฟล์ใน `rules/` ด้วย `git checkout -- rules/` |
| **R2: Verification Suite ขัดข้องระหว่างย้าย**<br>`verify-framework.js` พังเพราะหาไฟล์ไม่เจอ | ต่ำ / สูง | ยึดกฎ C3: ดำเนินงาน Phase 1 (สร้างไฟล์ใหม่) ก่อน แล้วจึงปรับปรุง `verify-framework.js` ใน Phase 3 | `git checkout -- scripts/verify-framework.js` |
| **R3: AI ข้ามกฎ Backend ในงานแก้ง่าย**<br>AI แก้บั๊ก auth 1 ไฟล์แล้วไม่โหลด adapter | สูง / สูง | บังคับใช้ **Risk-Override Gate (C1)** ใน `AGENTS.md`: งานเกี่ยวกับ Auth, Money, Schema ต้องโหลด adapter เสมอแม้แก้เพียง 1 ไฟล์ | แก้ไขกฎข้อบังคับใน `AGENTS.md` |
| **R4: Working Tree สกปรกจาก Scratch files**<br>มีไฟล์ทดสอบหรือ temporary data ตกค้าง | ต่ำ / ปานกลาง | บังคับใช้ R4 Anti-Pollution Rule และจัดเก็บ scratch files ใน AppData brain เท่านั้น | สั่ง `git clean -fd` เฉพาะโฟลเดอร์ที่ไม่ได้ track |

---

## 6. Definition of Done (DoD) & Success Metrics

การส่งมอบ Apex v6.0.0 จะถือว่าสมบูรณ์ตามมาตรฐานทางวิศวกรรมก็ต่อเมื่อบรรลุเกณฑ์เชิงประจักษ์ดังต่อไปนี้ครบทุกข้อ:

1. **Token Budget Metric:** `AGENTS.md` มีขนาดไฟล์จริง $\le$ 6,000 bytes และมีจำนวนคำ $\le$ 500 คำ (ประเมินเป็น $\le$ 510 tokens BPE `[Modeled]`)
2. **Framework Integrity Gate:** `node scripts/verify-framework.js` รันผ่านครบ 100% ทุก Checkpoint (Exit Code = 0)
3. **Multi-Stack Coverage:** มี Adapters ครบ 3 ไฟล์ใน `adapters/` (`web-fullstack.md`, `backend-data.md`, `polyglot-core.md`) พร้อมตรวจจับ Manifest อัตโนมัติ
4. **DevOps Blueprints:** มี `compose.dev.yaml`, `Dockerfile.fullstack`, `github-ci.yml`, และ `healthcheck-endpoints.md` พร้อมใช้งานจริง
5. **Clean Working Tree:** ไม่มีไฟล์ขยะ (scratch files, temporary outputs) หลงเหลืออยู่ใน Git working tree ของ `Apex-core`
