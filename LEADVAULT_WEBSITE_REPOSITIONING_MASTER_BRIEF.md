# LEADVAULT WEBSITE REPOSITIONING & IMPLEMENTATION MASTER BRIEF

**Project:** leadvaultdata.com\
**Hosting:** Netlify\
**Repository workflow:** VS Code → GitHub → Netlify\
**Primary implementation agent:** Claude Code\
**Prepared:** 30 September 2026\
**Status:** Implementation brief --- Claude must audit the existing
codebase before modifying it.

------------------------------------------------------------------------

## 1. PURPOSE OF THIS DOCUMENT

This document is the strategic, content, SEO, analytics, technical and
implementation brief for the next version of LeadVault.

Claude Code originally built the site and is expected to preserve the
sound foundations of the existing implementation. This is **not** an
instruction to discard the current website and rebuild it blindly. The
objective is to reposition, improve and extend it.

Claude has authority to inspect the entire repository, identify better
implementation approaches, challenge instructions that would cause
regressions or conflict with the existing architecture, and improve
implementation details. However, Claude must preserve the strategic
direction, product hierarchy and factual claims in this brief unless it
reports a specific reason for recommending a change.

Before editing: 1. Inspect the complete repository. 2. Identify the
framework, routes, components, layouts, styling, data files, forms,
scripts and build configuration. 3. Inspect `astro.config.mjs`,
`netlify.toml`, `package.json`, existing SEO components, sitemap/robots
implementation, analytics tags and any Search Console verification. 4.
Identify all current public URLs and navigation. 5. Identify forms and
their destinations. 6. Identify existing structured data, canonical
URLs, Open Graph/Twitter metadata and redirects. 7. Identify anything in
this brief already implemented correctly. 8. Produce a short
audit/implementation plan before making destructive changes. 9. Do not
remove working features merely because they are not described here. 10.
After implementation, run the production build and report every file
added, removed or materially changed.

------------------------------------------------------------------------

# 2. STRATEGIC REPOSITIONING

## New umbrella category

**LeadVault --- B2B Prospect Intelligence**

LeadVault should no longer appear primarily to sell rows in a
spreadsheet. The company researches markets and commercial
opportunities, qualifies which companies actually fit, identifies
relevant decision-makers, verifies available contact information, and
delivers intelligence that customers can act on.

### Primary proposition

# Know Who to Target. Know Why They Matter. Know How to Reach Them.

**Supporting copy**

LeadVault researches your target market, identifies and qualifies the
companies that match your opportunity, finds the relevant
decision-makers, verifies available contact data, and delivers prospect
intelligence your team can act on.

**Proof strip**

Fresh Research · Evidence-Backed Qualification · Decision-Maker Research
· Verified Contact Data · Worldwide Coverage

### Core distinction

A database platform gives the customer software and records to
investigate.

LeadVault performs the research.

Do not position LeadVault as "a better Apollo," "a cheaper ZoomInfo," or
another contact database. Software platforms can be valuable tools.
LeadVault belongs above the database layer:

**Customer brief → Discover → Qualify → Enrich → Prioritize → Act**

The existing quality workflow may remain as a secondary process:

**Source → Verify → Clean → Deliver**

Fresh research remains a core differentiator, but avoid broad
unsupported claims that competing databases are stale.

Preferred language:

> **Research initiated for your request --- not merely retrieved from a
> prebuilt list.**

Avoid "harvest" or language that makes the service sound like
indiscriminate scraping.

------------------------------------------------------------------------

# 3. PRODUCT ARCHITECTURE

The public commercial ladder should be:

## A. QUALIFIED PROSPECT DATA

For customers who already know precisely whom they need.

LeadVault researches prospects to a defined specification and delivers
clean, usable B2B contact data.

## B. PROSPECT INTELLIGENCE --- FLAGSHIP

For customers whose requirement cannot be solved by ordinary database
filters.

LeadVault investigates the target market, establishes why each prospect
fits, identifies the relevant decision-maker, verifies available contact
information and supplies supporting evidence where appropriate.

## C. INTELLIGENCE-LED OUTREACH

For customers who want LeadVault to put the research into action.

Research and qualification are followed by campaign preparation,
controlled outreach and reporting.

## D. TRADE & COUNTERPARTY INTELLIGENCE

Retain the specialist Trade Desk capability, but elevate its public
positioning.

**Trade & Counterparty Intelligence**\
*Powered by the LeadVault Trade Desk*

------------------------------------------------------------------------

# 4. PROPOSED PRIMARY NAVIGATION

**Home \| Prospect Intelligence \| Solutions ▾ \| Industries ▾ \| Why
LeadVault \| Pricing \| About \| \[START A RESEARCH PROJECT\]**

### Solutions dropdown

-   Qualified Prospect Data
-   Market & ICP Research
-   Decision-Maker Intelligence
-   Trade & Counterparty Intelligence
-   Intelligence-Led Outreach
-   Data Cleaning & Enrichment

### Industries

Retain useful existing industry pages after auditing them. Improve
rather than delete valuable SEO pages.

### Remove from primary navigation

