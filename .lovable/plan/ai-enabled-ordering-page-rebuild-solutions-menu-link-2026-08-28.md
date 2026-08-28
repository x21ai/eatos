# AI-Enabled Ordering page rebuild + Solutions menu link

## 1. Rebuild `/products/ai-enabled-ordering-automation`

Today this URL is rendered by the generic product template (`products/[slug]`). It gets its own page in the same layout used by Inventory Management, Marketing and the other flagship product pages.

Sections, top to bottom:

- **Hero**: breadcrumb (Products > AI-Enabled Ordering), eyebrow "AI-Enabled Ordering Automation", headline "VoiceOS: Let AI Handle Your Voice Ordering Process", the intro line about automating phone orders while AI interacts with customers, "Book a Demo" plus Brochure button, and hero stat row.
- **Key Features** strip listing the six capability chips from the reference: Streamlined Order Taking Process, Enhanced Customer Engagement, Increased Efficiency and Productivity, Order Accuracy & Customization, Seamless Integration with eatOS, Data-Driven Insights and Analytics.
- **Four alternating feature rows** (left/right image, metrics, copy, Blog + Brochure buttons), exactly these four:
  1. Streamlined Order Taking Process, 100% AI-Enabled / 10% Service Focus
  2. Enhanced Customer Engagement, 100% Interactive / 10x More Engagement
  3. Increased Efficiency and Productivity, 100% Productivity Up / 100% Staff Empowered
  4. Order Accuracy and Customization, 100% Customizable / 100% Accurate Orders
- **Closing spec cards** covering Seamless Integration with the eatOS ecosystem and Data-Driven Insights and Analytics, plus a related-products row and the standard Book a Demo call to action.

Images: no images generated. Each feature row uses the existing marketing `Placeholder` component with a descriptive label, so swapping in your images later is a one-line change per feature in `content.ts`.

Copy follows the attachment wording, adapted to house style (no em dashes, "Point of Sale" spelled out).

## 2. Add the menu link

Add an "AI-Enabled Ordering" entry to the dropdown labelled **Solutions** in the desktop header, pointing at `/products/ai-enabled-ordering-automation` (not `/ai`). The same entry is added to the matching group in the mobile menu so both navigations stay aligned. The existing "Intelligence" entry that points to `/ai` stays as it is.

## Technical notes

- New files: `apps/web/src/app/products/ai-enabled-ordering-automation/page.tsx` (metadata, OG/Twitter tags), `content.ts` (all copy, stats, feature data with `image: null`), `AiOrderingPageClient.tsx` (layout, modelled on `InventoryPageClient.tsx`, purple/brand accent).
- Add `'ai-enabled-ordering-automation'` to the `dedicated` array in `products/[slug]/page.tsx` so the static route does not collide with the generic builder.
- `Header.tsx`: add one item to `productLinks` (the array behind the visible "Solutions" dropdown) and the corresponding mobile menu group.
- URL is unchanged, so no redirect or sitemap changes are needed.
