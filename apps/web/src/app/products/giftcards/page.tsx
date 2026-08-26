// @ts-nocheck
import GiftCardsPageClient from './GiftCardsPageClient';

export const metadata = {
  title: 'Custom Restaurant Gift Cards',
  description:
    'Design custom physical and digital gift cards for your restaurant. From 79¢ per card, packs start at 250 cards, with instant redemption at the Point of Sale.',
  openGraph: {
    type: 'website',
    title: 'Custom Restaurant Gift Cards | eatOS',
    description:
      'Design custom physical and digital gift cards for your restaurant with instant redemption and live balance tracking.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Restaurant Gift Cards | eatOS',
    description:
      'Design custom physical and digital gift cards for your restaurant with instant redemption and live balance tracking.',
  },
};

export default function GiftCardsPage() {
  return <GiftCardsPageClient />;
}
