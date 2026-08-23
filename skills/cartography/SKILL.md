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
  1. Use `grep_search` or `find_by_name` to pinpoint exact symbols, functions, or file targets first.
  2. Use bounded `view_file` calls with explicit `StartLine` and `EndLine` (150–200 lines maximum).
  3. Rely on Type Definitions and Schema Interfaces to plan changes instead of reading full implementation details.
