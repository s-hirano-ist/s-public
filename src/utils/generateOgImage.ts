import satori, { SatoriOptions } from "satori";
import { SITE } from "@config";
import { writeFile } from "node:fs/promises";
import sharp from "sharp";
import { fetchFont } from "./fetchFont";
import { OgImage } from "../components/react/OgImage";

const regularFontData = await fetchFont(
  "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400",
);
const boldFontData = await fetchFont(
  "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700",
);

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: "Noto Sans JP",
      data: regularFontData as ArrayBuffer,
      weight: 400,
      style: "normal",
    },
    {
      name: "Noto Sans JP",
      data: boldFontData as ArrayBuffer,
      weight: 700,
      style: "normal",
    },
  ],
};

const generateOgImage = async (
  ogTitle = SITE.title,
  description = SITE.description,
) => {
  const svg = await satori(OgImage({ description: description }), options);

  // render png in production mode
  if (import.meta.env.MODE === "production") {
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    console.info("Output PNG Image  :", `${ogTitle}.png`);

    await writeFile(`./dist/${ogTitle}.png`, pngBuffer);
  }

  return svg;
};

export default generateOgImage;
