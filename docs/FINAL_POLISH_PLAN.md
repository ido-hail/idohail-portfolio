# Final Polish Plan

> Operational source of truth for the remaining portfolio work.
>
> Ranks **above** `SPEC.md` where the two conflict, until the conflicting
> requirement lands in `SPEC.md`. Ranks **below** `SPEC.md` for everything not
> named here. `SPEC.md` remains the durable product and architecture
> specification; this document is the currently approved plan for reaching it.
>
> This file is written to be self-contained. A Claude Code session with no prior
> conversation context should be able to execute any authorized task using only
> this document and the repository.

---

## 0. Current execution authorization

This section governs what may be executed **right now**. It is an execution
control, not a change to the plan. It is updated by explicit human authorization,
**one PR at a time**.

**This document is never standing permission to execute the whole sequence.**

### Currently authorized

**PR 0 is merged and production-verified.** ~~PR 0 only — tasks `P0-01`, `P0-02`, `P0-03`.~~

**Logical PR 1 is merged and production-verified.** ~~Logical PR 1 only — tasks `P6-01`, `P6-02`, `P6-03`.~~

**`P1-00` received explicit human selection** (capability line and value proposition locked; see §2/§4) and feeds this implementation as the completed gate.

**Logical PR 2 is merged and production-verified.** ~~Logical PR 2 only — implementation tasks `P1-01`, `P1-02`, `P1-03`, `P1-12`.~~

**Logical PR 3 only** — implementation tasks `P1-04`, `P1-05`, `P1-06`, `P1-07`, `P1-08`, `P1-09`, `P1-10`, `P1-11`.

Allowed files, complete list:

```
docs/FINAL_POLISH_PLAN.md   (tracked)
src/pages/index.astro       (tracked)
SPEC.md                     (tracked)
public/tools/**             (tracked, only if genuinely required for P1-09)
```

If repository formatting or validation appears to require touching any other
file, **stop and report** rather than expanding scope.

### Forbidden while logical PR 3 is the authorized scope

- `src/config/site.ts`, `src/components/SiteHeader.astro`
- `src/pages/about/**`, `src/pages/experience/**`, `src/content/**`, `src/layouts/**`
- `.claude/**`
- `README.md`, `docs/ARCHITECTURE.md`, `docs/DEPLOYMENT.md`
- `package.json`, `wrangler.jsonc`, `.github/workflows/**`
- `public/_headers`, `public/projects/**`
- portrait assets, Resume assets
- Cloudflare or GitHub settings
- Reopening `P1-00` positioning or changing the approved Hero wording
- Starting `P2-00` or any Phase 2 work
- Starting any logical PR after PR 3
- Merging logical PR 3

### Stop condition

After the authorized PR is implemented, validated with `npm run verify`,
committed, pushed and opened for review: **stop**. Do not merge automatically.
Do not advance to the next PR or phase.

### Authorization model for the rest of the plan

Every later PR requires a **separate** future authorization, granted only after
the previous PR has been reviewed and production-verified. When authorization
moves on, this section is updated in that PR to name the new authorized scope.
**This document remains never-standing-permission for the full sequence** —
each authorization above supersedes the previous one and covers exactly the
tasks and files it names.

---

## 1. Baseline

**Repository:** `ido-hail/idohail-portfolio`
**Production:** <https://idohail.com>
**Baseline commit at plan creation:** `10723c0f1246e86ef9940bbc827363cc8c00b6b8`

### Verified production state (2026-08-31, via `curl -I`)

| Check                                                                                | Result                                           |
| ------------------------------------------------------------------------------------ | ------------------------------------------------ |
| `https://idohail.com/`                                                               | `HTTP/2 200`                                     |
| `http://idohail.com/`                                                                | `301` to `https://idohail.com/`                  |
| `https://www.idohail.com/`                                                           | `301` to `https://idohail.com/`                  |
| CSP                                                                                  | Served exactly as committed in `public/_headers` |
| `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` | All present                                      |
| `Strict-Transport-Security`                                                          | **Absent** — HSTS is genuinely not enabled       |
| `X-Robots-Tag` on production                                                         | Absent (correct; scoped to `*.workers.dev` only) |

### Complete and not to be reopened without an actual defect

- Custom Domain architecture
- HTTP to HTTPS redirect
- www to apex redirect
- Build-once deployment architecture
- Worker version promotion
- Preview `noindex` model
- Strict CSP architecture
- The project visual budget: exactly three figures, already shipped
  (`namegen/architecture.svg`, `namegen/grafana-dashboard.webp`,
  `pacman/architecture.webp`)
- Project figure layout in `src/pages/projects/[slug].astro`

**No additional diagrams or screenshots.** The portfolio case study
(`src/content/projects/idohail-portfolio.md`) intentionally remains text-only.

### Known factual defects in the repository at baseline

These are wrong today and are fixed by `P6-01` through `P6-03`:

- `README.md` states the production custom domain is "pending launch" and "not yet attached". It is attached and serving.
- `docs/ARCHITECTURE.md` documents `img-src 'none'`. The committed and served policy is `img-src 'self'`.
- `docs/ARCHITECTURE.md` documents the Experience schema as `startDate` / `endDate` (`YYYY-MM` strings). `src/content.config.ts` uses `startYear` / `endYear` (integers).
- `docs/DEPLOYMENT.md` has a "Custom domain setup (pending) — Not yet performed" section.
- `.github/workflows/ci.yml` carries a `TEMPORARY` exclusion skipping `^https://idohail\.com/` in the external link check; the stated reason has expired.
- `.github/workflows/ci.yml` prints "No production hostname/custom domain is attached yet" in every production job summary.

---

## 2. Final positioning principles

### No narrow job title

The homepage must not present a single-role job title below the name.
`Technical Operations` is retired as the primary identity.

### Approved Hero model

```
Name
Capability / domain line
Short value proposition
```

The capability/domain line under evaluation:

> Production Operations · DevOps & Cloud Infrastructure · Reliability & Automation · Data Systems

This is a capability/domain line, **not** a list of claimed job titles. Final
wording is produced by review gate `P1-00` and selected by a human.

### What the profile must communicate

One coherent, versatile technical profile: a hands-on technical operations and
production professional who can build, operate, investigate, automate, lead and
improve systems across production, infrastructure and data.

Breadth to convey: problem solving · investigation and root-cause thinking ·
production ownership · operational leadership · cross-functional work ·
reliability · monitoring and observability · automation · data systems · cloud
and infrastructure · release management · incident response · internal tooling ·
systems administration · identity and access administration · technical project
and process ownership.

The profile must not read as only Data, only DevOps, only support, only QA, or
only management.

### Where the metrics live

The three measured outcomes — **2M+ users**, **>30% reduction in production data
incidents**, **next-day to real-time detection** — are professional-experience
evidence.

- They live on `/experience/`.
- The Hero is **not** a metric summary. Do not compress them into the value proposition.
- `/about/` may carry **at most one** contextual proof point, and only where it
  materially strengthens the Professional Background narrative. There is no
  requirement to repeat any of them.
- Removing "A few numbers" from the homepage is a genuine removal, not a relocation.

### Skills policy

- A skill is presented as a skill. **No** public categorisation as professional
  experience / project experience / coursework / foundations.
- Use relevant market terminology where factual knowledge or experience supports it.
- `CCNA` appears as a bare skill keyword. Never `CCNA Certified` — no
  certification claim is being made. Equally, no public qualifier such as
  "CCNA coursework" or "CCNA fundamentals" is required.
- `SRE Practices` appears as a capability keyword. **Never** as a category name,
  never as a claimed role, never `SRE Engineer`, and never as job tenure. Ido is
  not described as an SRE.
- Project-backed DevOps / DevSecOps capability may be represented normally as
  capability.
- Never fabricate years of experience in a role that was never held.

---

## 3. Global editorial rules

### No em dash in published copy

The em dash character (`—`) must not appear anywhere in published site copy. Use
normal punctuation or a standard hyphen.

**Scope:** rendered text, page `<title>` values, meta descriptions, `alt` text,
figure captions, project titles, and content Markdown. Date ranges use a spaced
standard hyphen (`2023 - 2024`).

**Out of scope:** em dashes inside source-code comments. They are not published
copy, and changing them inflates diffs without changing what any reader sees.

### Patterns to remove

- Vague abstractions
- Excessive rhetorical contrasts
- Repetitive "this is not X, it is Y" structures
- Self-conscious engineering prose
- Generic motivational language
- Over-explaining obvious decisions

### Target voice

Human · professional · technical · concise · specific · confident.
Not corporate. Not over-polished.

---

## 4. Final information architecture

### Navigation

```
Home        Projects   Experience   About   [Resume]
```

- The left-hand header link's text changes from `Ido Hail` to `Home`. It still points at `/`.
- The name then appears in the Hero `<h1>` and the footer copyright only. Accepted trade-off.
- `Resume` renders only when `siteConfig.resumePath` is non-null. The existing
  conditional in `src/components/SiteHeader.astro` already handles this.
- `aria-current="page"` is currently derived from `item.href === currentPath` over
  `siteConfig.nav`. The Home link sits outside that loop and needs `aria-current`
  wired explicitly for `/`.

### Homepage section order

