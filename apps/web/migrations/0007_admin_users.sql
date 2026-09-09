-- Admin allow-list. Sign-in alone is not enough; the user must appear here.
CREATE TABLE IF NOT EXISTS admin_users (
  user_id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'owner', -- owner | editor
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users (email);
