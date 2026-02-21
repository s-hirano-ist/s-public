import { Card, CardContent, CardFooter, Badge } from "@s-hirano-ist/s-ui";
import {
  useMemo,
  useState,
  useEffect,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import BookStatCard from "@components/react/BookStatCard.tsx";
import Rating from "@components/react/Rating.tsx";
import books from "data/book/data.gen.json";

export default function BookList() {
  const tags = [...new Set(books.map(book => book.tags).flat())];

  const [rating, setFilterRating] = useState<number>(0);
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  const filteredBooks = useMemo(() => {
    const ratingFilteredBooks = books.filter(book => rating <= book.rating);
    if (selectedTag === undefined) return ratingFilteredBooks;
    const tagRatingFilteredBooks = ratingFilteredBooks.filter(
      book => book.tags.find(tag => tag === selectedTag) !== undefined,
    );

    return tagRatingFilteredBooks;
  }, [books, rating, selectedTag]);

  const totalBooks = filteredBooks.length;

  const handleFilterRating = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterRating(Number(e.target.value));
  };

  const handleTagClick = (e: MouseEvent<HTMLButtonElement>) => {
    const searchParams = new URLSearchParams(window.location.search);
    const tag = e.currentTarget.innerHTML.slice(1); // delete "#" from tag button name
    if (tag === selectedTag) {
      setSelectedTag(undefined);
      history.replaceState(null, "", window.location.pathname);
    } else {
      setSelectedTag(tag);
      searchParams.set("tag", tag);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.replaceState(null, "", newRelativePathQuery);
    }
  };

  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("tag");
    if (searchStr) setSelectedTag(searchStr);
  }, []);

  return (
    <>
      <BookStatCard
        totalBooks={totalBooks}
        tags={tags}
        rating={rating}
        selectedTag={selectedTag}
        handleFilterRating={handleFilterRating}
        handleTagClick={handleTagClick}
      />
      <div className="grid gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map(book => (
          <a
            href={book.googleHref}
            target="_blank"
            key={book.title}
            className="block">
            <Card className="overflow-hidden shadow-xl">
              <figure className="flex h-48 items-center justify-center overflow-hidden">
                <img
                  src={book.googleImgSrc}
                  alt={book.title}
                  decoding="async"
                  loading="lazy"
                />
              </figure>
              <CardContent className="h-96 p-4">
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <p className="text-muted-foreground h-12 grow-0 text-sm">
                  {book.googleSubtitle}
                </p>
                <Badge>{book.googleAuthors.toString()}</Badge>
                <p className="text-muted-foreground overflow-y-hidden text-xs">
                  {book.googleDescription}
                </p>
                <Rating rating={book.rating} />
                <CardFooter className="justify-end gap-1 p-0 pt-2">
                  {book.tags.map(tag => (
                    <Badge variant="outline" key={tag}>
                      #{tag}
                    </Badge>
                  ))}
                </CardFooter>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </>
  );
}
