// @ts-nocheck
import PricingPageClient from './PricingPageClient';

export const metadata = {
  alternates: { canonical: '/pricing' },
  title: 'Pricing',
  description:
    'Simple restaurant Point of Sale pricing. $0 upfront hardware cost at 2.99%+15¢ per tap, dip or swipe, or build your own bundle at 2.59%+15¢. Send us your quote and we will beat it.',
  openGraph: {
    url: '/pricing',
    title: 'eatOS Pricing - Simple Pricing',
    description:
      'No hardware to purchase, no monthly SaaS fees. Upload your statement or quote and we will beat it.',
  },
};

export default function PricingPage() {
  return <PricingPageClient />;
}