| #   | Section           | Note                                                                                                              |
| --- | ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| 1   | Hero              | Name, capability line, value proposition, conditional Resume CTA plus compact LinkedIn / GitHub / Email, portrait |
| 2   | **Selected Work** | First evidence section. No paragraph announcing how many projects exist.                                          |
| 3   | What I Work On    | Four capability groups                                                                                            |
| 4   | Skill Map         | Curated public presentation                                                                                       |
| 5   | Tools I work with | Curated subset, existing marquee mechanism                                                                        |
| 6   | Get in touch      | Closing CTA                                                                                                       |

Removed entirely: **"A few numbers"** and **"A bit about me"**.

**Rationale for Selected Work at position 2:** the Hero already carries the
capability line and the value proposition. Making the reader pass through a
second capability-card section before reaching any evidence delays the proof.
Projects are the strongest homepage evidence, so they come first; What I Work On
broadens the picture after the reader has seen something concrete.

### Hero details

- **Social links are plain text, not icons.** Icon-only links require `aria-label`
  plumbing, and an icon set is a new asset with a redistribution question
  attached. Text links carry no accessibility risk and no new assets.
- **No sample Hero prose appears in this document by design.** Final wording comes
  from `P1-00` and is selected by a human. Any draft encountered elsewhere is
  illustrative, never approved copy.
- **Resume CTA before the asset exists:** the CTA row is built conditionally on
  `siteConfig.resumePath` in Phase 1. Until Phase 4 the primary button is
  `View Projects` with `Experience` secondary. When `resumePath` lands, `Resume`
  becomes primary. The conditional is written once, in Phase 1; Phase 4 needs no
  template change.

### What I Work On — four capability groups

| Group                             | Covers                                                                                                         |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Production & Reliability          | production operations, incident response, RCA, monitoring/observability, release management, release readiness |
| DevOps, Cloud & Infrastructure    | AWS, Terraform, Kubernetes, containers, CI/CD, delivery pipelines                                              |
| Automation & Data Systems         | SQL/Python automation, pipelines, data quality, validation, migrations                                         |
| Integrations, Tooling & Ownership | REST APIs, internal tooling, identity/access operations, cross-functional and technical project ownership      |

Four cards, not one per capability bullet. Grid: 1 column, then 2 (`sm`), then 4 (`lg`).

### Tools marquee — curated subset

`Linux · PostgreSQL · MongoDB · Redis · Snowflake · Python · Prefect · dbt ·
Kafka · Metabase · AWS · Terraform · Docker · Kubernetes · GitHub Actions ·
Prometheus · Grafana · Postman`

dbt and Kafka are new additions. If no clearly redistributable local SVG is
available, render them name-only — `logo: null` is already supported (`AWS` uses
it today). Never hotlink, never improvise a mark. Jira, Zendesk and Retool stay
out of the strip: it is a curated subset, not a second Skill Map.

### Route-level IA

| Route              | Role                                                                |
| ------------------ | ------------------------------------------------------------------- |
| `/`                | As above                                                            |
| `/projects/`       | One-line intro, cards without years                                 |
| `/projects/[slug]` | Three case studies, three visuals, tightened                        |
| `/experience/`     | Principal professional evidence page; home of the metrics           |
| `/about/`          | Rewritten, plus a new Professional Background section               |
| Resume             | Direct PDF link from nav, Hero and footer. **No `/resume/` route.** |

---

## 5. Internal evidence inventory

**This section is reference data, not the rendered UI.** It is the authoritative
record of what is factually true and supportable. The public Skill Map (§6) is a
curated presentation derived from it.

| Family                                    | Verified inventory                                                                                                                                                                                                                                                                                            |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Production Reliability & Operations**   | Production Operations · SRE Practices · Incident Response · Root Cause Analysis · Monitoring & Alerting · Observability · Log Analysis · Release Management · Release Readiness · Production & Staging Operations · Operational Analysis · Prometheus · Grafana · Axiom                                       |
| **DevOps, Cloud & Infrastructure**        | AWS · Terraform · Infrastructure as Code · Docker · Kubernetes · Amazon EKS · Amazon ECR · Amazon S3 · IAM · OIDC · VPC & Networking · Load Balancing (NLB) · Encrypted Storage (EBS) · GitHub Actions · CI/CD · Immutable Delivery · Deployment Validation · Helm · Kustomize · kubectl · Cloudflare Workers |
| **Data Engineering & Platforms**          | SQL · PostgreSQL · MongoDB · Snowflake · Redis · ETL / ELT · Prefect · dbt · Kafka · Data Modeling · Data Quality & Validation · Database Migrations · 100+ production tables                                                                                                                                 |
| **Programming & Automation**              | Python · JavaScript · TypeScript · Bash / Shell · Git · Scripting & Job Automation                                                                                                                                                                                                                            |
| **APIs, Integrations & Internal Tooling** | REST APIs · API & Integration Validation · Postman · Retool · Metabase · Jira · Zendesk                                                                                                                                                                                                                       |
| **Systems, Identity & Networking**        | Linux · System Administration · JumpCloud · Google Workspace Administration · Identity & Access Management · RBAC · Identity Lifecycle · Onboarding / Offboarding · TCP/IP · DNS · HTTP/HTTPS · Firewalls · CCNA                                                                                              |
| **Security, QA & Compliance**             | DevSecOps · Vulnerability Scanning · Trivy · Container Hardening · Kubernetes NetworkPolicy · QA & Test Coordination · Backend & Database Testing · Fraud / Abuse Investigation · Cyber Security · SOC Fundamentals · HIPAA / GDPR                                                                            |

### Professional evidence pool

**YuviTal — TechOps Engineer, 2023 - 2024**
Hands-on production and staging operations · backend and database testing ·
production issue and defect investigation via SQL/NoSQL, logs and API testing ·
ETL run and data-flow validation · API integration validation with Postman ·
operational data analysis and reporting · fraud and abuse investigation
contributing to roughly 15% abuse reduction · Jira defect management.

**YuviTal — TechOps Team Lead, 2024 - 2026**
Led technical operations for a production environment serving 2M+ users · led a
three-person technical team (one developer, two TechOps engineers) · designed and
built monitoring and automated alerting · built an automated SQL and Python
data-quality framework across Prefect-orchestrated pipelines supporting 100+
production tables · owned release management and release readiness · SQL and
Postman release validation · JumpCloud identity and access administration
(lifecycle, groups, permissions, RBAC, onboarding/offboarding) · Retool
operational tooling and dashboards · mentoring while staying hands-on ·
cross-functional work with engineering, product, business stakeholders,
executives, vendors and B2B/B2C clients.

**Measured outcomes:** >30% reduction in production data incidents · issue
detection moved from next-day discovery to real-time · approximately 15%
reduction in abuse activity.

**Also in the pool:** database migrations · Snowflake, MongoDB, PostgreSQL, Redis
investigation · JavaScript jobs · dashboards and operational analytics · military
service as a former combat commander.

### `SRE Practices` — usage note

`SRE Practices` is included as a **capability keyword**, supported by the
monitoring, alerting, incident response, root-cause analysis, release-readiness
and reliability work in the evidence pool above. It exists for recruiter keyword
coverage while remaining factual.

It must never become a Skill Map category, never describe Ido as an SRE, never
appear as `SRE Engineer`, and never imply SRE job tenure.

### Tableau — status note

**Tableau is not absent for lack of evidence.** Historical CV material does
contain Tableau evidence.

Tableau is excluded from the current portfolio Skill Map because **the user
explicitly chose to remove it during planning**. This distinction is recorded so
that a future evidence audit does not treat the omission as an oversight and
silently re-add it. Any future inclusion is a fresh human decision.

### User-confirmed inclusions

`dbt` · `Kafka` · `Zendesk` · `Google Workspace Administration` ·
`HIPAA / GDPR` were each explicitly confirmed during planning and belong in the
evidence pool.

---

## 6. Public Skill Map

### Curation rules

The public Skill Map is a **curated presentation** derived from §5, not a dump of
it. Publishing the full inventory would recreate the keyword-wall problem this
work exists to fix.

- Broad but **scannable** — a reader should take in a family at a glance.
- Strong recruiter keywords retained; low-value implementation details dropped.
- **No** Professional / Foundations distinction. **No** coursework, project or
  professional labels. **No** framing sentence establishing an evidence hierarchy.
- Each concept appears **once** unless there is a compelling UX reason.
- Prefer a meaningful umbrella term over several implementation details when the
  details add clutter. `AWS` and `Kubernetes` carry more recruiter signal than
  `Amazon S3`, `NLB`, `EBS`, `kubectl` and `Kustomize` listed separately; that
  detail already lives, in context, inside the case studies.
- Tools appear where they materially improve recruiter scanning, not because they
  are verified.
- **Do not blindly publish every verified technology as a chip.**
- **No group is named after a job title. There is no `SRE` group.** `SRE Practices`
  appears only as a chip inside Production Reliability & Operations.
- Group sizes follow the evidence, not visual symmetry.

### Density review — mandatory

**No arbitrary numeric cap is imposed.** Instead, `P1-08` carries an explicit
visual-density review at **360 / 768 / 1440**. If any family reads as a keyword
wall at any of those widths, the list is reduced before merge. This is part of
that task's Definition of Done, not a nice-to-have.

### Current draft

Illustrative starting point, finalised inside `P1-08` against the density review:

