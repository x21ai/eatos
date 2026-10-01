// @ts-nocheck
import TablesidePageClient from './TablesidePageClient';
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Tableside Order and Pay';
const pageDescription = 'eatOS tableside order and pay lets guests scan, order, and pay from their phone, synced to the point of sale.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/products/tableside-order-and-pay',
});
export default function TablesideOrderAndPayPage() {
  return <TablesidePageClient />;
}
