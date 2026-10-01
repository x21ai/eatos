// @ts-nocheck
import WorkforcePageClient from './WorkforcePageClient';
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Workforce Management';
const pageDescription = 'eatOS workforce tools for restaurant teams: scheduling, GPS time clock, shift swaps, and payroll sync.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/products/workforce-management',
});
export default function WorkforceManagementPage() {
  return <WorkforcePageClient />;
}
