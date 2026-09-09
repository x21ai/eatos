// @ts-nocheck
// Reads the shop catalogue from Cloudflare D1, falling back to the catalogue
// that ships with the site when D1 is unavailable or empty. Pages call these
// helpers, never the raw tables.

import { loadShopRows, parseJsonColumn } from '@/lib/d1/content';
import { money } from './types';
import {
  collections as importedCollections,
  products as importedProducts,
  getCollection as importedGetCollection,
  getCollectionProducts as importedCollectionProducts,
  getProduct as importedGetProduct,
  railCollections as importedRail,
} from '@/app/shop/catalog';

function rowToProduct(row, images = [], variants = []) {
  const tags = parseJsonColumn(row.tags, []);
  return {
    id: row.slug,
    slug: row.slug,
    title: row.title,
    vendor: row.vendor || null,
    productType: row.product_type || null,
    tags: Array.isArray(tags) ? tags : [],
    descriptionHtml: row.description_html || '',
    images: images
      .filter((i) => i.product_slug === row.slug)
      .sort((a, b) => (a.position || 0) - (b.position || 0))
      .map((i) => ({ url: i.url, alt: i.alt || row.title, width: i.width, height: i.height })),
    options: [],
    variants: variants
      .filter((v) => v.product_slug === row.slug)
      .map((v) => {
        const options = parseJsonColumn(v.options, []);
        return {
          id: v.id,
          title: v.title,
          sku: v.sku || null,
          price: money(v.price_amount, v.currency || row.currency),
          compareAtPrice: money(v.compare_at_amount, v.currency || row.currency),
          available: v.available !== 0 && v.available !== false,
          requiresShipping: v.requires_shipping !== 0 && v.requires_shipping !== false,
          options: Array.isArray(options) ? options : [],
          imageUrl: v.image_url || null,
        };
      }),
    priceFrom: money(row.price_amount, row.currency),
    compareAtPrice: money(row.compare_at_amount, row.currency),
    available: row.available !== 0 && row.available !== false,
    collectionSlugs: [],
    publishedAt: row.published_at || null,
    updatedAt: row.updated_at || null,
  };
}

async function loadCatalog() {
  try {
    const { products, images, variants, collections, links } = await loadShopRows();
    if (!products || products.length === 0) return null;

    const mapped = products.map((row) => rowToProduct(row, images || [], variants || []));
    const bySlug = new Map(mapped.map((p) => [p.slug, p]));

    const mappedCollections = (collections || []).map((c) => {
      const productSlugs = (links || [])
        .filter((l) => l.collection_slug === c.slug && bySlug.has(l.product_slug))
        .sort((a, b) => (a.position || 0) - (b.position || 0))
        .map((l) => l.product_slug);
      productSlugs.forEach((s) => bySlug.get(s).collectionSlugs.push(c.slug));
      return {
        slug: c.slug,
        title: c.title,
        descriptionHtml: c.description_html || '',
        image: c.image || null,
        productSlugs,
      };
    });

    return { products: mapped, collections: mappedCollections };
  } catch {
    return null;
  }
}

export async function getShopCatalog() {
  const live = await loadCatalog();
  if (live) return live;
  return { products: importedProducts, collections: importedCollections };
}

export async function listProducts() {
  return (await getShopCatalog()).products;
}

export async function listCollections() {
  const { collections } = await getShopCatalog();
  if (collections === importedCollections) return importedRail;
  return collections;
}

export async function getProductBySlug(slug) {
  const { products } = await getShopCatalog();
  return products.find((p) => p.slug === slug) || importedGetProduct(slug);
}

export async function getCollectionBySlug(slug) {
  const { collections } = await getShopCatalog();
  return collections.find((c) => c.slug === slug) || importedGetCollection(slug);
}

export async function getCollectionProducts(slug) {
  const { products, collections } = await getShopCatalog();
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return importedCollectionProducts(slug);
  return collection.productSlugs.map((s) => products.find((p) => p.slug === s)).filter(Boolean);
}
