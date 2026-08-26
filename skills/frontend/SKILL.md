---
name: frontend
description: Enterprise UI/UX, Component Architecture, Tailwind CSS, Responsive Design, and Aesthetic Polish for Vue 3 / Nuxt 4 and React / Next.js
---

# Enterprise Frontend & UI/UX Skill (v5.0)

> Production-grade frontend architecture for Nuxt 4 (Vue 3) and React (Next.js 15), focusing on clean component boundaries, 3-File Feature Architecture, 4-State UI resilience, and modern aesthetic polish.

---

## 1. Feature Module Architecture (Strict 3-File Standard)

Avoid spaghetti monolithic components where template, data fetching, state, and formatting live in one file. Enforce the **Feature Module Pattern**:

```text
features/<domain>/
├── composables/ (or hooks/)
│   └── use<Feature>.ts          # Pure Logic: API fetch, mutations, caching, validation
├── components/
│   ├── <Feature>List.vue        # Pure Presentation: renders table/cards, receives props
│   ├── <Feature>Form.vue        # Form Presentation: handles field events & emits values
│   ├── <Feature>Skeleton.vue    # Loading Skeleton: mirrors actual layout geometry
│   └── <Feature>Empty.vue       # Empty State: illustration + description + CTA
├── types/
│   └── <feature>.contract.ts    # Zod schemas, contract types, and DTO definitions
└── index.vue (or Page.tsx)       # Smart Container: glue only (calls composable -> passes to presenters)
```

### 🏛️ Container vs Presenter Separation Rules
1. **Container (`index.vue` / `page.tsx`):**
   - Holds zero styling and zero inline business calculation.
   - Instantiates `use<Feature>()` composable/hook.
   - Dispatches state to Presentational components and handles emitted user actions.
2. **Presenters (`<Feature>List.vue` / `<Feature>Form.vue`):**
   - Strictly receive `props` (typed) and emit events (`@submit`, `@select`, `@delete`).
   - Zero direct API calls (`$fetch` or `fetch`) inside presentational components.
3. **Logic Composable (`use<Feature>.ts`):**
   - Encapsulates `ref`, `computed`, API queries, Zod validation, and error states.
   - Returns explicit typed state: `{ data, isLoading, error, refresh, executeMutation }`.

---

## 2. Mandatory 4-State UI Contract

Every data-driven UI feature view MUST implement all 4 fundamental UI states:

### 💚 Nuxt 4 / Vue 3 Pattern
```vue
<template>
  <div class="space-y-6">
    <!-- State 1: Loading Skeleton -->
    <FeatureSkeleton v-if="isLoading" />

    <!-- State 2: Error State with Retry -->
    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center rounded-xl border border-rose-200 bg-rose-50/50 p-8 text-center dark:border-rose-900/50 dark:bg-rose-950/20"
    >
      <div class="rounded-full bg-rose-100 p-3 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
        <AlertCircle class="h-6 w-6" />
      </div>
      <h3 class="mt-3 text-sm font-semibold text-rose-900 dark:text-rose-200">Unable to load data</h3>
      <p class="mt-1 text-xs text-rose-600 dark:text-rose-400">{{ error.message }}</p>
      <button
        class="mt-4 inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-rose-700 active:scale-95"
        @click="refresh()"
      >
        <RotateCw class="h-3.5 w-3.5" /> Try Again
      </button>
    </div>

    <!-- State 3: Empty State with CTA -->
    <div
      v-else-if="!data || data.length === 0"
      class="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900/30"
    >
      <Inbox class="h-10 w-10 text-zinc-400 dark:text-zinc-600" />
      <h3 class="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">No records found</h3>
      <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Get started by creating your first record.</p>
      <button
        class="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        @click="isCreateModalOpen = true"
      >
        + Add New Record
      </button>
    </div>

    <!-- State 4: Ready / Data Content -->
    <FeatureList
      v-else
      :items="data"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>
</template>
```

