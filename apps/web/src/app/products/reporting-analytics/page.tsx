// @ts-nocheck
import AnalyticsPageClient from './AnalyticsPageClient';
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Restaurant Analytics';
const pageDescription = 'eatOS restaurant analytics for sales, labor, and menu mix, reported live from the point of sale.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/products/reporting-analytics',
});
export default function ReportingAnalyticsPage() {
  return <AnalyticsPageClient />;
}