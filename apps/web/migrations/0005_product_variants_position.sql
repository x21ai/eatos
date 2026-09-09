-- Align product_variants with Lovable 0003_content.sql when the table was
-- first created by 0003_content_catalog.sql (no position column).
-- Safe on fresh DBs that already have the column: SQLite rejects duplicate
-- ADD COLUMN; wrap is not available, so only apply once via migrations.

ALTER TABLE product_variants ADD COLUMN position INTEGER DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_product_variants_product_position
  ON product_variants (product_slug, position);
