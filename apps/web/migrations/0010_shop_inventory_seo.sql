-- Product SEO and multi-location stock tracking for eatOS shop admin.

ALTER TABLE products ADD COLUMN seo_title TEXT;
ALTER TABLE products ADD COLUMN seo_description TEXT;

CREATE TABLE IF NOT EXISTS stock_locations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  label TEXT,
  is_default INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS variant_stock (
  variant_id TEXT NOT NULL REFERENCES product_variants (id) ON DELETE CASCADE,
  location_id TEXT NOT NULL REFERENCES stock_locations (id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (variant_id, location_id)
);

CREATE INDEX IF NOT EXISTS idx_variant_stock_location ON variant_stock (location_id);

INSERT OR IGNORE INTO stock_locations (id, name, label, is_default)
VALUES ('primary', 'Primary', 'Main stock', 1);
