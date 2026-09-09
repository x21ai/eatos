-- Content catalog for blog, newsroom, and shop (SQLite / D1).
-- Replaces the Supabase-oriented schema in docs/supabase-content-schema.md.
-- Column names stay the same so readers can switch without page changes.
-- JSON fields (body, tags, options) are stored as TEXT and parsed in app code.

CREATE TABLE IF NOT EXISTS posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  body TEXT,
  cover_image TEXT,
  category TEXT,
  author_name TEXT,
  published_at TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
);

CREATE INDEX IF NOT EXISTS idx_posts_status_published_at
  ON posts (status, published_at);

CREATE TABLE IF NOT EXISTS news_posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  body TEXT,
  cover_image TEXT,
  category TEXT,
  author_name TEXT,
  published_at TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
);

CREATE INDEX IF NOT EXISTS idx_news_posts_status_published_at
  ON news_posts (status, published_at);

CREATE TABLE IF NOT EXISTS collections (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description_html TEXT,
  image TEXT,
  position INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  vendor TEXT,
  product_type TEXT,
  tags TEXT,
  description_html TEXT,
  price_amount REAL,
  compare_at_amount REAL,
  currency TEXT,
  available INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TEXT,
  updated_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_products_status ON products (status);

CREATE TABLE IF NOT EXISTS product_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_slug TEXT NOT NULL,
  url TEXT NOT NULL,
  alt TEXT,
  width INTEGER,
  height INTEGER,
  position INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (product_slug) REFERENCES products (slug)
);

CREATE INDEX IF NOT EXISTS idx_product_images_product
  ON product_images (product_slug, position);

CREATE TABLE IF NOT EXISTS product_variants (
  id TEXT PRIMARY KEY,
  product_slug TEXT NOT NULL,
  title TEXT,
  sku TEXT,
  price_amount REAL,
  compare_at_amount REAL,
  currency TEXT,
  available INTEGER NOT NULL DEFAULT 1,
  requires_shipping INTEGER NOT NULL DEFAULT 1,
  options TEXT,
  image_url TEXT,
  FOREIGN KEY (product_slug) REFERENCES products (slug)
);

CREATE INDEX IF NOT EXISTS idx_product_variants_product
  ON product_variants (product_slug);

CREATE TABLE IF NOT EXISTS collection_products (
  collection_slug TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (collection_slug, product_slug),
  FOREIGN KEY (collection_slug) REFERENCES collections (slug),
  FOREIGN KEY (product_slug) REFERENCES products (slug)
);
