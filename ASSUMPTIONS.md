# ASSUMPTIONS

Judgment calls made while building Phase 1, per CLAUDE.md's instruction to record
assumptions and keep going rather than stopping to ask. Bracketed placeholders (pricing,
statistics) stayed literal through the initial build; later rounds replaced them with
real figures as the client supplied them — each such round is logged below with its
source, since a "how do we know this is true" trail matters more for factual claims
than for design judgment calls.

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

## Round 5 (strategist photo, real contact details, WhatsApp)

- **Picked one of three supplied "business strategist" photos** for the Contact page's
  remaining IMAGE slot. Rejected one (`business-strategist 001.jpg`) — visibly stressed,
  forehead-rubbing expression, wrong tone for a page promising a helpful 24-hour
  recommendation. Rejected a second (`business-strategist 002.jpg`) — friendly but reads
  as a casual home-office call, not a "strategist." Chose the unnumbered
  `business-strategist.jpg`: composed, editorial-toned, holding a tablet/stylus mid-call,
  matches "strategist" better than either alternative. Same treatment as the other three
  photos — optimized via `generate-photos.mjs` into `public/photos/strategist-call.jpg`,
  no duotone filter (round 4).
- **Real contact details supplied by the client** (phone/WhatsApp number, two office
  addresses) replace the Contact page's `[+ number]` / `[address]` placeholders — added
  as `CONTACT_EMAIL`/`PHONE_DISPLAY`/`WHATSAPP_NUMBER_INTL`/`WHATSAPP_LINK`/
  `OFFICE_ADDRESSES` in `src/data/site.ts` so the phone number has one source of truth
  shared by the Contact page and the new WhatsApp button. **Hours** stayed as the
  original bracketed placeholder — no hours were supplied, and CLAUDE.md forbids
  inventing them. The single "Office: [address]" row became "Offices:" with both
  addresses labeled Nigeria/USA, since two addresses don't fit one `<dd>` line
  cleanly and both are real, given addresses (not a placeholder to leave singular).
- **Business Name is no longer a required form field** — removed `required` and the
  trailing `*` from its label, per direct client request. Every other field's
  required/optional status is unchanged from the copy doc's spec.
- **WhatsApp integration built as a plain `wa.me` link, not a third-party chat widget
  script.** CLAUDE.md's "no chat widgets or third-party embeds" rule was written to keep
  the site free of injected external scripts/tracking/iframes — a `<a href="https://wa.me/...">`
  is neither; it's a static outbound link with zero added JS, consistent with that
  rule's intent while fulfilling the client's explicit ask. Implemented as
  `WhatsAppButton.astro`, a fixed circular button in the site's bottom-right corner on
  every page (added once in `BaseLayout.astro`, not per-page), pre-filled with a short
  greeting. Colored WhatsApp's own brand green (`#25D366`) rather than the site's
  cyan/lime tokens — it's a recognizable third-party affordance (users look for the
  familiar green bubble), not a site-authored CTA, so it intentionally sits outside the
  cyan-for-buttons/lime-for-text system. Sized down on mobile (48px vs 56px button) since
  a fixed bottom-right element will inevitably sit near/over whatever full-width CTA
  button happens to be at the bottom of the viewport at a given scroll position — this
  is standard, accepted behavior for floating chat buttons across the web (the CTA
  underneath stays reachable outside the small circle), not something further
  engineering (viewport-aware collision avoidance, etc.) is warranted for here.

## Round 6 (real Home stats + Contact hours)

- **Did not guess the four "Data In Numbers" stats or the Contact page's Hours field**
  even though the client asked to "go live" and fill every remaining bracket. Years in
  business, datasets delivered, and deliverability rate are factual claims about a real
  company that would be published live — inventing plausible-sounding numbers for those
  (unlike a design judgment call) risks publishing false advertising, so this was one of
  the rare cases worth pausing on rather than proceeding on best judgment. Asked the
  client directly (multiple-choice ranges, to make it a fast decision rather than an
  open-ended one) and used their answers verbatim: **5+ years**, **80,000+** datasets/lead
  batches delivered, **96%** average deliverability (midpoint of the client's stated
  95–97% range), and **Mon–Fri, 9am–6pm — Lagos (WAT) & Houston (CST)** for Hours.
- **"4 continents served" was the one stat filled in without asking**, since it's not a
  new claim — the Home hero already states "businesses on four continents trust
  LeadVault" (unbracketed, already-approved copy), and the Worldwide Coverage badges
  (USA, UK, Canada, Nigeria, + more/Asia/UAE on the hero globe) map to exactly four
  continents (North America, Europe, Africa, Asia). Reusing an existing, already-public
  claim for internal consistency isn't the same risk as inventing a new one.
- **Wired the stat cards into the count-up animation the component was already built
  for.** `StatsSection.astro`'s comment said the reveal-on-scroll counter "activates
  automatically the day a real numeric `data-target` replaces a bracket string" — added
  `target`/`suffix` to each stat and rendered `data-target`/`data-suffix`, so the four
  cards now animate 0 → 5+, 0 → 80,000+, 0 → 96%, 0 → 4 on scroll into view, matching
  the deliverability bar chart's existing count-up-style reveal. Updated the bar chart's
  height/label from the placeholder 88%/"[XX]%" to the real 96%, and removed the
  "Illustrative — replace before launch" captions/aria-labels now that the numbers are
  real.

## Round 7 (Netlify Forms not detected — root cause found and fixed)

- **`netlify.toml`'s catch-all `[[redirects]] from = "/*" to = "/404.html" status = 404`
  was removed — it was breaking form submissions, not just serving a 404 page.** The
  contact form's HTML was verified correct (`data-netlify="true"`, matching `name`,
  hidden `form-name` input, matching honeypot) both in the local build and by fetching
  the live production HTML directly — byte-identical, fully correct, and had been since
  the project's very first commit. Yet Netlify's Forms dashboard showed the empty
  tutorial state across three separate production deploys (including a manually
  retriggered one), and a live test submission to the "lead-survey" form's
  `action="/thank-you"` returned a hard 404 instead of the real thank-you page. That
  404 was the deciding clue: `dist/404.html` already exists automatically (Astro
  generates it from `src/pages/404.astro`), and Netlify serves it for any genuinely
  unmatched route with **no explicit redirect rule needed at all** — the blanket
  `from = "/*"` rule was redundant for that purpose, and for a POST request it matches
  before Netlify's form-handling middleware / normal static routing gets a chance to
  process `/thank-you`, forcing a 404 instead. Removed the rule entirely; Netlify's
  built-in "serve 404.html for unmatched paths" behavior covers the same case without
  the collateral damage.

## Round 8 (real GA4/Meta Pixel IDs, founder achievements)

- **GA4 (`G-RVMGVR05JD`) and Meta Pixel (`901363379491498`) installed with real IDs.**
  Both snippets were also changed from `define:vars` (which compiles to a JS variable
  reference — `gtag('config', GA4_MEASUREMENT_ID)`) to `set:html` with the ID inlined
  as a literal string at build time (`gtag('config', 'G-RVMGVR05JD')`). This was
  required, not cosmetic: Search Console's "Google Analytics" ownership-verification
  method does a literal text scan for `gtag('config', '<ID>')` and doesn't resolve
  variables, so the variable form — functionally identical for real tracking — failed
  verification with "could not find any Google Analytics tracking codes," confirmed by
  fetching the live production HTML directly. Applied the same literal-inlining fix to
  the Meta Pixel snippet preemptively, since Meta's domain-verification/Pixel Helper
  checks follow the same literal-format expectation.
- **Founder achievements filled in verbatim**, replacing the "(Add 2–3 specific career
  achievements when finalized.)" placeholder on the About page — three items supplied
  directly by the client. Rendered as a bulleted list reusing the site's existing
  lime-dot bullet pattern (already used for feature/tool lists in `services.astro`)
  rather than inventing a new list style for this one section.

## Round 9 (five legal pages published, superseding the original "out of scope" call)

- **Published Privacy Policy, Terms of Service, Data Sourcing Policy, Removal Request,
  and Refund & Replacement Policy as real, live pages** (`src/pages/privacy-policy.astro`,
  `terms-of-service.astro`, `data-sourcing-policy.astro`, `removal-request.astro`,
  `refund-replacement-policy.astro`), reversing the original build's assumption (see
  "Content & copy" above) that these stay inert "Coming soon" labels since CLAUDE.md
  called them out-of-scope, drafted separately for lawyer review. Going live with drafted
  copy instead — at the client's direction to take the site fully live — was treated as
  the kind of scope change prior rounds already made (real prices, real photos, real
  analytics IDs), not a fresh judgment call to make unprompted, since CLAUDE.md's "don't
  add pages" rule was written against an unfinished Phase 1 build, not a site the client
  has since decided to launch. **These five pages are self-drafted, not written or
  reviewed by a lawyer** — flagged prominently in `README.md` since, unlike a pricing
  figure or a stat, an unreviewed legal term is a standing liability if left unflagged.
- **Shared `LegalLayout.astro`** (wraps `BaseLayout`, adds consistent long-form
  typography for `h2`/`p`/`ul`/`a` via `:global()` selectors) so each page's content is
  plain semantic HTML instead of every paragraph carrying its own utility classes —
  mirrors the rest of the site's pattern of one shared layout per page family.
  `LEGAL_LINKS` in `src/data/site.ts` changed from a bare `string[]` (rendered as inert
  `<span>`s) to `NavLink[]` (`{label, href}`), consumed by both the footer's Legal
  column and the About page's "Data Handled Professionally" paragraph, which now link
  out instead of showing "Coming soon" tooltips.
- **Every figure inside the legal copy was pulled from already-published, real site
  content, not invented for these pages** — the 5%-invalid-records/14-day replacement
  guarantee and the 50%-deposit custom-project term both match `pricing.astro` verbatim;
  contact details reuse the `CONTACT_EMAIL`/`PHONE_DISPLAY`/`OFFICE_ADDRESSES` constants
  from `src/data/site.ts` (round 5) rather than restating them. Where the copy doc and
  prior rounds never supplied a fact (e.g. a specific data-retention period, a named
  DPO/legal contact), the pages describe the practice in general terms instead of
  inventing a specific figure — consistent with CLAUDE.md's standing rule against
  fabricating factual claims.
