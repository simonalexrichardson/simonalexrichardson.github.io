// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://simonrichardson.dev',
  base: '/',
  integrations: [sitemap()],
  // SEO: send any residual traffic for the removed Quiet Loon case study
  // straight to the product site so the link equity transfers there.
  // On a static GitHub Pages build this generates an HTML meta-refresh
  // page with a canonical link, which Google treats as a 301-equivalent.
  redirects: {
    '/case-studies/quiet-loon': {
      status: 301,
      destination: 'https://quietloon.com',
    },
  },
});