"Data Catalog" should not remain a top-level primary navigation concept.
If the existing page has SEO value, preserve the URL where sensible and
reposition its content as **Research Capabilities** or redirect
carefully if the URL changes.

------------------------------------------------------------------------

# 5. SITEWIDE CTA SYSTEM

Use a disciplined CTA hierarchy.

### Primary

**Start a Research Project**

### Secondary

**See Sample Intelligence**

### High-intent / complex project

**Talk to a Strategist**

### Data-specific pages only

**Request Sample Data** may remain where the customer is explicitly
evaluating Qualified Prospect Data.

Avoid promising a custom free sample everywhere. A representative sample
format can demonstrate quality without committing LeadVault to unpaid
bespoke research for every visitor.

------------------------------------------------------------------------

# 6. HOMEPAGE --- FULL CONTENT DIRECTION

The homepage should be substantial but disciplined. Avoid thin sections,
repetitive claims and filler.

## SECTION 1 --- HERO

**Eyebrow:** B2B PROSPECT INTELLIGENCE

# Know Who to Target. Know Why They Matter. Know How to Reach Them.

LeadVault researches your target market, identifies and qualifies the
companies that match your opportunity, finds the relevant
decision-makers, verifies available contact data, and delivers prospect
intelligence your team can act on.

**Primary CTA:** Start a Research Project\
**Secondary CTA:** See Sample Intelligence

**Proof line:** Fresh Research · Evidence-Backed Qualification ·
Decision-Maker Research · Verified Contact Data · Worldwide Coverage

Preserve the existing LeadVault visual identity and any approved
globe/hero asset if it still works with the repositioning.

------------------------------------------------------------------------

## SECTION 2 --- THE PROBLEM

### A contact is not the same as a qualified opportunity.

Finding a company name and email address is easy. Knowing whether that
company genuinely matches a commercial objective is harder.

Standard databases are useful when your target can be described by
ordinary filters such as industry, location, company size or job title.
But many real prospecting assignments are more specific:

-   Which medical providers publicly indicate that they work with
    personal-injury patients?
-   Which manufacturers appear capable of supplying a particular
    product?
-   Which companies are expanding into a defined market?
-   Which businesses show evidence of a particular operational need?
-   Who inside each company is most relevant to the decision?

That is where LeadVault Prospect Intelligence begins.

------------------------------------------------------------------------

## SECTION 3 --- LEAD VS INTELLIGENCE

# A Lead Is a Contact. Intelligence Tells You Why to Contact Them.

### Traditional B2B Data

-   Company
-   Contact name
-   Job title
-   Email
-   Phone
-   Industry/location

### LeadVault Prospect Intelligence

Includes the useful contact data **plus**, depending on the project: -
ICP/fit qualification - Qualification basis - Supporting
evidence/source - Relevant business signals - Decision-maker relevance -
Prospect priority - Recommended outreach angle

Use a strong visual comparison rather than a dense table on mobile.

------------------------------------------------------------------------

## SECTION 4 --- PROCESS

# From a Target Description to Actionable Prospect Intelligence

### 1. Discover

We search for companies that could match the commercial opportunity ---
not merely businesses carrying an industry label.

### 2. Qualify

We investigate whether each company actually satisfies the criteria that
matter to the project.

### 3. Enrich

We identify relevant decision-makers and add available business contact
and company information.

### 4. Prioritize

Where the project requires it, we distinguish stronger opportunities
from weaker matches using fit, evidence and relevance.

### 5. Act

Use the intelligence in your own sales process, or engage LeadVault to
support the outreach.

------------------------------------------------------------------------

## SECTION 5 --- THREE WAYS TO WORK WITH LEADVAULT

### Qualified Prospect Data

Already know exactly whom you need? Give us the specification and we
will research and prepare the prospect data.

**CTA:** Explore Prospect Data

### Prospect Intelligence

Need to determine which companies truly match an opportunity and why? We
investigate the market and qualify the prospects.

**CTA:** Explore Prospect Intelligence

### Intelligence-Led Outreach

Want the research put into action? LeadVault can combine prospect
intelligence with campaign preparation, controlled outreach and
reporting.

**CTA:** Explore Managed Outreach

------------------------------------------------------------------------

## SECTION 6 --- REAL-WORLD RESEARCH USE CASES

# When Database Filters Are Not Enough

### Specialized Prospect Discovery

Find businesses matching criteria that do not exist as a simple database
filter.

### Market & ICP Mapping

Map a target market and identify companies that match a defined
ideal-customer profile.

### Decision-Maker Research

Identify the people most relevant to a purchasing, partnership or
commercial decision.

### Opportunity Intelligence

Research public evidence indicating that a company may fit a particular
commercial opportunity.

### Trade & Counterparty Intelligence

Research buyers, suppliers, importers, exporters, distributors and other
commercial counterparties.

### Geographic Prospect Mapping

Build qualified prospect coverage around defined cities, states,
countries or regions.

------------------------------------------------------------------------

## SECTION 7 --- EXAMPLE INTELLIGENCE OUTPUT

# See the Difference in the Deliverable

Show a polished fictional/representative record. Do not expose a real
customer's confidential data.

Fields may include:

