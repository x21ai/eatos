// @ts-nocheck
import ProductDetailClient from './ProductDetailClient';
import { getAllProductSlugs } from '../products';

export function generateStaticParams() {
  // The KDS page has its own dedicated static route, so exclude it here to
  // avoid two builders emitting the same path.
  return getAllProductSlugs()
    .filter((slug) => slug !== 'kitchen-display-system')
    .map((slug) => ({ slug }));
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
