import { getCollection } from "astro:content";
import generateOgImage from "@utils/generateOgImage";
import type { APIRoute } from "astro";

export const get: APIRoute = async ({ params }) => ({
  body: await generateOgImage(params.ogTitle),
});

export async function getStaticPaths() {
  const postImportResult = await getCollection(
    "summary",
    ({ data }) => !data.draft,
  );
  const posts = Object.values(postImportResult);
  return posts.map(({ data }) => ({
    params: { ogTitle: data.title },
  }));
}