COMPANY NAME\
WEBSITE\
CONTACT NAME\
CONTACT TITLE\
EMAIL ADDRESS\
PHONE NUMBER\
ADDRESS\
CITY\
STATE/REGION\
PROVIDER/COMPANY TYPE\
QUALIFICATION BASIS\
EVIDENCE URL\
PRIORITY/FIT (for intelligence projects where applicable)\
RECOMMENDED APPROACH (where included in scope)

Supporting text:

> The exact fields depend on the assignment. LeadVault structures the
> deliverable around the decision the customer needs to make --- not
> around a rigid database export.

------------------------------------------------------------------------

## SECTION 8 --- DATABASE PLATFORM VS LEADVAULT

# Software Gives You the Search Tools. LeadVault Does the Research.

### Self-Service Database Platform

You define filters → search → export → investigate → determine fit →
verify → prioritize → conduct outreach.

### LeadVault

You give us the commercial brief → we discover → investigate → qualify →
enrich → verify → prioritize → deliver.

Supporting copy:

LeadVault is not intended to replace every sales database. It is for
assignments where human judgment, evidence, multi-source research or
unusual qualification criteria matter.

------------------------------------------------------------------------

## SECTION 9 --- FRESH RESEARCH

# Research Initiated Around Your Requirement

We do not treat a prebuilt contact list as the finished answer.
LeadVault starts from the customer's specification and uses appropriate
research, enrichment, verification and quality-control methods to build
the deliverable.

Do not claim that every field was discovered within exactly three days
unless the operating process can guarantee it.

------------------------------------------------------------------------

## SECTION 10 --- TRADE

# Trade & Counterparty Intelligence

International trade prospecting often requires more than finding a
company in the right industry. LeadVault researches potential buyers,
suppliers and other counterparties against the customer's commercial
requirements and provides usable information for further qualification
and approach.

**CTA:** Explore the Trade Desk

------------------------------------------------------------------------

## SECTION 11 --- QUALITY

# Built for Decisions, Not Just Downloads

Use concise quality principles: - Project-specific research -
Multi-source discovery where appropriate - Evidence-backed
qualification - Relevant decision-maker research - Contact verification
where available - Deduplication and normalization - Human review for
ambiguous cases - Clear delivery structure

Do not publicly reveal internal vendor names or proprietary pipeline
architecture.

------------------------------------------------------------------------

## SECTION 12 --- FINAL CTA

# Tell Us the Market You Want to Reach.

Describe the companies, people, geography or commercial opportunity you
are targeting. LeadVault will assess the requirement and determine the
appropriate research approach.

**CTA:** Start a Research Project\
**Secondary:** Talk to a Strategist

------------------------------------------------------------------------

# 7. NEW/REWORKED PAGE: PROSPECT INTELLIGENCE

**Suggested URL:** `/prospect-intelligence/`

**SEO title:** B2B Prospect Intelligence & Research \| LeadVault\
**Meta description:** LeadVault researches and qualifies B2B prospects
around your commercial objective, identifies relevant decision-makers,
verifies available contact data and provides evidence-backed prospect
intelligence.

## Hero

# B2B Prospect Intelligence Built Around Your Opportunity

A list tells you who exists. Prospect intelligence helps you determine
who actually matters.

LeadVault researches target markets, qualifies companies against
project-specific criteria, identifies relevant decision-makers, verifies
available contact information and provides supporting evidence where the
assignment requires it.

**CTA:** Start a Prospect Intelligence Project

## What Prospect Intelligence Means

Prospect intelligence combines discovery, qualification and contact
research.

Instead of asking only: \> "Which companies belong to this industry?"

we can investigate: \> "Which companies in this market appear to meet
these exact commercial criteria, why do they qualify, who is relevant
inside them, and how can they be reached?"

This is particularly useful when the customer's requirement cannot be
represented by ordinary database filters.

## What a Project Can Include

-   Target-market discovery
-   ICP qualification
-   Company research
-   Qualification basis
-   Public supporting evidence
-   Decision-maker identification
-   Contact enrichment
-   Email verification
-   Phone/company details where available
-   Fit/priority classification
-   Suggested outreach angle where requested

State clearly that fields vary by scope and availability.

## When to Use It

Use Prospect Intelligence when: - your target definition contains
unusual or qualitative criteria; - you need evidence that a prospect
fits; - you need to identify the relevant person rather than any
available contact; - you are entering an unfamiliar market; - you need a
smaller set of better-qualified opportunities rather than a very large
generic list; - your team lacks time to perform manual qualification.

## How We Work

Brief → Research design → Discovery → Qualification → Enrichment →
Quality review → Delivery.

## Evidence and Confidence

LeadVault should distinguish facts from inference. Where evidence is
included, it should support the qualification basis. Do not present
uncertain assumptions as established facts.

## Deliverables

Explain XLSX/CSV as appropriate, and richer project reports where
required. The spreadsheet is an output of the intelligence, not the
definition of the service.

## CTA

# Have a Target That Is Difficult to Search for?

Tell us what a qualified prospect looks like.

**Start a Research Project**

------------------------------------------------------------------------

