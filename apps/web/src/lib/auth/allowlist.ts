/**
 * Signup allowlist — only these emails may create accounts (email/password or OAuth).
 * Case-insensitive matching.
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

export function isSignupEmailAllowed(email: string): boolean {
  const normalized = normalizeEmail(email);
  return SIGNUP_ALLOWLIST.some((allowed) => allowed === normalized);
}

export function isSuperadminEmail(email: string): boolean {
  return normalizeEmail(email) === SUPERADMIN_EMAIL;
}

export const SIGNUP_REJECTED_MESSAGE =
  'Signup is restricted to approved eatOS accounts. Contact your administrator for access.';
