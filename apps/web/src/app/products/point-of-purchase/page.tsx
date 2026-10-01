// @ts-nocheck
import PopPageClient from './PopPageClient';
import { JsonLd, marketingMetadata, softwareApplicationJsonLd } from '@/lib/seo';

const pageTitle = 'eatOS Handheld Point of Sale';
const pageDescription = 'eatOS handheld point of sale for tableside orders, kitchen firing, and contactless payment.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/products/point-of-purchase',
});
export default function PointOfPurchasePage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd({ name: pageTitle, description: pageDescription, path: metadata.alternates.canonical })} />
      <PopPageClient />
    </>
  );
}