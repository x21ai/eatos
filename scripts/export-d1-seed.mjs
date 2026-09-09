// Exports the content that ships inside the site into Cloudflare D1 seed files.
//
//   node scripts/export-d1-seed.mjs
//
// Writes ./seed/d1/ :
//   001_posts.<n>.sql        blog articles, chunked
//   002_news_posts.<n>.sql   newsroom articles, chunked
//   003_shop.<n>.sql         collections, products, images, variants, links
//
// SQLite/D1 notes: JSON columns are TEXT holding JSON, booleans are 0/1, and
// every statement uses INSERT OR IGNORE so re-running is safe.
//
// Load them with:
//   cd apps/web && for f in ../../seed/d1/*.sql; do \
//     yarn wrangler d1 execute eatos-web-db --remote --file "$f"; done

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const webApp = path.join(root, 'apps/web/src/app');
const outDir = path.join(root, 'seed/d1');
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const q = (v) =>
  v === null || v === undefined ? 'NULL' : `'${String(v).replace(/'/g, "''")}'`;
const json = (v) => (v === null || v === undefined ? 'NULL' : q(JSON.stringify(v)));
const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? String(v) : 'NULL');
const bool = (v) => (v ? '1' : '0');

// D1 rejects a single statement over roughly 100KB, so article bodies get
// small batches while the short shop rows can go in large ones.
const CHUNK = 150;

function writeChunks(name, columns, table, values, chunkSize = CHUNK) {
  const chunks = [];
  for (let i = 0; i < values.length; i += chunkSize) chunks.push(values.slice(i, i + chunkSize));
  chunks.forEach((chunk, i) => {
    const file = path.join(outDir, `${name}.${String(i + 1).padStart(3, '0')}.sql`);
    const sql =
      `-- ${chunk.length} rows for ${table}\n` +
      `INSERT OR IGNORE INTO ${table} (${columns}) VALUES\n` +
      chunk.join(',\n') +
      ';\n';
    fs.writeFileSync(file, sql);
  });
  return chunks.length;
}

function articleValues(items) {
  return items.map(
    (a) =>
      `  (${q(a.slug)}, ${q(a.title)}, ${q(a.excerpt)}, ${json(a.body || [])}, ${q(
        a.image
      )}, ${q(a.category)}, ${q(a.author)}, ${q(a.date)}, 'published')`
  );
}

const ARTICLE_COLUMNS =
  'slug, title, excerpt, body, cover_image, category, author_name, published_at, status';

const blog = read(path.join(webApp, 'blog/posts.generated.json'));
writeChunks('001_posts', ARTICLE_COLUMNS, 'posts', articleValues(blog), 8);

const news = read(path.join(webApp, 'news/news.generated.json'));
writeChunks('002_news_posts', ARTICLE_COLUMNS, 'news_posts', articleValues(news), 8);

const catalog = read(path.join(webApp, 'shop/catalog.generated.json'));

writeChunks(
  '003_shop_collections',
  'slug, title, description_html, image, position',
  'collections',
  catalog.collections.map(
    (c, i) => `  (${q(c.slug)}, ${q(c.title)}, ${q(c.descriptionHtml)}, ${q(c.image)}, ${i})`
  )
);

writeChunks(
  '004_shop_products',
  'slug, title, vendor, product_type, tags, description_html, price_amount, compare_at_amount, currency, available, status, published_at, updated_at',
  'products',
  catalog.products.map(
    (p) =>
      `  (${q(p.slug)}, ${q(p.title)}, ${q(p.vendor)}, ${q(p.productType)}, ${json(
        p.tags || []
      )}, ${q(p.descriptionHtml)}, ${num(p.priceFrom?.amount ?? null)}, ${num(
        p.compareAtPrice?.amount ?? null
      )}, ${q(p.priceFrom?.currency || 'USD')}, ${bool(p.available)}, 'published', ${q(
        p.publishedAt
      )}, ${q(p.updatedAt)})`
  )
);

const images = catalog.products.flatMap((p) =>
  (p.images || []).map(
    (img, i) =>
      `  (${q(p.slug)}, ${q(img.url)}, ${q(img.alt)}, ${num(img.width)}, ${num(
        img.height
      )}, ${i})`
  )
);
if (images.length) {
  writeChunks(
    '005_shop_images',
    'product_slug, url, alt, width, height, position',
    'product_images',
    images
  );
}

const variants = catalog.products.flatMap((p) =>
  (p.variants || []).map(
    (v, i) =>
      `  (${q(v.id)}, ${q(p.slug)}, ${q(v.title)}, ${q(v.sku)}, ${num(
        v.price?.amount ?? null
      )}, ${num(v.compareAtPrice?.amount ?? null)}, ${q(
        v.price?.currency || 'USD'
      )}, ${bool(v.available)}, ${bool(v.requiresShipping)}, ${json(v.options || [])}, ${q(
        v.imageUrl
      )}, ${i})`
  )
);
if (variants.length) {
  writeChunks(
    '006_shop_variants',
    'id, product_slug, title, sku, price_amount, compare_at_amount, currency, available, requires_shipping, options, image_url, position',
    'product_variants',
    variants
  );
}

const links = catalog.collections.flatMap((c) =>
  (c.productSlugs || []).map((s, i) => `  (${q(c.slug)}, ${q(s)}, ${i})`)
);
if (links.length) {
  writeChunks(
    '007_shop_collection_products',
    'collection_slug, product_slug, position',
    'collection_products',
    links
  );
}

console.log(
  `D1 seed written to seed/d1: ${blog.length} blog posts, ${news.length} news posts, ${catalog.products.length} products, ${catalog.collections.length} collections, ${images.length} images, ${variants.length} variants, ${links.length} links`
);
