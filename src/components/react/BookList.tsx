import Rating from "@components/react/Rating.tsx";
import books from "@content/book/data.gen.json";

export default function BookList() {
  return (
    <div className="grid px-4 pt-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
      {books.map(book => (
        <a className="card shadow-xl" href={book.href} target="_blank">
          <figure>
            <img src={book.imageSrc} alt={book.title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{book.title}</h2>
            <p className="card-subtitle">{book.subTitle}</p>
            <div className="badge badge-primary">{book.authors.toString()}</div>
            <p className="book-list-p">{book.description}</p>
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
  );
}
