/**
 * Normalize email for order lookup.
 *
 * Query strings use application/x-www-form-urlencoded rules where `+` means space.
 * Plus-addressed emails (e.g. buy-smoke+paid@eatos.dev) often arrive as
 * buy-smoke paid@eatos.dev after URLSearchParams / edge decoding — recover by
 * converting ASCII spaces back to `+` in the local part.
 *
 * Checkout success URLs should keep using encodeURIComponent(email) so `%2B`
 * survives transit when possible; this helper covers the remaining decode edge.
 */
export function normalizeLookupEmail(raw: string | null | undefined): string {
  const trimmed = (raw || '').trim().toLowerCase();
  if (!trimmed) return '';

  const at = trimmed.lastIndexOf('@');
  if (at <= 0) return trimmed.replace(/ /g, '+');

  const local = trimmed.slice(0, at).replace(/ /g, '+');
  const domain = trimmed.slice(at + 1);
  return `${local}@${domain}`;
}

export function normalizeOrderNumber(raw: string | null | undefined): string {
  return (raw || '').trim().toUpperCase();
}

/** Candidate emails for lookup when decode may have mangled plus-addressing. */
export function lookupEmailCandidates(raw: string | null | undefined): string[] {
  const trimmed = (raw || '').trim().toLowerCase();
  const normalized = normalizeLookupEmail(trimmed);
  if (!trimmed) return [];
  if (normalized === trimmed) return [normalized];
  return [normalized, trimmed];
}
