import slug from "slug";
import type { BlogFrontmatter } from "schemas";

const slugify = (post: BlogFrontmatter) => slug(post.heading);

export default slugify;
