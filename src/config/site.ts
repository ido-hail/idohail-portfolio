/**
 * Central, typed site configuration.
 *
 * This is the single source of truth for repeated site-level facts
 * (identity, external links, primary navigation). Components and pages
 * should read from here rather than hard-coding these values locally.
 *
 * `resumePath` is `null` because the resume asset does not exist yet.
 * Consumers must render that link conditionally rather than inventing a
 * placeholder URL. `linkedinUrl` and `email` are nullable for the same
 * reason and remain conditionally rendered, even though both now hold
 * real values.
 *
 * `nav` holds internal navigation only (Projects/Experience/About).
 * Resume is intentionally not a nav entry — it links directly to a PDF
 * asset rather than an internal route, and must not appear at all while
 * `resumePath` is null. Consumers render it as a separate, conditional
 * element alongside `nav` (see SiteHeader).
 *
 * There is no `siteUrl` field here: the canonical production origin
 * lives in exactly one place, `astro.config.mjs`'s `site` value, read at
 * render time via `Astro.site`. This avoids keeping two copies in sync.
 */

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface SiteConfig {
  /** Display name of the site owner. */
  readonly name: string;
  /** Primary professional positioning, shown large in the Hero. */
  readonly positioning: string;
  /** Supporting focus areas, shown as a secondary line under the positioning. */
  readonly focus: string;
  readonly githubUrl: string;
  /** LinkedIn URL — nullable so consumers keep rendering it conditionally. */
  readonly linkedinUrl: string | null;
  /** Contact email — nullable so consumers keep rendering it conditionally. */
  readonly email: string | null;
  /** Path to the resume asset, relative to the site root — `null` until the asset exists. */
  readonly resumePath: string | null;
  /** Internal navigation (Projects/Experience/About), in display order. */
  readonly nav: readonly NavItem[];
}

export const siteConfig: SiteConfig = {
  name: "Ido Hail",
  positioning: "Technical Operations",
  focus:
    "Production Systems · Reliability & Automation · Cloud Infrastructure · Data & Integrations",
  githubUrl: "https://github.com/ido-hail",
  linkedinUrl: "https://www.linkedin.com/in/ido-hail/",
  email: "ido16h@gmail.com",
  resumePath: null,
  nav: [
    { label: "Projects", href: "/projects/" },
    { label: "Experience", href: "/experience/" },
    { label: "About", href: "/about/" },
  ],
};
