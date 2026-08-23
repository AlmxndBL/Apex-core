# 05. UX/UI & Frontend Development Standards

> **Priority 5:** Frontend development standards, component architecture, responsive design, and UI presets.
> Divided into **2 main parts:**
> 1. **Universal Foundation (Non-negotiable rules for all web projects)**
> 2. **Contextual UI Archetype Presets (Specific presets tailored to project types)**

---

# 🌐 PART 1: Universal Frontend Foundation

Every project must adhere to the following architectural, performance, and mathematical design standards:

## 🏗️ 1. Component Architecture & Layering Rules
Strictly organize components into **4 distinct layers**:
1. `layouts/`: **App Frames** (Sidebar, Navbar, Header Shell, App Shell).
2. `pages/` or `views/`: **Route Entry Components** (views tied directly to URLs).
3. `features/` or `components/<domain>/`: **Feature Domain Modules** (e.g. `features/cart/`, `features/analytics/`).
4. `components/ui/`: **Atomic / Dumb Components** with zero business logic (Button, Modal, Input, Badge, Toolbar).

### 🚫 Strict Component Red-Lines
- ❌ **No Monolithic Components:** Never create single UI files exceeding **200–250 lines**. Decompose into focused sub-components.
- ❌ **No Hardcoded Mobile-Only Shells:** Never restrict app shell layouts with fixed widths (`max-w-sm`, `max-w-md`) without responsive desktop expansion classes (`lg:max-w-6xl` or `w-full`).
- ❌ **No Prop Drilling > 2 Levels:** For state shared across > 2 levels, use global state stores (Pinia / Zustand), context, or compound component slots.
- ❌ **No Direct API Calls in UI Layer:** Never invoke HTTP APIs directly inside atomic UI components. Always delegate through composables, hooks, or service layers.
- ❌ **No Raw Browser Alerts:** Never use native `alert()`, `confirm()`, or `prompt()`. Use toast systems or modal components.

---

## 🇹🇭 2. Regional & Thai Localization Conventions

1. **Typography:**
   - Font Family: `'Prompt', sans-serif`, `'IBM Plex Sans Thai'`, or `'Inter'`.
   - Weight Hierarchy: 400 (Regular body), 500 (Medium table/label), 600 (Semibold headers/prices), 700 (Bold titles).
   - **Thai Typography Bounding Box & Headroom Rule:** 
     - For large headlines (`text-3xl+` or $\ge 32\text{px}$), separate each line into discrete block elements (`<div>`) paired with `leading-relaxed` (1.625x) and `space-y-4 sm:space-y-6`.
     - ❌ **Never use `leading-snug`, `leading-tight`, or `leading-none`** on multi-line Thai text to prevent vertical descender/ascender collisions.
2. **Calendar & Localization:**
   - Buddhist Era (BE): Use `BE = CE + 543` for regional Thai datepickers and reports when configured.
   - Timezone: Default to `Asia/Bangkok` (UTC+7) for regional operations.
3. **Currency & Numeric Formats:**
   - Prefix Baht values with `฿` and apply CSS `tabular-nums` for aligned digits across table rows.

---

## 📐 3. Mathematical Precision & Strict CSS Scale Check

- ❌ **Zero Guesswork:** Never guess unconfigured Tailwind or CSS classes (e.g. `w-13`, `w-5.5`, `h-5.5`).
- ✅ **Thumb Geometry Lock:** Switch/slider thumbs must enforce `w-X h-X aspect-square shrink-0 rounded-full`.
- ✅ **Translate Distance Math Formula:**
  $$\text{Translate Distance} = \text{Track Width} - (2 \times \text{Padding}) - \text{Thumb Width}$$
  *Example:* Track `w-12` (48px) + Pad `p-0.5` (2px) + Thumb `w-5` (20px) $\rightarrow 48 - 4 - 20 = 24\text{px} \rightarrow \mathbf{translate\text{-}x\text{-}6}$.

---

## 🔔 4. Tri-Tier Feedback & Interaction Boundaries

Strictly separate notification tiers:

1. **Tier 1 (Field Validation Level) $\rightarrow$ Inline Error Messages:**
   - Form validation errors must appear **inline directly beneath the input field**.
   - ❌ Never use toasts for field-level form validation errors.
2. **Tier 2 (Action Result Level) $\rightarrow$ Toast Notifications (`useToast`):**
   - Use for mutation results: `success` (saved), `error` (network/server 500), `warning`, `info`.
3. **Tier 3 (Destructive & High-Impact Level) $\rightarrow$ Modal Confirmations (`ConfirmModal`):**
   - Require explicit user confirmation for: Delete, Bulk Delete, Reset, Revoke, or Disable actions.

---

## 📝 5. Form State Resilience & Submission Guards

1. **Anti-Duplicate Submission Lock:**
   - Mutation submit buttons must reflect loading and disabled states (`:loading="isSubmitting" :disabled="isSubmitting"`).
2. **Data Preservation on Error:**
   - If submission fails, preserve all user input values. Never clear or reset the form unexpectedly.
   - Auto-focus the first invalid field for rapid correction.
3. **No Direct Mutation of Source State:**
   - Clone records into form state before editing to allow clean cancel and diff capabilities.

---

## 📊 6. Data Table Processing Pipeline & Selection Integrity

