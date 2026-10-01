// @ts-nocheck
import FullServiceClient from "./FullServiceClient";
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Full Service Point of Sale';
const pageDescription = 'eatOS full-service restaurant point of sale with reservations, table management, coursing, and offline mode.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/full-service',
});
export default function FullServicePage() {
  return <FullServiceClient />;
}
