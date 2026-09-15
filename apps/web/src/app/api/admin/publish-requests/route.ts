import { adminFail, requireSuperadmin } from '@/lib/admin/guard';
import { queryAll } from '@/lib/db/client';

export async function GET(request: Request) {
  try {
    await requireSuperadmin(request);
  } catch (error) {
    return adminFail(error);
  }

  const url = new URL(request.url);
  const status = url.searchParams.get('status') || 'pending';

  const rows = await queryAll<Record<string, unknown>>(
    `SELECT id, content_type, content_slug, requested_by, requested_by_email,
            requested_at, status, reviewed_by, reviewed_by_email, reviewed_at, notes
       FROM publish_requests
      WHERE status = ?
      ORDER BY requested_at DESC`,
    [status],
  );

  return Response.json({ data: rows ?? [] });
}