1. **Deterministic Processing Pipeline:**
   - Enforce data pipeline order:
     $$\text{Source Data} \longrightarrow \text{Search / Filter} \longrightarrow \text{Sorting} \longrightarrow \text{Pagination} \longrightarrow \text{Display}$$
   - **Filter Reset Rule:** Reset pagination back to page 1 whenever search terms or filter criteria change.
2. **Stable Selection Identity:**
   - Checkbox row selections must track stable unique record IDs (`item.id`). Never use row indices.
3. **URL State Synchronization:**
   - Sync pagination, filters, and search queries with URL parameters (`page`, `q`, `status`, `sort`) for shareability and bookmarks.

---

## 🌐 7. SSR & Environmental Safety Guard

1. **SSR Compatibility & Hydration Match:**
   - ❌ Never access browser globals (`window`, `document`, `localStorage`) in top-level script setups or before mount.
   - Wrap in `onMounted()` / `import.meta.client` (Vue) or `useEffect()` (React).
2. **Runtime Config Segregation:**
   - Keep server-only secrets out of public bundles (`runtimeConfig` in Nuxt, non-public envs in Next.js).

---

## 🎨 8. Iconography & Accessibility Guard

1. **Single Icon Set Standard:**
   - Standardize on **Lucide Icons** (`i-lucide-*` or `<LucideIcon>`).
   - ❌ Never substitute emojis for functional interface icons.
2. **Accessible Icon-Only Controls:**
   - Icon-only buttons must include `aria-label`, `title`, or a tooltip for screen reader compatibility.

---
---

# 🎛️ PART 2: Contextual UI Archetype Presets

Select the archetype preset matching the project domain:

```text
                                Select Project Archetype
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         ▼                                 ▼                                 ▼
📊 Preset A: Operational & Admin   🚀 Preset B: Marketing & Landing   📖 Preset C: Editorial & Docs
(High density, tables, POS, ERP)   (Generous whitespace, hero, CTA)  (Reading focus, single col, TOC)
```

---

## 📊 PRESET A: Operational Dashboard, Backoffice & POS Systems

> **Best for:** ERP, Admin Panels, Property Management, Clinics, POS, Inventory, Accounting.

### 1. Spacing & Density (Enterprise-Dense Pattern)
- Page Padding: `p-2 sm:p-6`
- Flex/Grid Gap: `gap-2` to `gap-4`
- Card Internal Padding: `p-3 sm:p-4`
- Border Radius: `--ui-radius: 0.25rem` (`rounded-md` to `rounded-lg`)
- Surface Contrast: System background `bg-neutral-100 / bg-slate-50` (Dark: `bg-neutral-950`), elevated cards `bg-white` (Dark: `bg-zinc-900`), subtle borders `border border-default/30`.

### 2. Dual Responsive Strategy for Data Listings
- **Desktop View ($\ge 768\text{px}$):** Data Table with Sticky Headers, multi-row selection, column sorting, and right-aligned action buttons.
- **Mobile View ($< 768\text{px}$):** Compact Touch Card List. Avoid unformatted horizontal scroll tables on mobile.

### 3. 2-Tier Header & Toolbar Navigation
- **Tier 1 (Navbar):** Sidebar collapse, page title, refresh action, export/import, primary action button (`+ Create`).
- **Tier 2 (Toolbar):** Date range picker with quick presets (7D, 30D, 1Y), search input, and filter dropdowns.

### 4. POS & Catalog Workspace
- 2-column layout (product catalog on the left, payment/checkout panel on the right).

---

## 🚀 PRESET B: Marketing, SaaS Landing Pages & Product Showcases

> **Best for:** Marketing sites, SaaS landing pages, portfolios, corporate sites, product showcases.

### 1. Spacing & Visual Hierarchy
- Section Vertical Padding: `py-16 sm:py-24 lg:py-32`
- Max Container Width: `max-w-5xl` to `max-w-7xl` centered (`mx-auto px-4 sm:px-8`)
- Spacing between titles and descriptions: `space-y-4 sm:space-y-6`

### 2. Hero Section Storytelling
- High-contrast headlines: `text-3xl sm:text-5xl md:text-6xl font-black` with accent gradients.
- Subtle ambient background glows (`blur-3xl opacity-20 to opacity-40`).
- Prominent CTA buttons with secondary links.

### 3. Feature Showcase (Bento Grid Pattern)
- Asymmetrical bento grid layouts combining primary feature cards with secondary highlights.

---

## 📖 PRESET C: Editorial, Content Hubs & Documentation

> **Best for:** Technical documentation, engineering blogs, knowledge bases, tutorials.

### 1. Reading Focus & Typography Rhythm
- Reading Column Constraint: `max-w-prose` (approx. 65–75 characters per line or `max-w-2xl sm:max-w-3xl`).
- Line Height: `leading-relaxed` (1.625) to `leading-loose` (2.0).
- Paragraph Spacing: `my-4` to `my-6`.

### 2. Navigation & Reading Tools
- Sticky Table of Contents (TOC) on desktop tracking active scroll position.
- Fast instant fuzzy search bar.
- Breadcrumb navigation for category depth.

### 3. Code & Media Formatting
- Syntax-highlighted code blocks with 1-click copy buttons.
- Captioned media (`text-xs text-slate-400 text-center mt-2`).
