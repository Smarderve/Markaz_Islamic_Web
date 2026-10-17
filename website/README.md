# Markaz One — Phase 01 foundation

This folder contains a small technical foundation, not the completed school website. All displayed text is sample interface copy and must not be treated as verified school information or approved translation. No school photographs are included.

## Requirements

- Node.js compatible with Vite 8 (Node.js 20.19+ or 22.12+)
- pnpm 10

## Local development

From this directory:

```powershell
pnpm install
pnpm dev
```

Open the URL printed by Vite. The current technical routes are `/en`, `/sw`, `/ar`, and each locale's `/primary` and `/secondary` route.

## Checks

```powershell
pnpm run typecheck
pnpm run lint
pnpm run format:check
pnpm run test
pnpm run test:e2e
pnpm run build
```

Playwright browser binaries may need to be installed once with `pnpm exec playwright install chromium`.

## Static output preview

`pnpm run build` emits the prerendered site into `build/client/`. `pnpm run preview:static` serves that directory with a small local Node static-file server. It is for local inspection only and is not an application backend or deployment configuration. The nine listed routes are explicitly prerendered; full production route coverage and hosting behavior remain future work.

## Foundation boundaries

- React 19, TypeScript, Vite 8 and React Router 7.
- English, Kiswahili and Arabic route samples; Arabic sets document `lang="ar"` and `dir="rtl"`.
- Tailwind CSS, shadcn/ui Button, and a small Motion for React demonstration with reduced-motion support.
- Sample translations have not been reviewed by qualified translators. No factual school content, approved media, forms, CMS, database, portals, or production pages are provided.
- Do not publish identifiable pupil media or school claims without documented authorization, safeguarding review, and appropriate source evidence.
