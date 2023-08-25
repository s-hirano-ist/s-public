import type { CollectionEntry } from "astro:content";

const getSortedPosts = (posts: CollectionEntry<"news" | "summary">[]) =>
  posts.filter(({ data }) => !data.draft);

export default getSortedPosts;
