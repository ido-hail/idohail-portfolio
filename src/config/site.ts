/**
 * Central, typed site configuration.
 *
 * This is the single source of truth for repeated site-level facts
 * (identity, external links, primary navigation). Components and pages
 * should read from here rather than hard-coding these values locally.
 *
 * `linkedinUrl`, `email`, and `resumePath` are `null` because the real
 * values have not been supplied yet. Consumers must render these links
 * conditionally rather than inventing placeholder URLs/addresses.
 *
 * `nav` holds internal navigation only (Projects/Experience/About).
 * Resume is intentionally not a nav entry — it links directly to a PDF
 * asset rather than an internal route, and must not appear at all while
 * `resumePath` is null. Consumers render it as a separate, conditional
 * element alongside `nav` (see SiteHeader).
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
  /**
   * Canonical production site URL.
   * Must match the `site` value in astro.config.mjs.
   */
  readonly siteUrl: string;
  readonly githubUrl: string;
  /** LinkedIn URL — `null` until the real value is supplied. */
  readonly linkedinUrl: string | null;
  /** Contact email — `null` until the real value is supplied. */
  readonly email: string | null;
  /** Path to the resume asset, relative to the site root — `null` until the asset exists. */
  readonly resumePath: string | null;
  /** Internal navigation (Projects/Experience/About), in display order. */
  readonly nav: readonly NavItem[];
}

export const siteConfig: SiteConfig = {
  name: "Ido Hail",
  positioning: "Technical Operations & Engineering",
  focus: "DevOps · Data Systems · Automation · Technical Leadership",
  siteUrl: "https://idohail.com",
  githubUrl: "https://github.com/ido-hail",
  linkedinUrl: null,
  email: null,
  resumePath: null,
  nav: [
    { label: "Projects", href: "/projects/" },
    { label: "Experience", href: "/experience/" },
    { label: "About", href: "/about/" },
  ],
};
