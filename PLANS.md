# PLANS — Small, Reversible Build Phases

This roadmap is a **proposed execution order**. The documentation package itself **does not authorize coding**. Work on a phase only when the user explicitly approves it; never auto-proceed to the next phase.

| Phase | Scope | Gate/evidence |
|---|---|---|
| 00 | Read-only repo and research audit | Report existing app state, conflicts and missing facts; no code changes |
| 01 | Architecture and React foundation | Existing work preserved; run-ready Vite/React Router TS, quality scripts, static prerender POC |
| 02 | Markaz brand design + motion primitives | Tokens, navigation, controls, animations, accessible motion examples and RTL-ready foundations |
| 03 | 3-language infrastructure | Localized URLs, complete shell, Arabic RTL, translated metadata, build-time gate |
| 04 | Flagship pages | Home, Primary Education, Secondary Education within one institution at 360/768/1440; original hybrid editorial layouts; approval screenshots |
| 05 | Remaining static pages | About, History, Academics, Islamic Education, School Life, Achievements, Admissions, Contact |
| 06 | Publishing features, without CMS | News and event archives/detail pages, local search, gallery, media approval gate |
| 07 | Advanced motion + full localization | Carefully verified effects across pages; text/RTL/keyboard/reduced-motion QA |
| 08 | Audit, private staging readiness, release handoff | Browser QA, accessibility, SEO, perf/security checks, static deployment and rollback proof; no launch without consent |

## Phase discipline
Each `harness/build/phase-*.md` specifies permitted work, tests and stopping conditions. Document decisions in `docs/15_RISKS_AND_APPROVALS.md`; add an ADR to `docs/16_ARCHITECTURE_DECISIONS.md` for significant deviations. Keep a short factual `harness/build-log.md`. A failed check is a blocker, not a reason to claim the phase passed.

## Required human decisions
- Confirm the actual codebase and whether to use React Router static pre-rendering after preflight.
- Approve exact Markaz logo/colors and rights before using assets on public or internet-visible staging.
- Approve 3 representative page designs before building every page.
- Confirm which translations and school facts are authorized for visitors.
- Approve hosting, domain, form service (if any), pushes and public publication separately.
