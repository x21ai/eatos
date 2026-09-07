// @ts-nocheck
import KdsPageClient from './KdsPageClient';

export const metadata = {
  alternates: { canonical: '/products/kitchen-display-system' },
  title: 'Kitchen Display System',
  description:
    'The eatOS Kitchen Display System streamlines kitchen communication with prep station routing, multi-lingual kitchen tickets, kitchen-grade hardware and real-time analytics.',
  openGraph: {
    url: '/products/kitchen-display-system',
    type: 'website',
    title: 'Kitchen Display System | eatOS',
    description:
      'Digital command center for your kitchen: prep station routing, multi-lingual kitchen tickets, kitchen-grade hardware and real-time reporting.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kitchen Display System | eatOS',
    description:
      'Digital command center for your kitchen: prep station routing, multi-lingual kitchen tickets, kitchen-grade hardware and real-time reporting.',
  },
};

export default function KitchenDisplaySystemPage() {
  return <KdsPageClient />;
}