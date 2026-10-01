// @ts-nocheck
import GhostKitchenClient from "./GhostKitchenClient";
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Ghost Kitchen Point of Sale';
const pageDescription = 'eatOS ghost kitchen point of sale with commission-free ordering, kitchen display routing, and multi-brand reporting.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/ghost-kitchens',
});
export default function GhostKitchenPage() {
  return <GhostKitchenClient />;
}
