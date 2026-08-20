// @ts-nocheck
import LoyaltyPageClient from './LoyaltyPageClient';

export const metadata = {
  title: 'Loyalty Program for Restaurants | eatOS',
  description:
    'Build loyalty programs that drive repeat business with personalized rewards, referrals, birthday perks and omnichannel points from eatOS.',
  openGraph: {
    type: 'website',
    title: 'Loyalty Program for Restaurants | eatOS',
    description:
      'Build loyalty programs that drive repeat business with personalized rewards, referrals, birthday perks and omnichannel points.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loyalty Program for Restaurants | eatOS',
    description:
      'Build loyalty programs that drive repeat business with personalized rewards, referrals, birthday perks and omnichannel points.',
  },
};

export default function LoyaltyPage() {
  return <LoyaltyPageClient />;
}
