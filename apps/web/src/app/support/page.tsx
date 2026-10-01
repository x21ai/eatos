// @ts-nocheck
import SupportHomeClient from './SupportHomeClient';
import { marketingMetadata } from '@/lib/seo';
import { articles, categories } from './content';

const pageTitle = 'eatOS Help Center';
const pageDescription = 'Guides and troubleshooting for the eatOS point of sale, kitchen display, kiosk, payments, and hardware.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/support',
});
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
