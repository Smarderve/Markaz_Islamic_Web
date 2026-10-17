# Contributing to Markaz One

For developers and coding agents. Read `AGENTS.md` and the active phase spec before editing. Follow existing coding patterns unless the approved architecture decision explicitly replaces them.

## Engineering rules
- TypeScript strict mode; typed content and route interfaces, no uncontrolled `any` or silent error suppression.
- Reuse React UI primitives and theme tokens; no direct import of unapproved UI suites. Avoid bespoke animations when a shared wrapper exists.
- Use semantic HTML, headings, anchors, buttons, correctly labelled controls and real focus management.
- All visible text through translation/content catalogs; no hardcoded English inside Arabic or Swahili paths.
- Logical CSS properties first; test RTL on every changed interactive surface.
- Never put live personal data, secrets or identifiable pupil info in fixtures, logs or screenshots.
- Unit/component/browser tests for every functional component change. For visual changes, supply a three-locale and phone/desktop screenshot or explicitly report inability.
- Keep content sources and media rights metadata attached to published records.

## Change workflow
1. Inspect current git status and file ownership; avoid erasing uncommitted work.
2. Make one scoped change, using a new branch if authorized; preserve revert path.
3. Run relevant scripts verified from package.json; `git diff --check` where available.
4. Supply actual test results and user-visible change summary; wait at phase gates.
5. Never push, deploy, change domain, purchase services or add connectors without approval.

## Review checklist
Routes, locale fallback, Arabic RTL, keyboard/mouse/touch, user preference, media rights, source factuality, animated reduced-motion states, accessibility and mobile performance.
