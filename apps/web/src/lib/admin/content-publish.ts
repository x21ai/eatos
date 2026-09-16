import { execute, queryOne } from '@/lib/db/client';
import {
  canApprovePublishForContentType,
  canPublishContent,
  type AdminIdentity,
  type PublishContentType,
} from '@/lib/admin/permissions';

export type ContentType = PublishContentType;

const CONTENT_TABLES: Record<ContentType, string> = {
  blog: 'posts',
  news: 'news_posts',
  shop: 'products',
};

export type PublishResolution = {
  status: string;
  publishRequestId?: string;
  queuedForApproval?: boolean;
};

/**
 * Resolve a requested status change. Non-publishers cannot go live directly;
 * their publish attempt becomes `pending_publish` plus a queue entry.
 */
export async function resolvePublishStatus(
  admin: AdminIdentity,
  contentType: ContentType,
  slug: string,
  requestedStatus: string | undefined,
  currentStatus: string,
): Promise<PublishResolution> {
  if (!requestedStatus || requestedStatus === currentStatus) {
    return { status: currentStatus };
  }

  if (requestedStatus !== 'published') {
    return { status: requestedStatus };
  }

  if (canPublishContent(admin, contentType) || admin.isSuperadmin) {
    return { status: 'published' };
  }

  const existing = await queryOne<{ id: string }>(
    `SELECT id FROM publish_requests
      WHERE content_type = ? AND content_slug = ? AND status = 'pending'
      LIMIT 1`,
    [contentType, slug],
  );

  let publishRequestId = existing?.id;
  if (!publishRequestId) {
    publishRequestId = crypto.randomUUID();
    await execute(
      `INSERT INTO publish_requests
         (id, content_type, content_slug, requested_by, requested_by_email, status)
       VALUES (?, ?, ?, ?, ?, 'pending')`,
      [publishRequestId, contentType, slug, admin.userId, admin.email],
    );
  }

  return {
    status: 'pending_publish',
    publishRequestId,
    queuedForApproval: true,
  };
}

export async function approvePublishRequest(
  admin: AdminIdentity,
  requestId: string,
  notes?: string,
): Promise<{ contentType: ContentType; slug: string } | null> {
  const row = await queryOne<{
    id: string;
    content_type: string;
    content_slug: string;
    status: string;
  }>(
    `SELECT id, content_type, content_slug, status FROM publish_requests WHERE id = ?`,
    [requestId],
  );

  if (!row || row.status !== 'pending') return null;

  const contentType = row.content_type as ContentType;
  const table = CONTENT_TABLES[contentType];
  if (!table) return null;

  if (!canApprovePublishForContentType(admin, contentType)) {
    throw new Error('You do not have permission to approve this publish request.');
  }

  const now = new Date().toISOString();
  await execute(
    `UPDATE ${table} SET status = 'published', published_at = COALESCE(published_at, ?), updated_at = ? WHERE slug = ?`,
    [now, now, row.content_slug],
  );

  await execute(
    `UPDATE publish_requests
       SET status = 'approved', reviewed_by = ?, reviewed_by_email = ?, reviewed_at = ?, notes = ?
     WHERE id = ?`,
    [admin.userId, admin.email, now, notes ?? null, requestId],
  );

  return { contentType, slug: row.content_slug };
}

export async function rejectPublishRequest(
  admin: AdminIdentity,
  requestId: string,
  notes?: string,
): Promise<boolean> {
  const row = await queryOne<{
    id: string;
    content_type: string;
    status: string;
  }>(
    `SELECT id, content_type, status FROM publish_requests WHERE id = ?`,
    [requestId],
  );
  if (!row || row.status !== 'pending') return false;

  const contentType = row.content_type as ContentType;
  if (!canApprovePublishForContentType(admin, contentType)) {
    throw new Error('You do not have permission to reject this publish request.');
  }

  const now = new Date().toISOString();
  await execute(
    `UPDATE publish_requests
       SET status = 'rejected', reviewed_by = ?, reviewed_by_email = ?, reviewed_at = ?, notes = ?
     WHERE id = ?`,
    [admin.userId, admin.email, now, notes ?? null, requestId],
  );
  return true;
}
