---
name: context-budget
description: Context Window Optimization & Token Diet Skill (Preventing Context Window Bloat, Selective Retrieval, Bounded Tool Use, and Proactive Session Checkpoints)
---

# 📉 Context Budget & Token Diet Skill

> สกิลควบคุมการใช้บริบท (Context Window Management) เพื่อป้องกัน Context Overload, ลดค่าใช้จ่าย Token, และรักษาความแม่นยำของ AI Agent ไม่ให้เกิดอาการหลอน (Hallucination) หรือลืมข้อกำหนด

---

## 🎯 เมื่อไหร่ที่ควรใช้ Skill นี้
- เมื่อต้องค้นหาข้อมูลในโปรเจกต์ขนาดใหญ่ที่มีหลายร้อยไฟล์
- เมื่อต้องอ่านไฟล์ที่มีขนาดยาวเกิน 300 บรรทัด
- เมื่อเซสชันมีการโต้ตอบต่อเนื่องหลายรอบ (Deep Turn Session) และเริ่มเข้าใกล้ข้อจำกัด Context Window

---

## 🪓 1. Selective Retrieval Policy (อ่านเฉพาะจุด ห้ามเททั้งไฟล์)

* ❌ **BAD:** ใช้ `view_file` อ่านไฟล์ 2,000 บรรทัดทั้งหมดในครั้งเดียว หรือ dump ไฟล์ทั้งโฟลเดอร์
* ✅ **GOOD:** 
  1. ใช้ `grep_search` หรือ `find_by_name` เพื่อหาชื่อฟังก์ชันหรือบรรทัดเป้าหมายก่อน
  2. ใช้ `view_file` พร้อมระบุ `StartLine` และ `EndLine` สั้นๆ (ไม่เกิน 150-200 บรรทัดต่อครั้ง)
  3. สแกนสารบัญ (`_Index.md` หรือ `AI-Context-Index.md`) แทนการสแกนทุกโฟลเดอร์

---

## 🗜️ 2. Anti-Output Bloat (หลีกเลี่ยง Terminal Output ขยะ)

* ❌ **BAD:** รันคำสั่งที่มี Log ละเอียดยิบ (เช่น `npm test` แบบ verbose, `cat` log file ใหญ่ๆ)
* ✅ **GOOD:**
  - รันการตรวจสอบแบบ Fast Check ใน RAM: `npx tsc --noEmit` หรือ `npx vue-tsc --noEmit`
  - รัน Test เฉพาะไฟล์เป้าหมาย: `npx vitest run path/to/test.spec.ts`
  - ใช้ Option กรอง Output เมื่อรัน Shell Commands เพื่อไม่ให้ Token เต็มหน้าจอ

---

## 🔄 3. Proactive Session Handoff (แตกเซสชันเมื่อเริ่มล้า)

* **สัญญาณเตือน Context Bloat:**
  - เซสชันมีการคุยโต้ตอบเกิน 15-20 Turn
  - มีการลองแก้ปัญหาล้มเหลวติดต่อกัน
  - โมเดลเริ่มตอบหลุดจาก Red Lines หรือลืม Assumptions ที่ตกลงไว้ใน Step 1
* **Action:**
  1. บันทึก Session Handoff ลงใน `Nexus/Templates/session-handoff.md` หรือเรียก `nexus_save_session`
  2. ระบุ Progress Checkpoint และ Success Criteria ที่ค้างอยู่
  3. แจ้งผู้ใช้ว่าแนะนำให้เริ่ม Turn/Session ใหม่พร้อมแนบลิงก์ Handoff เพื่อความสดของ Context

---

## 🧭 4. Dynamic Unmounting Signal

เมื่อจบ Step 4 (Verification) และผ่าน Universal DoD เรียบร้อยแล้ว:
* ให้ปลด Context/Skill ชั่วคราวออกทันที
* ไม่เก็บ Memory ก้อนใหญ่ที่จบ Task ไปแล้วค้างไว้ในรอบถัดไป
