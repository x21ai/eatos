// @ts-nocheck
import LoyaltyPageClient from './LoyaltyPageClient';
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Restaurant Loyalty';
const pageDescription = 'eatOS restaurant loyalty with points, referrals, birthday perks, and rewards at the point of sale.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/products/loyalty',
});
export default function LoyaltyPage() {
  return <LoyaltyPageClient />;
}
