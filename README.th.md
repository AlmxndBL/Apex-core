![Apex — Production-safe AI code changes](./assets/social-preview.jpg)
# ⚡ Apex — Production-safe AI Coding Workflow

> **Apex ช่วยให้ AI coding agent เข้าใจงาน แก้เฉพาะจุด ตรวจผลจริง และรายงานหลักฐาน**

Current release: `apex-core@5.5.0`

**[English](README.md) · [ภาษาไทย](README.th.md)**

Apex คือข้อกำหนดและโปรโตคอลการทำงาน (Operating Protocol & Rule Specification) แบบ local สำหรับ AI coding agent เพื่อวางกรอบการทำงานวิศวกรรมที่รัดกุม ตั้งแต่การล็อกเจตนาของงาน (Intent Locking: ตรวจสอบแบบ read-only vs. การแก้เฉพาะจุดแบบ surgical patch vs. การดำเนินการที่มีความเสี่ยงสูงแบบ guarded gate), การตรวจยืนยันผลในหน่วยความจำที่รวดเร็ว (Fast Targeted In-RAM Verification) ไปจนถึงการส่งมอบหลักฐานจริง (Mandatory Evidence Delivery) เมื่อสำรวจ แก้ไข และทดสอบโค้ดใน repository ซอฟต์แวร์จริง

## Apex คืออะไร (What Apex is)

Apex คือโปรโตคอลวิศวกรรมที่กำกับดูแลวิธีที่ AI coding agent ปฏิสัมพันธ์กับ codebase:
- **โปรโตคอลการทำงานที่มีระเบียบวินัย (Disciplined Execution Protocol):** แบ่ง tier เจตนาชัดเจน (งานสืบค้น/ตรวจสอบเป็น read-only, งานแก้บั๊กแบบผ่าตัดเฉพาะจุด, งานสร้าง feature ตามสถาปัตยกรรม และ gate ขออนุมัติก่อนทำลายล้างหรือลบข้อมูล) ป้องกันไม่ให้ agent ทำเกินขอบเขต
- **การแก้ไขโค้ดเฉพาะจุดที่จำเป็น (Surgical Code Modifications):** บังคับใช้ diff ที่แคบที่สุดตรงจุดบกพร่อง ห้าม refactor โค้ดหรือแก้สไตล์ไฟล์อื่นโดยไม่จำเป็น
- **เครื่องมือตรวจยืนยันและระบบตัดวงจร (Verification Engine & Circuit Breaker):** แนะนำการตรวจ typecheck และ test ที่ตรงจุดตาม stack ของโปรเจกต์ และหยุดลูปการ retry แบบเดาสุ่มทันทีที่ verification ล้มเหลวติดต่อกัน 2 ครั้ง
- **การส่งมอบงานด้วยหลักฐานเชิงประจักษ์ (Evidence-First Delivery):** กำหนดให้ agent รายงานผลลัพธ์ของคำสั่ง terminal และบันทึกการรัน test จริง แทนการอ้างความมั่นใจลอยๆ

## Apex ไม่ใช่อะไร (What Apex is not)

- **ไม่ใช่ runtime dependency หรือ framework ของแอปพลิเคชัน:** ไม่มีการติดตั้ง Apex เป็น dependency ในโค้ดโปรดักชันของแอป โปรเจกต์เป้าหมายยังคงใช้ `package.json`, lockfile และไลบรารีของตัวเองอย่างสมบูรณ์
- **ไม่ใช่ CLI อัตโนมัติหรือ background daemon ที่แอบแก้โค้ดเอง:** Apex ไม่ได้แก้ไฟล์ด้วยตัวเอง แต่เป็นชุดคู่มือและกฎที่ส่งมอบให้ AI coding agent (เช่น Antigravity, Cursor, Claude Code, Windsurf) นำไปปฏิบัติตาม
- **ไม่ใช่สิ่งที่จะมาแทนที่ Git, unit tests หรือการทำ code review ของมนุษย์:** Convention เดิมของทีมและคำสั่งของวิศวกรมนุษย์มีความสำคัญสูงสุดเสมอ
- **ไม่ได้บังคับใช้ร่วมกับ Nexus:** Apex ทำงานแบบ standalone ได้อย่างสมบูรณ์โดยไม่ต้องมี Nexus โดย Nexus เป็นเพียง memory companion เสริม (optional) เท่านั้น

## Production-safe change ไม่ใช่แค่โค้ดที่ดูเหมือนใช้ได้

