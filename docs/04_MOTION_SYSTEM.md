# Motion Design System — Implementation Contract

**Normative motion rules:** this file and docs/05_COMPONENT_REGISTRY.md. A detailed owner-provided motion reference is excluded from the public copy because it contains project-specific research.

## Principle

A **fully animated website** where animation supports storytelling, guidance and feedback. “Fully animated” does **not** mean every paragraph jumps, all backgrounds are particle canvases, autoplay video is mandatory, or scrolling is trapped. Each of 14 pages gets a distinctive motion signature; motion must never delay core content.

## Runtime

- Motion for React: preferred for entrances, shared layout, hover/tap, gesture and exit transitions.
- CSS: use for hover/focus color, transforms and simple transitions.
- GSAP ScrollTrigger: **optional only** for 1–2 demonstrably improved editorial/pinned sequences; document measured benefit and cleanup on route changes. Never animate the same property with both engines.
- No heavy three.js/WebGL or novelty cursor trails by default. Budget dependencies per page.

## Canonical tokens (initial, tune by real tests)

| Role                                    | Value                                                    |
| --------------------------------------- | -------------------------------------------------------- |
| Small interaction                       | 140–240ms                                                |
| Hover/selection                         | 200–320ms                                                |
| Section entrance                        | 320–600ms                                                |
| Large editorial reveal                  | 450–800ms maximum, nonblocking                           |
| Stagger between groups                  | 40–90ms                                                  |
| Translation-direction-aware movement    | Along inline-start/inline-end, not hardcoded left/right  |
| Maximum heavy scroll-pinned experiences | 1–2 in whole site, disabled on data saver/reduced motion |

Define shared easing curves and duration constants in one file, not copies in 24 components. Avoid replaying intros on every route/back navigation.

## Eight signature compositions

1. Hero typography reveal (React Bits Blur Text or stable in-house fallback).
2. School editorial reveal (Motion for React / In View): reveal school-focused editorial content in reading order. Primary and Secondary remain ordinary Academics links; their switching is not a signature animation.
3. Scroll-linked editorial story (In View, Fade Content, Scroll Reveal—choose one per content region).
4. Approved image reveal (Animata Images Reveal, with visibility/image-rights guard).
5. 2025 NECTA figures reveal (Magic UI Number Ticker with static labelled result).
6. Evidence-backed History/Events timeline (Animata Animated Timeline; regular semantic list fallback).
7. News reading progress (Magic UI Scroll Progress, decorative only).
8. Gallery viewer transition (UI Layouts Gallery Modal **only after accessibility audit**, otherwise shadcn Dialog).

## Universal fallback behavior

- `prefers-reduced-motion`: content instantly visible, minimal state transitions, no shaking/zooming/parallax/counting, no looping animation.
- Save-Data / slow connection / low-spec phone: prefer static artwork and optional image reveals, no video autoplay, no particle canvases or continuous pointer effects.
- JS-disabled or hydration not ready: headings, links, results and content still visible where feasible.
- No CLS: reserve hero and media aspect-ratio before load. Escape/back works while animation runs.
- Arabic: whole-word/container reveal (not per-letter split), directional icon and motion mirroring, correct `dir=rtl`; never mirror logo/photos.
- Touch & keyboard: all information visible without hover, focus styles visible, motion optional.

## Ownership and testing

Every chosen library component must have a local wrapper with standardized props, reduced-motion behavior, direction support, exact license/dependency note, and tests. Remove effects that fail on mobile/RTL; do not add alternatives merely to meet a count. Performance targets live in `docs/11_SEO_ACCESSIBILITY_PERFORMANCE.md`.
