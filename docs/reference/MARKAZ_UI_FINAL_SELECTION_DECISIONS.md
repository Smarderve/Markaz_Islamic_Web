# MARKAZ ONE — Final UI Component Filter & Adoption Decisions

**Decision date:** October 16, 2026
**Scope:** React/TypeScript + Vite, 14 public school pages, English/Kiswahili/Arabic, RTL, no CMS.

> This is a documented **design-selection decision**, not a claim that components were installed, benchmarked, licensed individually, or certified production-ready. `KEEP` means proceed to implementation-level validation. `TEST FIRST` means optional prototype only. `DROP` means exclude from v1.

## Final decision

- **KEEP:** 24 named component entries across 8 primary libraries.
- **TEST FIRST:** 20 optional/conditional or competing alternatives, not automatically added to the build.
- **DROP:** 556 entries; no v1 installation or dependency.
- **One UI foundation:** shadcn/ui with Radix primitives used underneath as required. Do not install MUI, Mantine, HeroUI, Flowbite React, and coss UI simultaneously.
- **Motion runtime:** Motion for React is the primary runtime; GSAP/ScrollTrigger is an optional specialist for at most one or two scroll sequences if needed. They are not counted as library components in the source 600.

## Library-by-library cut

| Original library | KEEP | TEST FIRST | DROP | Decision |
|---|---:|---:|---:|---|
| React Bits | 4 | 3 | 23 | Primary adoption source |
| Magic UI | 2 | 2 | 26 | Primary adoption source |
| Aceternity UI | 1 | 3 | 26 | Primary adoption source |
| Motion Primitives | 1 | 2 | 27 | Primary adoption source |
| Animate UI | 2 | 2 | 26 | Primary adoption source |
| Cult UI | 0 | 1 | 29 | Optional source only |
| 21st.dev | 0 | 0 | 30 | Exclude entire catalog from v1 |
| Kokonut UI | 0 | 1 | 29 | Optional source only |
| Animata | 2 | 1 | 27 | Primary adoption source |
| Hover.dev | 0 | 0 | 30 | Exclude entire catalog from v1 |
| UI Layouts | 1 | 1 | 28 | Primary adoption source |
| shadcn/ui | 11 | 2 | 17 | Primary adoption source |
| Origin UI / coss ui | 0 | 0 | 30 | Exclude entire catalog from v1 |
| Kibo UI | 0 | 2 | 28 | Optional source only |
| HeroUI | 0 | 0 | 30 | Exclude entire catalog from v1 |
| Mantine | 0 | 0 | 30 | Exclude entire catalog from v1 |
| Radix UI | 0 | 0 | 30 | Exclude entire catalog from v1 |
| Material UI | 0 | 0 | 30 | Exclude entire catalog from v1 |
| Flowbite React | 0 | 0 | 30 | Exclude entire catalog from v1 |
| Uiverse | 0 | 0 | 30 | Exclude entire catalog from v1 |

## 24 components to KEEP

