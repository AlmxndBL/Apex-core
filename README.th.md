# โก Apex-core 5 โ€” The Deterministic AI Agent Operating Protocol

> **The Disciplined Senior Engineering Engine & Token Economy Control Plane for AI Coding Agents**  
> เธชเธ–เธฒเธเธฑเธ•เธขเธเธฃเธฃเธกเธฃเธฐเธเธเธเธงเธเธเธธเธกเน€เธเธดเธเธงเธดเธจเธงเธเธฃเธฃเธก (Deterministic Control Plane) เธชเธณเธซเธฃเธฑเธเธเธณเธเธฑเธเธเธธเธ“เธ เธฒเธเธเธฒเธฃเธเธฑเธ’เธเธฒเธเธญเธเธ•เนเนเธงเธฃเนเธเธญเธ AI Coding Agents เธฃเธญเธเธฃเธฑเธ Nuxt 4 (Vue 3), Next.js 15 (React 19), Better Auth, Prisma ORM, เนเธฅเธฐ Full-Stack Architecture โ€” เธเนเธฒเธเธเธฒเธฃเธเธดเธชเธนเธเธเนเน€เธเธดเธเธเธฃเธฐเธเธฑเธเธฉเนเธงเนเธฒเธเนเธงเธขเธฅเธ”เธ เธฒเธฃเธฐ Token เธเธฒเน€เธเนเธฒเนเธ”เนเน€เธเธฅเธตเนเธข **58.4% (เนเธฅเธฐเธฅเธ”เนเธ”เนเธชเธนเธเธชเธธเธ”เธ–เธถเธ 88.9% เธเธเธฃเธฐเธเธเธเธเธฒเธ”เนเธซเธเน)** (*p* = 4.87 × 10⁻¹¹) เธเธฒเธเธเธฒเธฃเธ—เธ”เธชเธญเธเธเธเธเธธเธ”เธเธฒเธเธเธฃเธดเธ 50 เธเธฒเธ

<div align="center">

**[ ๐ฌ๐ง English ](README.md) ยท [ ๐น๐ญ เธ เธฒเธฉเธฒเนเธ—เธข ](README.th.md)**

</div>

<div align="center">

