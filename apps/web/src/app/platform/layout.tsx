// @ts-nocheck
import { marketingMetadata } from '@/lib/seo';

export const metadata = marketingMetadata({
  title: 'eatOS Restaurant Point of Sale Platform',
  description:
    'eatOS restaurant point of sale platform for payments, kitchen display, kiosk, online ordering, inventory, and workforce.',
  path: '/platform',
  template: '%s | eatOS',
});

export default function PlatformLayout({ children }) {
  return children;
}
