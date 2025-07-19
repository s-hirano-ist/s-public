import type { BlogFrontmatter } from "@content/_schemas";
import { slug as slugger } from "github-slugger";

const slugify = (post: BlogFrontmatter) => slugger(post.heading);

export default slugify;
