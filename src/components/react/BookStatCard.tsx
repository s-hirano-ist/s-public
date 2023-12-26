import { MAX_RATING } from "@config";
import { type ChangeEvent } from "react";

export default function BookStatCard({
  totalBooks,
  tags,
  rating,
  handleFilterRating,
}: {
  totalBooks: number;
  tags: string[];
  rating: number;
  handleFilterRating: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="stat mt-4 flex flex-col shadow">
      <div className="my-4 flex">
        <div>
          <div className="stat-title">冊数</div>
          <div className="stat-value pt-2 text-skin-lightBlue">
            {totalBooks}冊
          </div>
          <div className="stat-desc">2019年以降</div>
        </div>
        <div className="stat h-48 overflow-y-scroll">
          <div>
            {tags.map(tag => (
              // TODO: link to filter with tags
              <button className="btn btn-xs m-1">#{tag}</button>
            ))}
          </div>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={5}
        value={rating}
        onChange={handleFilterRating}
        className="range range-xs"
        step={1}
      />
      <div className="stat flex w-full justify-between px-2 text-xs">
        {[...Array(MAX_RATING + 1).keys()].map(int => (
          <span>{int}</span>
        ))}
      </div>
    </div>
  );
}