| Family                                | Draft chips                                                                                                                                                                             |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Production Reliability & Operations   | Production Operations · SRE Practices · Incident Response · Root Cause Analysis · Monitoring & Alerting · Observability · Release Management · Release Readiness · Prometheus · Grafana |
| DevOps, Cloud & Infrastructure        | AWS · Terraform · Infrastructure as Code · Docker · Kubernetes · CI/CD · GitHub Actions · Immutable Delivery · Cloudflare Workers                                                       |
| Data Engineering & Platforms          | SQL · PostgreSQL · MongoDB · Snowflake · Redis · ETL / ELT · Prefect · dbt · Kafka · Data Modeling · Data Quality · Database Migrations                                                 |
| Programming & Automation              | Python · JavaScript · TypeScript · Bash · Git                                                                                                                                           |
| APIs, Integrations & Internal Tooling | REST APIs · API & Integration Validation · Postman · Retool · Metabase · Jira · Zendesk                                                                                                 |
| Systems, Identity & Networking        | Linux · System Administration · Identity & Access Management · JumpCloud · Google Workspace Administration · RBAC · TCP/IP · DNS · CCNA                                                 |
| Security, QA & Compliance             | DevSecOps · Vulnerability Scanning · Trivy · Container Hardening · QA & Test Coordination · Cyber Security · HIPAA / GDPR                                                               |

Items held in the inventory but not in this draft (EKS, ECR, S3, OIDC, NLB, EBS,
Helm, Kustomize, kubectl, Axiom, Log Analysis, NetworkPolicy, SOC Fundamentals,
Operational Analysis, Deployment Validation, Fraud/Abuse Investigation,
Onboarding/Offboarding) remain documented in §5 and visible in the case studies
and Experience entries. Nothing factual is lost; it is presented where it carries
context rather than as an isolated chip.

### Implementation note

The `sets: [{ label, skills }]` data shape in `src/pages/index.astro` exists
**only** to support the Professional / Foundations split. With the split gone,
collapse the data to `{ title, skills[] }` and delete the inner `sets.map` — one
fewer code path.

---

## 7. Constraints that must not change

- **Static-only.** No SSR, no adapter, no API routes, no database, no runtime
  Worker application code.
- **Zero client-side JavaScript.** `script-src 'none'` is never loosened. All
  interaction is CSS-only.
- **`public/_headers` is unchanged throughout the plan.** The CSP is final.
  Whether that file is even the right place for HSTS is part of the deferred
  `P6-08` decision; no earlier phase commits a header line.
- **`astro.config.mjs`** — `site`, `output: "static"`, `trailingSlash: "always"`,
  `build.format: "directory"`, `build.inlineStylesheets: "never"`. The last one is
  what makes `style-src 'self'` viable.
- **`wrangler.jsonc`** — `workers_dev: false`, `preview_urls: true`, the
  `idohail.com` custom-domain route, `assets.html_handling`.
- **`.github/workflows/ci.yml`** structure — validate, artifact, then
  preview/production; build-once model; NDJSON parsing; fail-closed promotion;
  concurrency group. Only the `P6-01` through `P6-03` corrections touch it.
- **`public/projects/`** — the three shipped visuals. No new diagrams or
  screenshots.
- **`src/lib/projects.ts`** — `getSortedProjects` / `getFeaturedProjects` are the
  correct existing abstraction. Reuse them; do not reimplement ordering.
- **Marquee CSS** in `src/pages/index.astro` — the `prefers-reduced-motion`
  fallback and the transparent-checkbox pause control are deliberate
  accessibility work. Sync the _data_, not the mechanism.
- **Node 24** (`engines.node` `>=24.0.0 <25.0.0`, `.nvmrc`), Tailwind 4 via
  `@tailwindcss/vite`, TypeScript held on the 6.x line for `@astrojs/check` and
  `typescript-eslint` peer compatibility.

### Machine-local Codex compatibility mirrors

`AGENTS.md` and `.agents/` are excluded from version control through
`.git/info/exclude`, which records them as machine-local Codex compatibility
artifacts rather than tracked repository content.

- **The tracked repository source is `CLAUDE.md` and `.claude/**`.**
- `AGENTS.md` and `.agents/**` are machine-local mirrors. They never appear in a
  pull request, and they are absent from a fresh clone unless recreated locally.
- When they are present in the working tree, changes to `CLAUDE.md` or
  `.claude/**` should be mirrored locally into `AGENTS.md` or `.agents/**` as
  applicable, so the two stay equivalent apart from their intentional
  tool-specific differences.
- **A future session must not treat the absence of `AGENTS.md` or `.agents/` in a
  fresh clone as repository drift.** Nothing is missing; they were never tracked.

---

## 8. Tasks

**Statuses:** `TODO` · `IN PROGRESS` · `BLOCKED` · `DONE` · `DROPPED`

**Conventions**

- Task IDs are stable and never renumbered. A dropped task becomes
  `Status: DROPPED` with a reason; it is never deleted.
- Status is updated in the same PR that changes it, so plan and repository never drift.
- Every task names its files explicitly. A cold session must not have to guess.
- **Review gates never self-approve. They stop.** The gates are `P1-00`, `P2-00`,
  `P5-01` and `P6-08`.
- Any deviation from this plan is reported, not silently reconciled.

---

### Phase 0 — Persist Final Polish Plan

**Non-goals:** no rendered site content change; no `SPEC.md` behaviour change; no
`README.md`, `docs/ARCHITECTURE.md` or `docs/DEPLOYMENT.md` change; no CI change;
no skills change (the `portfolio-design-review` skill is `P1-12`).

#### P0-01 — Create `docs/FINAL_POLISH_PLAN.md`

- **Objective:** persist the approved master plan as the durable operational document, before any product, content, documentation or CI work begins.
- **Scope:** in — the full plan in operational form, self-contained for a fresh session. Out — anything that changes site behaviour.
- **Files:** `docs/FINAL_POLISH_PLAN.md`
- **Dependencies:** none
- **Definition of Done:** file exists; contains all six phases and every stable task ID; each task carries Objective, Scope, Files, Dependencies, Definition of Done, Verification and Status; review gates are explicit; the execution-authorization section (§0) is present.
- **Verification:** `npm run verify`; confirm `git diff --name-only` lists only the tracked allowed files (`docs/FINAL_POLISH_PLAN.md` and `CLAUDE.md`).
- **Status:** DONE

#### P0-02 — Point `CLAUDE.md` at the plan

- **Objective:** ensure a future Claude Code session reads this plan before doing Final Polish work.
- **Scope:** in — the smallest durable instruction covering document precedence, the read-first requirement, respect for task IDs and review gates, and no silent phase advancement. Out — rewriting unrelated `CLAUDE.md` instructions.
- **Files:** `CLAUDE.md`
- **Dependencies:** `P0-01`
- **Definition of Done:** `CLAUDE.md` states that `SPEC.md` remains the durable product and architecture specification; that this file is the operational source of truth for approved remaining work; that where this plan changes a requirement not yet in `SPEC.md` the plan wins and `SPEC.md` is updated in the same PR that implements the behaviour; that the plan must be read before Final Polish work; and that task IDs, review gates and per-PR authorization are respected.
- **Verification:** `npm run verify`; read the diff and confirm no unrelated instruction changed.
- **Status:** DONE

#### P0-03 — Mirror the pointer into the machine-local `AGENTS.md`

- **Objective:** keep the machine-local Codex mirror equivalent to the tracked `CLAUDE.md`.
- **Scope:** in — the same instruction, in `AGENTS.md`'s existing Codex-facing wording, applied in the current working environment. Out — `.claude/skills/` and `.agents/skills/`.
- **Files:** `AGENTS.md` — **machine-local, not tracked** (see §7). It is updated in the working tree and **is not committed and does not appear in PR 0**.
- **Dependencies:** `P0-02`
- **Definition of Done:** in a working environment where `AGENTS.md` exists, it carries the same substance as `CLAUDE.md`, and a diff of the two files shows only the intentional tool-specific differences (title line, tool-name line, and any `CLAUDE.md` / `AGENTS.md` self-references). Completion means the machine-local mirror was updated in the current working environment — not that it was committed. Where `AGENTS.md` does not exist locally, there is nothing to mirror and the task is satisfied.
- **Verification:** `diff CLAUDE.md AGENTS.md` shows only intentional differences; `npm run verify`. Note `.prettierignore` excludes `CLAUDE.md` but **not** `AGENTS.md`, so where `AGENTS.md` is present locally it must stay Prettier-clean for local runs; CI never sees it.
- **Status:** DONE

---

### Phase 1 — Positioning, Homepage & Skills

**Non-goals:** About or Experience copy; project pages; the sitewide em-dash pass;
portrait size changes; the Resume asset; any interaction work; any relocation of
the metrics into the Hero.

#### P1-00 — Positioning / Hero copy review **[REVIEW GATE]**

- **Objective:** produce Hero copy directions grounded in current market-facing practice, for human selection.
- **Scope:** in — review current portfolio and profile patterns for adjacent DevOps, infrastructure, production, reliability and operations profiles; propose approximately three concise Hero directions. Out — implementing anything.
- **Files:** none (written proposal)
- **Dependencies:** none
- **Definition of Done:** approximately three directions proposed; each preserves Name, then capability/domain line, then short value proposition; none introduces a job title; none is a keyword wall; each emphasises problem solving and technical breadth; none carries metrics. **The gate stops for human selection.**
- **Verification:** human selects one direction before `P1-03` begins.
- **Status:** DONE — human selected: capability line `Production & Reliability · DevOps & Infrastructure · Data & Automation`; value proposition anchoring Technical Operations as the professional background. Implemented in `P1-03`.

