---
name: backend-data
description: Strict TypeScript Mastery, PostgreSQL & Prisma ORM Architecture, API Design, Security, and Transaction Optimization
---

# Backend, Data Architecture & Strict TypeScript Skill

> Production engineering standards for backend systems, PostgreSQL, Prisma ORM, RESTful APIs, and strict TypeScript without `any`.

---

## 1. Strict TypeScript Standards (No-Any Policy)

* **Eliminate `any`:** Use `unknown` combined with Type Narrowing (Zod schemas, `typeof`, `instanceof`) for untrusted or dynamic data.
* **Discriminated Unions:** Define explicit states for asynchronous data operations (e.g., `{ status: 'success'; data: T } | { status: 'error'; message: string }`).
* **Zod Schema Inference:** Always infer types directly from schemas using `z.infer<typeof MySchema>` to eliminate drift between runtime validation and static types.

---

## 2. Database & Prisma ORM Optimization

* **Prevent N+1 Queries:** Select explicit fields using `select` or scoped `include`. Never load unbounded relational graphs.
* **Index Strategy:** Place `@@index` on Foreign Keys and columns frequently used in `WHERE`, `ORDER BY`, and `JOIN` clauses.
* **Safe Transactions:** Wrap multi-table state transitions in `prisma.$transaction([ ... ])` (e.g., stock decrement + invoice creation).
* **Soft Deletes:** Standardize on `deletedAt DateTime?` and filter queries with `where: { deletedAt: null }`.

---

## 3. API Security & Validation

* **Strict Input Parsing:** All server endpoints and Server Actions must validate request bodies, query parameters, and headers with Zod before executing business logic.
* **Zero Hardcoded Secrets:** Use environment variables (`.env`) or secret placeholders (`<secret:VAR_NAME>`).
* **Sanitized Error Responses:** Never expose raw SQL errors, stack traces, or database schema internals to the client. Map all exceptions to structured, safe error messages.

---

## 4. Better Auth & Identity Standards

* **Default Auth Stack:** Standardize on **Better Auth (`better-auth`)** with `@better-auth/prisma-adapter`.
* **Schema Alignment:** Run `npx @better-auth/cli generate` to ensure `User`, `Session`, `Account`, and `Verification` tables match the Prisma schema.
* **Type-Safe Client Hooks:** Use `authClient.useSession()` on Vue (Nuxt 4) or React (Next.js 15) for full end-to-end type inference.
* **Multi-Tenancy Integration:** Use Better Auth's `organization()` plugin paired with Prisma Multi-Tenant query extensions for automated tenant isolation.
