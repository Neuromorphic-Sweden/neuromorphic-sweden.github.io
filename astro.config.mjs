// @ts-check
import { defineConfig } from 'astro/config';

const reviewSite = process.env.REVIEW_SITE === 'true';

export default defineConfig({
	site: 'https://neuromorphic-sweden.se',
	redirects: reviewSite ? { '/': '/preview/' } : { '/preview': '/' },
});
