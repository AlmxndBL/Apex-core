# ⚡ Apex 4.0 — Lean AI Agent Operating Protocol

> **Turn your AI Coding Agent into a Disciplined Senior Software Engineer in 10 Seconds.**  
> A pragmatic set of system rules, behavioral guardrails, and modular skills for AI Coding Assistants (Cursor, Claude Code, Google Antigravity, Windsurf) to enforce strict type-safety, surgical edits, and sub-second in-memory verification.

[ 🇬🇧 **English** | [🇹🇭 ภาษาไทย](./README_TH.md) ]

[![Version](https://img.shields.io/badge/version-4.0.0-blue.svg)](https://github.com/AlmxndBL/Apex-core)
[![Supported Tools](https://img.shields.io/badge/Agent-Cursor%20%7C%20Claude%20Code%20%7C%20Antigravity%20%7C%20Windsurf-818CF8.svg)](https://github.com/AlmxndBL/Apex-core)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ⚡ 10-Second Quickstart

Choose your preferred setup and drop the configuration into your project root:

### 🟢 1. Apex Nano (Recommended for Solo Devs — 1 Single File)
Copy [`presets/nano/AGENTS.md`](./presets/nano/AGENTS.md) into your project root (or rename to `.cursorrules` / `CLAUDE.md`):

```markdown
# ⚡ Apex Nano — Senior AI Coding Guardrails

1. 🛑 HARD INTENT LOCK: If user asks "why/how/audit", DO NOT edit code. Report root cause first.
2. 🧪 TIERED FAST CHECK: Run `tsc --noEmit` / `vue-tsc --noEmit` (1-2s). NEVER run full build for single edits.
3. 📜 EVIDENCE DELIVERY: No terminal output proof = Task is NOT complete.
4. ✂️ SURGICAL DIFFS: Modify ONLY targeted lines. Zero drive-by refactoring. Strict TypeScript (no any).
5. 🚨 2-STRIKE LOOP BREAKER: If a fix fails twice, STOP immediately and ask the user.
```

---

### 🟡 2. Stack-Specific Presets
* ⚡ **Next.js 15 / React 19:** Use [`presets/nextjs/AGENTS.md`](./presets/nextjs/AGENTS.md) (RSC, Server Actions, Zod, Prisma)
* 💚 **Nuxt 4 / Vue 3:** Use [`presets/nuxt4/AGENTS.md`](./presets/nuxt4/AGENTS.md) (Nitro, Composables, Hydration-Safe, Prisma)

---

### 🟣 3. Apex Pro Engine (For Google Antigravity & Studio Workspaces)
Link as a global live plugin via `~/.gemini/config/plugins.json`:
```json
{
  "entries": [
    { "path": "/absolute/path/to/Apex-core" }
  ]
}
```

---

## ⚔️ Real Problems Solved (Before vs After)

| ❌ Generic AI Agent | ✅ With Apex Operating Protocol |
|---|---|
| **Premature Editing:** Edits files when asked for an explanation or root cause audit. | **🛑 Hard Intent Lock:** Informational and audit queries remain STRICTLY READ-ONLY until approved. |
| **Hallucinated Completion:** Claims "done" without running checks, leaving broken builds. | **📜 Mandatory Evidence:** Requires terminal execution proof (TypeCheck/Tests) before completion. |
| **Build Bloat:** Runs full `npm run build` for minor single-line edits, wasting 1–3 minutes. | **🧪 In-Memory Fast Check:** Runs RAM-based `tsc` / `vue-tsc` checks in 1–3 seconds. |
| **Infinite Error Loops:** Repeats failed edits in a loop, burning tokens and context. | **🚨 2-Strike Loop Breaker:** Stops on 2 consecutive failures and reports root cause immediately. |
| **Drive-by Refactoring:** Replaces quotes or reformats entire files outside the task scope. | **✂️ Surgical Diffs:** Restricts edits strictly to target lines. Zero drive-by refactoring (YAGNI). |

---

## 🏛️ 3-Tier Architecture Model

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🟢 Tier 1: Apex Nano (1-File Drop-in — ~25 lines)                           │
│    • Target: Solo developers, standalone repos, zero-setup projects         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🟡 Tier 2: Apex Core (Stack Presets — Next.js / Nuxt 4)                     │
│    • Target: Full-stack engineers requiring framework-specific conventions │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🟣 Tier 3: Apex Pro Studio (Apex Engine + 4 Consolidated Skills + Templates)│
│    • Target: Multi-agent IDEs, monorepos, and enterprise production systems │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧰 4 Core Consolidated Skills (v4.0)

1. 🎨 **[`skills/frontend`](./skills/frontend/SKILL.md):** Enterprise UI/UX, Tailwind CSS, Dual Responsive Tables, HSL Semantic Palette, Vue/React Component Layers
2. 🗄️ **[`skills/backend-data`](./skills/backend-data/SKILL.md):** Strict TypeScript (No Any), PostgreSQL, Prisma Optimization, Better Auth, Indexing, Transactions, API Security
3. 🧪 **[`skills/quality-verify`](./skills/quality-verify/SKILL.md):** In-Memory Fast TypeCheck, Vitest Runner, Sandbox DB Rollback, 2-Strike Failure Recovery
4. 🧭 **[`skills/cartography`](./skills/cartography/SKILL.md):** AST Codebase Skeleton Mapping, Search-First Token Diet, Session Handoff

---

## 🌌 Twin-Engine Synergy: Apex & Nexus

Apex operates **100% standalone (zero dependencies)**, but seamlessly integrates with **[Nexus](https://github.com/AlmxndBL/nexus)** for persistent, cross-project memory:

* **Apex:** Code execution discipline, behavioral guardrails, and verification (**HOW** to build).
* **Nexus:** Cross-project knowledge vault, gotchas post-mortems, and architectural memory (**WHAT** was learned).

---

## 💖 Acknowledgements & Inspirations

* **🧙‍♂️ [Matt Pocock (Total TypeScript)](https://github.com/mattpocock/skills)** — Strict TypeScript principles
* **🎯 [The 9arm Way](https://github.com/jirayu-ct-dev/9arm-skills)** — Pragmatic software engineering and trade-off evaluation
* **🧠 [Andrej Karpathy](https://github.com/multica-ai/andrej-karpathy-skills)** — Agent behavioral safeguards and anti-overengineering philosophy
