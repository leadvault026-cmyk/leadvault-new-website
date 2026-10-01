// Data Catalog categories + the mapping used to pre-fill the contact form's
// "What do you need?" select and "ideal customer" text field from the
// ?need=<slug> URL param (CLAUDE.md: catalog cards -> /contact?need=<category-slug>).
//
// Each category also carries a `sample` preview table, parsed at build time
// from the fictional CSVs in src/data/catalog-samples/ (see that folder's
// README — structure modeled on real LeadVault datasets, identities invented,
// emails/phones pre-masked; never real customer records).
import { parseCsv, type ParsedCsv } from '../lib/csv';

import tradeCounterpartiesCsv from './catalog-samples/trade-counterparties-sample.csv?raw';
import freightLogisticsCsv from './catalog-samples/freight-logistics-sample.csv?raw';
import businessDecisionMakersCsv from './catalog-samples/business-decision-makers-sample.csv?raw';
import ecommerceRetailCsv from './catalog-samples/ecommerce-retail-sample.csv?raw';
import marketingAgenciesCsv from './catalog-samples/marketing-agencies-sample.csv?raw';
import insuranceProspectsCsv from './catalog-samples/insurance-prospects-sample.csv?raw';
import investmentInvestorLeadsCsv from './catalog-samples/investment-investor-leads-sample.csv?raw';
import realEstateCsv from './catalog-samples/real-estate-sample.csv?raw';
import recruitmentTargetsCsv from './catalog-samples/recruitment-targets-sample.csv?raw';
import smeStartupCsv from './catalog-samples/sme-startup-sample.csv?raw';
import customSpecificationCsv from './catalog-samples/custom-specification-example.csv?raw';

export interface CatalogCategory {
  slug: string;
  name: string;
  description: string;
  turnaround: string;
  sample: ParsedCsv;
}

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    slug: 'international-trade-counterparties',
    name: 'International Trade Counterparties',
    description: 'Verified buyers, suppliers, shippers by product category and trade lane',
    turnaround: '3–7 days',
    sample: parseCsv(tradeCounterpartiesCsv),
  },
  {
    slug: 'freight-logistics-companies',
    name: 'Freight & Logistics Companies',
    description: 'Forwarders, brokers, carriers, 3PLs by region',
    turnaround: '3–5 days',
    sample: parseCsv(freightLogisticsCsv),
  },
  {
    slug: 'business-decision-makers',
    name: 'Business Decision-Makers by Country/State',
    description: 'Owners, MDs, directors, filtered by industry and company size',
    turnaround: '3–5 days',
    sample: parseCsv(businessDecisionMakersCsv),
  },
  {
    slug: 'ecommerce-retail-businesses',
    name: 'E-commerce & Retail Businesses',
    description: 'Online sellers, store owners, marketplace merchants',
    turnaround: '3–5 days',
    sample: parseCsv(ecommerceRetailCsv),
  },
  {
    slug: 'marketing-agency-contacts',
    name: 'Marketing & Agency Contacts',
    description: 'Agency founders and growth leads',
    turnaround: '3–5 days',
    sample: parseCsv(marketingAgenciesCsv),
  },
  {
    slug: 'insurance-prospects',
    name: 'Insurance Prospects',
    description: 'Businesses and individuals by policy relevance',
    turnaround: '3–5 days',
    sample: parseCsv(insuranceProspectsCsv),
  },
  {
    slug: 'investment-investor-leads',
    name: 'Investment & Investor Leads',
    description: 'Verified investors, HNW prospects, financial advisors, and capital-seeking businesses',
    turnaround: '3–5 days',
    sample: parseCsv(investmentInvestorLeadsCsv),
  },
  {
    slug: 'real-estate-investors-developers',
    name: 'Real Estate Investors & Developers',
    description: 'Active market participants by location',
    turnaround: '3–5 days',
    sample: parseCsv(realEstateCsv),
  },
  {
    // Repositioned toward business-development research (employers and hiring
    // decision-makers a recruitment agency can approach), not a candidate
    // database — commercial-completion round, see ASSUMPTIONS.md. Candidate
    // sourcing is still available, just as a separate custom request rather
    // than this category's primary example.
    slug: 'recruitment-targets',
    name: 'Recruitment Market Research',
    description: 'Employers and hiring decision-makers to approach for business development, by industry and hiring signal — candidate sourcing available as a separate custom request',
    turnaround: '3–7 days',
    sample: parseCsv(recruitmentTargetsCsv),
  },
  {
    slug: 'sme-startup-databases',
    name: 'SME & Startup Databases',
    description: 'By country, sector, and size',
    turnaround: '3–5 days',
    sample: parseCsv(smeStartupCsv),
  },
  {
    slug: 'fully-custom-specification',
    name: 'Fully Custom Specification',
    description: 'If you can define it, we can source it',
    turnaround: 'quoted per project',
    sample: parseCsv(customSpecificationCsv),
  },
];

