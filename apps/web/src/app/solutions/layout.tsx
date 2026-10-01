// @ts-nocheck
import { marketingMetadata } from '@/lib/seo';

const description =
  'eatOS point of sale for quick service, full service, fast casual, cafes, bars, food trucks, catering, and enterprise groups.';

export const metadata = marketingMetadata({
  title: 'eatOS Restaurant Point of Sale Solutions',
  description,
  path: '/solutions',
  template: '%s | eatOS',
});

export default function SolutionsLayout({ children }) {
  return children;
}