# 8. NEW/REWORKED PAGE: QUALIFIED PROSPECT DATA

**Suggested URL:** `/qualified-prospect-data/`

**SEO title:** Custom B2B Prospect Data & Decision-Maker Research \|
LeadVault\
**Meta description:** Get custom B2B prospect data researched to your
specification, including relevant companies, decision-makers and
verified contact information where available.

## Hero

# Custom B2B Prospect Data, Researched to Your Specification

For teams that already know exactly whom they want to reach.

Tell LeadVault the industry, geography, company profile, roles and other
targeting requirements. We research and prepare a clean prospect dataset
around the specification.

## Best For

-   Defined ICPs
-   Territory building
-   Account-list development
-   Decision-maker lists
-   Event or campaign targeting
-   Geographic expansion
-   Niche industry prospecting

## Typical Data Fields

Company name, website, contact name, contact title, business email where
available, phone, address/location, company/provider type and other
agreed fields.

## Why Custom Research

The value is not merely exporting records. LeadVault can combine
multiple research and verification methods, normalize the data and
deliver it in a structure ready for the customer's workflow.

## Data Quality

Explain verification carefully. Never imply that every email is
permanently deliverable. Use wording such as "verified at the time of
research using the applicable verification process" where accurate.

## CTA

**Request Prospect Data**

------------------------------------------------------------------------

# 9. NEW/REWORKED PAGE: MARKET & ICP RESEARCH

**Suggested URL:** `/market-icp-research/`

**SEO title:** B2B Market Mapping & ICP Prospect Research \| LeadVault\
**Meta description:** Map a target B2B market, define the addressable
prospect universe and identify companies matching your ideal-customer
criteria.

# Map the Market Before You Chase the Market

LeadVault helps companies translate an ideal-customer description into a
researched target market.

## Capabilities

-   ICP interpretation
-   Market mapping
-   Geographic segmentation
-   Company qualification
-   Segment sizing where evidence supports it
-   Account prioritization
-   Decision-maker mapping
-   Custom research criteria

## Use Cases

New territory entry, niche market validation, vertical expansion, sales
territory creation, partnership research and campaign planning.

## CTA

**Map My Target Market**

------------------------------------------------------------------------

# 10. NEW/REWORKED PAGE: DECISION-MAKER INTELLIGENCE

**Suggested URL:** `/decision-maker-intelligence/`

**SEO title:** B2B Decision-Maker Research & Contact Intelligence \|
LeadVault\
**Meta description:** Identify the people most relevant to a B2B buying,
partnership or commercial decision and research available verified
contact channels.

# Reach the Person Relevant to the Decision

A valid email is not valuable if it belongs to the wrong person.

LeadVault researches the roles and people most relevant to the
customer's commercial objective, then enriches the record with available
business contact information.

## Research Can Cover

-   Owners and founders
-   C-suite executives
-   Department heads
-   Procurement
-   Operations
-   Practice/office administrators
-   Sales/channel leadership
-   Technical or functional buyers
-   Other project-specific roles

## Relevance Before Availability

Do not choose a contact merely because an email address is easy to find.
Role relevance comes first.

## CTA

**Find My Decision-Makers**

------------------------------------------------------------------------

# 11. NEW/REWORKED PAGE: INTELLIGENCE-LED OUTREACH

**Suggested URL:** `/managed-outreach/`

**SEO title:** Managed B2B Outreach & Prospect Research \| LeadVault\
**Meta description:** Combine LeadVault prospect intelligence with
campaign preparation, controlled B2B email outreach and reporting.

# Research First. Outreach Second.

LeadVault's managed outreach begins with the target --- not with a giant
list.

We research and qualify the prospects, identify relevant contacts,
prepare the campaign and execute controlled outreach around the
customer's offer.

## Workflow

1.  Define the audience and objective
2.  Research and qualify prospects
3.  Prepare and verify contact data
4.  Develop messaging and campaign structure
5.  Configure appropriate sending/deliverability controls
6.  Launch controlled outreach
7.  Monitor and report

## Important Positioning

Do not overload the primary sales copy with MX sorting, provider names,
infrastructure jargon or internal deliverability mechanics. Those
details can be explained lower on the page or during onboarding.

## Compliance

Do not promise universal legal compliance. Explain that campaigns must
be configured according to applicable laws, customer requirements and
appropriate sending practices.

## CTA

**Discuss a Managed Outreach Campaign**

------------------------------------------------------------------------

# 12. REWORKED PAGE: TRADE & COUNTERPARTY INTELLIGENCE

Preserve valuable existing Trade Desk content and SEO equity.

**Preferred public heading:** Trade & Counterparty Intelligence\
**Sub-brand:** Powered by the LeadVault Trade Desk

# Find Commercial Counterparties --- Not Just Company Names

Research potential buyers, suppliers, importers, exporters,
distributors, logistics partners and other trade counterparties around a
defined commercial requirement.

Include: - buyer research - supplier research - importer/exporter
research - market/country targeting - company qualification -
decision-maker research - available contact information -
evidence/approach guidance where included

Avoid guaranteeing transactions, buyer interest or commercial success.

------------------------------------------------------------------------

