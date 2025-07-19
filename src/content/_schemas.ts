import { z } from "astro:content";

export const blogSchema = z
	.object({
		heading: z.string(),
		draft: z.boolean(),
		description: z.string(),
		date: z.date(),
	})
	.strict();

export type BlogFrontmatter = z.infer<typeof blogSchema>;
