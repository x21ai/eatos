// @ts-nocheck
import OrderingPageClient from './OrderingPageClient';

export const metadata = {
  title: 'Online Ordering & Delivery App for Restaurants',
  description:
    'OrderOS gives you a white-labeled ordering app and website with guest profiles and zero third party commissions on every order.',
  openGraph: {
    type: 'website',
    title: 'Online Ordering & Delivery App for Restaurants | eatOS',
    description:
      'A white-labeled ordering app and website with guest profiles and no third party commissions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Ordering & Delivery App for Restaurants | eatOS',
    description:
      'A white-labeled ordering app and website with guest profiles and no third party commissions.',
  },
};

export default function OnlineOrderingPage() {
  return <OrderingPageClient />;
}
