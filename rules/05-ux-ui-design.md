# 05. UX/UI & Frontend Development Standards

> **Priority 5:** มาตรฐานการพัฒนาส่วนหน้าบ้าน สถาปัตยกรรม Component และการออกแบบ UI ระดับ Enterprise & Operational Dashboard
> Primary Supported Stacks: Nuxt 4 (Nitro + Nuxt UI v3/v4 + Vue 3) & React (Next.js / Vite + Shadcn UI + Tailwind CSS)

---

## 🏗️ 1. Component Architecture & Layering Rules
จัดแบ่ง Component ออกเป็น **4 ชั้นอย่างเคร่งครัด**:
1. `layouts/`: **App Frames** (Sidebar, Navbar, Header Shell, App Shell)
2. `pages/` หรือ `views/`: **Route Entry Components** (หน้าที่ผูกกับ URL)
3. `features/` หรือ `components/<domain>/`: **Feature Domain Modules** (เช่น `features/cart/`, `features/analytics/`)
4. `components/ui/`: **Atomic / Dumb Components** ไร้ Business Logic (Button, Modal, Input, Badge, Toolbar)

### 🚫 Strict Component Red-Lines
- ❌ **No Monolithic Component:** ห้ามสร้างไฟล์ UI เดียวเกิน **200-250 บรรทัด** ให้ย่อยเป็น Sub-components
- ❌ **No Prop Drilling > 2 Levels:** หากส่ง Props ลึกเกิน 2 ชั้น ให้ใช้ State Store (Pinia/Zustand), Context หรือ Slot แทน
- ❌ **No Direct API Calls in UI Layer:** ห้ามเรียก API ตรงใน Atomic UI Components ให้ผ่าน Composables / Custom Hooks / Service Layer เสมอ
- ❌ **No Self-Referencing Recursion:** ตรวจสอบการ Import ตัวเองเพื่อป้องกัน Infinite Loop
- ❌ **No Raw Browser Alerts:** ห้ามใช้ `alert()`, `confirm()` หรือ `prompt()` เด็ดขาด ให้ใช้ `useToast()` / `useNotify()` หรือ Custom Modal Component เสมอ

---

## 🎛️ 2. Operational Rhythm & Surface Design (Shopee-Dense Pattern)

สำหรับระบบ Dashboard, Admin Panel, POS และ Management Systems ให้ยึดหลัก **High Information Density** ที่อ่านง่ายและสบายตา:

### 1. Spacing & Rhythm
- Page Container Padding: `p-2 sm:p-6`
- Flex/Grid Spacing: `gap-2` ถึง `gap-4`
- Card Internal Padding: `p-3 sm:p-4`
- Border Radius: `--ui-radius: 0.25rem` (เน้น `rounded-md` ถึง `rounded-lg` เพื่อความคมกระชับสไตล์ Enterprise)

### 2. Surface Contrast Hierarchy
- **Page Background:** สีพื้นหลังระบบที่สบายตา (Light: `bg-neutral-100 / bg-slate-50`, Dark: `bg-neutral-950 / bg-zinc-950`)
- **Card / Panel Surfaces:** กล่องคอนเทนต์ต้อง "ลอยเด่น" เหนือพื้นหลัง (Light: `bg-white / bg-default`, Dark: `bg-elevated/55 / bg-zinc-900`)
- **Subtle Borders:** ใช้เส้นขอบบางๆ เพื่อสร้างโครงร่าง (`border border-default/30 dark:border-default/20`)

---

## 📊 3. Dual Responsive Strategy สำหรับ Data Listings (กฎเหล็ก)

ทุกหน้าจอที่มีการแสดงผลรายการข้อมูล (Tables / Lists) **ต้องรองรับ 2 มุมมองเสมอ ห้ามปล่อยให้ Table เลื่อนแนวนอนดิบๆ บนมือถือ**:

