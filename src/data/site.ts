// Central nav/footer data so Header and Footer stay in sync with the copy doc's
// site-wide footer "Explore" list without duplicating the list in two files.
export interface NavLink {
  label: string;
  href: string;
}

export const EXPLORE_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Trade Desk', href: '/trade' },
  { label: 'Industries', href: '/industries' },
  { label: 'Why LeadVault', href: '/why-leadvault' },
  { label: 'Tools & Technology', href: '/tools' },
  { label: 'Data Catalog', href: '/data-catalog' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Get Started', href: '/contact' },
];

// Header nav omits "Get Started" — the sticky CTA button covers that slot.
export const HEADER_LINKS: NavLink[] = EXPLORE_LINKS.filter((l) => l.href !== '/contact');

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
export const HEADER_NAV: NavEntry[] = [
  { label: 'Home', href: '/' },
  { label: 'Prospect Intelligence', href: '/prospect-intelligence' },
  {
    label: 'Solutions',
    items: [
      { label: 'Qualified Prospect Data', href: '/qualified-prospect-data' },
      { label: 'Market & ICP Research', href: '/market-icp-research' },
      { label: 'Decision-Maker Intelligence', href: '/decision-maker-intelligence' },
      { label: 'Trade & Counterparty Intelligence', href: '/trade' },
      { label: 'Intelligence-Led Outreach', href: '/managed-outreach' },
      { label: 'Data Cleaning & Enrichment', href: '/services#data-cleaning' },
    ],
  },
  { label: 'Industries', href: '/industries' },
  { label: 'Why LeadVault', href: '/why-leadvault' },
  { label: 'Pricing', href: '/pricing' },
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
export const OFFICE_ADDRESSES = [
  { label: 'Nigeria', address: '16, Jegede Street, Shagari Estate, Ipaja-Lagos, Nigeria' },
  { label: 'USA', address: '4040 Synott Road, Houston, Texas 77082, USA' },
];
