// @ts-nocheck
import ComparisonClient from './ComparisonClient';
import { marketingMetadata } from '@/lib/seo';

const title = 'eatOS vs Other Restaurant Point of Sale';
const description =
  'Compare eatOS restaurant point of sale with Square, Toast, Lightspeed, SpotOn, TouchBistro, Revel, and Micros.';

export const metadata = marketingMetadata({
  title,
  description,
  path: '/eatos-vs-other-pos-software',
});

export default function ComparisonPage() {
  return <ComparisonClient />;
}
