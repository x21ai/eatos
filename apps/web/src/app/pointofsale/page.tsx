// @ts-nocheck
import PosPageClient from './PosPageClient';
import { JsonLd, marketingMetadata, softwareApplicationJsonLd } from '@/lib/seo';

const title = 'eatOS Restaurant Point of Sale System';
const description =
  'eatOS restaurant point of sale with real-time menus, table management, online ordering, pay-at-table, and offline reliability.';

export const metadata = marketingMetadata({ title, description, path: '/pointofsale' });

export default function PointOfSalePage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd({ name: title, description, path: '/pointofsale' })} />
      <PosPageClient />
    </>
  );
}
