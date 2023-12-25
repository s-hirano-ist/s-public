import { newsSchema, markdownSchema } from "@content/_schemas";
import { defineCollection } from "astro:content";

const summaryCollection = defineCollection({
  type: "content",
  schema: markdownSchema,
});

const newsCollection = defineCollection({
  type: "data",
  schema: newsSchema,
});

export const collections = {
  summary: summaryCollection,
  news: newsCollection,
};
