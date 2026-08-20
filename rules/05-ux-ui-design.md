# 05. UX/UI & Frontend Development Standards

> **Priority 5:** มาตรฐานการพัฒนาส่วนหน้าบ้าน สถาปัตยกรรม Component และการออกแบบ UI ระดับ Production-Ready
> แบ่งออกเป็น **2 ส่วนหลัก:** 
> 1. **Universal Foundation (กฎเหล็กที่ทุกเว็บต้องปฏิบัติตาม)**
> 2. **Contextual UI Archetype Presets (เลือก Preset ให้ตรงกับประเภทเว็บ)**

---

# 🌐 PART 1: Universal Frontend Foundation (กฎสากลสำหรับทุกเว็บ)

ไม่ว่าจะเป็นเว็บประเภทใด ทุกโปรเจกต์ต้องยึดมาตรฐานความปลอดภัย สถาปัตยกรรม และการคำนวณเหล่านี้ร่วมกัน:

## 🏗️ 1. Component Architecture & Layering Rules
จัดแบ่ง Component ออกเป็น **4 ชั้นอย่างเคร่งครัด**:
1. `layouts/`: **App Frames** (Sidebar, Navbar, Header Shell, App Shell)
2. `pages/` หรือ `views/`: **Route Entry Components** (หน้าที่ผูกกับ URL)
3. `features/` หรือ `components/<domain>/`: **Feature Domain Modules** (เช่น `features/cart/`, `features/analytics/`)
4. `components/ui/`: **Atomic / Dumb Components** ไร้ Business Logic (Button, Modal, Input, Badge, Toolbar)

### 🚫 Strict Component Red-Lines
- ❌ **No Monolithic Component:** ห้ามสร้างไฟล์ UI เดียวเกิน **200-250 บรรทัด** ให้ย่อยเป็น Sub-components
- ❌ **No Hardcoded Mobile-Only Shells (Responsive Breakpoint Guard):** ห้ามใช้ Container Class แบบจำกัดความกว้างตายตัว (`max-w-sm`, `max-w-md`, `max-w-lg`) ใน App Shell Layout หรือ Shared View โดยไม่มีคลาส Responsive ขยายสำหรับ Desktop (`lg:max-w-6xl` หรือ `w-full`) ป้องกันจอคอมโบ๋ตรงกลาง
- ❌ **No Prop Drilling > 2 Levels:** หากส่ง Props ลึกเกิน 2 ชั้น ให้ใช้ State Store (Pinia/Zustand), Context หรือ Slot แทน
- ❌ **No Direct API Calls in UI Layer:** ห้ามเรียก API ตรงใน Atomic UI Components ให้ผ่าน Composables / Custom Hooks / Service Layer เสมอ
- ❌ **No Self-Referencing Recursion:** ตรวจสอบการ Import ตัวเองเพื่อป้องกัน Infinite Loop
- ❌ **No Raw Browser Alerts:** ห้ามใช้ `alert()`, `confirm()` หรือ `prompt()` เด็ดขาด ให้ใช้ Toast System หรือ Custom Modal Component เสมอ

---

## 🇹🇭 2. Thai-First & Regional Conventions

1. **Typography:**
   - Font Family: `'Prompt', sans-serif` หรือ `'IBM Plex Sans Thai'` สำหรับทุก UI Surface
   - Weight Hierarchy: 400 (Regular body), 500 (Medium table/label), 600 (Semibold headers/prices), 700 (Bold titles)
   - **Thai Typography Bounding Box & Headroom (กฎเหล็ก):** 
     - สำหรับ Display Headlines / Hero Text ขนาดใหญ่ (`text-3xl+` หรือ $\ge 32\text{px}$) **ต้องแยกแต่ละบรรทัดเป็น Discrete Block (`<div>`)** ร่วมกับ `leading-relaxed` (1.625x) และ `space-y-4 sm:space-y-6` เสมอ
     - ❌ **ห้ามใช้ `leading-snug`, `leading-tight`, หรือ `leading-none`** กับข้อความภาษาไทยที่มีการขึ้นบรรทัดใหม่ด้วย `<span>` เด็ดขาด เพื่อป้องกันสระล่าง (Descenders: `ู`, `ุ`) ชนกับสระบนและวรรณยุกต์ (Ascenders: `ใ`, `ไ`, `่`, `้`)
     - ❌ **ห้ามสุ่มแก้สระชนด้วยการใส่ Margin เล็กๆ เช่น `mt-[7px]`** โดยไม่แยก Block Container
