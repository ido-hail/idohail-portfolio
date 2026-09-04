# Personal Engineering Portfolio — Specification

**Status:** Living document. This file is the source of truth for project scope, architecture, requirements, and acceptance criteria. Update it whenever a change materially alters any of those areas.

**Author:** Ido Hail

---

## 1. Goals

* Present a single, credible engineering identity spanning **Production & Reliability**, **DevOps & Infrastructure**, and **Data & Automation** — grounded in hands-on Technical Operations experience, which is the professional background the site is built on rather than a standalone title — to technical recruiters and hiring managers, rather than reading as several disconnected personas.

* Demonstrate — not just describe — good engineering practice. The repository, CI/CD pipeline, deployment model, security configuration, and documentation are themselves part of the portfolio.

* Keep the application itself deliberately simple: static, fast, maintainable, inexpensive to host, and appropriate to its actual workload.

* Demonstrate sound technical judgment by avoiding unnecessary infrastructure, frameworks, runtime services, and operational complexity.

* Support occasional long-term maintenance such as adding a project, updating a role, or replacing the resume without requiring architectural changes.

---

## 2. Target Audience

* Technical recruiters and hiring managers screening for DevOps, Technical Operations, DataOps, cloud/infrastructure, and SRE-adjacent positions.

* Assume some visitors will inspect the GitHub repository, CI workflows, architecture documentation, and deployment configuration in addition to the rendered website.

* Assume limited time per visit. Primary content must be easily scannable, while technical depth is available through dedicated project pages.

---

## 3. Functional Requirements

### 3.1 Site Structure

The website is a statically generated multi-page site.

#### `/` — Home

A concise portfolio landing page. Content here is a teaser toward the dedicated routes below — it must not reproduce the resume or duplicate the depth found on `/projects/`, `/experience/`, or `/about/`.

Contains, in order:

* **Hero**

  * Name
  * Capability/domain line: "Production & Reliability · DevOps & Infrastructure · Data & Automation" — deliberately not a job title.
  * Short value proposition: a single sentence that leads with hands-on breadth across production systems, infrastructure and data, and names Technical Operations as one capability within that breadth rather than as the identity under the name. It must not narrate how the work is done.
  * CTAs: View Projects (primary) and Experience (secondary) while no resume asset is configured; once `resumePath` is set, Resume becomes the primary CTA with View Projects and Experience remaining reachable. No dedicated `/resume/` route.
  * Compact plain-text LinkedIn/GitHub/Email links in the Hero, visually distinct from the CTA row. No icons and no icon dependency; accessible names come from the visible link text.
  * A portrait image, presented as a 4:5 rounded frame alongside the text on wide viewports and after the CTAs on narrow ones. A neutral local placeholder is acceptable during development; the real portrait must be in place before public launch on the custom domain.

  The capability line is deliberately a set of professional domains rather than a single job title. Data is significant technical depth but must not dominate the profile, and DevOps/cloud/infrastructure capability is evidenced through projects rather than presented as professional tenure.

* **Featured Projects**

  * Placed directly after the Hero — the first evidence section, before any capability-card section, so the reader reaches proof before a second round of claims.
  * Prominent, visually weighted featured-project presentation.
  * Intended layout: one prominent featured project plus one or more smaller secondary featured projects, degrading cleanly by the number of featured entries.
  * Driven by the Projects content collection's `Featured status` and ordering metadata (§4.1).
  * Projects should emphasize problem/outcome before technology.
  * Cards are text-only; project diagrams and screenshots belong inside the individual case studies.
  * No introductory paragraph announcing or explaining how many projects are featured, and no per-card label restating that a card is featured; the heading and cards speak for themselves.

* **What I work on**

  * Four concise capability groups, presented as capabilities rather than separate job personas:

    * Production & Reliability
    * DevOps, Cloud & Infrastructure
    * Automation & Data Systems
    * Integrations, Tooling & Ownership

  * Written conversationally rather than as role definitions, and kept to one or two sentences each — a scan surface, not a role description.
  * The DevOps, Cloud & Infrastructure area must keep its project-backed distinction explicit.
  * No group is named after a job title.
  * Responsive grid: one column by default, two columns at `sm`, four columns at `lg`.

