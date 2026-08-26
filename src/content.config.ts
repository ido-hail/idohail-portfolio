import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.number().int(),
    tags: z.array(z.string()).default([]),
    githubUrl: z.url().optional(),
    liveUrl: z.url().optional(),
    featured: z.boolean().default(false),
    order: z.number().int().nonnegative(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    // Year precision only. Employment dates are published as years, so
    // the schema stores exactly that rather than a more precise value
    // the site would immediately discard when rendering.
    startYear: z.number().int(),
    // Omitted endYear means the role is current/ongoing.
    endYear: z.number().int().optional(),
    order: z.number().int().nonnegative(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, experience };