// "What do you need?" dropdown. `value` is the literal string submitted to
// Netlify Forms — unchanged since the form's original spec, so historical
// submissions and the NEED_SLUG_TO_OPTION pre-fill map below both keep
// working untouched. `label` is the customer-facing text only, updated
// during the full commercial content implementation (2026-10-01 correction
// round) to retire two labels ("Monthly lead subscription," "Managed email
// campaigns") that no longer matched the current service architecture —
// see ASSUMPTIONS.md. Submitted values were deliberately left exactly as
// they were; only what the visitor sees in the dropdown changed.
export interface NeedOption {
  value: string;
  label: string;
}

export const NEED_OPTIONS: NeedOption[] = [
  { value: 'Fresh custom dataset', label: 'Qualified Prospect Data' },
  { value: 'Clean my existing list', label: 'Data Cleaning & Enrichment' },
  { value: 'Find buyers/suppliers (Trade Desk)', label: 'Trade & Counterparty Intelligence (Trade Desk)' },
  { value: 'Monthly lead subscription', label: 'Recurring Prospect Research' },
  { value: 'Managed email campaigns', label: 'Intelligence-Led Outreach' },
  { value: 'Custom data project', label: 'Prospect Intelligence (Custom Research Project)' },
  { value: 'Not sure — advise me', label: 'Not sure — advise me' },
];

// Maps every ?need= slug (catalog categories + the Trade Desk shortcut used on
// /services and /trade) to the matching dropdown option.
export const NEED_SLUG_TO_OPTION: Record<string, string> = {
  'trade-desk': 'Find buyers/suppliers (Trade Desk)',
  'international-trade-counterparties': 'Find buyers/suppliers (Trade Desk)',
  'fully-custom-specification': 'Custom data project',
  'managed-email-campaigns': 'Managed email campaigns',
  // Repositioning's 5 new commercial pages (2026-09-30) — mapped onto the
  // closest existing NEED_OPTIONS value rather than adding new dropdown
  // options, since reworking the Contact form's own field set is a later,
  // separately-scoped phase (brief §19). This keeps today's pre-fill working
  // without touching the form itself.
  'prospect-intelligence': 'Custom data project',
  'qualified-prospect-data': 'Fresh custom dataset',
  'market-icp-research': 'Custom data project',
  'decision-maker-intelligence': 'Custom data project',
  'managed-outreach': 'Managed email campaigns',
};

// The fixed-price, one-time dataset tiers shown on /pricing. Single source of
// truth for both that page's table/"Request This Tier" links and the contact
// form's ?tier=<slug> pre-fill script (payment/pricing audit round — see
// ASSUMPTIONS.md) — keeps the price shown on Pricing and the price named in
// the pre-filled contact request from ever drifting apart.
export interface DatasetTier {
  slug: string;
  name: string;
  records: string;
  price: string;
  volumeBucket: string;
}

export const DATASET_TIERS: DatasetTier[] = [
  { slug: 'prospect-sample', name: 'Prospect Sample', records: '100', price: '$29', volumeBucket: 'Under 500' },
  { slug: 'targeted-list', name: 'Targeted List', records: '250', price: '$59', volumeBucket: 'Under 500' },
  { slug: 'campaign-list', name: 'Campaign List', records: '500', price: '$99', volumeBucket: '500–2,500' },
  { slug: 'larger-campaign', name: 'Larger Campaign', records: '1,000', price: '$179', volumeBucket: '500–2,500' },
];
