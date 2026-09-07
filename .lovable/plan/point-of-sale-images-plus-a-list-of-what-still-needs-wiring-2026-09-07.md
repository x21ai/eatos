# Point of Sale images, plus a list of what still needs wiring up

## Part 1: Point of Sale feature pictures

Already done in the previous round, so nothing left to build here. The three heavy
Point of Sale feature pictures were re-saved as right-sized WebP versions and the page now
uses those:

| Picture | Before | Now |
|---|---|---|
| Table management | 856 KB | 48 KB |
| Online ordering | 953 KB | 57 KB |
| Work offline | 1,036 KB | 66 KB |

That is roughly 2.7 MB removed from the Point of Sale page. If you want the same treatment
applied to other pages (Quick Service, Support, Platform, Shop, the concept photos and the
1.1 MB partner logo from the audit), say so and I will add it as its own step.

## Part 2: What needs a backend or wiring up

Nothing below adds a database. This is the handover list for the backend you will build in
Cursor, grouped by what each page needs.

### A. Forms that look like they submit but currently go nowhere

These show a success message without sending anything anywhere.

1. **Newsletter signup** (appears at the bottom of most pages). Validates the email, then
   stops. Needs a subscribe endpoint or a marketing-list integration.
2. **Report fraud** (`/report-fraud`). Full form with validation, shows "Report received",
   sends nothing. Needs a submit endpoint plus an internal notification.
3. **Login** (`/login`). The form has no submit behaviour at all. Needs to either connect to
   real sign-in or be pointed at the customer portal.
4. **Sign in / Sign up** (`/account/signin`, `/account/signup`). Wired to the starter auth
   routes that ship with the template, not to your real account system.

### B. Forms already handled by HubSpot, no work needed

Book a Demo, Contact Sales, Partners and the Reseller application all post to HubSpot
embeds, so they are live today. Listed only so nothing gets rebuilt by mistake.

### C. Shop, the biggest gap

The shop is a catalogue only. 52 products come from a generated file, and product pages have
a quantity stepper but no cart, no checkout and no payment.

Needs: products/variants/collections as real data, cart, checkout, payment, tax and
shipping, order confirmation emails, and an admin screen to edit products. Until then the
honest options are a "Request a quote" button or linking out to an existing store.

### D. Content that is currently fixed in the code

5. **System status** (`/system-status`). Statuses and the "last updated" date are typed by
   hand in a config file. Needs a status source or manual updates on release.
6. **Blog** (`/blog`). Posts come from a generated file for the public site, while the admin
   screens talk to a database that is not connected. Either point both at your new backend
   or keep the site on the generated file and drop the admin screens.
7. **Support articles** (`/support`). 320 imported articles in generated files. Fine as-is,
   but any editing needs a backend.
8. **Media library and rich text editor** (`/admin`). Both expect upload and storage
   endpoints that are not connected.

### E. Support assistant

The support assistant answers from the imported articles only. It calls no AI service today.
Connecting a real model is a backend decision for Cursor.

## Suggested order

1. Newsletter and Report fraud, small and customer-facing.
2. Decide the Shop direction: full store, quote requests, or link out.
3. Decide the Blog direction: generated file or database-backed with admin.
4. Login and account, once you know which system owns customer identity.
5. Status page and the assistant last.

## Notes

- No page addresses change anywhere in this work, and all existing redirects stay as they
  are.
- No database is added in this project. Every item above is described as an endpoint your
  Cursor backend will expose, so the site can call it later.
- Remaining audit items not covered here (share images, alt text, unused pictures, retiring
  the duplicate home pages) stay open and can follow in their own round.
