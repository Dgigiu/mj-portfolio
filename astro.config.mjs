import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import lab from './src/lab/integration.mjs';

export default defineConfig({
  site: 'https://migueljss.com',
  integrations: [mdx(), sitemap(), lab()],
  build: {
    format: 'directory',
  },
  vite: {
    css: {
      devSourcemap: true,
    },
  },
});
