import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dgigiu.github.io',
  base: '/mj-portfolio',
  integrations: [mdx(), sitemap()],
  build: {
    format: 'directory',
  },
  vite: {
    css: {
      devSourcemap: true,
    },
  },
});
