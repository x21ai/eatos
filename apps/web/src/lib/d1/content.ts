/**
 * D1 helpers for marketing content tables.
 * Table names are whitelisted here so callers never interpolate arbitrary SQL.
 */
import sql from '@/app/api/utils/sql';

const ARTICLE_TABLES = {
  blog: 'posts',
  news: 'news_posts',
} as const;

export type ArticleKind = keyof typeof ARTICLE_TABLES;

export function parseJsonColumn<T>(value: unknown, fallback: T): T {
  if (value == null) return fallback;
  if (typeof value === 'object') return value as T;
  if (typeof value !== 'string' || value.length === 0) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export async function d1Available(): Promise<boolean> {
  try {
    await sql('SELECT 1 AS ok', []);
    return true;
  } catch {
    return false;
  }
}

export async function listPublishedArticleRows(kind: ArticleKind) {
  const table = ARTICLE_TABLES[kind];
  return sql(
    `SELECT slug, title, excerpt, body, cover_image, category, author_name, published_at, status
     FROM ${table}
     WHERE status = ?
     ORDER BY published_at DESC`,
    ['published'],
  );
}

export async function getPublishedArticleRow(kind: ArticleKind, slug: string) {
  const table = ARTICLE_TABLES[kind];
  const rows = await sql(
    `SELECT slug, title, excerpt, body, cover_image, category, author_name, published_at, status
     FROM ${table}
     WHERE slug = ? AND status = ?
     LIMIT 1`,
    [slug, 'published'],
  );
  return rows[0] || null;
}

export async function loadShopRows() {
  const [products, images, variants, collections, links] = await Promise.all([
    sql(
      `SELECT slug, title, vendor, product_type, tags, description_html, price_amount,
              compare_at_amount, currency, available, status, published_at, updated_at
       FROM products
       WHERE status = ?
       ORDER BY title ASC`,
      ['published'],
    ),
    sql(
      `SELECT product_slug, url, alt, width, height, position
       FROM product_images
       ORDER BY position ASC`,
      [],
    ),
    sql(
      `SELECT id, product_slug, title, sku, price_amount, compare_at_amount, currency,
              available, requires_shipping, options, image_url
       FROM product_variants`,
      [],
    ),
    sql(
      `SELECT slug, title, description_html, image, position
       FROM collections
       ORDER BY position ASC`,
      [],
    ),
    sql(
      `SELECT collection_slug, product_slug, position
       FROM collection_products
       ORDER BY position ASC`,
      [],
    ),
  ]);
  return { products, images, variants, collections, links };
}
