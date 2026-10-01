// @ts-nocheck
import CafeClient from "./CafeClient";
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Cafe Point of Sale';
const pageDescription = 'eatOS cafe point of sale with fast order entry, modifiers, inventory, loyalty, and self-service kiosk ordering.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/cafe-pos',
});
export default function CafePage() {
  return <CafeClient />;
}
