# React Technical Architecture — Proposed

## Decision status
Proposal, **not proof of existing repository state**. Phase 00 discovers whether the project has a prior app, dependencies or working build. Avoid rebuilding meaningful work. Final choice of React Router framework mode must be confirmed after repo inspection.

## Preferred stack
- React + TypeScript (strict), Vite, **React Router v7 framework mode** with explicit static `prerender` paths and `ssr: false` if confirmed compatible.
- Tailwind CSS and CSS custom properties, shadcn/ui foundation with Radix primitives as required; selected motion libraries from component registry, Motion for React; optional GSAP if separately justified.
- `i18next` + `react-i18next` with localized page/content dictionaries, Intl for dates/numbers.
- Zod or comparable schema validation at build time; Markdown/MDX or structured JSON for articles/events, safe markdown rendering; MiniSearch or lightweight generated locale indexes for search.
- Vitest + React Testing Library and Playwright across major browser engines, automated accessibility tooling plus manual testing.
- Version pinning, ESLint, Prettier, TypeScript; static asset generation and performance checks.

**No CMS. No database. No runtime Node server requirement.** Never claim a contact form works without a backend.

## Routing and build
Canonical language prefixes: `/en/`, `/sw/`, `/ar/`. Proposed stable pathname slugs in English (`/ar/academics/` is okay) while visible titles are translated. School-specific routes `/en/primary/` and `/en/secondary/`; article `/en/news/:slug/`; event `/en/events/:slug/`. Preserve article/event identity across locales and provide equivalent routes only when their translations are truly publishable.

React Router static pre-rendering is documented at `https://reactrouter.com/how-to/pre-rendering`; **do not ship SPA-only HTML placeholders** for important indexing routes. Enumerate all 42 core routes plus approved details at build time, fail on route/translation mismatch, ensure refresh/direct access works on chosen host.

## Proposed folder layout (adapt if existing repo already uses a working pattern)
```text
website/
  app/
    routes/                 # localized page modules
    layouts/                # shared shell, school, editorial/article
    components/ui/          # selected shadcn primitives
    components/markaz/      # branded controls and motion wrappers
    features/               # schools/news/events/gallery/search
    i18n/                   # configuration and locale selection
    lib/                    # types, validation, metadata, helpers
    styles/                 # CSS token and typography layers
  content/
    locales/{en,sw,ar}/     # shared UI, page translations
    pages/                  # structured page content
    news/                   # one record per article with locales
    events/                 # one record per event
    academics/              # verified factual datasets
    manifests/              # approved image/video assets
  public/media/             # only rights-cleared public derivatives
  scripts/                  # validators and route/media generators
  tests/                    # unit, integration, e2e/a11y
```

## Separation and dependency boundaries
- Presentation components cannot import raw private evidence or local absolute paths.
- A deterministic **build-time importer** extracts reviewed content from source to typed public datasets; unpublished records remain outside `website/public/` and browser bundles.
- Approved image manifest explicitly copies whitelisted media; full original archive stays outside the public folder.
- Use lazy route bundles; expensive gallery and motion code only on routes that use it.
- Shared layouts own document direction, header, footer, landmark structure, route nav; leaf routes own page content.
- No dynamic import of unknown registry code during runtime; vendor source reviewed and pinned.

## Required future package scripts (to create during approved phases)
`npm run dev`, `build`, `typecheck`, `lint`, `test`, `test:e2e`, `check:content`, `check:i18n`, `check:assets`, `check:routes`.

## Hosting portability
Generated output should work with common static hosts using their correct trailing slash/deep link rules and immutable fingerprinted assets. Contact forms, preview authentication, server logs and security headers are hosting concerns not solved by static React source alone.
