import SearchCard from "@components/react/SearchCard";
import type { SummaryFrontmatter } from "@content/_schemas";
import slugify from "@utils/slugify";
import Fuse from "fuse.js";
import { useEffect, useRef, useState, useMemo } from "react";

export type SummarySearchItem = {
  body: string;
  data: SummaryFrontmatter;
};

type Props = {
  summarySearchList: SummarySearchItem[];
};

type SummarySearchResult = {
  item: SummarySearchItem;
  refIndex: number;
};

export default function SearchBar({ summarySearchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");

  const [summarySearchResult, setSummarySearchResults] = useState<
    SummarySearchResult[] | null
  >(null);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const summaryFuse = useMemo(
    () =>
      new Fuse(summarySearchList, {
        keys: ["data.heading", "data.description", "body"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
      }),
    [summarySearchList],
  );

  useEffect(() => {
    // if URL has search query, insert that search query in input field
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    // put focus cursor at the end of the string
    setTimeout(function () {
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd =
        searchStr?.length ?? 0;
    }, 50);
  }, []);

  useEffect(() => {
    // Add search result only if input value is more than one character
    const summaryInputResult =
      inputVal.length > 1 ? summaryFuse.search(inputVal) : [];
    setSummarySearchResults(summaryInputResult);

    // Update search string in URL
    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.replaceState(null, "", newRelativePathQuery);
    } else {
      history.replaceState(null, "", window.location.pathname);
    }
  }, [inputVal]);

  return (
    <>
      <label className="relative block">
        <input
          className="my-4 block w-full rounded border-2 bg-transparent py-3 pl-10 placeholder:italic placeholder:text-opacity-75 focus:outline-none"
          placeholder="Search for anything..."
          type="text"
          name="search"
          value={inputVal}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          ref={inputRef}
        />
      </label>

      <ul>
        {summarySearchResult?.map(({ item, refIndex }) => (
          <SearchCard
            href={`/summary/${slugify(item.data)}`}
            title={item.data.heading}
            description={item.data.description}
            key={`${refIndex}-${slugify(item.data)}`}
          />
        ))}
      </ul>
    </>
  );
}
