// @ts-nocheck
import ProductDetailClient from './ProductDetailClient';
import { catalog, getProduct } from '../catalog';

export function generateStaticParams() {
  return catalog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} | eatOS Shop`,
    description: product.description,
    openGraph: { type: 'website', title: `${product.name} | eatOS Shop`, description: product.description },
    twitter: { card: 'summary_large_image', title: `${product.name} | eatOS Shop`, description: product.description },
  };
}

export default async function ShopProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return (
      <div className="bg-black min-h-screen text-white font-sans flex items-center justify-center">
        <div className="text-center pt-20">
          <h1 className="text-3xl font-bold mb-4">Product not found</h1>
          <a href="/shop" className="text-blue-400 hover:underline">Back to Shop</a>
        </div>
      </div>
    );
  }
  return <ProductDetailClient product={product} />;
}
