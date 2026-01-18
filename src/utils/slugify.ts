import type { CollectionEntry } from "astro:content";
import slug from "slug";

const slugify = (post: CollectionEntry<"blog">["data"]) => slug(post.heading);

export default slugify;
