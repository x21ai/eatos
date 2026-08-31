// @ts-nocheck
import SupportHomeClient from './SupportHomeClient';
import { articles, categories } from './content';

export const metadata = {
  title: 'eatOS Help Center',
  description:
    'Guides, how-to articles and troubleshooting for the eatOS Point of Sale, Kitchen Display System, Dashboard, Kiosk, Guest Facing Display, payments and hardware.',
  alternates: { canonical: '/support' },
  openGraph: {
    type: 'website',
    url: '/support',
    title: 'eatOS Help Center',
    description:
      'Setup guides, how-to articles and troubleshooting for every eatOS product, from Point of Sale to Kitchen Display System and hardware.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eatOS Help Center',
    description:
      'Setup guides, how-to articles and troubleshooting for every eatOS product, from Point of Sale to Kitchen Display System and hardware.',
  },
};

export default function SupportPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'eatOS Help Center',
        description: metadata.description,
        url: 'https://www.eatos.com/support',
        hasPart: categories.map((c) => ({
          '@type': 'CollectionPage',
          name: c.title,
          url: `https://www.eatos.com/support/category/${c.slug}`,
        })),
        numberOfItems: articles.length,
      },
      {
        '@type': 'Organization',
        name: 'eatOS',
        url: 'https://www.eatos.com',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            telephone: '+1-844-563-2867',
            email: 'support@eatos.com',
            availableLanguage: ['English'],
            hoursAvailable: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
              opens: '00:00',
              closes: '23:59',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SupportHomeClient />
    </>
  );
}
