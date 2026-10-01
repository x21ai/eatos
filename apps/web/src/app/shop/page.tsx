// @ts-nocheck
import ShopHomeClient from './ShopHomeClient';
import { marketingMetadata } from '@/lib/seo';
import { products as importedProducts, railCollections as importedRail } from './catalog';
import { getShopCatalog, listCollections, getCollectionProducts } from '@/lib/shop/data';

const pageTitle = 'eatOS Shop | Restaurant Point of Sale Hardware';
const pageDescription = 'Shop eatOS point of sale terminals, handhelds, kitchen displays, kiosks, and guest-facing displays.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/shop',
});
export default async function ShopPage() {
  const { products } = await getShopCatalog();
  const railCollections = await listCollections();
  const bundles = await getCollectionProducts('bundles');
  const featuredCandidates = railCollections
    .filter((c) => c.slug !== 'bundles')
    .map((c) => products.find((p) => p.slug === c.productSlugs[0]))
    .filter(Boolean);
  const featured = featuredCandidates
    .filter((p, i) => featuredCandidates.findIndex((o) => o.slug === p.slug) === i)
    .slice(0, 6);
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
      <ShopHomeClient products={products} collections={railCollections} featured={featured} bundles={bundles} />
    </>
  );
}
