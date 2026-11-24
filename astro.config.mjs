import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import lab from './src/lab/integration.mjs';

// Case studies marked `unlisted: true` in their frontmatter are built and
// reachable by URL, but stay out of the sitemap (the page is noindex too).
const caseDir = new URL('./src/content/case-studies/', import.meta.url);
const unlistedPaths = readdirSync(caseDir)
  .filter((file) => file.endsWith('.mdx'))
  .filter((file) => /^unlisted:\s*true\s*$/m.test(readFileSync(new URL(file, caseDir), 'utf8')))
  .map((file) => `/work/${file.replace(/\.mdx$/, '')}/`);

export default defineConfig({
  site: 'https://migueljss.com',
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !unlistedPaths.some((path) => page.endsWith(path)) }),
    lab(),
  ],
  build: {
    format: 'directory',
  },
  vite: {
    css: {
      devSourcemap: true,
    },
  },
});
