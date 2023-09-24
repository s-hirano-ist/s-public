import SearchCard from "@components/react/SearchCard";
import type { JsonFrontmatter, MarkdownFrontmatter } from "@content/_schemas";
import slugify from "@utils/slugify";
import Fuse from "fuse.js";
import { useEffect, useRef, useState, useMemo } from "react";

export type SummarySearchItem = {
  body: string;
  data: MarkdownFrontmatter;
};
export type NewsSearchItem = {
  data: JsonFrontmatter;
};

type Props = {
  summarySearchList: SummarySearchItem[];
  newsSearchList: NewsSearchItem[];
};

type SummarySearchResult = {
  item: SummarySearchItem;
  refIndex: number;
};
type NewsSearchResult = {
  item: NewsSearchItem;
  refIndex: number;
};

export default function SearchBar({
  summarySearchList,
  newsSearchList,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");

  const [summarySearchResult, setSummarySearchResults] = useState<
    SummarySearchResult[] | null
  >(null);
  const [newsSearchResult, setNewsSearchResults] = useState<
    NewsSearchResult[] | null
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
  const newsFuse = useMemo(
    () =>
      new Fuse(newsSearchList, {
        keys: [
          "data.heading",
          "data.description",
          "data.body.title",
          "data.body.quote",
          "data.body.url",
        ],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
      }),
    [newsSearchList],
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

    const newsInputResult =
      inputVal.length > 1 ? newsFuse.search(inputVal) : [];
    setNewsSearchResults(newsInputResult);

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
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-75">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
          </svg>
        </span>
        <input
          className="block w-full rounded border border-skin-fill 
        bg-skin-fill py-3 pl-10
        pr-3 placeholder:italic placeholder:text-opacity-75 
        focus:border-skin-accent/40 focus:outline-none"
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
        {newsSearchResult?.map(({ item, refIndex }) => (
          <SearchCard
            href={`/news/${slugify(item.data)}`}
            title={item.data.heading}
            description={item.data.description}
            key={`${refIndex}-${slugify(item.data)}`}
          />
        ))}
      </ul>
    </>
  );
}
