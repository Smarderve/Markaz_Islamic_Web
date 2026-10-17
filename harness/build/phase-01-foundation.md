# Phase 01 — React Project & Static Routing Foundation

**Requires user's explicit approval after Phase 00.** Read `AGENTS.md`, `docs/06_TECH_ARCHITECTURE.md`, `docs/16_ARCHITECTURE_DECISIONS.md`, `docs/13_TESTING_QA.md`.

## Implementation scope
Preserve existing code, establish minimal React/TypeScript/Vite-compatible working foundation and agreed React Router static pre-rendering. Add lint/typecheck/test/build scripts and package lock. Define route skeletons in the planned `/en`, `/sw`, `/ar` form but don't fabricate page translations/content; use internal scaffolds only.

## Required proofs
Build generates real HTML for at least one safe test route per locale; refresh loads the route; static host config tested locally; scripts typecheck/lint/test/build succeed. Verify it does not require runtime Node server or CMS. Keep all older research/media intact.

## Not permitted
Full site, complex animations, design redesign, remote deployment/push, school media publishing, backend, credentials or CMS.

## Stop gate
Summary of project structure, exact installed packages/versions/commits if any, route HTML artifacts and actual command outputs; request Phase 02 approval.