Apex เหมาะกับจังหวะที่ patch ของ agent ต้องอยู่รอดใน repository จริง: แก้ให้แคบตาม convention ของโปรเจกต์ ตรวจ failure path ที่สำคัญ และทิ้งหลักฐานแทนการบอกว่า “น่าจะเสร็จแล้ว”

workflow ต่อไปนี้เป็นชื่อเรียกตามลักษณะงาน ไม่ใช่คำสั่งแยกต่างหาก Apex เลือกแนวทางที่เหมาะสมจาก intent และความเสี่ยงของ task

| Workflow label | ใช้เมื่อ | สิ่งที่ Apex ยืนยัน |
|---|---|---|
| **Patch** | แก้บั๊กหรือปรับเฉพาะจุด | root cause, surgical diff และ regression check ที่ตรงจุด |
| **Build** | เพิ่ม feature หรือเปลี่ยนข้ามหลาย layer | scope ที่ชัด, convention เดิม และ user path ที่ได้รับผลกระทบ |
| **Review** | ต้องการข้อค้นพบโดยไม่แก้โค้ด | หลักฐานแบบ read-only, impact และลำดับความสำคัญที่ลงมือทำได้ |
| **Release** | เกี่ยวกับ auth, เงิน, database, PII หรือ shared contract | gate ด้าน authorization, state, compatibility และ verification ตามความเสี่ยง |

### ความต่างในห้านาที

```text
ไม่มี delivery protocol
  “Endpoint ใช้ได้แล้ว” → response เป็น 200 แต่ผู้ใช้ที่ไม่มีสิทธิ์ยังแก้ record ของ tenant อื่นได้

ใช้ Apex
  trace consumer และ mutation path → validate input → enforce server-side scope
  → ทดสอบ forbidden path → รายงาน command และผลลัพธ์
```

เป้าหมายไม่ใช่เพิ่มพิธีการ แต่คือ change ที่เล็กที่สุดซึ่ง **ครบ ปลอดภัยตามบริบท และตรวจพิสูจน์ได้**

## Apex ช่วยอะไร

AI เขียนโค้ดได้เร็ว แต่ก็อาจตีความงานผิด แก้กว้างเกินจำเป็น retry ซ้ำ หรือบอกว่าเสร็จโดยไม่มีหลักฐาน Apex ทำให้ทุกงานมี workflow เดียวกัน:

```text
เข้าใจงาน → ดู convention เดิม → แก้เท่าที่จำเป็น → ตรวจผล → รายงานหลักฐาน
```

- งาน review/audit เป็น read-only
- งานแก้ทำ diagnose → surgical change → targeted verification
- งาน destructive ต้องสรุป blast radius และขออนุมัติ
- verification fail แบบไม่คาดคิด 2 ครั้ง จะหยุด retry อัตโนมัติและรายงาน root cause

## เริ่มใช้งาน

### รูปแบบที่ 1: Point — แนะนำ

เก็บ Apex checkout เดียว แล้วเชื่อม instructions/skills เข้ากับ coding agent

```bash
git clone https://github.com/AlmxndBL/Apex-core.git ~/.agents/Apex-core
cd ~/.agents/Apex-core && npm install
```

ใช้วิธีเชื่อม instructions หรือ skills ตามปกติของ coding agent ที่คุณเลือก เพื่อให้ agent เข้าถึง checkout นี้ `npm install` มีไว้สำหรับรัน integrity check ของ Apex เท่านั้น ไม่ได้แก้ target project และไม่ได้เปิดใช้ Apex ให้อัตโนมัติ

### รูปแบบที่ 2: Vendor — ให้โปรเจกต์พกกฎเอง

คัดลอก [`AGENTS.md`](./AGENTS.md) เข้า repository ที่ต้องการ pin กฎ และคัดลอก `rules/`, `skills/`, `templates/` เพิ่มเมื่อจำเป็น

```bash
cp AGENTS.md CLAUDE.md
```

คำสั่งข้างต้นเหมาะกับ agent ที่อ่าน `CLAUDE.md` สำหรับ agent อื่น ให้วาง `AGENTS.md` ในตำแหน่ง instruction ที่ tool นั้นรองรับ โปรเจกต์เป้าหมายยังใช้ dependencies, lockfile และ package manager เดิม Apex แค่กำหนดวิธีที่ agent สำรวจ แก้ และตรวจงาน

### Prompt แรกสำหรับเริ่มใช้

หลังจาก agent เข้าถึง instructions ของ Apex แล้ว ให้ส่ง task ตามปกติ สำหรับครั้งแรกสามารถคัดลอก prompt นี้แล้วแทนข้อความในวงเล็บ:

