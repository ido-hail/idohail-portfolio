# Personal Engineering Portfolio — Specification

**Status:** Living document. This file is the source of truth for project scope, architecture, requirements, and acceptance criteria. Update it whenever a change materially alters any of those areas.

**Author:** Ido Hail

---

## 1. Goals

* Present a single, credible engineering identity — **Technical Operations & Engineering**, spanning DevOps/cloud/platform work, Data Operations/Data Engineering, and technical leadership — to technical recruiters and hiring managers, rather than reading as three disconnected personas.

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
  * Primary positioning: "Technical Operations"
  * Supporting focus: "Production Systems · Reliability & Automation · Cloud Infrastructure · Data & Integrations"
  * Short 1–2 sentence value proposition
  * CTAs: View Projects, Experience, Resume (Resume CTA only when the resume asset is available)
  * A portrait image, presented as a 4:5 rounded frame alongside the text on wide viewports and after the CTAs on narrow ones. A neutral local placeholder is acceptable during development; the real portrait must be in place before public launch on the custom domain.
  * No secondary GitHub/LinkedIn/Email link row in the Hero — those live in the Footer.

  The positioning is deliberately a professional domain rather than a single job title, and the focus ordering is intentional: production first, then reliability/automation, then cloud, then data/integrations. Data is significant technical depth but must not lead the profile, and cloud/DevOps capability is evidenced through projects rather than presented as professional tenure.

* **A few numbers**

  * A small number of measurable, evidence-based career outcomes, each carrying a short micro-label so the figure is identifiable before its sentence is read.
  * Compact, evidence-oriented presentation rather than a resume-style bullet list, and never dashboard-like.
  * Must not contain invented or unverified metrics.
  * Placed directly below the Hero, so the positioning claim is supported by evidence before the reader reaches the capability and project sections.

* **What I work on**

  * Three concise capability areas, presented as capabilities rather than separate job personas:

    * Production & Reliability
    * Automation & Data Systems
    * Cloud & Infrastructure

  * Written conversationally rather than as role definitions.
  * The Cloud & Infrastructure area must keep its project-backed distinction explicit.
  * Leadership is a differentiator expressed through the homepage About teaser, the About page and Experience entries — it must not become a fourth capability area.

* **Selected Work**

  * Prominent, visually weighted featured-project presentation.
  * Intended layout: one prominent featured project plus one or more smaller secondary featured projects, degrading cleanly by the number of featured entries.
  * Driven by the Projects content collection's `Featured status` and ordering metadata (§4.1).
  * Projects should emphasize problem/outcome before technology.
  * Cards are text-only; project diagrams and screenshots belong inside the individual case studies.

* **Skill Map**

  * Exists because a deliberately targeted CV cannot show the full supported technical range. Its purpose is breadth without exaggeration.
  * Seven evidence-based groups: Production & Reliability; Data & Automation; Cloud & Infrastructure; Observability & Delivery; APIs & Integrations; Systems, Identity & Networking; Engineering Tooling & Web.
  * Compact chips grouped under named domains — never progress bars, percentages, stars, years-per-skill, or beginner/intermediate/expert labels.
  * A single framing sentence establishes the evidence hierarchy: professional experience concentrated in production operations, data, automation and integrations; deeper cloud, infrastructure and engineering tooling from hands-on projects.
  * Systems, Identity & Networking must keep professional identity/access work visually distinct from training foundations. That distinction is understated but unambiguous, and training is never presented as professional tenure.
  * No group is named after a job title, and no `SRE` group exists.
  * Group sizes follow the evidence, not visual symmetry.

* **A bit about me**

  * Short, human teaser that adds personality rather than restating Experience.
  * Prose rather than a card, so it reads as a pause in the page.
  * Links to `/about/` for the full story.

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

The professional story, told as a narrative rather than as a second copy of the résumé. `/experience/` remains the formal record, so this page must not repeat role bullets, employment dates, employer chronology or metrics.

It should explain why the progression makes sense, covering:

* What Technical Operations means in plain terms
* The move from investigating problems to preventing them
* The kinds of problems the work centres on
* A hands-on working style, including leadership that stayed technical
* The cloud and infrastructure expansion, evidenced through projects
* Systems, networking and security foundations, identified as training
* A short personal closing section

A brief personal section (e.g. "Outside the terminal") is permitted and encouraged, kept to a few sentences. It must avoid family, relationship, location and other sensitive detail, and must not stretch hobbies into professional analogies.

The full grouped capability inventory lives in the homepage Skill Map (§3.1) rather than being duplicated here.

**Evidence accuracy**

The site's structure already separates evidence: Experience is professional work, Projects are hands-on engineering projects, and training is training. Do not attach repetitive source disclaimers to every group; clarify the source only where ambiguity would otherwise overclaim.

Completed coursework must not be presented as formal certification. Items such as the CCNA or MCSA curricula are training programs, not earned certifications, and there is no Certifications section.

### 3.2 Navigation

Persistent top-level navigation:

* Projects
* Experience
* About
* Resume

`Home` is not a separate primary navigation item — the site name/logo links to `/`.

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
* Date/year
* Technology tags
* GitHub URL
* Live URL
* Featured status
* Ordering metadata

`Featured status` and ordering metadata are what will drive the homepage's Selected Work section (§3.1) once this collection exists.

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

* Hero — strong typography and whitespace, with the human introduction reading before the capability line.
* A few numbers — compact, evidence-oriented statistic tiles.
* What I work on — a restrained three-column capability presentation.
* Selected Work — project-oriented visual hierarchy, given real visual weight; may use a wider canvas than the surrounding prose sections.
* Skill Map — grouped chips across a responsive multi-column grid, scannable rather than dense.
* A bit about me — short prose, deliberately not a card.
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