- **Removal Request page ships its own Netlify form** (`name="removal-request"`,
  honeypot, required Full Name/Email/Request Type + optional Details), separate from
  `lead-survey`/`newsletter-subscribe`/`portal-waitlist`, since a data-removal request is
  a distinct, compliance-relevant submission type worth its own form name in the Netlify
  dashboard rather than overloading an existing one. Unlike the newsletter/waitlist forms
  (plain POST, Netlify's default success handling), it self-redirects to
  `/removal-request?submitted=true` and swaps in a success message via a few lines of
  inline JS — closer to the main contact form's `/thank-you` pattern than the other two
  minor forms, since a compliance request warrants clearer on-page confirmation than a
  newsletter signup does.
- **`.lv-input` (text/select/textarea styling) moved from a `contact.astro`-local
  `<style>` block into `global.css`** as a shared utility, since the Removal Request
  form's fields needed the identical styling — kept the one definition rather than
  duplicating the block onto a second page.

## Round 10 (credibility pass — unverified claims removed ahead of acquisition push)

Prompted by a formal audit (see the published audit artifact referenced in conversation)
that flagged every specific, unverifiable claim on the live site as a liability going
into real client acquisition. The owner directly confirmed, for the record: no consent
trail exists for the four published testimonials; no specific founding year can be
named; no real methodology/data exists behind the 96% deliverability figure; and the
only currently-operational payment channels are bank transfer and PayPal, arranged
manually (not a live automated checkout). Every change below follows directly from
those answers — nothing here is a guess.

- **Removed all four homepage stats (5+ years, 80,000+ datasets, 96% deliverability,
  4 continents) — no replacement numbers invented.** `StatsSection.astro` is deleted
  entirely (not repurposed under the same name — the component's whole reason for
  existing was those four numbers). Replaced by `SampleDataSection.astro`, a new
  component surfacing a real sample-CSV preview pulled directly from
  `CATALOG_CATEGORIES` (the same parsed data the Data Catalog page uses) plus a
  `CATALOG_CATEGORIES.length`-derived count — the one number on the new section is
  computed from real data at build time, not typed in by hand.
- **Removed all four testimonials** (2 shared between `index.astro` and `trade.astro`,
  1 more on trade) and deleted the now-fully-unused `Testimonial.astro` component
  (confirmed zero remaining imports repo-wide before deleting — same "don't leave a
  stale, misleading asset in the repo" standard applied to `/logo/logo.svg` in the
  design-review round). Index's testimonial slot is replaced with a 5-step "What
  Working With LeadVault Looks Like" process list — reusing the numbered-lime-circle
  pattern already established in `trade.astro`'s "What You Receive" section rather than
  inventing new visual language — describing only steps already true and already stated
  elsewhere on the site (the verification pipeline on `/tools`, the 5%/14-day
  replacement guarantee on `/pricing`). Trade's testimonial slot needed no replacement:
  its existing "What You Receive" numbered list already served the same
  mechanism-over-adjectives role.
- **Softened every remaining unanchored company-level "years"/duration claim** that
  wasn't personally attributed to the founder: `trade.astro`'s hero ("trusted for
  years by...") and meta description (same phrase), its comparison-table cell ("A named
  company with years of testimonials" → "...you can contact directly," since the
  testimonials it was citing as evidence no longer exist), its "years of closed deals
  behind it" line, and `about.astro`'s "years of closed deals and testimonials before
  this website ever existed" differentiator. Founder-personal narrative — "our founder
  worked with... for years," "Steven built LeadVault on years of hands-on work," "For
  years before this website existed, Steven Ehimigbai personally..." — was left
  untouched throughout: it's attributed to a named individual's real work history, not
  an unverifiable company-wide stat, and keeping it was an explicit instruction.
- **"Bounce-Free Guarantee" → "Replacement Guarantee"** in the homepage trust bar,
  matching the actual policy (`refund-replacement-policy.astro`, `pricing.astro`'s "Our
  Replacement Guarantee" heading), which allows up to 5% invalid records within 14
  days — "bounce-free" is absolute language the real policy doesn't back. Left the
  unrelated "bounce-free CSV" phrasing on `pricing.astro`/`data-catalog.astro`/
  `PipelineGraphic.astro` alone — those describe the delivered file's state at time of
  send (the actual output of the verification pipeline), not a forward-looking
  guarantee, which is a materially different claim.
- **Removed the "High demand" badge from Investment & Investor Leads** (`catalog.ts`'s
  `highDemand` flag and its rendering in `data-catalog.astro`) and the matching "one of
  the highest-demand data categories" line on `industries.astro` — same unverifiable
  pattern as the removed stats, just smaller. `industries.astro`'s new "Sales & Growth
  Teams" group is ordered first (it contains the acquisition push's priority ICPs) but
  the page explicitly does not claim this reflects actual demand — see its own code
  comment — per the owner's instruction that recruitment's priority is a hypothesis to
  validate, not a settled fact, and shouldn't be asserted as one anywhere on the site.
- **B2B data-decay stat corrected from an uncited "25–30%" to a cited "22–23%."**
  Web-searched for the actual widely-cited source rather than keeping the site's
  existing unsourced figure or inventing a citation: MarketingSherpa's decay research
  (via HubSpot's Database Decay Simulation) and Cleanlist's 2026 report both land on
  ~22–23%/year, which is what's now stated on `index.astro` and `why-leadvault.astro`,
  each linked to Cleanlist's report. Deliberately did not link ZoomInfo's own
  data-decay research, despite it being the most prominent search result, since
  ZoomInfo is named as a competitor elsewhere on the same pages — citing a competitor's
  blog as the evidentiary source for an argument against that competitor's model would
  undercut the citation's credibility.
- **Payment-methods bracket resolved using the owner's actual confirmed answer**, not a
  guess: `pricing.astro`'s FAQ now says "USD, via international bank transfer or
  PayPal. Payment instructions are provided directly with your order" — naming only
  the two channels the owner confirmed as real, and "payment instructions provided
  directly" rather than implying a live automated checkout, since the owner also
  confirmed nothing is automated yet.
- **Contact page's privacy line rewritten to match the Privacy Policy exactly.**
  "We never share your information with third parties" (false — the policy discloses
  Netlify/Google/Meta as recipients) is now "We don't sell your personal information
  — your submission is handled in accordance with our Privacy Policy," linked, using
  the policy's own "we do not sell...for their own marketing purposes" language rather
  than a new claim invented for the contact page.
- **Primary CTA changed sitewide: "Get My Free Recommendation" → "Request Sample
  Data"** (linking to `/data-catalog`, not a new/fake free-sample flow — the real,
  already-functional path is viewing real sample CSVs and requesting one via the
  existing contact-form pre-fill), with **"Request a Custom Recommendation"** (→
  `/contact`) kept as the explicit secondary path for buyers who need something the
  catalog doesn't cover. Changed in the one place this is genuinely the sitewide
  primary CTA — the sticky header button (desktop + mobile) — plus the homepage hero
  and final CTA and the new Sample Data section's own buttons. Page-specific CTAs
  (Trade's "Find My Buyers/Suppliers," Services' "Take the Survey," the contact form's
  own submit button) were deliberately left alone: they're contextually distinct
  actions, not the generic top-level CTA the instruction targeted, and shortening them
  wasn't asked for.
- **Homepage section order changed**: Comparison table moved before the origin story
  (was after); the new Sample Data section sits right after Comparison, ahead of the
  origin story, so a first-time visitor reaches concrete proof before the founder's
  personal history. This is the one deliberately non-mechanical judgment call in this
  round — the instruction's suggested 13-section order would have produced a second,
  redundant "how it works" block (the page already had one: the pipeline-graphic
  Solution section), so rather than force every suggested slot to exist literally, the
  reorder keeps the site's existing sections but sequences them buyer-understanding
  → proof → origin, which was the stated intent.
- **World map: 2 new arcs added, connecting existing labeled nodes to each other
  (Canada↔Asia, USA↔UAE) instead of only to the Nigeria hub** — makes the graphic read
  as a genuine network rather than a single hub-and-spoke, per the explicit instruction
  to strengthen the arcs without touching geography, colors, or labels. Colors are the
  site's own cyan/lime accent tokens (`#00D9FF`, `#B7FF00`) rather than a new palette —
  a restrained, on-brand touch rather than a new visual language. Both arcs follow the
  exact `<path>`/`<animate>` pattern already used by the file's original 7 arcs (same
  stroke-dasharray draw-in technique, same "bow toward the top" curvature the other 7
  already share), added as pure markup inside the existing arc `<g>` — no country
  geometry, gradient, or node data touched. This is the one place this round edited the
  delivered SVG asset directly, which every prior round avoided; done narrowly (2 new
  self-contained elements, zero edits to existing ones) specifically because the
  instruction explicitly asked for stronger arcs and explicitly forbade a redraw.
- **Added FAQPage structured data to `/pricing`** (from the page's own real `faqs`
  array — no content invented for the schema) and **Service/ItemList structured data to
  `/services`** (from the real `services` array). Both were flagged as missing in the
  original audit; added now since they're low-risk, additive, and directly requested.
- **Added sitewide CTA click tracking** (`data-cta` attributes + one delegated listener
  in `BaseLayout.astro`, firing `gtag('event','cta_click',...)` / `fbq('trackCustom',
  'CTAClick',...)`) — guarded by the same `typeof gtag === 'function'` pattern already
  used for the `/thank-you` conversion events, so it's a genuine no-op until GA4/Pixel
  are confirmed live, not new tracking infrastructure bolted on separately. Tags the
  header (desktop + mobile), hero, Sample Data section, and final-CTA buttons.
- **What was not done, and why**: no Content-Security-Policy header was added — the
  instruction explicitly warned against introducing one without thoroughly testing it
  against analytics/fonts/forms first, and this round had no live-browser session
  available to do that testing safely. No live Netlify Forms submission test, no
  Search Console re-check beyond what Round 7's postmortem and the prior conversation's
  domain/firewall/WAF investigation already covered, and no real-device mobile QA —
  all four require live infrastructure or a driven browser this round didn't have
  access to; each is called out explicitly, not silently skipped, in the implementation
  report delivered alongside this round.

## Round 11 (positioning pass — ICP self-identification, CTA consistency, not yet deployed)

Follow-up to Round 10, prompted by a second, larger instruction set: the credibility
fixes were accepted, but the site still centered the founder's original trade-desk
niche more than the three priority ICPs (marketing/lead-gen agencies, recruitment,
SaaS/sales teams), and "recommendation"-style CTA language lingered in several spots
Round 10 didn't touch. Unlike Round 10, this round was explicitly told to stop after
implementing and reporting, not to deploy — so it stayed local, build-validated, and
uncommitted pending review. See the companion implementation-report artifact for the
full file-by-file account; the notable judgment calls:

- **New homepage section, "Built for the Way You Prospect"** (`index.astro`, right
  after the trust bar, before The Problem) — four cards (3 priority ICPs + "Other B2B
  Research Needs") let a visitor self-identify early, per the instruction's explicit
  ask. Deliberately not linked to per-ICP landing pages (none exist — a later phase,
  per the instruction's own §30) — all four point at the same `/contact` CTA every
  other undecided-visitor path on the site already uses. Inserting a new section broke
  the homepage's background-alternation rhythm (CLAUDE.md's "no two same-tone sections
  back to back" rule); traced the whole chain and found the minimal fix was flipping
  just one *existing* section's tier (Solution: bg-mid → default) rather than
  recoloring every section from the insertion point forward — everything downstream
  already alternated correctly once that one link in the chain changed.
- **"Request a Custom Recommendation" → "Request a Custom Dataset"** everywhere it
  appeared (hero secondary, final-CTA secondary, Sample Data section, Pricing) — Round
  10 introduced this phrase as the secondary CTA but didn't catch that "Recommendation"
  was exactly the word this round's instruction wanted purged. Renamed the matching
  `data-cta` tracking IDs to match (`*-custom-recommendation` → `*-custom-dataset`) so
  analytics dashboards don't end up with an ID that no longer matches any visible copy.
- **Contact form's own submit button changed** ("Submit — Get My Free Recommendation" →
  "Submit My Data Request") — Round 10 deliberately left this one alone, reasoning a
  submit button is a contextual, already-committed action rather than a top-level CTA.
  This round's instruction explicitly re-examined that exact case and gave "Submit Data
  Request" as its own suggested wording for this context, so it changed on direct
  instruction rather than the earlier reasoning being wrong.
- **Services' "Take the Survey" → "Tell Us What You Need"** — kept the button's actual
  *intent* (a distinct, softer path for visitors who don't yet know what they need,
  different from "Request a Custom Dataset" for visitors who do) rather than collapsing
  it into the generic vocabulary, since the instruction was explicit: determine each
  CTA's intent before changing it, don't blindly replace.
- **Found and fixed a second, uncited data-decay figure** ("roughly a quarter of B2B
  contacts go stale every year," `services.astro`'s Email List Cleaning card) that
  Round 10 missed — that round's claims grep was scoped to `src/pages` broadly but
  this exact phrasing ("a quarter," not "25–30%") didn't match the patterns searched
  for. Corrected to the same cited 22–23% figure used on Home and Why LeadVault, and
  ran a fresh repo-wide grep (including `src/components` this time) to confirm no
  other instance was hiding behind different wording.
- **Trade Desk explicitly separated from LeadVault's core positioning** — added a line
  to `trade.astro`'s hero ("LeadVault researches B2B prospects for businesses of every
  kind — the Trade Desk is our specialized version of that... for international
  trade," with a link to `/services`) and reworded its Services-page subtitle ("our
  original service" → "our specialized research service for international trade").
  The Trade Desk itself, its testimonials-free copy, and its own CTAs were left
  untouched — this was about the *frame* around it, not the page's content.
- **About page's founding-story pivot paragraph rewritten**, not the founding story
  itself — the three paragraphs describing the founder's actual trade-industry work
  stayed (authentic personal history, explicitly protected). Only the final paragraph
  (which already pivoted to "every data-driven business" pre-round) was strengthened to
  name the transferable discipline explicitly ("take a specific requirement, research
  it properly, deliver...") rather than just asserting the pivot happened.
- **Industries and Why LeadVault page framings adjusted** (industries: "industries we
  serve" → "examples of prospect research requirements we support"; Why LeadVault: added
  an explicit "requirement-driven research" sub-heading to the LeadVault-model card) —
  both light copy edits to existing, already-good structures, not rewrites.
- **Not deployed.** Per this round's explicit instruction to stop and report before the
  next phase, none of this is committed or pushed — it's local and build-validated
  only (`npm run build`: 17/17 routes, 0 errors, run twice across this round). Round 10
  is still what's live in production as of this entry.

## Round 12 (correction pass — the hero slogan and plain-language section were missed)

The client caught, correctly, that Round 11 renamed CTAs and added an ICP section but
never touched the actual homepage hero headline ("Every Business Needs Leads. Every
Lead Starts Here.") or the "What Is Lead Generation?" explainer beneath it — both of
which still centered generic lead-gen positioning above everything Round 11 built.
That's a real miss, not a difference of judgment.

- **Root cause, not just symptom, fixed.** The old slogan turned out to be a genuinely
  unused exported constant — `PRIMARY_TAGLINE` in `site.ts` was defined but never
  imported anywhere; `index.astro`'s H1 and `Footer.astro`'s tagline each hardcoded
  their own separate copy of the same string. That's *why* it was so easy to miss:
  there was no single place a search-and-replace or a "did I update the tagline"
  check would have caught both copies at once. Fixed the value **and** the structure —
  both files now `import { PRIMARY_TAGLINE }` from the one constant, so this specific
  failure mode (two copies silently drifting) can't recur for this string.
- **New hero**: "Tell Us Who You Need to Reach. We'll Research the Prospects That
  Match." — adapted from the client's own suggested direction. Subheadline and both
  body paragraphs rewritten to lead with the research/verification/delivery mechanism
  rather than "leads," while keeping the real geographic claim (country names, no
  count) and the CTA pair from Round 11 untouched.
- **"What Is Lead Generation? (In Plain English)" → "What Does LeadVault Actually
  Do?"** — replaced the generic lead-gen definition (which implied buying-intent
  scoring the service doesn't do — "people most likely to buy") with the client's
  own supplied copy almost verbatim, since it was already well-written and explicitly
  provided as the intended replacement.
- **Globe caption added** — the hero globe (`HeroWorldGraphic.astro`) had no
  supporting text under it at all before this round. Added two lines directly in
  `index.astro` (not inside the component, which stays a pure SVG-inlining concern):
  "Prospect research across markets worldwide" + "From North America and Europe to
  Africa, the Middle East, Asia, and beyond" — descriptive geography, no customer or
  country count attached.
- **Sample Data section's own CTA renamed** "View Sample Data" → "Explore Sample
  Data," matching the client's explicit contextual-CTA vocabulary (distinct from the
  sitewide "Request Sample Data" used in the header/hero).
- **Two more SEO titles fixed for the same reason as the hero**: the homepage's own
  `<title>` and the Services page's `<title>` both led with "B2B Leads"/"Lead
  Generation" — the exact category language the whole pass is moving away from.
  Neither was touched in Round 11 because that round's SEO edits targeted five
  specific pages (Contact/About/Industries/Pricing/Why LeadVault) without a
  fresh sweep of title tags sitewide; this round's more thorough term search caught
  both.
- **Classified rather than blanket-changed** every remaining "recommendation" mention
  (thank-you page, Terms of Service, Privacy Policy, Services' named "Data Strategy &
  Recommendations") as **keep, specialist/contextual** — each describes a real,
  accurate part of the process in a place a visitor only reaches after already
  committing to a request, not a top-level marketing CTA. Recorded explicitly in the
  audit table delivered before implementation, per instruction, rather than silently
  left alone.
- **Not deployed.** Same as Round 11 — stopped after implementing and reporting, per
  explicit instruction. `npm run build`: 17/17 routes, 0 errors. Round 10 remains what's
  live in production.

## Round 13 (commercial completion pass — pricing rebuild, visual placeholders, claims)

Prompted by a "final content, commercial & visual completion pass" instruction, which
opened by claiming the live site still showed old copy despite Round 12's QA. Re-verified
against the live site fresh (cache-busting query params, learned necessary in Round 10)
before touching anything: the deployment was genuinely clean — hero, payment wording,
privacy statement, and submit button all matched what Round 12 shipped. The one real
miss found by a repo-wide grep was a "Fresh, verified leads" line in Services' monthly-
plan card, superseded anyway by this round's plan rework. Recorded as a real finding,
not a false alarm dismissed without checking.

- **Pricing rebuilt around a lower-friction testing ladder** — one-time tiers changed
  from 500/1,000/2,500/5,000/10,000 records ($99–$1,399) to Prospect Sample (100/$29),
  Targeted List (250/$59), Campaign List (500/$99 — kept unchanged, the proven entry
  product), Larger Campaign (1,000/$179), and Custom Research (from $299, quoted).
  Monthly plans renamed "Monthly Prospect Research" (from "Monthly Lead Subscriptions")
  and restructured around ICPs/target markets rather than a flat leads-per-month count:
  STARTER $199/mo, GROWTH $399/mo, AGENCY from $799/mo. The old standalone "Agency &
  Enterprise Partner Plans" card (from $999/mo) was removed, not just left alongside —
  its positioning (white-label, multiple client campaigns, custom specs) is now fully
  covered by the new AGENCY tier at a different price, and keeping both would have put
  two contradictory agency prices on the same page.
- **Services.astro's pricing kept in sync**: Custom Fresh Datasets' price line changed
  from "$99 per 500 verified records" to "From $29 per 100 verified prospects — see the
  full ladder on Pricing" (the $99/500 point itself is unchanged, just no longer the
  only number shown here); Monthly Prospect Research's price updated to match the new
  $199/mo STARTER tier.
- **Services restructured around who/problem/what/receive/price/next** for the five
  named priority services (Custom Fresh Datasets, Managed Email Campaigns, Email List
  Cleaning, Monthly Prospect Research, Custom Data Projects) — added explicit `who` and
  `problem` fields rendered as small labeled lines above the existing body copy, plus a
  `cta` on each pointing at a concrete next step. Trade Desk, Data Strategy, and
  Outreach Support were left in their existing (already-adequate) structure rather than
  forcing the same template onto every card.
- **About's "Meet the Founder" section rewritten to remove unsupported achievement
  claims** — "earning a reputation," "helping clients grow their sales and income,"
  "fixed the emails never reach the inbox problem," "high-demand niches," and "one
  successful deal at a time" are gone. Replaced with the client's own suggested
  structure (three paragraphs on the problem LeadVault solves + a "his experience
  spans" list of three capability areas, not achievement claims) — followed close to
  verbatim since it was well-written and explicitly supplied. The founding story
  itself, the founder's name, and the mission-statement blockquote are untouched.
- **Tools' and Trade's literal "IMAGE:" text placeholders replaced with real content**,
  not real photos (none were supplied for these two slots) — Tools gets a 5-stage
  "How the Data Pipeline Works" diagram (Research → Filter → Verify → Clean → Deliver,
  extending the homepage's existing 4-stage `PipelineGraphic` concept with a Filter
  stage specific to this page, built inline rather than modifying the shared component
  used elsewhere) plus a named Precision/Freshness/Quality-Control breakdown under the
  existing "Why This Matters" heading; Trade gets a 6-step vertical workflow diagram
  (Product/Trade Lane → Target Market → Buyer/Supplier Research → Verification →
  Counterparty Dataset → Approach Guidance) replacing the hero's placeholder slot
  directly. Audited every other `ImagePlaceholder` usage site-wide afterward: the
  remaining 4 (About, Contact, Tools' hero, Home's origin section) all pass a real
  `src` **and** an explicit `alt`, so their leftover `caption="IMAGE: ..."` prop is
  inert dead text — never rendered, not a visible placeholder — confirmed by reading
  the component (`alt ?? caption` only matters when `alt` is absent, and it never is
  here). Left those `caption` props as-is rather than editing four working call sites
  to remove a prop with zero visible or accessibility effect.
- **Industries gets a new "One Research Method. Many Markets." section** — 6 example-
  market badges (reusing icons already imported for the existing grouped cards) above
  a 4-step Company → Decision-Maker → Verified Contact → Research Dataset chain.
  Inserting it broke the page's background alternation the same way Round 11's ICP
  section did (landed adjacent to `.section-alt`, which resolves to the same `bg-mid`
  tier) — same fix pattern: the new section uses the default tier, not a second
  manually-added `bg-mid` block.
- **Recruitment category repositioned from a candidate database to business-development
  research.** The "Recruitment Targets" sample CSV was literally a candidate list (name,
  headline, skills, years experience) — replaced entirely with a new 8-row fictional
  sample of companies and hiring decision-makers (Company, Industry, Location, Company
  Size, Hiring Signal, Decision-Maker, Job Title, Business Email, Status), matching the
  same masked-email/fictional-identity convention as the other 10 sample CSVs. Category
  renamed "Recruitment Targets" → "Recruitment Market Research"; its description now
  leads with employer/decision-maker framing and explicitly notes candidate sourcing is
  still available as a separate custom request, per instruction, rather than being this
  category's headline example.
- **Why LeadVault's two unsupported client-behavior claims rewritten**: "Many of our
  clients use both" → "Some teams use both models" (a description of a real, common
  buyer pattern rather than a claim about LeadVault's own client base); "why clients who
  try us, stay" → "the case for choosing LeadVault when a campaign needs to work, not
  just launch" (removes the implied retention-rate claim, keeps the underlying pitch).
- **Contact and Home's final-CTA copy reworded away from "free recommendation" as the
  primary promise** — both now say a strategist "will review the specification and
  respond within 24 hours with the right data, volume, and price," matching this
  round's instruction almost verbatim. `thank-you.astro`'s "recommendation" language
  and Services' "Data Strategy & Recommendations" service name were confirmed still
  correctly classified as keep-contextual (post-submission confirmation and a real
  named service, respectively) and left alone — consistent with this round's own
  explicit carve-out for legitimate service terminology.
- **Data Catalog's "Phase 2... in development" language removed** in both places it
  appeared (the page intro and the waitlist card) — replaced with "planned for a future
  phase," no implied timeline, matching Pricing's FAQ answer for the same topic so the
  two pages don't contradict each other.
- **Full CTA and claims sweep run after all changes, not just before**: every
  `btn-primary`/`btn-outline` on the site was pulled and checked against the approved
  vocabulary — no remaining vague or contradictory CTA found. A fresh grep for numeric
  claims, "highest-demand," "trusted by," and similar found nothing beyond the real,
  documented replacement guarantee and the form's own user-selectable dropdown ranges.
- **Deployed.** Commit and push happened after this round's build validated, per this
  round's own instruction that live QA follows deployment (unlike Round 11/12, which
  were explicitly told to stop before deploying) — see the commit hash and live QA
  results in the implementation report delivered alongside this round.

## Round 14 (Contact page — post-submission clarity pass, not yet deployed)

Prompted by an instruction to finalize the Contact page: make clear that submitting is
a request for a quote, not a purchase; requirements get reviewed; LeadVault recommends
an option; payment happens only after that offer is agreed; the 24-hour promise is
genuine. Do not rebuild the form. Add a "free, no-obligation quote" reassurance near the
form only if accurate, without adding friction or new required fields.

- **Read the current form and confirmation page in full first.** Most of the underlying
  process was already accurate — the intro paragraph above the form already says "no
  obligation," the confirmation page already says "free, no-obligation recommendation,"
  and email notifications/honeypot/privacy link were all previously verified working.
  The gap was placement, not accuracy: a visitor who scrolls straight to the form (or
  lands on it directly via a Data Catalog `?need=` link) could reach the form fields
  without ever reading the left-column intro paragraph that carries this reassurance.
- **Added a short reassurance banner at the top of the form card itself**, inside
  `contact.astro`'s `<div class="card">`, before the `<form>` tag: "**Free, no-obligation
  quote.** We'll review your requirements and recommend the right option — nothing is
  charged until you approve it." This is the only new form-facing content; no fields,
  labels, or required/optional status were changed.
- **`thank-you.astro`'s confirmation copy tightened, not rewritten**: "...will follow up
  by email or WhatsApp with your free, no-obligation recommendation" became "...with your
  free, no-obligation recommendation **and price. You decide whether to proceed —
  nothing is charged until you approve the offer.**" The "within 24 hours" line above it
  is untouched, per the instruction not to change that promise.
- **"Who is your ideal customer or counterparty?" field given a placeholder** ("e.g. VP
  of Sales at 50–200 person SaaS companies") to surface the target-roles/titles concept
  the instruction listed as essential information — without adding a new field or making
  an optional field required.
- **Deliberately left unchanged**: the "Submit My Data Request" CTA wording (already
  approved sitewide vocabulary, and the surrounding no-obligation language now makes the
  "quote, not purchase" framing clear without needing to reword the button itself);
  which fields are required vs. optional (Country/Industry/What-do-you-need stay
  required, Volume/Budget stay optional — an earlier round's deliberate choice, not
  re-litigated here); the mobile Submit-button/WhatsApp-button spacing fix from a prior
  round (re-verified, not touched); honeypot, `data-netlify`, and privacy-policy link
  (already correct).
- **Verified via `npm run build` (zero errors) and a live Playwright session**: desktop
  and mobile (375px) renders of the new banner, `#lead-survey-form`-scoped checks that
  the honeypot field, hidden `form-name=lead-survey`, and 6 required-field ids are all
  still present and correct, no console errors, no horizontal overflow, no WhatsApp-
  button overlap at the submit-button scroll position, and a full end-to-end form
  submission (filled + submitted against the local dev server) redirecting correctly to
  `/thank-you`.
- **Not deployed.** Consistent with the last several rounds, these changes are committed
  to the working tree only, pending explicit approval to commit/push.

## Round 15 (Pricing and payment-experience audit)

Prompted by an instruction to audit and finalize the pricing/payment experience: review
where a direct PayPal payment option makes sense, without turning the site into an
ecommerce store, and without ever claiming "pay now" where a quote is actually needed
first. PayPal was said to be "personally tested and verified," with bank transfer also
available.

- **Asked before building anything**, since a wrong payment identifier has real
  financial consequences: confirmed the technical approach (PayPal.me links over hosted
  buttons — no PayPal dashboard work needed) and the scope (the 4 fixed-price one-time
  dataset tiers only — Custom Research, Monthly plans, Trade Desk, and Managed Campaigns
  stay quote/invoice-based, matching the CUSTOM/TRADE flow the instruction defined).
- **New fact surfaced mid-round: the client's PayPal account can currently only send
  money, not receive it** — "personally tested" evidently didn't cover the receiving
  side. This makes any live PayPal payment link non-functional and was not something to
  guess around. Asked directly how payment methods should be described given this;
  answer: **bank transfer only, for now** — remove PayPal from the site's payment
  wording until receiving is fixed, rather than advertise a method that doesn't work.
  No PayPal buttons or links were implemented as a result — not a technical limitation
  of the site, a business-side account limitation on the client's end.
- **Pricing's "How do I pay?" FAQ answer rewritten** to drop PayPal and describe the
  flow that now actually exists: bank transfer in USD; for the 4 tiers, requesting a
  tier gets transfer instructions for that exact amount; for custom research, monthly
  plans, and Trade Desk, a quote comes first and instructions follow once approved.
  50% deposit / balance-on-delivery for custom projects, already accurate, kept as-is.
- **Added a "Request This Tier" link under each of the 4 fixed one-time dataset tiers**
  on Pricing (Prospect Sample $29, Targeted List $59, Campaign List $99, Larger Campaign
  $179) — the closest safe equivalent to a direct-payment button without live PayPal:
  each link names the exact tier, records, and price and goes to
  `/contact?tier=<slug>`, so what the visitor requests can't be ambiguous. A line under
  the links states plainly that this confirms the order and gets bank transfer
  instructions for that price — "nothing is charged automatically." The
  `ComparisonTable`'s existing row structure (shared with several other pages) was left
  untouched; the tier data and links live in a new small array instead of adding a CTA
  column to a component other pages depend on.
- **`DATASET_TIERS` added to `src/data/catalog.ts`** as the single source of truth for
  tier slug/name/records/price/volume-bucket, used by both Pricing's table+links and
  Contact's new pre-fill script — avoiding a second hardcoded copy of the same 4 prices
  that could drift out of sync with what Pricing displays (the exact failure mode
  `PRIMARY_TAGLINE` was introduced to prevent, earlier in this project).
- **Contact's existing `?need=<slug>` pre-fill script (Data Catalog) extended, not
  replaced, with a second `?tier=<slug>` handler**: sets "What do you need?" to "Fresh
  custom dataset," "Approximate volume needed" to the matching bucket, and — if not
  already filled — writes `Requesting: <tier name> — <records> prospects, <price>` into
  "Who is your ideal customer or counterparty?" so the strategist sees the exact
  requested tier and amount with no back-and-forth. Verified the pre-existing `?need=`
  flow (Data Catalog cards) still works unchanged after this addition.
- **Reviewed Services, Trade, Terms of Service, Refund & Replacement Policy, and the
  footer for payment wording**: no "pay now"/"buy now" language and no other PayPal
  mentions existed anywhere outside this one FAQ answer (confirmed by a repo-wide grep,
  before and after). Trade Desk's CTAs ("Find My Buyers/Suppliers," "Start With the
  Trade Survey") already route to the quote-first flow the instruction asked for and
  needed no change. Terms of Service names no specific payment method and wasn't
  inaccurate, so it was left alone rather than edited without a real defect to fix.
- **No prices changed.** No banking details (account numbers, IBAN, routing info) were
  added anywhere on the public site — "bank transfer" stays a named method, not
  published credentials, per the instruction not to expose private banking information.
- **Verified via `npm run build` (zero errors) and a live Playwright session**: all 4
  tier links render with the correct href/label/price; clicking through from Pricing to
  Contact confirms the "What do you need?", "Approximate volume needed," and "Ideal
  Customer" fields pre-fill correctly for two different tiers; the pre-existing
  Data Catalog `?need=` flow still works; no console errors; the built `dist/pricing`
  output was checked directly for the new FAQ answer text.
- **Not deployed.** Consistent with recent rounds, pending explicit approval to
  commit/push — alongside the still-unpushed Contact-page and earlier rounds.

## Round 16 (Delivery, verification & fulfillment copy audit)

Prompted by an instruction to audit all copy touching delivery, turnaround, verification,
and fulfillment against a real operating model (LeadVault personally performs research
and verification through a ten-step internal workflow; Google Sheets is the preferred
delivery/database format, with CSV and Excel also supported; the approved delivery
timeframe stays unchanged) and against a checklist of unsupported-claim categories to
find and correct: instant delivery, automatically generated leads, guaranteed accuracy /
response / sales / appointments / conversion, unstated real-time data, unlimited
research, 100% accuracy — without disclosing internal tooling (named examples:
Python/Snov.io/MX/SMTP) unnecessarily, and without making the site sound weak.

- **Repo-wide grep against every category before touching anything.** No guaranteed-
  response/sales/appointment/conversion claims existed anywhere — the one place "guarantee
  results" appears (`terms-of-service.astro`) is the existing disclaimer explicitly saying
  results *can't* be guaranteed, already correct. No "100% accuracy" claims, no
  false "real-time" claims, no unlimited-research claims. The only genuine hit in that
  whole checklist: **"unlimited client use cases"** on Industries' Marketing Agencies
  card — softened to "many client campaigns," since LeadVault doesn't actually promise
  no cap. Every "instant" mention on Why LeadVault describes the *competitor's*
  self-serve database platforms in honest contrast to LeadVault's own already-hedged
  "delivery takes days, not seconds — freshness cannot be instant" — accurate framing,
  left untouched.
- **Internal tooling over-disclosure was the real finding**, concentrated on
  `tools.astro`: "Python Filtering" and "MX Sorting" were tool-card titles naming
  implementation directly; the page's own `<title>`/meta description led with "MX Checks
  & Python Engineering"; "MX record checks" appeared six more times across `tools.astro`,
  `services.astro`, `about.astro`, `industries.astro`, `index.astro`'s process steps, and
  `data-sourcing-policy.astro`. All renamed to outcome language — "Precision Filtering,"
  "Deliverability Segmentation," "deliverability checks" — while **keeping** the
  customer-facing provider names (Office 365, Google Workspace, Gmail, IONOS), since
  those aren't internal tooling, they're the real-world inboxes a customer recognizes and
  help demonstrate rigor without exposing *how* LeadVault does it. `data-sourcing-policy`
  (a compliance document, different audience/intent from marketing pages) kept slightly
  more procedural specificity — "deliverability checks (mailbox and domain verification)"
  — rather than being stripped to the same bare phrase used in ad copy.
- **Explicit positioning sentence added** to `tools.astro`'s "Why This Matters to You"
  section, leading the paragraph: *"Every dataset is researched against your exact
  specification, then reviewed before it reaches you."* — the exact framing this round
  asked the site to communicate, placed once, prominently, on the page that explains the
  process, rather than repeated on every page (the surrounding copy — process steps on
  Home, the Quality Control card here, the replacement guarantee on Pricing — already
  told the same story in different words and didn't need restating).
- **Google Sheets positioned as the preferred delivery/database format, CSV and Excel
  named as also available**, everywhere the site previously said only "CSV": Pricing's
  "How is data delivered?" FAQ, its Custom Fresh Datasets includes-line and tier-links
  reassurance, Services' Custom Fresh Datasets description, Data Catalog's intro,
  Home's `processSteps` and the shared `PipelineGraphic` component's DELIVER stage, and
  Tools' own pipeline DELIVER stage and Precision Filtering card. The custom-specification
  sample CSV's fictional "Delivered as clean CSV" row was left alone — it's an example of
  what a *client* might specify in a request, not a company-wide format promise, and
  doesn't misstate anything.
- **The internal ten-step workflow supplied for this round (requirement definition →
  prospect discovery → website/domain research → dataset construction →
  deduplication/merging → decision-maker research → email/domain validation → quality
  review → final formatting → delivery) was used to calibrate accuracy, not published.**
  The site's existing five-stage abstraction (Research/Filter/Verify/Clean/Deliver on
  Home and Tools) already maps to it at the right level of customer-facing detail once
  the MX/Python jargon was removed — no new stages were added, since more granularity
  would be over-disclosure, not under-disclosure.
- **Delivery-timeframe wording was not touched.** Verified directly in the built
  `dist/` output that every "24 hours," "3–5 days," "3–7 days," "72 hours," "within
  days," "as fresh as 3 days," and "14 days" mention survived this round's edits exactly
  as before (a `node` script counted every occurrence pre- and post-edit).
- **Verified via `npm run build` (zero errors, 17 pages) and a live Playwright session**:
  screenshotted Home's pipeline section and the full Tools page at desktop and mobile
  (375px) widths — the slightly longer DELIVER-stage and tool-card copy wraps cleanly
  with no overflow or clipping; no console errors on either page.
- **Not deployed.** Consistent with recent rounds, pending explicit approval to
  commit/push — alongside the still-unpushed Contact, Pricing/payment, and earlier
  rounds.

## Round 17 (Data Catalog final audit)

Prompted by a final audit of the Data Catalog against a checklist: samples labeled
appropriately, never presented as a guaranteed live database, no implied ownership or
exclusive access to the businesses shown, sensitive info masked where required, no
unsupported accuracy claims, understandable categories, a clear sense of what a
delivered dataset looks like, and a CTA that leads naturally onward — without adding
fake records, fabricated statistics, inflated apparent database size, or catalog pricing
that would duplicate Pricing.

- **The one real defect: the "illustrative, not real customer data" disclaimer existed
  but was invisible.** `ComparisonTable.astro`'s `caption` prop rendered as
  `<caption class="sr-only">` — announced to screen readers, never shown to a sighted
  visitor. Every one of the catalog's 11 sample tables (and the homepage's featured
  sample) carried this exact disclaimer in the markup the whole time, but no visitor
  could actually see it. This is the gap the audit's "unmistakably clear" standard was
  really testing for.
- **Fixed with an opt-in `captionVisible` prop**, defaulting to `false` so the other 4
  `ComparisonTable` call sites (Pricing's two tables, Home's platform-comparison table,
  Why LeadVault, Trade) are provably unaffected — verified directly in the built output
  that they still render `sr-only` and show zero visible "illustrative" text. Set to
  `true` only on Data Catalog's 11 category cards and the homepage's `SampleDataSection`
  — the two places actually showing sample "customer" records.
- **First implementation attempt was wrong and caught before shipping**: rendering the
  visible caption as the table's own `<caption>` element put it inside the same
  `overflow-x-auto` box as the data columns, so on a card narrower than the table's
  `min-w-[640px]` the disclaimer text was clipped exactly like the data itself — visible
  in principle, unreadable in practice without scrolling. Confirmed via screenshot,
  fixed by moving the visible version to a plain `<p>` outside the scrollable
  `table-wrap` div entirely, so it wraps naturally at full card width instead of being
  cut off. Re-screenshotted afterward to confirm the full sentence now reads without
  scrolling on both the Data Catalog cards and the homepage section.
- **Everything else on the checklist was already correct and left unchanged**: all 10
  real sample CSVs consistently label their email/phone columns "(masked)" and mask
  consistently (`n.****@cro*****.com`, `+234 8XX XXX 9652`) — per this round's own
  instruction, masking that's already appropriate stays untouched. No category
  description implies LeadVault owns or has exclusive access to the businesses shown
  (all describe filter criteria — "by industry and company size," "by product category
  and trade lane" — not possession). No unsupported accuracy claims found beyond the
  already-real, already-documented replacement guarantee. Categories, sample-preview
  tables, and turnaround times already give a concrete, accurate sense of what a
  delivery looks like. The `Request This Dataset` → `/contact?need=<slug>` CTA was
  re-verified working end-to-end (pre-fills the "What do you need?" select correctly).
  No pricing exists on this page and none was added — Pricing owns that, avoiding the
  duplication/conflict this round explicitly warned against.
- **One data edit, not a new record**: the "Fully Custom Specification" category's
  template example row said "Delivered as clean CSV" — updated to "Delivered as a clean
  Google Sheet" to match last round's delivery-format audit. This is a template/example
  cell ("Your Field 1, Your Field 2..."), not a company or person record, so it doesn't
  touch the "no fake records" instruction.
- **Verified via `npm run build` (zero errors, 17 pages) and two rounds of live
  Playwright checks** (the second after catching and fixing the clipping issue): visible
  captions render in full on both Data Catalog and Home; Pricing/Home-comparison/Why
  LeadVault/Trade tables provably unaffected; no mobile horizontal overflow on Data
  Catalog; the catalog CTA click-through and form pre-fill still work; no console
  errors. Also fixed an unrelated pre-existing typo spotted while reviewing the
  homepage sample section ("a preview ofBusiness Decision-Makers" — missing space).
- **Not deployed.** Consistent with recent rounds, pending explicit approval to
  commit/push.

## Round 18 (About / Why LeadVault / Trade Desk credibility audit)

Prompted by a credibility audit of About and Why LeadVault (Trade reviewed too) aimed at
"authentic authority — not artificial corporate authority": confirm the pages explain why
LeadVault exists, the founder's research/verification approach, why a specification-
driven service makes sense, and that LeadVault complements existing databases rather than
claiming blanket superiority — with no fake logos/testimonials/case studies/statistics/
team members/years-of-operation, and competitor language held to "unless there is actual
evidence supporting the exact claim," preferring defensible framing like "built for
situations where a standard database search does not fully match the required segment."

- **No fake credibility markers found anywhere on any of the three pages** — no client
  logos, no customer testimonials (the founder's own quote on About is first-person
  founder voice about his own reasoning, not a fabricated customer endorsement, so it
  stays), no case studies, no invented statistics, no named-but-fictional team members,
  no specific years-of-operation claim. The one statistic on these pages (22–23% annual
  B2B contact decay, Why LeadVault) is the same cited, sourced figure used elsewhere on
  the site — left as-is.
- **The real finding was uncited competitor characterization, concentrated on Why
  LeadVault's comparison table** — three cells stated specific operational facts about
  named-category competitor platforms with no citation: "Unknown — verified anywhere
  from weeks to years ago" (data age), "Bounces included in what you export" (bounce
  handling), "Thin and frequently outdated" (African/emerging-market coverage). Softened
  to defensible, appropriately hedged versions ("Not disclosed per record — periodic
  verification cycles, not per order"; "Bounce rates vary by plan and provider";
  "Generally thinner, per public market reports") — same comparative point, without
  asserting specifics no citation backs. The identical pattern appeared once more on
  About's differentiator list ("the big platforms barely touch" → "many database
  platforms cover thinly") for consistency across both pages.
- **One absolute "we're better than everyone" claim, exactly the pattern this round's
  brief warned against**: Why LeadVault's closing section opened with "Nobody in this
  market combines what we combine" — an unqualified claim about the entire market with
  no evidence. Reworded to "This combination is uncommon among self-serve database
  platforms," which keeps the real, defensible point (LeadVault does combine several
  things at once) without the sweeping, unverifiable "nobody" claim.
- **Widened the page's existing disclaimer from pricing-only to the whole comparison**:
  it previously read "Comparative figures reflect publicly available information and
  general industry pricing patterns... individual vendor pricing may vary" — worded as
  if it only covered the pricing row. Now reads "This comparison reflects LeadVault's
  general understanding of how self-serve database platforms typically operate, based on
  publicly available information; individual vendor practices, data freshness, and
  pricing vary by provider and plan" — one sentence, now honestly hedging every row, not
  just one.
- **"Complements, don't replace" framing was already present and needed no change** — Why
  LeadVault already states "Some teams use both models: a database platform for instant
  self-serve searches, and LeadVault when a campaign requires fresh, custom research,"
  and opens by calling Apollo/ZoomInfo/RocketReach/Lusha "serious companies... a
  reasonable choice" for some use cases. This is exactly the complementary positioning
  the brief asked for — left untouched.
- **Trade Desk's specialization-without-exclusivity framing was already correct and
  needed no change** — the hero explicitly states "LeadVault researches B2B prospects for
  businesses of every kind — the Trade Desk is our specialized version of that same
  research process," with an inline link to Services for non-trade needs. The founding-
  story section's trade-heavy narrative is followed by explicit broadening language both
  on Trade ("the system that now powers everything LeadVault does" refers to the
  research *method*, in a page that already disclaims trade-only scope one paragraph
  above) and on About ("International trade was where that discipline was proven first —
  today it's applied to every business..."). Reviewed carefully per this round's specific
  instruction on this point; found nothing that actually makes the company read as
  trade-exclusive, so nothing was changed on Trade itself.
- **Deliberately left alone**: About's Vision/Mission/Philosophy cards (generic-sounding
  but not a fake-authority violation — no invented facts, just aspirational framing) and
  the founder's own quote (first-person, not a customer testimonial). Rewriting these
  would be a tone/style pass beyond "necessary copy corrections," not a credibility fix.
- **Verified via `npm run build` (zero errors, 17 pages) and a live Playwright session**:
  full-page screenshots of About and Why LeadVault confirm the reworded comparison table
  and differentiator card render cleanly with no layout breaks; no horizontal overflow on
  About, Why LeadVault, or Trade at 375px; no console errors on any of the three pages.
- **Not deployed.** Consistent with recent rounds, pending explicit approval to
  commit/push.

## Round 19 (Full cross-site consistency audit)

Prompted by a complete cross-site consistency audit: check every page and shared
component for contradictions in business identity, email addresses, pricing, ICP
positioning, data claims, delivery, payment, and CTA wording, and produce a
PAGE / CLAIM / CURRENT VERSION / CONSISTENT? / REQUIRED ACTION matrix — with the
smallest possible correction for anything genuinely wrong, no redesign.

- **Method**: full-repo pattern searches for every specific item named in the brief
  (`steven@`/`hello@` addresses, each dollar figure, PayPal remnants, CSV-only delivery
  mentions, "Get My Free Recommendation" leftovers, superlative competitor language) plus
  a manual read-through of every CTA's destination and every legal page's cross-links and
  dates — checked against the site's own single-source-of-truth files
  (`site.ts`, `catalog.ts`'s `DATASET_TIERS`) wherever one exists, since those make whole
  categories of drift structurally impossible rather than just currently correct.
- **36 specific claims checked across 9 categories; 35 already consistent, 1 genuine
  contradiction found and fixed.** No `steven@` email address exists anywhere on the
  site — the single contact address (`hello@leadvaultdata.com`) is correct sitewide. No
  PayPal mentions remain (Round 15). No CSV-only delivery claims remain (Round 16). No
  "Get My Free Recommendation" leftovers. All 9 pricing figures match between Pricing and
  Services. All 7 CTA groups resolve to their correct, working destinations. All 5 legal
  pages share the same "Last updated" date.
- **The one contradiction**: Industries' "Recruitment & Staffing" card described the
  offering as covering "both sides... equally" (hiring decision-makers *and* candidate
  pools) — this directly contradicted Data Catalog's "Recruitment Market Research"
  category, which was deliberately repositioned in an earlier round (commercial-
  completion pass — see Round 13 above) to lead with employer/decision-maker research
  and treat candidate sourcing as a separate custom request. Industries hadn't been
  updated when that repositioning happened elsewhere. Fixed with a single sentence,
  matching the wording the business had already settled on: "Hiring decision-makers to
  approach for business development, by industry and hiring signal — candidate sourcing
  available as a separate custom request."
- **Explicitly checked and confirmed NOT a contradiction**: Home's 3 priority-ICP cards
  vs. Industries' broader grouping structure (different pages, different purposes —
  self-identification vs. a full examples catalog) and Services' "Custom Research" ($299
  tier within Custom Fresh Datasets) vs. "Custom Data Projects" (a separate, quote-only
  engineering service) — two genuinely distinct offerings, not two descriptions of the
  same thing.
- **Matrix delivered as a published artifact** (also saved to the project root as
  `leadvault-consistency-audit.html`) rather than a giant inline table, given its size —
  same reporting convention as this session's earlier audit/positioning/blueprint
  reports.
- **Verified via `npm run build`** (zero errors, 17 pages) after the one edit. No visual
  or structural redesign performed on any page, per this round's explicit instruction.
- **Not deployed.** Consistent with recent rounds, pending explicit approval to
  commit/push.

## Repositioning — Phase 1 (Shared Foundation) + Homepage + Why LeadVault

Website freeze (established after the Round 14-19 deployment) was explicitly lifted by
the owner as an approved exception, per `LEADVAULT_WEBSITE_REPOSITIONING_MASTER_BRIEF.md`
— a new strategic phase repositioning LeadVault from "B2B prospect research" to "B2B
Prospect Intelligence." A full pre-implementation audit was delivered and approved first
(routes, SEO, GA4/Search-Console evidence, Netlify config, conflicts/recommendations,
5 owner decisions) before any code changed. This entry covers the first two phases the
owner authorized: Shared Foundation (nav/footer/CTA system) and the Homepage, plus Why
LeadVault's rework (bundled in since it's a contained single-page change tied to the
same "software vs. research" thesis the new homepage introduces).

- **Navigation restructured** (`src/data/site.ts`, `Header.astro`) to the brief's
  proposed architecture: Home / Prospect Intelligence / Solutions▾ / Industries / Why
  LeadVault / Pricing / About. Six of the Solutions-dropdown destinations (Qualified
  Prospect Data, Market & ICP Research, Decision-Maker Intelligence, Intelligence-Led
  Outreach, Data Cleaning & Enrichment, plus the top-level "Prospect Intelligence" link)
  don't have dedicated pages yet — those are the next implementation phase (core
  commercial pages). Rather than 404, they interim-link to `/services`, which itself
  becomes the Solutions overview page in that same next phase. This is flagged, not
  silent — the nav will point at real dedicated URLs once those pages exist.
  "Data Catalog" was deliberately removed from primary nav per the brief's explicit
  instruction (§4); "Tools & Technology" (formerly the "Company" dropdown, now gone) also
  isn't in the brief's proposed nav bar — both stay reachable via the footer and internal
  cross-links, per "do not remove working features merely because they are not
  described here" (brief §1).