#### P1-01 — Positioning in site config

- **Objective:** replace the narrow job title with the approved capability line and add Home handling.
- **Scope:** in — `positioning` field, nav config, doc comments. Out — rendering changes.
- **Files:** `src/config/site.ts`
- **Dependencies:** `P1-00`
- **Definition of Done:** no single-role job title remains in config; capability line present; nav supports the new header model; doc comments describe actual behaviour.
- **Verification:** `npm run verify`.
- **Status:** DONE

#### P1-02 — Header wordmark becomes "Home"

- **Objective:** implement the approved navigation model.
- **Scope:** in — wordmark text and `aria-current` for `/`. Out — header layout redesign.
- **Files:** `src/components/SiteHeader.astro`
- **Dependencies:** `P1-01`
- **Definition of Done:** left-hand link reads `Home` and points at `/`; `aria-current="page"` is applied on the homepage; the conditional Resume nav entry still renders only when `resumePath` is set; keyboard navigation and focus visibility unchanged.
- **Verification:** `npm run verify`; keyboard tab pass on Preview; confirm `aria-current` in the built HTML for `/`.
- **Status:** DONE

#### P1-03 — Hero rebuild

- **Objective:** rebuild the Hero to the approved model with human-selected copy.
- **Scope:** in — name, capability line, value proposition, conditional CTA row, compact text social links. Out — portrait sizing (Phase 4), metrics of any kind.
- **Files:** `src/pages/index.astro`
- **Dependencies:** `P1-00` (human selection), `P1-01`
- **Definition of Done:** no job title under the name; "I like making complicated systems easier to run." and "My work usually sits somewhere between…" are gone; the CTA row is conditional on `siteConfig.resumePath` so Phase 4 needs no template change; LinkedIn, GitHub and Email render as compact text links with accessible names; no metrics in the Hero.
- **Verification:** `npm run verify`; Preview at 360 / 768 / 1440.
- **Status:** DONE — Preview verified at 360 / 768 / 1440 (real rendered viewports via CDP; `window.innerWidth` matched each target exactly; zero horizontal overflow at all three).

#### P1-04 — Remove "A few numbers"

- **Objective:** shorten the homepage and return the metrics to `/experience/`.
- **Scope:** in — the section and the `impactItems` array. Out — relocating the metrics anywhere on the homepage.
- **Files:** `src/pages/index.astro`
- **Dependencies:** `P1-03`
- **Definition of Done:** section and data array removed; **the metrics do not reappear in the Hero or elsewhere on `/`**; `/experience/` still carries all three.
- **Verification:** `npm run verify`; grep the built homepage for `2M+`, `30%` and `Real-time` and confirm absence.
- **Status:** DONE — confirmed absent from the built homepage; all three metrics confirmed still present on `/experience/` before removal.

#### P1-05 — Remove "A bit about me"

- **Objective:** shorten the homepage; About carries this content.
- **Scope:** in — the section and its link. Out — `/about/` content.
- **Files:** `src/pages/index.astro`
- **Dependencies:** `P1-03`
- **Definition of Done:** section removed; `/about/` remains reachable from nav and footer; no broken internal link.
- **Verification:** `npm run verify`; CI link check passes.
- **Status:** DONE — About remains reachable via header nav and footer, both untouched.

#### P1-06 — "What I Work On" broadened to four groups

- **Objective:** widen capability coverage per §4.
- **Scope:** in — `workAreas` data and grid. Out — a card per capability bullet.
- **Files:** `src/pages/index.astro`
- **Dependencies:** `P1-03`
- **Definition of Done:** four groups matching §4; grid 1 / 2 / 4; no group named after a job title; copy is concise rather than role definitions.
- **Verification:** `npm run verify`; Preview at 360 / 768 / 1440.
- **Status:** DONE — 4 cards confirmed via CDP at all three widths (1 col / 2 col / 4 col); no group named after a job title.

#### P1-07 — Reorder: Selected Work to position 2

- **Objective:** put evidence in front of the reader sooner.
- **Scope:** in — section order and removal of the Selected Work intro paragraph. Out — card design and featured-project logic.
- **Files:** `src/pages/index.astro`
- **Dependencies:** `P1-06`
- **Definition of Done:** order is Hero, Selected Work, What I Work On, Skill Map, Tools, Get in touch; the "Two projects where…" paragraph is gone; no paragraph announces how many projects exist; heading hierarchy remains one `h1` with `h2` sections.
- **Verification:** `npm run verify`; heading-order check on Preview.
- **Status:** DONE — order confirmed via CDP against Preview (`h2` sequence: Selected Work, What I work on, Skill Map, Tools I work with, Get in touch); intro paragraph removed with no replacement; `h1` count remains 1.

#### P1-08 — Skill Map rebuild

- **Objective:** replace the labelled Skill Map with the curated public presentation.
- **Scope:** in — apply §6 curation rules to the §5 inventory; collapse `sets` to a flat `skills[]`; delete the framing sentence and both sub-labels. Out — publishing the full inventory.
- **Files:** `src/pages/index.astro`
- **Dependencies:** `P1-07`
- **Definition of Done:** seven families; no `Professional` or `Foundations` labels; no framing sentence; `CCNA` appears bare; `SRE Practices` appears only as a chip and never as a group name; Tableau absent; the `sets` code path is deleted; **the 360 / 768 / 1440 density review has been performed and any family reading as a keyword wall has been reduced**.
- **Verification:** `npm run verify`; density review at all three widths on Preview, recorded in the PR description.
- **Status:** DONE — §6 draft implemented as the final list; density review performed via CDP screenshots at 360/768/1440 (real viewports, `scrollWidth === clientWidth` at all three); no family read as a keyword wall, so nothing was reduced.

#### P1-09 — Tools marquee data sync

- **Objective:** align the marquee with the final taxonomy.
- **Scope:** in — the `tools` array and any new local logo asset. Out — the marquee CSS mechanism, its pause control, and its reduced-motion fallback.
- **Files:** `src/pages/index.astro`, `public/tools/`
- **Dependencies:** `P1-08`
- **Definition of Done:** list matches §4; dbt and Kafka present, with a redistributable local SVG or rendered name-only via `logo: null`; no remote logo URL; no improvised mark; no document-level horizontal scrolling; the reduced-motion fallback still produces a fully visible wrapped layout; the pause control is still keyboard-operable.
- **Verification:** `npm run verify`; reduced-motion and keyboard pause tested on Preview.
- **Status:** DONE — dbt and Kafka use `logo: null` (no local SVG existed; none added). Verified via CDP: normal motion animates and the pause control (keyboard-focusable) pauses/resumes it; reduced motion sets `animation-name: none`, wraps to a static layout, shows all 18 tools with zero horizontal overflow, and hides the pause control and duplicate track.

#### P1-10 — Homepage metadata and JSON-LD

- **Objective:** align SEO metadata with the new positioning.
- **Scope:** in — `<title>`, meta description, `Person` JSON-LD. Out — the OG image (Phase 5).
- **Files:** `src/pages/index.astro`
- **Dependencies:** `P1-03`
- **Definition of Done:** title and description carry no retired job title; the description is unique and accurate; JSON-LD remains valid and contains only facts present on the site.
- **Verification:** `npm run verify`; validate JSON-LD from the built output.
- **Status:** DONE — title "Ido Hail | Production, DevOps & Data", description "Portfolio for Ido Hail: Technical Operations background across production, infrastructure and data, plus hands-on cloud and DevOps engineering projects." (no em dash, no retired title, no metrics). JSON-LD unchanged (name, url, sameAs only) — no alignment change was required, confirmed by inspection.

#### P1-11 — SPEC alignment for Phase 1

- **Objective:** make `SPEC.md` describe the site that now exists.
- **Scope:** in — §1 goals; §3.1 Hero, "A few numbers", "A bit about me", "What I work on", Skill Map and section order; §3.2 navigation; §6.2 homepage presentation. Out — sections owned by later phases.
- **Files:** `SPEC.md`
- **Dependencies:** `P1-01` through `P1-10`
- **Definition of Done:** every Phase 1 conflict listed in §11 is resolved; `SPEC.md` contains no requirement the site now contradicts.
- **Verification:** read `SPEC.md` §3.1 and §3.2 against the built homepage.
- **Status:** DONE — §1, §3.1 (Selected Work, What I work on, Skill Map bullets rewritten; "A few numbers" and "A bit about me" bullets removed), and §6.2 all updated; no stale reference to either removed section, the old three-area model, or the old seven-family names remains anywhere in `SPEC.md`.

#### P1-12 — Update the `portfolio-design-review` skill

- **Objective:** stop the skill steering future sessions back to the retired positioning.
- **Scope:** in — the hard-coded "Technical Operations & Engineering" identity and its supporting areas. Out — the skill's review priorities and structure.
- **Files:** `.claude/skills/portfolio-design-review/SKILL.md` — **the only tracked file in that PR.** If `.agents/` exists in the working tree, mirror the corresponding skill locally into `.agents/skills/portfolio-design-review/SKILL.md`; that copy is machine-local and is not a tracked PR file (see §7).
- **Dependencies:** `P1-01`
- **Definition of Done:** the tracked skill describes the current positioning; where `.agents/` is present locally, its copy is mirrored and `diff -r .claude .agents` shows only the intentional `CLAUDE.md` / `AGENTS.md` reference differences.
- **Verification:** `git diff --name-only` lists the `.claude/` skill only; where `.agents/` exists locally, `diff -r .claude .agents`; `npm run verify`.
- **Status:** DONE

