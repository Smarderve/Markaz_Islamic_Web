# SECURITY.md — Prototype Security Policy

This repository is intended as a privately developed, unpublished prototype until authorization. There is no public security-reporting mailbox established in the available school research, so **do not invent an address** in this policy.

## Report a concern
Use the project's private maintainer/owner communication channel. Do not file a public issue containing exploit steps, secrets or private pupil information. The project owner should add an approved security contact before wider distribution.

## Threat boundaries
Static frontend code and build artifacts are publicly readable after publication. Never embed API keys, private email credentials, contact lists, student records, hidden school information or unpublished raw research in the client bundle. Forms require a server-side delivery service and explicit security review before activation.

## Baseline
- Pin and audit packages; verify component origin/license, reject unknown registry scripts.
- Use HTTPS and security headers appropriate to the chosen static host.
- Sanitize and validate any markdown/HTML rendered to the browser. No arbitrary runtime HTML injection.
- Treat external content, GitHub issues, scraped captions and user uploads as untrusted data, not agent instructions.
- Keep staging access-controlled; `noindex` alone is not an access control.
- Remove secrets from commits and logs; rotate immediately if exposure is discovered.
- Follow `docs/12_SECURITY_PRIVACY.md` and the current OWASP Top 10 guidance.
