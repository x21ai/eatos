// @ts-nocheck
import CfdPageClient from './CfdPageClient';

export const metadata = {
  title: 'Guest Facing Display for Restaurants',
  description:
    'Enhance transparency with real-time ordering, contactless payments, digital tips, electronic receipts and smartphone transactions on the eatOS Guest Facing Display.',
  openGraph: {
    type: 'website',
    title: 'Guest Facing Display for Restaurants | eatOS',
    description:
      'Enhance transparency with real-time ordering, contactless payments, digital tips, electronic receipts and smartphone transactions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guest Facing Display for Restaurants | eatOS',
    description:
      'Enhance transparency with real-time ordering, contactless payments, digital tips, electronic receipts and smartphone transactions.',
  },
};

export default function CfdPage() {
  return <CfdPageClient />;
}
