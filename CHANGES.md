# CHANGES — Design Review Round 1

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