# 13. REWORKED PAGE: RESEARCH CAPABILITIES

Existing Data Catalog content should be audited and repositioned.

**Preferred page title:** What Can LeadVault Research?\
**Possible URL:** Preserve `/data-catalog/` if it has existing SEO
value, unless there is a strong reason to migrate. If URL changes,
implement a permanent 301 redirect.

## Categories

### Target-Market Discovery

Find companies fitting a specific ICP.

### Decision-Maker Research

Identify people responsible for the relevant commercial decision.

### Opportunity Intelligence

Find businesses showing public evidence of a defined characteristic or
potential need.

### Geographic Market Mapping

Research prospects within specified territories.

### Trade & Counterparty Intelligence

Research buyers, suppliers and other commercial counterparties.

### Specialized Prospect Research

Investigate criteria that conventional databases cannot easily filter.

### Data Cleaning & Enrichment

Improve an existing customer dataset through agreed enrichment,
normalization, verification and deduplication.

CTA: **Tell Us What You Need Researched**

------------------------------------------------------------------------

# 14. REWORKED PAGE: WHY LEADVAULT

# Why Use LeadVault When B2B Databases Already Exist?

Because sometimes the difficult part is not finding records. It is
deciding which records actually represent the opportunity.

## 1. Research, Not Just Retrieval

The project starts from the customer's specification.

## 2. Qualification Beyond Standard Filters

Research criteria can include evidence and qualitative conditions that
ordinary databases may not represent.

## 3. Relevant Decision-Makers

The objective is not merely to find an available contact, but to
identify a role relevant to the commercial decision.

## 4. Evidence Where It Matters

For suitable intelligence projects, qualification can include the public
basis/source supporting the match.

## 5. Multi-Source Research

LeadVault may use multiple research and verification methods rather than
treating one source as authoritative.

## 6. Structured for Action

Deliverables are designed around what the customer needs to do next.

## Balanced comparison

Do not disparage Apollo, ZoomInfo, Hunter, Cognism, Clay or other named
platforms. Explain the category distinction: self-service software vs
managed research.

------------------------------------------------------------------------

# 15. REWORKED PAGE: RESEARCH & VERIFICATION ENGINE

Existing "Tools & Technology" should be reframed around outcomes rather
than programming languages.

# The Research & Verification Engine Behind LeadVault

A LeadVault project can combine multiple discovery, enrichment,
verification and quality-control methods depending on the assignment.

## Capabilities

-   Multi-source prospect discovery
-   Company and website research
-   Evidence capture
-   Qualification rules
-   Decision-maker enrichment
-   Contact verification
-   Deduplication
-   Normalization
-   Quality-control checks
-   Human review for ambiguous cases

### Important public principle

**No single source has to determine the final LeadVault result.**

Do not disclose private vendor names, credentials, API architecture,
proprietary scoring logic or internal canonical database design.

Avoid presenting "we write Python scripts" as the customer benefit.
Technology supports the research; it is not the proposition.

------------------------------------------------------------------------

# 16. PRICING ARCHITECTURE

Claude must first inspect the existing pricing implementation and
preserve any operational purchase flow that is still required.

The site should stop implying that every LeadVault service is a
commodity priced only by number of rows.

## Qualified Prospect Data

Keep standardized volume pricing where commercially appropriate.

Current public pricing must be audited before changing actual
transaction values. Do not silently change live checkout amounts based
only on this brief.

Recommended presentation direction: - Starter / smaller defined research
projects --- **from \$99** - Larger standardized data volumes --- show
existing approved tiers after business confirmation - Custom
fields/complex criteria --- custom quote

## Prospect Intelligence

**From \$249/project** as a positioning starting point, subject to final
business approval before implementation.

Pricing should vary according to: - research complexity - qualification
criteria - geography - evidence requirements - contact enrichment -
volume - turnaround

## Managed Outreach

Public presentation can be simplified to: **From \$699/month**, subject
to final business approval and the actual service scope.

Do not expose unnecessary infrastructure mechanics in the pricing cards.

### IMPORTANT

Claude must flag every monetary amount for owner confirmation before
altering live checkout/payment logic.

------------------------------------------------------------------------

# 17. ABOUT PAGE

Do not write a generic "we are passionate about data" page.

# Research Built Around Real Commercial Questions

LeadVault exists for a simple reason: businesses often know the market
they want to reach but do not have the time, data or research process
required to identify the right opportunities inside it.

Explain the progression: - custom prospect research; - qualification and
verification; - specialized market requirements; - prospect
intelligence; - intelligence-led outreach.

Focus on methodology and customer outcome rather than invented
company-history claims.

Never fabricate founding dates, team size, offices, client counts,
revenue, awards or customer logos.

------------------------------------------------------------------------

# 18. INDUSTRY PAGES

Audit every existing industry page. Preserve useful pages and URLs.

Each industry page should be genuinely useful and not a thin SEO doorway
page.

Recommended structure: 1. Industry-specific hero 2. Typical prospecting
challenges 3. What LeadVault can research in that industry 4. Example
target criteria 5. Decision-maker roles 6. Relevant intelligence
signals/evidence examples 7. Typical deliverable 8. FAQ 9. CTA

