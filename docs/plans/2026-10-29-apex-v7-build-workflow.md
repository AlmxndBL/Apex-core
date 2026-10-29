# Apex v7.0.0: Adaptive System Building

Status: Commit · Authorized release checkpoint · 2026-10-29

## Gap and decision

The v6 docs-first rule requires UI documentation for non-UI projects and an approval gate for every new project. Build discovery and acceptance evidence are scattered across the kernel, principles, and verification skill. Keep the existing five skills; place conditional build guidance in `skills/apex-core/references/build-workflow.md`, routed from the kernel and entry skill. Existing plugin skill-directory discovery includes this reference without a new registration or dependency.

The kernel owns intent, safety, and routing; the build reference owns build procedure; stack adapters own domain constraints; quality-verify owns review and evidence. User instructions and target-project conventions take precedence. References specialize, rather than override, kernel invariants.

## Scope and migration

- Update active release metadata, EN/TH documentation, indexes, and template version headers; retain historical changelog, plans, audits, and v6 migration notices.
- Replace mandatory three-document bootstrapping with project-appropriate scope, design, acceptance, and verification information. Existing documents remain valid; no renaming or deletion is required.
- Preserve low-risk patch fast track. Architecture, uncertainty, external dependencies, and durable/shared state also inform planning; file count is not the sole signal.
- Route substantial builds to the reference and completion to existing quality-verify. No mandatory new skill, worktree, subagent, or approval gate.
- Add diagnostic hypotheses, integration-aware verification, and explicit acceptance evidence without duplicating review policy.
- Preserve the pre-existing Codex-manifest version synchronization and verifier changes in the release checkpoint.

## Implementation and validation

1. Add reference and routing, revise bootstrapping and verification guidance.
2. Synchronize active manifests, skills, docs, and migration guidance; record release limitations.
3. Extend integrity checks for reference/link packaging and release labels. Run `npm test`, `node --check scripts/verify-framework.js`, skill validation, and `git diff --check`.
4. Inspect representative CLI, web, cross-layer feature, and small-patch scenarios against routing and expected outcomes. This is a static walkthrough, not a live agent benchmark.
5. Create a release commit on `release/v7.0.0` and annotated `v7.0.0` tag. Record exact verification and remaining evaluation work. No remote publication is included.

## Evidence boundary

Integrity checks establish packaging consistency only. Live agent behavior, speed, and token improvements remain unverified; use the validation plan before making comparative claims.
