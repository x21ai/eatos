// @ts-nocheck
import KdsPageClient from './KdsPageClient';

export const metadata = {
  title: 'Kitchen Display System',
  description:
    'The eatOS Kitchen Display System streamlines kitchen communication with prep station routing, multi-lingual tickets, kitchen-grade hardware and real-time analytics.',
  openGraph: {
    type: 'website',
    title: 'Kitchen Display System | eatOS',
    description:
      'Digital command center for your kitchen: prep station routing, multi-lingual tickets, kitchen-grade hardware and real-time reporting.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kitchen Display System | eatOS',
    description:
      'Digital command center for your kitchen: prep station routing, multi-lingual tickets, kitchen-grade hardware and real-time reporting.',
  },
};

export default function KitchenDisplaySystemPage() {
  return <KdsPageClient />;
}