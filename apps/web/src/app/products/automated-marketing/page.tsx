// @ts-nocheck
import MarketingPageClient from './MarketingPageClient';

export const metadata = {
  title: 'Automated Marketing for Restaurants | eatOS',
  description:
    'Boost guest engagement with personalized promotions, lead scoring, email marketing automation and data-driven insights from eatOS.',
  openGraph: {
    type: 'website',
    title: 'Automated Marketing for Restaurants | eatOS',
    description:
      'Boost guest engagement with personalized promotions, lead scoring, email marketing automation and data-driven insights.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automated Marketing for Restaurants | eatOS',
    description:
      'Boost guest engagement with personalized promotions, lead scoring, email marketing automation and data-driven insights.',
  },
};

export default function AutomatedMarketingPage() {
  return <MarketingPageClient />;
}
