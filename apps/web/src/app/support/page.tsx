// @ts-nocheck
import SupportHomeClient from './SupportHomeClient';
import { articles, categories } from './content';

export const metadata = {
  title: 'eatOS Help Center',
  description:
    'Guides, how-to articles and troubleshooting for the eatOS Point of Sale, Kitchen Display System, Dashboard, Kiosk, Customer Facing Display, payments and hardware.',
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
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SupportHomeClient />
    </>
  );
}
