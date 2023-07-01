import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://s-hirano.com/",
  author: "Soraki Hirano",
  desc: "Thoughts by Soraki Hirano.",
  title: "思考の備忘録",
  ogImage: "default-og.jpg",
  postPerPage: 10,
};

export const LOCALE = ["ja"];

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/s-hirano-ist",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/sola_apochromat_lens/",
    linkTitle: `${SITE.title} on Instagram`,
    active: false,
  },
  {
    name: "Mail",
    href: "solucky0725@icloud.coms",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/s_hirano_ist",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
  {
    name: "GitLab",
    href: "https://gitlab.com/sorakihirano2",
    linkTitle: `${SITE.title} on GitLab`,
    active: true,
  },
];

//TODO: The recommended size for OG image is **_1200 X 640_** px.

//TODO: [for more customization](https://astro-paper.pages.dev/posts/customizing-astropaper-theme-color-schemes/)

//TODO: image compressions
// - [TinyPng](https://tinypng.com/)
// - [TinyJPG](https://tinyjpg.com/)
