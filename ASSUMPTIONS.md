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

## Design review round 2 (exact colors, new logo, provided hero globe)

- **"Text in lime, shared using judgement of color balance" interpreted as: keep the
  existing accent grouping, don't force cyan into new spots.** The client's instruction
  split colors by role (cyan = buttons, lime = text) but asked for judgment on
  balance. Round 1 had already established a restrained two-color accent system where
  everything non-button (eyebrows, links, active nav, stat numbers, icon tints,
  badges, highlight rings) uses one accent consistently. Rather than manually
  reassigning some of those elements to cyan for "variety," left them all on lime —
  introducing cyan into text/highlight spots would blur the cyan = "click here" signal
  buttons now carry, which is worse balance, not better. The one exception: the
  skip-to-content link and focus-visible ring moved to cyan, since they're functionally
  button-like (interactive affordances a keyboard user activates), not display text.
- **`--color-green` (`#86D30B`) kept as-is, unexpanded.** The client's two named colors
  (cyan for LEAD, lime for VAULT) don't mention a third color, but round 1's tertiary
  green accent (sampled from the original logo's padlock) is still used sparingly for
  icon-color variety and wasn't asked to be removed. Left it alone rather than either
  ripping it out (not requested) or expanding its use (not requested either).
- **Logo sized by height, not forced to a fixed width**, in `Logo.astro`/`Header.astro`/
  `Footer.astro`, because the new asset's exact aspect ratio (2172×724, precisely 3:1)
  means height-based sizing (`h-9 sm:h-10 lg:h-12` in the header, `h-12` in the footer)
  keeps it crisp and proportional at every breakpoint without separate width rules.
  Reduced the header height from round 1's square-badge sizing (`h-12 sm:h-14`) since
  the wordmark is 3× wider than it is tall — at the old height it would have crowded
  the nav links.
- **`/logo/logo.svg` (the old square badge) is no longer copied into `public/`.**
  It's superseded by the new rectangular PNG lockup and nothing references it anymore;
  leaving a stale, unused, differently-branded asset sitting in `public/` would be
  actively misleading to whoever opens the repo next. The file stays in `/logo/`
  (source folder, not deployed) for history — not deleted, just not shipped.
- **`leadvault-globe-animated.svg` stays at the project root, not moved into `public/`**,
  even though the client's message named `public/leadvault-globe-animated.svg` as its
  location (it was actually already sitting at the project root when delivered — not
  in `public/`). Since it's inlined directly into the HTML at build time (Vite `?raw`
  import), it never needs to be served as its own URL, so `public/` isn't the right
  place for it — same reasoning as `/logo/` staying out of `public/`. `HeroWorldGraphic.astro`
  imports it from the root by relative path.
- **Reduced-motion handling required a different mechanism than the rest of the site.**
  Every other animation on this site is CSS-based, so `@media (prefers-reduced-motion:
  reduce)` handles it everywhere else. This SVG's animations are authored as SMIL
  `<animate>` elements, which that media query cannot reach at all — a CSS rule
  targeting the inlined `<svg>` would silently do nothing. Used the SVG DOM's own
  animation-control API (`pauseAnimations()` / `setCurrentTime()`) instead, called from
  a small script that checks `matchMedia('(prefers-reduced-motion: reduce)')`. Verified
  this actually works with a Playwright test (`reducedMotion: 'reduce'` context) rather
  than assuming it did, since SMIL control from JS is a less common pattern than CSS
  media queries and worth confirming directly.
- **Chose to jump the timeline to a fixed offset (`setCurrentTime(6)`) rather than
  simply pausing at whatever the current time happened to be.** Pausing immediately on
  page load would freeze the one-time arc-drawing reveals mid-stroke (arcs partially
  invisible, since they animate `stroke-dashoffset` from hidden to fully drawn). `6`
  seconds is past every arc's `begin + dur` (the latest finishes at 4.5s), so
  reduced-motion users still see the complete, correctly-drawn graphic — just static
  instead of animating in.

