import { MAX_RATING } from "@config";
import type { ChangeEvent, MouseEvent } from "react";

export default function BookStatCard({
  totalBooks,
  tags,
  rating,
  selectedTag,
  handleFilterRating,
  handleTagClick,
}: {
  totalBooks: number;
  tags: string[];
  rating: number;
  selectedTag: string | undefined;
  handleFilterRating: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTagClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="stat mt-4 flex flex-col shadow">
      <div className="my-4 flex">
        <div>
          <div className="stat-title">該当冊数</div>
          <div className="stat-value pt-2 text-primary">{totalBooks}冊</div>
        </div>
        <div className="stat h-48 overflow-y-scroll">
          <div>
            {tags.map(tag => (
              <button
                className={`btn btn-xs m-1 ${
                  selectedTag === tag && "btn-primary"
                }`}
                onClick={handleTagClick}
                key={tag}>
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      <input
        type="range"
        min={1}
        max={5}
        value={rating}
        onChange={handleFilterRating}
        className="range range-xs"
        step={1}
      />
      <div className="stat flex w-full justify-between px-2 text-xs">
        {[...Array(MAX_RATING).keys()].map(int => (
          <span key={int}>{int + 1}</span>
        ))}
      </div>
    </div>
  );
}
