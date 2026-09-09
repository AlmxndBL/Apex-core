# ⚡ Apex — Production-safe AI Coding Workflow

> **Apex ช่วยให้ AI coding agent เข้าใจงาน แก้เฉพาะจุด ตรวจผลจริง และรายงานหลักฐาน**

Current release: `apex-core@5.5.0`

**[English](README.md) · [ภาษาไทย](README.th.md)**

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

## Apex ไม่ใช่อะไร

- ไม่ใช่ production framework, runtime dependency, AI model หรือสิ่งที่แทน Git/tests/code review
- ไม่ใช่คำสั่งที่แก้ทุก repository ให้อัตโนมัติ
- ไม่ได้บังคับให้ใช้ Nexus — ใช้ Apex แบบ standalone ได้

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

## ความน่าเชื่อถือที่ตรวจดูได้

Apex ไม่ขอให้เชื่อคำประกาศว่า “ทำเสร็จแล้ว” แต่ให้ agent ทิ้งร่องรอยที่ตรวจเองได้:

- outcome ที่ร้องขอและไฟล์ที่เปลี่ยนจริง;
- caller หรือ consumer ที่พิจารณาเมื่อแก้ shared surface;
- risk-specific check ที่เลือกสำหรับ auth, data, contract หรือ user-visible state; และ
- command กับผลลัพธ์ที่ยืนยัน behavior หลังแก้

หลักฐานนี้อยู่ใน repository ของคุณเอง จึงมีประโยชน์กว่าค่า success rate ทั่วไป [Apex-eval](https://github.com/AlmxndBL/Apex-eval) มีไว้สำหรับผู้ที่ต้องการดู evaluation harness, protocol และ telemetry ที่เก็บแยกต่างหาก โดยผลลัพธ์เป็นหลักฐานตามบริบท ไม่ใช่คำรับประกันสำหรับทุก model หรือทุก codebase

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

สำหรับ change ที่ไม่ trivial: files และ consumers ที่ได้รับผล, verification command, terminal result และ risk/failure-path check ที่เกี่ยวข้อง หาก critical behavior ใดทดสอบอย่างปลอดภัยไม่ได้ Apex ต้องระบุข้อจำกัดนั้นแทนการอ้างว่า verified

### มีหลักฐาน benchmark หรือไม่?

มี [Apex-eval](https://github.com/AlmxndBL/Apex-eval) รวม evaluation harness, protocols และ historical artifacts ไว้แล้ว แต่ให้มอง metric ที่เผยแพร่เป็นผลเฉพาะ experiment นั้น ส่วนหลักฐานเชิงปฏิบัติคือ verification evidence ที่เกิดกับ repository ของคุณเอง
