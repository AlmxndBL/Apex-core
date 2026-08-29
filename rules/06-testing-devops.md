# 06. Testing, DevOps & Observability Standards

> **Priority 6:** Automated testing standards, Docker infrastructure, CI/CD pipelines, and observability.

---

## 🧪 1. Automated Testing Standards
- **Test Runner:** Use **Vitest** as the default test runner (fast, native ESM and TypeScript support).
- **API Mocking:** Use **MSW (Mock Service Worker)** for network mocking.
- **E2E Testing:** Use **Playwright** for end-to-end user workflows.
- **Coverage Target:** Aim for 80%+ branch coverage across core business logic, authentication, and payment workflows.
- **Test Isolation & Zero DB Pollution:**
  - Test databases must be isolated from development/production databases.
  - Wrap database tests in transaction rollbacks or ephemeral test containers.
  - **Existing Test Account Reuse:** Reuse existing seed credentials when available rather than creating duplicate accounts.
  - **Ask Before Mocking:** If no test fixtures exist, confirm with the user before generating test mock seeds.

---

## 💻 2. Local-First Development & Deployment Standards
- **Local Dev First (Default Workflow):** Prioritize local native execution using the repository's detected package manager (`npm`, `pnpm`, `yarn`, or `bun`) and its existing test/build scripts. Use local PostgreSQL only when the project requires it.
- **Docker Policy (On-Demand Only):** **Never create Dockerfiles or docker-compose files unprompted. Use Docker strictly when explicitly requested by the user.**
  - When Docker is requested: Use multi-stage builds, non-root user execution, and pinned base images (`node:20-alpine`).

---

## 🚀 3. CI/CD Pipeline (GitHub Actions)
- Standard Pipeline Flow: `Build` $\rightarrow$ `Lint` $\rightarrow$ `TypeCheck` $\rightarrow$ `Test` $\rightarrow$ `Deploy`.
- **Staging Deployment:** Auto-deploy to staging upon push to `develop`.
- **Production Deployment:** Deploy to production upon push to `main`.
- **Solo Developer Exception:** Solo developers may deploy directly from `main` without waiting for pull request reviews.

---

## 📊 4. Observability & Structured Logging
- **Logger:** Use **Pino** for structured JSON logging.
- **Log Fields:** Every request log must include `requestId` (Correlation ID), `method`, `path`, `statusCode`, and `duration`.
- **PII & Secret Masking:** Never log passwords, auth tokens, API keys, credit card numbers, or sensitive PII.
- **Health Check Endpoint:** Expose `/api/health` returning `{ status: 'ok', uptime, db: 'connected' }` verifying actual database connectivity.

---

## 🚨 5. Error Tracking (Sentry)
- Configure Sentry for production error tracking.
- Separate **Operational Errors** (4xx client issues) from **Programmer Errors** (unhandled crashes sent to Sentry).
- Upload source maps strictly during production CI/CD builds.

---

## ⚡ 6. Tiered Verification Hierarchy & Build Efficiency

- **Anti-Build-Bloat Principle:**
  - Full build commands (`pnpm run build`, `nuxt build`, `next build`) trigger entire bundling, minification, and prerendering processes taking 30–120+ seconds.
  - ❌ **Never run full production builds for minor single-file edits** (CSS tweaks, button colors, punctuation, single function edits).

- **Tiered Verification Hierarchy:**
  1. **Tier 1: Fast In-Memory TypeCheck (1–3 Seconds) [Default Gate for all edits]:**
     - **Nuxt 4 / Vue:** `pnpm vue-tsc --noEmit` (or `npx vue-tsc --noEmit`)
     - **React / Next.js:** `pnpm tsc --noEmit` (or `npx tsc --noEmit`)
     - *Benefit:* Validates types, props, broken imports, and syntax in RAM without writing bundles to disk.
  2. **Tier 2: Targeted Logic / Unit Tests (2–5 Seconds) [For API / business logic changes]:**
     - Run targeted test suites: `pnpm vitest run path/to/file.test.ts`.
  3. **Tier 3: Full Production Build (`pnpm run build`) [Reserved strictly for 3 cases]:**
     - 1) Modifications to global framework configs (`nuxt.config.ts`, `next.config.js`, `tailwind.config.js`, `package.json`).
     - 2) Major architectural migrations or global route restructuring.
     - 3) Final release delivery milestone or explicit user command.
