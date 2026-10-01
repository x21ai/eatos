// @ts-nocheck
import MarketingPageClient from './MarketingPageClient';
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Restaurant Marketing';
const pageDescription = 'eatOS restaurant marketing with personalized promotions, lead scoring, and email automation.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/products/automated-marketing',
});
export default function AutomatedMarketingPage() {
  return <MarketingPageClient />;
}
