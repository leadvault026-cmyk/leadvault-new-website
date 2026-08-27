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
