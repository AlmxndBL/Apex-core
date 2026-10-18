# Plan: Practical Apex-core Guidance Updates

**Status:** Ephemeral implementation plan

## Goal

Apply the focused improvements from the 2026-10-18 practicality assessment without adding a new skill, adapter, or general-purpose checklist.

## Blast radius

- `AGENTS.md` and `skills/apex-core/SKILL.md`: route high-risk work to the active stack adapter.
- `adapters/backend-data.md`, `adapters/polyglot-core.md`, and `rules/04-database-design.md`: make SQL parameterization, safe raw-query use, and identifier allowlists explicit.
- `rules/01-security-auth.md` and the two database adapters: add a brief, project-scoped personal-data lifecycle baseline.
- README current-release labels, changelog, package lock, and active skill/adapter version headers: align to package version 6.1.0; keep historical v6.0 architecture and migration references unchanged. Extend the integrity check to catch manifest/release-label drift.
- `docs/protocol-governance.md`: replace fixed incident/benchmark counts for every rule edit with evidence proportional to change risk.

## Implementation

1. Keep the kernel short; correct high-risk adapter routing for Node versus Python/.NET.
2. Add concise ecosystem-specific SQL injection guidance and personal-data lifecycle expectations to existing rules/adapters.
3. Relax the governance process for clarifications and bounded domain fixes; reserve RFC/A-B evidence for core behavior or architecture changes and measured claims.
4. Update only active version labels, leaving historical v6.0 migration notes intact.

## Verification

Run `node scripts/verify-framework.js`, inspect `git diff --check`, confirm version labels and adapter cross-references. Do not run a production build for documentation and rules changes.
