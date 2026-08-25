# 02. Coding Standards & Conventions

> **Priority 2:** Production-ready code standards, TypeScript conventions, and async runtime rules.

---

## 1. Strict Type Safety (No `any`)
- **Strictly prohibit `any` in TypeScript.**
- When data structures are dynamic or uncertain, use `unknown` with **Type Narrowing** (Type Guards, Zod validation).
- Explicitly type all function parameters, return values, and state variables.

---

## 2. Debuggable Error Handling
- **Never swallow errors:** In `try-catch` blocks, never catch an error and discard it silently.
- **Log root errors server-side:** Always log the original error with context (e.g. `console.error('[Context] Failed to fetch user:', error)`).
- **Safe client error response:** Return safe, sanitized error codes to clients. **Never expose raw database errors or stack traces to clients.**

---

## 3. No Placeholder Code
- All generated code must be 100% executable and functional.
- **Never leave comments like `// TODO: implement this`** or empty function stubs.

---

## 4. Naming Conventions & Organization
- **Variables & Functions:** `camelCase` (e.g., `getUserById`, `calculateTotal`)
- **Components & Classes:** `PascalCase` (e.g., `UserProfile.vue`, `AuthModal.tsx`)
- **Files & Directories:** `kebab-case` (e.g., `user-profile.ts`, `auth-service/`)
- **Constants & Enums:** `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE`)
- **Types & Interfaces:** `PascalCase` (e.g., `UserCreateInput`, `ApiResponse<T>`)
- **Booleans:** Prefix with `is`, `has`, `can`, `should` (e.g., `isActive`, `hasPermission`)
- **File Length Limits:**
  - Backend Services / Logic: Maximum **~300 lines** (refactor into focused modules if exceeded).
  - UI Components: Maximum **~200 lines** (decompose into sub-components if exceeded).
- **Separation of Concerns (Container-Presenter Pattern):**
  - Route views / Pages act strictly as **Containers**: call domain composables/hooks and pass state down via props.
  - Presentational components (`components/<domain>/`) must be **Dumb UI**: receive typed props, emit user actions, and contain zero direct HTTP/API calls.
  - Domain business logic, caching, and state machines belong strictly in **Composables/Hooks (`composables/use<Domain>.ts`)** or **Services (`server/services/<domain>.service.ts`)**.
- **Import Ordering:** 1) Node built-ins, 2) External dependencies, 3) Internal/Shared modules, 4) Relative paths (separated by empty lines).
- **Dead Code:** Remove unused code immediately. Do not keep dead code commented out.

---

## 5. Async / Await & Runtime Logic Best Practices
- **Never use `Array.prototype.forEach` with async callbacks:** `forEach` does not await promises and swallows errors. Use `for (const item of items)` for sequential execution or `await Promise.all(items.map(...))` for parallel tasks.
- **Nullish Coalescing Guard (`??` vs `||`):** For numeric (`0`) and boolean (`false`) values, **always use `??`**. Using `||` causes valid falsy values to be overwritten by defaults.
- **Component Props Immutability:** Never mutate properties in objects or arrays passed via props. Use `emit('update:modelValue')` or clone local state before mutation.
- **Memory Leak & Listener Cleanup:** Event listeners (`window.addEventListener`), subscriptions, and timers (`setInterval`) bound within components must be cleaned up in `onUnmounted()` (Vue) or the cleanup return function of `useEffect()` (React).
- **React Hook Dependencies:** Always provide exhaustive dependencies in `useEffect`, `useCallback`, and `useMemo` to prevent stale closure bugs.
- **React Server Actions Zero Trust:** Server Actions (`"use server"`) are public HTTP endpoints. **Validate inputs with Zod and check session/roles before processing.**
- Use `Promise.all()` for independent asynchronous operations to run concurrently.
- Never leave promises unhandled without `await` or `.catch()`.
- Guard against race conditions using `AbortController` in search inputs and optimistic locking for shared database records.

---

## 6. Git & Commit Conventions
- **Conventional Commits:** Format as `type(scope): description` (lowercase description, under 72 characters).
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.
- **Branch Naming:** `feature/xxx`, `fix/xxx`, `hotfix/xxx`, `release/xxx`.
- **Solo Developer Exception:** 
  - In team settings, branch from `develop` and merge via PR.
  - Solo developers may commit directly to `main` for speed and simplicity.

---

## 7. Documentation & Code Comments
- **Comment WHY, not WHAT:** Document the reasoning, architecture trade-offs, and non-obvious constraints. Avoid restating what the code visibly does.
- Use **JSDoc / TSDoc** on public functions, shared composables, and interfaces.
- **Architecture Decision Records (ADRs):** Record significant architectural decisions in `docs/adr/`.

---

## 8. Intent-Based Tool Safety, Refactoring & Package Manager Standards
- **Strict Package Manager Awareness:** Verify the repository lockfile (`pnpm` vs `npm` vs `bun` vs `yarn`) before executing commands.
- **Zero Guesswork & Mathematical Code Verification:**
  - Never guess non-existent CSS or Tailwind classes (e.g. `w-13`, `w-5.5`).
  - All coordinate calculations, translations, and aspect ratios must use verified formulas and scale values.
- **Investigative / Audit Safe Mode:** 
  - When asked to "explain", "investigate", or "audit", operate strictly in Read-Only mode (`view_file`, `grep_search`, `find_by_name`, `list_dir`).
  - **Never use write/edit tools or execute database migrations without explicit user approval.**
- **Atomic Refactoring & Zero Legacy Clutter:**
  - When migrating route paths or restructuring folders, remove legacy files within the same step. Never leave obsolete duplicates behind.
- **Tool Transparency & Anti-Hidden Scripting:**
  - Modify project files using native tools (`replace_file_content`, `write_to_file`) with explicit paths and diffs.
  - Never execute unmonitored batch scripts in `/scratch/` to silently modify project source files.
- **Idempotent DB Migrations & Seeding:** Schema modifications and seed scripts must be safe and idempotent to prevent database pollution during verification.

---

## 9. Stack-Specific Gotchas & Architecture Lessons

### A. Nuxt 4 + Prisma 7 Driver Adapter Rule
- **Driver Adapter Mandatory:** Prisma v7 requires explicit driver adapters (e.g. `@prisma/adapter-pg` for PostgreSQL).
- **Singleton Pattern:** In `server/utils/prisma.ts`, configure connection pooling and pass the adapter to `new PrismaClient({ adapter })`.

### B. Next.js 15 & React 19 Server Components / Actions Rule
- **RSC Boundary Discipline:** Add `'use client'` only where interactive state (`useState`, `useEffect`, event handlers) is strictly needed. Keep parent components Server Components.
- **Non-Serializable Props Guard:** Never pass functions or class instances from Server Components to Client Components.
- **Hydration Mismatch Prevention:** Avoid rendering environment-dependent values (`window`, `localStorage`, `Date.now()`, `Math.random()`) during initial SSR passes.

### C. PostCSS & CSS File Structure
- **@import Precedence:** External font `@import url(...);` directives must reside at the very first line of CSS files before `@tailwind base;` to prevent PostCSS parser warnings.

### D. Typed Auth Function Returns
- Composable / Hook `login()` methods must return typed user profiles (`UserProfile | null`) rather than a bare boolean `true` to ensure downstream routing has immediate access to user roles.

### E. Pre-Refactoring Dead Code Cleanup Protocol
- When upgrading architectures (e.g. switching to Dual-Role RBAC or versioned `/api/v1/*`), remove legacy files immediately to prevent shadow file collisions.
