# UX/UI & Frontend Development

> กฎการพัฒนาส่วน Frontend และหน้าตาของโปรเจกต์ (User Interface)

## 1. Component Architecture & Layering Rules
- **Layer Breakdown Standard:** จัดแบ่งประเภท Component ออกเป็น 4 ชั้นอย่างเคร่งครัด:
  - `layouts/`: App Frames (Sidebar, Header, Layout Shell)
  - `pages/` หรือ `views/`: Target Component ของแต่ละ Route
  - `features/`: Business domain components (เช่น `features/analytics`, `features/cart`)
  - `components/ui/`: Atomic / Dumb Components ที่ไร้ Business Logic (Button, Modal, Input)
- **App Shell & Routing Mandate:** 
  - สำหรับ Web App / Dashboard: ต้องใช้ Layout Shell + Router Outlet (`<NuxtPage />` หรือ `<Outlet />`) ห้าม hardcode content รวมไว้ใน Layout เดียว
  - สำหรับ Marketing / Landing Page: ใช้ Sectional Composition Pattern (`<HeroSection>`, `<FeatureSection>`)
- **Strict Component Red-Lines:**
  - 🚫 **No Monolithic Component:** ห้ามสร้างไฟล์ UI เดียวเกิน 200 บรรทัด ให้ย่อยเป็น Sub-components (ไม่นับรวม Template/JSX ที่มี Tailwind classes เป็นหลัก)
  - 🚫 **No Prop Drilling > 2 Levels:** เกิน 2 ชั้นให้ใช้ Store / Context API / Composition Slot
  - 🚫 **No Direct API Calls in UI Layer:** ห้ามเรียก API ตรงใน Atomic UI Components ให้ผ่าน Composables / Hooks / Service Layer เสมอ
  - 🚫 **No Self-Referencing Recursion:** ตรวจสอบการ Import และ Render ตัวเอง เพื่อป้องกัน Infinite Recursion Error

## 2. Styling Rules
- ใช้ **Tailwind CSS** เป็นค่าเริ่มต้นสำหรับทุก Framework
- **Component Libraries:**
  - สำหรับ Nuxt 4: ใช้ **Nuxt UI** (`UButton`, `UInput`, `UModal`, `UTable` ฯลฯ)
  - สำหรับ React: ใช้ **Shadcn UI** / **Radix UI** หรือ Tailwind primitives
- ใช้ Tailwind utility classes สำหรับ custom styling
- หลีกเลี่ยง Inline Styles ยกเว้น dynamic values
- ออกแบบโดยยึดหลัก Mobile-first เสมอ

## 3. Accessibility (a11y)
- องค์ประกอบ Interactive ทุกอย่าง (เช่น ปุ่ม) ต้องมี ARIA attributes หรือ `alt` tags ให้ครบถ้วน
- รองรับ Keyboard navigation พื้นฐาน

## 4. Modern Aesthetics & Skills Trigger
- สร้าง UI ที่ดูพรีเมียม (Rich Aesthetics, Glassmorphism, Micro-animations)
- ห้ามใช้สี Generic (สีแดงล้วน/น้ำเงินล้วน ฯลฯ) ให้จัดชุดสี Palette อย่างมืออาชีพ
- **Must Do:** หากคุณต้องออกแบบ UI ใหม่ หรือแก้ UI เดิมที่ดูเชย ให้ทำการเรียกใช้ (Trigger) Skills พื้นฐานเหล่านี้ของระบบทันที:
  - `/design-taste-frontend` หรือ `/high-end-visual-design` สำหรับการขึ้นหน้าจอใหม่
  - `/redesign-existing-projects` หรือ `/stitch-design-taste` สำหรับการ Rework หน้าจอเดิม
  - `/minimalist-ui` หรือ `/industrial-brutalist-ui` หากผู้ใช้ต้องการสไตล์ที่ชัดเจนเฉพาะทาง

## 5. State Management & Data Fetching
- **สำหรับ Nuxt 4 (Vue):**
  - Shared State: ใช้ **Pinia** หรือ `useState()`
  - Server Data: ใช้ `useAsyncData()` / `useFetch()` (ห้ามเก็บ server response ใน Pinia)
- **สำหรับ React (Next.js / Vite):**
  - Shared State: ใช้ **Zustand** หรือ React Context
  - Server Data: ใช้ **TanStack Query (React Query)** หรือ SWR (หรือ Next.js Server Components)

## 6. Performance Optimization
- **Image Optimization:**
  - Nuxt: ใช้ `<NuxtImage>` แทน `<img>` เสมอ (auto optimization, lazy loading)
  - React: ใช้ `next/image` (Next.js) หรือ `vite-imagetools` (Vite)
- **Lazy load components:**
  - Nuxt: prefix `Lazy` หรือ `defineAsyncComponent()`
  - React: ใช้ `React.lazy()` + `<Suspense>` หรือ `next/dynamic`
- Virtual scrolling: ใช้สำหรับ list > 100 items (เช่น `vue-virtual-scroller` หรือ `@tanstack/react-virtual`)

## 7. Error Boundary
- **Nuxt:** ใช้ `<NuxtErrorBoundary>` ครอบ section ที่อาจเกิด error + สร้าง `error.vue` ที่ root
- **React:** ใช้ React Error Boundary class component หรือ `react-error-boundary` package
- ต้องมี Fallback UI ที่สื่อความหมาย (ไม่ใช่หน้าว่าง)
- Report errors ไปยัง Sentry ผ่าน `onError` callback

## 8. Form Handling
- **Nuxt:** ใช้ VeeValidate + Zod หรือ Nuxt UI `<UForm>` ที่ integrate กับ Zod schema
- **React:** ใช้ React Hook Form + Zod (`@hookform/resolvers/zod`)
- Client-side validation ก่อน submit เสมอ
- Server-side validation ต้องมีอีกชั้นเสมอ (อย่าเชื่อ client)
- แสดง error messages ใต้ field ที่ผิด ไม่ใช่รวมไว้ที่เดียว
- Loading state: disable submit button + show spinner ระหว่าง submit

## 9. Responsive Design
- กำหนด Breakpoints:
  - `sm`: 640px (Mobile landscape)
  - `md`: 768px (Tablet)
  - `lg`: 1024px (Desktop)
  - `xl`: 1280px (Large Desktop)
  - `2xl`: 1536px (Ultra-wide)
- เขียน CSS แบบ Mobile-first: base styles → sm → md → lg
- ทดสอบบน Chrome DevTools device mode ก่อน deploy