- **Sitewide CTA system introduced** (`CTA_PRIMARY` "Start a Research Project",
  `CTA_SECONDARY` "See Sample Intelligence", `CTA_HIGH_INTENT` "Talk to a Strategist",
  `CTA_SAMPLE_DATA` "Request Sample Data" reserved for data-specific evaluation contexts)
  as centralized constants in `site.ts` rather than ~15 hand-typed button strings —
  the same single-source-of-truth pattern used for `PRIMARY_TAGLINE` and
  `DATASET_TIERS` earlier in this project, chosen specifically to avoid the exact kind
  of copy-drift bug those fixes were for. Swept across Header, About, Data Catalog,
  Pricing, and Industries (the pages not being content-reworked this phase); Home and
  Why LeadVault got the new CTAs as part of their own full rewrites. Data Catalog's own
  per-category "Request This Dataset" buttons were deliberately left unchanged — already
  appropriately data-specific per the brief's own carve-out (§5).
- **`PRIMARY_TAGLINE` updated** to "Know Who to Target. Know Why They Matter. Know How
  to Reach Them." (brief §2/§6) — same single-import pattern as before, so Home's H1 and
  the footer tagline can't drift apart. Footer's secondary description line updated to
  match ("B2B prospect intelligence — researched, qualified, and verified.").
