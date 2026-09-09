// The only place content table names appear. Everything else in the app goes
// through lib/blog/data.ts and lib/shop/data.ts, which call these.

import { queryAll, queryOne, parseJson } from './client';

const ARTICLE_COLUMNS =
  'slug, title, excerpt, body, cover_image, category, author_name, published_at, status';

export type ArticleKind = 'blog' | 'news';

const ARTICLE_TABLES: Record<ArticleKind, string> = {
  blog: 'posts',
  news: 'news_posts',
};

export async function selectArticles(kind: ArticleKind) {
  const table = ARTICLE_TABLES[kind];
  return queryAll<Record<string, unknown>>(
    `SELECT ${ARTICLE_COLUMNS} FROM ${table} WHERE status = 'published' ORDER BY published_at DESC`
  );
}

export async function selectArticle(kind: ArticleKind, slug: string) {
  const table = ARTICLE_TABLES[kind];
  return queryOne<Record<string, unknown>>(
    `SELECT ${ARTICLE_COLUMNS} FROM ${table} WHERE slug = ? AND status = 'published' LIMIT 1`,
    [slug]
  );
}

export async function selectCatalog() {
  const [products, images, variants, collections, links] = await Promise.all([
    queryAll<any>(
      `SELECT slug, title, vendor, product_type, tags, description_html, price_amount,
              compare_at_amount, currency, available, status, published_at, updated_at
         FROM products WHERE status = 'published' ORDER BY title ASC`
    ),
    queryAll<any>(
      `SELECT product_slug, url, alt, width, height, position FROM product_images ORDER BY position ASC`
    ),
    queryAll<any>(
      `SELECT id, product_slug, title, sku, price_amount, compare_at_amount, currency,
              available, requires_shipping, options, image_url
         FROM product_variants ORDER BY position ASC`
    ),
    queryAll<any>(
      `SELECT slug, title, description_html, image, position FROM collections ORDER BY position ASC`
    ),
    queryAll<any>(
      `SELECT collection_slug, product_slug, position FROM collection_products ORDER BY position ASC`
    ),
  ]);

  if (!products || products.length === 0) return null;

  return {
    products: products.map((p) => ({ ...p, tags: parseJson<string[]>(p.tags, []) })),
    images: images ?? [],
    variants: (variants ?? []).map((v) => ({
      ...v,
      options: parseJson<string[]>(v.options, []),
    })),
    collections: collections ?? [],
    links: links ?? [],
  };
}
