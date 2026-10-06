# 🏛️ Apex Core Universal Engineering Principles

> **Apex v6.0 Core · Universal Architecture & Behavioral Invariants**  
> Language-agnostic, cross-stack engineering principles applicable to all software developed under the Apex Operating Protocol.

---

## 1. 🛡️ Universal Security Baseline & Server Authority

Regardless of framework, language, or environment, these non-negotiable security invariants apply to every system:

### A. Absolute Server Authority
- **Zero Client Trust:** Client-side route guards, hidden buttons, and frontend validations are strictly UX conveniences, never authorization mechanisms.
- **Server-Side Session & Role Verification:** Every non-public API endpoint, RPC procedure, or mutation handler must derive the actor directly from a verified server-side session or cryptographic token.
- **Ownership & Tenant Boundary Enforcement:** Deriving an authenticated user is insufficient; handlers mutating or reading scoped data must enforce that the actor owns the record or belongs to the matching tenant (`tenant_id` / `org_id`).

### B. Secret Governance & Redaction
- **Zero Raw Secrets in Source Control:** API keys, database credentials, JWT secrets, and private keys must never exist in plaintext within the repository, test fixtures, or commits.
- **Secret Redaction Convention:** In logs, traces, and documentation, always redact secrets using `<secret:VARIABLE_NAME>`.
- **Environment Contract:** Every application must provide a sanitized `.env.example` defining required configuration variables with dummy placeholders.

### C. Financial & State Mutation Auditability
- **Immutable Audit Trail:** High-impact mutations (balance adjustments, role elevations, deletions, state transitions) must record immutable before/after audit metadata containing `actor_id`, `timestamp`, `action`, `ip_address`, and entity state snapshots.
- **Timing-Safe Cryptography:** Any HMAC signature comparison (such as payment webhooks) must use constant-time comparison (`timingSafeEqual`) to prevent timing attacks.

---

## 2. ⚡ Fail-Fast Error Handling & State Invariants

- **Validate at the Boundaries (Edge Ingestion):** Parse and validate all external inputs (HTTP bodies, query params, environment variables, message queues) at the ingestion boundary using strict schema parsers (e.g., Zod, Pydantic, FluentValidation).
- **Fail Fast, Fail Loud:** Do not catch errors to return partial or dummy data silently. If a required dependency fails or a state invariant is violated, throw immediately with a typed error code.
- **Standardized Error Envelope:** APIs must project structured, client-safe error payloads without leaking internal database stack traces or raw SQL queries to consumers:
  ```json
  {
    "success": false,
    "data": null,
    "error": {
      "code": "RESOURCE_NOT_FOUND",
      "message": "The requested entity does not exist or has been archived.",
      "details": []
    }
  }
  ```

---

## 3. 🧩 Architecture Bounds: Monolith-First, YAGNI & Design Patterns

### A. Monolith-First & Pragmatic Modularity
- **Anti-Premature Distribution:** Default to modular monoliths. Do not introduce microservices, distributed message queues, or event-sourcing architectures until bounded contexts, team topologies, or physical scale demand them.
- **Feature Module Boundaries:** Organize code by business domain/feature rather than technical layer alone (`features/orders/` containing its logic, presenters, and contracts).

### B. OOP & The Rule of Three Policy
- **Pragmatic Modern Standard:** Favor functional-first, compositional styles (Composition API, functional pipelines) by default. Use Object-Oriented Programming (OOP) where encapsulation and polymorphism genuinely simplify the problem.
- **The Rule of Three (Anti-Overengineering):** **Never introduce design patterns preemptively.** Design patterns may only be introduced when there are at least three distinct, concrete variants or business rules ($\ge 3$) actively in use.
- **Top 4 Approved Design Patterns:**
  1. **Strategy Pattern:** For interchangeable algorithms or business providers (e.g., payment gateways: Stripe, PromptPay, Omise; report export formats: PDF, CSV, XLSX).
  2. **Adapter Pattern:** For decoupling third-party SDKs, storage engines, or legacy subsystems from domain logic (e.g., S3 vs MinIO vs R2; Twilio vs AWS SNS).
  3. **State Pattern:** For finite state machines governing entity lifecycles with state-specific business transitions (e.g., Order: `Draft` $\to$ `PendingPayment` $\to$ `Paid` $\to$ `Fulfilled` $\to$ `Cancelled`).
  4. **Facade Pattern:** For orchestrating complex multi-subsystem workflows behind a single cohesive entry point (e.g., `CheckoutFacade.processCheckout()`).
- **Strictly Banned Anti-Patterns:**
  - ❌ **Manual Singletons:** Do not write manual singleton classes with private constructors; use standard module-level exports or framework Dependency Injection containers.
  - ❌ **Abstract Factory Overkill:** Do not create abstract factories for 1–2 simple object types; use plain factory functions.
  - ❌ **Deep Inheritance Hierarchies:** Deep inheritance (> 2 levels) is strictly prohibited. Always favor object composition over class inheritance.

---

## 4. 📦 Git Discipline & Clean Engineering Commits

- **Atomic Commits:** Each commit must represent a single logical change. Do not mix refactoring with feature delivery or unrelated fixes.
- **English-Only Commit Messages & Code Comments:** All git commit messages, PR descriptions, and inline code comments must be written in clear, concise English.
- **High-Signal Commit Format (Conventional Commits):**
  - `feat(<scope>): concise description`
  - `fix(<scope>): concise root cause fix`
  - `refactor(<scope>): internal structure change with zero behavior shift`
  - `docs(<scope>): documentation or specification update`
  - `chore(<scope>): tooling, dependencies, or configuration`
- **Delivery Purity Ratio (DPR = 1.0):** Every modified line must directly serve the user's explicit objective. Strictly zero drive-by refactoring of untouched files or accidental formatting churn.
- **Zero Repository Pollution:** Never commit temporary scratch scripts (`scratch.js`, `dummy_test.ts`), raw logs, or IDE-specific cache directories.
