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
- [ ] **Client-Side Env Leaks:** ตรวจสอบว่าไม่มี Server Secrets หลุดไปในตัวแปร Prefix หน้าบ้าน (`NEXT_PUBLIC_*`, `NUXT_PUBLIC_*`, `VITE_*`)
- [ ] **Gitignore & Secrets Gate:** ตรวจสอบว่า `.gitignore` มีการ ignore `.env`, `.env.*`, `*.pem`, `*.key` และไม่มีไฟล์ `.env` ค้างอยู่ใน Git Staging
- [ ] **AI Artifacts Quarantine:** ตรวจสอบว่า `.system_generated/`, `.gemini/`, `brain/` หรือไฟล์ internal AI ไม่ถูก commit เข้า repo ของโปรเจกต์
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

## 🧹 3. Code Smells & Cleanliness Checklist

- [ ] **Monolithic Components:** ไฟล์ Component UI ใดๆ ต้องมีความยาวไม่เกิน ~200 บรรทัด (หากเกินให้แยกเป็น Sub-components ในโฟลเดอร์เดียวกัน)
- [ ] **Prop Drilling:** ไม่ส่ง Props ข้าม Component เกิน 2 ชั้น (ให้ใช้ Store หรือ React Context / Vue Provide-Inject แทน)
- [ ] **No Direct DB Calls in UI:** หน้าบ้านต้องไม่เรียก Database หรือ Server Secret Keys ตรงๆ
- [ ] **Swallowed Errors:** ห้ามมี `catch (e) {}` ว่างเปล่าที่กลืน Error ทิ้ง ต้องมี Logger บันทึก Context เสมอ

---

## 🏛️ 4. Dual-Baseline Architectural & Debt Audit (เกณฑ์วินิจฉัยสถาปัตยกรรม)

> [!IMPORTANT]
> **Dual-Baseline Rule (ห้ามตัดสินตาม Taste ส่วนตัว):** Agent จะต้องตัดสินว่าโค้ดผิดปกติหรือมีหนี้ทางเทคนิค โดยเทียบกับ **2 ฐานข้อมูลเท่านั้น**:
> 1. **Framework Documented Conventions:** กฎและ Lifecycle ทางการของ Framework (เช่น Nuxt 4, Next.js 15, Prisma)
> 2. **Project's Dominant Patterns:** รูปแบบหลักที่โปรเจกต์เขียนอยู่เดิม (เช่น 9 ใน 10 ไฟล์ทำแบบ A แต่มี 1 ไฟล์ทำแบบ B $\rightarrow$ Drift)

### 4 มิติการตรวจสอบหนี้และรอยรั่วทางสถาปัตยกรรม:
1. **Architecture Debt:** โค้ดทางลัด (HACK/Workarounds) ที่กลายเป็นถาวร, Hidden Coupling, ขาด Quality Gate
2. **Separation of Concerns & Leaky Boundaries:** ขอบเขตหน้าที่รั่วไหล (เช่น UI คำนวณ Business Logic ซับซ้อนเอง, Composable ยิง Database ตรง)
3. **Framework Convention Drift:** โค้ดที่ฝืนธรรมชาติ Framework (เช่น บายพาสระบบ Auto-imports, ละเลย Server/Client Boundary, Re-invent ฟีเจอร์ที่มีอยู่แล้ว)
4. **Flow Conflicts & Circular Dependencies:** มี 2 Source of Truth ใน State เดียวกัน, มี Circular Dependency ข้ามโมดูล, หรือมี Dead Code ที่เข้าไม่ถึง

---

## 📄 5. Standard Finding Structure & Reader-First Reporting

เมื่อพบข้อบกพร่องทางสถาปัตยกรรม ให้บันทึกตามโครงสร้างนี้เสมอ:
- **Evidence:** ระบุไฟล์และบรรทัดที่พบจริง `[Direct]`
- **Impact:** อธิบายผลกระทบต่อระบบ (ทำไมถึงอันตราย, อะไรจะพัง หรือทำให้การขยายระบบยากขึ้น)
- **Severity:** `Critical` (กระทบความถูกต้อง/ระบบพัง), `High` (เสี่ยงต่อความปลอดภัย/ขยายยาก), `Medium` (หนี้สะสม), `Low` (ข้อสังเกต)
- **Smallest Safe Correction:** เสนอแนวทางแก้ที่เล็กที่สุดและปลอดภัยที่สุด (ห้ามเสนอแผนรื้อทำใหม่ทั้งระบบโดยไม่จำเป็น)

### Reader-First Report Format (รายงานแบบผู้อ่านเป็นศูนย์กลาง):
- **Layer 1 — Synthesis (3-5 บรรทัด):** สรุปเฉพาะ Critical / High Findings + Primary Recommendation ทันที
- **Layer 2 — Detail on Demand:** แสดง Checklist รายละเอียดย่อย, Code Snippets, และข้อปรับปรุงระดับ Medium/Low เมื่อผู้ใช้ต้องการเจาะลึก

