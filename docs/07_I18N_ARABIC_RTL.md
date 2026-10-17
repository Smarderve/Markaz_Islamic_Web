# Multilingual Specification — EN / SW / AR

Three **genuine, reviewed languages**, not a widget that translates the header only. Required: English (`en`), Kiswahili (`sw`) and Modern Standard Arabic (`ar`); Islamic terminology reviewed by a knowledgeable speaker. Approved school names may remain official untranslated forms in text, with contextual translations if provided.

## Routing
- `/en/`, `/sw/`, `/ar/`; 14 equivalent core route identifiers and approved translated dynamic articles/events.
- Root `/`: clear language entry or deliberate EN default; do not create a crawler-invisible cookie-only language experience.
- Switching languages stays on the same **content ID** and route when target is approved; if not available, provide explicit missing-translation state (or go to locale index with notice) rather than silently rendering English in Arabic. Public routes for incomplete translations are excluded from prerender/sitemap.
- Each page uses correct `html lang="..." dir="ltr|rtl"`, title/meta/OG description, canonical and reciprocal `hreflang` links only for equivalents that exist. Use `x-default` for neutral entry where appropriate.

## Required translation surfaces
Header, navigation, schools, hero, content sections, examination captions, event status and dates, article title/summary/body, gallery alt text/captions, forms, labels, errors, empty states, search suggestions, breadcrumbs, buttons, metadata, privacy policy and 404 page.

## Arabic/RTL architecture
- CSS logical properties (`padding-inline-start`, `margin-inline-end`, `inset-inline-start`) and `text-align:start` by default.
- Arabic typography must shape correctly; animate **whole words, phrases or containers**, never arbitrary isolated Arabic letters, or use a static accessible alternative.
- Direction-aware animations, dropdown alignment, mobile menu side, stepper progression, pagination arrows, breadcrumb separators, carousel gestures and scroll progress must be individually tested.
- Do **not** flip photographs, brand logos, result numerals or inherently directional artwork without explicit reason.
- Bidirectional fragments such as school codes `S4224`, URLs and phone numbers should use isolated direction semantics (`bdi`/`dir=auto` as appropriate).
- Arabic punctuation and numbers should be reviewed for factual clarity, especially NECTA divisions and dates.

## Localization data model
Every text-bearing source record has stable `id`, `sourceIds`, `approvalStatus`, and per-language `translationStatus: draft|reviewed|approved` + `title`,`summary`,`body`,`seoTitle`,`seoDescription`, localized media alt/caption. Validate placeholders and links. Use `Intl.DateTimeFormat` and `Intl.NumberFormat` consciously; preserve exact unambiguous date/year source data and use labels for school assessments.

## QA matrix
- Desktop/phone `/en`, `/sw`, `/ar` on at least Homepage, Primary, Secondary and representative deep detail, then complete 42-route audit.
- No horizontal overflow at 360, 390, 430, 768, 1024, 1440px widths.
- Arabic menu/drawer, carousel, tab arrow keys, dropdown, lightbox, forms, language switching, logical reading/focus order, search and date formatting.
- Automated missing-key reports, exact cross-locale id mapping, no English UI fallback in published AR/SW, visual proofread by speakers.

## Publication gate
When a translation is not reviewed/approved, keep it on **private preview only**. Three-language v1 launch goal means public launch waits for the full language set; no pretending unreviewed machine translations are finished. Track progress transparently in `docs/18_PUBLICATION_MATRIX.md`.

## Sources
W3C HTML RTL/dir and logical CSS: https://www.w3.org/International/questions/qa-html-dir.en.html ; Google multilingual SEO: https://developers.google.com/search/docs/specialty/international/localized-versions ; react-i18next: https://react.i18next.com/latest/usetranslation-hook
