import { MAX_RATING } from "@config";

type Props = {
  rating: number;
};

export default function Rating({ rating }: Props) {
  if (!Number.isInteger(rating) || rating < 0 || MAX_RATING < rating)
    throw new Error(`Rating must be an integer & between 0 and ${MAX_RATING}`);

  return (
    <div className="rating">
      {[...Array(MAX_RATING).keys()].map(int => {
        return int === rating - 1 ? (
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star"
            checked
          />
        ) : (
          <input type="radio" name="rating-1" className="mask mask-star" />
        );
      })}
    </div>
  );
}
