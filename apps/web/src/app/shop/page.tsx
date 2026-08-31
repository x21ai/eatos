// @ts-nocheck
import ShopHomeClient from './ShopHomeClient';
import { products, railCollections } from './catalog';

export const metadata = {
  title: 'Shop Restaurant Hardware',
  description:
    'Buy eatOS Point of Sale terminals, handhelds, kitchen displays, self service kiosks, guest facing displays and accessories, or build a custom bundle.',
  alternates: { canonical: '/shop' },
  openGraph: {
    type: 'website',
    url: '/shop',
    title: 'Shop Restaurant Hardware | eatOS',
    description:
      'Point of Sale terminals, handhelds, kitchen displays, kiosks, guest facing displays and accessories for restaurants.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop Restaurant Hardware | eatOS',
    description:
      'Point of Sale terminals, handhelds, kitchen displays, kiosks, guest facing displays and accessories for restaurants.',
  },
};

export default function ShopPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'eatOS Shop',
    url: 'https://www.eatos.com/shop',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: railCollections.map((collection, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: collection.title,
        url: `https://www.eatos.com/shop/collections/${collection.slug}`,
      })),
    },
    numberOfItems: products.length,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ShopHomeClient />
    </>
  );
}
