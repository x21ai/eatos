// @ts-nocheck
import TapToPayClient from './TapToPayClient';

export const metadata = {
  title: 'Tap to Pay | eatOS',
  description:
    'Take contactless payments during the order with eatOS Tap to Pay. Cards, wallets and watches on the phone your team already carries — no extra terminals.',
  openGraph: {
    type: 'website',
    title: 'Tap to Pay | eatOS',
    description:
      'Contactless payments taken during the order — tableside, at the counter or curbside, with no extra hardware.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tap to Pay | eatOS',
    description:
      'Contactless payments taken during the order — tableside, at the counter or curbside, with no extra hardware.',
  },
};

export default function TapToPayPage() {
  return <TapToPayClient />;
}
