# ⚡ Apex — Production-safe AI Coding Workflow

> **Apex helps coding agents understand the task, change only what matters, verify the result, and report evidence.**

Current release: `apex-core@5.5.0`

**[English](README.md) · [ภาษาไทย](README.th.md)**

Apex is a disciplined, local operating protocol and rule specification for AI coding agents. It provides structured operational guardrails—intent locking (read-only investigation vs. surgical patching vs. guarded destructive operations), targeted in-RAM verification, and mandatory evidence delivery—to guide coding agents when inspecting, modifying, and testing code in existing software repositories.

## What Apex is

Apex is an engineering protocol that governs how an AI coding agent approaches a codebase:
- **Disciplined Execution Protocol:** Defines clear intent tiers (read-only audits, surgical bug fixes, synthesis builds, and guarded destructive blast-radius gates) so the agent never oversteps the user's intent.
- **Surgical Code Modifications:** Enforces minimal, targeted diffs and prevents drive-by refactoring of unrelated files or unnecessary dependencies.
- **Verification Engine & Circuit Breaker:** Recommends fast, stack-aware targeted checks (such as in-RAM typechecks and localized tests) and halts runaway retry loops after two consecutive unexpected failures.
- **Evidence-First Delivery:** Requires the agent to provide concrete verification command outputs and test logs rather than unsupported confidence claims.

## What Apex is not

- **Not a production framework or runtime dependency:** Apex is never imported or deployed in your application runtime. Your project retains its own dependencies, package manager, and lockfile.
- **Not an autonomous daemon or CLI that edits code independently:** Apex does not execute code edits on its own; it instructs existing AI coding assistants (such as Antigravity, Cursor, Claude Code, Windsurf) how to act.
- **Not a replacement for Git, unit tests, or peer code review:** Existing repository conventions and human engineering judgment always take precedence.
- **Not dependent on Nexus:** Apex functions 100% standalone without external memory or MCP servers. Nexus is strictly an optional companion.

## Production-safe changes, not plausible code

Apex is for the moment when an agent's patch must survive contact with a real repository. It keeps the change focused, follows the project's conventions, checks the failure paths that matter, and leaves evidence instead of a confident claim.

The following are workflow labels, not separate commands. Apex selects the appropriate path from the task's intent and risk.

| Workflow label | When to use it | What Apex insists on |
|---|---|---|
| **Patch** | A bug fix or narrow adjustment | Root cause, a surgical diff, and a targeted regression check |
| **Build** | A new feature or cross-layer change | Explicit scope, project conventions, and the affected user path |
| **Review** | You need findings without modifying code | Read-only evidence, impact, and actionable priority |
| **Release** | Auth, money, database, PII, or shared contracts are involved | Risk-specific authorization, state, compatibility, and verification gates |

### A five-minute difference

```text
Without a delivery protocol
  "The endpoint works." → response is 200, but an unauthorized caller can still mutate another tenant's record.

With Apex
  Trace the consumer and mutation path → validate input → enforce server-side scope
  → exercise the forbidden path → report the command and result.
```

The goal is not more ceremony. It is the smallest change that is **complete, safe for its context, and verifiable**.

## What it solves

AI coding agents are fast but can misread intent, edit too broadly, retry blindly, or claim completion without proof. Apex provides a repeatable local workflow:

```text
Understand → inspect conventions → make the smallest useful change → verify → report evidence
```

- Reviews and audits remain read-only.
- Fixes follow diagnose → surgical implementation → targeted verification.
- Destructive work needs an explicit blast-radius approval.
- Two unexpected verification failures stop automatic retries and require a useful failure report.

## Start

### Mode 1: Point — recommended

Keep one checkout and connect its instructions/skills to your coding agent.

```bash
git clone https://github.com/AlmxndBL/Apex-core.git ~/.agents/Apex-core
cd ~/.agents/Apex-core && npm install
```

Use your coding agent's normal instruction or skill-registration mechanism to make this checkout available. `npm install` is only for running Apex's local integrity check; it does not modify a target project or activate Apex by itself.

### Mode 2: Vendor — self-contained projects

Copy [`AGENTS.md`](./AGENTS.md) into a target repository when it needs pinned local instructions. Copy `rules/`, `skills/`, and `templates/` too when the agent needs the full library.

```bash
cp AGENTS.md CLAUDE.md
```

The command above is for agents that read `CLAUDE.md`. For other agents, place `AGENTS.md` in the instruction location they support. Target projects retain their own dependencies, lockfile, and package manager. Apex only defines how agents inspect, change, and verify them.

### First task prompt

Once Apex's instructions are available to your agent, use a normal task request. For a clear first run, copy this prompt and replace the bracketed text:

```text
Use Apex for this task: [describe the bug, feature, or review].

Before changing code, inspect the relevant project conventions and affected flow.
Make the smallest safe change, then report the files changed, verification command,
terminal result, and any behavior that could not be verified.
```

## Apex + Nexus 4 (optional)

**Apex tells an agent how to work. Nexus remembers what earlier work established.**

