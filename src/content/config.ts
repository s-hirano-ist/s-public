import { defineCollection } from "astro:content";
import { jsonSchema, markdownSchema } from "@content/_schemas";

const summaryCollection = defineCollection({
  type: "content",
  schema: markdownSchema,
});

const newsCollection = defineCollection({
  type: "data",
  schema: jsonSchema,
});

export const collections = { summary: summaryCollection, news: newsCollection };
