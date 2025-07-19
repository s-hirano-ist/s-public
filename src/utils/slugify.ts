import type { BlogFrontmatter } from "schemas";
import { slug as slugger } from "github-slugger";

const slugify = (post: BlogFrontmatter) => slugger(post.heading);

export default slugify;
