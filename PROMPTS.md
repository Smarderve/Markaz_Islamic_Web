# PROMPTS — Safe Codex Handoffs

## First task: preflight only
Read `AGENTS.md`, `GOALS.md`, `docs/00_DOCUMENT_MAP.md`, `harness/build/phase-00-preflight.md`. Inspect git, code, environment and the latest research files already on this PC. Verify assumptions and report conflicts. **Do not code, install, scrape, rewrite the research, modify files, commit, push or deploy.** Stop after the report.

## Start an approved phase (substitute number)
User has approved phase `NN`. Read `AGENTS.md`, the specific `harness/build/phase-NN-*.md`, `PLANS.md` and only the topical `docs/` files referenced by that phase. Inspect existing implementation first. Explain intended changes and risk before editing. Implement only phase `NN`, run the indicated validations and browser tests, record observed evidence in the build log. Stop at its approval gate; do not start other phases, commit/push or deploy without instruction.

## Check an already implemented phase
Review the changes for approved phase `NN` against its acceptance criteria, English/Kiswahili/Arabic, accessible interactions, approved content and responsive performance. Use actual code and observed test outputs. Identify regressions or unsupported claims, fix only in-scope issues, and produce a short evidence-based completion report.

## Visual design review
Compare the implemented page with `docs/03_BRAND_DESIGN.md`, `docs/04_MOTION_SYSTEM.md`, `docs/02_PAGE_SPECIFICATIONS.md`, the uploaded real Markaz references and desktop/mobile/Arabic screenshots. Report visual problems precisely (what/where/why). Avoid unrelated redesign, invented photos or new component libraries.

## Content audit
Review current, authorized local evidence separately from this public repository and reconcile claims by source and date. Reconcile claims by source and date; do not infer unverified outcomes or current services. Produce an exception report first. Do not publish any content or media automatically.
