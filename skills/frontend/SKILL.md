---
name: frontend
description: Enterprise UI/UX, Component Architecture, Tailwind CSS, Responsive Design, and Aesthetic Polish for Vue 3 / Nuxt 4 and React / Next.js
---

# 🎨 Enterprise Frontend & UI/UX Skill

> มาตรฐานการพัฒนา Frontend คุณภาพสูงระดับ Production ทั้ง Nuxt 4 (Vue 3) และ React (Next.js 15) เน้นความสะอาด รวดเร็ว สวยงามแบบมืออาชีพ และไร้ Hydration Bug

---

## 🏗️ 1. Component Layering Architecture (4 ชั้นมาตรฐาน)

1. **Atoms / Primitives (`components/ui/`):** ปุ่ม, Input, Badge, Dialog (Shadcn / Nuxt UI) — ห้ามใส่ Business Logic
2. **Molecules (`components/shared/`):** SearchBar, FormField, Pagination, Breadcrumb
3. **Organisms (`components/modules/<domain>/`):** ProductTable, OrderForm, UserProfileCard
4. **Templates / Layouts (`layouts/`):** AppHeader, Sidebar, DashboardShell

---

## 🎨 2. Design System & Aesthetics (Anti-Cliché UI)

* **Color Palette (HSL Standard):** ใช้ระบบสีแบบ Semantic HSL (Background, Foreground, Primary, Muted, Border) สัดส่วน 60-30-10
* **Typography:** ใช้ System Fonts หรือ Inter/Geist พร้อมคุม `tracking-tight` บนหัวข้อ และ `leading-relaxed` บนเนื้อหา
* **High-Density Rhythm (Shopee/Enterprise Style):**
  - ตารางข้อมูลและ Dashboard ต้องกระชับ ช่องว่างสม่ำเสมอ (`py-2.5 px-4`)
  - รองรับ Dual Responsive: Desktop แสดงตารางเต็ม / Mobile แสดง Card List แบบ Compact

---

## 🛡️ 3. Hydration & Performance Guardrails

* **SSR Safe:** ห้ามเรียกใช้ Browser API (`window`, `document`, `localStorage`) ใน Component Root $\rightarrow$ ใช้ `onMounted` (Vue) หรือ `useEffect` (React)
* **Bundle Budget:** คุมขนาด Asset และ Import เฉพาะ Icon ที่ใช้ (ห้าม Import Icon Library ทั้งก้อน)
* **Client Boundaries:** แยก `'use client'` หรือ `<ClientOnly>` เฉพาะคอมโพเนนต์ที่มี State หรือ Interaction จริงๆ