| Question | Apex-core | Nexus 4 |
|---|---|---|
| How should this task run? | Intent, scope, safety, verification | — |
| What was already decided? | — | Project brief, ADRs, reusable lessons |
| What happens after work? | Verify and report evidence | Optional redacted session handoff |
| Where is the data? | Local instructions/tools | Local-first Markdown vault; no cloud/source upload by default |

Use Nexus only when its local MCP tools are available and the task benefits from memory:

```text
1. nexus_get_project_brief({ projectId: "apex-core" })
2. Follow Apex discovery → implementation → verification
3. nexus_save_session({ project: "apex-core", filesChanged: ["relative/path.ts"] })
```

Never save source code, `.env` contents, credentials, tokens, or raw terminal transcripts to Nexus. It is an optional local memory companion—not a source-code store.

## Inside Apex

- [`AGENTS.md`](./AGENTS.md): operating contract and safety gates
- [`rules/`](./rules): security, architecture, code quality, database, UI, and testing guidance
- [`skills/`](./skills): frontend, backend-data, verification, and cartography
- [`templates/`](./templates): reusable UI, blueprint, and context templates

Existing repository conventions always win. When a project has no convention, Apex supplies stack-aware defaults such as `vue-tsc --noEmit`, `tsc --noEmit`, `pytest -q`, or `go test`.

## Evidence and limitations

Apex operates under an epistemic doctrine of empirical evidence over confident assertions. Consult [`EVIDENCE.md`](./EVIDENCE.md) for the complete, auditable Evidence Register and claim audits.

- **Internal Framework Integrity (`Verified`):** Running `npm test` executes the local verification script (`scripts/verify-framework.js`), which validates repository structure, schema manifests, rule consistency, and document links (98/98 checks passing). This validates **protocol packaging integrity only**; it does not measure or guarantee coding agent performance on external software tasks.
- **Historical Benchmark Metrics (`Historical / Unverified`):** Prior documentation and evaluation releases in [Apex-eval](https://github.com/AlmxndBL/Apex-eval) cited figures such as **-58.4% token reduction**, **100% Pass@1 accuracy**, **Mean Turns = 1.00**, or **150 live trajectories** across $N = 50$ tasks. As audited in [`EVIDENCE.md`](./EVIDENCE.md), the saved benchmark artifact (`live-agent-results.json`) was generated by a deterministic mock test runner (`isMock: true` with `mock-engine`) that injected pre-baked human patches. These figures are **historical artifacts of mock execution**, not empirical facts or verified live agent benchmarks across arbitrary codebases.
- **Operational Proof on Your Codebase:** Real-world agent accuracy and token economy depend on the target codebase, the underlying model, prompt context, and developer review. The true measure of completion is the observable verification trail—exact command outputs, passed tests, and failure-path checks—produced directly within your repository.

## FAQ

### Is Apex a coding agent or a framework my application runs on?

Neither. Apex is a local operating protocol for a coding agent: instructions, focused skills, templates, and integrity checks. It adds no runtime dependency to the application you are building.

### Are Patch, Build, Review, and Release commands I have to install?

No. They are labels for how Apex interprets the work: a narrow fix, a feature, a read-only assessment, or a risk-sensitive delivery. Your agent follows the relevant path from the request; no extra command surface is required.

### How is Apex different from a prompt that asks an agent to be careful?

Apex turns care into an explicit workflow. It separates read-only investigation from implementation, scales planning and safeguards with risk, requires targeted verification, and stops blind retries after two unexpected failures.

### Does Apex make every task slow or bureaucratic?

No. Small, low-risk changes use the fast path: inspect the relevant convention, make the smallest useful change, and run the smallest check that observes it. Heavier planning is reserved for changes with a larger blast radius or risks such as auth, money, durable state, database work, or shared contracts.

### Do I need Nexus to use Apex?

No. Apex works by itself. Nexus is an optional local memory companion for project briefs, durable decisions, and session handoffs; it is not a source-code store.

### Does Apex replace tests, code review, or my team's conventions?

No. Existing repository conventions win. Apex helps an agent choose and run the project's relevant checks, produce useful review evidence, and avoid treating a successful happy path as proof that a change is safe.

### What should I expect as evidence after a change?

For a non-trivial change: affected files and consumers, the verification command, its terminal result, and the relevant risk or failure-path check. If a critical behavior cannot be exercised safely, Apex requires that limitation to be stated rather than called verified. Consult [`EVIDENCE.md`](./EVIDENCE.md) for the complete evidence classification standard.

### Is there benchmark evidence?

Historical benchmark artifacts and the experimental harness reside in the separate [Apex-eval](https://github.com/AlmxndBL/Apex-eval) repository. As documented in [`EVIDENCE.md`](./EVIDENCE.md), published figures such as -58.4% token reduction or 100% Pass@1 derive from mock harness trials (`isMock: true`) rather than live agent trials, and are classified as Unverified/Historical. The only verified test in this repository is `npm test` (framework integrity). Operational proof for your project is the terminal verification evidence generated on your own codebase.
