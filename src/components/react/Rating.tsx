import { Rating as SuiRating } from "@s-hirano-ist/s-ui";
import { MAX_RATING } from "@config";

type Props = {
  rating: number;
};

export default function Rating({ rating }: Props) {
  if (!Number.isInteger(rating) || rating < 1 || MAX_RATING < rating)
    throw new Error(`Rating must be an integer & between 0 and ${MAX_RATING}`);

  return <SuiRating rating={rating} maxRating={MAX_RATING} size="md" />;
}
