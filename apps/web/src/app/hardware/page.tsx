// @ts-nocheck
import HardwarePageClient from './HardwarePageClient';

export const metadata = {
  title: 'Restaurant Hardware',
  description:
    'eatOS hardware to fit your business: Point of Sale terminals, kitchen displays, self ordering kiosks and payment readers.',
  openGraph: {
    type: 'website',
    title: 'Restaurant Hardware | eatOS',
    description:
      'Point of Sale terminals, kitchen displays, self ordering kiosks and payment readers, all on one cloud platform.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Hardware | eatOS',
    description:
      'Point of Sale terminals, kitchen displays, self ordering kiosks and payment readers, all on one cloud platform.',
  },
};

export default function HardwarePage() {
  return <HardwarePageClient />;
}