* **Skill Map**

  * Exists because a deliberately targeted CV cannot show the full supported technical range. Its purpose is breadth without exaggeration.
  * A curated public presentation derived from the internal evidence inventory (`docs/FINAL_POLISH_PLAN.md` §5) — not a dump of it. Low-value implementation detail stays in the case studies and Experience entries rather than becoming a chip.
  * Seven evidence-based families: Production Reliability & Operations; DevOps, Cloud & Infrastructure; Data Engineering & Platforms; Programming & Automation; APIs, Integrations & Internal Tooling; Systems, Identity & Networking; Security, QA & Compliance.
  * Compact chips grouped under named domains — never progress bars, percentages, stars, years-per-skill, or beginner/intermediate/expert labels.
  * No coursework/project/professional labels and no framing sentence establishing an evidence hierarchy; a skill is presented simply as a skill.
  * No group is named after a job title, and no `SRE` group exists. `SRE Practices` may appear only as a chip inside Production Reliability & Operations — never as a group, a claimed role, or job tenure.
  * `CCNA` appears as a bare keyword, never `CCNA Certified` and never qualified as coursework or fundamentals.
  * Tableau does not appear; its exclusion is a deliberate positioning decision, not a gap in evidence (see `docs/FINAL_POLISH_PLAN.md` §5).
  * Group sizes follow the evidence, not visual symmetry. Chip counts are checked against a visual-density review at representative widths so no family reads as a keyword wall.

* **Tools I work with**

  * A curated visual subset of the Skill Map, not a second copy of it.
  * First-person framing. It must never read as "Trusted by" or otherwise imply vendor endorsement.
  * Logo assets are local; no remote logo URLs at runtime and no icon package dependency. Where no redistributable vendor asset is available, the item renders as its name alone rather than an improvised mark.
  * Motion is CSS-only — no carousel dependency and no JavaScript. A duplicated track makes the loop seamless, and the duplicate is hidden from assistive technology.
  * The section must never introduce document-level horizontal scrolling.
  * `prefers-reduced-motion: reduce` must produce a genuinely static, fully visible wrapped layout — not a frozen strip that leaves most items clipped out of view.
  * Because the motion runs continuously, a keyboard-operable pause/resume control is required. Hover may also pause, but hover must never be the only mechanism.

* **Contact / CTA**

  * A distinct closing call-to-action (e.g. "Get in touch"), not a duplicate of the Footer's link list.
  * Neutral and confident — no availability or job-search language.

No contact form is required.

#### `/experience`

Professional work history containing:

* Role
* Company
* Dates
* Short description
* Responsibilities
* Measurable impact where available
* Relevant technologies where useful

The page should prioritize outcomes and technical responsibility over generic job descriptions.

#### `/projects`

A grid or structured list of project cards.

Each card contains:

* Title
* Short description
* Relevant technology tags
* GitHub link when available
* Live/demo link when applicable
* Link to the dedicated project page

#### `/projects/[slug]`

A statically generated page for each project.

Project pages may contain:

* Problem / Goal
* Context
* Architecture
* Technical approach
* Stack
* Key engineering decisions
* Challenges
* Outcome
* Screenshots or architecture diagrams where useful
* GitHub repository
* Live deployment where applicable

**Visual evidence**

A case study may carry a small number of figures. They are evidence, not decoration — there are no project galleries, and a figure that would not change what a reader understands does not belong.

* Every figure must be factual and source-backed: either an artifact produced by the project itself, or a diagram that accurately reflects what the repository actually implements. Do not fabricate runtime output, dashboards, pipeline runs or scan results.
* Assets are stored and served locally under `public/projects/<project>/`; never hotlink from the source repositories.
* Any reused SVG must be checked for scripts, event handlers, `foreignObject`, remote references and embedded external resources before being committed, and served through `<img>` rather than inlined.
* Each figure needs a meaningful caption explaining why the reader is looking at it, plus alt text describing what it shows. The two serve different purposes and should not be copies of each other.
* Prose keeps its normal reading measure; figures may use a wider measure within the case-study container. Figures must never introduce horizontal scrolling.
* Where a diagram's labels are too small to read comfortably on a narrow viewport, link the figure to the full-size local asset. Do not add a JavaScript lightbox.

The portfolio website itself must appear as one project with a complete case study covering:

* Architecture
* Static-site decision
* CI
* Preview environments
* Production deployment
* Cloudflare
* Security headers
* Dependency maintenance
* Technical trade-offs

#### `/about`

A compact factual profile, not a narrative and not a second copy of the résumé. `/experience/` remains the formal record, so this page must not repeat role bullets or restate the measured outcomes; those live on `/experience/`. Deliberately kept short.

There is no opening or lead paragraph. The page begins at its first section heading.

Contains, in order:

