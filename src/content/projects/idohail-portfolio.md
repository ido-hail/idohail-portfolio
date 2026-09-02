---
title: "This Portfolio Website"
description: "A static Astro build on Cloudflare Workers, deployed from one validated artifact per commit and served under a Content-Security-Policy derived from what the build actually contains."
tags:
  - "Astro"
  - "TypeScript"
  - "Cloudflare Workers"
  - "GitHub Actions"
githubUrl: "https://github.com/ido-hail/idohail-portfolio"
featured: true
order: 2
---

## Context

This site is a personal engineering portfolio, and the smallest production system I own outright, so it is run like one: validated on every change, deployed through a pipeline, and protected by branch rules.

## Constraints

The requirements are narrow, and nearly every decision follows from them. Content is entirely known at build time. There are no users, no accounts, no personalization and nothing to persist. It has to be inexpensive to run, inexpensive to maintain, and still working untouched in a year.

## Static architecture

Astro with static output. No SSR, no adapter, no API routes, no database.

Every page is determined at build time, so a server process would exist only to re-derive the same HTML on each request, while adding a runtime that can fail, a surface that can be attacked, and a cost that scales with traffic. Anything genuinely dynamic would mean revisiting this decision; nothing here is dynamic.

## Content architecture

Projects and experience entries are Astro Content Collections with Zod schemas.

Hand-written frontmatter parsed at build time works until a field is misspelled or a value is malformed, at which point it fails quietly or at render time. With a schema, a malformed entry fails the type check before it can reach a build. Adding a project means adding one Markdown file; routes, pages and the sitemap follow automatically, and the application itself does not change.

## Deployment model

Cloudflare Workers Static Assets, with no Worker script.

The configuration deliberately has no `main` entry, so the deployed Worker serves assets and runs no application code. No request-time behavior needed one, and a runtime carries maintenance and security cost whether or not it is used.

## CI/CD and governance

The site is built exactly once per commit.

The validation job runs formatting, linting, type checking, the production build and an internal link check, then uploads the built output as a commit-scoped artifact. Both the preview and production jobs download that identical artifact instead of rebuilding, so what was validated is exactly what gets deployed. Rebuilding between validation and deployment introduces a window in which the two can differ, and closing it required no extra machinery.

Preview deployments run for same-repository pull requests only, excluding forks and automated dependency updates. Fork pull requests must never reach a job holding deployment credentials, and because dependency-update branches live inside the repository, they need excluding explicitly instead of being caught by the fork check.

Production runs only on pushes to `main`, inside a serialized concurrency group. Promotion is explicit: a new Worker version is uploaded, its exact version identifier is parsed from structured output, and only that version is promoted to full traffic. The pipeline never guesses an identifier or constructs a URL. If an expected value is missing, the job fails.

Failure handling is deliberately conservative. A non-zero exit from the promotion command is reported as unverified state, not as a failed deployment, because a client-side failure does not prove the server-side action did not occur. A zero exit with a missing deployment identifier is reported as ambiguous. In both cases the pipeline stops for inspection instead of retrying, re-promoting or rolling back, since automated recovery based on an incorrect assumption about remote state can cause more damage than the original fault.

`main` is protected by a ruleset: pull requests only, squash merges only, linear history, no bypass actors, and validation as a required check. Preview is deliberately not required, because it does not run for fork or dependency-update pull requests and would otherwise block them permanently.

Dependency updates are grouped by risk: minor and patch versions arrive together in a single pull request, while major versions always arrive individually so breaking changes are reviewed on their own.

## Security model

The Content-Security-Policy is derived from the site's actual asset inventory, not from a template.

The build ships no executable JavaScript, so script execution is disabled rather than merely restricted; the single structured-data block is non-executable data, not a script exception. Stylesheets are never inlined, which keeps styles same-origin and keeps `'unsafe-inline'` out of the policy entirely. Framing is blocked outright, reinforced by `X-Frame-Options` for older clients. Image and font permissions are held no broader than the build actually requires, and are reviewed in the same change that alters what the build contains.

Preview deployments carry a `noindex` directive scoped to the preview hostname pattern only, so preview builds stay out of search results with no risk of the production site inheriting the rule.

HSTS is not enabled. The policy it would commit to, including `max-age` and subdomain scope, is a decision that has not been made yet, so the header stays off until it is.

## Trade-offs

**No dynamic capability.** No contact form, no comments, no server-side behavior without revisiting the architecture. Accepted knowingly.

**The security policy is tightly coupled to the build.** Changing what the site contains requires reviewing the policy in the same change. That is the cost of deriving it from the actual inventory instead of permitting more than the site needs.

**No automated rollback.** Recovery is a normal pull request, or a deliberate manual version promotion. For a system with this blast radius, an automated rollback path introduces more risk than it removes.

## What it demonstrates

Choosing the smallest architecture that satisfies the requirements, then applying real delivery discipline to it: build-once artifacts, fail-closed automation, explicit promotion, enforced branch governance, and a security policy that reflects what the system actually does.
