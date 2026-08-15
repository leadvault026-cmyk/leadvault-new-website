# CHANGES

## Fix — Netlify Forms not detected / form submission 404s

**Symptom:** Netlify's Forms dashboard showed the generic empty-state tutorial instead
of listing `lead-survey`, across three production deploys. Submitting the live contact
form returned a hard 404 instead of redirecting to `/thank-you`.

**Diagnosis:** The contact form's HTML was verified fully correct — `data-netlify="true"`,
a `name` attribute, a matching hidden `form-name` input, and a matching honeypot field —
both in the local `npm run build` output and by fetching `https://leadvaultdata.com/contact/`
directly (byte-identical). Form detection was also confirmed enabled in Netlify's
project settings. The 404 on submission was the deciding clue: `netlify.toml` had a
blanket redirect —

```toml
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

— intended to serve a custom 404 page, but Astro already generates `dist/404.html`
automatically (from `src/pages/404.astro`), and Netlify serves it for any unmatched
route with **no redirect rule required**. Because this rule matched literally every
path with no exceptions, it intercepted the POST to `/thank-you` before Netlify's form
handling could process the submission — forcing a 404 instead of the real page, and
very plausibly interfering with form registration too.

**Fix:** Removed the redundant/harmful `[[redirects]]` block from `netlify.toml`.
Netlify's built-in unmatched-route → `404.html` behavior covers the same case without
swallowing form POSTs.

### Build

`npm run build` — 12/12 pages, zero errors. Confirmed `data-netlify="true"` still
present in `dist/contact/index.html`, `dist/index.html` (newsletter form), and
`dist/data-catalog/index.html` (waitlist form) after the change.

---

## Domain change — leadvault.com → leadvaultdata.com

The project's real domain is `leadvaultdata.com`, not `leadvault.com`. Searched the
whole project for `leadvault.com` and replaced every occurrence with
`leadvaultdata.com` — brand/company name stays "LeadVault" everywhere; only the URL
(and the email addresses that share its domain) changed. Touched:

1. **`astro.config.mjs`** — `site` field, which drives every absolute URL
   `@astrojs/sitemap` and `BaseLayout.astro` generate (canonical URLs, OG/Twitter
   `og:url`/`og:image`, sitemap entries).
2. **`src/data/site.ts`** — `SITE_URL` and `CONTACT_EMAIL` (`hello@leadvault.com` →
   `hello@leadvaultdata.com`), the single source both the Contact page and
   `BaseLayout` read from.
3. **`src/layouts/BaseLayout.astro`** — JSON-LD Organization schema's `url` field.
4. **`src/components/Footer.astro`** — the site-wide footer copyright line.
5. **`public/robots.txt`** — the `Sitemap:` directive.
6. **Documentation/reference files** — `README.md`, `CLAUDE.md`,
   `content/leadvault-website-copy-v5.md`, `START-HERE-UPLOAD-ORDER.md`, and
   `reference/leadvault-development-handoff-brief.md` — every domain/email mention in
   deployment instructions, the JSON-LD spec note, and the copy doc's own header/footer
   text, so none of them point a future reader at the wrong domain.

### Build

`npm run build` — 12/12 pages, zero errors. Verified in the build output: sitemap
(`sitemap-index.xml`/`sitemap-0.xml`) lists `https://leadvaultdata.com/...` URLs;
`robots.txt`'s `Sitemap:` line, every page's canonical/OG/Twitter URLs, and the
homepage's JSON-LD `url` all resolve to `leadvaultdata.com`; footer copyright renders
`leadvaultdata.com`. Re-searched the whole project afterward for `leadvault.com` —
zero remaining matches.

---

## New service — Managed Email Campaigns & Deliverability Engineering

Added across four places, per spec, copy used verbatim:

1. **Services page** (`src/pages/services.astro`) — new featured card, inserted directly
   after "Custom Fresh Datasets" (now the 2nd service; the rest shifted down). Card
   template extended with two new optional fields (`listIntro`, `body2`) to support
   the longer structured copy (intro → labeled tool list → closing line → compliance
   note → price) without changing how the other six simpler cards render. Card has
   `id="managed-email-campaigns"` (with `scroll-mt-28` so the sticky header doesn't
   cover it) for the deep links added below.