Avoid changing only the industry name in duplicated boilerplate. Each
page must contain materially useful, industry-specific content.

------------------------------------------------------------------------

# 19. CONTACT / PROJECT INTAKE

Reposition generic contact/request forms into a **Research Project
Brief** where appropriate.

Recommended fields: - Name - Company - Business email - Website
(optional) - What are you trying to achieve? - Describe the
companies/prospects you want - Target geography - Relevant
roles/decision-makers - Approximate volume - Required data/intelligence
fields - Do you need outreach support? - Desired timeline - Budget range
(optional or selectable) - Additional context

Do not make the form unnecessarily long on first interaction. Claude may
recommend progressive disclosure or a shorter first-step form if the
existing architecture supports it.

Preserve spam protection and Netlify Forms/functionality if currently
used.

------------------------------------------------------------------------

# 20. SEO: TECHNICAL REQUIREMENTS

This redesign is also an SEO migration. Claude must audit first and
implement what is missing.

## A. Google Search Console

Search Console itself is configured in Google, not merely in code.

Claude should: - detect any existing Search Console verification meta
tag or verification file; - preserve it; - ensure the production site
remains indexable; - ensure the XML sitemap is correct and publicly
reachable; - ensure `robots.txt` references the sitemap where
appropriate; - provide the owner with the final sitemap URL to
submit/re-submit in Search Console; - provide a list of important
changed/new URLs for URL Inspection after deployment.

Do not invent a verification token.

## B. Google Analytics 4 --- GA4

The correct name is **Google Analytics 4 (GA4)**, not GT4.

Claude should: - audit whether GA4 is already installed; - identify the
Measurement ID without exposing secrets unnecessarily; - ensure only one
intentional GA4 implementation is firing; - preserve an existing correct
implementation; - if GA4 is absent, create a clean integration point but
request the actual Measurement ID rather than inventing one; - track
meaningful conversions where feasible, such as research-project form
submission, contact submission and major CTA clicks; - avoid
double-counting events.

If Google Tag Manager is already in use, Claude should determine whether
GA4 is managed through GTM before adding direct `gtag.js`.

## C. Google Tag Manager --- if present

Audit for GTM. Do not install a second competing analytics path without
reason.

## D. Sitemap

Use the Astro-compatible sitemap approach appropriate to the existing
version/configuration.

Sitemap should contain canonical, indexable production pages only.
Exclude utility, thank-you, duplicate, preview and non-public pages as
appropriate.

## E. robots.txt

Audit and correct it. - Do not block important CSS/JS/assets required
for rendering. - Do not accidentally block the production site. -
Reference the canonical sitemap. - Keep non-public routes out of search
where appropriate.

## F. Canonical URLs

Every indexable page should have a correct self-referencing canonical
unless there is a deliberate canonicalization strategy.

Canonical domain must consistently use the preferred production host and
HTTPS.

## G. Page metadata

Every important page needs: - unique `<title>`; - unique meta
description; - canonical URL; - Open Graph title/description/image; -
Twitter/X card metadata where appropriate; - sensible robots
directives; - favicon/site identity.

Avoid duplicated titles/descriptions.

## H. Heading hierarchy

One clear primary H1 per page. Use semantic H2/H3 hierarchy. Do not use
heading tags solely for visual sizing.

## I. Internal linking

Build contextual internal links between: - Prospect Intelligence -
Qualified Prospect Data - Market & ICP Research - Decision-Maker
Intelligence - Managed Outreach - Trade - Industries - Pricing -
Research Capabilities

Use descriptive anchor text, not repeated "click here."

## J. Redirects

Before renaming/removing any existing URL: 1. inventory the old URL; 2.
determine its replacement; 3. implement a permanent 301 using the
existing Netlify approach (`netlify.toml` or `_redirects`); 4. avoid
redirect chains; 5. do not redirect unrelated removed content blindly to
the homepage.

Preserve high-value existing URLs where possible.

## K. Structured data / JSON-LD

Audit existing schema first.

Implement only schema that accurately describes visible content.
Appropriate candidates may include: - `Organization` - `WebSite` -
`BreadcrumbList` - `Service` where semantically appropriate - `Article`
for future editorial content

Do not add fake ratings/reviews or schema solely to chase rich results.
Validate applicable Google-supported markup.

## L. Social sharing

Provide a professional default Open Graph image and page-specific
metadata where appropriate.

## M. Image SEO

-   descriptive file names where practical;
-   meaningful alt text for informative images;
-   empty alt for decorative images;
-   width/height to reduce layout shift;
-   modern optimized formats where appropriate;
-   lazy-load below-the-fold imagery.

## N. Performance / Core Web Vitals

Audit: - oversized images; - unnecessary JavaScript; - render-blocking
resources; - font loading; - layout shift; - hero/LCP asset; -
third-party scripts; - mobile performance.

Do not sacrifice the approved visual identity merely to obtain a
synthetic score.

## O. Accessibility

At minimum: - semantic landmarks; - keyboard-accessible navigation; -
visible focus states; - sufficient contrast; - labels for form fields; -
meaningful link/button names; - alt text; - sensible heading order; -
reduced-motion consideration for animation where appropriate.

