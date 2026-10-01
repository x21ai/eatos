// @ts-nocheck
import { marketingMetadata } from '@/lib/seo';

export const metadata = marketingMetadata({
  title: 'eatOS Restaurant AI',
  description:
    'AI inside the eatOS restaurant point of sale: forecasting, menu insight, labor planning, and guest personalization.',
  path: '/ai',
  template: '%s | eatOS',
});

export default function AiLayout({ children }) {
  return children;
}