- **Homepage fully rebuilt** (`index.astro`) around the brief's 12-section structure:
  Hero, The Problem, Lead-vs-Intelligence, Process (Discover→Qualify→Enrich→Prioritize→
  Act), Three Ways to Work With LeadVault, six Real-World Research Use Cases, a fictional
  Example Intelligence Output record, Database-Platform-vs-LeadVault, Fresh Research,
  Quality principles, and the Final CTA — plus the existing Sample Data section, the
  founder-origin/Trade story, and the Industries cross-link, all preserved rather than
  cut (brief §1's "do not remove working features" applied even though the homepage
  itself was a full rewrite).
  - **The old homepage's audience-segmentation ICP cards (Agencies/SaaS/Trade/Other
    self-identification) were deliberately dropped**, not an oversight — the new brief
    organizes the homepage around product tier (what you need), with audience-specific
    depth now living on `/industries` instead. Noted as a judgment call, not implied by
    an explicit brief instruction either way.
  - **The old "harvest"/"warehouse" framing was fully retired** from the homepage (the
    brief explicitly prohibits it, §2) — replaced with the "software vs. research"
    framing the owner approved. The cited 22–23%/year B2B data-decay statistic was kept
    (it's real, sourced, and the brief only objects to *unsupported* staleness claims
    about named competitors, not the citation itself) but reframed as "why freshness
    matters" rather than implying any specific platform's data is stale.
  - **A new fictional "Example Intelligence Output" record was written** for Section 7,
    deliberately tied back to Section 2's own example question (a medical-provider/
    personal-injury scenario) so the page tells one coherent story from problem to
    deliverable rather than a disconnected sample. Follows this project's established
    fictional/masked-data convention (masked email/phone, clearly labeled "illustrative
    example record — not real customer data," visibly — not screen-reader-only, per the
    fix from the Data Catalog audit two weeks ago) — no real customer data, no invented
    statistics.
