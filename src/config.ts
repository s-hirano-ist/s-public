type Site = {
  website: string;
  author: string;
  description: string;
  title: string;
  ogImage: string;
  postPerPage: number;
  email: string;
};

export const SITE: Site = {
  website: "https://s-hirano.com/",
  author: "s-hirano-ist",
  description: "Portfolio and blog of s-hirano-ist.",
  title: "思考の備忘録",
  ogImage: "/defaultOgImage.jpg",
  postPerPage: 10,
  email: "s-hirano-ist@outlook.com",
};
