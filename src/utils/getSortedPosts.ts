import type { CollectionEntry } from "astro:content";

const getSortedPosts = (posts: CollectionEntry<"summary">[]) =>
  posts.filter(({ data }) => !data.draft);

export default getSortedPosts;
