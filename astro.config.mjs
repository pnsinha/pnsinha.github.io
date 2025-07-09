// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://pnsinha.github.io', // GitHub Pages URL
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false, // We'll handle base styles in our CSS
      config: {
        path: './tailwind.config.mjs',
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
});
