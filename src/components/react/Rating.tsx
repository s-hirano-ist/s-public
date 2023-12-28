import { MAX_RATING } from "@config";

type Props = {
  rating: number;
  index: string;
};

export default function Rating({ rating, index }: Props) {
  if (!Number.isInteger(rating) || rating < 1 || MAX_RATING < rating)
    throw new Error(`Rating must be an integer & between 0 and ${MAX_RATING}`);

  return (
    <div className="rating">
      {[...Array(MAX_RATING).keys()].map(int => {
        return int === rating - 1 ? (
          <input
            type="radio"
            name={`rating-${index}`}
            className="mask mask-star bg-warning"
            checked
            disabled
            key={int}
          />
        ) : (
          <input
            type="radio"
            name={`rating-${index}`}
            className="mask mask-star bg-warning"
            disabled
            key={int}
          />
        );
      })}
    </div>
  );
}
