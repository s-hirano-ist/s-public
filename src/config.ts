type Site = {
  website: string;
  author: string;
  description: string;
  title: string;
  ogImage: string;
  postPerPage: number;
};

export const SITE: Site = {
  website: "https://s-hirano.com/",
  author: "s-hirano-ist",
  description: "Thoughts by s-hirano-ist.",
  title: "思考の備忘録",
  ogImage: "/defaultOgImage.jpg",
  postPerPage: 10,
};