| Priority | Library | Component | Intended Markaz function | Why it stays | Mandatory gate before shipping |
|---|---|---|---|---|---|
| P0 | Motion Primitives | In View | Sitewide: Entrance-state orchestration | A minimal reusable building block for motion while maintaining one animation grammar. | Confirm current API, no-hydration flash, reduced motion and RTL. |
| P0 | shadcn/ui | Button | All pages: Canonical button variants | Keep all buttons stylistically consistent with Markaz green/lime tokens. | Contrast, state feedback, focus ring and AR sizes. |
| P0 | shadcn/ui | Dialog | Gallery / search / articles: Accessible dialogs and overlays | Foundation for media overlays and search dialogs. | Focus lock/return, escape, AR reading order. |
| P0 | shadcn/ui | Dropdown Menu | All pages / News: Language and content filter menus | Standardizes stable dropdown behavior across site. | RTL alignment, keyboard, persisted locale, no inaccessible hover-only menus. |
| P0 | shadcn/ui | Navigation Menu | All pages: Accessible desktop navigation | One navigation component family for all 3 languages. | Verify AR nested menus, touch/focus, responsive active state. |
| P0 | shadcn/ui | Sheet | All pages (mobile): Mobile menu drawer | Reliable focus-controlled navigation; avoid two competing drawers. | RTL opening side, focus return and scroll locking. |
| P1 | Aceternity UI | Direction Aware Hover | Home / Primary / Secondary: Photo-enabled school pathway reveal | Strong distinctive interaction on the two school pathways; no need for 3D cards. | No critical text on hover; touch/focus parity; no image without rights approval. |
| P1 | Animata | Animated Timeline | History / Events: Chronological record reveal | Maps directly to evidence-backed history/events and creates variety among interior pages. | Keep semantic text timeline; indicate announced versus occurred; RTL tests. |
| P1 | Animata | Images Reveal | School Life / Primary / Secondary: Editorial photo storytelling reveal | Image-led reveal for authentic school photos; selected over competing image reveals. | Run only on rights-cleared media; protect poster crops, static fallback, mobile perf. |
| P1 | Animate UI | Accordion | Admissions / Contact / Academics: Animated FAQ disclosure | Common functional interaction given restrained transition, more useful than novelty. | Semantic buttons and keyboard focus, correct AR label. |
| P1 | Animate UI | Tabs | Academics / News / Gallery: School/category switching | Provides one consistent tab interaction across information-rich pages. | RTL arrow key behavior and full keyboard/touch operation. |
| P1 | Magic UI | Number Ticker | Secondary / Academics / Achievements: Count-up NECTA figures | One reusable number animation with factual context; selected over competing counters. | Static accessible number, no unsupported rankings; international digits handling. |
| P1 | React Bits | Blur Text | Home / page introductions: Hero and chapter headline entrance | High visual impact with limited duration, fewer dependencies than multiple text effects. | Animate whole words or blocks for Arabic; verify text is visible without JS and with reduced motion. |
| P1 | React Bits | Fade Content | Sitewide editorial sections: Lightweight section reveals | Reusable motion primitive across 14 pages, reducing random effects. | Use sparingly, avoid invisible above-fold content and layout shifts. |
| P1 | React Bits | Magnet | Home / Primary–Secondary explorer: Desktop magnetic interaction on primary school choices | A distinctive but controlled reaction that suits the flagship school explorer. | Only pointer-capable desktop; buttons work unchanged for touch/keyboard and reduced motion. |
| P1 | React Bits | Scroll Reveal | About / School Life / Islamic Education: Narrative text as sections enter | Provides school-style editorial reading rhythm; not every paragraph needs animation. | Never split Arabic letters; check scroll-trigger stability and content visibility. |
| P1 | UI Layouts | Gallery Modal | Gallery / School Life: Full-view media navigation | One targeted image viewer pattern rather than multiple competing lightboxes. | Require accessible focus trap/escape/keys and consent-cleared images; otherwise use shadcn Dialog. |
| P1 | shadcn/ui | Breadcrumb | Articles / Events / interior pages: Breadcrumb navigation | Supports deeper content without mega-menu complexity. | RTL separators and correct markup. |
| P1 | shadcn/ui | Command | Sitewide search: Search result command/dialog | Provides keyboard-friendly indexed search experience without backend. | MiniSearch integration, AR query support, deterministic result labels. |
| P1 | shadcn/ui | Input | Search / Contact draft: Search input and eventual contact field | One consistent field system; active contact form awaits secure backend. | No fake submit; input labeling and Arabic placeholder test. |
| P1 | shadcn/ui | Pagination | News / Events: Archived-list pagination | Keeps article/event listings fast and manageable on mobile. | SEO-friendly navigation links; preserve filters and locale. |
| P2 | Magic UI | Scroll Progress | News detail / History: Subtle reading progress indicator | Useful motion for long articles without distracting from content. | RTL behavior, fixed header overlap, accessible hidden decoration. |
| P2 | shadcn/ui | Badge | News / Events / Achievements: Content status and school labels | Short statuses such as school level or archived/event announced (not decorative status spam). | Don't rely on color alone; accurate labels. |
| P2 | shadcn/ui | Tooltip | Icon controls / Gallery: Accessible icon explanations | Use for labeled interactive icons where helpful. | Never contain essential touch-only information; translated labels. |

## 20 candidates to TEST FIRST (NOT approved for routine installation)

**Rule:** A trial enters the real build only if it serves a documented design need, demonstrates technical compatibility, and wins against the existing selected component. A `TEST FIRST` slot is not a promise to use it.