```
📱 Mobile (< 768px)       💻 Desktop (≥ 768px)
┌──────────────────────┐  ┌──────────────────────────────────────────────┐
│ [Icon] Item Name     │  │ [x] | Name      | Category | Status | Action  │
│ Status: Active       │  │──────────────────────────────────────────────│
│ Price: ฿1,200   [...]│  │ [ ] | Product A  | Food     | Active | [Edit]  │
└──────────────────────┘  │ [ ] | Product B  | Drink    | Active | [Edit]  │
                          └──────────────────────────────────────────────┘
```

1. **Desktop View (`hidden md:block`):**
   - ใช้ `<UTable>` ร่วมกับ TanStack Table
   - มี **Sticky Header** ลอยอยู่ด้านบนเสมอขณะ Scroll
   - รองรับ Multi-row Checkbox Selection, Column Sorting (`h()` renderers), Badge Status, และ Action Buttons ขวาสุด
2. **Mobile View (`space-y-1 md:hidden`):**
   - แสดงเป็น **Compact Touch Card List**
   - มี Icon / Avatar ประจำหมวดหมู่, ชื่องาน/สินค้า, Badge สถานะ, ราคา/จำนวนที่เด่นชัด, และ Action Button แบบสัมผัสง่าย

---

## 🧭 4. 2-Tier Header & Navigation Layout Rhythm

หน้าจอการทำงานหลัก (Admin / Workspace / Member Panel) ต้องจัด Layout Header เป็น 2 ชั้นอย่างเป็นระเบียบ:

1. **Tier 1: Page Navigation Bar (`<UDashboardNavbar>`)**
   - ด้านซ้าย: ปุ่ม Sidebar Collapse (`<UDashboardSidebarCollapse>`) + ไอคอนและชื่อหน้า (`title`)
   - ด้านขวา: ปุ่มรีเฟรชข้อมูล (`Refresh`), ปุ่ม Export/Import, และปุ่ม Action หลัก (`+ สร้างรายการใหม่`)
2. **Tier 2: Filter & Period Toolbar (`<UDashboardToolbar>`)**
   - DateRangePicker รองรับการเลือกช่วงเวลาแบบปี พ.ศ. พร้อม Quick Presets (7 วัน, 30 วัน, 3 เดือน, 1 ปี)
   - Search Input พร้อม Filter Dropdown (Status, Category)

---

## 🇹🇭 5. Thai-First & Regional Conventions

1. **Typography:**
   - Font Family: `'Prompt', sans-serif` หรือ `'IBM Plex Sans Thai'` สำหรับทุก UI Surface
   - Weight Hierarchy: 400 (Regular body), 500 (Medium table/label), 600 (Semibold headers/prices), 700 (Bold titles)
2. **Calendar & Years:**
   - ปี พ.ศ. (Buddhist Era): ใช้สูตร `BE = CE + 543` ในการแสดงผล DatePicker และรายงาน
   - Timezone: บังคับใช้ `Asia/Bangkok` (UTC+7) เสมอ
3. **Currency & Numeric Formats:**
   - เครื่องหมายบาท `฿` นำหน้าตัวเลข และจัดตัวเลขด้วย CSS `tabular-nums` เพื่อให้หลักตัวเลขตรงกันเสมอในตาราง
4. **Standard Thai Microcopy Matrix:**

| English Concept | Approved Thai UI Copy | Recommended Tone / Color |
| :--- | :--- | :--- |
| Dashboard / Overview | แดชบอร์ด / ภาพรวม | `neutral` |
| POS / Sales Desk | รายการขาย / ขายหน้าร้าน | `primary` |
| Transactions / Records | ประวัติรายการ / รายการ | `primary` |
| Cashflow / Finance | รายรับ–รายจ่าย | `emerald` (รับ) / `amber` (จ่าย) |
| Active / Paid / Success | เปิดใช้งาน / ชำระเงินแล้ว / สำเร็จ | `success` (`emerald`) |
| Pending / In-progress | รอดำเนินการ / รอชำระเงิน | `warning` (`amber`) |
| Inactive / Cancelled | ปิดใช้งาน / ยกเลิก / ค้างชำระ | `error` (`rose`) |
| Walk-in Customer | ลูกค้าทั่วไป (ไม่ระบุ) | `neutral` |

