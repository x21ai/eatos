# US restaurant lingo pass across the website

Apply the "US Lingo (Use This)" column from Restaurant_Lingo_US.pdf to the site's own copy, so
the marketing site speaks the same language a US operator expects.

## Scope

In scope: hand-written page copy and content files under the web app (solution pages, product
pages, home, support UI labels, agent knowledge labels, shop copy, footer/header labels).

Out of scope, deliberately: the imported archives (about 1,000 blog posts, the newsroom items and
the 320 help articles). Those are historical published content already indexed by search engines,
and rewriting them risks breaking rankings and the article-to-screenshot match in help content. If
you want those rewritten too, say so and I will handle them as a separate pass.

## The replacements

Priority, from the document's "key fixes" list:

1. Ticket to Check, when it means a guest bill or open order in a payments/table context.
   Kitchen contexts stay as "Kitchen Ticket", never bare "Ticket" and never "KOT".
2. Customer to Guest, when it means a diner. Stays "Customer" when it means the restaurant that
   buys eatOS (customer stories, customer support, our customers).
3. Payment to Close Check, and Split Payment to Split Tender, where the copy describes the act of
   settling a check. Generic marketing use of "Payments" as a product name stays.
4. Order flow and order type wording: Take Out to Takeout, Drive Thru to Drive-Thru, Curb Side to
   Curbside Pickup, Dine In to Dine-In, Order Notes to Special Instructions, Custom Item to Open
   Item, No Tax to Tax Exempt, Banquet to Catering.
5. Kitchen wording: Send Order to Send to Kitchen, Preparing to In Progress, Delivered to Served.
   "86" stays as-is, it is already correct US usage.
6. Table management: Table Layout to Floor Plan, Available to Open Table, Paid to Closed, Merge to
   Combine Tables.
7. Cash: Cash Drawer to Till, Opening Cash to Opening Float, Closing Balance to Cash Count.
8. Settings and workforce: Gratuity to Tips, Employees to Team Members, End of Day to Close of Day,
   Login to Sign In, Log Out to Sign Out, Forgot Password to Reset Password, Products to Menu Items.

## Where the work lands

Confirmed from a scan of the web app source:

- Kitchen Display System page content and page (heaviest "ticket" usage), plus the Kitchen
  Intelligence section and the homepage2 kitchen section.
- Ghost Kitchens, Full Service, Tap to Pay, Hardware, Products index, Solutions index, Customers
  page, Work With Us: single "ticket" or "customer" instances.
- Full Service and Grow pages: "Split payments" to "Split tender".
- Workforce Management content: "Employees" to "Team members".
- Support home and the AI agent's suggested questions and keyword labels: "end of day" to
  "close of day", "cash drawer" to "till" (keeping "cash drawer" as an extra search keyword so
  existing searches still match).
- Guest Facing Display, Loyalty, Online Ordering, AI Ordering, Automated Marketing, Autonomous
  Delivery content files: diner-sense "customer" to "guest".

Terms already correct and left alone: 86, Split Check, Transfer Check, Revenue Center, PIN,
Reservation, Party Size, No-Show, VIP, Modifiers, Add-ons, Categories, Shift, Schedule, Role.

## Technical notes

- Edits are string-only, in `content.ts` data files and JSX copy. No layout, component or logic
  changes.
- Search keyword arrays keep both the old and new term so search and the support assistant keep
  matching legacy phrasing.
- Route paths, slugs, redirects and asset filenames are not renamed, so no SEO impact.
- Verification: grep for each replaced term to confirm zero remaining in-scope hits, spot-check the
  KDS, Full Service, Ghost Kitchens, Workforce and Support pages in the preview, then a production
  build.
