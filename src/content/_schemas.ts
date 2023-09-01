import { z } from "astro:content";

export const markdownSchema = z
  .object({
    title: z.string(),
    draft: z.boolean(),
    description: z.string(),
  })
  .strict();

export type MarkdownFrontmatter = z.infer<typeof markdownSchema>;

export const jsonSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    body: z.array(
      z.object({
        title: z.string(),
        query: z.string().optional(),
        url: z.string().url(),
      }),
    ),
  })
  .strict();

export type JsonFrontmatter = z.infer<typeof jsonSchema>;
