import { slug as slugger } from "github-slugger";
import type { BlogFrontmatter } from "@content/_schemas";

const slugify = (post: BlogFrontmatter) =>
  post.postSlug ? slugger(post.postSlug) : slugger(post.title);

export default slugify;
