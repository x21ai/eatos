// @ts-nocheck
import AutonomousPageClient from './AutonomousPageClient';

export const metadata = {
  title: 'Autonomous Delivery Robot for Restaurants | eatOS',
  description:
    'ServeBot is a fully autonomous restaurant robot with collective automation and weight responsive auto return, so your team can focus on guests.',
  openGraph: {
    type: 'website',
    title: 'Autonomous Delivery Robot for Restaurants | eatOS',
    description:
      'A fully autonomous restaurant robot with collective automation and weight responsive auto return.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autonomous Delivery Robot for Restaurants | eatOS',
    description:
      'A fully autonomous restaurant robot with collective automation and weight responsive auto return.',
  },
};

export default function AutonomousDeliveryPage() {
  return <AutonomousPageClient />;
}