---

### Phase 2 — About & Experience

**Non-goals:** projects; homepage; the sitewide em-dash pass (Phase 3 does it once);
any Resume claim that cannot yet be checked; inventing detail to fill a CV gap.

#### P2-00 — Evidence preflight **[REVIEW GATE, BLOCKING]**

- **Objective:** reconcile the site's claims against all available evidence before rewriting anything.
- **Scope:** in — reconcile against (1) the evidence inventory in §5, (2) the current live site, (3) the professional history in `src/content/experience/`, and (4) **all relevant historical Resume/CV variants supplied by Ido, not only the final Resume PDF that will later be published.** Out — writing any copy.
- **Files:** none (reconciliation record)
- **Dependencies:** consolidated historical CV evidence supplied by Ido
- **Definition of Done:** a reconciled evidence record exists, noting useful factual experience that appears in tailored CV variants but not yet on the site. **If the historical CV sources are not available: do not infer, do not reconstruct, do not fill gaps from context.** Mark this task `BLOCKED`, request the consolidated evidence, and do not begin the rewrite.
- **Verification:** human confirms the evidence record is complete before `P2-01` starts.
- **Status:** BLOCKED — awaiting consolidated historical CV evidence

#### P2-01 — About rewrite

- **Objective:** a shorter, more authentic About that reads broader than Data.
- **Scope:** in — opening and body prose. Out — Professional Background (`P2-02`) and the personal closing (`P2-05`).
- **Files:** `src/pages/about/index.astro`
- **Dependencies:** `P2-00`
- **Definition of Done:** communicates build, operate, investigate, lead, monitor, analyze, automate, coordinate across teams, understand a system deeply, break down ambiguous problems, learn quickly, drive toward a solution, and perform under pressure; "I work in Technical Operations, which is broad enough as a title…" and "Boring is the goal. Boring means it works." are gone; materially shorter than the current page.
- **Verification:** `npm run verify`; read against §2.
- **Status:** TODO

#### P2-02 — About: Professional Background section

- **Objective:** give About enough evidence to support the site's claims without duplicating the Resume.
- **Scope:** in — the employment progression (`TechOps Engineer · YuviTal, 2023 - 2024` then `TechOps Team Lead · YuviTal, 2024 - 2026`), a summary of progression and breadth, and a link to `/experience/`. Out — reproducing full Experience role bullets; turning About into a second Resume.
- **Files:** `src/pages/about/index.astro`
- **Dependencies:** `P2-01`
- **Definition of Done:** progression is clear; breadth is summarised from §5; **one or two concise proof points are permitted where they substantiate the narrative naturally, and are not required**; detailed role bullets remain only on `/experience/`.
- **Verification:** `npm run verify`; compare side by side with `/experience/` to confirm no bullet-level duplication.
- **Status:** TODO

#### P2-03 — About: working style

- **Objective:** convey personality and working style factually.
- **Scope:** in — curious, approachable, strong cross-functional communicator, hands-on, persistent, comfortable taking ownership, able to see both detail and the larger system. Out — a leadership marketing section.
- **Files:** `src/pages/about/index.astro`
- **Dependencies:** `P2-01`
- **Definition of Done:** **`former combat commander` appears exactly once, naturally, inside a sentence** — never as a heading, badge, separate marketing claim or exaggerated leadership section.
- **Verification:** `npm run verify`; grep the built page for the phrase and confirm a single in-sentence occurrence.
- **Status:** TODO

#### P2-04 — About: cloud, projects and systems foundations

- **Objective:** present breadth without the retired "training" framing.
- **Scope:** in — the cloud-and-infrastructure-through-projects paragraph and the systems, networking and security paragraph. Out — implying tenure that was never held.
- **Files:** `src/pages/about/index.astro`
- **Dependencies:** `P2-01`
- **Definition of Done:** no public "training" or "foundations" categorisation of skills; no fabricated professional tenure; projects remain the demonstration route for cloud and infrastructure work.
- **Verification:** `npm run verify`; read against the §2 skills policy.
- **Status:** TODO

#### P2-05 — About: "Outside the terminal"

- **Objective:** keep the personal closing brief.
- **Scope:** in — trimming to two or three sentences. Out — family, relationship, location or other sensitive detail; stretching hobbies into professional analogies.
- **Files:** `src/pages/about/index.astro`
- **Dependencies:** `P2-01`
- **Definition of Done:** two to three sentences; no sensitive personal detail.
- **Verification:** `npm run verify`.
- **Status:** TODO

#### P2-06 — Experience editorial pass

- **Objective:** improve scanability without weakening the evidence.
- **Scope:** in — repetition, prose weight, clarity, recruiter-facing terminology, consistency with the new positioning. Out — removing meaningful evidence merely to shorten.
- **Files:** `src/content/experience/yuvital-techops-engineer.md`, `src/content/experience/yuvital-techops-team-lead.md`
- **Dependencies:** `P2-00`
- **Definition of Done:** every measurable outcome retained; this page remains the home of the three headline metrics; terminology consistent with §2; no claim exceeds the evidence pool.
- **Verification:** `npm run verify`; diff old against new and confirm no evidence was dropped.
- **Status:** TODO

#### P2-07 — About metadata

- **Objective:** align About's SEO metadata with the new positioning.
- **Scope:** in — `<title>` and meta description. Out — the OG image.
- **Files:** `src/pages/about/index.astro`
- **Dependencies:** `P2-01`
- **Definition of Done:** no retired job title; the description is unique and accurate.
- **Verification:** `npm run verify`.
- **Status:** TODO

#### P2-08 — SPEC alignment for Phase 2

- **Objective:** make `SPEC.md` §3.1 `/about` describe the rewritten page.
- **Scope:** in — add Professional Background; remove "What Technical Operations means in plain terms" and the training-disclaimer clause. Out — other SPEC sections.
- **Files:** `SPEC.md`
- **Dependencies:** `P2-01` through `P2-07`
- **Definition of Done:** the SPEC `/about` requirements match the implemented page.
- **Verification:** read `SPEC.md` §3.1 against the built page.
- **Status:** TODO

---

### Phase 3 — Projects & Sitewide Editorial

**Non-goals:** new visuals (the three shipped figures are final); reducing
case-study engineering depth; `README.md` and `docs/` prose (Phase 6); homepage or
About rework.

#### P3-01 — Remove project years

- **Objective:** stop displaying project years and keep the schema honest.
- **Scope:** in — the `year` field in the schema, all three frontmatter blocks, and both templates' eyebrow rendering. Out — other schema fields.
- **Files:** `src/content.config.ts`, `src/content/projects/*.md`, `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`
- **Dependencies:** none within the phase
- **Definition of Done:** `year` removed from schema, content and templates **in the same commit**; no year renders anywhere; `astro check` passes. `SPEC.md` §4.2 requires schemas to hold only fields the application consumes, so the field is removed rather than orphaned in frontmatter.
- **Verification:** `npm run verify`; grep the built output for the year values and confirm absence.
- **Status:** TODO

#### P3-02 — Projects index editorial

- **Objective:** a scannable index without a generic introduction.
- **Scope:** in — the intro paragraph and card copy. Out — grid logic, which already degrades by project count.
- **Files:** `src/pages/projects/index.astro`
- **Dependencies:** `P3-01`
- **Definition of Done:** intro reduced to roughly one line; no paragraph explaining how many projects exist; cards scannable; GitHub, Live and Case study links intact.
- **Verification:** `npm run verify`; CI link check passes.
- **Status:** TODO

#### P3-03 — NameGen case study tightening

- **Objective:** concise technical depth.
- **Scope:** in — prose density, generic introductions, unsupported interpretation. Out — architecture, engineering decisions, trade-offs, evidence, and the two figures.
- **Files:** `src/content/projects/namegen.md`
- **Dependencies:** `P3-01`
- **Definition of Done:** architecture, key decisions, reliability and validation, observability, trade-offs and outcome all retained; both figures render with working full-size links, meaningful captions and distinct alt text; no reduction to a shallow card.
- **Verification:** `npm run verify`; visual check of both figures on Preview at 360 and 1440.
- **Status:** TODO

#### P3-04 — Pac-Man case study tightening

- **Objective:** concise technical depth.
- **Scope:** as `P3-03`, for the DevSecOps pipeline write-up. Out — the architecture figure.
- **Files:** `src/content/projects/pacman.md`
- **Dependencies:** `P3-01`
- **Definition of Done:** security gates, workload hardening, network protection, pipeline controls, validation and trade-offs retained; the figure renders correctly; the deliberate non-repetition of NameGen's lifecycle story is preserved.
- **Verification:** `npm run verify`; visual check on Preview.
- **Status:** TODO

#### P3-05 — Portfolio case study tightening

- **Objective:** concise technical depth; the entry stays text-only.
- **Scope:** in — prose density. Out — adding any figure.
- **Files:** `src/content/projects/idohail-portfolio.md`
- **Dependencies:** `P3-01`
- **Definition of Done:** static architecture, content architecture, deployment model, CI/CD governance, security model and trade-offs retained; still text-only; statements still match the repository, including any Phase 6 corrections already merged.
- **Verification:** `npm run verify`; cross-check claims against `ci.yml`, `wrangler.jsonc` and `public/_headers`.
- **Status:** TODO

