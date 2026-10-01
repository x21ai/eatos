// @ts-nocheck
import AiOrderingPageClient from './AiOrderingPageClient';
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS AI Ordering';
const pageDescription = 'eatOS AI ordering answers calls and sends every order to the restaurant point of sale and kitchen display.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/products/ai-enabled-ordering-automation',
});
export default function AiEnabledOrderingPage() {
  return <AiOrderingPageClient />;
}