* **Professional background** - the two roles, most recent first, matching the order `/experience/` renders them. Each carries its years and exactly one factual scope line. Employment dates and ordering are permitted here specifically, because they are what communicates progression; transition prose, career narrative and role bullets are not. No inline link to `/experience/` is required, since it is in the primary navigation on every page.
* **Cloud and infrastructure** - a single line naming the capability and labelling its evidence as project-backed. No explanatory prose, and no wording that could imply professional cloud, DevOps or SRE employment tenure.
* **Professional training** - programs of study as metadata only: program name, institution, years and hours. No subject-coverage description.

No personal or hobby section. No military service anywhere on the site.

The full grouped capability inventory lives in the homepage Skill Map (§3.1) rather than being duplicated here.

**Evidence accuracy**

The site's structure already separates evidence: Experience is professional work, Projects are hands-on engineering projects, and study is study. Skills are never publicly categorised by evidence type (§3.1). `/about/` carries a structured `Professional training` section, but it lists programs as factual metadata only - it must never grade a capability, imply a credential, or be used to qualify any skill named elsewhere on the site.

Completed coursework must not be presented as formal certification. Items such as the CCNA or MCSA curricula, the See Security College program and the 2026 DevSecOps program are programs of study, not earned certifications, and there is no Certifications section. Cloud and DevOps capability must never be presented as professional tenure that was not held.

### 3.2 Navigation

Persistent top-level navigation:

* Projects
* Experience
* About
* Resume

`Home` is not a separate primary navigation item — the site wordmark link, reading "Home", links to `/` and is the sole home link. It is not duplicated as a `nav` list item, and it receives `aria-current="page"` when the current route is the homepage.

`Resume` links directly to the resume PDF asset (§5); it is not a page route, and it is omitted from navigation while no resume asset is configured.

`Contact` is not a primary navigation item. Contact links appear in the homepage's closing Contact/CTA section and persist in the Footer.

A footer repeats the key external/contact links.

Navigation must work with both pointer and keyboard input.

---

## 4. Content Model

### 4.1 Content Collections

Projects and experience entries use **Astro Content Collections**.

Content is authored primarily using Markdown.

MDX may only be introduced when a specific entry genuinely requires embedded UI components that Markdown cannot reasonably support.

Each collection uses a minimal validation schema.

Schemas must contain only fields actually consumed by the application.

Typical project metadata may include:

* Title
* Description
* Technology tags
* GitHub URL
* Live URL
* Featured status
* Ordering metadata

The project collection deliberately carries no date or year field. Projects are presented by curated ordering rather than chronologically, and project years are not rendered on `/projects/` or on the individual case studies, so the schema holds only fields the site actually consumes (§4.2).

`Featured status` and ordering metadata are what will drive the homepage's Featured Projects section (§3.1) once this collection exists.

The file name / entry ID should be used as the route identifier unless a separate custom slug provides a concrete benefit.

Typical experience metadata may include:

* Company
* Role
* Start year
* End year (omitted for a current role)
* Ordering metadata
* Technology tags where useful

Employment dates are published at year precision. The schema stores years as integers rather than a more precise value the site would immediately discard when rendering, and month-level dates are deliberately not published.

Schemas should use Astro's supported Zod integration and provide compile-time/type-checking support.

### 4.2 Maintainability Requirement

Adding a normal project must require only:

1. Adding one Markdown content entry.
2. Adding referenced assets if needed.

No component, route, or template modification should be required for the common case.

The same principle applies to experience entries.

---

## 5. Resume

A current resume PDF is stored as a static site asset and linked from the Hero, primary navigation, and Footer.

The resume link is a direct link to the PDF asset — there is no dedicated `/resume/` route.

The resume is maintained manually.

There is no resume-generation pipeline.

The resume link must remain easy to find and work without JavaScript. Where the resume asset is not yet configured, the link must not be rendered rather than pointing to a broken or placeholder URL.

---

## 6. Visual & UX Requirements

* Inspired by the visual simplicity and layout rhythm of `RyanFitzgerald/devportfolio`, while remaining an original implementation.

* Do not copy its source code, markup, styles, branding, or assets.

* Neutral, professional **light theme only**, on a **warm off-white base** with white/light surfaces, deep warm-neutral text, understated neutral borders, and a single restrained blue accent.

* No dark-mode implementation.

* A **very subtle local background grain texture** is permitted on the page base, provided it is felt rather than read as a pattern and never reduces readability. It must be a small local asset, applied as a non-interactive fixed overlay with no layout impact. If the tile becomes recognizable as a repeating pattern, reduce its opacity or remove it.

* Clean, technical, and content-first.

* Generous whitespace.

* Strong typography hierarchy.

