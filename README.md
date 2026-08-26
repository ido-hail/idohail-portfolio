# Ido Hail — Engineering Portfolio

Source code for Ido Hail's engineering portfolio, built with Astro and
deployed through Cloudflare Workers Static Assets. The repository is
published for technical inspection — its CI/CD, governance, and
security posture are part of the portfolio itself.

## Deployment Status

Production custom domain: pending launch. The deployment pipeline,
Worker versioning, and production promotion are implemented and
running; the `idohail.com` domain is not yet attached to the Worker.

## Architecture

Astro static site generation (`output: "static"`, no SSR, no backend,
no database), with content for projects and experience managed as
typed Astro Content Collections. The build output is deployed as-is
to Cloudflare Workers Static Assets — there is no runtime Worker
script. GitHub Actions builds the site once per commit and reuses that
same artifact for both preview and production deploys.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full
breakdown.

## Technology

Astro 7 · TypeScript · Tailwind CSS 4 · Node.js 24 · npm · Cloudflare
Workers Static Assets · Wrangler · GitHub Actions

## Engineering Approach

- **Static-first**: no server rendering, API routes, database, or
  auth — the site is prerendered HTML/CSS with no client-side runtime
  requirement.
- **No unnecessary backend or runtime**: Cloudflare Workers Static
  Assets serves the build output directly; no Worker application code
  exists unless a concrete requirement demands it.
- **Build-once CI/CD**: the site is built exactly once per commit;
  preview and production deploys reuse that identical artifact rather
  than rebuilding.
- **Strict CSP**: `public/_headers` is derived directly from what the
  built site actually contains, not a generic template.
- **Dependency and security governance**: automated dependency
  updates, security alerts, and branch protection are enabled on the
  repository.

## CI/CD Architecture

- **Pull request** → Validate (format, lint, type check, build, link
  check) → Preview deploy for same-repo, non-Dependabot PRs.
- **`main`** → Validate → Production deploy, promoted to 100% traffic.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for the full pipeline and
recovery procedures.

## Security

A strict Content-Security-Policy and security headers are derived
directly from the built site (`public/_headers`); `main` is protected
by required status checks and a linear-history, PR-only merge policy;
dependency updates and vulnerability alerts are automated. HSTS and
the production custom domain are pending launch. See
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full security
model.

## Repository Structure

```
src/
  pages/        Routes (index, about, projects, experience)
  layouts/      Shared page layout (BaseLayout)
  components/   Site header/footer
  content/      Content Collections (projects, experience)
  config/       Central site configuration
public/
  _headers      Cloudflare security headers / CSP
  robots.txt
docs/
  ARCHITECTURE.md
  DEPLOYMENT.md
.github/
  workflows/ci.yml   Validate / Preview / Production
  dependabot.yml
```

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — system architecture,
  stack rationale, content model.
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — CI/CD pipeline, Cloudflare
  deployment, rollback and recovery.

## Copyright

Copyright © 2026 Ido Hail. All rights reserved.

This source code is publicly visible for portfolio review only and is
not licensed for reuse, copying, modification, or distribution. See
[LICENSE](LICENSE) for details.
