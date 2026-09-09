# Apex Protocol Governance & Growth Gates

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

## 2. The 5 Growth Gates for Core Rules & Skills

No rule, constraint, or new skill may be added to `Apex-core/AGENTS.md`, `Apex-core/rules/`, or `Apex-core/skills/` without satisfying all **5 Growth Gates**:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       THE 5 APEX GROWTH GATES                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. Triplicate Empirical Failure  │ >= 3 Real-world failure incident logs    │
├──────────────────────────────────┼──────────────────────────────────────────┤
│ 2. Non-Redundancy & Subsumption  │ Proved not covered by existing Rules 0-4 │
├──────────────────────────────────┼──────────────────────────────────────────┤
│ 3. Minimal Intervention (YAGNI)  │ Lowest word count, highest signal        │
├──────────────────────────────────┼──────────────────────────────────────────┤
│ 4. Measurable Verification Seam  │ Verifiable via automated terminal check  │
├──────────────────────────────────┼──────────────────────────────────────────┤
│ 5. Zero Fast-Path Friction       │ Zero added halts or delay on 1-3 files   │
└──────────────────────────────────┴──────────────────────────────────────────┘
```

### Gate 1: Triplicate Empirical Failure Mode ($\ge 3$ Real-World Incidents)
* **Requirement:** The proposed rule must address a failure mode that has occurred and been documented in **at least 3 separate real-world tasks**.
* **Evidence Standard:** Each incident must include:
  1. The user prompt.
  2. The agent's erroneous behavior or defective output.
  3. Why the absence of the rule allowed the failure to occur.
* **Disqualification:** Hypothetical edge cases, aesthetic preferences, or synthetic/toy failures are categorically rejected.

### Gate 2: Non-Redundancy & Subsumption Analysis
* **Requirement:** The proposer must demonstrate why existing rules cannot prevent the defect.
* **Analysis Criteria:**
  * Does Rule 0 (Grounding & Anti-Sycophancy) already cover this?
  * Does Rule 1 (Intent Tiers & Scope Gates) already restrict this action?
  * Does Rule 2 (Fast In-RAM Verification) or Rule 3 (Evidence Delivery) catch the error?
  * Does Rule 4 (Patch vs Synthesis & YAGNI) prohibit this behavior?
* **Disqualification:** If proper enforcement of an existing rule prevents the failure, the proposal must be rejected in favor of clarifying existing documentation.

### Gate 3: Minimal Intervention (YAGNI & Token Budget)
* **Requirement:** Protocol modifications must follow the principle of least intervention.
* **Token Budget Limits:**
  * An addition to `AGENTS.md` core must not exceed **150 words**.
  * A domain rule addition in `rules/*.md` must not exceed **300 words**.
* **Tone & Format:** Must follow BLUF (Bottom Line Up Front), imperative tone, with concrete good/bad code examples. Unsolicited explanatory theory is strictly banned.

### Gate 4: Measurable Verification Seam
* **Requirement:** The proposed rule must be testable through an objective verification seam.
* **Criteria:**
  * Can compliance be checked via a script, typecheck, test runner, AST parser, or deterministic regex?
  * If a rule cannot be verified programmatically or through observable terminal logs, it cannot be a mandatory core rule (it may only be documented as an optional advisory guideline).

### Gate 5: Zero Fast-Path Friction (1–3 File Protection)
* **Requirement:** The rule must not degrade the turnaround speed of the Fast Track.
* **Criteria:**
  * Must NOT add mandatory human confirmation halts for low-risk 1–3 file tasks.
  * Must NOT require heavy documentation (plans, RFCs, state summaries) for small surgical patches.
  * Any rule that slows down single-fault bug fixing must be scoped strictly to Heavy Track or Tier 3 Destructive gates.

---

## 3. Protocol Evolution Lifecycle (RFC Process)

```text
[Incident Capture] ──> [RFC Proposal] ──> [Shadow Evaluation] ──> [Gate Review] ──> [Core Integration]
   (3 Incidents)        (5 Gates Check)        (5 Tasks A/B)         (Approval)        (SemVer Bump)
```

1. **Stage 0: Incident Dossier**
   * Record 3 incident logs meeting Gate 1 criteria into `docs/incidents/`.
2. **Stage 1: RFC Proposal**
   * Submit an RFC detailing the exact proposed diff to `AGENTS.md` or `rules/`.
   * Complete the 5-Gate Self-Audit Checklist.
3. **Stage 2: Shadow Evaluation (A/B Trial)**
   * Run at least 5 benchmark tasks from the Case Study catalog using the proposed rule diff against the current protocol baseline.
   * Verify that Diff Purity Ratio ($DPR$) improves or remains constant, and that no Fast Path latency regressions occur.
4. **Stage 3: Integration & Versioning**
   * Merged only after passing `node scripts/verify-framework.js` with 100% integrity.
   * Protocol version incremented following Semantic Versioning:
     * **Patch (x.x.Y):** Clarifications, typos, non-functional adjustments.
     * **Minor (x.Y.0):** Non-breaking additions satisfying all 5 Growth Gates.
     * **Major (Y.0.0):** Structural re-architecting or breaking intent redefinitions.
5. **Stage 4: Continuous Pruning & Sunset Review**
   * Every 6 months, all rules are audited. If frontier LLM capabilities natively solve a problem without guidance across 10 consecutive trials, the rule is scheduled for deprecation to keep the protocol lean.

---

## 4. Proposal-Only: Core Protocol Streamlining & Decoupling Candidates

> **Notice:** The following section constitutes an **advisory proposal** for the Protocol Team Lead and Architecture Committee. In strict adherence to ownership boundaries, **no modifications to core files have been made**.

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

- [ ] **Empirical Evidence:** Are there 3 documented failure incidents attached?
- [ ] **Subsumption Check:** Have you proven that Rules 0, 1, 2, 3, and 4 cannot solve this?
- [ ] **Token Budget:** Is the diff under 150 words (core) or 300 words (rules)?
- [ ] **Verification Seam:** Does an automated test or command exist to verify this rule?
- [ ] **Fast Path Safety:** Does this rule allow 1–3 file fixes to proceed with zero added halts?
- [ ] **Tone Compliance:** Is the text written in BLUF, direct, non-sycophantic language?
