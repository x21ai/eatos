-- Order source (web | kiosk), kiosk device pairing, Maya chat cache + call logs.

ALTER TABLE orders ADD COLUMN source TEXT NOT NULL DEFAULT 'web';

CREATE TABLE IF NOT EXISTS kiosk_devices (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  location TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_kiosk_devices_token ON kiosk_devices (token);

CREATE TABLE IF NOT EXISTS maya_chat_cache (
  question_hash TEXT PRIMARY KEY,
  answer_json TEXT NOT NULL,
  article_ids TEXT,
  model TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS maya_chat_logs (
  id TEXT PRIMARY KEY,
  trace_id TEXT NOT NULL,
  question_hash TEXT NOT NULL,
  model TEXT,
  input_tokens INTEGER,
  output_tokens INTEGER,
  latency_ms INTEGER,
  cost_usd REAL,
  article_ids TEXT,
  cache_hit INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_maya_chat_logs_trace ON maya_chat_logs (trace_id);
CREATE INDEX IF NOT EXISTS idx_orders_source ON orders (source);
