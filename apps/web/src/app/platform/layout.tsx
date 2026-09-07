// @ts-nocheck
export const metadata = {
  alternates: { canonical: '/platform' },
  title: 'Restaurant Technology Platform',
  description:
    'One connected platform for Point of Sale, payments, kitchen display, kiosk, online ordering, inventory and workforce management.',
  openGraph: {
    url: '/platform',
    type: 'website',
    title: 'Restaurant Technology Platform | eatOS',
    description:
      'Point of Sale, payments, kitchen, kiosk, ordering, inventory and workforce management on one connected platform.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Technology Platform | eatOS',
    description:
      'Point of Sale, payments, kitchen, kiosk, ordering, inventory and workforce management on one connected platform.',
  },
};

export default function PlatformLayout({ children }) {
  return children;
}
