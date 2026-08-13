// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://leadvault.com',
  output: 'static',
  integrations: [
    sitemap({
      // /thank-you is noindex (post-conversion confirmation page) — keep it out of the sitemap.
      filter: (page) => !page.includes('/thank-you'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
