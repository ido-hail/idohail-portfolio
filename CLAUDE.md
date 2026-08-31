# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Source of truth

`SPEC.md` at the repository root is the source of truth for scope, architecture, requirements, and acceptance criteria. Read the relevant sections of `SPEC.md` before any architectural or scope-changing work.

## Final Polish work

`SPEC.md` remains the durable product and architecture specification. `docs/FINAL_POLISH_PLAN.md` is the operational source of truth for the approved remaining Final Polish work. Where the plan changes a requirement that `SPEC.md` has not yet caught up with, the plan governs until `SPEC.md` is updated in the same PR that implements that behavior.

- Read `docs/FINAL_POLISH_PLAN.md` before doing any Final Polish work.
- Respect its stable task IDs, review gates, per-PR authorization, and stop conditions.
- The plan is never standing permission to execute the full sequence. Do not advance to another PR without explicit human authorization.

## Current stack

- Astro 7, static output only
- TypeScript
- Tailwind CSS 4
- Node.js 24, npm
- Cloudflare Workers Static Assets is the intended hosting target
- GitHub Actions is the intended CI/CD platform

## Architecture constraints

- Static-first: no backend, no SSR, no database.
- No runtime Worker code unless a concrete requirement demands it.
- No React or other frontend framework unless a concrete requirement demands it.
- Avoid unnecessary client-side JavaScript.
- Prefer minimal, maintained dependencies.
- Do not add technology solely to make the project look more complex.

## Current commands

```bash
npm run dev            # local dev server
npm run build          # production static build
npm run preview        # preview the production build locally
npm run check          # astro check (Astro/TypeScript validation)
npm run lint           # eslint .
npm run format         # prettier --write .
npm run format:check   # prettier --check .
npm run verify         # format:check, then lint, then check, then build
```

`npm run verify` runs `format:check`, `lint`, the Astro/TypeScript `check`, and the production `build`, in that order, as the local quality gate.

## Workflow

- Work on one explicitly approved implementation phase at a time; do not implement later phases unless explicitly requested.
- Inspect existing files before changing them.
- Keep changes minimal and scoped to the phase at hand.
- Verify changes (build/run as appropriate) before declaring a phase complete.
- Report any deviation from `SPEC.md` or the approved implementation plan rather than silently reconciling it.

## Git and external actions

- Do not commit unless explicitly instructed.
- Do not push unless explicitly instructed.
- Do not deploy unless explicitly instructed.
- Do not create or modify external infrastructure (Cloudflare, DNS, GitHub settings, etc.) unless explicitly instructed.
- Do not use destructive git commands (`reset`, `clean`, force-push, etc.) without explicit approval.

## Secrets

- Never commit tokens, credentials, private keys, `.env`, or `.dev.vars`.
- Deployment credentials belong in GitHub Actions secrets, not source control.

## Current durable technical decisions

These are already implemented in `astro.config.mjs` / `package.json` and should not be changed without a documented reason:

- Node major is 24 (`engines.node` restricts to `>=24.0.0 <25.0.0`; see `.nvmrc`).
- Astro `output` is `static`.
- `build.format` is `directory`.
- `trailingSlash` is `always`.
- `build.inlineStylesheets` is `never`.
- Tailwind uses the Tailwind 4 Vite integration (`@tailwindcss/vite`), not `@astrojs/tailwind` or a `tailwind.config.js`.
- TypeScript is intentionally kept on the current 6.x line because the installed `@astrojs/check` and `typescript-eslint` versions do not support TypeScript 7. Do not upgrade the TypeScript major without checking peer compatibility first.
