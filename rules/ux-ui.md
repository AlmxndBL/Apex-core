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
  - 🚫 **No Monolithic Component:** ห้ามสร้างไฟล์ UI เดียวเกิน 150 บรรทัด ให้ย่อยเป็น Sub-components
  - 🚫 **No Prop Drilling > 2 Levels:** เกิน 2 ชั้นให้ใช้ Store / Context API / Composition Slot
  - 🚫 **No Direct API Calls in UI Layer:** ห้ามเรียก API ตรงใน Atomic UI Components ให้ผ่าน Composables / Hooks / Service Layer เสมอ
  - 🚫 **No Self-Referencing Recursion:** ตรวจสอบการ Import และ Render ตัวเอง เพื่อป้องกัน Infinite Recursion Error

## 2. Styling Rules
- ใช้ **Tailwind CSS + Nuxt UI** เป็นค่าเริ่มต้น
- Nuxt UI เป็น component library หลัก (UButton, UInput, UModal, UTable, etc.)
- ใช้ Tailwind utility classes สำหรับ custom styling
- หลีกเลี่ยง Inline Styles ยกเว้น dynamic values
- ออกแบบโดยยึดหลัก Mobile-first เสมอ
- สี: ใช้ Nuxt UI color system (`primary`, `gray`, `error`) + Tailwind custom colors

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

## 5. State Management
- ใช้ **Pinia** เป็น default (built-in กับ Nuxt)
- Local state: `ref()`, `reactive()` สำหรับ component-level state
- Shared state: Pinia store สำหรับ state ที่ใช้ข้าม component
- Server state: `useAsyncData()` / `useFetch()` สำหรับ server data (ห้ามเก็บใน Pinia)
- กฎ: ห้ามเก็บ server response ใน Pinia — ใช้ Nuxt data fetching composables แทน (built-in cache + SSR support)

## 6. Performance Optimization
- ใช้ `<NuxtImage>` แทน `<img>` เสมอ (auto optimization, lazy loading)
- Lazy load components: `const LazyComponent = defineAsyncComponent(() => import('...'))` หรือ prefix `Lazy` ใน Nuxt
- Virtual scrolling: ใช้สำหรับ list > 100 items (เช่น `vue-virtual-scroller`)
- ห้ามใช้ `v-if` + `v-for` บน element เดียวกัน
- ใช้ `v-show` แทน `v-if` สำหรับ elements ที่ toggle บ่อย

## 7. Error Boundary
- ใช้ `<NuxtErrorBoundary>` ครอบ section ที่อาจเกิด error
- ต้องมี Fallback UI ที่สื่อความหมาย (ไม่ใช่หน้าว่าง)
- Report errors ไปยัง Sentry ผ่าน `onError` callback
- Global error page: สร้าง `error.vue` ที่ root สำหรับ unhandled errors

## 8. Form Handling
- ใช้ **VeeValidate + Zod** สำหรับ form validation (Nuxt UI form integration)
- หรือใช้ Nuxt UI `<UForm>` component ที่ integrate กับ Zod schema
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
