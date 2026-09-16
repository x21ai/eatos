import { AdminAuthError, adminFail, requireAdmin } from '@/lib/admin/guard';
import { canApproveAnyPublishRequest, canApprovePublishForContentType } from '@/lib/admin/permissions';
import { queryAll } from '@/lib/db/client';

export async function GET(request: Request) {
  let admin;
  try {
    admin = await requireAdmin(request);
    if (!canApproveAnyPublishRequest(admin)) {
      throw new AdminAuthError(
        403,
        'forbidden',
        'You do not have permission to view the publish queue.',
      );
    }
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

  const filtered = (rows ?? []).filter((row) =>
    canApprovePublishForContentType(admin, String(row.content_type) as 'blog' | 'news' | 'shop'),
  );

  return Response.json({ data: filtered });
}
