// @ts-nocheck
import ProductClient from './ProductClient';
import { products } from '../../catalog';
import { getProductBySlug, listProducts } from '@/lib/shop/data';

export const dynamicParams = true;

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

function plainText(html, limit = 155) {
  const text = String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return '';
  return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}...` : text;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product not found | eatOS Shop' };
  const canonical = `/shop/products/${product.slug}`;
  const description =
    plainText(product.descriptionHtml) ||
    `${product.title} from eatOS. Restaurant hardware built for the floor, with setup and support included.`;
  const image = product.images[0]?.url;
  return {
    title: `${product.title} | eatOS Shop`,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      title: `${product.title} | eatOS Shop`,
      description,
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | eatOS Shop`,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function ShopProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const all = await listProducts();
  const related = product
    ? all
        .filter(
          (p) =>
            p.slug !== product.slug &&
            p.collectionSlugs.some((c) => product.collectionSlugs.includes(c)),
        )
        .slice(0, 3)
    : [];
  const jsonLd = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: plainText(product.descriptionHtml, 300) || product.title,
        image: product.images.map((i) => i.url),
        sku: product.variants[0]?.sku || undefined,
        brand: { '@type': 'Brand', name: product.vendor || 'eatOS' },
        url: `https://www.eatos.com/shop/products/${product.slug}`,
        ...(product.priceFrom
          ? {
              offers: {
                '@type': 'Offer',
                price: product.priceFrom.amount,
                priceCurrency: product.priceFrom.currency,
                availability: product.available
                  ? 'https://schema.org/InStock'
                  : 'https://schema.org/PreOrder',
                url: `https://www.eatos.com/shop/products/${product.slug}`,
              },
            }
          : {}),
      }
    : null;
  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      <ProductClient slug={slug} product={product} related={related} />
    </>
  );
}