* Minimal visual decoration.

* No animation-heavy, "hacker terminal", parallax, or gimmicky interface. A single restrained, slow-moving tool strip is the one permitted motion (§3.1); it must honour `prefers-reduced-motion` with a static fully-visible layout and provide a keyboard-operable pause control.

* Avoid visual choices whose primary purpose is demonstrating frontend complexity.

* Restrained cards, subtle section backgrounds, and one subtle accent color are permitted only where they improve hierarchy and scannability — not as decoration for its own sake.

* Explicitly avoid: card-heavy UI, skill-level progress bars, decorative dashboards, gradients or illustrations without informational value, and visual complexity whose main purpose is demonstrating frontend skill rather than serving the content. The background grain permitted above is the single deliberate exception, and it carries no informational role beyond making the page feel considered.

### 6.1 Responsive Design

The website must work correctly from small mobile widths through large desktop displays.

Requirements:

* No unintended horizontal scrolling.
* No clipped text.
* No overlapping content.
* Navigation remains usable on mobile.
* Project cards adapt appropriately to available width.
* Images remain within their containers.

Representative verification widths:

* ~360px
* ~768px
* ~1440px

These are verification points, not hard-coded breakpoints.

### 6.2 Homepage Presentation

The homepage must not render as a repeated sequence of identical heading-divider-paragraph sections. Presentation should match each section's content type:

* Hero — strong typography and whitespace: name, then the capability line, then the short value proposition.
* Featured Projects — the first evidence section after the Hero, given real visual weight; may use a wider canvas than the surrounding prose sections.
* What I work on — a restrained capability presentation, one column by default, two at `sm`, four at `lg`.
* Skill Map — grouped chips across a responsive multi-column grid, scannable rather than dense.
* Tools I work with — a restrained moving logo strip, understated enough that it never becomes the visual focus of the page.
* Contact CTA — a distinct closing block.

Project-oriented sections may use a wider layout, but prose line length must remain readable, constrained independently of the outer container width.

---

## 7. Accessibility

Target: **WCAG 2.2 AA** where applicable.

Requirements include:

* Appropriate color contrast.
* Fully keyboard-operable navigation.
* Visible focus indicators.
* Semantic HTML.
* Correct landmark use:

  * `header`
  * `nav`
  * `main`
  * `footer`
* Logical heading hierarchy.
* One clear page-level `h1` by project convention.
* Meaningful `alt` text for informative images.
* Decorative images must not produce unnecessary screen-reader content.
* Accessible names for links and controls.
* Avoid interaction patterns requiring JavaScript when normal HTML semantics are sufficient.

Accessibility is verified manually and with an automated scanner before launch, but is not initially implemented as a blocking CI quality gate.

---

## 8. Technical Architecture

### 8.1 Application

* **Framework:** Astro
* **Rendering:** Static generation only
* **Language:** TypeScript
* **Styling:** Tailwind CSS 4, via the `@tailwindcss/vite` integration
* **Content:** Astro Content Collections
* **Package manager:** npm

Build/URL conventions: `build.format` is `directory` and `trailingSlash` is `always`. `build.inlineStylesheets` is `never`, so styles are served as linked stylesheets rather than inlined — supporting the strict CSP required by §15.2.

No SSR.

No server islands.

No API routes.

No runtime Worker application code unless a future requirement provides a concrete justification.

### 8.2 Toolchain Reproducibility

Use **Node.js 24 LTS** for the project. The supported Node version is restricted to the Node 24 major (e.g. `>=24.0.0 <25.0.0` in `package.json` `engines`).

The supported Node version must be pinned using an appropriate repository-level mechanism such as:

* `.nvmrc`
* `.node-version`

`package.json` should also declare the supported Node version where appropriate.

`package-lock.json` must be committed.

CI uses:

```bash
npm ci
```

rather than dependency resolution through `npm install`.

### 8.3 Assets

Static assets may include:

* Resume
* Portrait image
* Background texture
* Tool logos
* Project screenshots
* Architecture diagrams
* Favicons
* Open Graph image

All image assets are served locally from the site's own origin. Do not reference remotely hosted images.

Use Astro's image tooling where it provides a concrete optimization benefit.

Prefer system fonts or self-hosted fonts.

Avoid unnecessary third-party runtime requests.

### 8.4 Runtime Model

The production website should consist entirely of static assets.

No:

* Backend
* Database
* Runtime API
* Authentication
* User accounts
* CMS
* Runtime edge function
* Contact service

A Worker runtime must not be introduced merely to make the project appear more complex.

