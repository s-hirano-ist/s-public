import BookStatCard from "@components/react/BookStatCard.tsx";
import Rating from "@components/react/Rating.tsx";
import books from "@content/book/data.gen.json";
import { useMemo, useState, type ChangeEvent, type MouseEvent } from "react";

export default function BookList() {
  const totalBooks = books.length;
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

  const handleFilterRating = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterRating(Number(e.target.value));
  };

  const handleTagClick = (e: MouseEvent<HTMLButtonElement>) => {
    const tag = e.currentTarget.innerHTML.slice(1); // delete "#" from tag button name
    if (tag === selectedTag) setSelectedTag(undefined);
    else setSelectedTag(tag);
  };

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
            className="card shadow-xl"
            href={book.href}
            target="_blank"
            key={book.title}>
            <figure>
              <img src={book.imageSrc} alt={book.title} />
            </figure>
            <div className="card-body h-96">
              <h2 className="card-title">{book.title}</h2>
              <p className="card-subtitle">{book.subTitle}</p>
              <div className="badge badge-primary">
                {book.authors.toString()}
              </div>
              <p className="overflow-y-hidden text-xs">{book.description}</p>
              <Rating rating={book.rating} />
              <div className="card-actions justify-end">
                {book.tags.map(tag => (
                  <div className="badge badge-outline" key={tag}>
                    #{tag}
                  </div>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