### ⚡ React 19 / Next.js 15 Pattern
```tsx
export function FeatureContainer() {
  const { data, isLoading, error, refresh } = useFeature()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // State 1: Loading Skeleton
  if (isLoading) return <FeatureSkeleton />

  // State 2: Error State with Retry
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-rose-200 bg-rose-50/50 p-8 text-center dark:border-rose-900/50 dark:bg-rose-950/20">
        <div className="rounded-full bg-rose-100 p-3 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h3 className="mt-3 text-sm font-semibold text-rose-900 dark:text-rose-200">Unable to load data</h3>
        <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">{error.message}</p>
        <button
          type="button"
          onClick={() => refresh()}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-rose-700 active:scale-95"
        >
          <RotateCw className="h-3.5 w-3.5" /> Try Again
        </button>
      </div>
    )
  }

  // State 3: Empty State with CTA
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900/30">
        <Inbox className="h-10 w-10 text-zinc-400 dark:text-zinc-600" />
        <h3 className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">No records found</h3>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Get started by creating your first record.</p>
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          + Add New Record
        </button>
      </div>
    )
  }

  // State 4: Ready / Data Content
  return <FeatureList items={data} onEdit={handleEdit} onDelete={handleDelete} />
}
```

---

## 3. Modern Design System & Aesthetic Polish Heuristics

Ban generic "AI-generated" wireframes. Apply modern aesthetic discipline:

### A. 3-Tier Surface Elevation Hierarchy
- **Canvas / Background:** `bg-zinc-50 dark:bg-zinc-950`
- **Card / Container:** `bg-white dark:bg-zinc-900` paired with `border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm`
- **Elevated Popover / Modal / Dropdown:** `bg-white dark:bg-zinc-900 shadow-lg border border-zinc-200 dark:border-zinc-800`

### B. Typography Rhythm & Thai Headroom
- Headings: `font-semibold tracking-tight text-zinc-900 dark:text-zinc-100`
- Body: `text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed`
- Subtitle / Meta: `text-xs text-zinc-400 dark:text-zinc-500 font-normal`
- **Thai Headlines:** Enforce `leading-relaxed` (1.625x) and isolate lines in discrete block elements (`<div>`) to prevent ascender/descender collisions.

### C. Interaction Polish
- Every button, row, and card hover must have smooth transitions: `transition duration-150 ease-in-out`
- Action feedback: Active scale down `active:scale-[0.98]`
- Focus ring: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300 focus-visible:ring-offset-2`

---

## 4. Dual Responsive Strategy (Desktop Table vs Mobile Cards)

Never allow unformatted horizontal scroll tables to break mobile UX:

### 💚 Nuxt 4 / Vue 3 Pattern
```vue
<!-- Desktop View (md+) -->
<div class="hidden md:block overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
  <table class="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-left text-sm">
    <thead class="bg-zinc-50 dark:bg-zinc-900/50 text-xs font-semibold text-zinc-500">
      <tr>
        <th class="py-3 px-4">Name</th>
        <th class="py-3 px-4">Status</th>
        <th class="py-3 px-4 text-right">Actions</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
      <tr v-for="item in items" :key="item.id" class="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
        <td class="py-3 px-4 font-medium text-zinc-900 dark:text-zinc-100">{{ item.name }}</td>
        <td class="py-3 px-4"><Badge :status="item.status" /></td>
        <td class="py-3 px-4 text-right space-x-2">
          <button @click="$emit('edit', item.id)" class="text-xs text-zinc-600 hover:text-zinc-900">Edit</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Mobile View (< md) -->
<div class="space-y-3 md:hidden">
  <div
    v-for="item in items"
    :key="item.id"
    class="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 space-y-3"
  >
    <div class="flex items-center justify-between">
      <span class="font-medium text-zinc-900 dark:text-zinc-100 text-sm">{{ item.name }}</span>
      <Badge :status="item.status" />
    </div>
    <div class="flex items-center justify-end gap-2 border-t border-zinc-100 pt-2 dark:border-zinc-800/60">
      <button @click="$emit('edit', item.id)" class="text-xs font-medium text-zinc-600 dark:text-zinc-400">Edit</button>
    </div>
  </div>
