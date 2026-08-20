// @ts-nocheck
import ProductDetailClient from './ProductDetailClient';
import { getAllProductSlugs } from '../products';

export function generateStaticParams() {
  // Pages with dedicated static routes are excluded here to avoid duplicate
  // builders emitting the same path.
  const dedicated = ['kitchen-display-system', 'workforce-management', 'reporting-analytics', 'apponlineorderingdelivery', 'automated-marketing', 'loyalty'];
  return getAllProductSlugs()
    .filter((slug) => !dedicated.includes(slug))
    .map((slug) => ({ slug }));
}


export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