```text
Use Apex for this task: [อธิบาย bug, feature หรือ review ที่ต้องการ]

ก่อนแก้โค้ด ให้ดู convention ที่เกี่ยวข้องและ flow ที่ได้รับผลกระทบ
แก้เฉพาะส่วนที่เล็กที่สุดซึ่งปลอดภัย จากนั้นรายงาน files changed, verification command,
terminal result และ behavior ที่ยังตรวจยืนยันไม่ได้
```

## Apex + Nexus 4 — ใช้ร่วมกันเมื่อจำเป็น

**Apex บอก agent ว่าควรทำงานอย่างไร ส่วน Nexus จดจำสิ่งที่งานก่อนหน้ารู้และตัดสินใจไว้**

| คำถาม | Apex-core | Nexus 4 |
|---|---|---|
| งานนี้ควรทำอย่างไร | intent, scope, safety, verification | — |
| เคยตัดสินใจอะไรไว้ | — | project brief, ADR, lessons learned |
| งานจบแล้วทำอะไร | verify และรายงาน evidence | optional redacted session handoff |
| ข้อมูลอยู่ที่ไหน | local instructions/tools | local-first Markdown vault; ไม่ upload source/cloud โดย default |

เรียก Nexus เฉพาะเมื่อ local MCP พร้อมและงานได้ประโยชน์จาก memory:

```text
1. nexus_get_project_brief({ projectId: "apex-core" })
2. ทำ discovery → implementation → verification ตาม Apex
3. nexus_save_session({ project: "apex-core", filesChanged: ["relative/path.ts"] })
```

ห้ามบันทึก source code, `.env`, credentials, token หรือ raw terminal transcript เข้า Nexus เพราะ Nexus เป็น optional local memory companion ไม่ใช่ที่เก็บ source code

## ภายในมีอะไร

- [`AGENTS.md`](./AGENTS.md): operating contract และ safety gates
- [`rules/`](./rules): security, architecture, code quality, database, UI, testing
- [`skills/`](./skills): frontend, backend-data, verification, cartography
- [`templates/`](./templates): UI, blueprint และ context templates

Convention ที่มีอยู่ใน repository มาก่อนเสมอ หากยังไม่มี Apex มีค่าเริ่มต้นตาม stack เช่น `vue-tsc --noEmit`, `tsc --noEmit`, `pytest -q` หรือ `go test`

## หลักฐานและข้อจำกัด (Evidence and limitations)

Apex ยึดหลักการความโปร่งใสและปฏิเสธคำอวดอ้างที่ไม่มีหลักฐานเชิงประจักษ์ สามารถตรวจสอบทะเบียนหลักฐานและผลการตรวจสอบทั้งหมดได้ที่ [`EVIDENCE.md`](./EVIDENCE.md)

