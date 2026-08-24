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
    // Month-precision dates only — validated as literal YYYY-MM strings
    // rather than coerced JS Dates, since portfolio dates never need
    // day-level precision or timezone handling.
    startDate: z.string().regex(/^\d{4}-\d{2}$/),
    // Omitted endDate means the role is current/ongoing.
    endDate: z
      .string()
      .regex(/^\d{4}-\d{2}$/)
      .optional(),
    order: z.number().int().nonnegative(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, experience };
