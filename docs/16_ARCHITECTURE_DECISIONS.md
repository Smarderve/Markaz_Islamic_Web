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

## ADR-009 — One institution with two educational levels

**Accepted (user, 2026-10-17):** Present the website under one MARKAZ ISLAMIC SCHOOLS institutional identity. Primary Education and Secondary Education are educational-level categories within that website, not competing brands or separate website destinations. Preserve official names, exam identifiers, and level-specific facts in source-backed records. This presentation decision does not establish legal, administrative, campus, admissions, or automatic progression relationships. Keep the established `/primary/` and `/secondary/` paths stable while labeling them as level views. Apply one logo system, color and typography system, global navigation, news/events system, gallery, history and contact identity.

This decision supersedes earlier prototype terminology such as “school explorer,” “school choices,” or “distinct school experiences” wherever those phrases appear in imported/reference materials. Keep historical source documents intact; apply ADR-009 to current product requirements, design decisions, implementation and future phases.

## ADR-010 — School-first homepage and ordinary Academics navigation

**Accepted (user, 2026-10-18):** Present MARKAZ ISLAMIC SCHOOLS as a normal school website. The homepage's primary subject is the school: its introduction, learning, Islamic education, school life, achievements, news, admissions and contact as verified content becomes available. Primary and Secondary are ordinary academic categories, not separate brands, competing destinations, a unique selling point, or a signature homepage animation. Keep `/primary/` and `/secondary/` stable as concise information pages under Academics, with the shared institutional header and footer. Do not claim unverified progression or institutional arrangements. Preserve meaningful motion for school storytelling and interactions. Update active product, design, motion and phase instructions to match. Historical references and research records remain unchanged; this ADR supersedes any earlier homepage direction that made Primary/Secondary the central experience.

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
