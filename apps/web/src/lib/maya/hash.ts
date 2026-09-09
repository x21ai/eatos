/** Normalize then SHA-256 so repeated questions share a cache key. */

export function normalizeQuestion(question: string): string {
  return String(question ?? '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export async function hashQuestion(question: string): Promise<string> {
  const normalized = normalizeQuestion(question);
  const bytes = new TextEncoder().encode(normalized);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
