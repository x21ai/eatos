// @ts-nocheck
import CollectionClient from './CollectionClient';
import { collections } from '../../catalog';
import { getCollectionBySlug, getCollectionProducts } from '@/lib/shop/data';

export const dynamicParams = true;

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return { title: 'Collection not found | eatOS Shop' };
  const canonical = `/shop/collections/${collection.slug}`;
  const description = `Shop ${collection.title} from eatOS. Restaurant hardware built for the floor, with support and setup included.`;
  return {
    title: `${collection.title} | eatOS Shop`,
    description,
    alternates: { canonical },
    openGraph: { type: 'website', url: canonical, title: `${collection.title} | eatOS Shop`, description },
    twitter: { card: 'summary_large_image', title: `${collection.title} | eatOS Shop`, description },
  };
}

export default async function ShopCollectionPage({ params }) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  const items = await getCollectionProducts(slug);
  const jsonLd = collection
    ? {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: collection.title,
        url: `https://www.eatos.com/shop/collections/${collection.slug}`,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: items.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: p.title,
            url: `https://www.eatos.com/shop/products/${p.slug}`,
          })),
        },
      }
    : null;
  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      <CollectionClient slug={slug} collection={collection} items={items} />
    </>
  );
}
