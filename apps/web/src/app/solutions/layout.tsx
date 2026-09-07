// @ts-nocheck
export const metadata = {
  alternates: { canonical: '/solutions' },
  title: {
    default: 'Restaurant Solutions by Service Style',
    template: '%s | eatOS',
  },
  description:
    'Point of Sale and restaurant management built for quick service, full service, fast casual, cafes, bars, food trucks, catering and enterprise groups.',
  openGraph: {
    url: '/solutions',
    type: 'website',
    title: 'Restaurant Solutions by Service Style | eatOS',
    description:
      'Built for quick service, full service, fast casual, cafes, bars, food trucks, catering and enterprise groups.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Solutions by Service Style | eatOS',
    description:
      'Built for quick service, full service, fast casual, cafes, bars, food trucks, catering and enterprise groups.',
  },
};

export default function SolutionsLayout({ children }) {
  return children;
}
