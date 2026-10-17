# Architecture Decision Records (ADRs)

This file stores **accepted decisions**, not a brainstorming document. Change a decision only with an explicit approved alternative, reason, risks and migration plan.

## ADR-001 — React-based website
**Accepted (user):** React frontend. **Verified in Phase 01 foundation (2026-10-17):** TypeScript + Vite + React Router v7 framework mode with static pre-render. Nine technical sample routes (English, Kiswahili, Arabic home/Primary/Secondary) built and emitted as static HTML. This verifies the initial routing/prerender approach, not full 14-page coverage or production-host behavior. Reassess compatibility when implementing the complete route set.

## ADR-002 — No CMS, database or portals
**Accepted (user):** content stored in local reviewed files; edits require code/content change and rebuild. CMS, database, admissions portal, accounts, payment and document-upload capabilities out of scope. Older planning document references to CMS are superseded.

## ADR-003 — Three fully translated languages
**Accepted (user):** `en`, `sw`, `ar`. Arabic uses RTL layout and appropriate font/motion; published routes must be complete and verified. Dedicated locale URLs proposed.

## ADR-004 — Markaz brand direction
**Accepted direction (user posters):** authentic green, emerald, electric lime, limited yellow and white. **Not yet official color hex values.** Never use AI-recreated Markaz logo or generic gold/ivory theme.

## ADR-005 — Fully animated but accessible
**Accepted (user):** motion-focused entire website. Core runtime Motion for React; GSAP only for justified limited sequences. Reduced-motion, mobile/data fallback and interaction correctness mandatory.

## ADR-006 — Library selection
**Design-approved shortlist, subject to engineering gate:** 24 KEEP components from eight sources with one shadcn/ui foundation; other 20 TEST FIRST, 556 excluded. Source `docs/05_COMPONENT_REGISTRY.md`. Do not read KEEP as license or production verification.

## ADR-007 — Source-backed school facts and approved assets
**Accepted:** latest institutional documentation/content database and official results, not generic invented school descriptions. Public media requires rights/safeguarding clearance.

## ADR-008 — Hosting provider neutral
**Proposed:** static artifact output and local development, no provider-specific coupling; no public launch without authorization.

## Template for future ADR
```text
### ADR-009 — Title
Date / proposed-by / approved-by:
Context:
Decision:
Alternatives rejected:
Consequences and risks:
Evidence and test results:
Migration/backout:
```