| Library | Component | Potential use | Adoption condition |
|---|---|---|---|
| Aceternity UI | Apple Cards Carousel | School Life / Gallery: One featured-photo story carousel | Need enough real rights-cleared images, keyboard/touch controls, memory test. |
| Aceternity UI | Resizable Navbar | All pages: Animated shrinking header shell | Test RTL, fixed overlap, mobile and route changes; don't duplicate navigation state. |
| Aceternity UI | Tracing Beam | History: Scroll progress along timeline | Drop if overlap with Animata Timeline or direction breaks in Arabic. |
| Animata | Stacked Sections | Home / School Life: Cinematic stacked section scroll | No scroll-jacking, content remains searchable and usable on phones. |
| Animate UI | Motion Carousel | Gallery / School Life: Photo sequence carousel | Pick at most one carousel; evaluate RTL direction, swiping and focus. |
| Animate UI | Ripple Button | Admissions / School explorer: Feedback on most prominent CTAs | Must not compete with shadcn Button states, keyboard and reduced motion. |
| Cult UI | Cutout Card | Primary / Secondary: One stylized editorial cutout panel | No poster-derived fake high-res hero; keep sparse and accessible. |
| Kibo UI | Image Zoom | Gallery: Detail view for approved original photos | Disable zoom for low-res poster crops and unapproved images. |
| Kibo UI | Video Player | Gallery / School Life: Embedded captioned school videos | No autoplay, verify controls, captions, RTL and mobile decoding. |
| Kokonut UI | Magnet Button | Home / CTA: Alternative magnet effect | Compare bundle and touch fallback; choose either this OR React Bits Magnet. |
| Magic UI | Animated List | News / Events: Minimal latest-updates motion | Avoid infinite auto-updating list; reduced motion. |
| Magic UI | Hero Video Dialog | School Life / Gallery: Video story viewer | No rights-cleared media now; validate keyboard/video captions/phone network. |
| Motion Primitives | Disclosure | News / Admissions: Compact supplementary details | Exact API verified; do not ship two disclosure UI systems. |
| Motion Primitives | Text Morph | Home: Headline morph between educational themes | Prototype complete-word motion only; Arabic uses static/fade fallback. |
| React Bits | Gradient Text | Home: Animated lime/green headline emphasis | Brand colors only; accessible contrast and zero constant shimmer. |
| React Bits | Masked Heading | Home: Editorial typographic mask | Test Arabic shaping, contrast, no missing content on mobile. |
| React Bits | Scroll Expand | Home / School Life: Scroll media expansion hero-to-story | Skip if media rights/resolution missing, performance budget exceeded or reduced motion. |
| UI Layouts | Image Reveal | Gallery / School Life: Alternative to Animata Images Reveal | Choose winner after source, motion and AR/mobile test. |
| shadcn/ui | Calendar | Events: Monthly calendar (secondary to accessible list) | Past vs future event status, locale-specific dates, keyboard grid. |
| shadcn/ui | Combobox | News / Events: Dense category and year filtering | With current few events, filter tabs/dropdowns probably suffice. |

## Exclusion decisions that matter most

**Do not install whole UI frameworks in parallel.** MUI, Mantine, HeroUI, Flowbite React and coss UI are functional, but duplicating shadcn's buttons, menus, dialogs, styling, accessibility assumptions and theme systems would create more maintenance than benefit.

**Do not use the community categories as named components.** Hover.dev and Uiverse entries in the original workbook are 60 categories/patterns, not individual verified component implementations. No specific one passed this screening.

**Treat community registries as design references until evaluated individually.** 21st.dev examples are not approved by naming a pattern in the inventory; authorship, license, runtime, RTL and dependency review are required.

**Do not ship heavy visual gimmicks.** Cursor trails, 3D marquees, draggable spheres, glitch/decrypted/falling text, particle storms, liquid backgrounds, novelty loaders and decorative SaaS-style beams are excluded from v1. They distract from educational content and can harm Arabic readability and lower-powered phones.

**Avoid double animation libraries for one feature.** Choose Magic UI Number Ticker instead of competing number counters; Animate UI Tabs instead of another tabs package; Animata Timeline instead of alternative timeline animations; and React Bits Fade Content instead of another generic fade wrapper.