### 8.5 Hosting

Hosting platform:

**Cloudflare Workers Static Assets**

Deployment tooling:

**Wrangler**

Static output generated by Astro is deployed as the Worker's asset directory.

### 8.6 Source Control

Repository hosted on GitHub.

Workflow:

```text
short-lived feature branch
        ↓
pull request
        ↓
CI
        ↓
preview deployment
        ↓
review
        ↓
merge to main
        ↓
production deployment
```

`main` should remain deployable.

Avoid long-lived feature branches.

---

## 9. Explicit Non-Goals / Out of Scope

The initial version does **not** include:

* Blog
* Articles
* Publishing engine
* CMS
* Admin interface
* Analytics
* Visitor tracking
* Google Analytics
* Cloudflare Web Analytics
* Tracking pixels
* Internationalization
* Multiple languages
* Contact form
* Third-party form provider
* Authentication
* Database
* Backend API
* SSR
* Server islands
* Runtime edge functions
* E2E/browser automation suite such as Playwright
* Kubernetes
* Docker-based hosting
* Terraform solely for this website
* Additional frontend frameworks such as React unless a future requirement justifies them

These features may be reconsidered later if a real requirement appears.

---

## 10. SEO Requirements

The objective is strong technical SEO for a personal professional website without paid advertising.

### 10.1 Page Metadata

Every indexable page must contain:

* Unique `<title>`
* Unique meta description
* Canonical URL
* Open Graph metadata
* Twitter/X card metadata

A site-wide default Open Graph image is required.

Per-project OG images are optional.

### 10.2 Search Engine Discovery

Provide:

* `sitemap-index.xml` (with generated chunk file(s))
* `robots.txt`
* Canonical URLs

`robots.txt` must permit indexing of the production website and reference the production sitemap.

### 10.3 Structured Data

Homepage includes valid `schema.org/Person` JSON-LD representing the site owner.

Where appropriate it should associate:

* Name
* Website
* GitHub
* LinkedIn

Only factual information present on the site should be represented.

### 10.4 Preview Indexing

Cloudflare PR preview URLs must **not** be indexed by search engines.

Preview responses should use an appropriate:

```text
X-Robots-Tag: noindex
```

or equivalent mechanism.

Only the canonical production domain should be intended for indexing.

### 10.5 Post-Launch Search Setup

After the production custom domain is live:

* Verify ownership in Google Search Console.
* Submit the production sitemap.
* Confirm the important production pages are discoverable/indexable.

Search Console setup is an operational launch step, not an application runtime dependency.

No paid SEO service is required.

---

## 11. CI Requirements

CI runs on:

* Pull requests targeting `main`
* Relevant pushes to `main`

All required PR checks must pass before merge.

### 11.1 Required Checks

#### Lint / Code Quality

Use one documented linting toolchain compatible with Astro and TypeScript.

The implementation plan must choose the smallest appropriate maintained toolchain.

#### Format Check

Formatting must be deterministic and checked by CI.

CI must check formatting rather than silently modifying files.

#### Type / Astro Validation

Run Astro and TypeScript validation sufficient to catch component/content typing errors.

#### Production Build

The complete static production build must succeed.

#### Link Integrity

Check generated site content for broken internal links.

Broken internal links are blocking failures.

External links may be checked separately or best-effort, but temporary failures from GitHub, LinkedIn, or other third-party services must not make the CI pipeline unreliable.

### 11.2 Initial CI Non-Goals

The initial CI pipeline does not require:

* Lighthouse CI
* axe CI
* Playwright
* Browser E2E tests

These may be added later only if their maintenance cost becomes justified.

---

## 12. Continuous Deployment

### 12.1 Pull Request Preview

After required CI validation succeeds, each pull request should receive a live Cloudflare preview deployment.

The intended model is:

```text
PR
 ↓
CI
 ↓
Astro production build
 ↓
Wrangler version upload
 ↓
Cloudflare Preview URL
```

The implementation should use the current supported Workers Preview URL mechanism rather than production deployment for PR builds.

Preview versions must not receive production traffic.

Preview URLs should remain separate from the production custom domain.

### 12.2 Production

A merge to `main` triggers:

```text
checkout
 ↓
npm ci
 ↓
validation/build
 ↓
wrangler deployment
 ↓
Cloudflare production
```

No additional manual approval is required for the initial project.

The successful PR review + merge serves as the human promotion decision.

### 12.3 Failure Behavior

* Failed CI must prevent preview deployment.
* Failed build must prevent deployment.
* Failed production deployment must cause the GitHub Actions workflow to fail visibly.
* A failed deployment must not modify the source repository automatically.

