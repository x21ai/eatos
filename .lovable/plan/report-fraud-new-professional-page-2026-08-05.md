# Report Fraud — new professional page

Rebuild `/report-fraud` as a polished, editorial page in the same design language as the redesigned Kitchen Display System and Self-Service Kiosk pages, keeping all the content from the current live page but with a much stronger layout.

## Content kept (from the screenshot)

- Account Details — email fraud@eatOS.com to report fake or bogus emails; never share username or password; reset immediately if leaked.
- Recognize and Report Phishing Scams — forward suspicious emails to fraud@eatOS.com without adding other information.
- What is Phishing? — definition and how fraudsters solicit information.
- Protect Sensitive Information — eatOS never asks for username, password, SSN, bank or card details by email, phone or text.
- Suspicious Emails — spoofed sites, retype addresses instead of clicking links, look for a secure payments.eatos.com address.
- Detect Digital Fraud? Report It Here — "Share Details" form: First name, Email, Phone, Message, Submit.
- Urgent help contacts — fraud hotline and fraud@eatos.com.

## New design

- **Hero (dark band):** small "Trust & Safety" eyebrow, large tightened headline "Report fraud", one-line subhead, and two quiet actions — jump to the report form, and email the fraud team. Scroll-revealed.
- **Safety rules strip:** three short cards (never share credentials, eatOS never asks by email or text, always retype the address) so the key advice lands before any scrolling.
- **Guidance spotlights:** alternating image/text bands for the five content blocks above, using the shared `Placeholder` component with padded image plates so nothing gets cropped. Placeholders now, real images later.
- **Report form section:** two-column layout — left is the explanatory copy plus a short "what happens next" list; right is the "Share Details" card with First name, Email, Phone, Message and Submit. Client-side validation (required fields, email format, length limits), inline errors, loading state, and a confirmation state after submit (no backend, same static behaviour as today).
- **Urgent help band:** fraud hotline and fraud@eatos.com cards.
- Closing CTA consistent with the other product pages.

Responsive across mobile, tablet and desktop. Header and footer links plus the sitemap entry already exist and stay as they are.

## Technical notes

- `apps/web/src/app/report-fraud/content.ts` — all copy, spotlight definitions and image slots.
- `apps/web/src/app/report-fraud/ReportFraudClient.tsx` — client component with `motion/react` scroll reveals and the form state machine.
- `apps/web/src/app/report-fraud/page.tsx` — server page with SEO metadata (title, description, og tags) rendering the client component.
- Reuse `@/components/marketing/Placeholder` for the image plates.
- Update `lightPages` in `apps/web/src/components/Header.tsx` so the logo and nav stay readable against the new dark hero.
- Verify with a Next.js build plus Playwright checks at mobile, tablet and desktop widths.