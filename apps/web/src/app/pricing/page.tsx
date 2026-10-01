// @ts-nocheck
import PricingPageClient from './PricingPageClient';
import { JsonLd, marketingMetadata, softwareApplicationJsonLd } from '@/lib/seo';

const title = 'eatOS Pricing | Restaurant Point of Sale';
const description =
  'eatOS restaurant point of sale pricing: $0 upfront hardware at 2.99% + 15¢, or build your own bundle at 2.59% + 15¢.';

export const metadata = marketingMetadata({ title, description, path: '/pricing' });

export default function PricingPage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd({ name: title, description, path: '/pricing' })} />
      <PricingPageClient />
    </>
  );
}
