// @ts-nocheck
import AiOrderingPageClient from './AiOrderingPageClient';

export const metadata = {
  alternates: { canonical: '/products/ai-enabled-ordering-automation' },
  title: 'AI-Enabled Ordering Automation',
  description:
    'VoiceOS from eatOS answers calls, takes orders and books reservations with AI, sending every order straight to your Point of Sale and kitchen displays.',
  openGraph: {
    url: '/products/ai-enabled-ordering-automation',
    type: 'website',
    title: 'AI-Enabled Ordering Automation | eatOS',
    description:
      'Let VoiceOS handle your voice ordering process. Automate phone orders, capture accurate customizations and free your team for service.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Enabled Ordering Automation | eatOS',
    description:
      'Let VoiceOS handle your voice ordering process. Automate phone orders, capture accurate customizations and free your team for service.',
  },
};

export default function AiEnabledOrderingPage() {
  return <AiOrderingPageClient />;
}
