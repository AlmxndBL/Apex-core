---
name: design-taste-frontend
description: High-end Enterprise Frontend UI, Aesthetic Taste & Operational Dashboard Skill (Shopee Dense Rhythm, Dual Responsive Tables, Unovis Visualizations, POS Catalogs, Thai Conventions, Micro-Interactions)
---

# 🎨 Frontend Visual Design & Enterprise UI Skill

> สกิลระดับสูงสำหรับการสร้างสรรค์ User Interface ระดับ Production-Ready ครอบคลุมทั้ง Aesthetics, High-Density Operational Dashboard, POS Workspace และ Dual Responsive Data Listings

---

## 🎯 เมื่อไหร่ที่ควรใช้ Skill นี้
- เมื่อเริ่มออกแบบหน้าจอใหม่ (Admin Panel, SaaS Dashboard, POS Interface, หรือ Mobile App Views)
- เมื่อต้องสร้างหรือปรับปรุงระบบตารางข้อมูล (Tables / Data Lists) ให้รองรับทั้ง Desktop และ Mobile
- เมื่อต้องเพิ่มกราฟสถิติ/การเงิน (Unovis Charts) หรือแถบเครื่องมือช่วงเวลา (DateRangePicker พ.ศ.)
- เมื่อได้รับคำสั่งให้ "ปรับ UI ให้ดูพรีเมียม สวยงาม น่าใช้ อ่านง่าย และใช้งานได้จริง"

---

## 📚 1. Specialized Blueprint References (คู่มือโค้ดเฉพาะทาง)

เมื่อต้องลงมือเขียน Component หรือหน้าจอเฉพาะด้าน ให้อ่าน Reference Modules ประกอบ:

| หมวดหมู่ | ไฟล์ Reference | สิ่งที่บรรจุอยู่ภายใน |
| :--- | :--- | :--- |
| **ตาราง & รายการข้อมูล** | [`references/tables-and-lists.md`](file:///C:/Users/Admin/Desktop/work/Apex-core/skills/design-taste-frontend/references/tables-and-lists.md) | `<UTable>` TanStack, Sticky Header, Mobile Card List, `AdminListToolbar`, Skeletons |
| **ชาร์ต & สถิติ** | [`references/charts-and-visualizations.md`](file:///C:/Users/Admin/Desktop/work/Apex-core/skills/design-taste-frontend/references/charts-and-visualizations.md) | `@unovis/vue` Cashflow Area/Line, Grouped Bar, DateRangePicker ปี พ.ศ. |
| **ระบบขายหน้าร้าน** | [`references/pos-and-catalog.md`](file:///C:/Users/Admin/Desktop/work/Apex-core/skills/design-taste-frontend/references/pos-and-catalog.md) | 2-Column POS Layout, Catalog Card (Left/Right Click Gestures), Customer Mode Switch |
| **โมดอล & คอนโทรล** | [`references/components-and-modals.md`](file:///C:/Users/Admin/Desktop/work/Apex-core/skills/design-taste-frontend/references/components-and-modals.md) | `ConfirmModal` (Colored icons), `PhotoUpload` (Direct Camera Capture), LINE Buttons |

---

## 🎨 2. Color Theory & Palette Curation (กฎ 60-30-10)

อย่าใช้สี Random หรือสีพื้นฐานทื่อๆ (เช่น แดงล้วน `#FF0000`, น้ำเงินล้วน `#0000FF`) ให้ใช้ชุดสีที่ผ่านการเกลี่ยโทน:
- **60% Dominant Color (สีหลัก):** พื้นหลังที่สะอาดตา (Light: `neutral-100 / slate-50`, Dark: `neutral-950 / zinc-950`)
- **30% Secondary Color (สีรอง):** กล่อง Card, Sidebar, หรือ Surface Element (`bg-default` / `bg-elevated/55`)
- **10% Accent Color (สีเน้น):** ปุ่ม Action หลัก, สถานะ Active หรือ Badges (เช่น `sky-500`, `emerald-500`, `amber-500`)

### 🌓 Semantic Palette Guide:
- **Success:** Emerald / Jade (ชำระแล้ว, เปิดใช้งาน, กำไร)
- **Warning:** Amber / Ochre (รอดำเนินการ, รอชำระเงิน, ค่าใช้จ่าย)
- **Error:** Rose / Crimson (ยกเลิก, ค้างชำระ, ปุ่มอันตราย)
- **Info / Primary:** Sky / Indigo / Zinc

---

## 🔤 3. Typography & Thai Conventions

- **Fonts:** แนะนำ `'Prompt', sans-serif` หรือ `'IBM Plex Sans Thai'` สำหรับระบบที่เน้นภาษาไทย
- **Weights:** 400 (Body), 500 (Labels/Table cells), 600 (Semibold headers/numbers), 700 (Bold titles)
- **Numbers:** บังคับใส่ CSS class `tabular-nums` ทุกครั้งที่แสดงตัวเลขทางการเงิน เพื่อให้หลักตัวเลขตรงกัน
- **Years & Time:** แสดงผลปี พ.ศ. (`BE = CE + 543`) ในส่วนรายงานและ UI ของผู้ใช้ไทย

---

## ✨ 4. Micro-Interactions & Depth

- **Interactive Hover & Active:**
  - ปุ่ม: `hover:brightness-105 active:scale-[0.98]`
  - การ์ด: `hover:border-default/50 dark:hover:bg-elevated/70 transition duration-150`
- **Subtle Glassmorphism:**
  - ใช้ `bg-default/80 backdrop-blur-sm` สำหรับ Sidebar และ Header ลอยตัว
- **Rounded Corners:**
  - ใช้ `--ui-radius: 0.25rem` (เน้น `rounded-md` ถึง `rounded-lg` สม่ำเสมอกัน)

---

## 🚫 5. Forbidden Cliché Design Tropes (ข้อห้ามเด็ดขาด)

1. ❌ **ห้ามปล่อยให้ Table Scroll แนวนอนดิบๆ บนจอมือถือ** (ต้องสลับเป็น Mobile Card List เสมอ)
2. ❌ **ห้ามใช้ `alert()`, `confirm()` จากบราวเซอร์** (ต้องใช้ `useToast()` หรือ `ConfirmModal`)
3. ❌ **ห้ามใช้สีนีออนเรืองแสง / Purple on Pitch Black**
4. ❌ **ห้าม Gradient ข้อความทุกคำที่เป็นคีย์เวิร์ด**
5. ❌ **ห้ามทำการ์ดแบนราบไร้เส้นขอบบางๆ (Subtle Border)**
