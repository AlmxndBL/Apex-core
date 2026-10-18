# Apex Protocol Governance & Risk-Tiered Change Gates

> **Version:** 1.0.0  
> **Status:** Active Protocol Standard  
> **Applicability:** All contributors, protocol architects, and AI agent maintainers of Apex-core  
> **Guiding Principle:** Minimal Intervention · Empirical Grounding · Zero Unsubstantiated Claims

---

## 1. Governance Philosophy & Anti-Sclerosis Mandate

### 1.1 The Risk of Protocol Bloat
AI agent operating protocols suffer from a natural entropy: **they expand rapidly with every perceived edge-case, but almost never contract**. Over time, this leads to "Protocol Sclerosis":
* Huge context window consumption on every agent invocation.
* Conflicting or overlapping instructions that confuse LLM attention.
* Excessive confirmation gates and procedural halts that cripple developer velocity on simple tasks.

### 1.2 The Sovereign Standard
To maintain Apex-core as a lean, high-velocity engineering engine, **the bar for modifying or expanding core rules is exceptionally high**. Core protocols exist strictly to prevent severe, systemic defects that models cannot avoid on their own—not to encode personal stylistic preferences or redundant restatements of general programming discipline.

---

## 2. Risk-Proportionate Rule Changes

Apply these checks to changes in AGENTS.md, rules/, skills/, and adapters/. Choose the lightest process that addresses the change:

- **Clarification or narrow domain fix:** State the concrete gap, check for duplication, make the smallest change, and run an available focused verification. No minimum incident count, RFC, or A/B trial is required.
- **New mandatory rule or core invariant:** Provide at least one concrete failure or a specific security/safety requirement; explain why current guidance is insufficient; scope the rule to relevant stacks and avoid new fast-path friction. Keep the wording concise.
- **Architecture change or intent redefinition:** Write a concise RFC with blast radius and migration impact. Evaluate representative tasks before adoption when the change could alter agent behavior. Use controlled A/B trials when making comparative performance or quality claims, not as a prerequisite for a focused security fix.

Mandatory rules should have an observable verification seam where practical. If a requirement depends on project policy or human judgment, state that limitation and keep the project-specific decision with the project owner. Do not create an automated check that searches for a keyword and treats it as proof of compliance.
## 3. Protocol Evolution Lifecycle

```text
[Concrete Gap] -> [Risk-Tiered Review] -> [Focused Verification] -> [Integration]
  (observed or      (RFC only for core/       (A/B only for        (SemVer when
   safety need)      architecture changes)     comparative claims) applicable)
```

1. Record the concrete gap and classify it as a clarification, domain rule, or core/architecture change.
2. Review overlap, blast radius, fast-path impact, and the smallest applicable verification. RFCs and representative task evaluations are for core or architecture changes, not routine edits.
3. Run the framework integrity check for changes to protocol structure, manifests, or verifier assumptions. Use targeted A/B evaluation only for a deliberate comparison claim.
4. Version protocol releases according to the project's release policy. Review rules periodically and remove guidance that no longer prevents a demonstrated risk.

---
## 4. Proposal-Only: Core Protocol Streamlining & Decoupling Candidates

> **Notice:** The following section is an **advisory proposal** for the Protocol Team Lead and Architecture Committee; the listed candidates remain proposals, not adopted changes.

Based on an empirical audit of `AGENTS.md` (v5.5.0) and supporting rules, several elements represent potential sources of context bloat, framework bias, or unnecessary friction. We propose reviewing these candidates for future decoupling:

### Proposal 1: Decouple Frontend Design Tokens from Core `AGENTS.md` `[ADOPTED in v5.5.0]`
* **Status:** **ADOPTED & IMPLEMENTED** (2026-09-09)
* **Outcome:** Section 3 in `AGENTS.md` refactored into a lean on-demand delegation contract (~8 lines), saving ~150–200 tokens on every non-frontend prompt. Full directory trees and surface tokens moved to `skills/frontend/SKILL.md`.

### Proposal 2: Clarify Four-State UI Contract Scope `[ADOPTED in v5.5.0]`
* **Status:** **ADOPTED & IMPLEMENTED** (2026-09-09)
* **Outcome:** Added explicit Scope & Anti-Overengineering Exemption Gate in `skills/frontend/SKILL.md` §2, restricting mandatory 4-state wrappers exclusively to primary asynchronous data views and explicitly exempting modals, form sub-components, and internal tools.

### Proposal 3: Scope Optimistic Concurrency Control (OCC) to High-Contention Domains
* **Current State:** `AGENTS.md` §4.B and `rules/04-database-design.md` mandate OCC `version`-column pattern and `prisma.$transaction()` with 5-second timeouts.
* **Risk:** When applied universally, agents attempt to add `version` columns to static configuration tables, user profile updates, or low-frequency CMS content, increasing schema complexity without justification.
* **Recommendation:**
  * Restrict mandatory OCC strictly to **contested balances, inventory stock, booking reservations, and state machine transitions**.
  * Allow standard atomic updates (`prisma.model.update`) for uncontested single-actor records.

### Proposal 4: Decouple Nexus MCP References into an External Integration Layer
* **Current State:** `AGENTS.md` §4 contains an "Optional Nexus MCP Workflow" section detailing `nexus_get_state`, `nexus_save_session`, and `nexus_record_decision`.
* **Risk:** For users utilizing Apex-core outside the Nexus workspace, these tool references represent dead instructions that prompt the agent to search for non-existent tools.
* **Recommendation:**
  * Isolate Nexus MCP coordination into a separate plugin adapter (`plugins/nexus-bridge/` or `skills/apex-nexus`).
  * Ensure `AGENTS.md` remains 100% self-contained and agnostic of specific external MCP server names.

### Proposal 5: Systematic Redaction of Unsubstantiated Empirical Claims
* **Current State:** Various historical summaries or promotional references have alluded to exact percentages of token reduction or defect elimination.
* **Epistemic Issue:** Fails Rule 0 (Zero Yes-Man / Pragmatic Skepticism) because empirical multi-repo data has not been published.
* **Recommendation:**
  * Ensure all documentation labels efficiency goals as design objectives or synthetic estimates until the Phase 2/3 trials under `docs/validation-plan.md` are completed and published.

---

## 5. Governance Checklist for Authors and Reviewers

Before submitting any proposal to alter `Apex-core`, verify each item:

- [ ] **Concrete Gap:** Is the change tied to an observed failure, a specific safety requirement, or a concrete ambiguity?
- [ ] **Subsumption:** Is the gap not already addressed, or would clarification be sufficient?
- [ ] **Minimal Scope:** Is the change limited to the relevant rule or adapter?
- [ ] **Verification:** Is there a proportionate seam, or is the human/policy dependency stated?
- [ ] **Fast Path Safety:** Does the change avoid extra plans, confirmations, or delays for low-risk work?
- [ ] **Tone Compliance:** Is the text written in BLUF, direct, non-sycophantic language?
