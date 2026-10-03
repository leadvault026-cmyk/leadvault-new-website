# CLAUDE.md — LeadVault Phase 1 Website Build

You are building the LeadVault marketing website. **Every decision has already been made and is recorded in this file and the two reference documents. Do not ask the user for decisions or clarifications.** If something is genuinely ambiguous, make the most reasonable choice consistent with this file, record it in `ASSUMPTIONS.md` at the project root, and continue.

## Source documents (read both before writing any code)
1. `content/leadvault-website-copy-v5.md` — ALL page content, structure, SEO titles, meta descriptions, form fields, and the site-wide footer. **Follow it faithfully. Do not rewrite, shorten, or "improve" the copy.** Bracketed items like [X]+ are intentional placeholders — keep them visible.
2. `reference/leadvault-development-handoff-brief.md` — stack rationale, icon list, image plan, hosting/analytics plan.

## Locked decisions
- **Stack:** Astro (latest stable) + Tailwind CSS. Static output. No React/Vue islands unless a component truly requires interactivity (mobile nav toggle and FAQ accordions may use minimal vanilla JS or Astro islands).
- **Hosting target:** Netlify. Include `netlify.toml`. Forms via **Netlify Forms**.
- **Pages (11):** index, services, trade (International Trade & Freight Forwarding), industries, why-leadvault, tools, data-catalog, about, pricing, contact, thank-you. Clean URLs (`/services`, not `/services.html`).
- **Design tokens (v3 — client-specified exact brand colors, supersedes v2/v1 below):**
  - Backgrounds (near-black): `--color-bg` #0A0B0D (base) / `--color-bg-mid` #22262E (alternate-section / card / header tier) / `--color-bg-dark` #000000 (deepest — footer).
  - Accents — exact client spec, from the "LEAD"/"VAULT" wordmark: `--color-cyan` #00D9FF "Electric Cyan / Neon Blue" — **every button/CTA uses this** (`.btn-primary`, `.btn-outline` accent, focus rings, the skip-to-content link), with `--color-cyan-ink` #04141A as the dark text color used on cyan fills, never white (contrast ~1.6:1, fails AA); `--color-lime` #B7FF00 "Neon Lime Green" — all non-button emphasis text/UI (eyebrows, active nav state, links, stat numbers, icon tints, badges, highlight rings) with `--color-lime-dark` #0B1400 as the dark text on lime fills (badges/pills). `--color-green` #86D30B kept as a tertiary accent (unrelated to the two named brand colors; used sparingly, e.g. icon variety) — do not expand its usage without a reason.
  - Text: white/near-white (#F5F7FA) on dark. All text/background pairings must pass WCAG AA (4.5:1 normal text, 3:1 large text/UI) — verified against this exact palette (automated axe-core scan, 0 violations across all 11 pages); re-verify if any token value changes.
  - Section rhythm: alternate `--color-bg` and `--color-bg-mid` section-by-section site-wide (plus a border and/or elevation at the seam) so adjacent sections are visually distinguishable at a glance — not two same-shade sections back to back.
  - Font: Inter (self-hosted via `@fontsource/inter` — no external Google Fonts request). Professional, data-driven aesthetic; generous spacing; strong typographic hierarchy.
  - *(v2 tokens, kept for history only — no longer in use: `--color-lime` #EAFF00, `--color-cyan` #00D9EC, no cyan/lime role split. v1: backgrounds #0A1F44 / #12315F / #081833; accent #1DBF9F "verified teal"; text-on-accent #04342C.)*
- **Layout:** shared `BaseLayout.astro` with sticky header — visually distinct from the hero/body (its own background tier + bottom border + elevation, never blending into whatever section sits under it) — containing logo left, nav, cyan "Get My Free Recommendation" button linking to /contact. Nav is grouped, not flat: Home · Solutions ▾ (Services, Trade Desk, Industries, Data Catalog) · Why LeadVault · Company ▾ (About, Tools & Technology) · Pricing · CTA button. Dropdowns are keyboard-operable (button + `aria-expanded`, arrow-key/Escape support) with a matching mobile (accordion-style) structure under 1024px. Footer exactly as written in the copy doc.
- **Logo:** real logo at `/logo/logo.png` — a rectangular wordmark lockup (shield+padlock mark + "LEAD" in cyan + "VAULT" in lime, transparent background, 2172×724 / exactly 3:1). Optimized web copy lives at `public/logo.png` (~14KB, well under the ~40KB budget, rendered at 900px wide, retina-sharp) and is used in the header and footer via `Logo.astro` — the single point of change if the asset is swapped again. `/logo/logo.svg` is an earlier square badge mark, superseded by the wordmark lockup and no longer copied into `public/`. Favicons wired in `BaseLayout.astro`'s `<head>`: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`.
- **Icons:** lucide (use `@lucide/astro` or inline SVGs from Lucide). Icon-to-section mapping is in the handoff brief §2. Never use emoji as UI icons.
- **Images:** no photos are provided yet (logo/favicons excepted). For every photo slot in the copy doc's IMAGE notes, render a styled placeholder: dark gradient block (background tokens above) with a subtle grid pattern and a small caption of what belongs there (e.g., "IMAGE: container port at dusk"). Use an `<Image>`-ready component structure so real photos drop in later without layout changes. Apply a duotone overlay class (background tokens above) that will sit on all future photos.
- **Home hero graphic:** `leadvault-globe-animated.svg` (project root) is a finished, client-provided asset — accurate world geography, multicolor countries, built-in SMIL-animated arcs, and labeled/glowing nodes for USA/UK/Canada/Nigeria/Worldwide. It is inlined into the hero exactly as delivered (via a Vite `?raw` import + `set:html`, never regenerated or hand-redrawn), filling the hero's entire right-hand column edge-to-edge on desktop and scaling to full width below the headline on mobile without cropping. Its SMIL `<animate>` elements aren't reachable by CSS `prefers-reduced-motion`, so `HeroWorldGraphic.astro` handles that itself via the SVG DOM's native animation API (`pauseAnimations()`/`setCurrentTime()`) — freezing the graphic in its fully-drawn-in state for reduced-motion users without touching the SVG file's own markup, colors, or labels.
- **Charts (Home stats section):** coded, not images. Use inline SVG or Chart.js (prefer lightweight inline SVG): one bar chart (deliverability), one simple world-coverage motif, animated counters (IntersectionObserver, vanilla JS). Placeholder numbers from the copy doc, clearly kept as-is.
- **Comparison tables** (Home + Why LeadVault + Trade pages): true HTML tables, styled, horizontally scrollable on mobile.
- **Data Catalog cards:** each card's "Request This Dataset" button links to `/contact?need=<category-slug>`; the contact form's "What do you need?" select pre-fills from that URL parameter via a few lines of vanilla JS.
- **Contact form:** all 12 fields exactly as in the copy doc. Netlify Forms (`data-netlify="true"`, form name `lead-survey`), honeypot field (`netlify-honeypot`), required-field validation, success redirect to `/thank-you`.
- **/thank-you page:** short confirmation message ("Your recommendation is on its way within 24 hours") + links back to Services and the Trade page. This page fires conversion events (below). Add `noindex`.
- **Analytics:** in `BaseLayout.astro`, add clearly-commented slots:
  - GA4 snippet with `G-XXXXXXXXXX` placeholder constant at the top of the layout file.
  - Meta Pixel snippet with `PIXEL_ID_TBD` placeholder constant.
  - On /thank-you only: fire GA4 `generate_lead` event and Meta `Lead` event (guarded so they no-op while IDs are placeholders).
- **SEO:** per-page `<title>` + meta description from the copy doc; canonical URLs; Open Graph + Twitter card tags (generate a simple branded OG image as an SVG-rendered PNG or static asset); `@astrojs/sitemap`; `robots.txt`; semantic HTML (one h1 per page); descriptive alt text on all image slots; JSON-LD Organization schema on the homepage (name LeadVault, url https://leadvaultdata.com, founder Idowu Ehimigbai).
- **Performance/accessibility:** target Lighthouse 90+ all categories. No render-blocking third-party scripts (analytics deferred). Visible focus states; color-contrast-safe text on the dark background tokens (WCAG AA — see Design tokens above).
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
