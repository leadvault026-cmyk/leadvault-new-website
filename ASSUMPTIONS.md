# ASSUMPTIONS

Judgment calls made while building Phase 1, per CLAUDE.md's instruction to record
assumptions and keep going rather than stopping to ask. Nothing here changes prices,
statistics, or copy — those stay exactly as bracketed placeholders per the copy doc.

## Content & copy

- **Bracketed stats stayed literal, not animated as numbers.** The Home "Data In
  Numbers" section's figures ("[X]+ years", "[X,XXX]+", "[XX]%", "[X] continents") are
  placeholders, not real numbers — CLAUDE.md forbids inventing statistics. CLAUDE.md
  also asks for "animated counters (IntersectionObserver, vanilla JS)". Since you can't
  count up to "[X]+", the four stat cards instead fade/slide into view on scroll (a real
  IntersectionObserver-driven reveal), and the reusable count-up engine only activates
  once a card gets a real numeric `data-target` value. The deliverability bar chart is
  similarly illustrative — captioned as such — since its height would otherwise imply a
  real number that doesn't exist yet.
- **Legal page links render as inert, greyed-out labels**, not working links, in the
  footer ("Legal" column) and the About page's "Data Handled Professionally" section.
  The copy doc explicitly notes legal pages are "drafted separately for lawyer review"
  and out of Phase 1 scope, and CLAUDE.md says not to add pages beyond the 11 listed —
  so there's nowhere for these links to go yet. They carry a "Coming soon" tooltip.
- **Country dropdown list** (Contact page) wasn't specified beyond "(dropdown)" in the
  copy doc. Built a full country list, with the four named core markets (USA, UK,
  Canada, Nigeria) pinned to the top — see `src/data/countries.ts`.
- **Hero image slot became a coded graphic, not a placeholder block.** The copy doc's
  hero IMAGE note offers two options — "world map with connection lines… or a live-style
  data dashboard" — and the handoff brief marks the coded-SVG route "Recommended" to
  avoid photo sourcing entirely. Built an animated SVG world-arc graphic
  (`HeroWorldGraphic.astro`) instead of a photo placeholder, unlike the other IMAGE
  notes (container port, founder portrait, etc.), which do render as placeholders since
  they're genuinely photos to be sourced later.
- **Tools page consolidated to two placeholder photos**, not six. The copy doc's
  page-level note lists "6 technical illustrations + workshop hero," but doesn't specify
  six distinct placements, and the six toolbox items already carry Lucide icons. Used
  one hero placeholder + one supporting placeholder rather than six near-duplicate
  blocks.

## Forms

- **Newsletter signup (footer) and portal waitlist (Data Catalog) are separate Netlify
  Forms**, distinct from the main `lead-survey` form, since CLAUDE.md designates Netlify
  Forms as the site's form mechanism without limiting it to one form. Neither redirects
  to `/thank-you` or fires the GA4/Meta conversion events — those are reserved for the
  actual lead survey, so newsletter/waitlist signups don't inflate lead-conversion counts.
- **Catalog → Contact pre-fill maps by category, not 1:1.** The "What do you need?"
  dropdown only has 6 generic options (from the copy doc), while the Data Catalog has 11
  specific dataset categories. `?need=<category-slug>` sets the dropdown to "Fresh custom
  dataset" by default (or "Find buyers/suppliers (Trade Desk)" for the trade-counterparty
  and Trade Desk categories, and "Custom data project" for the fully-custom category),
  and additionally pre-fills the "ideal customer/counterparty" text field with the
  category name so the specific request isn't lost. See `src/data/catalog.ts`.
- **Contact page hides its image placeholder below `lg`** (mobile/tablet) to keep the
  12-field form the priority on small screens rather than pushing it further down.

## Design system

- **Header nav shows 9 of the 10 "Explore" links** (grouped into Solutions/Company
  dropdowns as of the design review — see below); "Get Started" is represented by the
  sticky CTA button (linking to `/contact`) instead of a duplicate text link, per
  CLAUDE.md's "nav, CTA button linking to /contact." The footer's "Explore" list
  still carries all 10, verbatim, per the copy doc.
- **Logo was a single component** (`src/components/Logo.astro`) referenced everywhere
  from the start specifically so the real logo could replace the text wordmark in one
  place later — done in the design review round, see below.
