---
name: frontend
description: Enterprise UI/UX, Component Architecture, Tailwind CSS, Responsive Design, and Aesthetic Polish for Vue 3 / Nuxt 4 and React / Next.js
---

# Enterprise Frontend & UI/UX Skill

> Production-grade frontend architecture for Nuxt 4 (Vue 3) and React (Next.js 15), focusing on clean component boundaries, responsive design, and hydration-safe rendering.

---

## 1. Component Layering Architecture (4-Tier Standard)

1. **Atoms / Primitives (`components/ui/`):** Button, Input, Badge, Dialog (Shadcn UI / Nuxt UI) — Strictly zero business logic.
2. **Molecules (`components/shared/`):** SearchBar, FormField, Pagination, Breadcrumb.
3. **Organisms (`components/modules/<domain>/`):** ProductTable, OrderForm, UserProfileCard.
4. **Templates / Layouts (`layouts/`):** AppHeader, Sidebar, DashboardShell.

---

## 2. Design System & Aesthetics (Anti-Cliché UI)

* **Color Palette (HSL Standard):** Use semantic HSL variables (Background, Foreground, Primary, Muted, Border) following the 60-30-10 distribution rule.
* **Typography:** System fonts, Inter, or Geist with `tracking-tight` on headings and `leading-relaxed` on body text.
* **High-Density Rhythm (Enterprise Data-Dense Style):**
  - Data tables and dashboard widgets must have clean, consistent spacing (`py-2.5 px-4`).
  - Implement Dual Responsive layouts: Full data tables on Desktop, compact cards on Mobile.

---

## 3. Hydration & Performance Guardrails

* **SSR-Safe Code:** Never access browser globals (`window`, `document`, `localStorage`) during initial render. Wrap in `onMounted` (Vue) or `useEffect` (React).
* **Bundle Budget:** Import only required icon sub-paths; never import entire icon libraries wholesale.
* **Client Boundaries:** Confine `'use client'` or `<ClientOnly>` strictly to components with interactive state or DOM side-effects.
