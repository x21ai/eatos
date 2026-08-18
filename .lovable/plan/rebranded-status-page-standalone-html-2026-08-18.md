# Rebranded Status Page (standalone HTML)

Deliver a single self-contained `status.html` file styled to match the eatOS site, with a modernized layout that keeps all existing status-page content.

## What you get

One file you can drop into your status host or serve directly. No build step, no dependencies beyond the Google Fonts link.

## Branding applied

- **Typography:** Montserrat (300 to 900), same as the site. Headings bold with tight tracking, body at 16 to 18px.
- **Theme:** black editorial surface with white text, matching the site's dark pages. Cards on subtle white/5 surfaces with white/10 hairline borders.
- **Status colors:** emerald for operational, amber for degraded, orange for partial outage, rose for major outage, slate for maintenance. Each state also carries an icon and a text label, so status is never color-only.
- **Radii and spacing:** 8px card radius, pill buttons, and the site's compact vertical rhythm.
- **Logo:** eatOS wordmark in the header, linking back to the main site.

## Modernized layout

```text
Header        logo, link to eatos.com, "Subscribe to updates"
Banner        one large overall-status line, e.g. "All systems operational"
              plus last-checked timestamp
Components    grouped service cards (POS, KDS, Kiosk, CFD, Dashboard,
              Payments, API), each row with name, 90-day uptime bar,
              uptime percentage and a status pill
Metrics       optional response-time / uptime summary tiles
History       incident timeline grouped by date, each entry with severity
              pill, title, affected components and update log
Footer        eatOS links, support contact, legal
```

The 90-day uptime bars replace the old fixed three-across node grid, so the page reads clearly on phones, tablets and desktop instead of relying on the media-query override you were patching.

## Responsive behavior

- Desktop: two-column component groups, full 90-day bars.
- Tablet: single-column groups, condensed bars.
- Mobile: stacked cards, status pill under the name, bars trimmed to the most recent 30 days.

## Technical notes

- Plain HTML5 with a single inline `<style>` block; CSS custom properties for every color so you can retheme in one place.
- Semantic markup: `<main>`, `<section>`, one `<h1>`, `<time datetime>` on timestamps, `aria-label` on uptime bars, and `role="status"` on the overall banner.
- Head metadata: title, description, `og:title`, `og:description`, `og:type`, `twitter:card`, canonical.
- Sample/placeholder data for components and incidents, clearly marked so your status tooling can substitute real values. If your host injects the existing `css-home-services-*` markup, I will keep those class hooks in place and style them rather than renaming them.
- Prefers-reduced-motion respected; no JavaScript required for the layout.

## Note

To get the class names and content exactly right I only have the CSS override you pasted, not the page markup. I will build against the standard status-page structure implied by those class names and include the `css-home-services-*` hooks. If you paste the full HTML afterwards, I can align it precisely in one pass.
