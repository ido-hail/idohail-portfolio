# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Source of truth

`SPEC.md` at the repository root is the source of truth for scope, architecture, requirements, and acceptance criteria. Read the relevant sections of `SPEC.md` before any architectural or scope-changing work.

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
npm run dev       # local dev server
npm run build     # production static build
npm run preview   # preview the production build locally
```

These are the only scripts that exist today. Do not assume `check`, `lint`, `format`, or `verify` exist until they are actually added to `package.json`.

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
