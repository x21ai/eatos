// @ts-nocheck
import HardwarePageClient from './HardwarePageClient';
import { JsonLd, marketingMetadata, productJsonLd } from '@/lib/seo';

const pageTitle = 'eatOS Restaurant Point of Sale Hardware';
const pageDescription = 'eatOS restaurant point of sale hardware: terminals, kitchen displays, self-order kiosks, and payment readers.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/products/hardware',
});
export default function HardwarePage() {
  return (
    <>
      <JsonLd data={productJsonLd({ name: pageTitle, description: pageDescription, path: metadata.alternates.canonical })} />
      <HardwarePageClient />
    </>
  );
}
