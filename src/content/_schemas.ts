import { z } from "astro:content";

export const markdownSchema = z
  .object({
    heading: z.string(),
    draft: z.boolean(),
    description: z.string(),
  })
  .strict();

export type MarkdownFrontmatter = z.infer<typeof markdownSchema>;

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

export const bookSchema = z
  .object({
    body: z.array(
      z.object({
        title: z.string(),
        ISBN: z.string(),
        rating: z.number().int().min(1).max(5),
        tags: z.array(z.string()),
      }),
    ),
  })
  .strict();

export type BookFrontmatter = z.infer<typeof bookSchema>;
