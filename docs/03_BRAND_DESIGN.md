# Brand & Visual Design System — Markaz

## Style direction
Original fusion of premium editorial school websites: bold cinematic first impression, variable section compositions, readable educational storytelling, elegant school-choice interaction, practical Tanzanian-parent navigation, subtle Islamic geometry. The result must look **recognizably Markaz**, not like a SaaS dashboard or a clone of an international school.

## Provisional palette — sampled from user-supplied Markaz posts
| Token | Hex (approximate) | Usage |
|---|---|---|
| `--markaz-forest` | `#033C24` | Nav, cinematic hero, meaningful dark sections |
| `--markaz-green` | `#005934` | Brand green, section panels |
| `--markaz-emerald` | `#059558` | Secondary brand accent, depth |
| `--markaz-lime` | `#C8F800` | High-priority CTA, energetic accents |
| `--markaz-yellow` | `#F8D808` | Occasional highlights only |
| `--surface` | `#FFFFFF` | Readable editorial sections |

**These values are not certified official hex codes**; get actual logo artwork/original design files for final confirmation. Keep green/lime dominant; do not revert to previously proposed gold/ivory luxury theme. Use semantic CSS tokens (`--color-primary`, `--text-on-primary`, etc.) and accessible contrast pairings.

## Typography
- Latin: confident editorial heading font and legible humanist/modern sans body; choose freely licensed font available for self-hosting. Type tokens by role (display, H1, H2, body, small, caption) rather than arbitrary pixel jumps.
- Arabic: proper Arabic script font, accurate shaping and line metrics; separate font-face stack if needed. Never animate characters in a way that disrupts joins.
- Kiswahili can run longer; avoid fixed-width/fixed-line-height assumptions. RTL and mobile headings get tailored typography scales.
- Ensure readable articles and dense NECTA data on all devices.

## Layout architecture
- Desktop: approximate 12-column editorial grid, 1200–1360px max readable content region; varied full-bleed and contained sections. Mobile: content-first single column; no scroll overflow.
- **Every page must have its own composition**. Avoid repeated hero + 3 cards + CTA formula. Large media treatment only when source image/rights support it; otherwise typography and branded geometry provide impact.
- Forms, tables, filters, and archive listings favor clarity over spectacle.
- Consistent semantic spacing, radius, shadows and focus treatment across selected components.

## Signature UI
- Dynamic header that retains contrast; sticky behavior without blocking anchored sections.
- **Primary / Secondary Explorer**: asymmetric visual panels, meaningful accessible links, gentle pointer-only magnetism, focus and touch parity.
- Featured journalism sections: one dominant story + supportive smaller stories, not dozens of same-size cards.
- 2025 official NECTA figures: dramatic but factually labelled; include sources and ordinary text equivalents.
- Islamic education chapters: restrained geometric accents and typographic respect; no fabricated religious text, school mosque or religious facilities.
- Gallery: varied crops where justified, preserve actual imagery and content rights.

## Logo & imagery invariants
Do not recreate, recolor or replace official logos with generative versions. Preserve proportions, original layout and clear space. No fake school photo, AI pupils, fabricated campus/hostels/lab, or low-resolution poster crop used as a cinematic panoramic image. Distinguish original photos, poster illustrations, video thumbnails, and derived WebP sizes.

## Implementation checkpoints
Approve component primitives and **Home, Primary, Secondary desktop/mobile/Arabic prototypes** before scaling. Compare with real Markaz posters; exact colors are provisional until school files confirm them. Reject overdesigned gradients, generic golden luxury aesthetic, glowing tech widgets and unreadable lime-on-white text.
