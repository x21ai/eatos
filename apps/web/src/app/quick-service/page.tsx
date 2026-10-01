// @ts-nocheck
import QuickServiceClient from "./QuickServiceClient";
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Quick Service Point of Sale';
const pageDescription = 'eatOS quick-service point of sale for counter, kiosk, handheld, and online orders on one cloud platform.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/quick-service',
});
export default function QuickServicePage() {
  return <QuickServiceClient />;
}
