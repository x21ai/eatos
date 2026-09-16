-- Invite tokens and expiry for invite-only admin signup.

ALTER TABLE admin_invites ADD COLUMN token TEXT;
ALTER TABLE admin_invites ADD COLUMN expires_at TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_invites_token ON admin_invites (token);
CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_invites_pending_email
  ON admin_invites (lower(email))
  WHERE accepted_at IS NULL;
