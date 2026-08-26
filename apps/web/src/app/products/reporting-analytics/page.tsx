// @ts-nocheck
import AnalyticsPageClient from './AnalyticsPageClient';

export const metadata = {
  title: 'Analytics & Reporting for Restaurants',
  description:
    'Real-time data, cloud reporting and multi-location reporting for restaurants. Track sales, labor and menu mix and act on it during service.',
  openGraph: {
    type: 'website',
    title: 'Analytics & Reporting for Restaurants | eatOS',
    description:
      'Real-time data, cloud reporting and multi-location reporting for restaurants, powered by Maya AI.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Analytics & Reporting for Restaurants | eatOS',
    description:
      'Real-time data, cloud reporting and multi-location reporting for restaurants, powered by Maya AI.',
  },
};

export default function ReportingAnalyticsPage() {
  return <AnalyticsPageClient />;
}