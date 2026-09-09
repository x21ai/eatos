-- Cart, checkout, orders, payment events, and live service status.
-- Money columns store minor units (cents for USD). Catalog price_amount remains
-- major units; cart APIs convert on write.

CREATE TABLE IF NOT EXISTS carts (
  id TEXT PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,
  user_id TEXT,
  email TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_carts_token ON carts (token);
CREATE INDEX IF NOT EXISTS idx_carts_user ON carts (user_id);

CREATE TABLE IF NOT EXISTS cart_items (
  id TEXT PRIMARY KEY,
  cart_id TEXT NOT NULL REFERENCES carts (id) ON DELETE CASCADE,
  variant_id TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  title TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_amount INTEGER NOT NULL, -- minor units
  currency TEXT NOT NULL DEFAULT 'USD',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (cart_id, variant_id)
);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart ON cart_items (cart_id);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  cart_id TEXT,
  user_id TEXT,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending|paid|fulfilled|cancelled|refunded
  currency TEXT NOT NULL DEFAULT 'USD',
  subtotal_amount INTEGER NOT NULL DEFAULT 0,
  shipping_amount INTEGER NOT NULL DEFAULT 0,
  tax_amount INTEGER NOT NULL DEFAULT 0,
  total_amount INTEGER NOT NULL DEFAULT 0,
  shipping_name TEXT,
  shipping_line1 TEXT,
  shipping_line2 TEXT,
  shipping_city TEXT,
  shipping_region TEXT,
  shipping_postal TEXT,
  shipping_country TEXT,
  provider TEXT, -- stripe
  provider_session_id TEXT,
  provider_payment_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  paid_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_orders_email ON orders (email);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders (order_number);
CREATE INDEX IF NOT EXISTS idx_orders_provider_session ON orders (provider_session_id);

CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  variant_id TEXT,
  product_slug TEXT NOT NULL,
  title TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD'
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items (order_id);

CREATE TABLE IF NOT EXISTS payment_events (
  id TEXT PRIMARY KEY, -- provider event id (idempotency key)
  provider TEXT NOT NULL,
  order_id TEXT,
  type TEXT NOT NULL,
  payload TEXT,
  processed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS service_status (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  group_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'operational', -- operational|degraded|outage|maintenance
  description TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  position INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_service_status_group ON service_status (group_name, position);