**No fabricated media.** An actual Markaz school photo or video must have provenance, rights clearance, safeguarding/guardian approval when relevant, and genuine resolution suited to the selected layout. Video/gallery trials remain conditional until then.

## Page-by-page placement plan

| Page | Selected components and motion treatment | Requirements |
|---|---|---|
| Home | Blur Text, Magnet, Direction Aware Hover, Fade Content, shadcn Button/Nav | No heavy 3D; one motion-led school explorer; word/block Arabic reveal |
| About | Scroll Reveal, Fade Content, In View, Breadcrumb | Editorial image/text sections; institutional relationship remains unconfirmed |
| History | Animated Timeline, Scroll Progress, Breadcrumb | Chronology and reference links; event completion not inferred |
| Primary | Images Reveal, Fade Content, Direction Aware Hover | Learning messages, school-approved student media only |
| Secondary | Number Ticker, Scroll Reveal, Tabs | NECTA 2025 exact official aggregates and school events |
| Academics | Tabs, Number Ticker, Breadcrumb | Official tables must remain static/accessible; not decorative charts |
| Islamic Education | Scroll Reveal, In View, Accordion | Subtle geometry outside library; no breaking Arabic letter shapes |
| School Life | Images Reveal, Gallery Modal, In View | Clear media permissions before public use; captions/alt text |
| Achievements | Number Ticker, Badge, Tabs | Official results distinct from school-account achievement claims |
| News | Command, Pagination, Badge, Dropdown Menu, Scroll Progress | Published records only; preserve locale and source dates |
| Events | Animated Timeline, Badge, Pagination, Dropdown Menu | Show announced/past and verified outcomes separately |
| Admissions | Accordion, Tabs, Button, Breadcrumb | Separate schools; verified steps; no fake contact/application form |
| Gallery | Gallery Modal, Dialog, Sheet | Keyboard, touch and Arabic parity; consent-cleared media only |
| Contact | Button, Input, Dropdown Menu | Verified contact details; form only after real secure backend |

## Implementation gate: how to adopt one component

1. Open the official component page and inspect the **actual implementation** and current license; use source code, not unverified registry slugs from the screening inventory.
2. Capture direct and transitive dependencies; reject redundant animation engines, incompatible versions or external tracking.
3. Adapt it to Markaz's forest-green, emerald, electric-lime and white tokens, without shipping unrelated gradients/glows.
4. Verify English, Kiswahili and Modern Standard Arabic. RTL menus, keyboard focus, screen reader labels and content-order must work. Never split Arabic glyphs into independently moving letters.
5. Verify 360px/390px/430px/768px/1024px/1440px layouts, keyboard-only operation, reduced-motion state and low-power Android emulation.
6. Audit hydration, scroll listeners, bundle impact, layout shift and main-thread jank. Reject effects that make content harder to access.
7. For galleries/media, ensure rights and pupil permissions before any publication.
8. Add a component only if it replaces (rather than duplicates) an equivalent feature, or supplies a demonstrably better outcome.

## Architecture constraints

- **React/TypeScript + Vite** with static-pre-rendered routes (choice of routing framework to be validated against the actual project).
- **No CMS, accounts, payment system or student portal** in this phase.
- **Three real languages** with complete localized pages: `/en`, `/sw`, `/ar`. Arabic must use `lang=ar`, `dir=rtl`, logical CSS properties and carefully reviewed educational/religious translations.
- **No fake contact form:** static information and school-verified communication channels until a real secured submissions backend is deliberately added.
- **Accessibility and SEO** outrank decoration: headings and content must be visible on initial render, motion optional, focus visible, all interactions accessible.
- **Do not install all KEEP components at once.** Start with shadcn foundation and a staged motion pilot on Home, Primary and Secondary; expand only after the tests pass.

## Evidence status and limitations

- The 600-row source inventory includes **484 catalog-observed names, 30 current-coss catalog names, 26 exact-name-unverified candidates and 60 category-only entries**.
- This filter is based on the provided research inventories plus source-catalog spot checks; it is **not** a 600-component live browser and performance benchmark.
- Some KEEP choices have explicit implementation and rights conditions. Failed testing automatically demotes a selection to DROP or sends it back to design review.
- Source links and the previous screening label are retained row by row in the full 600-row audit workbook.

**Final rule:** Be fully animated through purposeful composition, scroll storytelling and state transitions—not by filling the site with random animated widgets.
