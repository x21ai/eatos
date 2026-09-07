// @ts-nocheck
import CfdPageClient from './CfdPageClient';

export const metadata = {
  alternates: { canonical: '/products/guest-facing-display' },
  title: 'Guest Facing Display for Restaurants',
  description:
    'Enhance transparency with real-time ordering, contactless payments, digital tips, electronic receipts and smartphone transactions on the eatOS Guest Facing Display.',
  openGraph: {
    url: '/products/guest-facing-display',
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
