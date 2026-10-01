// @ts-nocheck
import CateringClient from "./CateringClient";
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Catering Point of Sale';
const pageDescription = 'eatOS catering point of sale for large orders, event menus, ingredient inventory, and client service.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/catering',
});
export default function CateringPage() {
  return <CateringClient />;
}