#### P3-06 — Sitewide em-dash elimination

- **Objective:** apply §3 to all published copy.
- **Scope:** in — rendered text, `<title>` templates, meta descriptions, alt text, captions, project titles, and `formatYearRange()`. Out — source-code comments.
- **Files:** `src/pages/`, `src/components/`, `src/layouts/`, `src/content/`
- **Dependencies:** `P3-02` through `P3-05`
- **Definition of Done:** no em dash in any rendered output; `formatYearRange()` emits `2023 - 2024`; both `<title>` templates use a non-em-dash separator; the NameGen project title no longer contains one.
- **Verification:** `npm run verify`; `grep -r "—" dist/` returns nothing.
- **Status:** TODO

#### P3-07 — AI-tell voice pass

- **Objective:** make the prose read as written by a person.
- **Scope:** in — all rendered copy across every route. Out — technical accuracy changes.
- **Files:** all rendered copy
- **Dependencies:** `P3-06`
- **Definition of Done:** the §3 patterns are removed; the voice matches the §3 target; no factual claim changed while rewording.
- **Verification:** `npm run verify`; read every route end to end.
- **Status:** TODO

#### P3-08 — SPEC alignment for Phase 3

- **Objective:** record the schema change and codify the editorial rules durably.
- **Scope:** in — `SPEC.md` §4.1 (`year` removed) and a new editorial-rules section carrying §3. Out — other SPEC sections.
- **Files:** `SPEC.md`
- **Dependencies:** `P3-01`, `P3-06`, `P3-07`
- **Definition of Done:** §4.1 no longer lists project year metadata; the editorial rules are stated as durable requirements, not as a one-off cleanup.
- **Verification:** read `SPEC.md` against `src/content.config.ts` and the built output.
- **Status:** TODO

---

### Phase 4 — Portrait & Resume

**Non-goals:** no CSP change (`img-src 'self'` already permits a local portrait, and
a plain link to a same-origin PDF is not governed by any CSP directive); no
`/resume/` route; no resume-generation pipeline.

#### P4-01 — Real portrait asset

- **Objective:** replace the placeholder with the real photograph.
- **Scope:** in — the asset and removal of the placeholder. Out — Hero layout (`P4-02`).
- **Files:** `public/`, `src/pages/index.astro`
- **Dependencies:** the real portrait image, supplied by Ido
- **Definition of Done:** the real portrait is served locally; `public/portrait-placeholder.svg` is deleted; no remote image reference.
- **Verification:** `npm run verify`; Preview at 360 / 768 / 1440.
- **Status:** BLOCKED — awaiting the portrait image

#### P4-02 — Portrait Hero integration

- **Objective:** integrate the portrait without letting it dominate.
- **Scope:** in — size, placement and responsive behaviour. Out — Hero copy.
- **Files:** `src/pages/index.astro`
- **Dependencies:** `P4-01`
- **Definition of Done:** smaller and less dominant than the current placeholder; visually balanced with the copy; **it must not appear as a large block beneath the intro on mobile**; the image stays within its container at every width.
- **Verification:** `npm run verify`; Preview at 360 / 768 / 1440.
- **Status:** BLOCKED

#### P4-03 — Portrait alt text and JSON-LD

- **Objective:** correct the accessibility and structured-data treatment.
- **Scope:** in — the `alt` decision and optionally `image` on the `Person` JSON-LD. Out — other JSON-LD fields.
- **Files:** `src/pages/index.astro`
- **Dependencies:** `P4-01`
- **Definition of Done:** the `alt` decision is recorded — recommended `alt=""`, since the name sits immediately adjacent and the image is decorative; if `image` is added to JSON-LD it resolves absolutely and the structured data stays valid.
- **Verification:** `npm run verify`; JSON-LD validation; screen-reader spot check.
- **Status:** BLOCKED

#### P4-04 — Resume asset

- **Objective:** publish the resume PDF.
- **Scope:** in — the asset and `siteConfig.resumePath`. Out — a `/resume/` route.
- **Files:** `public/`, `src/config/site.ts`
- **Dependencies:** the final Resume PDF, supplied by Ido
- **Definition of Done:** the PDF is served locally; `resumePath` is set; **the consistency gate is satisfied** — the PDF has been read and reconciled against `/experience/`, About's Professional Background and the Skill Map, with no contradiction.
- **Verification:** `npm run verify`; fetch the PDF from Preview.
- **Status:** BLOCKED — awaiting the Resume PDF

#### P4-05 — Verify Resume surfaces

- **Objective:** confirm the pre-built conditionals work with no template change.
- **Scope:** verification only.
- **Files:** none expected
- **Dependencies:** `P4-04`
- **Definition of Done:** Resume renders in primary navigation, the Hero CTA row and the footer, and resolves to the PDF in all three; **no template change was required** — if one is, that is a defect in the Phase 1 conditional and is reported.
- **Verification:** on Preview, click all three and confirm the PDF loads.
- **Status:** BLOCKED

#### P4-06 — SPEC alignment for Phase 4

- **Objective:** record the portrait and resume as delivered.
- **Scope:** in — `SPEC.md` §3.1 portrait and §5 resume. Out — other sections.
- **Files:** `SPEC.md`
- **Dependencies:** `P4-01` through `P4-05`
- **Definition of Done:** SPEC no longer describes a placeholder portrait or an absent resume.
- **Verification:** read `SPEC.md` §3.1 and §5 against the built site.
- **Status:** BLOCKED

---

### Phase 5 — Interaction & Social Polish

**Non-goals:** any JavaScript; loosening `script-src 'none'`; per-project OG images;
animation beyond the single approved treatment; redesigning the tools marquee.

#### P5-01 — Interaction options **[REVIEW GATE]**

- **Objective:** offer restrained CSS-only interaction options for selection.
- **Scope:** in — two or three written options, for example restrained hover states, section rhythm and visual transitions, or CSS-only emphasis. Out — implementing anything.
- **Files:** none (written proposal)
- **Dependencies:** none
- **Definition of Done:** options presented; each is CSS-only; each respects `prefers-reduced-motion`; none requires client-side JavaScript. **The gate stops for human selection.**
- **Verification:** human selects one option before `P5-02` begins.
- **Status:** TODO

#### P5-02 — Implement the approved interaction

- **Objective:** apply exactly the selected option.
- **Scope:** in — the approved treatment only. Out — anything not selected.
- **Files:** `src/styles/global.css`, page-scoped `<style>` blocks
- **Dependencies:** `P5-01`
- **Definition of Done:** CSS-only; `prefers-reduced-motion: reduce` honoured; `dist/` still contains no executable JavaScript; the CSP is unchanged.
- **Verification:** `npm run verify`; grep `dist/` for `<script` and confirm only the JSON-LD data block; reduced-motion test on Preview.
- **Status:** TODO

#### P5-03 — Favicon

- **Objective:** give the site a browser-tab identity.
- **Scope:** in — the asset and `<head>` wiring. Out — a web manifest.
- **Files:** `public/`, `src/layouts/BaseLayout.astro`
- **Dependencies:** none
- **Definition of Done:** the favicon is served locally and resolves under `img-src 'self'`; **no `site.webmanifest`** — it would require adding `manifest-src 'self'` to the CSP for no benefit on a five-page static site.
- **Verification:** `npm run verify`; confirm the icon loads on Preview with no CSP violation.
- **Status:** TODO

#### P5-04 — Default Open Graph image

- **Objective:** give every page a social preview image.
- **Scope:** in — the asset and a site-wide default for the existing `ogImage` prop. Out — per-project OG images.
- **Files:** `public/`, `src/layouts/BaseLayout.astro`
- **Dependencies:** none
- **Definition of Done:** `BaseLayout` already accepts `ogImage`, resolves it absolutely and switches `twitter:card` to `summary_large_image` when present — **only the default value is missing**; the image resolves absolutely from production; cards preview correctly in a validator.
- **Verification:** `npm run verify`; card validator against the Preview URL.
- **Status:** TODO

#### P5-05 — SPEC alignment for Phase 5

- **Objective:** record the interaction treatment and the now-existing OG image.
- **Scope:** in — `SPEC.md` §6 and §10.1. Out — other sections.
- **Files:** `SPEC.md`
- **Dependencies:** `P5-02`, `P5-04`
- **Definition of Done:** SPEC describes the permitted interaction and no longer describes the OG image as absent.
- **Verification:** read `SPEC.md` §6 and §10.1 against the built site.
- **Status:** TODO

---

### Phase 6 — Publication & Launch Closure

**Non-goals:** rendered site content changes; adding an analytics beacon; enabling
HSTS before its review is approved; pursuing preload; bundling anything else into
the HSTS PR.

**Ordering note.** `P6-01` through `P6-03` run early, in PR 1, because they fix
inaccuracies that are already live. `P6-04` through `P6-07` run in PR 9a.
`P6-08` runs alone in PR 9b. `P6-09` runs alone in PR 9c, **after** production
HSTS verification, because it closes out acceptance criteria that depend on the
HSTS outcome.

#### P6-01 — README truth-up

