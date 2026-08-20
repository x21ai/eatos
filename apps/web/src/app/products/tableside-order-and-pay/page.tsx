// @ts-nocheck
import TablesidePageClient from './TablesidePageClient';

export const metadata = {
  title: 'Tableside Order & Pay | eatOS Restaurant Technology Cloud',
  description:
    'eatOS Tableside Order & Pay lets guests scan, order, and pay from their phone with no app download. Real-Time MenuSync, dynamic payments, and a merchant platform built for restaurants.',
  openGraph: {
    type: 'website',
    title: 'Tableside Order & Pay | eatOS',
    description:
      'Let guests scan, order, and pay from their phone with Real-Time MenuSync, dynamic payments, and a unified merchant platform.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tableside Order & Pay | eatOS',
    description:
      'Let guests scan, order, and pay from their phone with Real-Time MenuSync, dynamic payments, and a unified merchant platform.',
  },
};

export default function TablesideOrderAndPayPage() {
  return <TablesidePageClient />;
}