------------------------------------------------------------------------

# 21. SEARCH DISCOVERY / CONTENT STRATEGY

The redesign should establish the technical foundation for future
organic acquisition.

Claude should not mass-generate thin blog posts during this
implementation.

However, architecture should make future high-quality resources
possible.

Potential future topic clusters: - B2B prospect intelligence - prospect
research - target market research - decision-maker research - B2B market
mapping - lead qualification research - account list building -
buyer/supplier research - trade counterparty research - email data
verification - niche prospecting methodologies

A future Resources/Insights section should be added only if the project
has enough substantive content to justify it. Do not launch an empty or
thin blog merely for SEO.

------------------------------------------------------------------------

# 22. LOCAL / BUSINESS IDENTITY CONSISTENCY

Audit business identity across the site: - LeadVault name - logo -
canonical domain - business contact details - social links - footer
legal/company information

Do not invent an address or local-office claim.

If an official business address is intentionally public, ensure
consistency. Otherwise do not add one simply for SEO.

------------------------------------------------------------------------

# 23. NETLIFY-SPECIFIC REVIEW

Inspect `netlify.toml` and existing Netlify behavior.

Confirm: - production build command; - publish directory; - Node/runtime
expectations; - redirects; - headers; - form handling; - functions if
any; - environment-variable dependencies; - security headers where
appropriate; - caching strategy where appropriate.

Do not put secrets/API keys into the repository.

Ensure restructuring does not break Netlify Forms or existing serverless
functionality.

------------------------------------------------------------------------

# 24. SECURITY / TRUST BASICS

Audit and improve where appropriate: - HTTPS assumptions; - security
headers; - external-link handling; - form validation; - spam controls; -
exposed secrets; - dependency vulnerabilities that materially affect the
site.

Do not make sweeping dependency upgrades during the content
restructuring unless needed. Report them separately if risky.

------------------------------------------------------------------------

# 25. LEGAL / TRUST PAGES

Audit existing: - Privacy Policy - Terms - Cookie/analytics disclosure -
data/contact-processing disclosures

Do not fabricate legal assurances.

If analytics or tracking changes materially affect the existing privacy
disclosure, flag it for owner review.

For B2B data/outreach claims, avoid statements such as "100% GDPR
compliant" or "guaranteed CAN-SPAM compliant" unless there is a
separately verified legal basis.

------------------------------------------------------------------------

# 26. COPY STYLE RULES

All pages must sound like the same company.

### Use

-   research
-   qualify
-   evidence
-   decision-maker
-   target market
-   commercial objective
-   prospect intelligence
-   available verified contact data
-   project-specific
-   actionable
-   multi-source where appropriate

### Avoid

-   "harvest leads"
-   "scrape millions"
-   "guaranteed leads"
-   "guaranteed conversions"
-   "100% accurate"
-   "freshest database"
-   unsupported superiority claims
-   generic AI phrases such as "revolutionize your sales journey"
-   excessive em dashes
-   repetitive three-item slogans on every section
-   thin pages padded with marketing filler

Prefer clear, professional B2B English.

------------------------------------------------------------------------

# 27. CLAIMS DISCIPLINE

Claude must not invent: - customer counts - conversion improvements -
accuracy percentages - database size - countries covered numerically
unless verified - testimonials - logos - awards - partnerships -
certifications - founding history - "real-time" capabilities not
actually implemented - guaranteed delivery/response rates

Where a current page contains a strong numerical claim, preserve it only
if there is a defensible source or the owner confirms it.

------------------------------------------------------------------------

# 28. VISUAL / UX DIRECTION

Preserve LeadVault's established brand identity unless a component is
clearly harming usability.

The redesign is primarily a **positioning, information architecture,
conversion, content and SEO upgrade**, not an excuse for an unrelated
visual rebrand.

Requirements: - premium B2B appearance; - strong hierarchy; - readable
line lengths; - enough white/negative space; - clear CTA hierarchy; -
responsive mobile navigation; - cards used selectively; - no walls of
tiny text; - no excessive animations; - preserve the approved
globe/brand imagery where it supports the new message; - avoid stock
imagery that makes the company look generic.

Claude may improve layout and component design where necessary.

------------------------------------------------------------------------

# 29. IMPLEMENTATION SEQUENCE

Claude should use this sequence, adapting only where the codebase
requires it.

### Phase 1 --- Audit

No destructive changes. Produce: - route inventory; - component/layout
inventory; - SEO/analytics status; - current navigation; - current
forms; - Netlify configuration summary; - pages to
preserve/rework/add; - risks/questions.

### Phase 2 --- Shared foundation

Implement/revise: - navigation; - footer; - global SEO
component/layout; - metadata conventions; - schema framework; - CTA
components; - breadcrumbs where useful; - redirects plan.

### Phase 3 --- Homepage

Implement the new homepage in full.

### Phase 4 --- Core commercial pages

Implement/rework: - Prospect Intelligence - Qualified Prospect Data -
Market & ICP Research - Decision-Maker Intelligence - Intelligence-Led
Outreach - Trade & Counterparty Intelligence - Research Capabilities