- **Objective:** stop the public README stating false deployment facts.
- **Scope:** in — the deployment status and security paragraphs. Out — adding setup or reproduction instructions, which `SPEC.md` §16 forbids.
- **Files:** `README.md`
- **Dependencies:** none
- **Definition of Done:** the custom domain is described as live; HSTS status is stated accurately; no installation, build or clone instructions are introduced.
- **Verification:** `npm run verify`; compare against a live `curl -I`.
- **Status:** DONE

#### P6-02 — Documentation truth-up

- **Objective:** correct the architecture and deployment documents.
- **Scope:** in — the CSP description, the Experience schema table, and the pending custom-domain sections. Out — restructuring the documents.
- **Files:** `docs/ARCHITECTURE.md`, `docs/DEPLOYMENT.md`
- **Dependencies:** none
- **Definition of Done:** `img-src 'self'` is documented, not `'none'`; the Experience schema table lists `startYear` and `endYear` as integers with `endYear` optional; the "Custom domain setup (pending)" section reflects that it was performed; post-launch verification is updated.
- **Verification:** `npm run verify`; diff the documented schema against `src/content.config.ts` and the documented CSP against `public/_headers`.
- **Status:** DONE

#### P6-03 — CI cleanup

- **Objective:** remove expired temporary workarounds.
- **Scope:** in — the external-link-check exclusion and the production summary text. Out — the workflow's structure, gates or deployment logic.
- **Files:** `.github/workflows/ci.yml`
- **Dependencies:** none
- **Definition of Done:** the `TEMPORARY` `--exclude '^https://idohail\.com/'` is removed so the site's own canonical and OG self-links are checked; the production job summary no longer claims no custom domain is attached; the external link check remains `continue-on-error` and best-effort.
- **Verification:** a CI run on the PR shows the external link check passing with the site's own links included.
- **Status:** DONE

#### P6-04 — Analytics decision

- **Objective:** decide whether analytics is pursued, and in what form.
- **Scope:** in — the decision and any `SPEC.md` note. Out — installing any beacon.
- **Files:** decision, plus a `SPEC.md` note if adopted
- **Dependencies:** none
- **Definition of Done:** the decision is recorded. **Preference:** Cloudflare's dashboard-side Worker and zone analytics, which needs no code, no beacon and no CSP change. Cloudflare **Web** Analytics injects a beacon script, which would break `script-src 'none'` and is an explicit `SPEC.md` §9 non-goal; adopting it would require an explicit SPEC exception and is not recommended.
- **Verification:** if dashboard-only, confirm `dist/` is unchanged and no CSP edit was needed.
- **Status:** TODO

#### P6-05 — Google Search Console

- **Objective:** register the production property and submit the sitemap.
- **Scope:** in — ownership verification and sitemap submission. Out — paid SEO services.
- **Files:** none (external, unless DNS-based verification is recorded)
- **Dependencies:** `P6-01` through `P6-03`
- **Definition of Done:** ownership is verified — DNS TXT preferred over an HTML file, since the latter adds a file to the deployed asset tree; `sitemap-index.xml` is submitted and accepted.
- **Verification:** Search Console reports the property verified and the sitemap read.
- **Status:** TODO

#### P6-06 — Sitemap and indexing audit

- **Objective:** confirm the production site is correctly discoverable.
- **Scope:** verification only.
- **Files:** none
- **Dependencies:** `P6-05`
- **Definition of Done:** `sitemap-index.xml` and `robots.txt` resolve from production; canonical URLs are correct on every route; production carries no `noindex`; `*.workers.dev` previews still do.
- **Verification:** fetch both files from production; `curl -I` a preview URL and confirm `X-Robots-Tag: noindex`.
- **Status:** TODO

#### P6-07 — Launch verification

- **Objective:** confirm accessibility, performance and layout before HSTS.
- **Scope:** in — automated and manual verification across page templates. Out — treating Lighthouse scores as hard gates.
- **Files:** none
- **Dependencies:** `P6-06`
- **Definition of Done:** an automated accessibility scan reports no critical violations on each representative template; keyboard-only navigation reaches and activates everything with visible focus; layout is verified at 360 / 768 / 1440 with no horizontal overflow; required security headers are confirmed present via `curl -I`; Lighthouse findings are recorded and actionable ones investigated.
- **Verification:** axe or Lighthouse per template; manual keyboard pass; `curl -I https://idohail.com/`.
- **Status:** TODO

#### P6-08 — HSTS enablement review **[REVIEW GATE]**

- **Objective:** decide the HSTS policy deliberately, then enable it.
- **Scope:** in — the review, then implementation of the approved decision. **This task ships in its own PR (9b) containing nothing else.** Out — enabling anything before the review is approved; bundling `P6-09` or any other task into the same PR.
- **Files:** determined by the review — `public/_headers` or Cloudflare zone configuration
- **Dependencies:** `P6-07`
- **Definition of Done:** **no HSTS policy is preselected by this plan — not the `max-age`, not `includeSubDomains`, not the implementation location.** The review must cover, in order:
  1. Fresh production HTTPS verification.
  2. A fresh inventory of all `idohail.com` subdomains.
  3. Verification of the `www` HTTPS redirect at that time.
  4. The exact `max-age` value.
  5. Whether `includeSubDomains` is appropriate, given (2).
  6. Whether `public/_headers` or Cloudflare zone configuration is the correct implementation source.
  7. Explicit review of rollback implications — a cached `max-age` cannot be withdrawn from clients that already received it, only lowered going forward.
  8. `preload` is **not** pursued unless separately and explicitly approved.

  Only after the review is approved is HSTS enabled.

- **Verification:** after enabling, `curl -I https://idohail.com/` shows the agreed header; the site continues to serve normally over HTTPS.
- **Status:** TODO

#### P6-09 — SPEC closeout

- **Objective:** close the remaining acceptance criteria once HSTS is verified in production.
- **Scope:** in — `SPEC.md` §15.3 and §17. **This task ships alone in PR 9c**, after production HSTS verification, because its content depends on the `P6-08` outcome and the HSTS PR must contain nothing but HSTS. Out — other sections.
- **Files:** `SPEC.md`
- **Dependencies:** `P6-08`, **including its production verification**
- **Definition of Done:** §15.3 reflects the HSTS decision as actually deployed and verified; §17 acceptance criteria accurately reflect the delivered system.
- **Verification:** read `SPEC.md` §17 item by item against production.
- **Status:** TODO

---

## 9. PR sequence

**12 planned PRs (PR 0 through PR 9c), with PR 7 potentially split into 7a/7b
depending on asset timing.**

Each PR has one coherent purpose, is independently reviewable, keeps production
healthy, receives Preview verification, stops for human review before merge, and
receives a short production verification after merge.

> **Logical labels, not GitHub numbers.**
> "PR 0", "PR 1", "PR 9b" and so on are **Final Polish sequence labels**, not
> literal GitHub pull-request numbers. The repository may already contain
> unrelated GitHub PRs, including Dependabot pull requests, so the numbering will
> not line up.
>
> Identify a Final Polish PR by its **task IDs**, **branch name**, **title** and
> **sequence label** — never by assuming that "PR 1" means GitHub pull request #1.

| PR     | Tasks                                          | Purpose                                                                                                                                                                                                                     | Blocked by                           |
| ------ | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| **0**  | `P0-01` through `P0-03`                        | Persist the plan; add the `CLAUDE.md` pointer, mirrored locally into the untracked `AGENTS.md`. Tracked diff is `docs/FINAL_POLISH_PLAN.md` and `CLAUDE.md` only. No rendered content, no SPEC behaviour, no skills change. | —                                    |
| **1**  | `P6-01` through `P6-03`                        | Documentation and CI truth-up. Fixes live inaccuracies; touches no rendered page.                                                                                                                                           | 0                                    |
| **2**  | `P1-00`, then `P1-01` through `P1-03`, `P1-12` | **Gated.** `P1-00` proposes Hero directions and stops. Then the identity layer: config, header, Hero, design-review skill, plus SPEC §1, §3.1 Hero and §3.2.                                                                | 1 plus human selection               |
| **3**  | `P1-04` through `P1-11`                        | Homepage body: remove two sections, reorder with Selected Work second, four capability groups, curated Skill Map with density review, marquee sync, metadata, SPEC.                                                         | 2                                    |
| **4**  | `P2-00` through `P2-08`                        | **Gated.** `P2-00` evidence preflight first. Then About rewrite, Professional Background, Experience tightening, SPEC §3.1.                                                                                                 | 3 plus consolidated evidence         |
| **5**  | `P3-01`, `P3-02`, part of `P3-08`              | Projects structure: `year` removal across schema, content and templates; index intro; SPEC §4.1.                                                                                                                            | 4                                    |
| **6**  | `P3-03` through `P3-07`, rest of `P3-08`       | Case-study editorial, sitewide em-dash and voice pass, SPEC editorial rules.                                                                                                                                                | 5                                    |
| **7**  | `P4-*`                                         | Portrait and Resume. Split into 7a/7b if the assets arrive separately; neither depends on the other.                                                                                                                        | assets                               |
| **8**  | `P5-*`                                         | **Gated.** `P5-01` options reviewed first. Then implementation, favicon, OG image, SPEC.                                                                                                                                    | 7 plus option selection              |
| **9a** | `P6-04` through `P6-07`                        | Launch closure before HSTS: analytics decision, Search Console, indexing audit, accessibility and responsive verification.                                                                                                  | 8                                    |
| **9b** | `P6-08` only                                   | **HSTS only**, after its review is approved. Nothing else in the PR.                                                                                                                                                        | 9a plus HSTS review approval         |
| **9c** | `P6-09` only                                   | Final SPEC and acceptance-criteria closeout, after production HSTS verification.                                                                                                                                            | 9b plus production HSTS verification |