- **Duotone overlay** is a reusable `.lv-duotone` CSS class applied to every image slot
  now (on the placeholder blocks) and automatically to any real `<img>` dropped into that
  same wrapper later — no per-photo styling work needed at launch.

## Design review round 1 (rebrand + hero + nav)

- **Palette values came from two sources, reconciled.** `/logo/logo.png` was sampled
  programmatically (histogram of saturated pixel clusters) to find the accent hues;
  `/logo/logo.svg`'s explicit gradient stops then gave exact hex values for the same
  colors (more precise than raster sampling). Where they diverged slightly, the SVG's
  values won (e.g. lime landed on `#EAFF00`, not the sampled `#EEFF00`).
- **CSS custom property names were renamed, not just re-valued**, in a project-wide
  mechanical pass (`--color-navy*` → `--color-bg*`, `--color-teal*` → `--color-lime*`,
  `.btn-teal` → `.btn-primary`). Kept the tokens' *names* honest rather than leaving
  `--color-teal` holding a lime-yellow value — a maintainer reading the CSS six months
  from now shouldn't have to know the rebrand history to trust a variable's name.
- **WCAG AA contrast needed a second pass after the initial rebrand.** Hand-verified
  the core palette (lime/cyan/green/white against both background tiers) before
  building anything, but the `text-white/40` and `/45` utility classes used throughout
  for de-emphasized captions, notes, and footer legal labels only hit ~3.65–4.26:1 —
  below the 4.5:1 normal-text minimum. Caught by running an automated axe-core
  color-contrast scan against all 11 rendered pages (not just spot-checking), which
  found 11 real violation groups the manual token-pair math had missed because it
  didn't account for opacity-based utility classes. Fixed by raising the floor to
  `text-white/50` (verified ≥4.93:1 against the lighter `bg-mid` tier) everywhere,
  site-wide, then re-scanned to confirm zero violations across all pages.
- **favicon.ico didn't exist in `/logo`** (only `favicon.png`, `favicon.svg`,
  `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`). Generated it from
  the 16×16 and 32×32 PNGs via the `png-to-ico` package (new devDependency) in
  `scripts/generate-brand-assets.mjs`, since the design review explicitly required
  `favicon.ico` to be wired up.
- **Logo used as a badge/icon mark, not paired with separate text.** The provided logo
  is a circular badge with "LEADVAULT" already lettered inside it — the design review
  said "replace the text wordmark... with the real logo," so `Logo.astro` renders only
  the image (no adjacent text recreation). At header size (~48px) the internal lettering
  reads as texture/brand-recognition rather than literal text, which is normal for
  badge-style logos in nav bars; it's fully legible at the larger footer size (~64px).
- **Hero graphic's node positions and "world map" are stylized, not geographically
  accurate.** USA/UK/Canada/Nigeria/Worldwide are arranged for visual balance across
  the canvas, not real relative geography — consistent with the original build's
  approach and the handoff brief's "world-arc graphic" framing rather than a literal map.
- **Section-alternation fixes favored merging over adding bands** where two adjacent
  same-tone sections were really one continuous thought (e.g. About's hero heading +
  founding story, Why LeadVault's hero + "Two Models" cards) — merged into a single
  section rather than forcing an artificial color band between them. Where sections
  were genuinely distinct content blocks (Pricing's four pricing tables, Tools'
  toolbox grid), gave them their own `bg`/`bg-mid` tier instead.

## Technical

- **Tailwind v4** (not v3) via `@tailwindcss/vite`, since it's the current stable major
  version and Astro 7 supports it directly — CLAUDE.md just says "Tailwind CSS," not a
  version.
- **FAQ accordion uses native `<details>/<summary>`**, not JavaScript, satisfying
  CLAUDE.md's "may use minimal vanilla JS" allowance with zero shipped JS. Mobile nav
  toggle does use a small vanilla-JS script, since a true hamburger open/close needs it.
- **OG image is a generated PNG** (`public/og-image.png`), composited from the real
  logo (rasterized from `/logo/logo.svg`) over a coded background via `sharp`
  (`scripts/generate-og-image.mjs`, `npm run generate:og`) — per CLAUDE.md's
  "SVG-rendered PNG" instruction. Re-run the script any time the brand mark or
  tagline changes.
- **`netlify.toml` includes a custom 404 page** (`src/pages/404.astro`) even though it's
  not one of the 11 listed pages — it's a utility page Netlify/browsers expect, not
  marketing content, so it doesn't conflict with "don't add pages beyond the 11."
