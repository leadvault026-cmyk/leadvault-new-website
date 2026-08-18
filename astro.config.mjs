// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const SITE_URL = 'https://leadvaultdata.com';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [
    sitemap({
      // /thank-you is noindex (post-conversion confirmation page) — keep it out of the sitemap.
      filter: (page) => !page.includes('/thank-you'),
      // Astro's directory-style build emits trailing-slash URLs here (e.g. /about/),
      // but every canonical tag and internal <a href> site-wide uses the no-slash form
      // (e.g. /about) — see BaseLayout.astro's canonicalURL and src/data/site.ts. That
      // mismatch handed Google two differently-shaped URLs for the same page (one from
      // the sitemap, one from every link on the site), which is exactly the kind of
      // inconsistency "Duplicate without user-selected canonical" reports on. Stripping
      // the trailing slash here makes the sitemap agree with the canonical tag and every
      // internal link, character-for-character. The homepage (`SITE_URL/`) is left as-is
      // since "" isn't a valid path to canonicalize to.
      serialize: (item) => ({
        ...item,
        url: item.url.endsWith('/') && item.url !== `${SITE_URL}/` ? item.url.slice(0, -1) : item.url,
      }),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
