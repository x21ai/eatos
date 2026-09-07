// @ts-nocheck
import PosPageClient from './PosPageClient';

export const metadata = {
  alternates: { canonical: '/pointofsale' },
  title: 'Restaurant Point of Sale System',
  description:
    'A cloud Point of Sale built for service: real-time menu management, table management, built-in online ordering, order and pay at table, and offline reliability.',
  openGraph: {
    url: '/pointofsale',
    type: 'website',
    title: 'Restaurant Point of Sale System | eatOS',
    description:
      'Real-time menus, table management, built-in online ordering and offline reliability in one Point of Sale.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Point of Sale System | eatOS',
    description:
      'Real-time menus, table management, built-in online ordering and offline reliability in one Point of Sale.',
  },
};

export default function PointOfSalePage() {
  return <PosPageClient />;
}
