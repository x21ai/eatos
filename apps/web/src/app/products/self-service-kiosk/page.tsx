// @ts-nocheck
import KioskPageClient from './KioskPageClient';
import { JsonLd, marketingMetadata, softwareApplicationJsonLd } from '@/lib/seo';

const pageTitle = 'eatOS Self-Service Kiosk';
const pageDescription = 'eatOS self-service kiosk point of sale for shorter lines, larger checks, and orders sent straight to the kitchen.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/products/self-service-kiosk',
});
export default function SelfServiceKioskPage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd({ name: pageTitle, description: pageDescription, path: metadata.alternates.canonical })} />
      <KioskPageClient />
    </>
  );
}