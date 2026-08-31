# Reseller Program Page

New route `/reseller` built on the existing partners page template (black theme, Montserrat, brand pink accents), with content from the screenshot. No new images generated; image slots use existing site assets as placeholders until you supply the final files.

## Page sections

1. Hero: "Start Your Reseller Journey" with a "Join Our Team Today" button linking to the application form section.
2. Intro: "Solve it with your solution." with the supporting paragraph about specializing in eatOS products, eCommerce partners and systems integrators, plus an "Apply to be a Reseller Partner" button.
3. Reseller Program at a Glance: intro copy plus four benefit cards, using Lucide icons in place of the screenshot icons:
   - Build Relationships with Our Sales Team
   - Participate in eatOS Events
   - Increase your Brand Awareness
   - Develop Unique Content
4. Customer logo strip: "Our Restaurant Management Technology Cloud Powers The World's Best Restaurant Brands", reusing the existing CustomerShowcase logos already on the site.
5. Let's Connect: HubSpot form (portal 6789180, form a2a3be3d-16bc-429d-9e55-010af450fcd5) embedded in a white card, headed "Receive eatOS partnership updates directly in your inbox."
6. FAQs: the nine questions from the screenshot in an accordion. Answers written in eatOS voice since the screenshot shows collapsed items only.
7. Closing CTA: "Unlock New Opportunities: Become a Reseller with eatOS Today!" beside the existing HubSpot meetings booking embed used on Book a Demo / Contact Sales.

## Technical notes

- `apps/web/src/app/reseller/page.tsx` for layout and metadata (title, description, og tags), `content.ts` for copy and FAQ data.
- The HubSpot form is rendered by a small client component reusing the same script-loading pattern as `apps/web/src/app/partners/PartnerForm.tsx` (single script insert, guarded create) rather than raw inline `<script>` tags, which Next.js does not execute.
- Hero and section image slots are wired to swappable asset pointers so replacing them later is a one-line change per image.
- Footer: add `{ label: 'Reseller', href: '/reseller' }` at the end of the Company column in `apps/web/src/components/Footer.tsx`, below Comparison. Also add a matching card on `/company` for consistency.
- No em dashes in any copy.
