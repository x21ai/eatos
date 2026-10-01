import OfflinePosClient from './OfflinePosClient';
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Offline Point of Sale';
const pageDescription = 'eatOS offline point of sale stays in sync on a peer-to-peer mesh, with or without the internet.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/offline-point-of-sale',
});
export default function OfflinePointOfSalePage() {
  return <OfflinePosClient />;
}
