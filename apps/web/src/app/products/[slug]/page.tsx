// @ts-nocheck
import ProductDetailClient from './ProductDetailClient';
import { getAllProductSlugs } from '../products';

export function generateStaticParams() {
  // Pages with dedicated static routes are excluded here to avoid duplicate
  // builders emitting the same path.
  const dedicated = ['kitchen-display-system', 'workforce-management', 'reporting-analytics', 'apponlineorderingdelivery', 'automated-marketing', 'loyalty', 'customer-facing-display', 'simplified-inventory-management', 'tableside-order-and-pay', 'autonomous-delivery', 'ai-enabled-ordering-automation'];
  return getAllProductSlugs()
    .filter((slug) => !dedicated.includes(slug))
    .map((slug) => ({ slug }));
}



export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
