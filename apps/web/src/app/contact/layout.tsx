// @ts-nocheck
import { marketingMetadata } from '@/lib/seo';
const pageTitle = 'Contact eatOS Sales';
const pageDescription = 'Talk to eatOS about restaurant point of sale pricing, hardware bundles, and moving off your current system.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/contact',
});
export default function ContactSalesLayout({ children }) {
  return children;
}
