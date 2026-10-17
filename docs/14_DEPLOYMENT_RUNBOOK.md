# Deployment, Staging & Recovery — Static React

**Decision pending:** hosting provider/domain belong to the user/school approval process. Website should remain provider-portable and static-first. There is **no authorization to deploy publicly**.

## Preflight
Check the real repo build scripts, Node version, package-lock integrity, `.gitignore`, existing branches and local port conflicts. Never assume old Vercel/Next settings apply. Backup code and docs when reconciling files.

## Local build
1. Use verified package manager and locked Node runtime.
2. Run typecheck, lint, unit/component tests, content validation, translation validation and rights-only media manifest checks.
3. Execute production static pre-render. Inspect build HTML for `/en`, `/sw`, `/ar`, actual page body content, metadata, source IDs where appropriate, and correct asset URLs.
4. Serve generated output through a local static server to verify direct route/refresh behavior, 404 page, cache and links.

## Private staging
Only after explicit approval. Password/access gate, not only robots noindex. Use a staging URL distinct from production; confirm API absence, no functional form without server endpoint, correct images, media rights, locale nav and performance. Keep secrets outside frontend.

## Production readiness gate
- School authorization, logo and student-media rights, official identity, current contact/admissions confirmation, localized content review for EN/SW/AR.
- Verified static hosting HTTPS, correct caching (immutable hashed assets and controlled HTML cache), security headers, compressions, SPA fallback **not misconfigured to mask 404**.
- Search indexing/robots/sitemaps only for approved public URLs. Metadata and `hreflang` agree with actual locale versions.
- Document actual provider deployment steps only after provider is chosen; **do not invent credentials or command outputs**.

## Rollback
Make reproducible build artifacts with version/commit ID and date; retain previous deploy target if provider supports atomic deploys. If new deployment breaks localized route, gallery or media rights, revert to prior known-good artifact and invalidate caches if necessary; report exact deployed versions and remaining issues.

## Operational maintenance without CMS
Content changes via local file edits, source review, tests, build and redeployment. No recurring hosting subscription or paid proxy assumed. Add uptime monitoring only after approved public launch.
