// Data Catalog categories + the mapping used to pre-fill the contact form's
// "What do you need?" select and "ideal customer" text field from the
// ?need=<slug> URL param (CLAUDE.md: catalog cards -> /contact?need=<category-slug>).
export interface CatalogCategory {
  slug: string;
  name: string;
  description: string;
  turnaround: string;
  highDemand?: boolean;
}

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    slug: 'international-trade-counterparties',
    name: 'International Trade Counterparties',
    description: 'Verified buyers, suppliers, shippers by product category and trade lane',
    turnaround: '3–7 days',
  },
  {
    slug: 'freight-logistics-companies',
    name: 'Freight & Logistics Companies',
    description: 'Forwarders, brokers, carriers, 3PLs by region',
    turnaround: '3–5 days',
  },
  {
    slug: 'business-decision-makers',
    name: 'Business Decision-Makers by Country/State',
    description: 'Owners, MDs, directors, filtered by industry and company size',
    turnaround: '3–5 days',
  },
  {
    slug: 'ecommerce-retail-businesses',
    name: 'E-commerce & Retail Businesses',
    description: 'Online sellers, store owners, marketplace merchants',
    turnaround: '3–5 days',
  },
  {
    slug: 'marketing-agency-contacts',
    name: 'Marketing & Agency Contacts',
    description: 'Agency founders and growth leads',
    turnaround: '3–5 days',
  },
  {
    slug: 'insurance-prospects',
    name: 'Insurance Prospects',
    description: 'Businesses and individuals by policy relevance',
    turnaround: '3–5 days',
  },
  {
    slug: 'investment-investor-leads',
    name: 'Investment & Investor Leads',
    description: 'Verified investors, HNW prospects, financial advisors, and capital-seeking businesses',
    turnaround: '3–5 days',
    highDemand: true,
  },
  {
    slug: 'real-estate-investors-developers',
    name: 'Real Estate Investors & Developers',
    description: 'Active market participants by location',
    turnaround: '3–5 days',
  },
  {
    slug: 'recruitment-targets',
    name: 'Recruitment Targets',
    description: 'Hiring managers and candidate pools by profession',
    turnaround: '3–7 days',
  },
  {
    slug: 'sme-startup-databases',
    name: 'SME & Startup Databases',
    description: 'By country, sector, and size',
    turnaround: '3–5 days',
  },
  {
    slug: 'fully-custom-specification',
    name: 'Fully Custom Specification',
    description: 'If you can define it, we can source it',
    turnaround: 'quoted per project',
  },
];

// "What do you need?" dropdown values — verbatim from the copy doc's contact form spec.
export const NEED_OPTIONS = [
  'Fresh custom dataset',
  'Clean my existing list',
  'Find buyers/suppliers (Trade Desk)',
  'Monthly lead subscription',
  'Managed email campaigns',
  'Custom data project',
  'Not sure — advise me',
];

// Maps every ?need= slug (catalog categories + the Trade Desk shortcut used on
// /services and /trade) to the matching dropdown option.
export const NEED_SLUG_TO_OPTION: Record<string, string> = {
  'trade-desk': 'Find buyers/suppliers (Trade Desk)',
  'international-trade-counterparties': 'Find buyers/suppliers (Trade Desk)',
  'fully-custom-specification': 'Custom data project',
  'managed-email-campaigns': 'Managed email campaigns',
};