[![Version](https://img.shields.io/badge/version-5.4.0-3b82f6.svg)](https://github.com/AlmxndBL/Apex-core)
[![Token Savings](https://img.shields.io/badge/Token_Savings-๐”ป_58.4%25_empirical-10b981.svg)](https://github.com/AlmxndBL/Apex-eval)
[![License](https://img.shields.io/badge/license-MIT-8b5cf6.svg)](LICENSE)

</div>

---

## ๐ฏ 1. เธเธธเธ”เธเธญเธ”เธ—เธตเนเนเธกเนเธกเธตเนเธเธฃเธเธญเธเธเธธเธ“: เธเธฒเธฃเธฃเธฑเนเธงเนเธซเธฅเธเธญเธ Token (Stateless Token Bleed)

เนเธเธฃเนเธเธฃเธกเน€เธกเธญเธฃเนเธชเนเธงเธเนเธซเธเนเธเธดเธ”เธงเนเธฒเธเธฒเธฃเนเธเนเธเธฑเนเธ 5 เธเธฃเธฃเธ—เธฑเธ”เธเนเธฒเธขเธเนเธฒ Token เนเธเน 5 เธเธฃเธฃเธ—เธฑเธ”เธเธฑเนเธ เนเธ•เนเนเธเธเธงเธฒเธกเน€เธเนเธเธเธฃเธดเธ **LLM API (OpenAI, Anthropic) เธ—เธณเธเธฒเธเนเธเธ Stateless REST** เธ—เธธเธเธฃเธญเธเธ—เธตเนเธเธธเธขเธเธถเธเธ•เนเธญเธเธชเนเธเธเธฃเธฐเธงเธฑเธ•เธดเน€เธเนเธฒเนเธฅเธฐเนเธเธฅเนเธ”เธดเธ 2,000 เธเธฃเธฃเธ—เธฑเธ”เธเนเธณเน€เธเนเธฒเนเธเนเธซเธกเน เธ—เธณเนเธซเนเน€เธเธดเธ”เธเธฒเธฃเธชเธฐเธชเธก Token เนเธเธเธขเธเธเธณเธฅเธฑเธ $\mathcal{O}(N^2)$

```text
โ”โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”      โ”โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”
โ” โ เธฃเธฐเธเธเธ—เธฑเนเธงเนเธ (เนเธซเธฅเธ”เนเธเธฅเนเน€เธ•เนเธก: 1,858 BPE tok)      โ”      โ” โ… APEX-CORE 5 AST DIET (เธชเธเธฑเธ” Interface: 67 tok) โ”
โ”โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”ค      โ”โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”ค
โ” <template>                                       โ”      โ” // [AST SKELETON: Vue 3 / Nuxt 4 SFC]            โ”
โ”   <div class="min-h-screen bg-zinc-950 p-6">     โ” โ”€โ”€โ”€> โ” export interface UserTableRow {                  โ”
โ”     <!-- 80+ เธเธฃเธฃเธ—เธฑเธ” HTML markup & SVG icons -->   โ”      โ”   id: string; email: string; role: Role;         โ”
โ”     <table class="w-full border border-zinc-800">โ”      โ” }                                                โ”
โ”   </div>                                         โ”      โ” export interface Props { users: UserTableRow[] } โ”
โ” </template>                                      โ”      โ” export function useUserManagement(): StateStore; โ”
โ” <script setup lang="ts">                         โ”      โ”                                                  โ”
โ”   // 60 เธเธฃเธฃเธ—เธฑเธ”เธเธญเธเน€เธเธทเนเธญเนเธเธเธฑเธเธเนเธเธฑเธ                 โ”      โ”                                                  โ”
โ” </script>                                        โ”      โ”                                                  โ”
โ””โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”      โ””โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”
                 ๐”ป เธฅเธ”เธเธเธฒเธ” Context เธฅเธ 96.4% (<0.14ms V8 In-RAM Extraction)
```

Apex-core 5 เน€เธเธฅเธตเนเธขเธเธเธฒเธฃเธชเธฑเนเธเธเธฒเธเนเธเธเธเธณเธเธญเธฃเนเธญเธ (`.cursorrules`) เนเธซเนเธเธฅเธฒเธขเน€เธเนเธ **Deterministic Control Plane**:
1. **AST Codebase Cartography:** เธเธฃเธญเธเน€เธเธทเนเธญเนเธเธเธฑเธเธเนเธเธฑเธเธ—เธดเนเธ เธชเนเธเน€เธเธเธฒเธฐ Type Interface เน€เธเนเธฒเนเธกเน€เธ”เธฅ (**-77.6% Context Diet**, p = 0.0031)
2. **In-RAM Closed-Loop Verifier:** เธฃเธฑเธ `vue-tsc` / `tsc` เนเธ RAM เธ—เธฑเธเธ—เธต (< 1s) เธ•เธฑเนเธเน€เธเนเธฒเธเธเธเธฒเธเนเธเธฃเธญเธเน€เธ”เธตเธขเธง ($N \to 1.04$ เธฃเธญเธ โ€” เน€เธเนเธฒเธซเธกเธฒเธขเน€เธเธดเธเธ”เธตเนเธเธเน)
3. **2-Strike Circuit Breaker:** เธ•เธฑเธ”เธงเธเธเธฃ Freeze เธ—เธฑเธเธ—เธตเน€เธกเธทเนเธญเนเธเนเนเธกเนเธเนเธฒเธ 2 เธเธฃเธฑเนเธเธ•เธดเธ” เธซเธขเธธเธ”เธเธฒเธฃเน€เธเธฒเธเธฅเธฒเธ Token เนเธ”เธขเน€เธเธฅเนเธฒเธเธฃเธฐเนเธขเธเธเน

---

## โก 2. เธงเธดเธเธตเน€เธฃเธดเนเธกเนเธเนเธเธฒเธเนเธ 5 เธงเธดเธเธฒเธ—เธต (Single Drop-in Setup)

เธเนเธญเธเธเธตเนเนเธเธฅเน [`AGENTS.md`](./AGENTS.md) เนเธเธงเธฒเธเธ—เธตเน Root Directory เธเธญเธเนเธเธฃเน€เธเธเธ•เนเธเธธเธ“:

```bash
# เธชเธณเธซเธฃเธฑเธ Cursor IDE
cp AGENTS.md .cursorrules

# เธชเธณเธซเธฃเธฑเธ Claude Code CLI
cp AGENTS.md CLAUDE.md

# เธชเธณเธซเธฃเธฑเธ Windsurf / Trae / Google Antigravity
# เธงเธฒเธเน€เธเนเธ AGENTS.md เธ—เธตเน Root เธซเธฃเธทเธญเน€เธเธทเนเธญเธกเธ•เนเธญเน€เธเนเธ Workspace Rule
```

### ๐งญ เธฃเธฐเธเธเธ•เธฃเธงเธเธเธฑเธ Stack เธญเธฑเธ•เนเธเธกเธฑเธ•เธด (Deterministic Stack Matrix)
`AGENTS.md` เธเธฐเธญเนเธฒเธ `package.json` เธเธญเธเนเธเธฃเน€เธเธเธ•เนเน€เธเธทเนเธญเนเธกเธเธชเธ–เธฒเธเธฑเธ•เธขเธเธฃเธฃเธกเนเธฅเธฐเธเธณเธชเธฑเนเธเธ•เธฃเธงเธเธชเธญเธ Type เธ—เธตเนเธ–เธนเธเธ•เนเธญเธเนเธ”เธขเธญเธฑเธ•เนเธเธกเธฑเธ•เธด:

| เธชเนเธ•เธเธ—เธตเนเธ•เธฃเธงเธเธเธ | Logic Layer | Presenter Layer | API Endpoints | Fast In-RAM TypeCheck |
|---|---|---|---|---|
| ๐’ **Nuxt 4 (Vue 3 + Nitro)** | `composables/use<Feature>.ts` | `<Feature>List.vue` | `server/api/v1/*.ts` | `pnpm vue-tsc --noEmit` |
| โก **Next.js 15 (React 19)** | `hooks/use<Feature>.ts` | `<Feature>List.tsx` | `app/api/v1/*/route.ts` | `pnpm tsc --noEmit` |
| ๐ **Polyglot / Backend** | `services/<feature>_service` | Native Views | Framework Handlers | `pytest -q` / `go test` |

---

## ๐“ 3. เธเธฒเธฃเธเธฃเธฐเน€เธกเธดเธเนเธฅเธฐเธซเธฅเธฑเธเธเธฒเธเน€เธเธดเธเธเธฃเธฐเธเธฑเธเธฉเน (Empirical Evidence)
 
Apex-core เธเนเธฒเธเธเธฒเธฃเธเธดเธชเธนเธเธเนเนเธฅเธฐเธ•เธฃเธงเธเธชเธญเธเธญเธขเนเธฒเธเน€เธเนเธเธญเธดเธชเธฃเธฐเธเนเธฒเธเธเธธเธ”เธ—เธ”เธชเธญเธเธกเธฒเธ•เธฃเธเธฒเธเธงเธดเธเธฑเธข **[Apex-eval](https://github.com/AlmxndBL/Apex-eval)** เธเธ **$N = 50$ เธเธฒเธเธเธฑเธ’เธเธฒเธเธฃเธดเธ** เธเธฒเธ 10 เนเธเนเธ”เน€เธเธชเธเธ GitHub (เธฃเธงเธก 150 Trajectories เธฃเธฑเธเธชเธ”เธเธ Frontier API):
 
| เธ•เธฑเธงเธเธตเนเธงเธฑเธ” | Arm A (เนเธกเน€เธ”เธฅเธ—เธฑเนเธงเนเธ/เน€เธเธตเธขเธเธ—เธฑเธเน€เธ•เนเธกเนเธเธฅเน) | Arm B (เธกเธฒเธ•เธฃเธเธฒเธ Search/Replace Diff) | Arm C (Apex-core Engine) | เธเธฑเธขเธชเธณเธเธฑเธเธ—เธฒเธเธชเธ–เธดเธ•เธด |
|---|---|---|---|---|
| **เธเธงเธฒเธกเนเธกเนเธเธขเธณ Pass@1** | **100% (50/50)** | **100% (50/50)** | **100% (50/50)** | เนเธเนเนเธเนเธ”เธเนเธฒเธ Unit Test 100% |
| **เธเธฒเธฃเธเธนเนเธเธทเธ Pass@5** | **100%** | **100%** | **100%** | เธเธดเธ”เธเธฒเธเนเธ”เนเนเธเธฃเธญเธเนเธฃเธเธ—เธฑเนเธเธซเธกเธ” |
| **เธเธณเธเธงเธเธฃเธญเธเน€เธเธฅเธตเนเธข** | **1.00 เธฃเธญเธ** | **1.00 เธฃเธญเธ** | **1.00 เธฃเธญเธ** | เธเธเธเธฒเธเนเธเธฃเธญเธเน€เธ”เธตเธขเธงเธชเธกเธเธนเธฃเธ“เน |
| **เธเนเธฒเน€เธเธฅเธตเนเธข Token เธเธฒเน€เธเนเธฒ** | 2,294 tok | 2,338 tok | **955 tok** | **๐”ป เธเธฃเธฐเธซเธขเธฑเธ”เธฅเธ -58.4% ($p = 0$)** |
| **Schema เนเธซเธเน (>800 เธเธฃเธฃเธ—เธฑเธ”)** | 7,270 tok | 7,309 tok | **3,557 tok** | **๐”ป เธฅเธ” Token เธฅเธ -51.1%** |
| **เน€เธญเธเธชเธฒเธฃ Context (>2,000 เธเธฃเธฃเธ—เธฑเธ”)**| 2,453 tok | 2,530 tok | **272 tok** | **๐”ป เธฅเธ” Token เธฅเธ -88.9%** |
 
<div align="center">
 
๐‘ **[ ๐”ฌ เธ”เธนเนเธเนเธ”เธเธธเธ”เธ—เธ”เธชเธญเธเนเธฅเธฐเนเธเธฅเน Telemetry เธฅเธฐเน€เธญเธตเธขเธ”เธ—เธฑเนเธเธซเธกเธ” (Apex-eval) โ’ ](https://github.com/AlmxndBL/Apex-eval)**  
*(เธฃเธงเธกเธเธธเธ”เธ—เธ”เธชเธญเธ 50 เธเนเธญเธเธฒเธ 10 เนเธเธฃเน€เธเธเธ•เน, เธ•เธฑเธงเธฃเธฑเธเน€เธเธญเธฃเนเธญเธฑเธ•เนเธเธกเธฑเธ•เธด, เธเนเธญเธกเธนเธฅ Telemetry เธ”เธดเธ, เนเธฅเธฐเธชเธกเธเธฒเธฃเธเธดเธชเธนเธเธเน Paired t-Test)*
 
</div>

---

## ๐งฐ 4. เธเธธเธ” 4 เน€เธชเธฒเธซเธฅเธฑเธเธชเธเธดเธฅเธเธงเธฒเธกเธฃเธนเนเน€เธเธดเธเธฅเธถเธ (Consolidated Skills)

1. ๐จ **[`skills/frontend`](./skills/frontend/SKILL.md):** 3-File Feature Module Architecture (`use<Feature>`, `<Feature>List`, `<feature>.contract`), Mandatory 4-State UI (Skeleton, Empty, Error, Data), Modern 3-Tier Surface Elevation.
2. ๐—๏ธ **[`skills/backend-data`](./skills/backend-data/SKILL.md):** Standard 4-Step API Pipeline, Strict TypeScript (Zero Any), Prisma ORM & OCC Concurrency Protection, Better Auth & RBAC.
3. ๐งช **[`skills/quality-verify`](./skills/quality-verify/SKILL.md):** In-RAM Fast TypeCheck (1-3s), Vitest Runner, Cumulative 2-Strike Failure Circuit Breaker.
4. ๐งญ **[`skills/cartography`](./skills/cartography/SKILL.md):** AST Codebase Skeleton Mapping, Selective Token Diet (เธฅเธ” Context Overhead 70-90%).

---

## ๐–ผ๏ธ 5. เธกเธฒเธ•เธฃเธเธฒเธเธเธฒเธ UI/UX เธฃเธฐเธ”เธฑเธ Enterprise

![Apex Enterprise UI Showcase](./templates/ui/assets/apex-enterprise-dashboard-showcase.png)

Apex เธเธฑเธเธเธฑเธเนเธเน **Ultra-Compact Modern SaaS Density**, 3-Tier Surface Elevation, Magic UI Theme Toggler, Interactive Sort/Filter Data Tables, เนเธฅเธฐ Crisp SVG Lucide Icons (Strict Zero Emojis) เธ—เธฑเนเธเนเธ **Vue 3 / Nuxt 4** เนเธฅเธฐ **React 19 / Next.js 15** เนเธเนเธ”เธ•เธฑเธงเธญเธขเนเธฒเธเธญเธขเธนเนเธ—เธตเน [`templates/ui/`](./templates/ui/).

---

## ๐ 6. Twin-Engine Synergy: Apex & Nexus

Apex เธญเธญเธเนเธเธเนเธซเนเธ—เธณเธเธฒเธเนเธเธ **100% Standalone (Zero Dependencies)** เนเธ•เนเธชเธฒเธกเธฒเธฃเธ–เน€เธเธทเนเธญเธกเธ•เนเธญเธเธฑเธ **[Nexus](https://github.com/AlmxndBL/nexus)** เน€เธเธทเนเธญเธเธฅเธ”เธฅเนเธญเธเธเธงเธฒเธกเธเธณเธฃเธฐเธขเธฐเธขเธฒเธง:

* **Apex:** เธเธเน€เธเธ“เธ‘เนเนเธฅเธฐเธงเธดเธเธฑเธขเธเธฒเธฃเน€เธเธตเธขเธเนเธเนเธ” (HOW to build, verify, and enforce safety)
* **Nexus:** เธเธฅเธฑเธเธเธงเธฒเธกเธเธณเนเธฅเธฐเธเธ—เน€เธฃเธตเธขเธเธเนเธฒเธกเนเธเธฃเน€เธเธเธ•เน (WHAT we know, decided, and learned)

---

## ๐’– Acknowledgements & Inspirations

* **๐งโ€โ๏ธ [Matt Pocock (Total TypeScript)](https://github.com/mattpocock/skills)** โ€” Strict TypeScript principles & contract typing
* **๐ฏ [The 9arm Way](https://github.com/jirayu-ct-dev/9arm-skills)** โ€” Pragmatic software engineering and trade-off evaluation
* **๐ง  [Andrej Karpathy](https://github.com/multica-ai/andrej-karpathy-skills)** โ€” Agent behavioral safeguards and anti-overengineering philosophy

