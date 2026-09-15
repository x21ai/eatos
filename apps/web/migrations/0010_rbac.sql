-- RBAC: expanded roles, publish approval queue, admin invites.

-- Multiple roles per admin (JSON array). Legacy `role` column kept for backward compat.
ALTER TABLE admin_users ADD COLUMN roles TEXT NOT NULL DEFAULT '["draft_editor"]';

-- Migrate legacy owner/editor rows.
UPDATE admin_users
SET roles = '["superadmin"]', role = 'superadmin'
WHERE lower(email) = 'pmt@eatos.com';

UPDATE admin_users
SET roles = '["admin"]', role = 'admin'
WHERE role = 'owner' AND lower(email) != 'pmt@eatos.com';

UPDATE admin_users
SET roles = '["draft_editor"]', role = 'draft_editor'
WHERE role = 'editor';

UPDATE admin_users
SET roles = '["admin"]', role = 'admin'
WHERE role = 'owner' AND roles = '["draft_editor"]' AND lower(email) != 'pmt@eatos.com';

-- Pending live publish requests (non-publishers submit; superadmin approves).
CREATE TABLE IF NOT EXISTS publish_requests (
  id TEXT PRIMARY KEY,
  content_type TEXT NOT NULL,
  content_slug TEXT NOT NULL,
  requested_by TEXT NOT NULL,
  requested_by_email TEXT NOT NULL,
  requested_at TEXT NOT NULL DEFAULT (datetime('now')),
  status TEXT NOT NULL DEFAULT 'pending',
  reviewed_by TEXT,
  reviewed_by_email TEXT,
  reviewed_at TEXT,
  notes TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_publish_requests_pending_unique
  ON publish_requests (content_type, content_slug)
  WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_publish_requests_status ON publish_requests (status);
CREATE INDEX IF NOT EXISTS idx_publish_requests_content ON publish_requests (content_type, content_slug);

-- Invites for admin onboarding (user must already be allowlisted to sign up).
CREATE TABLE IF NOT EXISTS admin_invites (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  roles TEXT NOT NULL,
  invited_by TEXT NOT NULL,
  invited_by_email TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  accepted_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_admin_invites_email ON admin_invites (lower(email));
