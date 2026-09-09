-- Content tables (SQLite / D1): blog, newsroom and the shop catalogue.
-- Column names match the contracts in src/lib/blog/types.ts and
-- src/lib/shop/types.ts. JSON-shaped columns are stored as TEXT holding JSON,
-- which is how D1 handles structured values.

CREATE TABLE IF NOT EXISTS posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  body TEXT,                -- JSON array of blocks
  cover_image TEXT,
  category TEXT,
  author_name TEXT,
  published_at TEXT,        -- ISO 8601
  status TEXT NOT NULL DEFAULT 'draft',
  seo_title TEXT,
  seo_description TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_posts_status_date ON posts (status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts (category);

CREATE TABLE IF NOT EXISTS news_posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  body TEXT,                -- JSON array of blocks
  cover_image TEXT,
  category TEXT,
  author_name TEXT,
  published_at TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  seo_title TEXT,
  seo_description TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_news_posts_status_date ON news_posts (status, published_at DESC);

CREATE TABLE IF NOT EXISTS collections (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description_html TEXT,
  image TEXT,
  position INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  vendor TEXT,
  product_type TEXT,
  tags TEXT,                -- JSON array of strings
  description_html TEXT,
  price_amount REAL,        -- NULL or 0 means quote on request, never free
  compare_at_amount REAL,
  currency TEXT DEFAULT 'USD',
  available INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'published',
  published_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_status ON products (status);

CREATE TABLE IF NOT EXISTS product_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_slug TEXT NOT NULL REFERENCES products (slug) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  width INTEGER,
  height INTEGER,
  position INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images (product_slug, position);

CREATE TABLE IF NOT EXISTS product_variants (
  id TEXT PRIMARY KEY,
  product_slug TEXT NOT NULL REFERENCES products (slug) ON DELETE CASCADE,
  title TEXT NOT NULL,
  sku TEXT,
  price_amount REAL,
  compare_at_amount REAL,
  currency TEXT DEFAULT 'USD',
  available INTEGER NOT NULL DEFAULT 1,
  requires_shipping INTEGER NOT NULL DEFAULT 1,
  options TEXT,             -- JSON array of strings
  image_url TEXT,
  position INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_product_variants_product ON product_variants (product_slug, position);

CREATE TABLE IF NOT EXISTS collection_products (
  collection_slug TEXT NOT NULL REFERENCES collections (slug) ON DELETE CASCADE,
  product_slug TEXT NOT NULL REFERENCES products (slug) ON DELETE CASCADE,
  position INTEGER DEFAULT 0,
  PRIMARY KEY (collection_slug, product_slug)
);

CREATE INDEX IF NOT EXISTS idx_collection_products_collection
  ON collection_products (collection_slug, position);

-- Newsletter signups and fraud reports, so the forms stop sending nowhere.
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'subscribed',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fraud_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  category TEXT,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
