# Deployment

Operational reference for how this repository's own CI/CD builds,
deploys, and recovers on Cloudflare Workers Static Assets. Intended for
an authorized maintainer of this repository — not a general guide for
provisioning or recreating this project in another Cloudflare/GitHub
account.

## Prerequisites

- A Cloudflare account with the `idohail-portfolio` Worker already
  created.
- GitHub repository admin access (to manage secrets, variables, and
  the `production` environment).

## Required local tools

Node.js 24.x (see `.nvmrc`) and npm. Wrangler is a pinned
`devDependency` and is always invoked via `npx wrangler`, not a
global install, so the version used matches `package-lock.json`.

## Repository configuration (GitHub)

The workflow depends on the following, already configured in the
repository (names only — no values are recorded here or anywhere in
this repository):

- Secret `CLOUDFLARE_API_TOKEN`
- Variable `CLOUDFLARE_ACCOUNT_ID`
- A `production` GitHub Environment, referenced by the `production`
  job in `.github/workflows/ci.yml`

### Cloudflare API token scope

The token is an account-scoped **Workers Scripts: Edit** token.
Cloudflare does not offer a token permission scoped to a single
Worker — the token's effective reach is every Worker in the account,
not just `idohail-portfolio`. The token carries no DNS permission;
DNS and custom-domain attachment are separate, manual operations (see
[Custom domain setup](#custom-domain-setup-pending)) and are not
reachable from this deployment pipeline.

## Branch governance

`main` is protected by a repository ruleset: deletion and
force-pushes are blocked, linear history is required, and every
change must land through a pull request (squash merge only, all
review threads resolved) that passes the **Validate** required status
check. `Preview` is not a required check — it does not run at all for
fork or Dependabot-authored PRs, so it cannot gate merges.

## CI/CD pipeline

`.github/workflows/ci.yml` defines three jobs, all in one workflow so
`needs: validate` can share the same run's build artifact.

### Validate (every PR and every push to `main`)

Checkout → Node setup (`.nvmrc`) → `npm ci` → format check → lint →
`astro check` → **build** (the only build in the whole pipeline) →
internal link check (Lychee, offline, blocking) → external link check
(Lychee, network-enabled, best-effort — non-blocking so a slow/flaky
third party can't fail CI) → upload the build output as artifact
`dist-${{ github.sha }}` (3-day retention).

### Preview (pull requests only)

Runs only for same-repo PRs from a non-Dependabot author (fork PRs
have no access to Cloudflare credentials; Dependabot PRs are excluded
explicitly by author since Dependabot branches are same-repo, not
forks). Downloads the exact `dist-${{ github.sha }}` artifact — no
rebuild — and runs `wrangler versions upload`, which creates a new
Worker version and Version Preview URL without shifting any
production traffic or touching routes/DNS. The Preview URL is parsed
from Wrangler's structured NDJSON output (never guessed or
constructed) and published to the job summary.

### Production (push to `main` only)

Guarded by both the workflow-level trigger and an explicit
`if: github.ref == 'refs/heads/main'` check, and serialized via a
`production` concurrency group so overlapping pushes can't race each
other. Downloads the same `dist-${{ github.sha }}` artifact, then:

1. `wrangler versions upload` — creates a new Worker version. Both
   `version_id` and `preview_url` must come from the same structured
   output record; the step fails closed if either is missing.
2. `wrangler versions deploy --version-id <id> --percentage 100 --yes`
   — explicitly promotes that exact version to 100% of production
   traffic. This command has no route/domain/DNS flags — it is
   structurally incapable of touching custom domains or DNS.

The job summary always reports the commit, Worker name, version ID,
deployment ID, and the version's Preview URL (useful for
post-deployment verification even once a custom domain is attached).

## Build-once artifact model

Astro builds exactly once per commit, in Validate. Preview and
Production both download that identical `dist-${{ github.sha }}`
artifact rather than rebuilding — what was validated is exactly what
gets deployed. `public/_headers` travels through this same artifact
(copied into `dist/` by the build) with no separate deployment step.

## Production failure states

The Production job distinguishes two failure modes rather than
treating every failure as "not deployed":

- **`versions upload`/`versions deploy` exits non-zero** — reported
  as an unknown/unverified remote state, never as "not promoted": a
  non-zero exit does not prove the server-side action didn't happen.
- **`versions deploy` exits zero but no `deployment_id` is found** —
  reported as an ambiguous state: Cloudflare may already have applied
  the deployment.

In either case, the pipeline does not retry, auto-promote, or
auto-rollback. The documented next step is to inspect actual remote
state — `npx wrangler deployments list` or the Cloudflare dashboard —
before taking any further action.

## Rollback and recovery

Three distinct situations, with different correct responses:

**A. A bad change was merged (the common case).** Fix or revert via a
normal pull request. Once it passes `Validate` and is squash-merged,
the `production` job runs as usual and promotes a new version built
from the corrected source. There is no special rollback path for
this — it's the same pipeline running again.

**B. The `production` job itself failed or reported an ambiguous
state.** Do not rerun the workflow or re-promote blindly. Inspect
first: `npx wrangler deployments list` or the Cloudflare dashboard,
using the version ID and Preview URL already reported in the job
summary, to determine actual remote state before acting.

**C. A previously deployed version needs to be restored.** Cloudflare
retains recent Worker versions. Use `npx wrangler rollback
[version-id]` (defaults to the version before the current one), or
explicitly `npx wrangler versions deploy <version-id> --percentage
100 --yes` — both are manual, operator-run commands. There is no
automated rollback mechanism in this repository.

## Security header deployment

`public/_headers` is copied into `dist/_headers` by the Astro build
and deployed as part of the same validated artifact both Preview and
Production consume — there is no separate step or Cloudflare
dashboard configuration for headers.

## Custom domain setup (pending)

Not yet performed. Attaching `idohail.com` to the `idohail-portfolio`
Worker is a manual, one-time Cloudflare configuration step (Worker
custom domain/route setup), done outside this CI/CD pipeline — the
pipeline itself has no route or DNS capability by design (see
[Cloudflare API token scope](#cloudflare-api-token-scope)).

## Post-launch verification (pending)

After the custom domain is attached, HTTPS should be verified
end-to-end for the production hostname before relying on it, and the
`--exclude '^https://idohail\.com/'` temporary exclusion in the
external link check (`ci.yml`) should be removed so the site's own
canonical/OG self-links get checked like any other external link.

## HSTS activation (pending)

Deferred until [Post-launch verification](#post-launch-verification-pending)
has confirmed the production hostname serves valid HTTPS. Enabling
HSTS before that is verified risks locking out browsers from a
domain that isn't reliably serving HTTPS yet.
