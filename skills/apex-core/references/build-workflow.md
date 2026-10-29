# Adaptive System-Building Workflow

Use for new systems or substantial features with multiple flows, architectural decisions, unclear requirements, external integrations, or durable/shared state. Small, clear, low-risk additions use the kernel fast track. For design-only requests, produce the requested design without implementing it.

## 1. Ground scope and uncertainty

Inspect existing code, manifests, conventions, available requirements, and relevant project memory. In an empty project, use the user's constraints and available runtime; do not invent an existing stack. Classify facts as direct evidence or inference.

Establish the user, intended outcome, key flows, boundaries, constraints, and observable acceptance criteria. Distinguish agreed scope, reversible assumptions, and unresolved decisions. Ask only questions whose answers materially affect correctness, product behavior, compatibility, cost, or irreversible choices. Continue independent authorized work while awaiting required answers. Existing authorization carries forward; request approval for destructive actions under the kernel or when the user explicitly requested a design review gate.

Use a concise plan for architecture changes or expected changes to four or more files. Significant uncertainty, shared contracts, external dependencies, and state risk can justify planning below that threshold. Do not require a separate PRD, design system, diagram, or approval for every build. Reuse existing project documents; consolidate small projects into one useful document.

## 2. Design the necessary boundaries

Describe responsibilities, interfaces, data ownership, and important failure behavior at the depth needed to implement safely. Capture material alternatives and trade-offs; record durable cross-system decisions in the project's ADR or available memory. Prefer the established stack and the simplest architecture that serves current requirements.

Select only applicable concerns:

| Project | Useful design information |
|---|---|
| CLI or library | Commands/public API, input/output and errors, compatibility, examples, verification |
| Web or mobile UI | User journeys, navigation, visual direction/tokens, relevant loading/empty/error states, keyboard and viewport behavior |
| API or service | Contracts, validation, authorization when needed, error semantics, integration failure handling |
| Durable or sensitive data | Ownership, lifecycle, migrations, consistency/concurrency, recovery and security boundaries |

Do not require RBAC, databases, UI tokens, or distributed infrastructure when the product does not need them. Adopt or extend a project `AGENTS.md` only when useful and supported by the environment; keep project instructions there without parallel agent configs.

## 3. Plan verifiable delivery

Prefer end-to-end slices that deliver a user-visible or public API behavior. Necessary foundations such as schema constraints, infrastructure, or shared contracts may come first. Each slice identifies outcome, dependencies, affected areas, acceptance criteria, verification, and relevant risks. Exact paths may be provisional in a new project; revise them as evidence changes. Do not duplicate complete implementation code in the plan.

Make dependency order explicit. Use worktrees or subagents only when supported, authorized, and useful; a single agent can execute the same plan. Delegation must respect the environment's permissions and ownership boundaries. Once implementation is authorized, continue through planned tasks without repeatedly requesting permission. Replan and explain material scope changes rather than silently expanding the product.

## 4. Implement and integrate

Implement the smallest coherent slice, exercise its observable behavior, then connect subsequent slices. Prefer an expected-red test or reproduction where a meaningful seam exists; follow the test-first and two-strike rules in [quality-verify](../../quality-verify/SKILL.md). Preserve existing user changes.

For unclear defects, reproduce or bound the symptom, trace inputs across relevant boundaries, state a hypothesis, and run the smallest check that distinguishes it from alternatives. Change the cause supported by evidence. If reproduction is unavailable, state that limit and gather diagnostic evidence before speculating. Do not accumulate unrelated fixes or reset failure counters by switching hypotheses.

Keep requirements and evidence current when behavior changes. A task marked implemented is not automatically verified. After interruption or context loss, resume from the plan, working diff, and recorded evidence; confirm the current state before repeating work.

## 5. Verify and deliver

Load [quality-verify](../../quality-verify/SKILL.md) for acceptance, standards/risk review, seam labels, and failure recovery. Run fast native checks during development, relevant integration/runtime checks after connecting boundaries, and a production build when a new application or changed build configuration needs build evidence. A typecheck does not prove runtime or user-flow correctness. Avoid production builds for minor edits.

Track each important acceptance criterion with its implementation state, evidence (command, test or runtime observation), and verification status. This can live in the existing plan or delivery report; no separate matrix is required. Record Verified, Static only, or Not checked with a reason, using quality-verify's reporting vocabulary. For UI, distinguish observed browser behavior from visual behavior that remains unverified.

Deliver scope achieved, files changed, actual verification results, unresolved acceptance criteria, and next steps. Report partial verification plainly. Preserve checkpoint commits/tags when requested; deployment, publishing, or external messages require their own applicable authorization. Save a redacted Nexus session when available and used, without treating memory as a substitute for source or evidence.
