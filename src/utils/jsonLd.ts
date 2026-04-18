import { SITE } from "@config";

const baseUrl = SITE.website.replace(/\/$/, "");

export const PERSON_ENTITY = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${baseUrl}/#person`,
  name: "s-hirano-ist",
  givenName: "空暉",
  familyName: "平野",
  alternateName: "s-hirano-ist",
  url: baseUrl,
  email: SITE.email,
  description:
    "Software Engineer specializing in TypeScript, React, and AWS infrastructure. Portfolio and blog of s-hirano-ist.",
  image: `${baseUrl}/favicon-32x32.png`,
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "GMOインターネット株式会社",
    url: "https://www.internet.gmo",
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "大阪大学大学院 情報科学研究科 バイオ情報工学専攻",
      alternateName:
        "Graduate School of Information Science and Technology at Osaka University",
      url: "https://www.osaka-u.ac.jp",
    },
    {
      "@type": "EducationalOrganization",
      name: "大阪大学 基礎工学部 情報科学科",
      alternateName: "School of Engineering Science at Osaka University",
      url: "https://www.osaka-u.ac.jp",
    },
  ],
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "Astro",
    "AWS",
    "Infrastructure as Code",
    "Frontend Development",
    "Web Development",
    "Software Engineering",
  ],
  sameAs: [
    "https://github.com/s-hirano-ist",
    "https://x.com/s_hirano_ist",
    "https://twitter.com/s_hirano_ist",
    "https://linkedin.com/in/空暉-平野-2a7183337",
  ],
};

export const WEBSITE_ENTITY = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  name: "Portfolio",
  alternateName: "Portfolio of s-hirano-ist",
  url: baseUrl,
  description: SITE.description,
  inLanguage: "ja",
  author: {
    "@id": `${baseUrl}/#person`,
  },
  publisher: {
    "@id": `${baseUrl}/#person`,
  },
};

export function buildBreadcrumbList(
  items: { name: string; url: string }[],
): object {
  const allItems = [{ name: "ホーム", url: `${baseUrl}/` }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function estimateWordCount(markdownBody: string): number {
  let text = markdownBody;
  // Remove code blocks
  text = text.replaceAll(/```[\s\S]*?```/g, "");
  text = text.replaceAll(/`[^`]+`/g, "");
  // Remove HTML tags (loop to handle nested patterns like `<scr<script>ipt>`)
  let previous;
  do {
    previous = text;
    text = text.replaceAll(/<[^<>]*>/g, "");
  } while (text !== previous);
  // Remove Markdown syntax
  text = text.replaceAll(/[#*_~()>|=[\]-]/g, " ");

  // Count CJK characters individually (each is approximately one word)
  const cjkMatches = text.match(
    /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uF900-\uFAFF]/g,
  );
  const cjkCount = cjkMatches ? cjkMatches.length : 0;

  // Remove CJK characters and count remaining Latin words by whitespace
  const latinText = text
    .replaceAll(
      /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uF900-\uFAFF]/g,
      " ",
    )
    .trim();
  const latinWords = latinText ? latinText.split(/\s+/).filter(Boolean) : [];

  return cjkCount + latinWords.length;
}

type ArticleJsonLdParams = {
  body?: string | undefined;
  canonicalUrl: string;
  date: Date;
  description: string;
  headline: string;
  ogImageUrl: string;
};

export function buildArticleJsonLd({
  canonicalUrl,
  date,
  description,
  headline,
  body,
  ogImageUrl,
}: ArticleJsonLdParams): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": canonicalUrl,
    headline,
    description,
    datePublished: date.toISOString(),
    author: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: SITE.author,
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: SITE.author,
      url: baseUrl,
    },
    url: canonicalUrl,
    image: {
      "@type": "ImageObject",
      url: ogImageUrl,
      width: 1200,
      height: 630,
    },
    inLanguage: "ja",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    ...(body ? { wordCount: estimateWordCount(body) } : {}),
  };
}
