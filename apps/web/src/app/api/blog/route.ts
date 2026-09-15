// Blog and newsroom collection endpoint, backed by Cloudflare D1.
//
// Tool contract (an AI agent can perform the same actions as the admin UI):
//   list_articles  GET  /api/blog?kind=blog|news&status=&search=&cursor=&limit=
//     -> { data: Article[], next_cursor: string|null, has_more: boolean }
//   create_article POST /api/blog
//     body { kind?, title (required), slug (required), excerpt?, content?,
//            cover_image?, category?, author_name?, published_at?, status? }
//     -> { data: Article } 201
// Errors are always { error: true, code, message }.

import { queryAll, queryOne, execute } from '@/lib/db/client';
import { htmlToBlocks, blocksToHtml, excerptFromBlocks } from '@/lib/blog/html';
import { resolvePublishStatus } from '@/lib/admin/content-publish';
import { adminFail, requireCapability, tryGetAdmin } from '@/lib/admin/guard';
import { hasCapability } from '@/lib/admin/permissions';

type Kind = 'blog' | 'news';

const TABLES: Record<Kind, string> = { blog: 'posts', news: 'news_posts' };

function tableFor(value: string | null): string {
  return TABLES[(value === 'news' ? 'news' : 'blog') as Kind];
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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const table = tableFor(url.searchParams.get('kind'));
  const admin = await tryGetAdmin(request);
  const kind = url.searchParams.get('kind') === 'news' ? 'news' : 'blog';
  const readCap = kind === 'news' ? 'news:read' : 'blog:read';
  const canReadDrafts = admin && hasCapability(admin, readCap);

  let status = url.searchParams.get('status');
  if (!canReadDrafts) {
    status = 'published';
  }
  const search = (url.searchParams.get('search') || '').trim();
  const cursor = url.searchParams.get('cursor');
  const limit = Math.min(
    Math.max(parseInt(url.searchParams.get('limit') || '50', 10) || 50, 1),
    100
  );

  const where: string[] = [];
  const args: unknown[] = [];

  if (status && status !== 'all') {
    where.push('status = ?');
    args.push(status);
  }
  if (search) {
    where.push('(title LIKE ? OR excerpt LIKE ?)');
    args.push(`%${search}%`, `%${search}%`);
  }
  if (cursor) {
    // Cursor is the published_at of the last row already returned.
    where.push('(published_at IS NULL OR published_at < ?)');
    args.push(cursor);
  }

  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const rows = await queryAll<Record<string, any>>(
    `SELECT slug, title, excerpt, cover_image, category, author_name,
            published_at, status, seo_title, seo_description, keywords, body, content_html
       FROM ${table} ${clause}
      ORDER BY published_at DESC, slug ASC
      LIMIT ?`,
    [...args, limit + 1]
  );

  if (rows === null) {
    return fail(
      'database_unavailable',
      'The content database is not reachable from this request.',
      503
    );
  }

  const hasMore = rows.length > limit;
  const page = hasMore ? rows.slice(0, limit) : rows;
  const last = page[page.length - 1];

  return Response.json({
    data: page.map(toApiArticle),
    next_cursor: hasMore ? (last?.published_at ?? null) : null,
    has_more: hasMore,
  });
}

export async function POST(request: Request) {
  let body: Record<string, any>;
  try {
    body = await request.json();
  } catch {
    return fail('invalid_json', 'The request body must be JSON.', 400);
  }

  const table = tableFor(body.kind ?? null);
  const contentType = body.kind === 'news' ? 'news' : 'blog';
  const writeCap = contentType === 'news' ? 'news:write' : 'blog:write';

  let admin;
  try {
    admin = await requireCapability(request, writeCap);
  } catch (error) {
    return adminFail(error);
  }
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const slug = typeof body.slug === 'string' ? body.slug.trim() : '';

  if (!title || !slug) {
    return fail('validation_failed', 'Both title and slug are required.', 400);
  }

  const existing = await queryOne(`SELECT slug FROM ${table} WHERE slug = ?`, [slug]);
  if (existing) {
    return fail('slug_taken', 'An article with that slug already exists.', 409);
  }

  const blocks = Array.isArray(body.body) ? body.body : htmlToBlocks(body.content);
  const excerpt =
    typeof body.excerpt === 'string' && body.excerpt.trim()
      ? body.excerpt.trim()
      : excerptFromBlocks(blocks);

  const requestedStatus = typeof body.status === 'string' ? body.status : 'draft';
  const publish = await resolvePublishStatus(
    admin,
    contentType,
    slug,
    requestedStatus,
    'draft',
  );

  try {
    await execute(
      `INSERT INTO ${table}
         (slug, title, excerpt, body, content_html, cover_image, category,
          author_name, published_at, status, seo_title, seo_description, keywords)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        slug,
        title,
        excerpt,
        JSON.stringify(blocks),
        body.content ?? null,
        body.cover_image ?? null,
        body.category ?? null,
        body.author_name ?? 'eatOS Staff',
        publish.status === 'published'
          ? (body.published_at ?? new Date().toISOString())
          : body.published_at ?? null,
        publish.status,
        body.seo_title ?? null,
        body.seo_description ?? null,
        body.keywords ?? null,
      ]
    );
  } catch (error) {
    console.error('Failed to create article', error);
    return fail('write_failed', 'The article could not be saved.', 500);
  }

  const row = await queryOne<Record<string, any>>(
    `SELECT * FROM ${table} WHERE slug = ?`,
    [slug]
  );

  return Response.json({ data: row ? toApiArticle(row) : { slug, title } }, { status: 201 });
}
