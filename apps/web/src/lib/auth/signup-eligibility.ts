import { queryOne } from '@/lib/db/client';
import {
  isBootstrapSignupEmail,
  normalizeEmail,
  SIGNUP_REJECTED_MESSAGE,
} from '@/lib/auth/allowlist';

export { SIGNUP_REJECTED_MESSAGE };

/**
 * Returns true when the email may create a Better Auth account.
 * Eligible if bootstrap allowlisted, already in admin_users, or has a valid pending invite.
 */
export async function isSignupEligible(email: string): Promise<boolean> {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;

  if (isBootstrapSignupEmail(normalized)) return true;

  const adminRow = await queryOne<{ email: string }>(
    `SELECT email FROM admin_users WHERE lower(email) = ? LIMIT 1`,
    [normalized],
  );
  if (adminRow) return true;

  const invite = await queryOne<{ id: string }>(
    `SELECT id FROM admin_invites
      WHERE lower(email) = ?
        AND accepted_at IS NULL
        AND (expires_at IS NULL OR expires_at > datetime('now'))
      LIMIT 1`,
    [normalized],
  );
  return Boolean(invite);
}

export async function markInviteAccepted(email: string): Promise<void> {
  const normalized = normalizeEmail(email);
  if (!normalized) return;

  const { execute } = await import('@/lib/db/client');
  await execute(
    `UPDATE admin_invites
       SET accepted_at = datetime('now')
     WHERE lower(email) = ?
       AND accepted_at IS NULL`,
    [normalized],
  );
}