2. **Calendar & Years:**
   - ปี พ.ศ. (Buddhist Era): ใช้สูตร `BE = CE + 543` ในการแสดงผล DatePicker และรายงาน
   - Timezone: บังคับใช้ `Asia/Bangkok` (UTC+7) เสมอ
3. **Currency & Numeric Formats:**
   - เครื่องหมายบาท `฿` นำหน้าตัวเลข และจัดตัวเลขด้วย CSS `tabular-nums` เพื่อให้หลักตัวเลขตรงกันเสมอในตาราง

---

## 📐 3. Mathematical Precision & Strict CSS Scale Check

- ❌ **Zero Guesswork:** ห้ามเดาคลาส Tailwind ที่ไม่มีในสเกลมาตรฐาน (เช่น `w-13`, `w-5.5`, `h-5.5`) เพราะเบราว์เซอร์จะตีความเป็น `width: auto` ทำให้ Thumb หรือ Icon บิดเบี้ยวเป็นทรงรี (Oval Distortion)
- ✅ **Thumb Geometry Lock:** สวิตช์/ปุ่มเลื่อนต้องล็อก `w-X h-X aspect-square shrink-0 rounded-full` เสมอ
- ✅ **สูตรคำนวณระยะการเลื่อน (Translate Math Formula):**
  $$\text{Translate Distance} = \text{Track Width} - (2 \times \text{Padding}) - \text{Thumb Width}$$
  *ตัวอย่าง:* Track `w-12` (48px) + Pad `p-0.5` (2px) + Thumb `w-5` (20px) $\rightarrow 48 - 4 - 20 = 24\text{px} \rightarrow \mathbf{translate\text{-}x\text{-}6}$

---
---

# 🎛️ PART 2: Contextual UI Archetype Presets (เลือกตามประเภทเว็บ)

Agent ต้องประเมินและเลือก Preset ให้ตรงกับประเภทของโปรเจกต์ก่อนเริ่มเขียนโค้ด ห้ามนำสไตล์ของระบบ Dashboard ไปใช้กับ Landing Page หรือเว็บอ่านบทความเด็ดขาด:

```
                               เลือกประเภทโปรเจกต์ (Project Type)
                                              │
         ┌────────────────────────────────────┼────────────────────────────────────┐
         ▼                                    ▼                                    ▼
📊 Preset A: Operational & Admin      🚀 Preset B: Marketing & Landing     📖 Preset C: Editorial & Docs
(ความหนาแน่นสูง, ตาราง, POS, ERP)     (Whitespace โปร่ง, Hero Story, แสงเงา)  (เน้นการอ่าน, Single Column, TOC)
```

---

## 📊 PRESET A: Operational Dashboard, Backoffice & POS Systems

> **เหมาะสำหรับ:** ERP, Admin Panels, หอพัก/โรงแรม, คลินิก, POS, Stock & Inventory, Accounting

### 1. Spacing & Density (Shopee-Dense Pattern)
- Page Padding: `p-2 sm:p-6`
- Flex/Grid Gap: `gap-2` ถึง `gap-4`
- Card Internal Padding: `p-3 sm:p-4`
- Border Radius: `--ui-radius: 0.25rem` (เน้น `rounded-md` ถึง `rounded-lg` เพื่อความคมกระชับสไตล์ Enterprise)
- Surface Contrast: พื้นหลังระบบ `bg-neutral-100 / bg-slate-50` (Dark: `bg-neutral-950`), การ์ดคอนเทนต์ลอยตัว `bg-white` (Dark: `bg-zinc-900`), ขอบบาง `border border-default/30`

### 2. Dual Responsive Strategy สำหรับ Data Listings (กฎเหล็ก)
- **Desktop View ($\ge 768\text{px}$):** `<UTable>` (TanStack Table) พร้อม Sticky Header, Multi-row Checkbox, Column Sorting (`h()` renderers), และ Action Buttons ขวาสุด
- **Mobile View ($< 768\text{px}$):** แสดงเป็น **Compact Touch Card List** ทันที ห้ามปล่อยตารางเลื่อนแนวนอนดิบๆ

### 3. 2-Tier Header & Toolbar Navigation
- **Tier 1 (Navbar):** Sidebar Collapse Button + ชื่อหน้า + ปุ่ม Refresh + Export/Import + ปุ่ม Action หลัก (`+ สร้าง`)
- **Tier 2 (Toolbar):** DateRangePicker ปี พ.ศ. พร้อม Quick Presets (7 วัน, 30 วัน, 1 ปี) + Search Input + Filter Dropdowns

