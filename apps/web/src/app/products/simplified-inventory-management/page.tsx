// @ts-nocheck
import InventoryPageClient from './InventoryPageClient';
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Inventory Management';
const pageDescription = 'eatOS inventory management for restaurants: live stock, vendor orders, recipe costing, and menu engineering.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/products/simplified-inventory-management',
});
export default function InventoryManagementPage() {
  return <InventoryPageClient />;
}
