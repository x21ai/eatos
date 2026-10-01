// @ts-nocheck
import OrderingPageClient from './OrderingPageClient';
import { JsonLd, marketingMetadata, softwareApplicationJsonLd } from '@/lib/seo';

const pageTitle = 'eatOS Online Ordering and Delivery';
const pageDescription = 'eatOS online ordering and delivery: a white-label app and site with guest profiles and no third-party commissions.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/products/apponlineorderingdelivery',
});
export default function OnlineOrderingPage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd({ name: pageTitle, description: pageDescription, path: metadata.alternates.canonical })} />
      <OrderingPageClient />
    </>
  );
}
