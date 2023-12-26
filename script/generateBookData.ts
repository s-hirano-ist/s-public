import { writeFileSync } from "fs";
import { books as googleBooksApis } from "@googleapis/books";
import { _books } from "../src/content/book/_original.ts";
import { MAX_RATING } from "../src/config.ts";
import {
  appropriateRating,
  appropriateIsbn,
  isbnDuplication,
  sleep,
} from "./utils.ts";

const FILE_PATH = "src/content/book/data.gen.json";
const NO_IMAGE_SRC = "https://s-hirano.com/defaultOgImage.jpg";
const NOT_FOUND_HREF = "https://s-hirano.com/404";

const api = googleBooksApis({
  version: "v1",
});

type BookType = {
  title: string;
  subTitle: string;
  authors: string[];
  description: string;
  tags: string[];
  imageSrc: string;
  href: string;
  rating: number;
}[];

console.log("Start fetching book data from Google Books APIs...");
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
        `Rating must be an integer & between 0 and ${MAX_RATING}`,
      );
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
        book.data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail ?? NO_IMAGE_SRC,
      href: book.data.items?.[0]?.volumeInfo?.infoLink ?? NOT_FOUND_HREF,
      rating: _book.rating,
    });
    if (book.status !== 200) throw new Error("Status code not 200");
    console.log("status of", _book.title, ": ", book.status);
  }

  writeFileSync(FILE_PATH, JSON.stringify(books));
} catch (error) {
  console.error(error);
}
console.log("Finish fetching book data from Google Books APIs!");
