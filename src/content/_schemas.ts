import { z } from "astro:content";

export const summarySchema = z
  .object({
    heading: z.string(),
    draft: z.boolean(),
    description: z.string(),
  })
  .strict();

export type SummaryFrontmatter = z.infer<typeof summarySchema>;

export const newsSchema = z
  .object({
    heading: z.string(),
    description: z.string(),
    body: z.array(
      z.object({
        title: z.string(),
        quote: z.string().optional(),
        url: z.string().url(),
      }),
    ),
  })
  .strict();

export type NewsFrontmatter = z.infer<typeof newsSchema>;

export const blogSchema = z
  .object({
    heading: z.string(),
    draft: z.boolean(),
    description: z.string(),
    date: z.date(),
  })
  .strict();

export type BlogFrontmatter = z.infer<typeof blogSchema>;