---

## 📈 6. Charts & Data Visualizations (`@unovis/vue`)

- **Cashflow Dual Chart:** กราฟ Area + Line ซ้อน 2 เส้นเปรียบเทียบ รายรับ (Emerald Green `#10b981`) vs รายจ่าย (Amber `#f59e0b`) พร้อมคำนวณกำไรสุทธิ
- **Grouped Bar Chart:** แสดงสัดส่วนหมวดหมู่หรือช่องทางการขาย
- **Responsive Wrapper:** ใช้ `useElementSize` จาก `@vueuse/core` เพื่อคำนวณความกว้างชาร์ตแบบ Responsive 100%
- **HTML Tooltips:** จัด Format Tooltip ให้มีหน่วยเงินบาท `฿` และวันที่ภาษาไทย

---

## 🛠️ 7. Core Interactive Components & Patterns

1. **Standard Confirm Modal:** โมดอลยืนยันพร้อมไอคอนวงกลมสีตามประเภท (`info`, `warning`, `error`, `success`) ป้องกันการเผลอลบข้อมูล
2. **Photo Upload & Direct Mobile Camera:** รองรับทั้งการอัปโหลดไฟล์จากเครื่อง (`accept="image/*"`) และการถ่ายภาพตรงจากกล้องมือถือ (`capture="environment"`)
3. **POS Catalog & Fast Gestures:**
   - คลิกซ้าย: เพิ่มจำนวนสินค้า (+1)
   - คลิกขวา (`@contextmenu.prevent`): ลดจำนวนสินค้า (-1)
   - ระบบสลับลูกค้า: ลูกค้าสมาชิก (ค้นหาชื่อ/เบอร์) vs ลูกค้าหน้าร้าน (มีปุ่มลัด "ไม่ระบุ")
4. **LINE LIFF & Engagement Buttons:** ปุ่มเชื่อมต่อ LINE สีเขียวมาตรฐาน (`#06C755`)


---

## 6. Professional Vector SVG Icons vs Emojis (No-Toy UI Rule)
- **Zero Toy Emojis in Core UI:** ห้ามใช้ Emoji ในองค์ประกอบ UI หลักของระบบระดับ Production (เช่น Navigation Bar, Sidebar, Stat Card Icons, Action Buttons, Table Action Columns)
- **Standard Vector SVGs:** ใช้ไอคอน Vector SVG ที่มีความคมชัด น้ำหนักเส้นสม่ำเสมอ (เช่น Heroicons, Lucide Icons) กำหนดขนาด `w-4 h-4` ถึง `w-6 h-6` พร้อมสีที่มีคอนทราสต์เหมาะสมตาม State

---

## 7. Responsive Dual-Role App Shell Pattern
- **Desktop View:**
  - ขยายเต็มพื้นที่ความกว้าง (`max-w-6xl` ถึง `max-w-7xl`)
  - ใช้ Multi-column Grid สำหรับแสดงผลภาพรวมและตาราง
  - แถบเมนูด้านข้างรองรับการพับเก็บ (Collapsible Mini Mode)
- **Mobile View:**
  - แสดงผลในรูปแบบ Mobile App Shell
  - แถบเมนูลอยตัวด้านล่าง (Floating Bottom Navigation) สำหรับการใช้งานด้วยมือเดียว

---

## 8. Universal Table Multi-Select & Floating Bulk Bar Pattern
- **Checkbox State Management:** รองรับการเลือกทีละแถว (Row Selection) และเลือกทั้งหมด (Select All)
- **Floating Bulk Action Bar:** แสดงผลเป็นแถบลอยตัวด้านล่างพร้อม Animation นุ่มนวลเมื่อ `selectedCount > 0`
- **Confirmation Gate:** แสดง Modal หรือ Confirm Dialog แจ้งเตือนจำนวนรายการที่กำลังจะถูกลบเสมอ
