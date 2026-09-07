// @ts-nocheck
import KioskPageClient from './KioskPageClient';

export const metadata = {
  alternates: { canonical: '/products/self-service-kiosk' },
  title: 'Self-Service Kiosk',
  description:
    'eatOS self-service kiosks make ordering simple, shorter lines, larger checks, smart upsells and orders that route straight to the kitchen.',
  openGraph: {
    url: '/products/self-service-kiosk',
    type: 'website',
    title: 'Self-Service Kiosk | eatOS',
    description:
      'Guest-driven ordering on commercial-grade kiosks: smart upsells, contactless payments and direct kitchen integration.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Self-Service Kiosk | eatOS',
    description:
      'Guest-driven ordering on commercial-grade kiosks: smart upsells, contactless payments and direct kitchen integration.',
  },
};

export default function SelfServiceKioskPage() {
  return <KioskPageClient />;
}