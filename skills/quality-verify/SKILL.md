---
name: quality-verify
description: Fast In-Memory Verification Engine, Vitest / Sandbox Testing, 2-Strike Loop-Breaker, and Evidence Delivery
---

# Quality Verification & Fast Test Engine Skill

> สกิลควบคุมการทดสอบและพิสูจน์ความถูกต้องของโค้ด (Universal Definition of Done) เน้นความเร็วสูงใน RAM (1-3 วินาที) และระบบป้องกัน Loop บั๊ก

---

## 1. Tiered Verification Strategy (Fast In-Memory First)

* [FORBIDDEN] **ห้ามรัน Full Build (`npm run build` / `next build` / `nuxt build`)** ทุกครั้งที่แก้โค้ดเล็กๆ เพราะเสียเวลาโดยใช่เหตุ
* [STANDARD] **Fast In-Memory TypeCheck (1-3 วินาที):**
  * **Nuxt / Vue 3:** `npx vue-tsc --noEmit`
  * **React / Next.js:** `npx tsc --noEmit`
* [STANDARD] **Targeted Logic Test:** รันเทสต์เฉพาะไฟล์ที่แก้ไข (`npx vitest run path/to/test.spec.ts`)

---

## 2. Mandatory Evidence Delivery (No Evidence = Not Done)

* ห้ามรายงานว่างานเสร็จสิ้นหากไม่มีหลักฐาน **Terminal Output Logs** แนบมาด้วย
* รูปแบบการส่งมอบ:
  ```text
  [Files Changed] -> [Verification Command] -> [Terminal Result: 0 errors]
  ```

---

## 3. The 2-Strike Loop Breaker

ควบคุมกระบวนการกู้คืนสถานะเมื่อเกิด Error:
1. **ครั้งที่ 1 (Surgical Fix):** วิเคราะห์ Root Cause และทดลองแก้เฉพาะจุดได้ 1 ครั้ง
2. **ครั้งที่ 2 (Auto-Rollback & Halt):** หากยังไม่ผ่าน ให้ **Rollback ไฟล์กลับสู่สถานะก่อนแก้ทันที** ป้องกัน Dirty State
3. **Report:** สรุป 2 ทางที่ลองแล้วไม่ได้ผล พร้อมแนบ Error Logs แล้วหยุดรอคำตัดสินใจจากผู้ใช้ทันที ห้ามวนลูปเดาสุ่ม
