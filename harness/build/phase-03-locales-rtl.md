# Phase 03 — Language Routing, Translations & Arabic RTL

**Requires approval.** Read `docs/07_I18N_ARABIC_RTL.md`, `docs/10_CONTENT_SCHEMAS.md`, `docs/11_SEO_ACCESSIBILITY_PERFORMANCE.md`.

## Scope
Build locale paths `/en`, `/sw`, `/ar`; explicit locale switching; stable content IDs, document `lang`/`dir`, direction-aware styles and fonts, localized navigation/footer/errors/SEO. Build-time translation completeness validator and approved-only prerender list. Translation drafts can be previewed privately; public readiness requires review.

## Required proofs
EN and SW LTR, AR RTL; switch deep page and back with correct route; Arabic drawer side, tabs/icons/separators/font shaping, overflow test 360/768/1440; no mixed-language fallback counted as complete; no missing `hreflang` self/reciprocal links on approved route test fixtures.

## Do not
Publish machine-only Arabic/SW copy as reviewed; auto-generate approval flags; mirror logos/photos; introduce CMS.

## Stop gate
Exact locale matrix tested and outstanding content translation workload, awaiting Phase 04.
