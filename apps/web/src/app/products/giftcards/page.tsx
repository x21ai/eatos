// @ts-nocheck
import GiftCardsPageClient from './GiftCardsPageClient';
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Restaurant Gift Cards';
const pageDescription = 'eatOS restaurant gift cards, physical and digital, with instant redemption at the point of sale.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/products/giftcards',
});
export default function GiftCardsPage() {
  return <GiftCardsPageClient />;
}