### 4. POS & Catalog Workspace
- Layout 2 คอลัมน์ (แคตตาล็อกสินค้าซ้าย + แผงชำระเงินขวา)
- Mouse Gestures: คลิกซ้าย (+ เพิ่ม), คลิกขวา (- ลด/ลบ)
- Customer Switch: สมาชิก vs ลูกค้าทั่วไป (ไม่ระบุ)

### 5. Charts & Data Visualizations (`@unovis/vue`)
- Cashflow Dual Chart: กราฟ Area + Line ซ้อน 2 เส้น รายรับ (`#10b981`) vs รายจ่าย (`#f59e0b`)
- Grouped Bar Chart + Responsive Wrapper (`useElementSize`)

---

## 🚀 PRESET B: Marketing, SaaS Landing Pages & Product Showcases

> **เหมาะสำหรับ:** หน้าแรกของระบบ, Landing Page ขายสินค้า/บริการ, Portfolio, Corporate Website, Web App Showcase

### 1. Spacing & Visual Hierarchy (Generous Whitespace & Breathing Room)
- Section Vertical Padding: `py-16 sm:py-24 lg:py-32` (ให้พื้นที่สายตาได้พัก)
- Max Container Width: `max-w-5xl` ถึง `max-w-7xl` พร้อมจัดกึ่งกลาง (`mx-auto px-4 sm:px-8`)
- Spacing ระหว่างหัวข้อและคำอธิบาย: `space-y-4 sm:space-y-6`

### 2. Hero Section Storytelling
- Headline ทรงพลัง: ใช้ขนาดใหญ่ `text-3xl sm:text-5xl md:text-6xl font-black` พร้อมสีข้อความคอนทราสต์สูงและ Gradient Accent Text
- Subtle Ambient Glow: เพิ่มแสงเรืองรองนุ่มๆ ด้านหลัง Hero (`blur-3xl opacity-20 to opacity-40`) เพื่อสร้างมิติ
- Frictionless CTA Group: ปุ่ม Action หลักขนาดใหญ่ เด่นชัด (`px-8 py-3.5 rounded-full shadow-lg`) คู่กับ Secondary Link

### 3. Feature Showcase (Bento Grid Pattern)
- จัดเรียงฟีเจอร์ด้วย **Bento Grid** ที่มีขนาดการ์ดไม่เท่ากันเพื่อสร้างความน่าสนใจ (เช่น การ์ดเด่น 2 คอลัมน์ + การ์ดย่อย 1 คอลัมน์)
- การ์ดต้องมีไอคอนเวกเตอร์ขนาดใหญ่, Microcopy คมคาย, และภาพ Preview ระบบจริง

### 4. Social Proof & Trust Signals
- แถบสถิติ/ตัวเลขความสำเร็จ (Metrics Counter เช่น *"ดูแลผู้พักอาศัยกว่า 1,000+ ห้อง"*)
- การ์ดรีวิวผู้ใช้งาน (Testimonial Cards) และ Security/Compliance Badges

---

## 📖 PRESET C: Editorial, Content Hubs & Documentation

> **เหมาะสำหรับ:** บล็อกบทความ, คู่มือการใช้งาน (Docs), ฐานความรู้ (Knowledge Base), นิตยสารออนไลน์

### 1. Reading Focus & Typography Rhythm
- Reading Column Constraint: ล็อกความกว้างข้อความที่ `max-w-prose` (ประมาณ 65–75 ตัวอักษรต่อบรรทัด หรือ `max-w-2xl sm:max-w-3xl`) เพื่อไม่ให้สายตาล้าจากการกวาดอ่านกว้างเกินไป
- Line Height สำหรับเนื้อหา: บังคับใช้ `leading-relaxed` (1.625) ถึง `leading-loose` (2.0)
- Paragraph Spacing: `my-4` ถึง `my-6`

### 2. Navigation & Reading Tools
- Sticky Table of Contents (TOC) ประจำบทความ ด้านขวาบน Desktop เพื่อบอกหัวข้อปัจจุบันตาม Scroll Position
- Search Bar ค้นหาเนื้อหาแบบ Instant Fuzzy Search
- Breadcrumbs Navigation บอกตำแหน่งหมวดหมู่ชัดเจน

### 3. Code & Media Formatting
- Code Blocks พร้อมปุ่ม Copy 1-Click และ Syntax Highlighting คอนทราสต์สบายตา
- ภาพประกอบต้องมี Caption คำอธิบายสั้นๆ ด้านล่าง (`text-xs text-slate-400 text-center mt-2`)
