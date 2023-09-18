import type { Site, SocialObjects } from "types";

export const SITE: Site = {
  website: "https://s-hirano.com/",
  author: "s-hirano-ist",
  description: "Thoughts by s-hirano-ist.",
  title: "思考の備忘録",
  ogImage: "/defaultOgImage.jpg",
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
    active: false,
  },
];
