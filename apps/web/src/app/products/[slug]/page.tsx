// @ts-nocheck
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import { getAllProductSlugs, getProductBySlug } from '../products';
import { marketingMetadata } from '@/lib/seo';

export function generateStaticParams() {
  // Pages with dedicated static routes are excluded here to avoid duplicate
  // builders emitting the same path.
  const dedicated = ['kitchen-display-system', 'workforce-management', 'reporting-analytics', 'apponlineorderingdelivery', 'automated-marketing', 'loyalty', 'guest-facing-display', 'simplified-inventory-management', 'tableside-order-and-pay', 'autonomous-delivery', 'ai-enabled-ordering-automation'];
  return getAllProductSlugs()
    .filter((slug) => !dedicated.includes(slug))
    .map((slug) => ({ slug }));
}



export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return marketingMetadata({
    title: `eatOS ${product.title}`,
    description: product.description,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  if (!getProductBySlug(slug)) notFound();
  return <ProductDetailClient slug={slug} />;
}