---

## 13. Dependency Maintenance

Use **GitHub Dependabot**.

Do not add Renovate in addition to Dependabot.

Dependabot should check:

* npm dependencies
* GitHub Actions dependencies

Default cadence:

**Weekly**

Dependency update pull requests go through the same CI validation as normal changes.

Avoid unnecessary high-volume automated PR generation.

---

## 14. Deployment Requirements

### 14.1 Cloudflare

The site is deployed through Cloudflare Workers Static Assets.

Wrangler configuration is committed to the repository.

The deployment remains static-only.

### 14.2 Preview URLs

Worker Preview URLs must be explicitly supported by configuration.

Configuration should avoid relying unnecessarily on version-specific defaults.

### 14.3 Custom Domain

Production is served through a custom domain.

The production custom domain must be managed through Cloudflare DNS / Cloudflare-managed nameservers as required by Workers custom domains.

Choose one canonical hostname.

If both apex and `www` hostnames are configured, one should redirect consistently to the canonical hostname.

### 14.4 TLS

Production must use HTTPS.

Cloudflare provides TLS termination.

There must be no intentional HTTP-only production path.

### 14.5 Domain Provisioning

Domain/DNS attachment may be a documented one-time infrastructure setup if managing it through the application deployment pipeline would require unnecessary permissions or complexity.

The application deployment workflow should not receive DNS-management permissions unless they are genuinely required.

---

## 15. Security Requirements

### 15.1 Security Headers

Static responses must receive appropriate security headers.

Implement these using Cloudflare Workers Static Assets `_headers` support where possible.

Do **not** introduce a Worker runtime solely to add response headers.

Baseline headers:

* `Content-Security-Policy`
* `X-Content-Type-Options: nosniff`
* `Referrer-Policy`
* `Strict-Transport-Security`
* `Permissions-Policy`
* Clickjacking protection through CSP `frame-ancestors` and/or `X-Frame-Options`

### 15.2 CSP

CSP must be derived from the actual built site rather than copied from a generic template.

Prefer a restrictive policy.

Do not introduce `'unsafe-inline'` or broad third-party origins unless the application demonstrably requires them.

The final CSP must be validated against:

* Site navigation
* Styles
* Astro-generated assets
* Images
* Fonts
* JSON-LD
* Open Graph-related assets

### 15.3 HSTS

HSTS should only be enabled after the production custom domain is confirmed to work correctly over HTTPS.

Do not enable HSTS preload by default.

Preload requires a separate deliberate decision.

### 15.4 Secrets

Never commit:

* Cloudflare API tokens
* Credentials
* Private keys
* Deployment secrets

Deployment secrets live in GitHub Actions encrypted secrets or an appropriate GitHub environment.

If a secret is ever exposed, it must be treated as compromised and rotated.

### 15.5 GitHub Actions Permissions

GitHub Actions workflows should declare only the permissions they require.

Avoid broad write permissions.

### 15.6 Cloudflare API Token

Use an API token, not a Global API Key.

The token must:

* Use the minimum permissions required by the actual Wrangler deployment.
* Be limited to the intended Cloudflare account where Cloudflare supports that resource scope.
* Avoid unrelated DNS, account-management, storage, or administration permissions.

Do **not** claim that the deployment token is restricted to a single Worker if Cloudflare's permission model does not provide that scope.

### 15.7 Dependency Security

Dependabot alerts and update PRs provide the initial dependency-maintenance mechanism.

No additional SCA/security-scanning platform is required for v1.

---

## 16. Documentation Requirements

The repository must contain:

### `README.md`

Public entry point for the repository. This repository is published as
part of a personal engineering portfolio, for recruiters, hiring
managers, and engineers to inspect the architecture, implementation
quality, and engineering decisions — not as an open-source project, a
reusable template, or a repository a third party is expected to run a
copy of. `README.md` is a concise technical overview, not a setup guide.

Include:

* What the project is
* Deployment status, stated truthfully (do not describe a domain as
  live before it is attached and verified)
* Architecture summary
* Technology stack
* Engineering approach summary
* CI/CD architecture summary
* Security posture summary
* Important repository structure
* Links to `docs/ARCHITECTURE.md` and `docs/DEPLOYMENT.md`
* Copyright / proprietary status

Do not include:

* Installation or local environment setup instructions
* Development, build, or validation commands (e.g. `npm ci`,
  `npm run dev`, `npm run build`, `npm run verify`)
* Clone or reproduction instructions
* "How to add a project" / "how to add an experience entry" content
  workflow instructions

