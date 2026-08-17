import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@s-hirano-ist/s-ui";
import { useMemo, useState, useEffect, type ChangeEvent } from "react";
import BookStatCard from "@components/react/BookStatCard.tsx";
import Rating from "@components/react/Rating.tsx";
import books from "@data/book/data.gen.json";

export default function BookList() {
  const tags = [...new Set(books.flatMap(book => book.tags))];

  const [rating, setFilterRating] = useState<number>(0);
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  const filteredBooks = useMemo(() => {
    const ratingFilteredBooks = books.filter(book => rating <= book.rating);
    if (selectedTag === undefined) return ratingFilteredBooks;
    const tagRatingFilteredBooks = ratingFilteredBooks.filter(
      book => book.tags.find(tag => tag === selectedTag) !== undefined,
    );

    return tagRatingFilteredBooks;
  }, [rating, selectedTag]);

  const totalBooks = filteredBooks.length;

  const handleFilterRating = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterRating(Number(e.target.value));
  };

  const handleTagClick = (tag: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (tag === selectedTag) {
      setSelectedTag(undefined);
      history.replaceState(null, "", window.location.pathname);
    } else {
      setSelectedTag(tag);
      searchParams.set("tag", tag);
      const newRelativePathQuery = `${window.location.pathname}?${searchParams.toString()}`;
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
      <div className="grid gap-5 pt-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {filteredBooks.map(book => (
          <a
            href={book.googleHref}
            target="_blank"
            key={book.title}
            className="group block h-full rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            rel="noopener">
            <Card className="flex h-full flex-col overflow-hidden border border-border shadow-sm transition duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/30 group-hover:shadow-md">
              <figure className="flex h-56 items-center justify-center overflow-hidden border-b border-border bg-muted/30 p-5 sm:h-60">
                <img
                  src={book.googleImgSrc}
                  alt={book.title}
                  decoding="async"
                  loading="lazy"
                  className="h-full w-auto max-w-full object-contain shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </figure>
              <CardHeader className="space-y-2 p-4 pb-3 sm:p-5 sm:pb-3">
                <CardTitle className="line-clamp-2 text-base leading-6">
                  {book.title}
                </CardTitle>
                {book.googleSubtitle && (
                  <CardDescription className="line-clamp-2 min-h-10 text-sm leading-5">
                    {book.googleSubtitle}
                  </CardDescription>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {book.googleAuthors.map(author => (
                    <Badge key={author}>{author}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4 px-4 pb-3 sm:px-5">
                <p className="line-clamp-4 text-xs leading-5 text-muted-foreground">
                  {book.googleDescription}
                </p>
                <div
                  className="mt-auto"
                  role="img"
                  aria-label={`評価 ${book.rating}`}>
                  <Rating rating={book.rating} />
                </div>
              </CardContent>
              <CardFooter className="flex-wrap justify-start gap-1.5 px-4 pt-0 pb-4 sm:px-5 sm:pb-5">
                {book.tags.map(tag => (
                  <Badge variant="outline" key={tag}>
                    #{tag}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </>
  );
}
