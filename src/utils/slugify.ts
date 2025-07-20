import type { BlogFrontmatter } from "schemas";
import slug from "slug";

const slugify = (post: BlogFrontmatter) => slug(post.heading);

export default slugify;