### Phase 5 --- Supporting pages

Rework: - Why LeadVault - Research & Verification Engine / Tools &
Technology - Pricing - About - Industries - Contact/project intake -
legal/trust pages only where required.

### Phase 6 --- Technical SEO & analytics

Complete: - sitemap - robots - canonicals - metadata - structured data -
redirects - GA4/GTM audit/integration - Search Console
preservation/readiness - social metadata - accessibility - performance.

### Phase 7 --- Validation

Run: - production build; - route/link checks; - missing asset checks; -
mobile/responsive review; - metadata audit; - canonical audit; -
sitemap/robots checks; - structured-data validation where possible; -
form validation; - Netlify configuration review.

Report anything that requires owner action in Google Search Console,
Google Analytics, Google Tag Manager, Netlify or another external
dashboard.

------------------------------------------------------------------------

# 30. REQUIRED OWNER-ACTION CHECKLIST AFTER DEPLOYMENT

Claude must generate a final checklist containing only actions that
cannot be completed from the repository.

Likely examples: 1. Confirm Netlify production deployment succeeded. 2.
Open Google Search Console. 3. Confirm ownership remains valid. 4.
Submit/re-submit the production sitemap. 5. Inspect the homepage and
important new URLs. 6. Request indexing for high-priority changed/new
pages where appropriate. 7. Review indexing/coverage after Google
recrawls. 8. Open GA4 Realtime/DebugView and confirm page views/events
are arriving. 9. Confirm conversion events. 10. Check Netlify form
submissions. 11. Test desktop and mobile live pages. 12. Monitor
404s/redirect issues after migration.

Do not claim these external actions have been completed unless actually
verified.

------------------------------------------------------------------------

# 31. SUCCESS CRITERIA

The implementation is not complete merely because the site builds.

It is complete when: - the new B2B Prospect Intelligence positioning is
immediately understandable; - the difference between data and
intelligence is clear; - the three-level commercial ladder is
coherent; - no important existing functionality is lost; - new pages
contain substantive useful content rather than thin SEO copy; -
navigation and internal linking make sense; - pricing does not create a
misleading commodity comparison; - all indexable pages have intentional
metadata and canonicals; - sitemap/robots are correct; - redirects
protect changed URLs; - analytics/search-console integrations are
preserved or cleanly prepared; - structured data is accurate; - forms
work; - mobile UX is strong; - production build passes; - no secrets are
committed; - claims are defensible.

------------------------------------------------------------------------

# 32. CLAUDE'S INDEPENDENT REVIEW AUTHORITY

This brief is deliberately detailed, but Claude should not implement it
mechanically.

Before implementation, independently verify: - whether the proposed URL
architecture fits the existing site; - whether an existing page already
satisfies a proposed new page; - whether preserving an existing URL is
better for SEO; - whether proposed content creates unnecessary
duplication/cannibalization; - whether the existing Astro version
changes the recommended implementation; - whether current Netlify
configuration requires special handling; - whether an instruction would
break forms, deployment, analytics or responsive behavior; - whether a
better technical implementation achieves the same strategic objective.

If Claude disagrees with an implementation detail, it should state: 1.
the instruction; 2. the concern; 3. the recommended alternative; 4. why
the alternative better serves the same business objective.

Do **not** silently replace the business positioning or invent a
different strategy.

------------------------------------------------------------------------

# 33. FIRST RESPONSE REQUIRED FROM CLAUDE

On first reading this file, **do not immediately rewrite the entire
website**.

Return:

1.  **Current architecture summary**
2.  **Current page/route inventory**
3.  **Current SEO status**
4.  **Current GA4/GTM/Search Console evidence found in the repo**
5.  **Current Netlify/deployment configuration**
6.  **Pages to preserve**
7.  **Pages to rework**
8.  **Pages to add**
9.  **URLs/redirects that require special care**
10. **Any conflicts or improvements you recommend to this brief**
11. **Implementation sequence**
12. **Owner decisions needed before monetary/pricing or destructive URL
    changes**

After that review, proceed with implementation only when instructed.

------------------------------------------------------------------------

# 34. EXTERNAL TECHNICAL REFERENCES FOR VERIFICATION

Use current official documentation during implementation rather than
relying on assumptions:

-   Google Search Central --- Search appearance and structured data
-   Google Search Central --- Organization structured data
-   Google Search Central --- Breadcrumb structured data
-   Google Search Console documentation
-   Google Analytics Help --- GA4 website setup
-   Netlify documentation --- redirects, rewrites, headers and
    deployment
-   Astro documentation matching the project's installed Astro version

When official guidance conflicts with this brief on a technical
implementation detail, follow the current official technical guidance
while preserving the business objective and report the deviation.

------------------------------------------------------------------------

## FINAL IMPLEMENTATION PRINCIPLE

**LeadVault is not being repositioned as another lead database.**

It is being positioned as a research-led B2B prospect intelligence
company whose outputs can include qualified prospect data and whose
execution layer can include managed outreach.

The website must make that distinction obvious within seconds --- and
substantiate it with enough depth that a serious B2B buyer understands
what LeadVault actually does.
