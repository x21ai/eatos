// @ts-nocheck
import InventoryPageClient from './InventoryPageClient';

export const metadata = {
  alternates: { canonical: '/products/simplified-inventory-management' },
  title: 'Inventory Management',
  description:
    'eatOS Inventory Management simplifies real-time tracking, automated stock alerts, vendor management, recipe costing, and menu engineering for restaurants.',
  openGraph: {
    url: '/products/simplified-inventory-management',
    type: 'website',
    title: 'Inventory Management | eatOS',
    description:
      'Simplify real-time tracking, stock alerts, vendor management, and recipe costing for your restaurant with eatOS Inventory Management.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inventory Management | eatOS',
    description:
      'Simplify real-time tracking, stock alerts, vendor management, and recipe costing for your restaurant with eatOS Inventory Management.',
  },
};

export default function InventoryManagementPage() {
  return <InventoryPageClient />;
}