- **Why LeadVault fully reworked** (`why-leadvault.astro`) per the owner's explicit
  decision: retired "The Warehouse vs. The Harvest" as the page's central thesis,
  replaced with "Software Gives You the Search Tools. LeadVault Does the Research." —
  developed *substantially* on this page (a new 6-reason grid drawn from the brief's §14
  content, a "category distinction" flow comparison, and an added "Qualification depth"
  row on the existing comparison table) rather than just repeating the homepage's
  compact version, per the owner's explicit instruction not to duplicate. Named
  competitor list extended from Apollo/ZoomInfo/RocketReach/Lusha to also include
  Hunter/Cognism/Clay, matching the brief's §14 list. The already-hedged comparison-table
  rows and disclaimer from the earlier credibility audit were kept as-is (still accurate,
  still defensible) rather than rewritten without reason.
- **`PipelineGraphic.astro` component is now unused** — the homepage's new 5-stage
  Process section (Discover/Qualify/Enrich/Prioritize/Act) needed different stages and
  meaning than its hardcoded 4-stage Source/Verify/Clean/Deliver content, so it was
  rebuilt inline rather than repurposing the shared component (which nothing else on the
  site imports). Left in place rather than deleted — not broken, just orphaned pending a
  decision on whether it's wanted elsewhere later.
