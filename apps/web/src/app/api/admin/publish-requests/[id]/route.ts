import { adminFail, requireAdmin } from '@/lib/admin/guard';
import {
  approvePublishRequest,
  rejectPublishRequest,
} from '@/lib/admin/content-publish';

function fail(code: string, message: string, status: number) {
  return Response.json({ error: true, code, message }, { status });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  let admin;
  try {
    admin = await requireAdmin(request);
  } catch (error) {
    return adminFail(error);
  }

  const { id } = await context.params;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('invalid_json', 'Request body must be JSON.', 400);
  }

  const action = String(body.action || '');
  const notes = typeof body.notes === 'string' ? body.notes : undefined;

  try {
    if (action === 'approve') {
      const result = await approvePublishRequest(admin, id, notes);
      if (!result) {
        return fail('not_found', 'Publish request not found or already processed.', 404);
      }
      return Response.json({ data: { id, action: 'approved', ...result } });
    }

    if (action === 'reject') {
      const ok = await rejectPublishRequest(admin, id, notes);
      if (!ok) {
        return fail('not_found', 'Publish request not found or already processed.', 404);
      }
      return Response.json({ data: { id, action: 'rejected' } });
    }

    return fail('validation_failed', 'action must be approve or reject.', 400);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Could not process publish request.';
    if (message.includes('permission')) {
      return fail('forbidden', message, 403);
    }
    console.error('publish request action failed', error);
    return fail('write_failed', 'Could not process publish request.', 500);
  }
}
