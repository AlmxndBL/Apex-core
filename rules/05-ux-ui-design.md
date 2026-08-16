# 05. UX/UI & Frontend Development Standards

> **Priority 5:** มาตรฐานการพัฒนาส่วนหน้าบ้าน สถาปัตยกรรม Component และการออกแบบ UI ระดับพรีเมียม

---

## 🏗️ 1. Component Architecture & Layering Rules
จัดแบ่ง Component ออกเป็น **4 ชั้นอย่างเคร่งครัด**:
1. `layouts/`: **App Frames** (Sidebar, Navbar, Header Shell)
2. `pages/` หรือ `views/`: **Route Entry Components** (หน้าที่ผูกกับ URL)
3. `features/`: **Feature Domain Modules** (เช่น `features/cart/`, `features/analytics/`)
4. `components/ui/`: **Atomic / Dumb Components** ไร้ Business Logic (Button, Modal, Input, Badge)

### 🚫 Strict Component Red-Lines
- ❌ **No Monolithic Component:** ห้ามสร้างไฟล์ UI เดียวเกิน **200 บรรทัด** ให้ย่อยเป็น Sub-components
- ❌ **No Prop Drilling > 2 Levels:** หากส่ง Props ลึกเกิน 2 ชั้น ให้ใช้ State Store (Pinia/Zustand), Context หรือ Slot แทน
- ❌ **No Direct API Calls in UI Layer:** ห้ามเรียก API ตรงใน Atomic UI Components ให้ผ่าน Composables / Custom Hooks / Service Layer เสมอ
- ❌ **No Self-Referencing Recursion:** ตรวจสอบการ Import ตัวเองเพื่อป้องกัน Infinite Loop

---

## 🎨 2. Styling & Design System
- **Tailwind CSS:** ใช้เป็นค่าเริ่มต้นสำหรับทุก Framework (ออกแบบ Mobile-first เสมอ)
- **Component Libraries:**
  - **Nuxt 4:** ใช้ **Nuxt UI** (`UButton`, `UInput`, `UModal`, `UTable` ฯลฯ)
  - **React:** ใช้ **Shadcn UI** / **Radix UI** primitives
- **Modern Aesthetics:** สร้าง UI ที่ดูพรีเมียม (Rich Aesthetics, Glassmorphism, Micro-animations) ห้ามใช้สี Generic (เช่น แดงสด/น้ำเงินสด) ให้ใช้ Color Palette ที่กลมกลืน

---

## ⚡ 3. State Management & Data Fetching
- **Nuxt 4 (Vue):**
  - Shared Client State: ใช้ **Pinia** หรือ `useState()`
  - Server Data Fetching: ใช้ `useFetch()` หรือ `useAsyncData()` (ห้ามเอา Raw Response ไปยัดใส่ Store โดยไม่จำเป็น)
- **React (Next.js / Vite):**
  - Shared Client State: ใช้ **Zustand** หรือ React Context
  - Server Data Fetching: ใช้ **TanStack Query (React Query)** หรือ Server Components ใน Next.js

---

## 🚀 4. Frontend Performance Optimization
- **Bundle Size Budget:** Initial JS ไม่ควรเกิน **200KB** (gzipped)
- **Image Optimization:** ใช้ `<NuxtImage>` (Nuxt) หรือ `next/image` (Next.js) พร้อม WebP / AVIF format
- **Lazy Loading:** ทำ Code Splitting แยก Route อัตโนมัติ และใช้ `Lazy` Prefix หรือ `React.lazy()` สำหรับ Heavy Components
- **Virtual Scrolling:** บังคับใช้ Virtual Scrolling เมื่อต้องเรนเดอร์ List ที่มีข้อมูลเกิน 100 รายการ

---

## 🛡️ 5. Forms, Validation & Error Boundaries
- **Form Handling:**
  - Client-side Validation ด้วย **Zod Schema** เสมอ (Nuxt: `UForm` / React: `react-hook-form` + `@hookform/resolvers/zod`)
  - แสดง Error Message ใต้ Input Field ที่ไม่ผ่าน
  - Loading State: Disable ปุ่ม Submit และแสดง Spinner เสมอระหว่างส่งข้อมูล
- **Error Boundaries:**
  - ครอบส่วนที่อาจเกิด Error ด้วย `<NuxtErrorBoundary>` หรือ `react-error-boundary` พร้อม Fallback UI ที่ชัดเจน
  - ส่ง Programmer Error ไปยัง Sentry ผ่าน `onError` Handler

---

## 📱 6. Responsive Breakpoints & a11y
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`
- เขียน CSS แบบ **Mobile-first** (Default styles $\rightarrow$ `sm:` $\rightarrow$ `md:` $\rightarrow$ `lg:`)
- ปุ่มและองค์ประกอบ Interactive ต้องมี ARIA attributes หรือ `alt` tags ให้ครบถ้วน รองรับ Keyboard Navigation
