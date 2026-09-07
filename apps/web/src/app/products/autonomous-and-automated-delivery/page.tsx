// @ts-nocheck
import AutonomousPageClient from './AutonomousPageClient';

export const metadata = {
  alternates: { canonical: '/products/autonomous-and-automated-delivery' },
  title: 'Autonomous Delivery Robot for Restaurants',
  description:
    'ServeBot is a fully autonomous restaurant robot with collective automation and weight responsive auto return, so your team can focus on guests.',
  openGraph: {
    url: '/products/autonomous-and-automated-delivery',
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
