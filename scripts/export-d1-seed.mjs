#!/usr/bin/env node
// Exports bundled site content into SQLite-compatible SQL for Cloudflare D1.
//
//   node scripts/export-d1-seed.mjs
//
// Writes seed/d1/*.sql chunk files (small enough for `wrangler d1 execute --file`).

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const webApp = path.join(root, 'apps/web/src/app');
const outDir = path.join(root, 'seed/d1');
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const q = (v) => (v === null || v === undefined ? 'NULL' : `'${String(v).replace(/'/g, "''")}'`);
const jsonText = (v) => q(JSON.stringify(v ?? null));
const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? String(v) : 'NULL');
const boolInt = (v) => (v ? '1' : '0');

const CHUNK = 40;

function writeChunks(prefix, statements) {
  let part = 0;
  for (let i = 0; i < statements.length; i += CHUNK) {
    part += 1;
    const slice = statements.slice(i, i + CHUNK);
    const name = `${prefix}_${String(part).padStart(3, '0')}.sql`;
    fs.writeFileSync(path.join(outDir, name), slice.join('\n') + '\n');
  }
  return part;
}

function articleInserts(table, items) {
  return items.map(
    (a) =>
      `INSERT OR IGNORE INTO ${table} (slug, title, excerpt, body, cover_image, category, author_name, published_at, status) VALUES (` +
      `${q(a.slug)}, ${q(a.title)}, ${q(a.excerpt)}, ${jsonText(a.body || [])}, ${q(a.image)}, ${q(
        a.category,
      )}, ${q(a.author)}, ${q(a.date)}, 'published');`,
  );
}

const blog = read(path.join(webApp, 'blog/posts.generated.json'));
const news = read(path.join(webApp, 'news/news.generated.json'));
const catalog = read(path.join(webApp, 'shop/catalog.generated.json'));

const blogParts = writeChunks('01_posts', articleInserts('posts', blog));
const newsParts = writeChunks('02_news_posts', articleInserts('news_posts', news));

const shop = [];

for (const [i, c] of catalog.collections.entries()) {
  shop.push(
    `INSERT OR IGNORE INTO collections (slug, title, description_html, image, position) VALUES (` +
      `${q(c.slug)}, ${q(c.title)}, ${q(c.descriptionHtml)}, ${q(c.image)}, ${i});`,
  );
}

for (const p of catalog.products) {
  shop.push(
    `INSERT OR IGNORE INTO products (slug, title, vendor, product_type, tags, description_html, price_amount, compare_at_amount, currency, available, status, published_at, updated_at) VALUES (` +
      `${q(p.slug)}, ${q(p.title)}, ${q(p.vendor)}, ${q(p.productType)}, ${jsonText(p.tags || [])}, ${q(
        p.descriptionHtml,
      )}, ${num(p.priceFrom?.amount ?? null)}, ${num(p.compareAtPrice?.amount ?? null)}, ${q(
        p.priceFrom?.currency || 'USD',
      )}, ${boolInt(p.available)}, 'published', ${q(p.publishedAt)}, ${q(p.updatedAt)});`,
  );
  p.images.forEach((img, i) => {
    shop.push(
      `INSERT INTO product_images (product_slug, url, alt, width, height, position) VALUES (` +
        `${q(p.slug)}, ${q(img.url)}, ${q(img.alt)}, ${num(img.width)}, ${num(img.height)}, ${i});`,
    );
  });
  p.variants.forEach((v) => {
    shop.push(
      `INSERT OR IGNORE INTO product_variants (id, product_slug, title, sku, price_amount, compare_at_amount, currency, available, requires_shipping, options, image_url) VALUES (` +
        `${q(v.id)}, ${q(p.slug)}, ${q(v.title)}, ${q(v.sku)}, ${num(v.price?.amount ?? null)}, ${num(
          v.compareAtPrice?.amount ?? null,
        )}, ${q(v.price?.currency || 'USD')}, ${boolInt(v.available)}, ${boolInt(
          v.requiresShipping,
        )}, ${jsonText(v.options || [])}, ${q(v.imageUrl)});`,
    );
  });
}

for (const c of catalog.collections) {
  c.productSlugs.forEach((slug, i) => {
    shop.push(
      `INSERT OR IGNORE INTO collection_products (collection_slug, product_slug, position) VALUES (` +
        `${q(c.slug)}, ${q(slug)}, ${i});`,
    );
  });
}

const shopParts = writeChunks('03_shop', shop);

const manifest = {
  blog: blog.length,
  news: news.length,
  products: catalog.products.length,
  collections: catalog.collections.length,
  files: fs.readdirSync(outDir).sort(),
  parts: { blog: blogParts, news: newsParts, shop: shopParts },
};
fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

console.log(
  `D1 seed written under seed/d1/: ${blog.length} posts, ${news.length} news, ${catalog.products.length} products, ${catalog.collections.length} collections (${manifest.files.length} files)`,
);
