# LEADVAULT — DEVELOPMENT HANDOFF BRIEF
### Everything needed to build the Phase 1 website in VS Code / Claude Code
**Companion file:** `leadvault-website-copy-v5.md` (all page content lives there — this brief tells the builder how to build it)

---

# 1. RECOMMENDED TECH STACK (with reasoning)

## The Recommendation: Astro + Tailwind CSS, hosted on Netlify

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro** (static site) | Outputs pure, ultra-fast HTML — the best possible foundation for SEO, which is a core objective. Shared header/footer/components across all 10 pages without repeating code. Zero unnecessary JavaScript, so the site loads fast even on slow connections (important for Nigerian and global visitors). Claude Code knows it extremely well. |
| Styling | **Tailwind CSS** | Fast to build, easy to keep the navy/teal design system consistent, and Claude Code produces excellent Tailwind. |
| Forms | **Netlify Forms** | Built into the hosting — form submissions arrive in your Netlify dashboard AND get emailed to hello@leadvaultdata.com. No backend, no third-party service, no monthly fee (100 free submissions/month, upgradeable). This solves the "where do survey submissions go?" question with zero extra setup. |
| Hosting | **Netlify** (free tier) | Free SSL certificate (https), global CDN, deploys automatically, generous free tier that a Phase 1 marketing site will not exceed. |
| Charts/graphs | **Built in code** (SVG/CSS or a light library like Chart.js) | The stats section's graphs should be coded, not images — sharper, faster, on-brand, and easy to update numbers later. |

## Why NOT the alternatives

1. **Plain HTML/CSS:** workable, but 10 pages sharing headers/footers becomes a maintenance headache — every menu change means editing 10 files.
2. **WordPress:** monthly hosting cost, plugin maintenance, security patching, slower — and you'd still need a developer for a custom design. Wrong tool when Claude Code is your builder.
3. **Next.js:** excellent, but overkill for a static marketing site; adds complexity you don't need in Phase 1.

## Phase 2 architecture note (important)

