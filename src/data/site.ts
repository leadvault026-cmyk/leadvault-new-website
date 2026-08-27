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

export const HEADER_NAV: NavEntry[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Solutions',
    items: [
      { label: 'Services', href: '/services' },
      { label: 'Trade Desk', href: '/trade' },
      { label: 'Industries', href: '/industries' },
      { label: 'Data Catalog', href: '/data-catalog' },
    ],
  },
  { label: 'Why LeadVault', href: '/why-leadvault' },
  {
    label: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Tools & Technology', href: '/tools' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
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
export const PRIMARY_TAGLINE = "Tell Us Who You Need to Reach. We'll Research the Prospects That Match.";
export const SECONDARY_TAGLINE = 'Every Business Needs Us — Or Our Data.';

// Real contact details supplied by the client. WHATSAPP_NUMBER_INTL is digits-only
// (no "+", spaces, or leading zeros) — the format wa.me links require.
export const CONTACT_EMAIL = 'hello@leadvaultdata.com';
export const PHONE_DISPLAY = '+234 903 387 8984';
export const WHATSAPP_NUMBER_INTL = '2349033878984';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER_INTL}`;
export const OFFICE_ADDRESSES = [
  { label: 'Nigeria', address: '16, Jegede Street, Shagari Estate, Ipaja-Lagos, Nigeria' },
  { label: 'USA', address: '4040 Synott Road, Houston, Texas 77082, USA' },
];
