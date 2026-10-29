# 🌐 Modular Stack Adapter: Web Full-Stack (Nuxt 4 / Next.js 15 / Tailwind CSS)

> **Apex v7.0.0 Adapter Module · Domain: Frontend & Web Full-Stack UI**
> Covers Nuxt 4 (Vue 3 + Nitro UI), Next.js 15 (React 19 + App Router), Tailwind CSS (v3/v4), 4-State UI, and Responsive Enterprise Design.

---

## 🎯 1. Trigger Conditions (Detection Gate)

Activate this adapter when ANY of the following conditions are met:
- **Primary Manifest:** `package.json` contains dependencies or devDependencies:
  - `nuxt`, `vue`, `@nuxtjs/tailwindcss`, `@nuxt/ui`
  - `next`, `react`, `react-dom`
  - `tailwindcss`, `@tailwindcss/vite`, `@tailwindcss/postcss`
- **Config Signatures:**
  - `nuxt.config.ts`, `nuxt.config.js`
  - `next.config.js`, `next.config.mjs`, `next.config.ts`
  - `tailwind.config.js`, `tailwind.config.ts`
  - `vite.config.ts` (paired with Vue/React dependencies)
- **Directory Layouts:**
  - `app/layouts/`, `app/pages/`, `app/features/`, `app/components/ui/` (Nuxt 4)
  - `app/api/`, `src/features/`, `src/components/ui/`, `src/layouts/` (Next.js)

---

## 🏛️ 2. Architectural Boundaries & Clean Separation

- **In Scope:**
  - UI Component architecture (Container-Presenter / Feature Module separation).
  - 4-State UI Contract (Loading skeleton, Empty state with CTA, Error alert with Retry, Ready data).
  - Responsive layouts (Desktop Sticky Table vs Mobile Touch Card List).
  - Surface elevations, interaction tokens, and typography rhythm (Thai headroom rule).
  - Client-side state (Pinia / Zustand / Composables / Hooks) and URL query state sync.
  - SSR / Hydration guards (`onMounted`, `'use client'`, client boundaries).
- **Out of Scope (Zero Cross-Domain Pollution):**
  - Database schemas, migrations, and raw SQL/Prisma transactions $\to$ Delegated to `adapters/backend-data.md`.
  - Non-Node runtimes (Python, C#, Shell) $\to$ Delegated to `adapters/polyglot-core.md`.

---

## 📐 3. Core Architecture Rules & Patterns

### A. Feature Module Architecture (Container vs Presenter)
Avoid monolithic multi-hundred-line components. Decompose into:
```text
features/<domain>/
├── composables/ (or hooks/)
│   └── use<Feature>.ts          # Logic: Reactive state, queries, mutations, Zod validation
├── components/
│   ├── <Feature>List.vue        # Presentation: Table/Cards, emits actions, typed props
│   ├── <Feature>Form.vue        # Presentation: Form fields, emits payload
│   ├── <Feature>Skeleton.vue    # Loading Skeleton: Mirrors exact layout geometry
│   └── <Feature>Empty.vue       # Empty State: Icon + Description + Primary CTA
├── types/
│   └── <feature>.contract.ts    # Contract schemas, DTOs, and inferred types
└── index.vue (or page.tsx)      # Container: Instantiates composable/hook & passes props
```
- **Max Component Length:** Maximum **~200 lines** for UI components. Decompose if exceeded.
- **Zero Direct API Calls in Dumb Components:** Presentation components receive `props` and emit events; no direct `$fetch` or `fetch` inside atomic elements.

### B. Four-State UI Contract (Mandatory for Asynchronous Views)
Every primary asynchronous data view (tables, KPI feeds, dashboard lists) MUST implement:
1. **Loading State:** Skeleton loader matching actual layout geometry (avoid full-screen bare spinners).
2. **Empty State:** Dashed container (`border-dashed border-zinc-200 dark:border-zinc-800`) + Lucide icon + friendly explanation + primary CTA.
3. **Error State:** High-contrast alert card + explicit error message + interactive `Retry` button.
4. **Ready / Data State:** Fully rendered presentation with responsive table/card switching.
*Exemption Gate:* Trivial static views, modals, and internal utility controls do NOT require state wrappers.

### C. Enterprise Responsive Data Listings
Never allow unformatted horizontal scroll tables on mobile:
- **Desktop ($\ge 768\text{px}$):** Sticky header data table, checkbox multi-selection, sortable columns, tabular-num right-aligned currency, right-aligned action buttons.
- **Mobile ($< 768\text{px}$):** Touch-friendly card list (`space-y-3 md:hidden`), badge status, summary details, and action buttons.
- **Processing Pipeline:** Source Data $\to$ Search / Filter $\to$ Sorting $\to$ Pagination $\to$ Display. (Filter change MUST reset pagination to page 1).

### D. Design System, Surface Elevation & Micro-Interactions
- **3-Tier Surface Elevation:**
  - Canvas: `bg-zinc-50 dark:bg-zinc-950`
  - Container / Card: `bg-white dark:bg-zinc-900` + `border border-zinc-200/80 dark:border-zinc-800/80`
  - Popover / Dropdown / Modal: `bg-white dark:bg-zinc-900 shadow-lg border border-zinc-200 dark:border-zinc-800`
- **Micro-Interactions:** Buttons must have `transition duration-150`, active press feedback `active:scale-[0.98]`, and accessible focus rings.
- **Zero Raw Emojis:** Enterprise UI strictly uses **Lucide Icons** (`i-lucide-*` or `<LucideIcon>`). Never use emoji characters (📊, 💰, 👤) as interface icons.
- **Animated Theme Toggle:** Use animated Sun/Moon toggle (`AnimatedThemeToggler`) with zero dark mode flash.

### E. Regional & Thai Localization Standards
- **Typography:** `'Prompt', sans-serif`, `'IBM Plex Sans Thai'`, or `'Inter'`.
- **Thai Headroom Rule:** Headlines $\ge 32\text{px}$ (`text-3xl+`) must use `leading-relaxed` (1.625x) and isolate lines in discrete `<div>` elements. Strictly prohibit `leading-tight` or `leading-none` on multi-line Thai text.
- **Currency & Calendar:** Baht prefix `฿` with CSS `tabular-nums`. Buddhist Era: `BE = CE + 543`. Timezone default: `Asia/Bangkok` (UTC+7).

### F. SSR & Hydration Guardrails
- **Browser Globals:** Never access `window`, `document`, or `localStorage` during initial setup. Wrap in `onMounted()` (Vue) or `useEffect()` (React).
- **RSC Boundary Discipline (Next.js 15):** Mark `'use client'` strictly on leaf components needing client state/events. Keep parents as Server Components. Avoid non-serializable props.

---

## ⚡ 4. Fast Targeted In-Memory Verification

- **Fast TypeCheck Gate (RAM-only, zero disk build):**
  - Nuxt 4 / Vue 3: `pnpm vue-tsc --noEmit` (or lockfile-detected package manager)
  - Next.js 15 / React: `pnpm tsc --noEmit` (or lockfile-detected package manager)
- **Anti-Build-Bloat Principle:** Never run full production builds (`pnpm build`, `nuxt build`, `next build`) for minor single-file edits or CSS tweaks.
