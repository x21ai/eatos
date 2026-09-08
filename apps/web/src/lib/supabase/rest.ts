// Tiny read layer over the Supabase Data API.
//
// Deliberately dependency free: it is plain fetch against PostgREST, so it runs
// in the browser, in route handlers and in the Cloudflare Worker without adding
// an SDK to the bundle. Writes that need elevated rights belong in the separate
// backend, not here.

import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from './config';

export interface SupabaseQuery {
  /** Table or view name, for example "posts". */
  table: string;
  /** PostgREST select expression. Always project explicit columns. */
  select?: string;
  /** Extra PostgREST filters, for example { slug: 'eq.my-post' }. */
  filters?: Record<string, string>;
  /** Order expression, for example "published_at.desc". */
  order?: string;
  limit?: number;
  /** Seconds to cache the response for. 0 means always fresh. */
  revalidate?: number;
}

export interface SupabaseResult<T> {
  data: T[] | null;
  error: { code: string; message: string } | null;
}

export async function supabaseSelect<T>(query: SupabaseQuery): Promise<SupabaseResult<T>> {
  if (!isSupabaseConfigured()) {
    return { data: null, error: { code: 'not_configured', message: 'Supabase is not configured' } };
  }

  const params = new URLSearchParams();
  params.set('select', query.select || '*');
  if (query.order) params.set('order', query.order);
  if (query.limit) params.set('limit', String(query.limit));
  for (const [key, value] of Object.entries(query.filters || {})) params.set(key, value);

  const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${query.table}?${params.toString()}`;

  try {
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Accept: 'application/json',
      },
      next: { revalidate: query.revalidate ?? 60 },
    } as RequestInit);

    if (!res.ok) {
      const message = await res.text();
      return { data: null, error: { code: `http_${res.status}`, message } };
    }
    return { data: (await res.json()) as T[], error: null };
  } catch (err) {
    return {
      data: null,
      error: { code: 'network_error', message: err instanceof Error ? err.message : 'Request failed' },
    };
  }
}

export { isSupabaseConfigured };
