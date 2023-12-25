type Props = {
  rating: number;
};

export default function Rating({ rating }: Props) {
  const MAX_RATING = 5;

  if (rating > MAX_RATING)
    throw new Error(`Rating cannot be greater than ${MAX_RATING}`);

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
