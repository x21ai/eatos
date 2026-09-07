// @ts-nocheck
export const metadata = {
  alternates: { canonical: '/ai' },
  title: {
    default: 'Restaurant AI Intelligence',
    template: '%s | eatOS',
  },
  description:
    'AI built into restaurant operations: demand forecasting, menu performance insight, labor planning and guest personalization on one platform.',
  openGraph: {
    url: '/ai',
    type: 'website',
    title: 'Restaurant AI Intelligence | eatOS',
    description:
      'Forecasting, menu insight, labor planning and guest personalization powered by AI across every eatOS product.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant AI Intelligence | eatOS',
    description:
      'Forecasting, menu insight, labor planning and guest personalization powered by AI across every eatOS product.',
  },
};

export default function AiLayout({ children }) {
  return children;
}
