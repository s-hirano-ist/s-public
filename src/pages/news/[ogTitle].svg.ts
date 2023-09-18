import generateOgImage from "@utils/generateOgImage";
import slugify from "@utils/slugify";
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const posts = await getCollection("news");
  return posts.map(post => ({
    params: { ogTitle: slugify(post.data) },
    props: { description: post.data.description },
  }));
}

export const GET = async ({
  params,
  props,
}: {
  params: Record<string, string>;
  props: { description: string };
}) => {
  return new Response(await generateOgImage(params.ogTitle, props.description));
};
