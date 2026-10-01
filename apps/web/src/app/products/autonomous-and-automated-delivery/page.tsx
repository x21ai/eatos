// @ts-nocheck
import AutonomousPageClient from './AutonomousPageClient';
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Autonomous Delivery';
const pageDescription = 'ServeBot from eatOS is an autonomous restaurant robot that returns on its own so the team can serve guests.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/products/autonomous-and-automated-delivery',
});
export default function AutonomousDeliveryPage() {
  return <AutonomousPageClient />;
}
