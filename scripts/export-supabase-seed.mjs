// Exports the content that currently ships inside the site into SQL seed files
// so the team building the database in Cursor can load it into their own
// Supabase project. Read only: it never touches a database itself.
//
//   node scripts/export-supabase-seed.mjs
//
// Writes to ./seed/ :
//   001_posts.sql        blog articles
//   002_news_posts.sql   newsroom articles
//   003_shop.sql         collections, products, images, variants, links

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const webApp = path.join(root, 'apps/web/src/app');
const outDir = path.join(root, 'seed');
fs.mkdirSync(outDir, { recursive: true });

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const q = (v) => (v === null || v === undefined ? 'NULL' : `'${String(v).replace(/'/g, "''")}'`);
const jsonb = (v) => (v === null || v === undefined ? 'NULL' : `${q(JSON.stringify(v))}::jsonb`);
const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? String(v) : 'NULL');
const bool = (v) => (v ? 'true' : 'false');
const arr = (v) =>
  Array.isArray(v) && v.length
    ? `ARRAY[${v.map((x) => q(x)).join(',')}]::text[]`
    : `ARRAY[]::text[]`;

function articlesToSql(table, items) {
  const lines = [
    `-- ${items.length} rows for public.${table}`,
    `INSERT INTO public.${table} (slug, title, excerpt, body, cover_image, category, author_name, published_at, status) VALUES`,
  ];
  const values = items.map(
    (a) =>
      `  (${q(a.slug)}, ${q(a.title)}, ${q(a.excerpt)}, ${jsonb(a.body || [])}, ${q(a.image)}, ${q(
        a.category,
      )}, ${q(a.author)}, ${q(a.date)}, 'published')`,
  );
  lines.push(values.join(',\n'));
  lines.push('ON CONFLICT (slug) DO NOTHING;');
  return lines.join('\n') + '\n';
}

const blog = read(path.join(webApp, 'blog/posts.generated.json'));
fs.writeFileSync(path.join(outDir, '001_posts.sql'), articlesToSql('posts', blog));

const news = read(path.join(webApp, 'news/news.generated.json'));
fs.writeFileSync(path.join(outDir, '002_news_posts.sql'), articlesToSql('news_posts', news));

const catalog = read(path.join(webApp, 'shop/catalog.generated.json'));
const shop = [];

shop.push(
  `INSERT INTO public.collections (slug, title, description_html, image, position) VALUES\n` +
    catalog.collections
      .map(
        (c, i) =>
          `  (${q(c.slug)}, ${q(c.title)}, ${q(c.descriptionHtml)}, ${q(c.image)}, ${i})`,
      )
      .join(',\n') +
    '\nON CONFLICT (slug) DO NOTHING;\n',
);

shop.push(
  `INSERT INTO public.products (slug, title, vendor, product_type, tags, description_html, price_amount, compare_at_amount, currency, available, status, published_at, updated_at) VALUES\n` +
    catalog.products
      .map(
        (p) =>
          `  (${q(p.slug)}, ${q(p.title)}, ${q(p.vendor)}, ${q(p.productType)}, ${arr(p.tags)}, ${q(
            p.descriptionHtml,
          )}, ${num(p.priceFrom?.amount ?? null)}, ${num(p.compareAtPrice?.amount ?? null)}, ${q(
            p.priceFrom?.currency || 'USD',
          )}, ${bool(p.available)}, 'published', ${q(p.publishedAt)}, ${q(p.updatedAt)})`,
      )
      .join(',\n') +
    '\nON CONFLICT (slug) DO NOTHING;\n',
);

const images = catalog.products.flatMap((p) =>
  p.images.map(
    (img, i) =>
      `  (${q(p.slug)}, ${q(img.url)}, ${q(img.alt)}, ${num(img.width)}, ${num(img.height)}, ${i})`,
  ),
);
if (images.length) {
  shop.push(
    `INSERT INTO public.product_images (product_slug, url, alt, width, height, position) VALUES\n` +
      images.join(',\n') +
      '\nON CONFLICT DO NOTHING;\n',
  );
}

const variants = catalog.products.flatMap((p) =>
  p.variants.map(
    (v) =>
      `  (${q(v.id)}, ${q(p.slug)}, ${q(v.title)}, ${q(v.sku)}, ${num(
        v.price?.amount ?? null,
      )}, ${num(v.compareAtPrice?.amount ?? null)}, ${q(
        v.price?.currency || 'USD',
      )}, ${bool(v.available)}, ${bool(v.requiresShipping)}, ${arr(v.options)}, ${q(v.imageUrl)})`,
  ),
);
if (variants.length) {
  shop.push(
    `INSERT INTO public.product_variants (id, product_slug, title, sku, price_amount, compare_at_amount, currency, available, requires_shipping, options, image_url) VALUES\n` +
      variants.join(',\n') +
      '\nON CONFLICT (id) DO NOTHING;\n',
  );
}

const links = catalog.collections.flatMap((c) =>
  c.productSlugs.map((s, i) => `  (${q(c.slug)}, ${q(s)}, ${i})`),
);
if (links.length) {
  shop.push(
    `INSERT INTO public.collection_products (collection_slug, product_slug, position) VALUES\n` +
      links.join(',\n') +
      '\nON CONFLICT DO NOTHING;\n',
  );
}

fs.writeFileSync(path.join(outDir, '003_shop.sql'), shop.join('\n'));

console.log(
  `seed written: ${blog.length} blog posts, ${news.length} news posts, ${catalog.products.length} products, ${catalog.collections.length} collections`,
);
