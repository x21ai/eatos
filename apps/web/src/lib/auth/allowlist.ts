/**
 * Bootstrap signup allowlist — existing operators who must never be locked out.
 * New team members become eligible via admin_invites / admin_users instead.
 */
export const SIGNUP_ALLOWLIST = [
  'pmt@eigital.com',
  'pmt@eatos.com',
  'jaspreet.singh@eigital.com',
] as const;

export const SUPERADMIN_EMAIL = 'pmt@eatos.com';

export function normalizeEmail(email: string): string {
  return String(email || '').trim().toLowerCase();
}

/** Legacy sync check — bootstrap operators only. Prefer isSignupEligible() for gating. */
export function isBootstrapSignupEmail(email: string): boolean {
  const normalized = normalizeEmail(email);
  return SIGNUP_ALLOWLIST.some((allowed) => allowed === normalized);
}

/** @deprecated Use isBootstrapSignupEmail or isSignupEligible instead. */
export function isSignupEmailAllowed(email: string): boolean {
  return isBootstrapSignupEmail(email);
}

export function isSuperadminEmail(email: string): boolean {
  return normalizeEmail(email) === SUPERADMIN_EMAIL;
}

export const SIGNUP_REJECTED_MESSAGE =
  'Signup is invite-only. Use the email address your administrator invited, or ask them to send a new invite.';