When the client portal/marketplace application is built later, do **not** rebuild this site. Keep the marketing site at **leadvaultdata.com** (Astro, static, SEO-optimized) and build the application separately at **app.leadvaultdata.com** (that's when Next.js or similar earns its place). This is the standard architecture used by virtually every SaaS/data company — marketing and product stay decoupled, so neither breaks the other.

---

# 2. IMAGE SOURCING GUIDE — SECTION BY SECTION

## The Golden Rules (read before sourcing anything)

1. **One visual treatment everywhere.** Every photo gets the same treatment: a dark navy overlay (or duotone) with the photo beneath — this makes images from different sources look like one family. Claude Code will apply this with CSS, so you can source freely without worrying about matching tones.
2. **Free sources first:** **Unsplash.com** and **Pexels.com** — free for commercial use, no attribution required, high quality. Search terms provided below.
3. **Icons are not photos:** all icons come from **Lucide** (lucide.dev) — a free, consistent icon set Claude Code can drop straight into Astro. Do NOT source icon images; tell Claude Code which icon names to use (listed below).
4. **Graphs are code, not images** (see stack table above).
5. **Testimonial graphics** for social media: made later in Canva using the brand kit — not needed for the website itself (site testimonials are styled text).
6. **Your lead-sample thumbnails:** perfect for the Data Catalog cards and the Tools page — real screenshots of (anonymized!) CSV samples and tool outputs are MORE convincing than stock photos. Blur/replace any real names, emails, and phone numbers before use — a data company leaking personal data on its own website would be a credibility disaster.

## Section-by-Section Shopping List

| # | Location | What to source | Search terms (Unsplash/Pexels) | Notes |
|---|---|---|---|---|
| 1 | Home hero | Abstract world-connection or data visual | "world map network", "global connections dark", "data visualization dark" | Must work under text; dark and uncluttered. Alternative: Claude Code builds an animated SVG world-arc graphic — zero sourcing needed. **Recommended.** |
| 2 | Pipeline (Source→Verify→Clean→Deliver) | Nothing — built as a coded graphic | — | Claude Code draws this in SVG with brand colors. |
| 3 | Founding story (Home + About) | Container port / cargo ship at dusk | "container port dusk", "cargo ship sunset", "shipping containers aerial" | The single most important photo on the site — it carries the trade story. Choose one with dark tones. |
| 4 | Stats section | Nothing — coded charts | — | Chart.js or SVG. |
| 5 | Industries (Home strip + Industries page) | Lucide icons only | Icons: `shopping-cart` (e-commerce), `megaphone` (agencies), `mail` (outreach), `ship` (trade), `code` (SaaS), `users` (recruitment), `home` (real estate), `credit-card` (fintech), `trending-up` (investment), `shield` (insurance), `bar-chart-3` (research), `phone` (call centers), `calendar` (events), `package` (wholesale) | No photos needed. |
| 6 | Why LeadVault comparison | Split illustration "warehouse vs harvest" | "warehouse shelves dark" + "fresh market produce" (side-by-side treatment), or have Claude Code build a stylized split graphic | Coded graphic recommended for brand consistency. |
| 7 | Trade page hero | Cargo aircraft loading or port cranes | "cargo plane loading", "port cranes night", "freight logistics" | Different image from #3 so the two pages feel distinct. |
| 8 | Services icons | Lucide icons | `database` (datasets), `sparkles` or `filter` (cleaning), `handshake` (trade desk), `calendar-check` (subscriptions), `terminal` (Python projects), `compass` (strategy), `send` (outreach) | — |
| 9 | Tools page | YOUR screenshots + 1 hero photo | Hero: "developer workspace dark", "code on screen dark" | Real (anonymized) screenshots of your verification tool outputs, terminal runs, and CSV samples beat any stock photo here. This is your proof-of-engineering page. |
| 10 | Data Catalog cards | YOUR anonymized sample thumbnails | — | One blurred/anonymized sample per category where you have it; abstract data-pattern fallback (Claude Code generates) where you don't. |
| 11 | Founder portrait | Professional photo of Steve | — | Worth doing properly: plain background, business attire, good lighting. A phone photo in front of a plain wall in daylight works if a photographer isn't available now. |
| 12 | Contact page | Consultation visual | "customer support headset professional", "business call office" | Choose diverse, natural-looking, non-cheesy. |
| 13 | Background textures | Nothing — coded | — | Subtle data-grid/dot patterns generated in CSS/SVG. |

**Total photos you actually need to source: only 5–6** (items 1*, 3, 7, 9-hero, 12, plus the founder portrait). Everything else is icons, coded graphics, or your own screenshots. (*Item 1 drops to zero if you take the recommended coded hero.)

---

# 3. FORM HANDLING (decided by the stack choice)

Netlify Forms, configured by Claude Code during the build:
1. Survey submissions arrive in the Netlify dashboard (Forms tab)
2. Email notification to hello@leadvaultdata.com for every submission (set in Netlify: Site settings → Forms → Notifications)
3. Spam filtering included (honeypot field — Claude Code adds it)
4. A styled "Thank you — your recommendation is on its way within 24 hours" page after submission (**this page is also the conversion-tracking trigger** for GA4 and Meta ads — see section 5)

---

# 4. HOSTING & DOMAIN — RECOMMENDED SETUP (step by step)

1. **Create a free GitHub account** (github.com) — this stores the website code. Claude Code will push the project here.
2. **Create a free Netlify account** (netlify.com) — sign up "with GitHub" (one click, links them automatically).
3. In Netlify: **Add new site → Import an existing project → GitHub → select the leadvault repository.** Netlify auto-detects Astro; accept defaults; click Deploy. Your site is now live on a temporary address like `leadvault.netlify.app`.
4. **Connect leadvaultdata.com:** Netlify → Domain settings → Add custom domain → type leadvaultdata.com. Netlify shows you 2–4 DNS records (usually an A record and a CNAME for www).
5. **At your domain registrar** (wherever leadvaultdata.com is registered — e.g., Namecheap, GoDaddy): open DNS settings and enter exactly the records Netlify displayed. Propagation takes minutes to a few hours.
6. Back in Netlify: click **Verify**, then enable **HTTPS** (automatic, free, one click).
7. Done. From then on, every update Claude Code pushes to GitHub deploys to leadvaultdata.com automatically within about a minute.

**Cost: $0/month** (only your existing domain registration fee, ~$10–15/year).

---

# 5. ANALYTICS SETUP — THE COMPLETE BEGINNER'S WALKTHROUGH

*(You said this is the part you're not used to — so here is every click. Do these AFTER the site is live on leadvaultdata.com. Total time: about 45 minutes. You are creating three free measurement accounts, and each one gives you a small ID code that you hand to Claude Code to install.)*

## What these three things are, in plain English

1. **Google Analytics 4 (GA4)** — tells you how many people visit the site, which pages they read, which country they're from, and where they came from (Google, LinkedIn, ads, WhatsApp links…). This is your dashboard for the whole business plan.
2. **Google Search Console** — tells you what people typed into Google before finding you, and alerts you to any Google problems. This is your SEO instrument.
3. **Meta Pixel** — a silent tag that lets Facebook/Instagram "remember" your website visitors, so that in Month 4 you can show ads specifically to people who already visited (retargeting — the cheapest, highest-converting ads you will ever run). **Installing it now, months before advertising, is the whole point:** the audience builds while you sleep.

## 5A. Google Analytics 4 — step by step

1. Go to **analytics.google.com** → sign in with your business Google account (the steve@leadvaultdata.com one, or the Google account attached to it).
2. Click **Start measuring**.
3. Account name: `LeadVault` → Next.
4. Property name: `LeadVault Website` → time zone: your primary market (recommend **United States – Eastern**, since diaspora/US is the beachhead; Nigeria also fine — just be consistent) → currency: **USD** → Next.
5. Business details: Industry = "Business & Industrial Markets", size = Small → describe objectives: tick "Generate leads" → Create → accept terms.
6. Choose platform: **Web** → Website URL: `https://leadvaultdata.com` → Stream name: `LeadVault` → **Create stream**.
7. A screen appears showing your **Measurement ID** — it looks like **G-XXXXXXXXXX**. **Copy it.**
8. **Hand that ID to Claude Code** with the instruction: *"Install GA4 with measurement ID G-XXXXXXXXXX on all pages."* That's your part done.
9. Verify it works: open leadvaultdata.com on your phone, then in GA4 click **Reports → Realtime** — you should see yourself as 1 visitor within about a minute.

**One extra step that matters — counting inquiries, not just visitors:**
10. In GA4: **Admin (gear icon) → Events**. After Claude Code sets the thank-you page live, visits to `/thank-you` can be marked as a conversion: Admin → Events → find the thank-you page event → toggle **Mark as key event**. (Tell Claude Code: *"Fire a `generate_lead` event on the thank-you page"* — then this toggle takes 10 seconds.) From that moment, GA4 tells you not just "500 people visited" but "500 visited and 12 became inquiries — and 8 of those came from LinkedIn." That sentence is the entire measurement strategy of the business plan.

## 5B. Google Search Console — step by step

1. Go to **search.google.com/search-console** → sign in with the same Google account.
2. Choose **URL prefix** → enter `https://leadvaultdata.com` → Continue.
3. Verification: because GA4 is already installed with the same account, choose the **Google Analytics** verification method → Verify. (One click, done. If it fails, the alternative is a DNS record — copy the TXT record it shows you into your domain registrar's DNS settings, same place as section 4 step 5, wait an hour, verify.)
4. Once verified: left menu → **Sitemaps** → enter `sitemap-index.xml` → Submit. (Astro generates this automatically; Claude Code will confirm the exact filename.)
5. That's it. Within days, the **Performance** tab starts showing which Google searches display your site and which get clicks. Check it weekly; it will guide the Q2 content plan.

## 5C. Meta Pixel — step by step

1. Go to **business.facebook.com** (log in with the Facebook account that owns the LeadVault Page — per the Social Media Playbook setup).
2. Left menu (or All tools) → **Events Manager**.
3. **Connect data sources** (green + button) → **Web** → Connect.
4. Name the dataset/pixel: `LeadVault Pixel` → enter website URL when asked.
5. When offered a connection method, choose **"Set up manually" / "Meta Pixel"** (not a partner integration).
6. You'll see your **Pixel/Dataset ID** — a long number like **1234567890123456**. **Copy it.**
7. **Hand it to Claude Code:** *"Install the Meta Pixel with ID 1234567890123456 on all pages, and fire a `Lead` event on the thank-you page."*
8. Verify: install the free Chrome extension **Meta Pixel Helper**, visit leadvaultdata.com — the extension icon shows a green pixel firing. Also, Events Manager will show activity within ~20 minutes.

**Then walk away.** The pixel needs nothing further from you — it quietly builds your retargeting audience until Month 4, when the Social Media Playbook's Campaign A switches it on.

## 5D. (Optional now, needed by Q3): LinkedIn Insight Tag

Same concept for LinkedIn ads later. When you create the LinkedIn Company Page: LinkedIn Campaign Manager → Analyze → Insight Tag → copy the Partner ID → hand to Claude Code. Five minutes; can wait until the Q3 US-wedge campaign if preferred — but earlier = bigger retargeting audience, so do it when convenient.

---

# 6. THE BUILD INSTRUCTION — PASTE THIS INTO CLAUDE CODE

> Build a 10-page static marketing website for LeadVault using **Astro + Tailwind CSS**, deployable on **Netlify**.
>
> **Content:** All page copy, structure, SEO titles, and meta descriptions are in `leadvault-website-copy-v5.md` — follow it faithfully; do not rewrite the copy.
> **Design system:** Deep navy #0A1F44, dark blue #12315F, midnight #081833 backgrounds; teal #1DBF9F for all CTAs, highlights, and stats. Professional, data-driven aesthetic. Apply a consistent navy duotone/overlay treatment to all photos. Typography: a modern sans (e.g., Inter) with strong hierarchy. Fully responsive, mobile-first.
> **Pages:** Home, Services, International Trade & Freight Forwarding, Industries, Why LeadVault, Tools & Technology, Data Catalog, About, Pricing, Contact — plus a /thank-you page.
> **Components:** shared header (sticky nav + "Get My Free Recommendation" CTA button) and footer per the copy doc; testimonial cards; comparison tables; pricing tables; catalog cards with "Request This Dataset" buttons linking to the contact form with the category pre-selected via URL parameter.
> **Charts:** build the Home stats section with coded SVG/Chart.js charts in brand colors (placeholder numbers marked in the copy).
> **Icons:** Lucide, per the handoff brief's icon list.
> **Images:** use styled placeholder blocks (navy gradient + label) wherever a photo from the brief's shopping list isn't yet provided; structure so images drop in later without layout changes.
> **Forms:** the contact survey (all 12 fields per the copy doc) via **Netlify Forms** with a honeypot spam field, redirecting to /thank-you on success.
> **Analytics:** leave clearly-marked slots in the base layout for GA4 (ID: G-XXXXXXXXXX) and Meta Pixel (ID: TBD); fire `generate_lead` (GA4) and `Lead` (Meta) events on /thank-you.
> **SEO:** per-page titles/metas from the copy doc, Open Graph tags, sitemap, robots.txt, semantic HTML, alt text on all images.
> **Performance target:** Lighthouse 90+ on all categories.
> Initialize a Git repository and prepare for Netlify deployment via GitHub.

---

# 7. LAUNCH-DAY CHECKLIST (in order)

1. ☐ Claude Code build complete; reviewed on localhost
2. ☐ Your 5–6 sourced photos + founder portrait + anonymized thumbnails dropped in
3. ☐ Real numbers, prices, and contact details replace all placeholders (per V5's pre-launch checklist)
4. ☐ Lawyer sign-off on legal pages + comparison-page claims
5. ☐ GitHub repo pushed → Netlify site live → leadvaultdata.com connected + HTTPS on (section 4)
6. ☐ Form test: submit the survey yourself; confirm email arrives at hello@leadvaultdata.com
7. ☐ GA4 installed & showing you in Realtime (5A) · key event marked (5A.10)
8. ☐ Search Console verified + sitemap submitted (5B)
9. ☐ Meta Pixel installed & green in Pixel Helper (5C)
10. ☐ Announce per the Social Media Playbook Week 3 — the Warm-100 campaign links here

*When box 10 is ticked, Phase 0 of the Business Development Roadmap is complete and the 12-month clock starts properly.*