- **ความสมบูรณ์ของ Repository และ Protocol (`Verified`):** การรัน `npm test` (ผ่าน `scripts/verify-framework.js`) เป็นการตรวจความสมบูรณ์ของโครงสร้าง repository, manifest, ความสอดคล้องของกฎ และลิงก์ภายใน (ผ่าน 98/98 checks) ซึ่ง **พิสูจน์เฉพาะ integrity ของ protocol ในตัว Apex-core เท่านั้น** ไม่ใช่การวัดหรือรับประกันความสามารถทั่วไปของ coding agent ในการแก้ปัญหาซอฟต์แวร์ในงานจริง
- **ตัวเลข Benchmark ในอดีต (`Historical / Unverified`):** เอกสารและชุดทดสอบในอดีตบน [Apex-eval](https://github.com/AlmxndBL/Apex-eval) เคยอ้างอิงตัวเลขเช่น **ประหยัด token -58.4%**, **100% Pass@1**, **Mean Turns = 1.00** หรือการประเมิน **150 live trajectories** บนชุดงาน $N = 50$ งาน จากการตรวจสอบอย่างละเอียดใน [`EVIDENCE.md`](./EVIDENCE.md) พบว่าข้อมูลดิบในไฟล์ผลลัพธ์ (`live-agent-results.json`) ถูกสร้างขึ้นจากระบบจำลอง (Mock Runner: `isMock: true` บน `mock-engine`) ซึ่งใช้วิธีนำเฉลยที่เตรียมไว้มาใส่ลงใน workspace ดังนั้น ตัวเลขเหล่านี้เป็น **Historical artifacts จาก mock execution** ไม่ใช่ข้อเท็จจริงเชิงประจักษ์ (empirical fact) และไม่ใช่ผลจากการรัน live agent บนโมเดลภายนอกในสถานการณ์จริง
- **หลักฐานเชิงปฏิบัติบน Codebase ของคุณ:** ประสิทธิผลจริงขึ้นอยู่กับโมเดล, ขนาดของบริบท, convention ของ codebase และการตรวจทานของนักพัฒนา หลักฐานที่แท้จริงคือร่องรอยการตรวจสอบในโปรเจกต์ของคุณเอง (terminal output, targeted test results และ failure-path checks)

## คำถามที่พบบ่อย

### Apex คือ coding agent หรือ framework ที่แอปต้องรันหรือไม่?

ไม่ใช่ทั้งคู่ Apex คือ operating protocol แบบ local สำหรับ coding agent ประกอบด้วย instructions, skills, templates และ integrity checks โดยไม่เพิ่ม runtime dependency ให้แอปที่คุณกำลังสร้าง

### Patch, Build, Review และ Release เป็นคำสั่งที่ต้องติดตั้งเพิ่มหรือไม่?

ไม่ใช่ เป็นชื่อเรียกวิธีที่ Apex ตีความงาน: bug fix แบบแคบ, feature, การประเมินแบบ read-only หรือการส่งมอบงานที่มีความเสี่ยงสูง agent จะเลือกแนวทางจากคำขอโดยไม่ต้องมี command surface เพิ่ม

### Apex ต่างจาก prompt ที่บอกให้ agent ทำงานรอบคอบอย่างไร?

Apex เปลี่ยนความ “รอบคอบ” ให้เป็น workflow ที่ตรวจได้: แยกงานสืบค้นแบบ read-only ออกจากการแก้จริง, ปรับระดับแผนและ safeguards ตามความเสี่ยง, ต้องมี targeted verification และหยุด retry แบบเดาสุ่มหลัง fail ที่ไม่คาดคิดสองครั้ง

### Apex ทำให้งานเล็กช้าหรือมีขั้นตอนมากเกินไปหรือไม่?

ไม่ งานเล็กและความเสี่ยงต่ำใช้ fast path: ดู convention ที่เกี่ยวข้อง, แก้เท่าที่จำเป็น และรัน check ที่เล็กที่สุดซึ่งมองเห็น behavior นั้น งานที่ต้องวางแผนหนักขึ้นคือ change ที่มี blast radius ใหญ่ หรือเกี่ยวกับ auth, เงิน, durable state, database หรือ shared contract

### ต้องใช้ Nexus พร้อม Apex หรือไม่?

ไม่ต้อง Apex ทำงาน standalone ได้ Nexus เป็น local memory companion แบบ optional สำหรับ project brief, durable decision และ session handoff ไม่ใช่ที่เก็บ source code

### Apex แทน tests, code review หรือ convention ของทีมได้หรือไม่?

ไม่ได้ Convention ที่มีอยู่ใน repository มาก่อนเสมอ Apex ช่วยให้ agent เลือกและรัน check ที่ตรงกับโปรเจกต์, สร้างหลักฐานสำหรับ review และไม่ถือว่า happy path ที่ผ่านแล้วแปลว่า change ปลอดภัย

### หลังแก้โค้ดแล้ว ควรได้รับหลักฐานอะไร?

สำหรับ change ที่ไม่ trivial: files และ consumers ที่ได้รับผล, verification command, terminal result และ risk/failure-path check ที่เกี่ยวข้อง หาก critical behavior ใดทดสอบอย่างปลอดภัยไม่ได้ Apex ต้องระบุข้อจำกัดนั้นแทนการอ้างว่า verified โดยสามารถดูมาตรฐานการจัดประเภทหลักฐานได้ใน [`EVIDENCE.md`](./EVIDENCE.md)

### มีหลักฐาน benchmark หรือไม่?

ชุดทดสอบในอดีตและ evaluation harness ถูกแยกเก็บไว้ใน [Apex-eval](https://github.com/AlmxndBL/Apex-eval) โดยตามที่ระบุไว้ใน [`EVIDENCE.md`](./EVIDENCE.md) ตัวเลข benchmark เช่น ประหยัด token -58.4% หรือ 100% Pass@1 เป็นผลที่ได้จาก mock harness (`isMock: true`) ไม่ใช่การทดสอบ live agent จึงจัดอยู่ในสถานะ Unverified/Historical ส่วนการทดสอบเดียวที่ verified ใน repo นี้คือ `npm test` (framework integrity) สำหรับการใช้งานจริง หลักฐานเชิงปฏิบัติคือ terminal verification evidence ที่รันจริงบน codebase ของคุณเอง
