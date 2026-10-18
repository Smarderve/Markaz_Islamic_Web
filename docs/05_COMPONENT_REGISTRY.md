# Component Registry — Final v1 Selection

Source: filtered 600-entry research spreadsheet, with **24 KEEP / 20 TEST FIRST / 556 DROP**. KEEP means planned for engineering validation, **not production certified**. Avoid installing entire ecosystems; adopt individual registry items, inspect code, dependency versions, licenses and current APIs first. Motion is the motion runtime; GSAP is a conditional specialist.

## 24 KEEP components — one owner each

| No. | Library           | Component             | Primary use                                                 | Gate                                                      |
| --: | ----------------- | --------------------- | ----------------------------------------------------------- | --------------------------------------------------------- |
|   1 | shadcn/ui         | Button                | Global CTAs                                                 | Contrast, touch/keyboard                                  |
|   2 | shadcn/ui         | Navigation Menu       | Desktop header                                              | RTL, focus & touch                                        |
|   3 | shadcn/ui         | Sheet                 | Mobile drawer                                               | Opening side RTL, focus return                            |
|   4 | shadcn/ui         | Dialog                | Accessible overlay fallback                                 | Escape/focus trap                                         |
|   5 | shadcn/ui         | Dropdown Menu         | Language and sort/filter menus                              | Keyboard, RTL                                             |
|   6 | shadcn/ui         | Breadcrumb            | Interior/detail hierarchy                                   | Semantic structure, separators RTL                        |
|   7 | shadcn/ui         | Command               | Search interface                                            | Locale search, focus management                           |
|   8 | shadcn/ui         | Pagination            | News & events                                               | Real links, crawlability                                  |
|   9 | shadcn/ui         | Input                 | Search and future forms                                     | Labels, errors, no fake submissions                       |
|  10 | shadcn/ui         | Badge                 | Archive/school-status labels                                | No claims based on color alone                            |
|  11 | shadcn/ui         | Tooltip               | Nonessential icon help                                      | Touch/focus alternate labels                              |
|  12 | React Bits        | Blur Text             | Hero/headline entrances                                     | Arabic whole words, reduced motion                        |
|  13 | React Bits        | Scroll Reveal         | Long editorial story                                        | No per-letter Arabic, visibility                          |
|  14 | React Bits        | Fade Content          | Page-level section reveals                                  | No hidden content without JS                              |
|  15 | React Bits        | Magnet                | Optional pointer response for an approved editorial feature | Desktop enhancement only; never a required level selector |
|  16 | Magic UI          | Number Ticker         | NECTA factual counts                                        | Static readable equivalents                               |
|  17 | Magic UI          | Scroll Progress       | Long article pages                                          | Decorative only, direction                                |
|  18 | Aceternity UI     | Direction Aware Hover | Approved school-life or editorial image panel               | Touch and focus parity; rights-cleared media only         |
|  19 | Motion Primitives | In View               | Standard animation boundary                                 | Hydration/reduced motion                                  |
|  20 | Animate UI        | Accordion             | Admissions FAQs                                             | Accessible state, AR text                                 |
|  21 | Animate UI        | Tabs                  | Academics/school filters                                    | Keyboard arrow direction                                  |
|  22 | Animata           | Images Reveal         | Approved photo stories                                      | Rights + image resolution                                 |
|  23 | Animata           | Animated Timeline     | History/events                                              | Semantic list fallback                                    |
|  24 | UI Layouts        | Gallery Modal         | Gallery viewer                                              | Verify focus trap/keys; fallback Dialog                   |

## Adoption priority

P0: buttons, nav, sheet, dialog, dropdown, In View; P1: school introduction, editorial storytelling, timeline, academic counts, approved imagery, tabs/accordion, search; P2: reading progress, optional decorative reveals. Use the right component based on semantic need, not to satisfy quotas.

## Phase 02 implementation and source-redistribution decision

The Phase 02 homepage uses small Markaz-authored Motion for React wrappers for its word-level hero entrance and results reveal. These do not include React Bits source. The copied Aceternity Direction Aware Hover candidate was removed; it was not used by the accepted homepage. React Bits currently publishes MIT plus Commons Clause terms that restrict redistribution of the components themselves, while Aceternity's published terms prohibit redistribution of item source. Those library items remain research references only unless their terms change or separate permission is documented. The implementation uses Motion for React directly under its MIT license.

## Other 20 TEST FIRST

The source document `docs/reference/MARKAZ_UI_FINAL_SELECTION_DECISIONS.md` lists each name, intended use and gate. **No automatic installation**. Approve a trial only when existing KEEP implementation fails a documented requirement and the alternative wins mobile/RTL/a11y/performance evaluation.

## Completely out for v1

Do not bundle additional full ecosystems Material UI, Mantine, HeroUI, Flowbite, coss/Origin UI. Avoid raw 21st.dev/Uiverse community submissions without isolated source/license review. Do not bring React Bits “all effects” or duplicates of nav, carousel, counters, tabs into the bundle.

## Integration gates per adopted component

- Confirm source URL and license; use free/open source only unless expressly approved; do not assume every template is free.
- Copy/adapt source into a **Markaz wrapper** (e.g. `website/app/components/markaz/`) and apply site token styles.
- Normalize keyboard/touch, AR direction, reduced motion, responsive tests, bundle size, cleanup behavior and meaningful error states.
- Record installation version/source in code comments or registry record, not a speculative inventory claim.
- Remove or replace any component that violates accessibility or factual integrity.
