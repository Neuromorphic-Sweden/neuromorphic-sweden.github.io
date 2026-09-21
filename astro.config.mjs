// @ts-check
import { defineConfig } from 'astro/config';

let localReviewDev = false;

export default defineConfig({
	site: 'https://neuromorphic-sweden.se',
	integrations: [{
		name: 'local-editorial-review',
		hooks: {
			'astro:config:setup': ({ command }) => {
				localReviewDev = command === 'dev' && process.env.LOCAL_REVIEW === 'true';
			},
			'astro:route:setup': ({ route }) => {
				if (localReviewDev && route.component.endsWith('/preview/[...id].astro')) {
					// Live SQLite decisions must not be cached by getStaticPaths in development.
					route.prerender = false;
				}
			},
		},
	}],
	// Local review is opt-in and Vite's development proxy is never deployed.
	vite: {
		server: {
			// Local Python environments, raw crawls and agent caches are not website assets.
			watch: { ignored: ['**/.local-discovery/**', '**/.agents/**', '**/.codex/**'] },
			proxy: process.env.LOCAL_REVIEW === 'true' ? {
				'/__local-review/': {
					target: process.env.LOCAL_REVIEW_API_URL ?? 'http://127.0.0.1:8765',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/__local-review/, ''),
				},
			} : undefined,
		},
	},
});
