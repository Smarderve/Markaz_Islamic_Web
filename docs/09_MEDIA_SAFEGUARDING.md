# Media Policy — Authenticity, Licensing & Pupil Safety

## Hard rule
**Publicly viewable social media is not blanket permission to republish images.** Do not put identifiable students, photos/videos of unknown provenance, logos with unapproved reuse rights or archival copyrighted graphics into public assets without applicable school/owner permissions and pupil/guardian safeguarding review.

## Current library status
Project contains a locally organized school-related asset library: originals, browser captures, posters, extracted photographic regions, WebP derivatives, a few video previews/Reels. The existing audit identified **32 poster-photo extracts: 30 photographic / two illustrations**, and **two interpolated 4K-dimension exports that do NOT have native 4K source detail**. A campus-looking image was not independently verified as the actual site. These are research assets, not approved public website media.

## Required media manifest fields
`id`, `school`, `originalPath`, `sourcePostId`, `sourceUrl`, `createdAt` if documented, `mediaType`, `width`, `height`, `checksum`, `sourceQuality`, `isPosterCrop`, `isInterpolated`, `locationVerified`, `rightsOwner`, `licenseProof`, `pupilIdentifiable`, `guardianConsentProof`, `safeguardingApproval`, `approvalStatus`, `translations` for alt/caption, `webVariants` after conversion. Use `unknown` instead of false “approved” defaults.

## Workflow
1. Import references but **do not** copy into `website/public/`.
2. Verify photo/graphic attribution, school affiliation, actual scene identity and rights/consent.
3. Review for safety and factual context: faces, pupil names, identifiable uniform/campus, timestamps, license.
4. Approve selected media; generate conservative sizes, previews and appropriate captions; preserve originals unchanged.
5. Build copies **only** approved derivative asset IDs into public output and checks paths/dimensions/alt text.
6. Keep a rejection/expiry workflow: immediately remove a withdrawn asset from next build; invalidate caches on live removal when needed.

## Fallback design for no approved media
Typography-led responsive hero in deep forest green/lime; restrained custom geometric patterns; color band editorial storytelling; subtle CSS/Motion line/shape effects. Do not use stock people while implying they are pupils, AI fake uniforms/facilities, generic mosque visuals passed off as campus, or low-res poster crops stretched full screen.

## Image performance
Use intrinsic `width`/`height` or aspect ratio to prevent layout shift, srcset for realistic intrinsic detail, AVIF/WebP where supported, native fallback as needed, lazy load below fold and one prioritized hero visual only. Videos require approved reuse and captions/transcripts; no automatic heavy data load on mobile.

## Accessibility
Write localized factual alt text describing photo content without identifying children, avoid decorative alt narration, support keyboard-operable lightbox and accessible video controls.