</div>
```

### ⚡ React 19 / Next.js 15 Pattern
```tsx
export function FeatureList({ items, onEdit }: { items: Item[]; onEdit: (id: string) => void }) {
  return (
    <>
      {/* Desktop View (md+) */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-xs font-semibold text-zinc-500">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="py-3 px-4 font-medium text-zinc-900 dark:text-zinc-100">{item.name}</td>
                <td className="py-3 px-4"><Badge status={item.status} /></td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button type="button" onClick={() => onEdit(item.id)} className="text-xs text-zinc-600 hover:text-zinc-900">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View (< md) */}
      <div className="space-y-3 md:hidden">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">{item.name}</span>
              <Badge status={item.status} />
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-zinc-100 pt-2 dark:border-zinc-800/60">
              <button
                type="button"
                onClick={() => onEdit(item.id)}
                className="text-xs font-medium text-zinc-600 dark:text-zinc-400"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
```

---

## 5. SSR & Hydration Guardrails

- **Browser Globals:** Never read `window`, `document`, or `localStorage` during setup or module initialization. Wrap in `onMounted()` (Vue) or `useEffect()` (React).
- **Icon Bundling:** Import only required icon symbols (`import { Check, X } from 'lucide-vue-next'`). Never import complete wildcard packages.
- **Client Directives:** Restrict `'use client'` (Next.js) or `<ClientOnly>` (Nuxt) strictly to leaf components requiring direct DOM interaction.

---

## 6. Apex Enterprise UI Component Registry & Template Directory

Before creating or refactoring frontend components, **ALWAYS** check and adopt pre-built production components from [`Apex-core/templates/ui/`](../../templates/ui/):

### 📁 Blueprint & Template Inventory

```text
Apex-core/templates/ui/
├── admin-ui-tokens.ts          # Standardized classes, table presets, and getCatalogItemToneClass()
├── demo-layout.html            # Standalone visual prototype & showcase
├── vue/                        # Vue 3 / Nuxt 4 Production Components
│   ├── AdminLayoutShell.vue    # Full admin shell (Sidebar + Navbar + Command header)
│   ├── AppAdminSidebar.vue     # Responsive collapsible sidebar with mobile drawer
│   ├── AppAdminDataTable.vue   # Unified table with search, pill filters, sort & mobile cards
│   ├── App4StateContainer.vue  # Strict 4-State UI container (Loading, Error, Empty, Ready)
│   ├── AppFloatingBulkBar.vue  # Floating bottom dock for batch selection actions
│   ├── AppKpiCard.vue          # Metric/KPI card with trend badges & spark indicators
│   ├── AnimatedThemeToggler.vue# Smooth animated Sun/Moon dark mode toggle
│   ├── AppToastContainer.vue   # Enterprise toast container
│   └── useToast.ts             # Composable for tri-tier toast alerts
└── react/                      # React 19 / Next.js 15 Equivalent Components
    ├── AdminLayoutShell.tsx
    ├── AppAdminDataTable.tsx
    ├── App4StateContainer.tsx
    ├── AppFloatingBulkBar.tsx
    ├── AppKpiCard.tsx
    ├── AnimatedThemeToggler.tsx
    ├── AppToastContainer.tsx
    └── useToast.ts
```

### 🚀 Adoption Workflow (Synthesis Mode)
1. **Container Integration:** Wrap all asynchronous data views with `App4StateContainer` (`:status="pending ? 'loading' : error ? 'error' : !data?.length ? 'empty' : 'ready'"`).
2. **Data Listings:** Prefer `AppAdminDataTable` or match its dual responsive structure (`hidden md:block` table + `md:hidden` touch card list).
3. **Design Tokens:** Import `adminDashboardCardClass`, `adminTableUi`, and `getCatalogItemToneClass` from `admin-ui-tokens.ts` for uniform visual hierarchy across all admin features.

