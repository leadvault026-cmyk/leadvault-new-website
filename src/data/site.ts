// Central nav/footer data so Header and Footer stay in sync with the copy doc's
// site-wide footer "Explore" list without duplicating the list in two files.
export interface NavLink {
  label: string;
  href: string;
}

// Phase 1 (2026-10-03): Industries, Why LeadVault and Tools & Technology moved
// to the footer only. Current service destinations are temporary until Phase 2
// creates /lead-lists, /custom-research and /outreach.
export const EXPLORE_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Lead Lists', href: '/qualified-prospect-data' },
  { label: 'Custom Research', href: '/prospect-intelligence' },
  { label: 'Outreach & List Cleaning', href: '/managed-outreach' },
  { label: 'For Exporters & Importers', href: '/trade' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Samples', href: '/data-catalog' },
  { label: 'About', href: '/about' },
  { label: 'Industries', href: '/industries' },
  { label: 'Why LeadVault', href: '/why-leadvault' },
  { label: 'Tools & Technology', href: '/tools' },
];

// Grouped header nav (design review: 9 flat items was too crowded). Two related
// groups collapse into keyboard-accessible dropdowns; everything still points at
// the same 11 pages, just organized. Footer keeps the full flat EXPLORE_LINKS list
// verbatim per the copy doc — this structure is header-only.
export interface NavGroup {
  label: string;
  items: NavLink[];
}
export type NavEntry = NavLink | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return 'items' in entry;
}

// Repositioning master brief (2026-09-30), §4 — replaces the old flat
// Solutions/Company groups with the brief's proposed architecture. All six
// Solutions items now have real destinations (the 5 dedicated commercial
// pages built in the "core commercial pages" phase, plus /trade, which
// already existed) — the interim /services placeholders from Phase 1 are
// gone. "Data Catalog" is deliberately removed from primary nav per the
// brief's explicit instruction (§4) — reachable via the footer and CTAs
// instead. "Tools & Technology" (the former "Company" group) isn't in the
// brief's proposed nav bar either — kept reachable via the footer and
// cross-links instead of primary nav.
// Phase 1 nav (2026-10-03): Home · Services ▾ · Pricing · Samples · About, plus
// Get Leads and the WhatsApp icon. "Learn" is intentionally absent until Phase 3
// creates /learn — add it back here at that point.
export const HEADER_NAV: NavEntry[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    items: [
      { label: 'Lead Lists', href: '/qualified-prospect-data' },
      { label: 'Custom Research', href: '/prospect-intelligence' },
      { label: 'Outreach & List Cleaning', href: '/managed-outreach' },
      { label: 'For Exporters & Importers', href: '/trade' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Samples', href: '/data-catalog' },
  { label: 'About', href: '/about' },
];

// Legal pages — drafted directly (not by outside counsel); see ASSUMPTIONS.md for
// the scope/limitations of that draft, recorded when these went live post-launch.
export const LEGAL_LINKS: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Data Sourcing Policy', href: '/data-sourcing-policy' },
  { label: 'Removal Request', href: '/removal-request' },
  { label: 'Refund & Replacement Policy', href: '/refund-replacement-policy' },
];

export const SITE_NAME = 'LeadVault';
export const SITE_URL = 'https://leadvaultdata.com';
// Positioning-pass correction (see ASSUMPTIONS.md, Round 12): the old tagline
// ("Every Business Needs Leads. Every Lead Starts Here.") was never actually
// imported anywhere — index.astro's H1 and Footer.astro's tagline each held
// their own hardcoded copy of the same string, so updating it here alone
// wouldn't have changed anything live. Both now import PRIMARY_TAGLINE
// directly, so there's exactly one place to change this going forward.
// Repositioning master brief §2/§6 — replaces the "Tell Us Who You Need to
// Reach..." research-service framing with the new B2B Prospect Intelligence
// umbrella proposition. Imported directly into both the homepage H1 and the
// footer tagline (see PRIMARY_TAGLINE's original note above) so there's still
// exactly one place to change this.
export const PRIMARY_TAGLINE = 'Know Who to Target. Know Why They Matter. Know How to Reach Them.';

// Sitewide CTA system (repositioning master brief §5) — centralized so every
// page uses the same button text for the same intent instead of ~15 separate
// hand-typed variants ("Request Sample Data", "Get Started", "Order Fresh
// Data", "Ask Us"...) drifting apart over time.
export const CTA_PRIMARY = 'Start a Research Project'; // decided visitor, any offering
export const CTA_HIGH_INTENT = 'Talk to a Strategist'; // complex/managed-outreach-style projects
export const CTA_SECONDARY = 'See Sample Intelligence'; // → /data-catalog's live sample previews; distinct from CTA_SAMPLE_DATA below (browsing vs. requesting)
// Low-commitment secondary CTA for visitors who aren't sure yet what they
// need (owner feedback, 2026-10-01: "Start a Research Project" alone assumes
// the visitor already knows what they want). Routes to /contact?tier=
// prospect-sample, which reuses the existing tier pre-fill script to set
// "What do you need?", volume, and the ideal-customer note automatically —
// no new pre-fill logic needed. Paired with CTA_PRIMARY on every page's
// closing CTA.
export const CTA_SAMPLE_DATA = 'Get a Sample';
export const CTA_SAMPLE_HREF = '/contact?tier=prospect-sample';

// Real contact details supplied by the client. WHATSAPP_NUMBER_INTL is digits-only
// (no "+", spaces, or leading zeros) — the format wa.me links require.
export const CONTACT_EMAIL = 'hello@leadvaultdata.com';
export const PHONE_DISPLAY = '+234 803 625 3684';
export const WHATSAPP_NUMBER_INTL = '2348036253684';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER_INTL}`;
export const WHATSAPP_GET_LEADS_LINK = `${WHATSAPP_LINK}?text=Hi%20LeadVault%2C%20I%27d%20like%20to%20get%20leads.`;

// Phase 1 (2026-10-03): Houston removed from public display per owner decision.
// Privacy policy keeps the full list below — it's a legal disclosure page.
export const OFFICE_ADDRESSES = [
  { label: 'Nigeria', address: '16, Jegede Street, Shagari Estate, Ipaja-Lagos, Nigeria' },
];
export const LEGAL_OFFICE_ADDRESSES = [
  ...OFFICE_ADDRESSES,
  { label: 'USA', address: '4040 Synott Road, Houston, Texas 77082, USA' },
];
export const CTA_MAIN = 'Get Leads';
