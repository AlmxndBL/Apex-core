# ⚡ Apex — Production-safe AI Coding Workflow

> **Apex helps coding agents understand the task, change only what matters, verify the result, and report evidence.**

Current release: `apex-core@5.5.0`

**[English](README.md) · [ภาษาไทย](README.th.md)**

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

## What Apex is not

- Not a production framework, runtime dependency, AI model, or replacement for Git/tests/code review.
- Not a command that edits repositories automatically.
- Not dependent on Nexus. Apex works standalone.

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

## Trust is observable

Apex does not ask you to trust a confidence statement. It asks the agent to leave a trail you can inspect:

- the requested outcome and the files actually changed;
- direct callers or consumers considered when a shared surface changes;
- the risk-specific checks selected for auth, data, contracts, or user-visible state; and
- the command and result that verified the completed behavior.

That evidence belongs to your repository and is more useful than a generic success rate. [Apex-eval](https://github.com/AlmxndBL/Apex-eval) is available for readers who want to inspect the separate evaluation harness, protocols, and stored telemetry; its results are contextual evidence, not a promise for every model or codebase.

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

For a non-trivial change: affected files and consumers, the verification command, its terminal result, and the relevant risk or failure-path check. If a critical behavior cannot be exercised safely, Apex requires that limitation to be stated rather than called verified.

### Is there benchmark evidence?

Yes. [Apex-eval](https://github.com/AlmxndBL/Apex-eval) contains the evaluation harness, protocols, and historical artifacts. Treat its published metrics as experiment-specific; the verification evidence generated for your own repository is the operational proof.
