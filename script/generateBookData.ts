import { writeFileSync } from "fs";
import { books as googleBooksApis } from "@googleapis/books";
// eslint-disable-next-line no-restricted-imports
import { _books } from "../src/content/book/_original.ts";

const FILE_PATH = "src/content/book/data.gen.json";
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const api = googleBooksApis({
  version: "v1",
});

console.log("Start fetching book data from Google Books APIs...");
try {
  const books = [];
  for (const _book of _books.body) {
    const book = await api.volumes.list({ q: `isbn:${_book.ISBN}` });
    // MEMO: do not run parallelly due to access limit to Google Books APIs
    // only 100 access per one minute is allowed
    await sleep(600);
    books.push({
      title: book.data.items?.[0]?.volumeInfo?.title ?? _book.title,
      subTitle: book.data.items?.[0]?.volumeInfo?.subtitle ?? "",
      authors: book.data.items?.[0]?.volumeInfo?.authors ?? [],
      description:
        book.data.items?.[0]?.volumeInfo?.description ?? "No description",
      tags: _book.tags,
      imageSrc:
        book.data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail ??
        "https://s-hirano.com/defaultOgImage.jpg",
      href:
        book.data.items?.[0]?.volumeInfo?.infoLink ??
        "https://s-hirano.com/404",
      rating: _book.rating,
    });
    if (book.status !== 200) throw new Error("Status code not 200");
    console.log("status of", _book.title, ": ", book.status);
  }

  writeFileSync(FILE_PATH, JSON.stringify({ body: books }));
} catch (error) {
  console.error(error);
}
console.log("Finish fetching book data from Google Books APIs!");