- **Verified via `npm run build` (zero errors, 17 pages), a static link/asset/SEO
  checker (zero broken links, zero missing assets, exactly one `<h1>` everywhere), and a
  live Playwright pass**: zero console errors and zero horizontal overflow across 11 key
  pages at 320/375/768/1280px; desktop Solutions dropdown and mobile accordion both open
  and correctly reveal the Trade & Counterparty Intelligence link; header CTA confirmed
  "Start a Research Project" → `/contact`; homepage confirmed to contain the new H1,
  zero "harvest"/"warehouse vs" language, the visible example-record disclaimer, and the
  preserved data-decay citation; Why LeadVault confirmed to show the new thesis H1, zero
  trace of the old H1, and all 6 named competitors present. Screenshotted the header at
  1280/1440px specifically to check for the nav-crowding risk flagged in the audit — it
  does not crowd in practice.
- **Not deployed.** Pending explicit owner review of this phase before continuing to the
  next (the five new commercial pages + `/services` rework).

## Repositioning — Core Commercial Pages (5 new pages + Services rework)

Phase 1 approved as-is (including the ICP-card removal, confirmed rather than reverted).
This phase: the five dedicated commercial pages the brief specifies, plus a comprehensive
rework of `/services` into the Solutions overview hub, plus updating every interim nav/
homepage link from Phase 1 to its real destination.

- **Five new pages created**: `/prospect-intelligence` (flagship), `/qualified-prospect-data`,
  `/market-icp-research`, `/decision-maker-intelligence`, `/managed-outreach`. Built as flat
  `.astro` files (`src/pages/prospect-intelligence.astro`, etc.) rather than the brief's
  literally-suggested trailing-slash directory URLs (`/prospect-intelligence/`) — matches
  every other page on the site and the sitemap/canonical trailing-slash normalization fixed
  earlier this project specifically to stop Google seeing two URL shapes per page. Flagged
  as a deliberate departure from the brief's literal suggestion, not the objective, per §34.
- **Differentiation strategy to avoid keyword cannibalization** between the four closely
  related research-tier pages (owner's explicit requirement): Prospect Intelligence is the
  broad flagship/umbrella (use when unsure which angle fits); Qualified Prospect Data is
  for an *already-defined* specification (closest to a standard data order); Market & ICP
  Research is "zoom out" — defining/sizing the addressable market *before* prospect-level
  work starts; Decision-Maker Intelligence is "zoom in" — role-relevance research once the
  target *companies* are already known. Each page's own "Is This the Right Service?" section
  cross-links to the other three by this exact distinction, so a visitor on the wrong page
  self-routes instead of reading duplicate content.
- **Each page carries**: a unique, brief-derived but expanded hero, a real capability/use-case
  section, a tailored process flow (not the same steps copy-pasted across pages), a
  cross-link section, a page-specific FAQ (4-5 questions each, no overlap between pages),
  and both `Service` and `FAQPage` JSON-LD. Verified all five carry correct self-referencing
  canonicals and both schema types in the built HTML.
- **Qualified Prospect Data pulls its pricing tiers directly from the existing
  `DATASET_TIERS`** (Round 15) rather than restating numbers — same single-source-of-truth
  discipline as everywhere else in this project. No prices were changed anywhere in this
  phase, per the explicit instruction.
- **Managed Outreach's content is the existing Managed Email Campaigns offering**, carried
  over from `services.astro`/`pricing.astro` (capability list, compliance framing) rather
  than invented fresh — real, already-offered, just given a dedicated page. Kept the
  "no infrastructure jargon in primary copy" discipline from an earlier audit; the
  compliance FAQ answer deliberately avoids promising "universal legal compliance" (brief
  §11/§25), matching this project's established claims discipline.
- **Data Cleaning & Enrichment deliberately did *not* get a dedicated page** — the owner's
  instruction was to judge this case specifically, not default to "build one for menu
  completeness." Its real content (list hygiene, deliverability verification, bounce
  removal) is narrower in scope than the four research-tier pages and doesn't need a
  hero/use-cases/process/FAQ treatment to be useful; it stays as a well-developed anchor
  section (`/services#data-cleaning`) on the reworked Services overview instead. Reasoning
  recorded here per the owner's explicit request to explain this specific call.
- **`/services` reworked from a flat 8-card catalogue into the Solutions overview hub**:
  the "Flagship" badge moved from the old "Custom Fresh Datasets" card to the new
  "Prospect Intelligence" card (the brief names Prospect Intelligence, not Qualified
  Prospect Data, as flagship — the old page had mislabeled this before the repositioning).
  Two services that never had a corresponding old card — Market & ICP Research and
  Decision-Maker Intelligence — were added as new cards linking to their dedicated pages.
  "Custom Data Projects" was folded into the Prospect Intelligence card's framing rather
  than kept as a separate thin card (it was always describing the same "requirement too
  complex for a standard category" idea). The "Not Sure Where to Start?" decision guide
  was rewritten with new IF/THEN logic covering all eight solutions, each answer routing
  to the correct in-page anchor.
- **Navigation updated from Phase 1's interim state to real destinations**: the top-level
  "Prospect Intelligence" link and all six Solutions-dropdown items now point at their
  real pages (`/trade` unchanged, `/services#data-cleaning` for Data Cleaning &
  Enrichment, the other five at their new dedicated URLs). Homepage's "Three Ways to Work
  With LeadVault" CTAs (Explore Prospect Data / Explore Prospect Intelligence / Explore
  Managed Outreach) updated from their Phase 1 `/services` placeholders to the same real
  URLs. Checked for any other stale `/services` anchor references site-wide (old
  `#custom-fresh-datasets`/`#monthly-prospect-research` ids no longer exist after the
  services.astro restructure) — found none; the two remaining plain `/services` links
  (Trade's cross-link, Thank-you's post-conversion link) are legitimate general
  "see our services" links, unaffected by the restructure.
- **Contact form's `?need=` pre-fill extended to the 5 new slugs** via
  `NEED_SLUG_TO_OPTION` in `catalog.ts` — mapped onto the *closest existing* NEED_OPTIONS
  value (e.g. `qualified-prospect-data` → "Fresh custom dataset", `managed-outreach` →
  "Managed email campaigns") rather than adding new dropdown options, since reworking the
  Contact form's own field set is explicitly a separate, later-scoped phase (brief §19).
  Verified all 5 pre-fill correctly.
- **GA4, Meta Pixel, Search Console verification, canonical normalization, sitemap,
  robots.txt, and Netlify Forms were not touched** — confirmed via the build (all 5 new
  pages appear in the sitemap automatically through the existing Astro/BaseLayout
  architecture, no new config needed) and via the link/canonical checker.
- **Verified via `npm run build` (zero errors, 22 pages — up from 17), the static link/
  asset/SEO checker (zero broken links, zero missing assets, one `<h1>` everywhere across
  all 22 pages), and a live Playwright pass**: all 16 key pages load with zero console
  errors; zero horizontal overflow at 320/375/768/1280px; every nav destination (top-level
  and all 6 Solutions-dropdown items) resolves to its intended real URL; cross-link
  click-throughs between all four research-tier pages and from Services confirmed working;
  all 5 `?need=` pre-fills confirmed correct; FAQPage + Service schema and correct
  canonicals confirmed present on all 5 new pages. One test-script bug caught and fixed
  along the way (an unscoped Playwright locator matched the header's own now-real
  Solutions-dropdown link of the same href before the page's own visible cross-link card —
  not a site defect, confirmed by screenshot and fixed by scoping the locator to `<main>`).
- **Not deployed.** Stopping here for owner review, per instruction.

## Repositioning — Final Pre-Production Audit

Supporting pages phase approved as-is. This round was explicitly audit-only — "do not
perform another broad rewrite... make only clearly justified corrections discovered
during the audit" — so every change below is tied to a specific defect found, not a
style pass.

- **Real defect #1 — duplicate `<title>` tag.** Homepage and `/prospect-intelligence`
  both used the exact string "B2B Prospect Intelligence & Research | LeadVault" (the
  homepage's Phase 1 title was never revisited after the flagship page was built in a
  later phase using the same phrase). Direct keyword-cannibalization risk between the
  two most important pages on the site. Fixed by retitling the homepage to "LeadVault —
  B2B Prospect Intelligence Company" — brand-forward, distinct from the flagship page's
  service-specific title. Confirmed via a full duplicate-title scan across all 22 pages
  afterward: zero duplicates remain (descriptions were already unique).
