import { slug as slugger } from "github-slugger";
import type { BlogFrontmatter } from "@content/_schemas";

const slugify = (post: BlogFrontmatter) => slugger(post.title);

export default slugify;
