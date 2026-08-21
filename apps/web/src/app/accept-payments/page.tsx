// @ts-nocheck
import PaymentsPageClient from './PaymentsPageClient';

export const metadata = {
  title: 'Restaurant Payment Solutions | eatOS',
  description:
    'Cloud based restaurant payment processing with Tap to Pay on iPhone, EMV and contactless cards, Apple Pay, Google Pay, offline mode and processor agnostic routing.',
  openGraph: {
    type: 'website',
    title: 'Restaurant Payment Solutions | eatOS',
    description:
      'Accept card, contactless, wallet and Tap to Pay on iPhone payments anywhere with eatOS Payments.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Payment Solutions | eatOS',
    description:
      'Accept card, contactless, wallet and Tap to Pay on iPhone payments anywhere with eatOS Payments.',
  },
};

export default function AcceptPaymentsPage() {
  return <PaymentsPageClient />;
}
