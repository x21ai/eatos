// @ts-nocheck
import { marketingMetadata } from '@/lib/seo';

export const metadata = marketingMetadata({
  title: 'eatOS Restaurant Point of Sale Products',
  description:
    'eatOS restaurant point of sale products: terminals, handhelds, kitchen displays, kiosks, guest-facing displays, and payment devices.',
  path: '/products',
  template: '%s | eatOS',
});

export default function ProductsLayout({ children }) {
  return children;
}
