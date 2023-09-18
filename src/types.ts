export interface Site {
  website: string;
  author: string;
  description: string;
  title: string;
  ogImage: string;
  postPerPage: number;
}

export type SocialObjects = {
  name: SocialMedia;
  href: string;
  active: boolean;
  linkTitle: string;
}[];

export type SocialIcons = {
  [social in SocialMedia]: string;
};

export type SocialMedia =
  | "Github"
  | "Instagram"
  | "Mail"
  | "Twitter"
  | "GitLab";
