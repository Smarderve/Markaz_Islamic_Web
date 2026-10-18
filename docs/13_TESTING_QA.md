# Testing & Quality Assurance Matrix

## Test pyramid

- Static checks: TypeScript, lint, dependency audit, `git diff --check`, source references, route generation, locale missing-key validation, media approval manifest, date/result arithmetic.
- Unit: status classification, `eventDate` vs `publishedAt`, approved-only serialization, NECTA totals, locale fallbacks, slug mapping and direction helpers.
- Component: shared institutional header, mobile drawer, language menu, school-home editorial reveals, accordions/tabs, filters, news list, numbered results, search dialog, lightbox, article navigation.
- Browser: Playwright in Chromium, Firefox, WebKit; representative desktop/tablet/mobile widths; each locale; keyboards, touch, reduced motion, no JS/slow JS where feasible.
- Visual: screenshot comparison and manual examination of Home, Primary, Secondary plus representative forms, news, events, gallery; EN/SW/AR in 360/768/1440, then sample all routes.
- Content editorial: unified institutional identity, official names, level attribution, event attribution, exam divisions, translated copy, media rights and safeguarding.
- Operational: static output direct route refresh, site map, cache behavior, rollback/restore, 404/500, hosting headers, staging access.

## Mandatory 14 x 3 matrix

Every one of 14 core pages must be checked in English, Kiswahili and Arabic (42 route combinations) **when public**; dynamic article/event URLs add rows. Do not count a route that only renders English with a translated header as complete.

## Breakpoints

Target widths 360, 390, 430, 768, 1024, 1440; test real keyboard/touch and landscape if possible. Check viewport clipping, fixed menu overlap, tables, text-wrap, cross-language expansion and image aspect ratio. Zero horizontal scroll.

## Primary user paths

A. Home → Primary → Islamic Education → Admissions → Contact.
B. Home → Secondary → Academics → cited 2025 result → Achievements.
C. News → filter by school → article → back/search.
D. Events → archived candidate with “announced, outcome unconfirmed” → original reference.
E. Language EN→SW→AR from deep page; back/forward/refresh; RTL arrows/menu/gallery.
F. Keyboard Tab + Enter/Space/Escape, reduced motion, data saver, offline/slow fallback.

## Blocking defects

Blank route on refresh, invalid HTML, untranslated published route, broken RTL navigation, inaccessible critical controls, hidden/false form submit, public unapproved pupil image, current fact invented, broken result totals, live link to historical phone as current, long blocking animation, accidental public indexing of staging.

## Proof required

Agent report must identify exact script command/exit status, browser engine and viewport, pages/locales tested, screenshots or logs actually captured, failures and known limitations. “All passed” without evidence is not accepted.
