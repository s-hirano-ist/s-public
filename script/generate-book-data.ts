/**
 * s-contents (private repo) の markdown/book/*.md frontmatter を集約し、
 * src/data/book/data.gen.json を再生成する。
 *
 * GitHub Contents API 経由で取得するため、事前に GITHUB_ACTION_TOKEN (PAT with repo:contents:read on s-contents) を Doppler で登録し、`doppler run` 経由で注入すること。
 *
 * 週次 + workflow_dispatch で GitHub Actions から実行し、差分があれば PR を作成する運用。
 */
import { writeFileSync } from "node:fs";
import matter from "gray-matter";

try {
  process.loadEnvFile(".env.local");
} catch {
  // CI では環境変数を直接設定
}

const OWNER = "s-hirano-ist";
const REPO = "s-contents";
const DIR_PATH = "markdown/book";
const BRANCH = "main";
const OUTPUT_PATH = "src/data/book/data.gen.json";

type GitHubContentEntry = {
  download_url: string | null;
  name: string;
  path: string;
  type: "file" | "dir";
};

type BookFrontmatter = {
  googleAuthors?: string[];
  googleDescription?: string | null;
  googleHref?: string | null;
  googleImgSrc?: string | null;
  googleSubtitle?: string | null;
  googleTitle?: string | null;
  rating?: number | null;
  tags?: string[];
  title?: string | null;
};

type BookEntry = {
  googleAuthors: string[];
  googleDescription: string;
  googleHref: string;
  googleImgSrc: string;
  googleSubtitle: string;
  googleTitle: string;
  ISBN: string;
  rating: number;
  tags: string[];
  title: string;
};

const token = process.env.GITHUB_ACTION_TOKEN;
if (!token) {
  throw new Error(
    "GITHUB_ACTION_TOKEN is not set. A PAT with repo:contents:read on s-contents is required (via Doppler).",
  );
}

const authHeaders = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "s-public-generate-book",
};

async function listMarkdownFiles(): Promise<GitHubContentEntry[]> {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${DIR_PATH}?ref=${BRANCH}`;
  const res = await fetch(url, { headers: authHeaders });
  if (!res.ok) {
    throw new Error(
      `Failed to list ${DIR_PATH}: ${res.status} ${res.statusText}`,
    );
  }
  const data = (await res.json()) as GitHubContentEntry[];
  return data.filter(e => e.type === "file" && e.name.endsWith(".md"));
}

async function fetchRaw(entry: GitHubContentEntry): Promise<string> {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${entry.path}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: {
      ...authHeaders,
      Accept: "application/vnd.github.raw",
    },
  });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${entry.path}: ${res.status} ${res.statusText}`,
    );
  }
  return res.text();
}

async function main(): Promise<void> {
  console.log(`📡 Listing ${OWNER}/${REPO}/${DIR_PATH} (${BRANCH})...`);
  const files = await listMarkdownFiles();
  console.log(`📁 ${files.length} markdown files detected.`);

  const entries: BookEntry[] = [];
  let skippedCount = 0;

  for (const file of files) {
    const isbn = file.name.replace(/\.md$/, "");
    const raw = await fetchRaw(file);
    const parsed = matter(raw);
    const data = parsed.data as BookFrontmatter;

    if (data.rating == null || data.title == null) {
      console.warn(
        `⚠️  ${file.name}: rating または title 未設定のためスキップ`,
      );
      skippedCount++;
      continue;
    }

    entries.push({
      ISBN: isbn,
      title: data.title,
      googleTitle: data.googleTitle ?? "",
      googleSubtitle: data.googleSubtitle ?? "",
      googleAuthors: data.googleAuthors ?? [],
      googleDescription: data.googleDescription ?? "",
      googleImgSrc: data.googleImgSrc ?? "",
      googleHref: data.googleHref ?? "",
      tags: data.tags ?? [],
      rating: data.rating,
    });
  }

  entries.sort((a, b) => a.ISBN.localeCompare(b.ISBN));

  writeFileSync(OUTPUT_PATH, JSON.stringify(entries));
  console.log(
    `💾 Wrote ${OUTPUT_PATH} (${entries.length} entries, ${skippedCount} skipped).`,
  );
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
