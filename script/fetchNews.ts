import { readFile, writeFile } from "node:fs/promises";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type News = {
  id: number;
  title: string;
  url: string;
  quote: string | null;
  name: string;
};

type Template = {
  heading: string;
  description: string;
  body: BodyItem[];
};

type BodyItem = {
  title: string;
  quote: string;
  url: string;
};

dotenv.config();

const OUTPUT_PATH = "src/content/news";
const USERNAME_TO_EXPORT = process.env.USERNAME_TO_EXPORT;

if (!USERNAME_TO_EXPORT) throw new Error("ENV not set.");

type OutputType = Record<
  string,
  {
    title: string;
    quote: string;
    url: string;
  }[]
>;

function categorizeNews(news: News[]): OutputType {
  return news.reduce((acc, d) => {
    if (!acc[d.name]) acc[d.name] = [];
    const { title, quote, url } = d;
    acc[d.name].push({ title, quote: quote ?? "", url });
    return acc;
  }, {} as OutputType);
}

async function readFileOrCreate(key: string) {
  const filePath = `${OUTPUT_PATH}/${key}.json`;

  try {
    const data = await readFile(filePath, "utf8");
    return JSON.parse(data) as Template;
  } catch (error) {
    // ファイルが存在しない
    const data: Template = { heading: key, description: "FIXME", body: [] };
    const jsonData = JSON.stringify(data, null, 2);
    await writeFile(filePath, jsonData);
    return data;
  }
}

async function exportData(data: OutputType) {
  for (const [key, value] of Object.entries(data)) {
    console.log(`Key: ${key}`);
    const originalData = await readFileOrCreate(key);

    originalData.body.push(...value);
    await writeFile(
      `${OUTPUT_PATH}/${key}.json`,
      `${JSON.stringify(originalData, null, 2)}\n`,
    );
  }
}

try {
  const news = (
    await prisma.news.findMany({
      where: { userId: USERNAME_TO_EXPORT, status: "UNEXPORTED" },
      select: { id: true, title: true, quote: true, url: true, Category: true },
    })
  ).map(d => {
    return { ...d, name: d.Category.name };
  });
  console.log("📊 データを取得しました。");

  await exportData(categorizeNews(news));

  console.log("💾 データがdata.jsonに書き出されました。");
} catch (error) {
  console.error("❌ エラーが発生しました:", error);
}
