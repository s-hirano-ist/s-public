import BookStatCard from "@components/react/BookStatCard.tsx";
import Rating from "@components/react/Rating.tsx";
import books from "@content/book/data.gen.json";
import { useMemo, useState, type ChangeEvent } from "react";

export default function BookList() {
  const totalBooks = books.length;
  const tags = [...new Set(books.map(book => book.tags).flat())];

  const [rating, setFilterRating] = useState<number>(0);
  const filteredBooks = useMemo(() => {
    return books.filter(book => rating <= book.rating);
  }, [books, rating]);

  const handleFilterRating = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterRating(Number(e.target.value));
  };
  return (
    <>
      <BookStatCard
        totalBooks={totalBooks}
        tags={tags}
        rating={rating}
        handleFilterRating={handleFilterRating}
      />
      <div className="grid gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map(book => (
          <a className="card shadow-xl" href={book.href} target="_blank">
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
                  <div className="badge badge-outline">#{tag}</div>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
