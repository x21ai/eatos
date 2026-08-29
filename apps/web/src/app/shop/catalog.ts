// @ts-nocheck
// Accessors over the generated shop catalog. Nothing in the UI hardcodes
// product, price or collection data: it all resolves through here.

import catalogJson from './catalog.generated.json';

export const catalog = catalogJson;
export const collections = catalogJson.collections;
export const products = catalogJson.products;
export const contentPages = catalogJson.pages;

const productBySlug = new Map(products.map((p) => [p.slug, p]));
const collectionBySlug = new Map(collections.map((c) => [c.slug, c]));
const pageBySlug = new Map(contentPages.map((p) => [p.slug, p]));

function decode(slug) {
  if (!slug) return '';
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export function getProduct(slug) {
  return productBySlug.get(slug) || productBySlug.get(decode(slug)) || null;
}

export function getCollection(slug) {
  return collectionBySlug.get(slug) || collectionBySlug.get(decode(slug)) || null;
}

export function getContentPage(slug) {
  return pageBySlug.get(slug) || pageBySlug.get(decode(slug)) || null;
}

export function getCollectionProducts(slug) {
  const collection = getCollection(slug);
  if (!collection) return [];
  return collection.productSlugs.map((s) => productBySlug.get(s)).filter(Boolean);
}

export function getRelatedProducts(slug, count = 4) {
  const current = getProduct(slug);
  if (!current) return [];
  const sameCollection = products.filter(
    (p) => p.slug !== current.slug && p.collectionSlugs.some((c) => current.collectionSlugs.includes(c)),
  );
  const rest = products.filter(
    (p) => p.slug !== current.slug && !sameCollection.some((s) => s.slug === p.slug),
  );
  return [...sameCollection, ...rest].slice(0, count);
}

export function formatMoney(money) {
  if (!money || typeof money.amount !== 'number') return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currency || 'USD',
    minimumFractionDigits: Number.isInteger(money.amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(money.amount);
}

export function productHref(slug) {
  return `/shop/products/${slug}`;
}

export function collectionHref(slug) {
  return `/shop/collections/${slug}`;
}

export function contentPageHref(slug) {
  return `/shop/${slug}`;
}

// Collections in the order the storefront rail shows them, bundles first.
const railOrder = [
  'bundles',
  'point-of-sale',
  'point-of-purchase',
  'kitchen-display-systems',
  'self-service-kiosk',
  'customer-facing-display',
  'applications',
  'other-accessories',
];

export const railCollections = [...collections].sort(
  (a, b) =>
    (railOrder.indexOf(a.slug) === -1 ? 99 : railOrder.indexOf(a.slug)) -
    (railOrder.indexOf(b.slug) === -1 ? 99 : railOrder.indexOf(b.slug)),
);

const featuredCandidates = railCollections
  .filter((c) => c.slug !== 'bundles')
  .map((c) => getCollectionProducts(c.slug)[0])
  .filter(Boolean);

// A product can belong to several collections, so dedupe before rendering.
export const featuredProducts = featuredCandidates
  .filter((p, i) => featuredCandidates.findIndex((o) => o.slug === p.slug) === i)
  .slice(0, 6);

export const bundleProducts = getCollectionProducts('bundles');

export const shopContentPages = contentPages.filter((p) => p.hasBody);

export const processingRate = '2.99% +10c Processing Fees';
