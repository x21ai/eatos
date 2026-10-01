// @ts-nocheck
import CfdPageClient from './CfdPageClient';
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Guest Facing Display';
const pageDescription = 'eatOS guest facing display for live orders, contactless payments, tips, and electronic receipts.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/products/guest-facing-display',
});
export default function CfdPage() {
  return <CfdPageClient />;
}