These commands remain valid internal engineering commands, defined in
`package.json` and exercised by CI (§8.2, §11) — `README.md` simply does
not teach a third party how to reproduce the project locally.

### `SPEC.md`

This document.

Keep it at the repository root as the project's implementation source of truth.

Update it only when requirements, architecture, scope, or acceptance criteria materially change.

Do not turn it into a development diary.

### `docs/ARCHITECTURE.md`

Explain the architecture and its rationale — not a tutorial for cloning
or operating another copy of the site:

* Repository structure
* Application architecture
* Why Astro
* Why static generation
* Why Content Collections
* Why Cloudflare Workers Static Assets
* Why there is no backend
* CI/CD architecture
* Preview/Production deployment model
* Important trade-offs

It may describe how content is modeled internally (e.g. Content
Collection schemas) as part of explaining the application architecture.
It is not a guide for provisioning or operating another copy of the
site.

Keep it concise and technically meaningful.

### `docs/DEPLOYMENT.md`

Explain the architecture and operational behavior of this project's own
deployment system, for an authorized maintainer with the required
Cloudflare/GitHub access — not a general guide for provisioning or
recreating this project in another account:

* Cloudflare prerequisites
* Required GitHub secrets (names, not values)
* CI flow
* Preview flow
* Production deployment
* Custom-domain setup
* Security-header deployment
* Production verification
* Rollback/recovery procedure

### `LICENSE`

Proprietary, all-rights-reserved notice. Public visibility of this
repository is for portfolio review and reference only and must not be
described as permission to reuse, copy, modify, or redistribute the
source code.

### Not Required

Do **not** create `CONTRIBUTING.md` for v1.

This is a personal portfolio repository and does not currently require a separate contributor workflow.

---

## 17. Acceptance Criteria

The initial production release is complete when all of the following are true:

1. All required routes exist and render correctly.

2. The website contains real portfolio content rather than lorem ipsum or fabricated experience.

3. At least one professional experience entry is implemented.

4. At least two meaningful project entries exist, including the portfolio website itself.

5. Adding a normal project requires only adding its Markdown content entry and associated assets.

6. Adding a normal experience entry requires only adding its Markdown content entry.

7. Required lint, format, type/Astro validation, production build, and internal link checks complete successfully.

8. Production build output contains no analytics, tracking, third-party form service, or other prohibited runtime dependency.

9. Automated accessibility analysis run manually before launch reports no critical accessibility violations.

10. Keyboard-only navigation can reach and activate all interactive elements with clearly visible focus.

11. Layout is manually verified at representative mobile, tablet, and desktop widths.

12. There is no unintended horizontal overflow.

13. `sitemap-index.xml` resolves from production.

14. `robots.txt` resolves from production and references the correct production domain/sitemap.

15. Per-page title, description, canonical URL, Open Graph metadata, and Twitter/X metadata are present.

16. Homepage contains valid `Person` JSON-LD.

17. Preview deployments are marked not for indexing.

18. A pull request triggers all required CI checks.

19. Successful CI produces a functioning Cloudflare Preview URL.

20. Merging an approved PR into `main` triggers production deployment automatically.

21. Production runs on the custom domain over valid HTTPS.

22. Required security headers are present on production responses.

23. Dependabot configuration is active.

24. `README.md`, `LICENSE`, `SPEC.md`, `docs/ARCHITECTURE.md`, and `docs/DEPLOYMENT.md` exist and accurately reflect the implemented system.

25. An authorized maintainer with the required Cloudflare/GitHub access can understand the production deployment procedure from documentation alone.

### Lighthouse

Before launch, Lighthouse may be used manually to identify:

* Performance issues
* SEO issues
* Accessibility issues
* Best-practice issues

Lighthouse scores should be recorded and reviewed, but arbitrary score thresholds are **not** hard release gates for v1.

Critical/actionable findings should be investigated rather than optimizing solely for the score.

---

## 18. End-to-End Verification

Run before initial launch and after material architecture/deployment changes.

### 18.1 Local Build Verification

Performed by the developer during development and after material
architecture/deployment changes. This is an internal engineering check,
not a public reproduction workflow — it is not documented in
`README.md` as a setup guide.

From a clean checkout:

```bash
npm ci
npm run dev
```

Then run the validation and production-build commands defined in
`package.json` (`npm run verify`).

Confirm no undocumented local dependency is required.

### 18.2 Content Addition

Add a temporary project Markdown file.

Verify:

* It appears on `/projects`.
* Its dedicated page is generated.
* No application code changes are necessary.

