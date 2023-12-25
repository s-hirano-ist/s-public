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
