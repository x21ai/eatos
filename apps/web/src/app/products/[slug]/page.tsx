// @ts-nocheck
import ProductDetailClient from './ProductDetailClient';
import { getAllProductSlugs } from '../products';

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