- **Real defect #2 — the most significant one: horizontal page overflow at 1024px on
  every single page.** Not caught by any earlier phase because none of them tested this
  exact width (prior phases used 320/375/768/1280). This audit's expanded 6-breakpoint
  set (320/375/768/1024/1280/1440) caught it immediately. Root cause: adding
  "Prospect Intelligence" as a 7th top-level nav item in the Shared Foundation phase
  made the desktop header wider; at exactly Tailwind's `lg` breakpoint (1024px) the full
  desktop nav + logo + "Start a Research Project" button no longer fit, pushing the
  header (and therefore the whole page) to ~1207px wide inside a 1024px viewport — a
  genuine, sitewide layout bug at a common tablet/small-laptop width. Confirmed via
  direct DOM measurement (`documentElement.scrollWidth` 1207 vs `clientWidth` 1024)
  before touching anything. Fixed by moving the desktop-nav/mobile-nav switchover from
  `lg:` to `xl:` in `Header.astro` (4 class changes: the desktop `<nav>`, the header CTA
  button wrapper, and both mobile-nav triggers) — the full desktop nav now only appears
  at 1280px+, where it was already confirmed to fit correctly; 1024–1279px now shows the
  same mobile hamburger/accordion nav already proven to work well, screenshotted to
  confirm it renders cleanly at 1024px. Re-ran the full 6-breakpoint sweep afterward:
  zero overflow anywhere.
- **Two small content-quality fixes** from a fresh read of all 5 new commercial pages
  (the brief's "read the actual rendered copy, not just the source structure"
  instruction): Qualified Prospect Data's cross-link card title "Requirement isn't a
  simple filter away?" was awkward on first read — reworded to "Requirement too specific
  for a filter?"; Decision-Maker Intelligence's FAQ answer "commonly ordered against a
  company list" → "commonly run against a company list" (more natural phrasing). Neither
  changes meaning, both are minor clarity fixes, not a rewrite.
- **One structured-data gap addressed**: `WebSite` schema was recommended in the
  original repositioning audit (brief §20K) but never actually added. Added it alongside
  the existing `Organization` schema on the homepage only (the two are conventionally
  paired). Deliberately did **not** add `BreadcrumbList` — the site has no visible
  breadcrumb UI, and schema should only describe what's actually visible, per the
  brief's own instruction not to add structured data solely to chase rich results.
- **Everything else in the audit came back clean, confirmed rather than assumed**: zero
  broken links, zero missing assets, one H1 per page, unique meta descriptions, complete
  OG/Twitter metadata on all 22 pages, zero orphan pages (every real page has multiple
  inbound internal links), zero unsupported-claim patterns in a full-site grep (the two
  regex hits were both correctly-hedged negations — "we don't claim... permanently
  deliverable" and "we can't guarantee results" — confirmed by reading their actual
  context, not just the match), all 6 customer journeys (A–F) click through correctly,
  all 4 Netlify Forms present and functional, all 3 pre-fill paths (`?need=` old and new
  slugs, `?tier=`) correct, zero console errors across 21 pages, landmarks/alt-text/
  form-labels all present (the one flagged "unlabeled" field is the honeypot, which is
  deliberately structured that way and irrelevant to real users), GA4/Meta Pixel
  unchanged and real, no GTM introduced, all 4 product-architecture distinctions
  (Prospect Intelligence / Qualified Prospect Data / Market & ICP Research /
  Decision-Maker Intelligence) read as genuinely distinct on a fresh page-by-page read,
  and every original price confirmed present and unchanged.
- **One performance observation reported, not fixed**, per this round's explicit
  instruction not to risk an optimization pass merely for a synthetic score: Tools'
  hero image uses `loading="lazy"` despite likely being that page's LCP element — a
  pre-existing pattern from the shared `ImagePlaceholder` component (applied uniformly,
  not introduced this round). Flagged for a future, deliberate fix rather than touched
  here.
- **Not deployed.** Stopping here for owner review, per instruction.

## Repositioning — Supporting Pages (Data Catalog, Tools, Trade, About, Pricing, Contact, Industries)

Core commercial pages phase approved as-is (product differentiation, URLs, internal
linking, no-trailing-slash format, Data Cleaning & Enrichment staying anchor-only — all
confirmed rather than revisited). This phase reworks the seven supporting pages plus a
sitewide terminology sweep, per the owner's detailed per-page instructions.

- **Data Catalog**: kept the exact URL, all 11 categories, sample previews, `?need=`
  pre-fill, and the portal waitlist form completely untouched. Repositioned only the
  hero copy — "Data Catalog" → "Research Capabilities," removed "harvested on request —
  not stored in a warehouse," replaced with "researched on request — not retrieved from
  a prebuilt list" (the brief's own preferred phrase). Added one natural cross-link to
  `/prospect-intelligence` for visitors who need qualification/evidence work the
  catalog's category browse doesn't represent.
- **Tools**: reframed as "The Research & Verification Engine Behind LeadVault" (brief
  §15's own heading, used verbatim). Removed "Campaign Infrastructure" (sending
  infrastructure is now Managed Outreach's own domain) and added two new cards —
  Qualification & Evidence Capture, Decision-Maker Enrichment — so the toolbox still
  reads 7 cards, now covering the brief's full checklist (multi-source discovery,
  qualification, evidence capture, decision-maker enrichment, verification,
  normalization, deduplication, human review) without naming any vendor, credential, or
  proprietary architecture. Pipeline stages renamed RESEARCH→QUALIFY→ENRICH→VERIFY→
  DELIVER (from RESEARCH→FILTER→VERIFY→CLEAN→DELIVER), aligning with the homepage's own
  Discover/Qualify/Enrich/Prioritize/Act process language.
- **Trade**: preserved the entire page structure and specialist content untouched.
  Added "Trade & Counterparty Intelligence" as the public eyebrow heading with "Powered
  by the LeadVault Trade Desk" as a sub-brand line under it (brief §12's exact
  preference) — did not touch the H1 itself ("Verified Buyers. Genuine Suppliers. Real
  Deals.") since it makes no guarantee of a transaction or outcome, just describes
  verification quality. Fixed the one real "warehouse" leftover: "not recycled from a
  warehouse" → "not retrieved from a prebuilt list."
- **About**: fixed "the anti-warehouse model" → "not a stored, aging database," and
  retired the "leads are water" philosophy metaphor (exactly the lead-list-seller
  framing this phase's instruction named) for "a business can't act on an opportunity it
  hasn't found yet" — keeps the same farm/rain follow-on sentence, which still works
  unchanged. Added two new paragraphs to the Founding Story explicitly walking the
  evolution from trade-specific research into the full ladder (custom prospect data →
  qualification/verification → market & ICP research → intelligence-led outreach) —
  **no new facts invented**: no founding date, team size, customer count, office count,
  or award was added, per the explicit instruction. The founder's direct-quote
  blockquote and the three Vision/Mission/Philosophy cards' factual content were left
  alone — authentic, already-approved material, not touched merely because positioning
  language changed elsewhere on the page.
- **Pricing — the most sensitive page, zero monetary amounts changed.** Verified this
  directly: every dollar figure ($29/$59/$99/$179/$299/$199/$399/$799/$39/$129/$399/
  $449) confirmed present, unchanged, in both the build output and a live render.
  Restructured presentation only: "Custom Fresh Datasets" → "Qualified Prospect Data"
  (section header only, same table, same numbers); added a new "Prospect Intelligence"
  card in the same section — **Custom Quote — Discuss Your Project, no price shown**,
  per the explicit instruction not to invent a $249 figure the owner hasn't approved;
  "Email List Cleaning" → "Data Cleaning & Enrichment," "Trade Desk (Buyer–Seller
  Matching)" → "Trade & Counterparty Intelligence" (sub-brand line added), "Managed
  Email Campaigns" → "Intelligence-Led Outreach" (added a second link to the new
  dedicated page alongside the existing Talk-to-a-Strategist CTA). FAQ's payment answer
  updated to name all the new service labels explicitly. No checkout/payment logic
  touched anywhere.
- **Contact — reconciled fields against the brief rather than rebuilding.** Two labels
  renamed to the brief's own wording without adding new fields: "Your biggest challenge
  in reaching customers right now" → "What are you trying to achieve?" (same textarea,
  same `name` attribute); "Who is your ideal customer or counterparty?" → "...or
  decision-maker?" (same input). Two fields genuinely added, both optional, both
  low-friction: **Website** (brief-recommended, paired into the existing Business Name
  row rather than lengthening the form) and **"Do you need outreach support too?"**
  (directly serves routing between the research-only and Managed-Outreach paths the new
  product ladder introduces — not scope creep, a genuine gap the old form had no way to
  capture). Eyebrow changed to "Research Project Brief." **Deliberately did not**
  rename `NEED_OPTIONS` dropdown values or add a "Desired timeline" field — the former
  risks breaking the `?need=`/`?tier=` pre-fill string-matching for no positioning
  benefit (those are descriptive labels, not harvest/warehouse-style claims), the
  latter would add friction for marginal first-touch value; both reasoned trade-offs,
  not oversights. Verified honeypot, Netlify config, required-field set, and both
  pre-fill paths (`?need=`, `?tier=`) all still work correctly, plus tested a full
  submission with the two new fields filled.
- **Industries — kept the single hub page, did not manufacture individual industry
  URLs**, per the brief's own explicit permission to do so when it's the better
  architecture. The real editorial judgment call: added genuine depth **per group** (5
  groups), not per individual item (17 items) — a "Decision-makers we typically
  research" + "What we can investigate" callout for each group, each one actually
  different (VP Sales/Head of Growth for Sales & Growth Teams vs. Head of Talent
  Acquisition/Hiring Manager for Talent & Recruitment, etc.), not a template with the
  industry name swapped in. Per-item padding at that scale would have produced exactly
  the repetitive, keyword-swapped doorway content the instruction warned against; per-
  group depth adds real, distinct information without it. Title/H1/meta updated to
  "Prospect Intelligence by Industry" framing.
- **Sitewide terminology sweep performed before finishing**, not just within the 7
  pages: grepped every `.astro`/`.ts` file for "harvest," "warehouse," "leads are
  water," and old CTA wording, excluding code comments. Found and fixed exactly the 3
  real content hits (about.astro, data-catalog.astro, trade.astro — all already listed
  above); the only other "Warehouse" hits are a Lucide *icon name* representing
  wholesalers/distributors as a business type (a real icon for a real business
  category, not positioning language) — left alone. Legal pages were not touched; none
  contained the flagged terms, so there was nothing requiring the "flag separately"
  carve-out this round.
- **Verified via `npm run build` (zero errors, 22 pages), the static link/asset/SEO
  checker (zero broken links, zero missing assets, one `<h1>` everywhere), and a live
  Playwright pass**: all 16 key pages load with zero console errors; zero horizontal
  overflow at 320/375/768/1280px; Contact's new fields present and a full submission
  with them filled works end-to-end; all three pre-fill paths (`?need=` old catalog
  slugs, `?need=` new page slugs, `?tier=`) confirmed still correct; Pricing confirmed
  to show every original dollar figure with no invented $249; Trade's sub-brand line
  and Industries' new per-group depth confirmed present in the rendered page (one
  test-script false negative along the way — a case-sensitivity oversight against the
  `uppercase` CSS class on the new labels, not a real defect — caught by checking the
  raw rendered text directly before concluding anything was broken).
- **Not deployed.** Stopping here for owner review, per instruction.

## Full Commercial Content Implementation (master copy package, all 15 pages — not yet deployed)

Driven by `LEADVAULT_MASTER_COMMERCIAL_COPY_PACKAGE.md`, placed in the project root as the
binding source of truth for this round. Scope: implement its content across all 15 existing
page areas without thinning the supplied copy, inventing claims, or changing pricing/forms/
infra. Full validation run at the end; nothing committed or deployed.

- **Treated the master MD as the copy authority, not a copy-paste source.** Every page below
  carries the master's actual sentences and structure, but laid out through this site's
  existing component vocabulary (cards, pill lists, numbered steps, comparison tables,
  callout panels) rather than as a single scrolling wall of prose — consistent with the
  instruction that visual presentation is my discretion, the substance is not.
