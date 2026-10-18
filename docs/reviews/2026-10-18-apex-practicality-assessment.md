# ประเมิน Apex-core: ใช้จริงโดยไม่เพิ่มภาระเกินจำเป็น

วันที่: 2026-10-18
ขอบเขต: ตรวจเอกสารและกติกาใน workspace แบบ read-only; ไม่ประเมินพฤติกรรมของ agent ด้วย benchmark

## ข้อสรุป

Apex-core มีโครงสร้างที่เหมาะกับการใช้เป็นมาตรฐานกลาง: `AGENTS.md` เป็น entry point สั้น, โหลด adapter ตาม stack, มี fast track สำหรับงานเล็ก, และกำหนดหลักฐานการตรวจให้รายงานตรงตามจริง แนวทางนี้ควรเก็บไว้

จุดเสี่ยงต่อการใช้งานจริงไม่ใช่การขาดกฎจำนวนมาก แต่เป็น **ขั้นตอนกำกับที่หนักเกินสำหรับงานปรับกฎ** และ **รายละเอียดสำคัญด้าน SQL Injection/PDPA ที่ยังไม่อยู่ใน adapter หลัก** แนะนำแก้เฉพาะจุดเหล่านี้ ไม่เพิ่ม skill หรือ checklist ชุดใหม่

## สิ่งที่ควรเก็บไว้

- Kernel จำกัดไว้ที่ R0–R4 และมีทางลัดสำหรับการแก้ 1–3 ไฟล์: [AGENTS.md](../../AGENTS.md)
- แยกคำแนะนำตาม stack ช่วยเลี่ยงการโหลดบริบทที่ไม่เกี่ยวข้อง: [skills/apex-core/SKILL.md](../../skills/apex-core/SKILL.md)
- การรายงานระดับ verification แยก test, compiler, syntax และ visual อย่างชัดเจน: [skills/quality-verify/SKILL.md](../../skills/quality-verify/SKILL.md)
- ชุด `scripts/verify-framework.js` เหมาะเป็น integrity/smoke check สำหรับไฟล์สำคัญและลิงก์เอกสาร แต่ตรวจด้วย assertions ของข้อความและการมีอยู่ของไฟล์เป็นหลัก จึงไม่พิสูจน์ว่ากฎถูกทำตามจริง

## จุดที่ควรปรับก่อน

1. **ลดแรงเสียดทานของ governance:** [docs/protocol-governance.md](../protocol-governance.md) บังคับ incident จริงอย่างน้อย 3 กรณีและ shadow benchmark 5 งานก่อนเพิ่มกฎ (หัวข้อ 2–3) เกณฑ์นี้เหมาะกับการเปลี่ยน core ใหญ่ แต่หนักเกินไปสำหรับการแก้คำกำกวม/แก้ช่องว่างความปลอดภัยใน domain adapter ควรคงการทบทวน non-redundancy และ fast-path impact ไว้ แล้วใช้หลักฐานระดับงานจริงตามความเสี่ยงแทนการกำหนดจำนวนตายตัว
2. **ใส่ SQL Injection ในจุดที่ถูกโหลดจริง:** [rules/04-database-design.md](../../rules/04-database-design.md) มีเพียงข้อห้ามต่อ SQL string แบบกว้าง ๆ ขณะที่ [adapters/backend-data.md](../../adapters/backend-data.md) และ [adapters/polyglot-core.md](../../adapters/polyglot-core.md) ยังไม่ระบุการ bind parameters, การใช้ raw-query API อย่างปลอดภัย, หรือการ allowlist ชื่อ table/column/order ที่ bind เป็นค่าไม่ได้ ควรเพิ่มคำแนะนำสั้นใน adapter เดิม ไม่สร้าง adapter ใหม่
3. **ทำให้ข้อมูลส่วนบุคคลเป็น lifecycle rule แบบบาง:** [rules/01-security-auth.md](../../rules/01-security-auth.md) และ [rules/06-testing-devops.md](../../rules/06-testing-devops.md) มี masking, ลดการเปิดเผยใน response และห้าม log PII แล้ว แต่ยังไม่ชี้เรื่องเก็บเท่าที่จำเป็น, retention/deletion, คำขอใช้สิทธิ, และการส่งต่อเหตุข้อมูลรั่วไหล ควรระบุหลักวิศวกรรมสั้น ๆ และให้ระบบ/องค์กรกำหนดรายละเอียดตามบริบท แทนการทำ checklist กฎหมายเต็มชุดใน Apex
4. **ซิงก์ version labels:** root manifest เป็น 6.1.0 แต่ entry skill และ adapter headers ยังกล่าวถึง v6.0 (`skills/apex-core/SKILL.md`, `adapters/backend-data.md`, `adapters/polyglot-core.md`) ซึ่งทำให้ผู้อ่านไม่แน่ใจว่าเป็นเนื้อหาเก่าหรือเพียง label ที่ไม่อัปเดต

## ยังไม่แนะนำให้เพิ่ม

- ไม่เพิ่มกฎสากลใหม่ใน `AGENTS.md` สำหรับ SQLi หรือ PDPA; วางไว้ใน adapter/rule ของ security/database ที่ตรงงาน
- ไม่บังคับ consent, DPO, หรือข้อสรุปทางกฎหมายแบบเดียวกับทุกโปรเจกต์ เพราะฐานประมวลผลและหน้าที่ขึ้นกับบริบท
- ไม่เพิ่ม plan/RFC/benchmark สำหรับการแก้ข้อความหรือช่องว่างเฉพาะ adapter
- ไม่เพิ่ม assertion ที่ตรวจเพียงว่ามีคำว่า “SQL Injection/PDPA” แล้วนับว่าปลอดภัย; ให้ integrity suite ตรวจโครงสร้าง/เวอร์ชัน ส่วนพฤติกรรมต้องใช้ targeted tests ในโปรเจกต์ที่มี query หรือข้อมูลจริง

## ลำดับดำเนินการที่แนะนำ

1. แก้ version labels ที่ล้าสมัย
2. เพิ่มข้อกำหนด SQL parameterization/allowlist ใน adapter เดิม
3. เพิ่ม privacy lifecycle baseline สั้น ๆ ใน security/backend guidance
4. ปรับ governance ให้ยืดหยุ่นตามระดับการเปลี่ยนแปลง แล้วค่อยวัดผลจากงานจริง

**ระดับความมั่นใจ:** สูงสำหรับสิ่งที่พบในเอกสารและ verifier; ยังไม่มีข้อมูล benchmark หรือ log การใช้งานเพียงพอจะสรุปว่า agent ทำตามกฎเหล่านี้ได้สม่ำเสมอในทุกโปรเจกต์

## สถานะหลังลงมือ

ข้อเสนอทั้ง 4 ข้อถูกนำไปปรับใน workspace แล้ว: ปรับ governance ตามความเสี่ยง, เพิ่ม SQL/ข้อมูลส่วนบุคคลในกฎและ adapter เดิม, แก้การเลือก adapter ตาม stack, และซิงก์เวอร์ชันเอกสาร/manifest เป็น 6.1.0 ชุดตรวจหลังแก้ผ่าน 115/115 checks
