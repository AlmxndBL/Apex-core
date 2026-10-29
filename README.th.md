![Apex — Production-safe AI code changes](./assets/social-preview.jpg)
# ⚡ Apex — Production-safe AI Coding Workflow

> **Apex ช่วยให้ AI coding agent เข้าใจงาน แก้เฉพาะจุด ตรวจผลจริง และรายงานหลักฐาน**

Current release: `apex-core@7.0.0`

**[English](README.md) · [ภาษาไทย](README.th.md)**

Apex คือข้อกำหนดและโปรโตคอลการทำงาน (Operating Protocol & Rule Specification) แบบ local สำหรับ AI coding agent เพื่อวางกรอบการทำงานวิศวกรรมที่รัดกุม ตั้งแต่การล็อกเจตนาของงาน (Intent Locking: ตรวจสอบแบบ read-only vs. การแก้เฉพาะจุดแบบ surgical patch vs. การดำเนินการที่มีความเสี่ยงสูงแบบ guarded gate), การตรวจยืนยันผลในหน่วยความจำที่รวดเร็ว (Fast Targeted In-RAM Verification) ไปจนถึงการส่งมอบหลักฐานจริง (Mandatory Evidence Delivery) เมื่อสำรวจ แก้ไข และทดสอบโค้ดใน repository ซอฟต์แวร์จริง

**v7.0.0** เพิ่ม workflow สร้างระบบที่ปรับ discovery, design และแผนตามความไม่แน่นอนและความเสี่ยง พร้อมติดตาม acceptance กับหลักฐาน โดยคง Micro-Kernel, JIT stack adapters และ fast track สำหรับงานเล็ก

---

## 🏛️ สถาปัตยกรรม Apex v7.0.0 (Architecture Overview)

