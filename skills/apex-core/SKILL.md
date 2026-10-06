---
name: apex-core
description: Use for non-trivial software engineering work—planning, implementation, debugging, review, or verification—when disciplined Apex-core rules, universal principles, and modular stack adapters should guide the work.
---

# Apex-core Entry Point (v6.0)

Use this entry skill for applicable software engineering work under Apex v6.0.

1. **Read Micro-Kernel First:** Read `../../AGENTS.md` for core non-negotiable invariants (R0–R4).
2. **Deterministic Turn-1 Inspection:** Concurrently inspect target files and the project root manifest (`package.json`, `pyproject.toml`, `*.csproj`).
3. **JIT Adapter Loading:**
   - For Web Full-Stack projects (Nuxt 4 / Next.js 15), load `../../adapters/web-fullstack.md`.
   - For Backend & Data projects (Prisma, PostgreSQL, Server APIs), load `../../adapters/backend-data.md`.
   - For Polyglot systems (Python, C# .NET, Automation CLI), load `../../adapters/polyglot-core.md`.
   - For universal cross-stack architectural baselines, reference `../../core/principles.md`.
   - *Fast Track Exemption:* For surgical low-risk fixes (1–3 files), skip adapter loading and execute directly via R0–R4.
   - *Risk Override Gate:* If the change touches Auth, Money/PII, Schema, OCC, or Breaking APIs, load `adapters/backend-data.md` regardless of file count.
4. **Targeted In-RAM Verification:** Verify using project-native tools on the host. Deliver actual terminal evidence with strict Seam vocabulary (`[Verified: Test]`, `[Verified: Compiler]`, `[Syntax-Only]`, `[Unverified: Visual]`).
5. **Optional Nexus Memory:** Use Nexus MCP tools (`nexus_get_state`, `nexus_save_session`) only when available. Never hallucinate memory when offline.
