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

- **Header nav shows 9 of the 10 "Explore" links**; "Get Started" is represented by the
  sticky teal CTA button (linking to `/contact`) instead of a duplicate text link, per
  CLAUDE.md's "nav, teal CTA button linking to /contact." The footer's "Explore" list
  still carries all 10, verbatim, per the copy doc.
- **Logo is a single component** (`src/components/Logo.astro`) referenced everywhere, so
  a real SVG logo can replace the text wordmark in one place later, per CLAUDE.md.
- **Duotone overlay** is a reusable `.lv-duotone` CSS class applied to every image slot
  now (on the placeholder blocks) and automatically to any real `<img>` dropped into that
  same wrapper later — no per-photo styling work needed at launch.

## Technical

- **Tailwind v4** (not v3) via `@tailwindcss/vite`, since it's the current stable major
  version and Astro 7 supports it directly — CLAUDE.md just says "Tailwind CSS," not a
  version.
- **FAQ accordion uses native `<details>/<summary>`**, not JavaScript, satisfying
  CLAUDE.md's "may use minimal vanilla JS" allowance with zero shipped JS. Mobile nav
  toggle does use a small vanilla-JS script, since a true hamburger open/close needs it.
- **OG image is a generated PNG** (`public/og-image.png`), rendered at build-adjacent
  time from an inline SVG via `sharp` (`scripts/generate-og-image.mjs`, `npm run
  generate:og`) — per CLAUDE.md's "SVG-rendered PNG" instruction. Re-run the script any
  time the brand mark or tagline changes.
- **`netlify.toml` includes a custom 404 page** (`src/pages/404.astro`) even though it's
  not one of the 11 listed pages — it's a utility page Netlify/browsers expect, not
  marketing content, so it doesn't conflict with "don't add pages beyond the 11."
