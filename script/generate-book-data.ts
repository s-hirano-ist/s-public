import { writeFileSync } from "node:fs";
import { books as googleBooksApis } from "@googleapis/books";
import { _books } from "../src/data/book/_original.ts";
import {
  appropriateIsbn,
  appropriateRating,
  isbnDuplication,
  sleep,
} from "./utils.ts";

try {
  process.loadEnvFile(".env.local");
} catch {
  // .env.local が存在しない場合は無視（CI等では環境変数を直接設定）
}

const MAX_RATING = 5;
const FILE_PATH = "src/data/book/data.gen.json";
const NO_IMG_SRC = "https://s-hirano.com/notFound.png";
const NOT_FOUND_HREF = "https://s-hirano.com/404";

const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_BOOKS_API_KEY is not set");
}

const api = googleBooksApis({
  version: "v1",
  auth: apiKey,
});

type BookType = {
  googleAuthors: string[];
  googleDescription: string;

  googleHref: string;
  googleImgSrc: string;
  googleSubtitle: string;
  googleTitle: string;
  ISBN: string;
  rating: number;

  tags: string[];
  title: string;
}[];

console.log("Started fetching book data from Google Books APIs...");
try {
  const books: BookType = [];

  if (isbnDuplication(_books.body.map(_book => _book.ISBN))) {
    throw new Error("Duplicated book registered");
  }

  for (const _book of _books.body) {
    if (!appropriateIsbn(_book.ISBN))
      throw new Error("ISBN must be a string & length of 13");

    if (!appropriateRating(_book.rating, MAX_RATING))
      throw new Error(
        `Rating must be an integer & between 1 and ${MAX_RATING}`,
      );
    const book = await api.volumes.list({ q: `isbn:${_book.ISBN}` });
    // do not run parallel due to access limit to Google Books APIs
    // only 100 access per one minute is allowed

    await sleep(600);

    const httpsImgSrc = (
      book.data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail ?? NO_IMG_SRC
    ).replace("http://", "https://");

    const httpsHref = (
      book.data.items?.[0]?.volumeInfo?.infoLink ?? NOT_FOUND_HREF
    ).replace("http://", "https://");

    books.push({
      ISBN: _book.ISBN,
      title: _book.title,

      googleTitle: book.data.items?.[0]?.volumeInfo?.title ?? _book.title,
      googleSubtitle: book.data.items?.[0]?.volumeInfo?.subtitle ?? "",
      googleAuthors: book.data.items?.[0]?.volumeInfo?.authors ?? [],
      googleDescription:
        book.data.items?.[0]?.volumeInfo?.description ?? "No description",
      googleImgSrc: httpsImgSrc,
      googleHref: httpsHref,

      tags: _book.tags,
      rating: _book.rating,
    });
    if (book.status !== 200) throw new Error("Status code not 200");
    console.log("status of", _book.title, ": ", book.status);
  }

  books.sort((a, b) => a.ISBN.localeCompare(b.ISBN));
  writeFileSync(FILE_PATH, JSON.stringify(books));
} catch (error) {
  console.error(error);
  process.exit(1);
}
console.log("Finished fetching book data from Google Books APIs!");
