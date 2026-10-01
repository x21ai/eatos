import StatusClient from './StatusClient';
import { marketingMetadata } from '@/lib/seo';

export const metadata = marketingMetadata({
  title: 'eatOS System Status',
  description: 'Live status of eatOS restaurant point of sale services.',
  path: '/status',
});

export default function StatusPage() {
  return <StatusClient />;
}
