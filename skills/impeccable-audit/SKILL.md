---
name: impeccable-audit
description: Comprehensive Code Review, Web Quality, Accessibility (a11y), and Security Pre-flight Audit Skill
---

# 🔍 Impeccable Quality, Accessibility & Code Audit Skill

> สกิลสำหรับตรวจสอบคุณภาพโค้ด (Code Audit), ความปลอดภัย (Security Review), และความสมบูรณ์ของหน้าจอ (Accessibility & UX Standards) ก่อนส่งมอบงาน

---

## 🎯 เมื่อไหร่ที่ควรใช้ Skill นี้
- เมื่อได้รับคำสั่งให้ "ตรวจโค้ด (Review Code) / Audit ความพร้อมของโปรเจกต์"
- ก่อนสั่ง Build หรือ Deploy โค้ดขึ้น Production
- เมื่อต้องการตรวจสอบความปลอดภัย (OWASP) และความถูกต้องด้าน Accessibility (WCAG 2.1 AA)

---

## 📋 1. UI & Accessibility (a11y) Audit Checklist

- [ ] **Color Contrast:** ตัวอักษรทุกตัวต้องมี Contrast Ratio อย่างน้อย `4.5:1` เทียบกับพื้นหลัง (ตามมาตรฐาน WCAG 2.1 AA)
- [ ] **Semantic Elements:** ใช้ `<main>`, `<nav>`, `<aside>`, `<header>`, `<footer>` แทนการใช้ `<div>` ครอบทั้งหมด
- [ ] **Interactive Elements:**
  - ทุกปุ่มหรือ Icon-only Button ต้องมี `aria-label="คำอธิบาย"`
  - ฟอร์ม Input ต้องมี `<label for="...">` กำกับคู่กันเสมอ
- [ ] **Keyboard Navigation:** ผู้ใช้ต้องสามารถกด `Tab` เพื่อเลื่อน Focus และเห็น Focus Ring (`focus-visible:ring-2`) ชัดเจน

---

## 🛡️ 2. Security & Secrets Leak Audit

- [ ] **Hardcoded Secrets:** ตรวจสอบว่าไม่มี API Keys, Database Connection String หรือ JWT Secret หลุดอยู่ในซอร์สโค้ด
- [ ] **SQL / ORM Injection:** ไม่มี Raw SQL String Concatenation (`$queryRawUnsafe`) โดยไม่ผ่าน Parameterized Query
- [ ] **IDOR Check (Insecure Direct Object Reference):**
  - ในทุก Endpoint แก้ไขข้อมูล ต้องตรวจสอบสิทธิ์ความเป็นเจ้าของ เช่น:
  ```typescript
  // ❌ BAD: ใครส่ง id ไหนมาก็ลบได้
  await prisma.post.delete({ where: { id: req.params.id } })

  // ✅ GOOD: ลบได้เฉพาะโพสต์ของ User ตัวเองเท่านั้น
  await prisma.post.delete({
    where: { id: req.params.id, userId: currentUser.id }
  })
  ```

---

## 🧹 3. Code Smells & Architectural Hygiene

- [ ] **Monolithic Components:** ไฟล์ Component UI ใดๆ ต้องมีความยาวไม่เกิน ~200 บรรทัด (หากเกินให้แยกเป็น Sub-components ในโฟลเดอร์เดียวกัน)
- [ ] **Prop Drilling:** ไม่ส่ง Props ข้าม Component เกิน 2 ชั้น (ให้ใช้ Store หรือ React Context / Vue Provide-Inject แทน)
- [ ] **No Direct DB Calls in UI:** หน้าบ้านต้องไม่เรียก Database หรือ Server Secret Keys ตรงๆ
- [ ] **Swallowed Errors:** ห้ามมี `catch (e) {}` ว่างเปล่าที่กลืน Error ทิ้ง ต้องมี Logger บันทึก Context เสมอ
