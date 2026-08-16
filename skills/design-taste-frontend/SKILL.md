---
name: design-taste-frontend
description: High-end Frontend UI & Visual Design Skill (Harmonious HSL Palettes, Typography, Micro-animations, Mobile-first Layouts, Glassmorphism, and Anti-Cliché Rules)
---

# 🎨 Frontend Visual Design & Aesthetic Taste Skill

> สกิลระดับสูงสำหรับการสร้างสรรค์และตกแต่ง User Interface ให้ดูพรีเมียม สวยงาม ทันสมัย และมีเอกลักษณ์ระดับ World-Class

---

## 🎯 เมื่อไหร่ที่ควรใช้ Skill นี้
- เมื่อเริ่มออกแบบหน้าจอใหม่ (Landing Page, SaaS Dashboard, หรือ POS Interface)
- เมื่อได้รับคำสั่งให้ "ปรับ UI ให้ดูพรีเมียม สวยงาม น่าใช้ ไม่เชย"
- เมื่อต้องการคุมโทนสี Typography และ Spacing ให้เป็นไปตามมาตรฐานการออกแบบระดับสูง

---

## 🎨 1. Color Theory & Palette Curation (กฎ 60-30-10)

อย่าใช้สี Random หรือสีพื้นฐานทื่อๆ (เช่น แดงล้วน `#FF0000`, น้ำเงินล้วน `#0000FF`) ให้ใช้ชุดสีที่ผ่านการเกลี่ยโทน:
- **60% Dominant Color (สีหลัก):** พื้นหลังที่สะอาดตา (Light: `slate-50 / zinc-50`, Dark: `zinc-950 / slate-900`)
- **30% Secondary Color (สีรอง):** กล่อง Card, Sidebar, หรือ Surface Element ที่มี Contrast ชัดเจน
- **10% Accent Color (สีเน้น):** ปุ่ม Action หลัก, สถานะ Active หรือ Badges (เช่น `emerald-600`, `indigo-600`, `violet-600`)

### 🌓 Semantic Palette Guide:
- **Success:** Emerald / Jade (หลีกเลี่ยงเขียวสะท้อนแสง)
- **Warning:** Amber / Ochre (หลีกเลี่ยงเหลืองนีออน)
- **Error:** Rose / Crimson (หลีกเลี่ยงแดงสด generic)
- **Info / Primary:** Indigo / Slate Blue / Zinc

---

## 🔤 2. Typography & Letter-Spacing (ความประณีตของตัวอักษร)

- **Headings (`h1`, `h2`, `h3`):**
  - ใช้ `font-semibold` หรือ `font-bold`
  - กำหนด `tracking-tight` (Letter-spacing แคบลงเล็กน้อย) เพื่อให้หัวข้อดูแน่นและคม
- **Body Text (`p`, `span`):**
  - ใช้ `text-slate-600` (Light mode) หรือ `text-zinc-400` (Dark mode) สำหรับข้อความอธิบาย เพื่อสร้าง Visual Hierarchy
  - กำหนด `leading-relaxed` (Line-height สบายตา)
- **Fonts Recommendation:**
  - UI / Dashboard: **Inter**, **Plus Jakarta Sans**, หรือ **IBM Plex Sans Thai** (สำหรับภาษาไทย)
  - Editorial / High-end: **Outfit**, **Cabinet Grotesk**, หรือ **Geist**

---

## ✨ 3. Micro-Interactions & Depth (ความลื่นไหลและมิติ)

- **Interactive Hover & Active:**
  - ปุ่มและ Card ต้องมี `transition-all duration-200 ease-out`
  - ปุ่ม: `hover:brightness-105 active:scale-[0.98]`
  - Card: `hover:-translate-y-0.5 hover:shadow-md border border-slate-200/80 dark:border-zinc-800`
- **Subtle Glassmorphism:**
  - ใช้ `bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md` สำหรับ Navbar / Header ลอยตัว
- **Rounded Corners:**
  - ใช้ `rounded-xl` หรือ `rounded-2xl` สม่ำเสมอกันทั้งโปรเจกต์ (หลีกเลี่ยงการปนเหลี่ยมจัดกับโค้งจัด)

---

## 🚫 4. Forbidden Cliché Design Tropes (ข้อห้าม UI เชยๆ)

ห้ามใช้ลวดลายเชยๆ ต่อไปนี้โดยเด็ดขาด:
1. ❌ **No Purple on Dark:** ตัวอักษรสีม่วงนีออนเรืองแสงบนพื้นหลังสีดำสนิท
2. ❌ **No Colored Glowing Outlines:** กรอบเส้นขอบเรืองแสงไฟนีออนรอบปุ่ม
3. ❌ **No Gradient Keywords:** การใส่ CSS Gradient ตัวหนังสือสีรุ้งในทุกคำที่เป็น Keyword
4. ❌ **No Textureless Surfaces:** กล่องคอนเทนเนอร์แบนราบที่ไม่มีเส้นขอบบางๆ (Subtle Border) หรือเงาเบาๆ
5. ❌ **No Over-Nested Cards:** การนำการ์ดมนๆ ไปซ้อนในการ์ดมนๆ ซ้ำกันเกิน 2 ชั้น
