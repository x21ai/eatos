# US restaurant lingo audit and copy alignment

## What the document covers vs what the website has

Most of the lingo sheet describes in-app POS and KDS screen labels (Open Checks, Bump,
Till, Opening Float, Split Tender, Manager Approval, 86, Order Up). Those labels live in
the POS/KDS product, not in this marketing website, so they are out of scope here. Three
of its rules do apply to public site copy, and I checked each against the codebase.

### 1. Customer to Guest (applies, biggest item)
The sheet says replace "Customer" with "Guest". The site still uses "customer" and
"customers" in around 120 places in editable copy. Confirmed locations:

- Comparison page copy: `app/comparison/competitors.ts` (lines 47, 73, 105, 163, 177, 203)
  and `app/comparison/content.ts` (11, 43, 48)
- Online Ordering: `app/products/apponlineorderingdelivery/content.ts` (Customer Profile
  feature name and key feature list, lines 25, 48, 49)
- AI Enabled Ordering: `app/products/ai-enabled-ordering-automation/content.ts`
  ("Enhanced Customer Engagement" heading and body, lines 14, 27, 50, 51, 53, 56)
- Full Service: `app/full-service/content.ts:56` "Never miss out on a customer"
- Catering: `app/catering/content.ts:56` "Customer-centric catering services"
- Enterprise POS: `app/enterprise-pos/content.ts:58`
- Support assistant copy: `app/components/agent/knowledge.ts:61`
- Company hub and layout descriptions: `app/company/page.tsx`, `app/company/layout.tsx`
- Reseller: `app/reseller/content.ts:13`

Deliberately left alone (renaming these would break links, SEO or accuracy):
`/customers` route, its page title and "Customer Stories" label, "Customer satisfaction"
and "Repeat customers" metric labels, the `Customers API` row on system status, internal
file and variable names, and legal pages (Privacy, Terms, SMS Policy) where wording is
contractual.

### 2. Ticket to Check (applies only partly)
The sheet's rule is about POS checks. On the site, almost every "ticket" is a *kitchen*
ticket, which the same sheet explicitly endorses (KOT becomes Kitchen Ticket). So:

- Keep as-is (kitchen context, correct US usage): Kitchen Display System page and content,
  `app/products/kitchen-display-system/*`, `app/products/hardware/content.ts`,
  `app/components/demoSources.ts`, `components/AIIntelligence/sections/KitchenIntelligenceSection.tsx`,
  `app/ghost-kitchens/content.ts`, `app/pizzeria/PizzeriaClient.tsx`,
  `app/fast-casual/FastCasualClient.tsx`, `app/brochures/content.ts:97`
- Change to Check (payment context, currently wrong for US):
  - `app/tap-to-pay/content.ts:38` "the ticket closes itself" becomes "the check closes itself"
  - `app/products/apponlineorderingdelivery/content.ts:65` "keep the full ticket" becomes
    "keep the full check"
- Keep "average ticket" everywhere (`app/products/products.ts:43`, `app/home-1/page.tsx:551`):
  it is standard US restaurant finance language, not the POS check label.

### 3. Sign In / Sign Out (applies)
The sheet says Login becomes Sign In and Logout becomes Sign Out.

- `components/Header.tsx:1016` nav label "Login" becomes "Sign In"
- `components/UtilityBar.tsx` login link label
- `app/account/signup/page.tsx:102` button "Sign Up" becomes "Create Account"
  (the sheet's own preferred term)
- Account screen headings under `app/account/signin` and `app/account/signup`
- The `/login` route path itself stays, so existing links and bookmarks keep working

### 4. Terms from the sheet that do not appear on the website at all
No changes needed, verified by search: KOT, Gratuity, Cash Drawer, Open Drawer,
Table Layout, Split Payment, Item Summary, New Order, Ticket Listing, Delivered,
Activate Device, Preparing, Unseen/Seen, Opening Cash.

Also already correct: "Guest Facing Display" (renamed earlier), 86 usage, Revenue Center.

## What I would change if you approve

Copy-only edits in the files listed under items 1, 2 and 3. No layout, component
structure or routing changes, no legal page rewrites, no route renames.

## Technical notes
- All edits land in `content.ts` copy files plus `Header.tsx`, `UtilityBar.tsx` and the
  two account pages; generated blog, news and support datasets are excluded so historical
  articles keep their original wording.
- Grammar is adjusted per sentence where "guest" changes the article or verb form.
- Verify with a production build and a quick pass over Comparison, Online Ordering,
  AI Ordering, Full Service, Catering and the header at desktop and mobile widths.

## Open question
Confirm whether you want "customer support", "customer satisfaction" and
"customer base" phrases also switched to "guest", or kept, since those refer to eatOS
supporting *you* rather than to diners. My recommendation is to keep them.
