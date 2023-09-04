import { getCollection } from "astro:content";
import generateOgImage from "@utils/generateOgImage";
import type { APIRoute } from "astro";
import slugify from "@utils/slugify";

export async function getStaticPaths() {
  const posts = await getCollection("news");
  return posts.map(post => ({
    params: { ogTitle: slugify(post.data) },
    props: { description: post.data.description },
  }));
}

export const get: APIRoute = async ({ params, props }) => ({
  body: await generateOgImage(params.ogTitle, props.description),
});
