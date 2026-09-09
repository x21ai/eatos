// Contract for blog and newsroom content. The pages render only from these
// shapes, so the database can be built independently as long as the columns
// map onto them.

export interface BlogBodyBlock {
  type: 'p' | 'h2' | 'h3' | 'ul' | 'quote';
  text?: string;
  items?: string[];
}

/** Shape every blog and news view consumes. */
export interface Article {
  slug: string;
  title: string;
  category: string;
  /** ISO date, for example 2026-08-26. */
  date: string;
  author: string;
  excerpt: string;
  image: string | null;
  body: BlogBodyBlock[];
}

/** Row shape expected from D1 (or Supabase). Column names are the contract. */
export interface PostRow {
  slug: string;
  title: string;
  excerpt: string | null;
  /** JSON array, or a JSON string when read from SQLite TEXT. */
  body: BlogBodyBlock[] | string | null;
  cover_image: string | null;
  category: string | null;
  author_name: string | null;
  published_at: string | null;
  status: 'draft' | 'published' | string;
}

export const POST_COLUMNS =
  'slug,title,excerpt,body,cover_image,category,author_name,published_at,status';

export const POST_LIST_COLUMNS =
  'slug,title,excerpt,cover_image,category,author_name,published_at,status';

function parseBody(body: PostRow['body']): BlogBodyBlock[] {
  if (Array.isArray(body)) return body;
  if (typeof body === 'string' && body.length > 0) {
    try {
      const parsed = JSON.parse(body);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export function rowToArticle(row: PostRow): Article {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category || 'Restaurant Insights',
    date: (row.published_at || '').slice(0, 10),
    author: row.author_name || 'eatOS Staff',
    excerpt: row.excerpt || '',
    image: row.cover_image || null,
    body: parseBody(row.body),
  };
}