Remove the test entry afterward.

Repeat the principle for experience content if needed.

### 18.3 CI Validation

Create a temporary pull request.

Verify:

* Lint runs.
* Format check runs.
* Astro/TypeScript validation runs.
* Production build runs.
* Internal link check runs.
* All required checks report clearly in GitHub.

### 18.4 Negative Link Test

Temporarily introduce a broken internal link.

Confirm the link-integrity check fails.

Revert the change.

This proves the gate is effective rather than a no-op.

### 18.5 Preview Deployment

From a pull request with passing CI:

* Confirm a Cloudflare preview version is created.
* Confirm the preview URL resolves.
* Confirm the preview contains the PR changes.
* Confirm it does not modify production.
* Confirm preview responses discourage search indexing.

### 18.6 Production Deployment

Merge a verified PR to `main`.

Confirm:

* Production workflow starts automatically.
* Build succeeds.
* Wrangler deployment succeeds.
* Production domain serves the new version.

### 18.7 Security Headers

Run:

```bash
curl -I https://<production-domain>
```

Verify the required headers from §15 are present.

Confirm the final CSP does not break normal site functionality.

### 18.8 HTTPS

Verify:

* Production certificate is valid.
* Canonical production URL uses HTTPS.
* No primary navigation links intentionally downgrade to HTTP.

### 18.9 Accessibility

Run an automated scanner such as axe or Lighthouse against each representative page template.

Manually verify:

* Keyboard navigation
* Focus visibility
* Heading hierarchy
* Link labels
* Image alternatives
* Responsive navigation

### 18.10 Responsive Layout

Verify each page type at approximately:

* 360px
* 768px
* 1440px

Also resize between these widths to identify breakpoint-specific defects.

### 18.11 SEO

From production:

* Fetch `/sitemap-index.xml`.
* Fetch `/robots.txt`.
* Verify canonical URLs.
* Verify Open Graph metadata.
* Verify `Person` JSON-LD.
* Confirm preview URLs are not intended for indexing.

After launch:

* Verify the domain in Google Search Console.
* Submit the sitemap.
* Confirm Google can crawl the relevant production pages.

### 18.12 Resume

Verify the resume link from:

* Hero
* Primary navigation
* Footer

Confirm it resolves to the current PDF, and confirm the link (and the primary navigation entry) do not render while no resume asset is configured.

---

## 19. Engineering Principles

When implementation choices are ambiguous, prefer the solution that is:

1. Simpler.
2. Static rather than runtime-dependent.
3. Easier to understand from the repository.
4. Easier to validate automatically.
5. Easier to maintain.
6. Lower cost.
7. Based on maintained and documented tooling.
8. Appropriate to the actual workload.

Do not add a technology solely because it would look impressive on a technology list.

Every meaningful dependency or infrastructure component should have a clear reason to exist.

---

## 20. Editorial Requirements

These rules apply to all published copy: rendered page text, content Markdown, project titles and descriptions, page `<title>` values, meta and social descriptions, `alt` text and figure captions. They do not apply to source-code comments, which are not published.

### 20.1 Punctuation

The em dash (`—`) must not appear in published copy. Use ordinary punctuation or a standard hyphen instead.

Date ranges are written with a spaced standard hyphen: `2023 - 2024`.

A production build must contain no em dash. `grep -r "—" dist/` returning no matches is the authoritative check.

### 20.2 Voice

Published copy is written to read as a person wrote it: concise, factual, technical, specific and confident. It is not marketing copy.

The following are not acceptable in published copy:

* Vague abstractions in place of concrete detail.
* Repetitive rhetorical contrasts, including repeated "this is not X, it is Y" constructions.
* Generic motivational or promotional language.
* Self-conscious commentary about the portfolio or about the writing itself.
* Over-explaining an engineering decision whose reason is already stated.
* Repeating an explanation that a nearby heading, title or description already carries.

### 20.3 Factual preservation

Editorial work may change wording only. It must not introduce a new factual claim, strengthen an existing one, add or remove a tool, metric, outcome or trade-off, or alter stated ownership of work that originates elsewhere.

Where a project is built on software authored by someone else, the published copy must state that boundary explicitly and keep it stated after any rewrite.

Where published prose disagrees with the repository, the prose is corrected to match the repository.

### 20.4 Case-study depth

Project case studies are the site's primary technical evidence. Editorial tightening targets repetition and filler, never depth: architecture decisions, trade-offs, validation results and ownership boundaries are retained.

A case study must not be reduced to a summary card, and word count is not a target in its own right.
