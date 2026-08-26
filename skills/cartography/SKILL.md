---
name: cartography
description: AST Codebase Skeleton Mapping, Selective Token Diet, and Project Exploration for Fast Onboarding
---

# Codebase Cartography & Token Diet Skill

> Fast codebase discovery using AST Skeleton Mapping and strict token diet controls to prevent context window bloat and hallucination.

---

## 1. AST Skeleton Mapping (Fast Discovery in 1s)

* When onboarding to a new codebase or re-entering an existing project, generate a compact skeleton map of types, function signatures, and endpoint routes.
* Keep the initial structural overview within 500–800 tokens to preserve working memory without reading full implementation files.

---

## 2. Selective Token Diet (Search First, Read Second)

* [FORBIDDEN] **Never view entire 1,000+ line files** or load unrequested adjacent modules into context.
* [STANDARD] **Selective Retrieval Protocol:**
  1. Use `grep_search`, `find_by_name`, or directory listing tools to pinpoint exact symbols, functions, or file targets first.
  2. Use bounded `view_file` calls with explicit `StartLine` and `EndLine` (150–200 lines maximum).
  3. **Exception for Schemas/Contracts:** Allow viewing up to 600 lines for `schema.prisma`, OpenAPI specs, and core shared type definitions to prevent broken inverse relations (`@relation`) or missing discriminated union variants.
  4. Rely on Type Definitions and Schema Interfaces to plan changes instead of reading full implementation details.

---

## 3. High-Precision Compiler AST Extraction Tool

* Use the dedicated TypeScript Compiler AST engine located at `skills/cartography/scripts/ast-extractor.js`:
  ```javascript
  import { extractAstSkeleton } from './scripts/ast-extractor.js';
  const skeleton = extractAstSkeleton('service.ts', fullCode);
  ```
* **Capabilities:**
  - **TypeScript & JavaScript (`.ts`, `.tsx`, `.js`, `.jsx`):** Parses full TypeScript AST via `ts.createSourceFile`. Prunes all function/method bodies while preserving 100% of signatures, interfaces, type aliases, generics (`<T>`), async/export flags, and arrow functions with destructuring.
  - **Vue SFC (`.vue`):** Automatically extracts and parses `<script lang="ts">` / `<script setup>` contracts.
  - **Prisma Schema (`.prisma`):** Preserves complete relation mappings (`@relation`), field modifiers (`@id`, `@unique`, `@default`), and model block attributes (`@@index`, `@@unique`, `@@id`, `@@map`).
