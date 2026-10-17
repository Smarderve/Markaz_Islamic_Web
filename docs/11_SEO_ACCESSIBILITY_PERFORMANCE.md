# SEO, Accessibility & Performance Acceptance

## Static-first SEO
- Build real static HTML per approved `/en/*`, `/sw/*`, `/ar/*` route (including news/event details), generated from approved locale datasets.
- Distinct locale page `<title>`/description, semantic single H1, logical headings, breadcrumbs, canonical and reciprocal `hreflang` for *actually published* equivalents only; no phantom Arabic alternate URLs.
- Generate sitemap from published routes only, proper `robots.txt`, truthful Article/Event/Organization schema when source supports claims, accessible 404 and correct redirect/locale-root behavior.
- Keep private staging authentication separate from `noindex`; never index unpublished school drafts or raw source records.
- On every route, direct access/refresh must return correct content without browser-only blank app shell.

## Accessibility — WCAG 2.2 AA target
- Keyboard access: tab order, visible focus, skip-to-content link, no focus traps except correctly managed dialogs, Escape closes overlays, focus returns appropriately.
- Touch and hover parity: school explorer and image/hover panels expose all critical text/controls on tap/focus; no essential content in tooltip alone.
- Semantic data tables for NECTA (caption, year, exam, centre, header cells, source); accessible animated number static values.
- Meaningful alt text, captions for approved videos, appropriate aria on image viewers, language on document and text spans.
- Arabic RTL screen-reader order; no letter-split script breakage; labeled translations; enough contrast, zoom to 200/400% as relevant, 24x24px target minima/appropriate spacing.
- Reduced motion must expose content immediately; no dangerous flash, autoplay sound, forced scroll, or continuous distracting animation.
- Automated axe checks **plus manual keyboard and reader checks**; automated pass is not a conformance certificate.

## Performance
Core Web Vitals field targets once sufficient production data: **LCP <=2.5s, INP <=200ms, CLS <=0.1 at p75**. Before publication use Lighthouse/Playwright network CPU throttling as lab evidence, not fabricated field performance.

### Budget principles
- Static prerender so first content does not wait on JS.
- Route-level lazy-load for modal/gallery/search/large animation segments; no all-library bundles.
- Self-host optimized fonts with `font-display:swap` and useful subsets for Arabic/Latin; prevent invisible text.
- Media quality follows genuine source dimensions, responsive sizes, format support, and accurate width/height to eliminate layout shift.
- Critical hero loads only needed assets; heavy background video disabled on slow/data saver/reduced motion; no unnecessary analytics/ad trackers.
- Set route and bundle budgets during Phase 01 based on measured baseline (do not assume a numeric budget without profiling). On each added animation, compare before/after responsiveness.
- At least one 360px/low-bandwidth audit per core template; no interaction blocked by animation or font loading.

## External references
Google international pages: https://developers.google.com/search/docs/specialty/international/localized-versions ; W3C RTL: https://www.w3.org/International/questions/qa-html-dir.en.html ; Google metrics: https://web.dev/articles/vitals ; WCAG: https://www.w3.org/TR/WCAG22/
