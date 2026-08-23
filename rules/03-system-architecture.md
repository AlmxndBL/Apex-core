# 03. System Architecture & API Standards

> **Priority 3:** System architecture, RESTful API design standards, and pragmatic engineering principles.

---

## 🧠 1. Core Architecture Philosophy
1. **Don't Over-engineer:** Pick the simplest solution that directly solves the problem. Avoid premature complexity.
2. **Trade-off Analysis:** Every architectural choice has trade-offs; always be ready to articulate why a specific approach was chosen.
3. **Monolith First:** Default to a **Modular Monolith**. Avoid microservices unless team size and scaling boundaries demand them.
4. **Operations Mindset:** Design with deployment, backups, debugging, and long-term maintenance in mind from day one.

---

## 📊 2. Architecture Diagram Rules
- **Never generate visual diagrams (such as Mermaid) unprompted.**
- Always confirm with the user first: *"Would you like an Architecture Diagram to review the system layout before writing code?"*
- Generate concise, readable diagrams only after user approval.

---

## ⚙️ 3. Primary Stack Architecture Presets

### 🟢 Preset A: Nuxt 4 (Nitro + Vue 3)
- **Engine:** Nitro Backend Engine + Vue 3 Frontend.
- **Directory Layout:**
  - `server/api/v1/`: Server REST API endpoints.
  - `server/middleware/`: Auth, CORS, logging, and rate-limiting middleware.
  - `server/utils/`: Prisma client instance, server utilities, and validators.
  - `app/layouts/`: App Shell Layouts (`default.vue`, `admin.vue`).
  - `app/pages/`: File-based route views.
  - `app/features/`: Domain feature modules and business logic.
  - `app/components/ui/`: Atomic / shared dumb UI components (Nuxt UI).
  - `app/composables/`: Client state and shared composables.

### 🔵 Preset B: React (Next.js App Router / Vite SPA)
- **Next.js:** App Router + Server Components as default.
  - `app/api/v1/`: Route Handlers (`route.ts`).
  - `src/layouts/`: App Shell Layouts (`RootLayout.tsx`, `AdminLayout.tsx`).
  - `src/features/`: Feature domain modules (components, hooks, types).
  - `src/components/ui/`: Shared atomic components (Shadcn UI / Radix).
  - `src/store/`: Global client state (Zustand).
- **Vite SPA:** Separate into `src/layouts/`, `src/pages/`, `src/features/`, `src/components/ui/`, `src/routes/`.

---

## 🔌 4. RESTful API Standards
- **Naming Conventions:** Use plural nouns for resources (e.g. `/api/v1/users`, `/api/v1/orders`).
- **Standardized JSON Response:**
  ```json
  {
    "success": true,
    "data": { ... },
    "error": null,
    "meta": { "pagination": { "page": 1, "limit": 20, "total": 100 } }
  }
  ```
- **Standard Error Response:**
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Invalid request payload",
      "details": [{ "field": "email", "message": "Invalid email address format" }]
    }
  }
  ```
- **HTTP Status Codes:**
  - `200 OK`, `201 Created`
  - `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`
  - `429 Too Many Requests`, `500 Internal Server Error`

---

## 🛡️ 5. Request Validation (Zod)
- Validate all incoming parameters (body, query params, route params) before processing.
- **Nuxt 4 / Nitro:** Use `readValidatedBody(event, schema.parse)` and `getValidatedQuery(event, schema.parse)`.
- **Next.js 15 Route Handlers:** Parse with `schema.safeParse(await req.json())` and return structured 400 responses on failure.
- **Next.js 15 Server Actions:** Validate arguments with `schema.safeParse(input)` at the start of Server Action functions before touching data layers.

---

## 🔁 6. Idempotency & Reliability
- **Idempotency Keys:** Critical mutations (orders, payments) must accept an `Idempotency-Key: <UUID>` header.
- Cache idempotency keys and responses for 24 hours to return cached results on duplicate submissions.
- **Timeouts:** Enforce a maximum timeout of **30 seconds** on all API requests.
- **Client Retries:** Use exponential backoff (1s $\rightarrow$ 2s $\rightarrow$ 4s) up to 3 times strictly on idempotent requests or 5xx/network failures (never retry 4xx errors).

---

## 📑 7. Pagination Guidance
- **Cursor-based Pagination (`after` / `before`):** For user feeds, real-time streams, and infinite scrolling.
- **Offset-based Pagination (`page` / `limit`):** For admin dashboards, structured data tables, and batch exports.

---

## 🧭 8. Domain-Driven Routing & Anti-God Page Rule
- ❌ **Anti-God Page Pattern:** Never aggregate distinct domain listings, forms, and business logic into a single monolithic page (e.g. bundling rooms, contracts, meter readings, and billing in `/admin/index.vue`).
- ✅ **Domain-Driven Routing:**
  - **Overview Dashboard (`/admin`):** Render executive summaries, KPI cards, and quick actions.
  - **Dedicated Domain Routes:** Separate into dedicated pages (e.g. `/admin/rooms`, `/admin/contracts`, `/admin/billing`).
  - **Isolated State:** Each route fetches domain-specific data independently for fast load times and clean caching.

---

## 🎯 9. Safe Refactoring & Blast Radius Analysis
- **Blast Radius Analysis:** Before modifying shared types, altering API contracts, or changing database schemas, scan consumer caller graphs (`grep_search` / call hierarchy) to audit all impacted surfaces.
- **The "Smallest Safe Correction" Standard:** When addressing architectural debt, propose the smallest viable, backward-compatible fix rather than unprompted full rewrites.
- **Traceability:** Label architecture claims explicitly as `[Direct]` (verified in code) vs `[Inferred]` (deduced).

---

## 🏛️ 10. System Genesis Protocol (New Projects / Major Redesign)
When designing new systems from scratch:
1. **Domain Elicitation:** Clarify 4 key dimensions: Actors/RBAC, State Lifecycle, Triggers/Side-effects, and Business Constraints.
2. **8-Point Production Baseline:**
   - State UX (Loading, Empty, Error, Success).
   - Schema validation on client and server.
   - Pagination, search debouncing (300ms), and filtering.
   - Confirmation dialogs and soft deletes.
   - Toast feedback and submit button loading locks.
   - Backend RBAC enforcement on all endpoints.
   - Transaction locks and unique constraints.
   - `created_at`, `updated_at`, and audit tracking.

---

## 📑 11. Spec-Driven Development (SDD) & Contract-First Gate
- **Declare Schema First:** Define Zod schemas and infer TypeScript types (`z.infer<...>`) in dedicated contract files before implementing UI or handlers.
- **Freeze Contract:** Use contracts as the single source of truth across both client and server layers.
