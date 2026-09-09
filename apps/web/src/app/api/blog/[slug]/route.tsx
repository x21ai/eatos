// Single article endpoint, backed by Cloudflare D1.
//
// Tool contract:
//   get_article    GET    /api/blog/{slug}?kind=blog|news -> { data: Article }
//   update_article PATCH  /api/blog/{slug}?kind=blog|news
//     body any of { title, content, body, excerpt, cover_image, category,
//                   author_name, seo_title, seo_description, keywords,
//                   new_slug, status, published_at } -> { data: Article }
//   delete_article DELETE /api/blog/{slug}?kind=blog|news -> { data: { slug } }
// Errors are always { error: true, code, message }.

import { queryOne, execute } from '@/lib/db/client';
import { htmlToBlocks, blocksToHtml } from '@/lib/blog/html';

const TABLES = { blog: 'posts', news: 'news_posts' } as const;

function tableFor(request: Request): string {
  const kind = new URL(request.url).searchParams.get('kind');
  return kind === 'news' ? TABLES.news : TABLES.blog;
}

function fail(code: string, message: string, status: number) {
  return Response.json({ error: true, code, message }, { status });
}

function toApiArticle(row: Record<string, any>) {
  const blocks = (() => {
    try {
      const parsed = JSON.parse(String(row.body ?? '[]'));
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? '',
    content: row.content_html || blocksToHtml(blocks),
    body: blocks,
    cover_image: row.cover_image ?? null,
    category: row.category ?? null,
    author_name: row.author_name ?? null,
    published_at: row.published_at ?? null,
    status: row.status ?? 'draft',
    seo_title: row.seo_title ?? null,
    seo_description: row.seo_description ?? null,
    keywords: row.keywords ?? null,
  };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const table = tableFor(request);
  const row = await queryOne<Record<string, any>>(
    `SELECT * FROM ${table} WHERE slug = ?`,
    [slug]
  );

  if (!row) return fail('not_found', 'No article exists with that slug.', 404);
  return Response.json({ data: toApiArticle(row) });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const table = tableFor(request);

  let body: Record<string, any>;
  try {
    body = await request.json();
  } catch {
    return fail('invalid_json', 'The request body must be JSON.', 400);
  }

  const current = await queryOne<Record<string, any>>(
    `SELECT * FROM ${table} WHERE slug = ?`,
    [slug]
  );
  if (!current) return fail('not_found', 'No article exists with that slug.', 404);

  const sets: string[] = [];
  const args: unknown[] = [];
  const set = (column: string, value: unknown) => {
    sets.push(`${column} = ?`);
    args.push(value);
  };

  const simple: Array<[string, string]> = [
    ['title', 'title'],
    ['excerpt', 'excerpt'],
    ['cover_image', 'cover_image'],
    ['category', 'category'],
    ['author_name', 'author_name'],
    ['seo_title', 'seo_title'],
    ['seo_description', 'seo_description'],
    ['keywords', 'keywords'],
    ['status', 'status'],
    ['published_at', 'published_at'],
  ];
  for (const [field, column] of simple) {
    if (body[field] !== undefined) set(column, body[field]);
  }

  if (typeof body.content === 'string') {
    set('content_html', body.content);
    set('body', JSON.stringify(htmlToBlocks(body.content)));
  } else if (Array.isArray(body.body)) {
    set('body', JSON.stringify(body.body));
    set('content_html', blocksToHtml(body.body));
  }

  const nextSlug =
    typeof body.new_slug === 'string' && body.new_slug.trim() && body.new_slug !== slug
      ? body.new_slug.trim()
      : null;

  if (nextSlug) {
    const clash = await queryOne(`SELECT slug FROM ${table} WHERE slug = ?`, [nextSlug]);
    if (clash) return fail('slug_taken', 'Another article already uses that slug.', 409);
    set('slug', nextSlug);
  }

  if (!sets.length) return Response.json({ data: toApiArticle(current) });

  set('updated_at', new Date().toISOString());

  try {
    await execute(
      `UPDATE ${table} SET ${sets.join(', ')} WHERE slug = ?`,
      [...args, slug]
    );
  } catch (error) {
    console.error('Failed to update article', error);
    return fail('write_failed', 'The article could not be saved.', 500);
  }

  const row = await queryOne<Record<string, any>>(
    `SELECT * FROM ${table} WHERE slug = ?`,
    [nextSlug || slug]
  );
  return Response.json({ data: row ? toApiArticle(row) : null });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const table = tableFor(request);
  const current = await queryOne(`SELECT slug FROM ${table} WHERE slug = ?`, [slug]);
  if (!current) return fail('not_found', 'No article exists with that slug.', 404);

  try {
    await execute(`DELETE FROM ${table} WHERE slug = ?`, [slug]);
  } catch (error) {
    console.error('Failed to delete article', error);
    return fail('write_failed', 'The article could not be deleted.', 500);
  }

  return Response.json({ data: { slug: slug } });
}
