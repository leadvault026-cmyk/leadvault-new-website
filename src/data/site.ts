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

// Header nav omits "Get Started" — the sticky teal CTA button covers that slot.
export const HEADER_LINKS: NavLink[] = EXPLORE_LINKS.filter((l) => l.href !== '/contact');

// Legal pages are drafted separately for lawyer review (out of Phase 1 scope per CLAUDE.md).
// Rendered as inert labels in the footer until those pages exist — see ASSUMPTIONS.md.
export const LEGAL_LINKS: string[] = [
  'Privacy Policy',
  'Terms of Service',
  'Data Sourcing Policy',
  'Removal Request',
  'Refund & Replacement Policy',
];

export const SITE_NAME = 'LeadVault';
export const SITE_URL = 'https://leadvault.com';
export const PRIMARY_TAGLINE = 'Every Business Needs Leads. Every Lead Starts Here.';
export const SECONDARY_TAGLINE = 'Every Business Needs Us — Or Our Data.';
