// Connection details for the customer-owned Supabase project.
//
// Nothing here creates or assumes a Lovable-managed backend. The values come
// from the environment and are added by the team that owns the database. When
// they are absent every data reader in the app falls back to the imported
// content that ships with the site, so the pages never break.

export const SUPABASE_URL =
  process.env['NEXT_PUBLIC_SUPABASE_URL'] || process.env['SUPABASE_URL'] || '';

// Publishable (anon) key only. Never reference a service role key from here:
// this module is safe to import from browser code.
export const SUPABASE_ANON_KEY =
  process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] ||
  process.env['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'] ||
  '';

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}