2. **Home page** (`src/pages/index.astro`) — one line added inside "The Solution"
   section, linking "Managed Email Campaigns" to `/services#managed-email-campaigns`.
3. **Tools & Technology page** (`src/pages/tools.astro`) — new "MX Sorting Engine"
   card, positioned 2nd (right after "Email Verification Engine," its natural sibling).
4. **Pricing page** (`src/pages/pricing.astro`) — new "Managed Email Campaigns" section
   with two cards (per-campaign / managed monthly), each listing verification, MX
   sorting, per-provider testing, warm-up, sending, and full report, with `$[X]`
   placeholders kept visible per the no-invented-numbers rule. Inserted between
   "Email List Cleaning" and "Monthly Lead Subscriptions" — this shifted every
   section after it by one position, so the whole rest of the page (subscriptions,
   Trade Desk/Agency cards, guarantee, FAQ) was re-alternated bg/bg-mid to keep the
   design review's "every section distinguishable at a glance" rule intact end to end.
5. **Contact form** — "Managed email campaigns" added to the "What do you need?"
   dropdown (`src/data/catalog.ts`'s `NEED_OPTIONS`), plus a
   `managed-email-campaigns` → "Managed email campaigns" entry in
   `NEED_SLUG_TO_OPTION` for consistency with the rest of the ?need= pre-fill system.

Sitemap needs no manual edit — `@astrojs/sitemap` regenerates it from actual routes
on every build, and no new pages were added (the service lives on existing pages).

### Build

`npm run build` — 12/12 pages, zero errors. axe-core color-contrast re-scan on every
touched page (/, /services, /tools, /pricing, /contact): 0 violations.

---

## Design Review Round 2 follow-up — continuous globe motion, bigger logo

1. **Nav/footer logo increased considerably.** The logo read as too small next to
   the CTA button (144px vs. the button's 244px at desktop). Header logo grew from
   `h-9 sm:h-10 lg:h-12` to `h-14 sm:h-16 lg:h-20`; footer from `h-12` to `h-20`.
   Verified at 1024/1280/1440px that the header still fits comfortably with room
   to spare.
2. **Hero globe's connection arcs now move continuously**, not once-and-freeze.
   Changed each of the 5 arcs' `stroke-dasharray`/`stroke-dashoffset` from a
   single large reveal segment to a small repeating dash pattern (`"16 12"`)
   animated with `repeatCount="indefinite"`, giving a perpetual "flowing"
   marching-dash effect along each connection rather than drawing in once and
   stopping. Durations/stagger kept proportional to each arc's original timing.
3. **Globe now rotates continuously.** Added a slow (90s/rotation), pure-CSS
   `rotate(360deg)` animation targeting only the SVG's country-shapes group
   (`svg > g:first-of-type`, anchored via `transform-box: view-box` to the
   sphere's true center) — arcs, nodes, and labels are siblings outside that
   group, so they stay fixed, aligned, and readable while the map appears to
   spin beneath them. This is pure CSS added in `HeroWorldGraphic.astro`; the
   SVG file itself gained no rotation-related markup. Respects
   `prefers-reduced-motion` (separate media query disables the CSS animation;
   the existing SMIL-pause script handles the arc/node loops).

Note: this necessarily means the SVG file is no longer byte-for-byte identical
to the originally delivered asset (see round 2 item 3 below) — the geography,
colors, node positions, and labels are still untouched; only the arc animation
timing attributes changed, per this explicit follow-up request.

### Build

`npm run build` — 12/12 pages, zero errors/warnings.

---

## Design Review Round 2 — exact brand colors, new logo, client-provided hero globe

1. **Exact brand colors applied.** Client specified "LEAD" = Electric Cyan/Neon Blue
   `#00D9FF`, "VAULT" = Neon Lime Green `#B7FF00`. Split the single accent token into
   two roles: `--color-cyan` (`#00D9FF`) for **every button/CTA** — `.btn-primary`,
   `.btn-outline`'s accent, focus-visible rings, the skip-to-content link — and
   `--color-lime` (`#B7FF00`) for everything else in the accent/highlight family
   (eyebrows, active nav state, links, stat numbers, icon tints, badges, highlight
   rings), left as-is since that grouping was already a deliberate, restrained system
   from round 1 (see ASSUMPTIONS.md for the reasoning on not over-mixing the two).
   Added `--color-cyan-ink` (`#04141A`) as the dark text color for cyan fills.
   Re-verified WCAG AA with axe-core after the swap: **0 violations, all 11 pages.**
2. **New rectangular logo installed.** `/logo/logo.png` is a redesigned 2172×724
   (3:1) wordmark lockup — shield+padlock mark, "LEAD" in cyan, "VAULT" in lime,
   transparent background — replacing the old square badge that read as illegible
   micro-text in the nav. `scripts/generate-brand-assets.mjs` now renders it at
   900px wide, palette-compressed to **14.4KB** (well under the ~40KB budget).
   `Logo.astro`, `Header.astro`, and `Footer.astro` resized for the new 3:1 aspect.
   The old square `logo.svg` is superseded and no longer copied into `public/`.
   `scripts/generate-og-image.mjs` also rebuilt around the new lockup and colors.
3. **Hero globe replaced with the client-provided asset, verbatim.**
   `leadvault-globe-animated.svg` (accurate world geography, multicolor countries,
   built-in SMIL-animated arcs, labeled/glowing nodes) is inlined into
   `HeroWorldGraphic.astro` via a Vite `?raw` import + `set:html` — confirmed
   **byte-for-byte identical** between source file and rendered HTML, so its colors,
   animations, and labels are untouched. Fills the hero's right column edge-to-edge
   on desktop (same responsive wrapper pattern as round 1), full-width below the
   headline on mobile, not cropped (verified by screenshot).
   - **Added `prefers-reduced-motion` handling that CSS can't provide**, since the
     graphic's animations are SVG SMIL (`<animate>` elements), which the CSS
     `prefers-reduced-motion` media query cannot reach. Uses the SVG DOM's native
     animation-control API instead: jumps the shared timeline past every one-time
     arc/label reveal and pauses it there, so reduced-motion users see the graphic
     fully drawn in (not stuck mid-animation) with the continuous node-pulse loops
     frozen. Verified with a Playwright test using `reducedMotion: 'reduce'`:
     animations report paused, current time frozen across repeated checks, and the
     screenshot shows all arcs fully drawn.

### Build

`npm run build` — 12/12 pages, zero errors/warnings. axe-core color-contrast scan:
0 violations across all 11 pages (unchanged from round 1's clean result).

---

# Design Review Round 1

Everything requested in the design review pass, implemented before further testing.

## 1. Rebrand from the logo

- Sampled `/logo/logo.png` and cross-checked against `/logo/logo.svg`'s gradient stops
  for exact hex values. New palette (replaces navy/teal completely):
  - Backgrounds: `#0A0B0D` (base) / `#22262E` (alternate-section/card/header tier) / `#000000` (deepest — footer)
  - Accents: `#EAFF00` lime (primary — CTAs, highlights, stat numbers, links) with
    `#0B1400` as the dark text color used on lime fills; `#00D9EC` cyan (secondary);
    `#86D30B` green (tertiary)
- Recorded in `CLAUDE.md`'s "Design tokens" section (v2, with the old v1 values kept
  as a labeled history note rather than deleted).
- Implemented as renamed CSS custom properties in `src/styles/global.css`
  (`--color-navy*` → `--color-bg*`, `--color-teal*` → `--color-lime*`, plus new
  `--color-cyan` / `--color-green`), then propagated with a project-wide mechanical
  rename across every `.astro`/`.ts` file — not a partial pass.
- Every text/background pairing verified with the WCAG relative-luminance formula
  by hand, then **independently re-verified with an automated axe-core color-contrast
  scan across all 11 pages: 859 elements checked, 0 violations.** (The scan caught
  real failures the hand-check missed — see ASSUMPTIONS.md.)

## 2. Logo and favicons installed

- `scripts/generate-brand-assets.mjs` (new, `npm run generate:brand`) processes
  `/logo` into `public/`:
  - `logo.png` — rendered from the vector source at 512×512 and palette-compressed
    to **26.8KB** (well under the ~40KB budget), retina-sharp at any header/footer size
  - `logo.svg`, `favicon.svg` copied through
  - `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` copied through
  - `favicon.ico` — generated (wasn't provided in `/logo`) via `png-to-ico` from the
    16×16 and 32×32 PNGs
- `Logo.astro` now renders the real image (`<img src="/logo.png">`) instead of the
  text wordmark, in both `Header.astro` and `Footer.astro`.
- `BaseLayout.astro`'s `<head>` wires up all four favicon formats plus the SVG icon.
- `scripts/generate-og-image.mjs` rewritten to composite the real logo onto the new
  palette's background instead of a fake text-only wordmark.

## 3. Header separated from hero; sections alternate site-wide

- Header moved to its own surface tier (`bg-mid`, not `bg`) plus `border-b` and
  `shadow-lg shadow-black/30`, so it reads as a distinct element over every page's
  hero/body — never blending in.
- New `.section-alt` utility (bg-mid + border-y) applied consistently; audited and
  fixed every page so adjacent sections alternate `bg` / `bg-mid` tiers instead of
  running together:
  - **Pricing** was the worst offender — 4 same-shade sections stacked in a row.
    Now alternates every section end to end.
  - **Services, Industries, Data Catalog, Tools** — content grids that shared the
    hero's background now sit in their own `section-alt` band.
  - **Home** — merged the trust-bar strip into the plain-language banner it was
    silently duplicating the shade of, and changed the final CTA from `bg-dark`
    (identical to the footer beneath it) to `bg-mid` so the two don't blend.
  - **Why LeadVault** — merged the "Two Models" cards into the hero section they
    were visually indistinguishable from.

## 4. Nav restructured

- Desktop: `Home · Solutions ▾ · Why LeadVault · Company ▾ · Pricing · [CTA]`.
  - **Solutions** groups Services, Trade Desk, Industries, Data Catalog.
  - **Company** groups About, Tools & Technology.
  - Dropdowns are real `<button>` elements (`aria-haspopup`, `aria-expanded`,
    `aria-controls`) — openable by click or keyboard (Enter/Space), closeable with
    Escape (returns focus to the trigger) or by clicking/tabbing outside.
  - The group label highlights lime when the current page is inside it (e.g.
    "Solutions" is active on `/services`), matching the existing single-link behavior.
- Mobile: same two groups, rendered as native `<details>/<summary>` accordions inside
  the slide-out menu — zero extra JS, keyboard/screen-reader accessible by default.
- `src/data/site.ts` gained a `HEADER_NAV` structure (`isNavGroup` type guard); the
  footer's flat 10-link "Explore" list is untouched, per the copy doc.

## 5. Hero world map rebuilt

- `HeroWorldGraphic.astro` fills the entire right column edge-to-edge (`aspect-square
  w-full`, no `max-w` cap above the `lg` breakpoint) instead of a small centered inset —
  roughly 3× the rendered size it was.
- Redrew node positions and the background wireframe to actually use the full 800×800
  canvas (previous coordinates left ~40% of the canvas empty and had an ellipse that
  overflowed the viewBox and got clipped).
- Arcs now cycle through all three accent colors (lime/cyan/green) instead of one
  single tint, with a slow dash-draw animation (5s loop, staggered per arc).
- Nodes (USA, UK, Canada, Nigeria, Worldwide) glow via an SVG blur filter and pulse
  continuously (staggered), with text labels rendered directly on the canvas.
- A very slow (90s) rotation on the background wireframe adds subtle life without
  competing with the arcs/nodes.
- All animation respects `prefers-reduced-motion: reduce`.
- On mobile, the graphic keeps its own `aspect-square` (no cropping) and simply flows
  below the headline/CTAs in the single-column stack — verified by scrolling it into
  view in a 375px viewport screenshot.

## Build

`npm run build` — 12/12 pages, zero errors/warnings.
