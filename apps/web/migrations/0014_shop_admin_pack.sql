-- Shop admin pack: discount codes, order discounts, configurable shipping settings.

CREATE TABLE IF NOT EXISTS discount_codes (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE COLLATE NOCASE,
  type TEXT NOT NULL, -- percentage | fixed
  amount INTEGER NOT NULL, -- percentage 1-100, or fixed minor units
  min_subtotal_minor INTEGER,
  expires_at TEXT,
  enabled INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_discount_codes_enabled ON discount_codes (enabled);

CREATE TABLE IF NOT EXISTS discount_redemptions (
  id TEXT PRIMARY KEY,
  discount_code_id TEXT NOT NULL REFERENCES discount_codes (id),
  order_id TEXT NOT NULL REFERENCES orders (id),
  email TEXT NOT NULL,
  amount_saved_minor INTEGER NOT NULL DEFAULT 0,
  redeemed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_discount_redemptions_code ON discount_redemptions (discount_code_id);
CREATE INDEX IF NOT EXISTS idx_discount_redemptions_order ON discount_redemptions (order_id);

ALTER TABLE orders ADD COLUMN discount_code TEXT;
ALTER TABLE orders ADD COLUMN discount_amount INTEGER NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS shop_settings (
  key TEXT PRIMARY KEY,
  value_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