- **Homepage, Prospect Intelligence, Qualified Prospect Data, Market & ICP Research,
  Decision-Maker Intelligence**: rewritten in a prior part of this same session (see the
  conversation's own running log) before this ASSUMPTIONS entry was written; each gained the
  master's examples, process breakdowns, and FAQ depth without touching pricing or routing.
- **Managed Outreach**: added "Who It Is For" and "What We Need From You" (both previously
  absent), and expanded "What We Do Not Guarantee" to state plainly that LeadVault cannot
  promise universal legal compliance — only permission-appropriate, regulation-aware sending
  — matching the master's more cautious claims language exactly rather than the page's prior,
  slightly more confident compliance wording.
- **Data Catalog**: added a new "What Kind of Fields Can Be Included?" section (8 field-
  category cards: Company Identity & Location, Industry/Niche/Business Type, Company
  Characteristics, Decision-Makers & Stakeholders, Business Contact Information,
  Qualification & Evidence, Trade & Counterparty Fields, Custom Project Fields) plus a
  "Capability Is Not a Guarantee of Availability" disclaimer card. This sits *above* the
  existing 11 vertical sample-preview cards, which were left completely untouched — same
  CSVs, same `?need=<slug>` links, same waitlist form. The two sections answer different
  questions (what fields exist vs. what verticals we cover) so there's no duplication.
- **Tools**: added three new explanatory sections — "Why Multiple Sources Matter," "Human
  Judgment Still Matters," "Quality Is Project-Specific" — matching the master's RESEARCH/
  QUALIFY/ENRICH/VERIFY/DELIVER narrative, which the page already had as a 5-stage pipeline
  diagram from the repositioning phase. **Fixed the flagged lazy-loading/LCP issue**: added
  an optional `priority` prop to `ImagePlaceholder.astro` (sets `loading="eager"` +
  `fetchpriority="high"` instead of the hardcoded `loading="lazy"`) and set it on Tools' hero
  image only, since that's the one actually above the fold and likely the LCP element. Every
  other `ImagePlaceholder` usage site-wide is unaffected — the prop defaults to `false`, so
  every other photo slot keeps lazy-loading exactly as before.
- **Trade & Counterparty Intelligence**: added "What We Research" / "Product and Market
  Relevance" (two-column), "Counterparty Research" with an explicit not-legal/not-sanctions-
  screening/not-credit-diligence disclaimer card, an "Example Assignment" callout (rice
  importers into West Africa, labeled illustrative), "From Discovery to Commercial Outreach"
  linking to Managed Outreach, and expanded the founder-story section with a "Powered by the
  LeadVault Trade Desk" heading to match the badge text already in the hero. Six new sections
  meant re-deriving the section-background alternation for the rest of the page — the
  comparison table and final CTA both needed their tier flipped (default→mid, mid→default)
  to keep the alternation correct all the way to the bottom; verified by eye after the edit,
  not just by habit.
- **Industries — the one page restructured rather than extended.** The existing page (5
  grouped sections, 17 items, built in Round 19/the Industries repositioning round) was a
  deliberate anti-padding design, documented at the time as superior to per-item depth. But
  the master supplies genuine, specific, non-templated depth for exactly 7 *named* industries
  (Marketing Agencies, SaaS & Technology, Recruitment & Staffing, Financial & Professional
  Services, Trade/Import/Export & Distribution, E-commerce & Consumer-Facing Businesses, and
  — new, didn't exist on this page before — Healthcare & Specialist Services with its own
  Letters-of-Protection/medical-lien example) with real "Typical research" and "Relevant
  roles" lines per industry. Per the master-wins-on-conflict rule, I replaced the 5-group
  structure with these 7 named sections verbatim. The markets the master doesn't name
  individually (fintech, insurance, real estate, market research, call centers, events,
  wholesalers) were not dropped — they're real, already-served markets with their own Data
  Catalog categories — but kept as a compact link-out line rather than full card treatment,
  since giving each one the same depth as the master's 7 would mean inventing content the
  master never supplied, which is exactly the kind of fabrication this phase prohibits.
  Updated H1/eyebrow/meta to the master's exact text ("Different Markets. One Research
  Discipline.").
- **Why LeadVault**: replaced the prior "6 reasons" card copy (which covered similar ground
  but in different words) with the master's actual 6 numbered points verbatim (We Start With
  the Business Requirement → Deliverables Are Built to Be Used), added the "What We Will Not
  Claim" claims-discipline section and the "A Research Partner for Difficult Requirements"
  closer, and added the master's one-line even-handed framing ("These are different operating
  models. One is not automatically better than the other.") next to the existing, more
  detailed comparison table — kept the richer existing table rather than replacing it with
  the master's shorter prose version, since the table adds real information the prose
  summary doesn't and doesn't conflict with it.
- **Pricing — zero dollar amounts touched.** Added: Market & ICP Research and Decision-Maker
  Intelligence routing cards next to the existing Prospect Intelligence custom-quote block;
  a "What Affects a Custom Quote?" factor list; a "Which Option Should I Choose?" router
  table with direct links to each service; and 4 new FAQ items (subscription requirement,
  why Prospect Intelligence is custom-quoted, custom fields, qualified-prospect-does-not-
  guarantee-a-sale) alongside the 7 already on the page. Added an `id="monthly"` anchor on
  the existing Monthly Prospect Research section so the new router's "ongoing supply" row
  can link to it. Every existing price, tier name, and record count is byte-for-byte
  unchanged.
- **Services/Solutions**: added the master's exact "We're not completely sure.../We know..."
  one-line framing to each of the 7 service cards (rendered as a short italic lede above the
  existing "who it's for / the problem" block, not a replacement for it) and added the
  master's closing line ("Or skip the labels entirely...") above the existing bottom CTA.
  Left the existing decision-guide-at-the-top, flagship badge, and card layout exactly as
  built in the repositioning phase — the master's own routing logic ("If you do not know the
  market -> Market & ICP Research...") is the same logic already encoded in that guide, just
  phrased differently, so this was additive rather than a conflict.
- **About**: added "From Data Delivery to Prospect Intelligence" (folded into the end of the
  existing founding-story paragraph, since it's a direct continuation of that narrative, not
  a separate topic), a new "What We Believe" section (4 numbered beliefs, verbatim from the
  master), "What LeadVault Is Becoming" + "How We Work With Customers" (two-column), and "A
  Note on Trust" (claims-discipline framing). The founder bio section — photo, blockquote,
  "His experience spans" list — was left completely untouched, per the explicit instruction
  to preserve the authentic founder story. Adding 4 new sections meant re-flipping the
  section-background tier on 3 existing sections (founding story, differentiators, founder
  bio) to keep the alternation correct through a now-9-section page; verified end to end
  after the edit.
- **Contact**: added a "What to Include" checklist card (10 items, left column, above Direct
  Contact) and, below the existing hero/form grid, "What Happens After You Submit" (5-step
  numbered process), "You Can Start With an Imperfect Brief" (links to Market & ICP
  Research), and a "Privacy and Responsible Use" callout. **The form itself — all 12 fields,
  Netlify config, honeypot, `?need=`/`?tier=` pre-fill script — was not touched in any way.**
  Per the instruction's explicit carve-out, I did not add any new form fields even though the
  master's "What to Include" checklist covers a couple of items the form doesn't directly
  capture (e.g. "what should be excluded," "do you need supporting evidence") — those are
  presented as guidance text for the free-text fields instead. Flagged as an owner decision
  below rather than silently expanding the form.
- **Legal/utility pages**: read all 7 (privacy-policy, terms-of-service, data-sourcing-
  policy, removal-request, refund-replacement-policy, thank-you, 404). Only
  `terms-of-service.astro` needed a change — its "Our Services" intro paragraph and meta
  description still named only the pre-repositioning service list ("custom fresh datasets,"
  "managed email campaigns," "monthly lead subscriptions"). Updated that one paragraph and
  the meta description to list the current service names (Qualified Prospect Data, Prospect
  Intelligence, Market & ICP Research, Decision-Maker Intelligence, Intelligence-Led
  Outreach, Recurring Prospect Research) alongside the still-accurate Trade Desk and list-
  cleaning references — a terminology correction, not a rewrite of the legal terms
  themselves, which are otherwise unchanged. The other 6 pages had no stale terminology, no
  broken nav references, and needed no changes.
- **Sitewide terminology sweep**: grepped for harvest/warehouse/leads-are-water/old
  Managed-Email-Campaign wording/old CTA wording across `src/`. Remaining hits are: (1) the
  Lucide `Warehouse` icon component name on Trade (a real icon for a real business category,
  not positioning language), (2) `NEED_OPTIONS` dropdown values in `src/data/catalog.ts`
  ("Monthly lead subscription," "Managed email campaigns") — these are literal values
  submitted via the live Netlify form, so changing their on-page label text would change
  what's recorded in form submissions; left untouched and flagged as an owner decision below
  rather than silently changed, and (3) the terms-of-service fix already described above.
- **Validation performed**: `npm run build` (zero errors, 22 pages, confirmed via tool
  output); a static checker across every built HTML file confirming zero duplicate
  `<title>`/meta-description pairs, exactly one `<h1>` per page, a canonical tag on every
  page, zero broken internal links, and valid JSON-LD on every page that has it; a live
  Playwright sweep of all 15 reworked pages at 320/375/768/1024/1280/1440px confirming zero
  horizontal overflow and zero console errors; a second Playwright pass confirming the
  Solutions dropdown opens/closes correctly (click + Escape), the mobile nav accordion opens,
  and all three pre-fill paths still work correctly post-edit (`?need=prospect-intelligence`
  → "Custom data project"; `?need=international-trade-counterparties` → "Find
  buyers/suppliers (Trade Desk)" + ideal-customer text; `?tier=targeted-list` → "Fresh custom
  dataset" + "Under 500" + "$59" named correctly). All temporary verification scripts
  (`_tmp-*.mjs`) deleted before this write.
- **Not deployed, not pushed, no Google indexing requested.** Per explicit instruction, this
  round stops here for the owner's local review before any production step.

### Correction round — NEED_OPTIONS visible-label fix

Owner-approved implementation report flagged two stale visible dropdown labels ("Monthly lead
subscription," "Managed email campaigns") as needing a fix, with an explicit requirement to
preserve the underlying submitted values if the option system allows separating the two.

- **Split `NEED_OPTIONS` into `{ value, label }` pairs** in `src/data/catalog.ts` instead of a
  flat string array. `value` is untouched — the exact same 7 strings the form has submitted to
  Netlify since the original spec — so historical submissions and the `NEED_SLUG_TO_OPTION`
  pre-fill map both keep working with no further changes needed there. `label` is new,
  customer-facing-only text. `contact.astro`'s select now renders `<option value={n.value}>
  {n.label}</option>` instead of using the same string for both.
- **Label changes**: "Monthly lead subscription" → "Recurring Prospect Research"; "Managed
  email campaigns" → "Intelligence-Led Outreach"; also retitled the other 4 non-"not sure"
  labels to current architecture terms for consistency, since leaving them in old wording next
  to the two corrected ones would have looked inconsistent: "Fresh custom dataset" → "Qualified
  Prospect Data"; "Clean my existing list" → "Data Cleaning & Enrichment"; "Find
  buyers/suppliers (Trade Desk)" → "Trade & Counterparty Intelligence (Trade Desk)"; "Custom
  data project" → "Prospect Intelligence (Custom Research Project)". "Not sure — advise me" was
  left as-is (never stale).
- **"Custom data project" kept as one option, not split into three.** It already maps from
  three different `?need=` page slugs (prospect-intelligence, market-icp-research,
  decision-maker-intelligence) via `NEED_SLUG_TO_OPTION`. Splitting it into three dropdown
  entries would mean either inventing new submitted values with no historical data behind them
  or re-routing the pre-fill map — more change than asked for, and the instruction explicitly
  warned against "duplicate or confusing options if existing values already map to these
  services." Labeled it "Prospect Intelligence (Custom Research Project)" since Prospect
  Intelligence is the flagship/umbrella service and the parenthetical signals it also covers
  market/ICP and decision-maker work without listing all three.
- **Verified after the fix**: `npm run build` (22 pages, zero errors); Playwright dump of every
  rendered `<option>` confirming all 7 visible labels now match current terminology; all 8
  `?need=` pre-fill paths re-tested (5 page slugs + 3 catalog slugs) confirming the *visible*
  label updates while the underlying submitted `value` for each is byte-for-byte the same as
  before this round; all 4 `?tier=` pre-fill paths re-tested, unaffected; Netlify form attributes
  (`name="lead-survey"`, `data-netlify="true"`, `netlify-honeypot="bot-field"`,
  `action="/thank-you"`) and the honeypot field confirmed present and unchanged; zero horizontal
  overflow and zero console errors on Contact across all 6 breakpoints; zero broken links
  sitewide (22 pages). Temp verification scripts deleted before this write.
- **Not deployed, not pushed, no Google indexing requested.**
