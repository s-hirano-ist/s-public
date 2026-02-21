import { Button, Stat, StatTitle, StatValue, Slider } from "@s-hirano-ist/s-ui";
import type { ChangeEvent, MouseEvent } from "react";
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
  handleTagClick: (_: MouseEvent<HTMLButtonElement>) => void;
  rating: number;
  selectedTag: string | undefined;
  tags: string[];
  totalBooks: number;
}) {
  return (
    <Stat className="mt-4 flex flex-col">
      <div className="my-4 flex">
        <div>
          <StatTitle>該当冊数</StatTitle>
          <StatValue className="block pt-2">{totalBooks}冊</StatValue>
        </div>
        <div className="h-48 overflow-y-scroll p-4">
          <div>
            {tags.map(tag => (
              <Button
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                className="m-1 h-6 px-2 text-xs"
                onClick={handleTagClick}
                key={tag}>
                #{tag}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Slider
        min={1}
        max={5}
        value={rating}
        onChange={handleFilterRating}
        step={1}
      />
      <div className="flex w-full justify-between px-2 text-xs">
        {[...Array(MAX_RATING).keys()].map(int => (
          <span key={int}>{int + 1}</span>
        ))}
      </div>
    </Stat>
  );
}
