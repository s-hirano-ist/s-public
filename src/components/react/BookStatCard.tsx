import { Button, Stat, StatTitle, StatValue, Slider } from "@s-hirano-ist/s-ui";
import type { ChangeEvent } from "react";
import { MAX_RATING } from "@config";

export default function BookStatCard({
  totalBooks,
  tags,
  rating,
  selectedTag,
  handleFilterRating,
  handleTagClick,
}: {
  handleFilterRating: (_: ChangeEvent<HTMLInputElement>) => void;
  handleTagClick: (tag: string) => void;
  rating: number;
  selectedTag: string | undefined;
  tags: string[];
  totalBooks: number;
}) {
  const ratingLabel = rating === 0 ? "すべて" : `☆${rating}以上`;

  return (
    <Stat className="mt-6 p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[10rem_1fr] lg:gap-8">
        <div className="border-b border-border pb-5 lg:border-r lg:border-b-0 lg:pr-8 lg:pb-0">
          <StatTitle>該当冊数</StatTitle>
          <StatValue className="mt-2 block">{totalBooks}冊</StatValue>
        </div>

        <div className="min-w-0 space-y-6">
          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <label
                htmlFor="rating-filter"
                className="text-sm font-medium text-foreground">
                レーティング
              </label>
              <span className="text-sm text-muted-foreground">
                {ratingLabel}
              </span>
            </div>
            <Slider
              id="rating-filter"
              aria-label="最低レーティング"
              min={0}
              max={MAX_RATING}
              value={rating}
              onChange={handleFilterRating}
              step={1}
            />
            <div className="mt-2 flex w-full justify-between px-1 text-xs text-muted-foreground">
              {[...Array(MAX_RATING + 1).keys()].map(int => (
                <span key={int}>{int === 0 ? "すべて" : int}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-foreground">タグ</p>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Button
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  aria-pressed={selectedTag === tag}
                  className="h-7 px-2.5 text-xs"
                  onClick={() => handleTagClick(tag)}
                  key={tag}>
                  #{tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Stat>
  );
}
