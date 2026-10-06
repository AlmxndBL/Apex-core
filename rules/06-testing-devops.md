# 06. Testing, DevOps & Observability Standards

> [!NOTE]
> **Apex v6.0 Migration Notice:** Canonical rules have moved to the v6.0 modular kernel.
> - Git discipline and clean engineering commits: [`core/principles.md`](../core/principles.md)
> - Fast in-memory verification engine: [`skills/quality-verify/SKILL.md`](../skills/quality-verify/SKILL.md)
> - Dual-speed Docker & GitHub Actions CI: [`templates/docker/`](../templates/docker/) and [`templates/ci/`](../templates/ci/)
> This file is preserved for backward-compatibility with existing links and tooling.

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

### Security Regression Baseline (Select the relevant surface when authentication, PII, money, uploads, or exposed APIs are in scope)
- **Protected route:** Add negative tests proving anonymous callers receive `401`/`403` and a low-privilege user cannot access or mutate another user's resource.
- **Client-facing response:** Assert the response omits secrets, session/account tokens, encryption/blind-index fields, QR bearer tokens, payment artifacts, and PII not needed for the user journey.
- **Public list or search:** Test rate-limit behavior (`429`), pagination/result caps, stable ordering, and query validation.
- **Upload route:** Test malformed/oversized uploads and content-type/magic-byte validation.
- **High-impact mutation:** Test RBAC, ownership, allowed state transitions, idempotency/OCC, actor-backed audit records, and duplicate/replay handling.
- **Cookie-based auth:** Test cross-origin/CSRF rejection and expected cookie attributes in the deployment-equivalent environment.
- Use the evidence vocabulary in `skills/quality-verify/SKILL.md`. Record **Design Risk** for a threat-model gap; do not present static code evidence as a verified exploit.

---

## 💻 2. Local-First Development & Deployment Standards
- **Local Dev First (Default Workflow):** Prioritize local native execution using the repository's detected package manager (`npm`, `pnpm`, `yarn`, or `bun`) and its existing test/build scripts. Use local PostgreSQL only when the project requires it.
- **Docker Policy (On-Demand Only):** **Never create Dockerfiles or docker-compose files unprompted. Use Docker strictly when explicitly requested by the user.**
  - When Docker is requested: Use multi-stage builds, non-root user execution, and pinned base images (`node:20-alpine`).
  - **Data-Safety Gate:** Before running a compose command that can execute migrations, seeders, resets, truncation, or volume deletion, inspect the entrypoint/command and state the exact data impact. Obtain explicit approval before actions that can clear or reseed existing data.
  - **Seed Control:** Application startup must not automatically delete or reseed persistent data. Make destructive seed/reset steps explicit local/test-only commands or require an opt-in flag such as `RUN_SEED=true`.
  - **Production Exposure:** Do not publish database ports to the host by default in production compose. Inject secrets from deployment environment/secret management; never commit usable production secrets or database passwords into compose files.

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
  1. **Tier 1: Fast In-Memory TypeCheck [Default Gate for all edits]:**
     - **Nuxt 4 / Vue:** `pnpm vue-tsc --noEmit` (or `npx vue-tsc --noEmit`)
     - **React / Next.js:** `pnpm tsc --noEmit` (or `npx tsc --noEmit`)
     - *Benefit:* Validates types, props, broken imports, and syntax in RAM without writing bundles to disk.
  2. **Tier 2: Targeted Behavior Tests [For API / business logic changes]:**
     - Run the smallest test suite that observes the changed behavior, direct affected callers/consumers, and a justified failure path (for example, `pnpm vitest run path/to/behavior.spec.ts`). Do not limit scope merely to modified files.
  3. **Tier 3: Full Production Build (`pnpm run build`) [Reserved strictly for 3 cases]:**
     - 1) Modifications to global framework configs (`nuxt.config.ts`, `next.config.js`, `tailwind.config.js`, `package.json`).
     - 2) Major architectural migrations or global route restructuring.
     - 3) Final release delivery milestone or explicit user command.

### Adaptive Completion Checks
- Apply the relevant post-implementation checks in `skills/quality-verify/SKILL.md`; always cover acceptance criteria, changed-behavior regression, and required terminal verification evidence, then add UI, mutation, API/auth, state, contract, or layout checks only when the change calls for them.
- Use the expected-red and two-strike definitions in `skills/quality-verify/SKILL.md`. Two consecutive unexpected verification failures still pause automatic retries.

### Security Release Gate (When the project is exposed beyond a trusted local environment)
- Run the relevant dependency audit and document actionable advisories.
- Verify security headers, environment fail-fast checks, secret-free public runtime configuration, and production-safe Docker/seed behavior.
- Re-run the applicable security regression baseline after changes to auth, API routing, payment flows, PII handling, upload handling, or deployment configuration.
