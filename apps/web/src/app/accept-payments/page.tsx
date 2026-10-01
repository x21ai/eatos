// @ts-nocheck
import PaymentsPageClient from './PaymentsPageClient';
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Restaurant Payments';
const pageDescription = 'eatOS restaurant point of sale payments: Tap to Pay on iPhone, EMV, contactless, wallets, and offline mode.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/accept-payments',
});
export default function AcceptPaymentsPage() {
  return <PaymentsPageClient />;
}
