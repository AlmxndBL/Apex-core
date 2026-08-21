---
name: design-taste-frontend
description: High-end Enterprise Frontend UI, Aesthetic Taste & Operational Dashboard Skill (Shopee Dense Rhythm, Dual Responsive Tables, Unovis Visualizations, POS Catalogs, Thai Conventions, Micro-Interactions, 3 UI Archetype Presets)
---

# 🎨 Frontend Visual Design & Enterprise UI Skill

> สกิลระดับสูงสำหรับการสร้างสรรค์ User Interface ระดับ Production-Ready ครอบคลุมทั้ง Aesthetics, High-Density Operational Dashboard, POS Workspace, Marketing Landing Pages, และ Dual Responsive Data Listings

---

## 🎯 1. เลือกระบบ UI Archetype Preset ให้ตรงกับงาน (กฎข้อแรกก่อนเริ่มทำ UI)

ก่อนลงมือเขียน Component ต้องประเมินและเลือกใช้สไตล์ให้ตรงตามประเภทของหน้าจอ:

| Preset | ประเภทงาน | สไตล์ Spacing & Typography | กฎที่ต้องเน้น |
|---|---|---|---|
| **📊 Preset A: Operational & Admin** | Dashboard, POS, ERP, ระบบหอพัก, จัดการสต็อก | **Shopee-Dense:** `p-2 sm:p-6`, `gap-2` ถึง `gap-4`, ขอบคม `rounded-md` | Dual Responsive (Table vs Mobile Card), 2-Tier Header Navbar/Toolbar |
| **🚀 Preset B: Marketing & Landing** | หน้าแรกของระบบ, Landing Page ขายของ, Portfolio | **Generous Whitespace:** `py-16 sm:py-24`, `max-w-6xl mx-auto`, แสงเงา Glow | Hero Storytelling, Bento Grid ฟีเจอร์, Frictionless CTA |
| **📖 Preset C: Editorial & Docs** | บทความ, คู่มือการใช้งาน (Docs), Knowledge Hub | **Prose Focus:** `max-w-prose`, `leading-relaxed/loose`, `my-4` | Sticky TOC ด้านขวา, Breadcrumbs, Instant Search Bar |

---

## 📚 2. Specialized Blueprint References (คู่มือโค้ดเฉพาะทาง)

เมื่อต้องลงมือเขียน Component หรือหน้าจอเฉพาะด้าน ให้อ่าน Reference Modules ประกอบ:

| หมวดหมู่ | ไฟล์ Reference | สิ่งที่บรรจุอยู่ภายใน |
| :--- | :--- | :--- |
| **🧭 โครงสร้าง App Shell & Sidebar** | [`templates/blueprints/responsive-enterprise-sidebar.md`](file:///C:/Users/Admin/Desktop/work/Apex-core/templates/blueprints/responsive-enterprise-sidebar.md) | **Apex Signature Universal Sidebar:** Desktop Collapse (`w-64`/`w-20`) พร้อม Floating Button, Mobile Drawer, 3-Tier Flexbox, Upward Profile Popover (ใช้ได้กับทุกประเภทงาน: Admin, Portal, SaaS, Workspace) |
| **📊 ตาราง & รายการข้อมูล** | [`references/tables-and-lists.md`](file:///C:/Users/Admin/Desktop/work/Apex-core/skills/design-taste-frontend/references/tables-and-lists.md) | **Enterprise Compact Data Table:** Capsule Toolbar, Filter Tabs, Smart Search, Multi-select Checkbox, Financial Currency Mono, Floating Bulk Action Bar (`AppFloatingBulkBar.vue`) |
| **📈 ชาร์ต & สถิติ** | [`references/charts-and-visualizations.md`](file:///C:/Users/Admin/Desktop/work/Apex-core/skills/design-taste-frontend/references/charts-and-visualizations.md) | `@unovis/vue` Cashflow Area/Line, Grouped Bar, DateRangePicker ปี พ.ศ. |
| **🛒 ระบบขายหน้าร้าน** | [`references/pos-and-catalog.md`](file:///C:/Users/Admin/Desktop/work/Apex-core/skills/design-taste-frontend/references/pos-and-catalog.md) | 2-Column POS Layout, Catalog Card (Left/Right Click Gestures), Customer Mode Switch |
| **🧩 โมดอล & คอนโทรล & ฟอร์ม** | [`references/components-and-modals.md`](file:///C:/Users/Admin/Desktop/work/Apex-core/skills/design-taste-frontend/references/components-and-modals.md) | `ConfirmModal`, `PhotoUpload`, Zod Form Validation (`UForm`), Accessible Icon Buttons |

---

## 🎨 3. Color Theory & Palette Curation (กฎ 60-30-10)

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

## 🔤 4. Typography & Thai Conventions

- **Fonts:** แนะนำ `'Prompt', sans-serif` หรือ `'IBM Plex Sans Thai'` สำหรับระบบที่เน้นภาษาไทย
- **Weights:** 400 (Body), 500 (Labels/Table cells), 600 (Semibold headers/numbers), 700 (Bold titles)
- **Thai Typography Headroom:** ข้อความ Display/Headlines ขนาดใหญ่ (`text-3xl+`) ต้องแยก Discrete Block `<div>` + `leading-relaxed` + `space-y-4` เสมอ ห้ามใช้ `leading-snug` ซ้อน `<span>`
- **Numbers:** บังคับใส่ CSS class `tabular-nums` ทุกครั้งที่แสดงตัวเลขทางการเงิน เพื่อให้หลักตัวเลขตรงกัน
- **Years & Time:** แสดงผลปี พ.ศ. (`BE = CE + 543`) ในส่วนรายงานและ UI ของผู้ใช้ไทย

---

## ✨ 5. Micro-Interactions, Switches & Geometry Math

- **Switch & Slider Math Formula:** $\text{Translate} = \text{Track} - (2 \times \text{Padding}) - \text{Thumb}$ พร้อมล็อก `w-X h-X aspect-square shrink-0 rounded-full` ห้ามเดาคลาสที่ไม่มีใน Tailwind Scale (`w-13`, `w-5.5`)
- **Interactive Hover & Active:**
  - ปุ่ม: `hover:brightness-105 active:scale-[0.98]`
  - การ์ด: `hover:border-default/50 dark:hover:bg-elevated/70 transition duration-150`
- **Subtle Glassmorphism:**
  - ใช้ `bg-default/80 backdrop-blur-sm` สำหรับ Sidebar และ Header ลอยตัว
- **Rounded Corners:**
  - ใช้ `--ui-radius: 0.25rem` (เน้น `rounded-md` ถึง `rounded-lg` สม่ำเสมอกัน)

---

## 🚫 6. Forbidden Cliché Design Tropes (ข้อห้ามเด็ดขาด)

1. ❌ **ห้ามปล่อยให้ Table Scroll แนวนอนดิบๆ บนจอมือถือ** (ต้องสลับเป็น Mobile Card List เสมอ)
2. ❌ **ห้ามนำสไตล์ Shopee-Dense Spacing ไปยัดเยียดใส่หน้า Marketing/Landing Page หรือ Docs**
3. ❌ **ห้ามใช้ `alert()`, `confirm()` จากบราวเซอร์** (ต้องใช้ Toast System หรือ `ConfirmModal`)
4. ❌ **ห้ามใช้สีนีออนเรืองแสง / Purple on Pitch Black**
5. ❌ **ห้าม Gradient ข้อความทุกคำที่เป็นคีย์เวิร์ด**
6. ❌ **ห้ามทำการ์ดแบนราบไร้เส้นขอบบางๆ (Subtle Border)**
