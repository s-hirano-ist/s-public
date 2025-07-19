import bottle_1_1 from "@content/assets/diy/bottle_1_1.jpg";
import bottle_1_2 from "@content/assets/diy/bottle_1_2.jpg";
import bottle_1_3 from "@content/assets/diy/bottle_1_3.jpg";
import coinCase_1 from "@content/assets/diy/coinCase_1.jpg";
import coinCase_2 from "@content/assets/diy/coinCase_2.jpg";
import earphone_1_1 from "@content/assets/diy/earphone_1_1.jpg";
import earphone_1_2 from "@content/assets/diy/earphone_1_2.jpg";
import earphone_2_1 from "@content/assets/diy/earphone_2_1.jpg";
import earphone_3_1 from "@content/assets/diy/earphone_3_1.jpg";
import earphone_3_2 from "@content/assets/diy/earphone_3_2.jpg";
import earphone_3_3 from "@content/assets/diy/earphone_3_3.jpg";
import gasCan_1_1 from "@content/assets/diy/gasCan_1_1.jpg";
import gasCan_2_1 from "@content/assets/diy/gasCan_2_1.jpg";
import gasCan_2_2 from "@content/assets/diy/gasCan_2_2.jpg";
import gasCan_2_3 from "@content/assets/diy/gasCan_2_3.jpg";
import gasCan_2_4 from "@content/assets/diy/gasCan_2_4.jpg";
import iPadSleeve_1_1 from "@content/assets/diy/iPadSleeve_1_1.jpg";
import pen_1_1 from "@content/assets/diy/pen_1_1.jpg";
import pen_1_2 from "@content/assets/diy/pen_1_2.jpg";
import porch_1_1 from "@content/assets/diy/porch_1_1.jpg";
import porch_2_1 from "@content/assets/diy/porch_2_1.jpg";
import porch_2_2 from "@content/assets/diy/porch_2_2.jpg";
import porch_2_3 from "@content/assets/diy/porch_2_3.jpg";
import porch_3_1 from "@content/assets/diy/porch_3_1.jpg";
import porch_4_1 from "@content/assets/diy/porch_4_1.jpg";
import tissue_1_1 from "@content/assets/diy/tissue_1_1.jpg";
import wallet_1_1 from "@content/assets/diy/wallet_1_1.jpg";
import wallet_2_1 from "@content/assets/diy/wallet_2_1.jpg";
import wallet_2_2 from "@content/assets/diy/wallet_2_2.jpg";
import wallet_3_1 from "@content/assets/diy/wallet_3_1.jpg";
import wallet_3_2 from "@content/assets/diy/wallet_3_2.jpg";
import wallet_4_1 from "@content/assets/diy/wallet_4_1.jpg";
import wallet_4_2 from "@content/assets/diy/wallet_4_2.jpg";
import watch_1_1 from "@content/assets/diy/watch_1_1.jpg";
import watch_1_2 from "@content/assets/diy/watch_1_2.jpg";
import type { ImageMetadata } from "astro";

export type Content = {
	name: string;
	src: ImageMetadata[];
};

export const CONTENTS: Content[] = [
	{ name: "Coin case v1", src: [coinCase_1, coinCase_2] },

	{ name: "Leather wallet v4", src: [wallet_4_1, wallet_4_2] },
	{ name: "Leather wallet v3", src: [wallet_3_1, wallet_3_2] },
	{ name: "Leather wallet v2", src: [wallet_2_1, wallet_2_2] },
	{ name: "Leather wallet v1", src: [wallet_1_1] },

	{ name: "Leather porch v4", src: [porch_4_1] },
	{ name: "Leather porch v3", src: [porch_3_1] },
	{ name: "Leather porch v2", src: [porch_2_1, porch_2_2, porch_2_3] },
	{ name: "Leather porch v1", src: [porch_1_1] },

	{ name: "Apple watch band v1", src: [watch_1_1, watch_1_2] },
	{ name: "iPad sleeve v1", src: [iPadSleeve_1_1] },

	{
		name: "Gas can holder v2",
		src: [gasCan_2_1, gasCan_2_2, gasCan_2_3, gasCan_2_4],
	},
	{ name: "Gas can holder v1", src: [gasCan_1_1] },

	{ name: "Earphone case v3", src: [earphone_3_1, earphone_3_2, earphone_3_3] },
	{ name: "Earphone case v2", src: [earphone_2_1] },
	{ name: "Earphone case v1", src: [earphone_1_1, earphone_1_2] },

	{ name: "Bottle holder v1", src: [bottle_1_1, bottle_1_2, bottle_1_3] },
	{ name: "Pen case v1", src: [pen_1_1, pen_1_2] },
	{ name: "Tissue case v1", src: [tissue_1_1] },
];