Apex v7.0.0 แยกกฎแก่นสากล (Invariants), หลักการวิศวกรรม (Universal Principles), และกฎเฉพาะทาง (Stack Adapters) ออกจากกันเป็นชั้นที่ชัดเจน:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              APEX v7.0.0 KERNEL ARCHITECTURE                             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. ROOT MICRO-KERNEL (AGENTS.md · under 6 KB · measured by npm test)                       │
│    ├── [R0] Grounding & Anti-Sycophancy: Senior Engineer objectivity, BLUF, Direct      │
│    ├── [R1] 3-Tier Dynamic Intent & Tiered Planning Gate (Tier A vs Tier B docs/plans/)   │
│    ├── [R2] In-RAM Fast Targeted Feedback: Native host check (pnpm, pytest -q, dotnet)  │
│    ├── [R3] Strict Seam Binding: [Test] | [Compiler] | [Syntax-Only] | [Unverified-UI]   │
│    └── [R4] Surgical Diffs & Anti-Pollution: DPR = 1.0, Zero scratch files in target repo│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. UNIVERSAL PRINCIPLES (core/principles.md)                                           │
│    ├── Universal Security Baseline (Server authority, session guards, secret redact)   │
│    ├── Fail-Fast Error Boundaries & Standardized Error Envelopes                       │
│    ├── Git Discipline & Atomic Commit Standards (English only, BLUF, DPR = 1.0)        │
│    └── Architecture Bounds: Monolith-First, YAGNI, Pragmatic OOP & Rule of Three        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. JIT MODULAR STACK ADAPTERS (adapters/*.md)                                          │
│    ├── adapters/web-fullstack.md (Nuxt 4 / Next 15, Tailwind, 4-State UI, Responsive)  │
│    ├── adapters/backend-data.md  (Node/Prisma 7, Postgres, OCC version, 5s Tx, Security)│
│    └── adapters/polyglot-core.md (Python 3.10+ FastAPI/mypy, C# .NET 8, Shell/POSIX)   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. DETERMINISTIC ADAPTER BUS & RISK-OVERRIDE DISPATCHER                                │
│    ├── Fast Track (1–3 files, Low Risk) ──> Zero Adapter Loading (Micro-Kernel only)    │
│    └── High-Risk Override Gate ────────────> Required Adapter Loading:                  │
│        (Auth/RBAC, Money/PII, Schema/DB, Concurrency/OCC, Contested State, API Contract)│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 5. BUILD WORKFLOW: skills/apex-core/references/build-workflow.md                     │
│    Discovery -> Design -> Plan -> Implement/Verify -> Acceptance Review              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 6. DUAL-SPEED ENVIRONMENT & PRODUCTION DEVOPS                                          │
│    ├── Host Execution: Node 22, pnpm, Python uv, .NET 8 on Windows Host (In-RAM 1-3s)  │
│    ├── Stateful Infra: PostgreSQL 17 + Redis 7 in Docker Compose (compose.dev.yaml)     │
│    ├── Fail-Fast CI: 4-Stage GitHub Actions (Lint -> TypeCheck -> FastTest -> Audit)   │
│    └── Dual Health Probes: /api/health/live (Process state) vs /ready (DB Pool + Redis)│
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Apex คืออะไร (What Apex is)

Apex คือโปรโตคอลวิศวกรรมที่กำกับดูแลวิธีที่ AI coding agent ปฏิสัมพันธ์กับ codebase:
- **โปรโตคอลการทำงานที่มีระเบียบวินัย (Disciplined Execution Protocol):** แบ่ง tier เจตนาชัดเจน (งานสืบค้น/ตรวจสอบเป็น read-only, งานแก้บั๊กแบบผ่าตัดเฉพาะจุด, งานสร้าง feature ตามสถาปัตยกรรม และ gate ขออนุมัติก่อนทำลายล้างหรือลบข้อมูล) ป้องกันไม่ให้ agent ทำเกินขอบเขต
- **แก้ไขโค้ดแบบผ่าตัดเฉพาะจุด (Surgical Code Modifications):** บังคับใช้ diff ที่เล็กและตรงเป้า (DPR = 1.0) ป้องกันการ drive-by refactor ในไฟล์ที่ไม่เกี่ยวข้อง
- **Strict Seam Binding & Circuit Breaker:** กำหนดระดับความจริง 4 ระดับ (`[Verified: Test]`, `[Verified: Compiler]`, `[Syntax-Only]`, `[Unverified: Visual]`) และหยุดการลองผิดลองถูกวนลูปเมื่อพบความล้มเหลวไม่คาดคิด 2 ครั้งติดกัน
- **ส่งมอบงานด้วยหลักฐานเชิงประจักษ์ (Evidence-First Delivery):** บังคับให้ agent แนบผลลัพธ์คำสั่งและ log การตรวจสอบจริงจาก terminal แทนการอ้างความมั่นใจลอยๆ

## Apex ไม่ใช่อะไร (What Apex is not)

- **ไม่ใช่ Dependency หรือ Runtime Framework ของแอปพลิเคชัน:** Apex ไม่เคยถูก import หรือ deploy เข้าไปใน runtime ของระบบที่คุณสร้าง โปรเจกต์ปลายทางยังคงใช้ dependencies, package manager และ lockfile ของตนเองตามเดิม
- **ไม่ใช่ Autonomous Daemon หรือ CLI แก้โค้ดอัตโนมัติ:** Apex ไม่ได้แก้โค้ดเอง แต่เป็นข้อกำหนดที่บอกให้ AI coding agent (เช่น Antigravity, Cursor, Claude Code, Windsurf) ปฏิบัติตนอย่างไร
- **ไม่ได้มาแทนที่ Git, Unit Tests หรือ Peer Code Review:** กฎเกณฑ์ดั้งเดิมของ repository และการตัดสินใจทางวิศวกรรมของมนุษย์มีความสำคัญสูงสุดเสมอ
- **ไม่จำเป็นต้องพึ่งพา Nexus:** Apex ทำงานแบบ Standalone ได้ 100% โดยไม่ต้องมี memory ภายนอกหรือ MCP server ใดๆ (Nexus เป็นเพียง companion เสริม)

---

## การเปลี่ยนแปลงที่ปลอดภัยระดับ Production (Production-safe changes)

Apex ออกแบบมาสำหรับจังหวะที่ patch ของ agent ต้องใช้งานได้จริงใน repository Production:

| Workflow label | จังหวะที่ควรใช้ | สิ่งที่ Apex บังคับใช้ |
|---|---|---|
| **Patch** | การแก้บั๊กหรือปรับแต่งจุดแคบๆ | ระบุ Root cause, diff แบบผ่าตัด (DPR = 1.0) และตรวจจับ regression เฉพาะจุด |
| **Build** | การสร้าง feature ใหม่หรือเปลี่ยนข้าม layer | Scope ที่ชัดเจน, เคารพ conventions เดิม และตรวจสอบ user journey ที่ได้รับผลกระทบ |
| **Review** | ต้องการรายงานข้อค้นพบโดยไม่แก้โค้ด | หลักฐานแบบ read-only, ผลกระทบ และลำดับความสำคัญที่ลงมือทำได้จริง |
| **Release** | งานที่แตะ Auth, เงิน, ฐานข้อมูล, PII หรือ Contract | ผ่าน gate ตรวจสอบความเสี่ยงเฉพาะด้าน (สิทธิ์, สถานะ, ความเข้ากันได้) |

---

## การสร้างระบบใน v7

สำหรับระบบใหม่หรือ feature ขนาดใหญ่ entry skill เดิมจะโหลด [Build workflow](./skills/apex-core/references/build-workflow.md) เพื่อกำหนดขอบเขต design ที่จำเป็น acceptance criteria และแผนตาม dependencies จากนั้นสร้างและตรวจทีละส่วน ก่อนตรวจ integration และ acceptance ด้วย quality-verify เดิม งานเพิ่มเล็กที่ชัดเจนและเสี่ยงต่ำยังใช้ fast track

เอกสารปรับตามงาน: CLI/API ไม่จำเป็นต้องมี UI design system และโปรเจกต์เล็กใช้แผนเดียวได้ ถามเฉพาะการตัดสินใจสำคัญที่ข้อมูลขาด และเดินหน้าตามสิทธิ์ที่ผู้ใช้อนุญาตแล้ว โดยไม่บังคับ worktree, subagent หรือ approval เพิ่มทุกงาน

### ย้ายจาก v6

- อัปเดต shared checkout หรือ plugin ทั้งชุดรวม reference โดยชื่อ skills ทั้งห้าและการค้นผ่าน skill directory ยังเหมือนเดิม
- ใช้ PRD/design/verification เดิมต่อได้ ไม่ต้องเปลี่ยนชื่อหรือลบเอกสารที่ยังมีประโยชน์
- kernel ไฟล์เดียวใช้เป็นแนวทางพื้นฐานได้ ส่วน Build workflow ฉบับเต็มต้องมี reference และ quality-verify จาก repo นี้ หากไม่มีให้ทำตาม kernel และรายงานข้อจำกัด
- อ่าน [แผนและเหตุผลการย้าย v7](./docs/plans/2026-10-29-apex-v7-build-workflow.md) และ [แผนประเมินผล](./docs/validation-plan.md) การตรวจ packaging และ static walkthrough ยังไม่ยืนยันประสิทธิภาพของ agent หรือ token savings

---

## เริ่มต้นใช้งาน: Single Universal Adoption Mode

Apex v7.0.0 ยุบโหมดติดตั้งเดิมให้เหลือรูปแบบเดียวที่ปราศจากความสับสน:

### 1. Global Reference (แนะนำสำหรับเครื่อง Dev ส่วนตัว)
โคลน Apex-core ไว้ที่เครื่องส่วนกลางเพียงจุดเดียว และลงทะเบียน [`AGENTS.md`](./AGENTS.md) ไว้ใน Global System Prompt หรือ Configuration ของ AI Coding Agent:

```bash
git clone https://github.com/AlmxndBL/Apex-core.git ~/.agents/Apex-core
cd ~/.agents/Apex-core && npm install && npm test
```

*หมายเหตุ:* คำสั่ง `npm install` และ `npm test` ใช้สำหรับการทดสอบความสมบูรณ์ของตัว Framework เท่านั้น ไม่ได้ดัดแปลงหรือติดตั้งอะไรลงในโปรเจกต์งานของคุณ

### 2. Single-File Drop-in (สำหรับแชร์ในทีมหรือ Pin ไว้นอกเครื่อง)
คัดลอกเฉพาะไฟล์ [`AGENTS.md`](./AGENTS.md) (under 6 KB) เพียงไฟล์เดียวไปวางไว้ที่ root ของโปรเจกต์ (เช่นเป็น `AGENTS.md` หรือ `CLAUDE.md`) ตัว Micro-Kernel มีกฎแก่น R0–R4 ครบถ้วนโดยไม่ต้องก๊อปปี้โฟลเดอร์อื่นตามไปด้วย

### ข้อความสั่งงานแรก (First task prompt)

เมื่อ Agent ของคุณรู้จักคำสั่ง Apex แล้ว สามารถสั่งงานได้ตามปกติ หรือใช้เทมเพลตเริ่มต้นนี้:

```text
Use Apex for this task: [อธิบายบั๊ก ฟีเจอร์ หรือการรีวิวที่ต้องการ].

Before changing code, inspect the relevant project conventions and affected flow.
Make the smallest safe change, then report the files changed, verification command,
terminal result, and any behavior that could not be verified.
```

---

## โครงสร้างภายใน Apex (v7.0.0 Directory Blueprint)

- [`AGENTS.md`](./AGENTS.md): Micro-Kernel Operating Protocol ภาษาเป็นกลาง ขนาด ~4.1 KB
- [`core/principles.md`](./core/principles.md): หลักการวิศวกรรมสากล, Server Authority และ OOP Rule of Three
- [`adapters/`](./adapters): Pluggable Modular Stack Adapters สำหรับแต่ละสายงาน:
  - `web-fullstack.md`: Nuxt 4, Next.js 15, Tailwind, Four-State UI, Responsive Data Table
  - `backend-data.md`: Node, Prisma 7, PostgreSQL, OCC, 5s Tx timeout, OOP Patterns
  - `polyglot-core.md`: Python 3.10+ (FastAPI, pytest, mypy), C# .NET 8, Shell/POSIX
- [`rules/`](./rules): ข้อกำหนดวิศวกรรมดั้งเดิม (คงไว้พร้อมลิงก์เชื่อมต่อ Migration สู่ v6.0)
- [`skills/`](./skills): Specialized Skills (`apex-core`, `frontend`, `backend-data`, `quality-verify`, `cartography`)
- [`templates/`](./templates): เทมเพลตสถาปัตยกรรม, DevOps และ Blueprints:
  - `docker/compose.dev.yaml`: PostgreSQL 17 + Redis 7 พร้อม Healthchecks สำหรับ Local Dev
  - `docker/Dockerfile.fullstack`: Production Multi-stage build (Node 22 slim) รันด้วย Non-root user
  - `ci/github-ci.yml`: 4-Stage Fail-Fast CI บน GitHub Actions
  - `blueprints/healthcheck-endpoints.md`: Dual Health Probes (`/api/health/live` & `/ready`)

---

## Apex + Nexus 4 (ตัวเลือกเสริม)

**Apex บอกวิธีทำงานให้ Agent รู้ ส่วน Nexus จดจำสิ่งที่เคยตัดสินใจไว้ในอดีต**

| คำถาม | Apex-core | Nexus 4 |
|---|---|---|
| งานนี้ควรทำอย่างไร? | เจตนา, ขอบเขต, ความปลอดภัย, การตรวจยืนยัน | — |
| ก่อนหน้านี้เคยตัดสินใจอะไรไปแล้วบ้าง? | — | Project brief, ADRs, บทเรียนที่นำกลับมาใช้ใหม่ได้ |
| เกิดอะไรขึ้นหลังจบงาน? | ตรวจสอบและส่งมอบหลักฐานจริง | ส่งมอบ session บันทึกลง Memory (ตัดข้อมูลลับออก) |
| ข้อมูลเก็บไว้ที่ไหน? | คำสั่งและเครื่องมือแบบ Local | Local-first Markdown vault; ไม่มีการอัปโหลดซอร์สโค้ดขึ้นคลาวด์ |

ใช้งาน Nexus เมื่อมี local MCP tool พร้อมใช้งานและงานได้ประโยชน์จากการจำสถานะ:
```text
1. nexus_get_project_brief({ projectId: "apex-core" })
2. ทำตามขั้นตอน Apex: สำรวจ → แก้ไข → ตรวจสอบ
3. nexus_save_session({ project: "apex-core", filesChanged: ["relative/path.ts"] })
```

---

## หลักฐานและข้อจำกัด (Evidence and Limitations)

Apex ยึดหลักการทางวิศวกรรมที่เชื่อถือหลักฐานเชิงประจักษ์มากกว่าคำกล่าวอ้าง ตรวจสอบรายละเอียดทั้งหมดได้ใน [`EVIDENCE.md`](./EVIDENCE.md):

- **ความสมบูรณ์ของตัว Framework (`Verified`):** การรัน `npm test` จะเรียกสคริปต์ตรวจสอบความสมบูรณ์ (`scripts/verify-framework.js`) ซึ่งตรวจสอบโครงสร้าง repo, manifest, กฎ, Adapter, งบประมาณ Token ของ Micro-Kernel และลิงก์เอกสารทั้งหมด (ดูจำนวนจริงจากผลคำสั่ง). การทดสอบนี้ยืนยัน **ความสมบูรณ์ในการแพ็กเกจของตัวโปรโตคอลเท่านั้น** ไม่ได้เป็นการรับประกันผลการเขียนโค้ดของ AI บนซอฟต์แวร์ภายนอก
- **สถิติ Benchmark ในอดีต (`Historical / Unverified`):** เอกสารและงานวิจัยก่อนหน้านี้ใน [Apex-eval](https://github.com/AlmxndBL/Apex-eval) เคยระบุตัวเลข เช่น ลด Token ได้ -58.4% หรือ Pass@1 (100%) ซึ่งตามที่ได้รับการตรวจสอบใน [`EVIDENCE.md`](./EVIDENCE.md) ตัวเลขดังกล่าวมาจากตัวรันแบบจำลอง (Mock Runner: `isMock: true`) ตัวเลขเหล่านี้จึงถือเป็น **หลักฐานทางประวัติศาสตร์ของการรัน Mock** ไม่ใช่ข้อเท็จจริงเชิงประจักษ์บนโค้ดจริง
- **การพิสูจน์การทำงานบน Codebase ของคุณ:** ความแม่นยำและการประหยัด Token ที่แท้จริงขึ้นอยู่กับ codebase เป้าหมาย, โมเดล AI ที่ใช้ และการรีวิวของนักพัฒนา เครื่องวัดผลที่แท้จริงคือร่องรอยการตรวจสอบที่สังเกตได้จริง (คำสั่ง, log การผ่าน test) ที่เกิดขึ้นใน repository ของคุณเอง

---

## คำถามที่พบบ่อย (FAQ)

### Apex เป็น AI Agent หรือเป็น Framework ที่แอปต้องติดตั้งหรือไม่?
ไม่ใช่ทั้งสองอย่าง Apex เป็น Local Operating Protocol สำหรับ AI coding agent ประกอบด้วยคู่มือคำสั่ง, skill เฉพาะทาง, เทมเพลต และตัวตรวจ integrity ไม่มีการติดตั้ง dependency ใดๆ ลงใน runtime แอปของคุณ

### The Rule of Three สำหรับ Design Patterns ใน v7.0.0 คืออะไร?
เป็นกฎป้องกัน Overengineering โดยห้ามใส่ Design Pattern ล่วงหน้า จะนำมาใช้ได้ก็ต่อเมื่อพบความหลากหลายหรือรูปแบบที่แตกต่างกันจริงตั้งแต่ 3 รูปแบบขึ้นไป ($\ge 3$) เท่านั้น (เช่น Strategy, Adapter, State, Facade) โดยแบน Manual Singleton และ Deep Inheritance (>2 ระดับ) เด็ดขาด

### Dual-Speed Environment ทำงานอย่างไร?
รันโค้ด ตัวจัดการแพ็กเกจ (`pnpm`) และคำสั่ง Typecheck บน Windows Host โดยตรงเพื่อความเร็วสูงสุดในการคอมไพล์ใน RAM (1–3 วินาที) และรันเฉพาะ Stateful Services (PostgreSQL 17, Redis 7) ใน Docker Compose (`compose.dev.yaml`) พร้อมระบบตรวจเช็ก Healthcheck
