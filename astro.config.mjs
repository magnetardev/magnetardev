import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://magnetar.dev",
	integrations: [sitemap()],
	experimental: {
		assets: true,
	},
	vite: {
		css: {
			transformer: "lightningcss",
			lightningcss: {
				browserslist: ">= 0.25%",
				drafts: {
					nesting: true,
				},
			},
		},
	},
});
