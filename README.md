# LeadVault Website

Phase 1 marketing website for LeadVault — built with [Astro](https://astro.build) +
[Tailwind CSS](https://tailwindcss.com), deployed as a static site on
[Netlify](https://netlify.com) with [Netlify Forms](https://docs.netlify.com/forms/setup/)
handling submissions. No backend, database, or CMS — see `CLAUDE.md` for the full brief.

## Running locally

Requires [Node.js](https://nodejs.org) 22+.

```bash
npm install
npm run dev
```

Open the local address it prints (usually `http://localhost:4321`).

```bash
npm run build    # production build to dist/ — run this before every deploy
npm run preview  # serve the production build locally
```

**Testing the contact form locally:** Netlify Forms only processes submissions on
Netlify's own infrastructure, so a plain `npm run dev` submission won't reach a real
inbox. To test the full flow (including the honeypot and the `/thank-you` redirect)
locally, install the Netlify CLI and run:

```bash
npm install -g netlify-cli
netlify dev
```

## Deploying to Netlify

1. Push this repository to GitHub.
2. In Netlify: **Add new site → Import an existing project → GitHub** → select the repo.
   Netlify auto-detects Astro (`npm run build`, publish directory `dist`) via
   `netlify.toml` — accept the defaults and click **Deploy**.
3. Once live on the temporary `*.netlify.app` address, go to **Domain settings → Add
   custom domain** and follow Netlify's DNS instructions to connect `leadvault.com`.
   Enable HTTPS (one click, free) once the domain verifies.
4. In **Site settings → Forms → Notifications**, add an email notification to
   `hello@leadvault.com` so form submissions land in an inbox, not just the Netlify
   dashboard.

Full walkthrough with screenshots: `reference/leadvault-development-handoff-brief.md`,
section 4.

## Where to paste the GA4 and Meta Pixel IDs

Both live as clearly-labeled placeholder constants near the top of
`src/layouts/BaseLayout.astro`:

```js
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';  // → your real GA4 Measurement ID
const META_PIXEL_ID = 'PIXEL_ID_TBD';        // → your real Meta Pixel/Dataset ID
```

Each snippet is a guarded no-op until its ID is replaced — nothing loads or fires until
you paste the real value in. Once GA4 is live, the `/thank-you` page (which fires the
`generate_lead` GA4 event and the `Lead` Meta event) is the page you mark as a GA4 key
event. Full step-by-step: `reference/leadvault-development-handoff-brief.md`, section 5.

## Where to drop in real images

Every photo slot on the site is currently a styled placeholder (navy gradient + grid
pattern + caption naming what belongs there), built with `src/components/ImagePlaceholder.astro`.
To replace one:

1. Add the real image file under `src/assets/` (or `public/` for files that don't need
   Astro's image optimization).
2. In the page file, replace the `<ImagePlaceholder caption="..." />` call with Astro's
   `<Image src={...} alt="..." />` component, keeping it inside the same
   `.lv-photo-frame.lv-duotone` wrapper so the navy duotone treatment applies
   automatically and the layout doesn't shift.

The full shopping list (what to photograph, where, and free-source search terms) is in
`reference/leadvault-development-handoff-brief.md`, section 2. Only 5–6 real photos are
actually needed — everything else is icons or coded graphics.

To swap the text wordmark for a real logo file later, edit only
`src/components/Logo.astro` — every page references that one component.

To regenerate the Open Graph share image (`public/og-image.png`) after changing the
brand mark or tagline:

```bash
npm run generate:og
```

## Where to replace placeholder numbers, prices, and contact details

All bracketed placeholders (`[X]+`, `[XX]%`, `(confirm figure)`, etc.) are intentional —
per CLAUDE.md they're kept visible rather than invented. Search the codebase for `[X`
and `(confirm` to find every instance, or work through this list:

| What | File |
|---|---|
| Home stats (years, datasets delivered, deliverability %, continents) | `src/components/StatsSection.astro` |
| All service, subscription, and Trade Desk pricing | `src/pages/services.astro`, `src/pages/pricing.astro` |
| Replacement guarantee percentage | `src/pages/pricing.astro` |
| Contact details (WhatsApp, office address, hours) | `src/pages/contact.astro` |
| Founder achievements + portrait | `src/pages/about.astro` |
| Testimonial attributions (confirm real clients + permission) | `src/pages/index.astro`, `src/pages/trade.astro` |
| Payment methods | `src/pages/pricing.astro` (FAQ) |

See `ASSUMPTIONS.md` for every judgment call made along the way, and the copy doc's own
"PRE-LAUNCH CHECKLIST" (`content/leadvault-website-copy-v5.md`) for the full list of
what still needs your input before launch — including lawyer review of the comparison
page and legal/privacy pages, which are intentionally out of scope for this build.

## Project structure

```
src/
  components/   Shared UI: header, footer, cards, tables, image placeholders, charts
  data/         Nav links, catalog categories, country list — single source of truth
  layouts/      BaseLayout.astro — SEO, analytics slots, header/footer wrapper
  pages/        One file per route (11 marketing pages + /thank-you + /404)
  styles/       Tailwind entry point + design tokens (global.css)
scripts/        generate-og-image.mjs — regenerates the OG share image
public/         Static assets served as-is (favicon, robots.txt, og-image.png)
```
