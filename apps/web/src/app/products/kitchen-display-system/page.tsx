// @ts-nocheck
import KdsPageClient from './KdsPageClient';
import { JsonLd, marketingMetadata, softwareApplicationJsonLd } from '@/lib/seo';

const pageTitle = 'eatOS Kitchen Display System';
const pageDescription = 'eatOS Kitchen Display System routes prep stations, shows multilingual tickets, and reports kitchen speed.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/products/kitchen-display-system',
});
export default function KitchenDisplaySystemPage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd({ name: pageTitle, description: pageDescription, path: metadata.alternates.canonical })} />
      <KdsPageClient />
    </>
  );
}