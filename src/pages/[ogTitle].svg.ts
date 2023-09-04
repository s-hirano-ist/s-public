import { getCollection } from "astro:content";
import generateOgImage from "@utils/generateOgImage";
import type { APIRoute } from "astro";

export async function getStaticPaths() {
  const posts = await getCollection("summary", ({ data }) => !data.draft);
  return posts.map(post => ({
    params: { ogTitle: post.slug },
    props: { title: post.data.title, description: post.data.description },
  }));
}

export const get: APIRoute = async ({ params, props }) => ({
  body: await generateOgImage(props.title, props.description),
});
