// @ts-nocheck
import BrochuresClient from './BrochuresClient';

export const metadata = {
  alternates: { canonical: '/brochures' },
  title: 'Product Brochures',
  description:
    'Browse and download eatOS product brochures, Point of Sale, Kiosk, KDS, Online Ordering, Workforce Management, Reporting and more.',
  openGraph: {
    url: '/brochures',
    title: 'Product Brochures | eatOS',
    description:
      'Flip through or download eatOS product brochures for every part of the restaurant technology cloud.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function BrochuresPage() {
  return <BrochuresClient />;
}