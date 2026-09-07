# Backend wiring handover

What the site needs from the backend being built separately. No database is added in this
project, and no page addresses change.

## Already live

Book a Demo, Contact Sales, Partners and the Reseller application post to HubSpot embeds.
Do not rebuild these.

## Forms that show success but send nothing

| Page | File | Needs |
|---|---|---|
| Newsletter (site-wide footer section) | `apps/web/src/components/NewsletterSection.tsx` | Subscribe endpoint or marketing-list integration |
| Report fraud | `apps/web/src/app/report-fraud/ReportFraudClient.tsx` | Submit endpoint plus internal notification |
| Login | `apps/web/src/app/login/page.tsx` | No submit behaviour at all; connect real sign-in or point at the customer portal |
| Sign in / Sign up | `apps/web/src/app/account/signin`, `apps/web/src/app/account/signup` | Currently on the starter auth routes, not the real account system |

Suggested contracts:

```ts
POST /api/newsletter        { email: string }              -> { ok: true }
POST /api/report-fraud      { firstName, lastName, email, phone?, category, details }
                                                           -> { ok: true, reference: string }
```

Errors as `{ error: true, code: string, message: string }`.

## Shop, the largest gap

Catalogue only. 52 products come from `apps/web/src/app/shop/catalog.generated.json`.
Product pages have a quantity stepper but no cart, checkout or payment.

Full store needs: products, variants and collections as real data, cart, checkout, payment,
tax and shipping, order confirmation email, and an admin editor. Interim options are a
"Request a quote" button or linking out to an existing store.

## Content currently fixed in code

| Page | Source | Note |
|---|---|---|
| System status | `apps/web/src/app/system-status/systems.ts` | Statuses and "last updated" typed by hand |
| Blog | `posts.generated.json` for the public site; `apps/web/src/app/api/blog` expects a database | Pick one source of truth |
| Support articles | `apps/web/src/app/support/*.generated.json` | Fine as-is; editing needs a backend |
| Admin media library and editor | `apps/web/src/components/admin/*` | Upload and storage endpoints not connected |

## Support assistant

`apps/web/src/app/components/agent/AgentAssistant.tsx` answers from the imported support
articles only. It calls no AI service today.

## Suggested order

1. Newsletter and Report fraud.
2. Decide the Shop direction.
3. Decide the Blog direction.
4. Login and accounts.
5. Status page, then the assistant.