## Round 3 (real pricing + real photos + real catalog samples)

- **Real prices were supplied by the client and adopted verbatim**, replacing every
  bracketed `[X]`/"confirm" pricing placeholder in `pricing.astro` and `services.astro`
  (subscriptions, per-record datasets, list cleaning, managed email campaigns, Trade
  Desk, agency plans, replacement-guarantee percentage). These are deliberately priced
  below US/European equivalents, per the client's positioning — added a line on the
  Pricing hero making that explicit. One stale figure caught in a consistency pass:
  Services page listed the Monthly Subscription add-on at "From $199/month" (the old
  STARTER price); corrected to $129/month to match the new `pricing.astro` STARTER
  tier. The FAQ's payment-methods bracket (`[payment methods — confirm: card / PayPal /
  bank transfer]`) and the `[X]`-style stats in `StatsSection.astro` were left as-is —
  no real values were supplied for either, and CLAUDE.md forbids inventing them.
- **Three real photos were supplied** (container port at dusk, founder portrait,
  multi-monitor engineering desk) to fill three of the copy doc's IMAGE slots. Source
  originals live in `/photos/` (mirroring the existing `/logo/` convention — raw
  assets outside `src/`), optimized into `public/photos/*.jpg` by a new
  `scripts/generate-photos.mjs` (mirrors `generate-brand-assets.mjs`'s sharp pattern;
  run via `npm run generate:photos`). `ImagePlaceholder.astro` now accepts an optional
  `src`/`alt`/`width`/`height`; when present it renders a real `<img>` inside the same
  `.lv-photo-frame`/`.lv-duotone` wrapper instead of the placeholder graphic, so the
  duotone treatment applies automatically with no per-photo styling — exactly the
  drop-in path the component's original comment anticipated. Wired into the Home
  founding-story slot, the About founder-portrait slot, and the Tools workshop-hero
  slot. The Trade page's port/aircraft slot, the Contact strategist slot, and the
  Tools terminal-screen slot remain placeholders — no matching photo was supplied for
  those (the provided port photo's caption matches Home's slot exactly, not Trade's
  differently-worded one, so it wasn't reused there).
- **Picked one of three supplied engineering-desk photo variants**, since the single
  Tools workshop-hero slot only fits one image. Rejected one variant outright — it
  prominently features a Guy Fawkes/Anonymous mask on the desk, which reads as
  "hacker" iconography and actively undercuts a B2B data-compliance brand. Rejected a
  second — it's a church/media-production editing setup (video timeline, "FAITH x
  WORKS" project), off-topic for an "engineering desk." Chose the third: a clean
  multi-monitor coding setup in moody dark-blue tones with no distracting props,
  matching the copy doc's caption directly.
- **Catalog sample CSVs became real per-category preview tables**, not another styled
  placeholder. The client supplied 11 fictional sample CSVs (one per Data Catalog
  category, structure modeled on real LeadVault datasets, identities invented,
  emails/phones pre-masked — see `src/data/catalog-samples/README.md`) specifically
  "to be rendered as preview tables." Moved them into `src/data/catalog-samples/`,
  added a small hand-rolled CSV parser (`src/lib/csv.ts` — RFC4180-style, handles
  quoted fields with embedded commas, since the recruitment-targets sample has a
  comma-separated skills list inside quotes) and parse each at build time in
  `src/data/catalog.ts`. Each Data Catalog card now renders the first 4 sample rows
  via the existing `ComparisonTable` component (reused as-is — its
  `{headers, rows, caption}` shape was already exactly what a parsed CSV produces)
  instead of the generic `ImagePlaceholder` "Sample: {name}" block. Every card also
  carries a visible "illustrative, not real customer data" caption, both for honesty
  and because the sample README explicitly warns never to present these as real
  customer records.
- **Two layout bugs surfaced by an actual browser check (Playwright), not caught by
  `npm run build` alone**, since a static-output build only proves the HTML compiles,
  not that it lays out correctly:
  1. The new Data Catalog sample tables (7–9 columns, `min-w-[640px]`) blew out their
     `.card` grid item's width instead of scrolling inside `.table-wrap`'s
     `overflow-x-auto` — a classic flex/grid "children don't shrink below content size
     unless told to" issue, since grid/flex items default to `min-width: auto`. On
     mobile this made the whole page scroll horizontally, cutting off the "Request This
     Dataset" button past the viewport edge. Fixed by adding `min-w-0` to the catalog
     card (`data-catalog.astro`) so it can shrink to its grid track and let the inner
     table-wrap do the scrolling, as designed.
  2. The About page's founder-portrait `ImagePlaceholder` collapsed to ~2×3px — invisible
     — because its wrapper combines `aspect-[3/4]` with only `max-w-sm` (a max-width, not
     a width) while its only child is `position: absolute` (so contributes no in-flow
     content size for the grid item to size against). This is a pre-existing bug in the
     page (not introduced this round) that a styled-but-empty placeholder never exposed
     visually; only became obvious once a real photo needed to render there. Fixed by
     adding `w-full` alongside `max-w-sm` so the frame has a definite width to stretch to
     before `max-width` caps it. Every other `ImagePlaceholder` call site was checked —
     none else combines a bare `max-w-*` with no `w-full`, so this was the only instance.

## Round 4 (client feedback on round 3)

- **Duotone filter removed from real photos, kept on placeholders.** The client wants
  real photos shown at true color/brightness, not tinted. `ImagePlaceholder` now only
  applies the `.lv-duotone` class when rendering the placeholder graphic (no `src`);
  real `<img>` elements get the plain `.lv-photo-frame` treatment (rounded corners,
  border, no filter/gradient overlay). Placeholder blocks keep the duotone tint since
  no complaint was raised about those and CLAUDE.md's original placeholder spec still
  calls for it there.
- **Removed the visible "Sample preview — illustrative, not real customer data." line**
  from every Data Catalog card per client request. The screen-reader-only `<caption>`
  on each `ComparisonTable` (same wording) was left in place — it's visually a 1×1px
  element, invisible on screen, so it doesn't reintroduce the clutter the client
  flagged, while still disclosing the data is illustrative to assistive-tech users.
- **SME & Startup Databases sample reordered for Company Size variety**, not stripped.
  The first 4 rows previously all showed "11-50" (an artifact of the source CSV's row
  order, not a data problem), which read as fake/repetitive. Reordered the 8 existing
  fictional rows (no new data invented) so the visible 4-row preview shows 3 of the
  sample's 3 distinct size bands instead of 1. Chose reordering over deleting the
  column since Company Size is a real, useful field this category offers.
- **Fixed a Services-page layout bug the client spotted twice as "unexplained empty
  space."** First pass added `items-start` to the 2-column CSS Grid, which stopped the
  short "Custom Fresh Datasets" card from stretching its own border/background to match
  its much longer row-mate ("Managed Email Campaigns," a 6-item list plus two
  paragraphs) — but the grid *row* was still exactly as tall as its tallest item, so a
  visible gap remained below the short card, just outside it instead of inside it.
  Root cause: any row-based 2-column grid with wildly uneven card lengths will leave a
  gap somewhere as long as cards are locked to shared row heights. Replaced the grid
  with a CSS multi-column layout (`columns-1 lg:columns-2` + `break-inside-avoid-column`
  on each card) — true masonry packing, where each column fills independently to its own
  balanced height instead of being paired row-by-row with whatever card happens to sit
  next to it in the source order. Verified at 1440px (2 columns, no gaps), 813px
  (single column, below the `lg` breakpoint), and 375px (single column, stacked).
