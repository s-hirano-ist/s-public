import generateOgImage from "@utils/generateOgImage";
import slugify from "@utils/slugify";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const posts = await getCollection("summary", ({ data }) => !data.draft);
  return posts.map(post => ({
    params: { ogTitle: slugify(post.data) },
    props: { description: post.data.description },
  }));
}

export const GET: APIRoute = async ({ params, props }) =>
  new Response(await generateOgImage(params.ogTitle, props.description));
