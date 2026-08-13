# CLAUDE.md — LeadVault Phase 1 Website Build

You are building the LeadVault marketing website. **Every decision has already been made and is recorded in this file and the two reference documents. Do not ask the user for decisions or clarifications.** If something is genuinely ambiguous, make the most reasonable choice consistent with this file, record it in `ASSUMPTIONS.md` at the project root, and continue.

## Source documents (read both before writing any code)
1. `content/leadvault-website-copy-v5.md` — ALL page content, structure, SEO titles, meta descriptions, form fields, and the site-wide footer. **Follow it faithfully. Do not rewrite, shorten, or "improve" the copy.** Bracketed items like [X]+ are intentional placeholders — keep them visible.
2. `reference/leadvault-development-handoff-brief.md` — stack rationale, icon list, image plan, hosting/analytics plan.

## Locked decisions
- **Stack:** Astro (latest stable) + Tailwind CSS. Static output. No React/Vue islands unless a component truly requires interactivity (mobile nav toggle and FAQ accordions may use minimal vanilla JS or Astro islands).
- **Hosting target:** Netlify. Include `netlify.toml`. Forms via **Netlify Forms**.
- **Pages (11):** index, services, trade (International Trade & Freight Forwarding), industries, why-leadvault, tools, data-catalog, about, pricing, contact, thank-you. Clean URLs (`/services`, not `/services.html`).
- **Design tokens:** backgrounds #0A1F44 / #12315F / #081833; accent #1DBF9F — "verified teal" (all CTAs, highlights, stat numbers); text on teal buttons uses dark green #04342C for contrast, never white; text: white/near-white on dark, with a light section variant where readability demands. Font: Inter (self-hosted via `@fontsource/inter` — no external Google Fonts request). Professional, data-driven aesthetic; generous spacing; strong typographic hierarchy.
- **Layout:** shared `BaseLayout.astro` with sticky header (logo left, nav, teal "Get My Free Recommendation" button linking to /contact) and the footer exactly as written in the copy doc. Mobile-first responsive; hamburger nav under 1024px.
- **Logo:** no logo file exists yet. Build a text wordmark component: "Lead" in white + "Vault" in teal, bold. Structure it so an SVG logo can replace it later in one place.
- **Icons:** lucide (use `@lucide/astro` or inline SVGs from Lucide). Icon-to-section mapping is in the handoff brief §2. Never use emoji as UI icons.
- **Images:** no photos are provided yet. For every photo slot in the copy doc's IMAGE notes, render a styled placeholder: navy gradient block with a subtle grid pattern and a small caption of what belongs there (e.g., "IMAGE: container port at dusk"). Use an `<Image>`-ready component structure so real photos drop in later without layout changes. Apply a navy duotone overlay class that will sit on all future photos.
- **Charts (Home stats section):** coded, not images. Use inline SVG or Chart.js (prefer lightweight inline SVG): one bar chart (deliverability), one simple world-coverage motif, animated counters (IntersectionObserver, vanilla JS). Placeholder numbers from the copy doc, clearly kept as-is.
- **Comparison tables** (Home + Why LeadVault + Trade pages): true HTML tables, styled, horizontally scrollable on mobile.
- **Data Catalog cards:** each card's "Request This Dataset" button links to `/contact?need=<category-slug>`; the contact form's "What do you need?" select pre-fills from that URL parameter via a few lines of vanilla JS.
- **Contact form:** all 12 fields exactly as in the copy doc. Netlify Forms (`data-netlify="true"`, form name `lead-survey`), honeypot field (`netlify-honeypot`), required-field validation, success redirect to `/thank-you`.
- **/thank-you page:** short confirmation message ("Your recommendation is on its way within 24 hours") + links back to Services and the Trade page. This page fires conversion events (below). Add `noindex`.
- **Analytics:** in `BaseLayout.astro`, add clearly-commented slots:
  - GA4 snippet with `G-XXXXXXXXXX` placeholder constant at the top of the layout file.
  - Meta Pixel snippet with `PIXEL_ID_TBD` placeholder constant.
  - On /thank-you only: fire GA4 `generate_lead` event and Meta `Lead` event (guarded so they no-op while IDs are placeholders).
- **SEO:** per-page `<title>` + meta description from the copy doc; canonical URLs; Open Graph + Twitter card tags (generate a simple branded OG image as an SVG-rendered PNG or static asset); `@astrojs/sitemap`; `robots.txt`; semantic HTML (one h1 per page); descriptive alt text on all image slots; JSON-LD Organization schema on the homepage (name LeadVault, url https://leadvault.com, founder Steve Ehimigbai).
- **Performance/accessibility:** target Lighthouse 90+ all categories. No render-blocking third-party scripts (analytics deferred). Visible focus states; color-contrast-safe text on navy.
- **Git:** initialize repo, sensible `.gitignore`, conventional commit messages, commit in logical increments (scaffold → layout → pages → forms → polish).

## Do NOT
- Do not rewrite or editorialize the website copy.
- Do not add pages, pricing figures, statistics, testimonials, or claims not present in the copy doc.
- Do not install a CMS, database, authentication, payment code, or any backend — Phase 1 is strictly static + Netlify Forms.
- Do not add cookie-consent banners, chat widgets, or third-party embeds.
- Do not fetch remote images or hotlink assets; everything self-contained.
- Do not use `--force` pushes or destructive git commands.

## Definition of done
1. `npm run build` succeeds with zero errors/warnings.
2. All 11 pages render correctly at mobile (375px), tablet, and desktop widths.
3. Form submits locally (Netlify dev) and redirects to /thank-you; honeypot present.
4. Catalog → contact pre-fill works.
5. Sitemap, robots.txt, OG tags, JSON-LD present in build output.
6. `ASSUMPTIONS.md` lists every judgment call you made.
7. `README.md` written for the owner: how to run locally, how to deploy to Netlify, where to paste the GA4/Pixel IDs, where to drop real images, and where to replace placeholder numbers/prices.

Work through the entire build to completion without stopping to ask for approval between steps.
