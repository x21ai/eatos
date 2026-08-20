// @ts-nocheck
import PopPageClient from './PopPageClient';

export const metadata = {
  title: 'Point of Purchase Handheld POS | eatOS Restaurant Technology Cloud',
  description:
    'All the power of a full size Point of Sale in your hands: contactless payments, real-time MenuSync, table management and fire to kitchen from one handheld.',
  openGraph: {
    type: 'website',
    title: 'Point of Purchase Handheld POS | eatOS',
    description:
      'Take orders, fire to the kitchen and accept contactless payment right at the table with the eatOS handheld.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Point of Purchase Handheld POS | eatOS',
    description:
      'Take orders, fire to the kitchen and accept contactless payment right at the table with the eatOS handheld.',
  },
};

export default function PointOfPurchasePage() {
  return <PopPageClient />;
}