### Why certain PRs are split

- **PR 0 comes first** because every later PR references stable task IDs. Without the plan in the repository, those IDs have no home and a session picking up mid-sequence has nothing authoritative to read.
- **PR 2 and PR 3** both rewrite `src/pages/index.astro`, the site's largest and most important file. One PR would be an effectively total rewrite; splitting identity from page body gives two reviewable diffs with a working, deployable site between them.
- **PR 5 and PR 6** separate a schema change that must fail `astro check` if done wrong from a large prose diff that would otherwise hide it.
- **PR 9b** isolates the one change whose effects cannot be fully withdrawn from clients that already received it. It contains HSTS and nothing else.
- **PR 9c is separate from 9b** because `P6-09` depends on `P6-08` **and on its production verification**. It cannot ship in the same PR as its own dependency, and the HSTS PR must stay single-purpose. Closing out the acceptance criteria before the header is verified in production would record an outcome that has not yet been observed.

### Per-PR ritual

1. Branch from `main`.
2. Implement one PR's scope, nothing else.
3. `npm run verify`.
4. Open the PR; CI `Validate` must pass.
5. Verify the Preview URL at 360 / 768 / 1440.
6. **Stop for human review.**
7. Squash-merge; production deploys automatically.
8. `curl -I https://idohail.com/` and spot-check the changed routes.
9. Update each task's `Status:` in this file **within the same PR** that changes it.

---

## 10. Deferred decisions

| Decision                                                                                                      | Marker                                                 |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Hero value-proposition wording — model approved, directions produced by `P1-00` and selected by a human       | DEFER TO PHASE 1                                       |
| Final curated public Skill Map contents, after the 360 / 768 / 1440 density review                            | DEFER TO PHASE 1                                       |
| Whether dbt and Kafka get logos in the marquee or render name-only, depending on redistributable assets       | DEFER TO PHASE 1                                       |
| Final About paragraph count, which proof point or points appear, and where the combat-commander sentence sits | DEFER TO PHASE 2 — needs `P2-00` evidence              |
| How aggressively each case study is cut; depth is preserved, volume is judged per section                     | DEFER TO PHASE 3                                       |
| Portrait crop, size and mobile placement                                                                      | DEFER TO PHASE 4 — needs the real image                |
| Resume filename, and whether Resume becomes the Hero's primary button                                         | DEFER TO PHASE 4 — needs the PDF                       |
| Which CSS-only interaction treatment is adopted                                                               | DEFER TO PHASE 5 — options at the `P5-01` gate         |
| Favicon and Open Graph image visual design                                                                    | DEFER TO PHASE 5                                       |
| Whether analytics is pursued at all, and in what form                                                         | DEFER TO PHASE 6 — preference recorded, not decided    |
| The entire HSTS policy — `max-age`, `includeSubDomains`, implementation location, preload                     | DEFER TO PHASE 6 — `P6-08` review, nothing preselected |

---

## 11. Risk controls

### SPEC conflicts to resolve as each phase lands

`SPEC.md` currently contradicts the approved direction in the places below. Each
is resolved **in the PR that changes the corresponding behaviour**, never before
or after — otherwise `SPEC.md` describes a site that does not exist.

| SPEC location  | Conflict                                                                                                                                       | Resolved by |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| §1             | Identity stated as "Technical Operations & Engineering"                                                                                        | `P1-11`     |
| §3.1 Hero      | Mandates `Technical Operations` positioning                                                                                                    | `P1-11`     |
| §3.1 Hero      | "No secondary GitHub/LinkedIn/Email link row in the Hero"                                                                                      | `P1-11`     |
| §3.1           | Requires "A few numbers" directly below the Hero                                                                                               | `P1-11`     |
| §3.1           | Requires "A bit about me"                                                                                                                      | `P1-11`     |
| §3.1           | Fixes three capability areas; forbids a fourth                                                                                                 | `P1-11`     |
| §3.1           | Places Selected Work fourth in the section order                                                                                               | `P1-11`     |
| §3.1 Skill Map | Mandates the Professional / Foundations split and the framing sentence                                                                         | `P1-11`     |
| §3.1 Skill Map | Names seven groups that do not survive the redesign                                                                                            | `P1-11`     |
| §3.2           | "`Home` is not a separate primary navigation item"                                                                                             | `P1-11`     |
| §6.2           | Enumerates a homepage section order that no longer exists                                                                                      | `P1-11`     |
| §3.1 `/about`  | Requires "What Technical Operations means in plain terms"; requires foundations identified as training; has no Professional Background section | `P2-08`     |
| §4.1           | Lists project `Date/year` metadata                                                                                                             | `P3-08`     |
| §14 (absent)   | No editorial or voice rules exist                                                                                                              | `P3-08`     |
| §9             | Lists Cloudflare Web Analytics as an explicit non-goal                                                                                         | `P6-04`     |
| §15.3, §17     | HSTS and acceptance criteria                                                                                                                   | `P6-09`     |

### Controls

| Risk                                                     | Control                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A session treats illustrative copy as approved           | No sample Hero prose exists in this document; `P1-00`'s output is human-selected; the Skill Map draft in §6 is explicitly a draft subject to the density review.                                                                                                                                                                                                                                                              |
| Skill Map becomes a keyword wall                         | The inventory (§5) is separated from the presentation (§6); curation rules are explicit; the 360 / 768 / 1440 density review is part of `P1-08`'s Definition of Done.                                                                                                                                                                                                                                                         |
| `SRE Practices` drifts into a role claim                 | §2 and §5 state the rule explicitly: capability keyword only, never a category, never a claimed role, never `SRE Engineer`, never job tenure. `P1-08` enforces that it appears only as a chip.                                                                                                                                                                                                                                |
| A future evidence audit silently re-adds Tableau         | The exclusion is recorded in §5 as a **user decision**, not as missing evidence.                                                                                                                                                                                                                                                                                                                                              |
| Useful CV experience is lost                             | `P2-00` reconciles against all historical CV variants and **blocks rather than inferring** when they are unavailable.                                                                                                                                                                                                                                                                                                         |
| About becomes a second resume                            | No role-bullet reproduction; one or two proof points permitted, never required.                                                                                                                                                                                                                                                                                                                                               |
| Resume contradicts the site                              | The `P4-04` consistency gate: read the PDF and reconcile against Experience, About and the Skill Map before publishing.                                                                                                                                                                                                                                                                                                       |
| CSP regression                                           | No phase changes the CSP. `public/_headers` is untouched until the `P6-08` decision. Any new asset type is checked against the served policy on Preview before merge.                                                                                                                                                                                                                                                         |
| Broken internal links from removed sections              | The blocking `lychee --offline` check in CI already covers this on every PR.                                                                                                                                                                                                                                                                                                                                                  |
| Documentation drifting again                             | PR 1 fixes the current drift; every later PR touching architecture updates the corresponding document in the same change.                                                                                                                                                                                                                                                                                                     |
| Agent instructions steering a future session wrong       | PR 0 adds the plan pointer; `P1-12` fixes the design-review skill. Both are mirrored.                                                                                                                                                                                                                                                                                                                                         |
| Tracked source and local mirror diverging                | The tracked repo change is `CLAUDE.md` and `.claude/**`; `AGENTS.md` and `.agents/**` are machine-local compatibility mirrors excluded via `.git/info/exclude` (§7). Keep the local mirror equivalent in the same change whenever it is present; never expect it in a PR or a fresh clone. Note `.prettierignore` excludes `CLAUDE.md` but not `AGENTS.md`, so a present `AGENTS.md` must stay Prettier-clean for local runs. |
| Homepage rewrite regressing accessibility                | Heading hierarchy, focus visibility and keyboard order are re-verified on Preview for PR 2 and PR 3, not deferred to `P6-07`.                                                                                                                                                                                                                                                                                                 |
| HSTS lockout                                             | Nothing preselected; the eight-point `P6-08` review first; its own single-purpose PR; no preload without separate approval.                                                                                                                                                                                                                                                                                                   |
| Closing out acceptance criteria on an unobserved outcome | `P6-09` ships in PR 9c, after production HSTS verification, never alongside `P6-08`.                                                                                                                                                                                                                                                                                                                                          |
| Confusing sequence labels with GitHub PR numbers         | §9 states the rule: identify Final Polish PRs by task IDs, branch, title and sequence label.                                                                                                                                                                                                                                                                                                                                  |
| Scope creep between phases                               | Each phase states explicit non-goals; each PR touches one coherent scope; deviations are reported rather than silently reconciled.                                                                                                                                                                                                                                                                                            |

---

## 12. Change log

| Date       | Change                                                                                                                                                                                                                                                                                                                                                                              |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-08-31 | Plan created and persisted (`P0-01` through `P0-03`). Baseline `10723c0f`. Approved structure: six phases, 12 planned PRs, four review gates (`P1-00`, `P2-00`, `P5-01`, `P6-08`). `P6-09` separated into PR 9c so it follows its `P6-08` dependency and keeps the HSTS PR single-purpose. `SRE Practices` added as a capability keyword under Production Reliability & Operations. |
