import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import lightningcss from 'vite-plugin-lightningcss';

export default defineConfig({
	site: 'https://magnetar.dev',
	integrations: [mdx(), sitemap()],
	vite: {
		plugins: [
			lightningcss({
				browserslist: '>= 0.25%',
				drafts: {
					nesting: true
				}
			}),
		],
	},
});
