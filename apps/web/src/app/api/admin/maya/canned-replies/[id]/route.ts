import { fail, ok, readJson } from '@/lib/api';
import { adminFail } from '@/lib/admin/guard';
import { requireMayaAgent } from '@/lib/maya/helpdesk/guard';
import { deleteCannedReply, updateCannedReply } from '@/lib/maya/helpdesk/store';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireMayaAgent(request, { minRole: 'agent' });
    const { id } = await params;
    const body = (await readJson(request)) || {};
    const patch: Parameters<typeof updateCannedReply>[1] = {};
    if (body.title !== undefined) patch.title = String(body.title);
    if (body.body_text !== undefined) patch.body_text = String(body.body_text);
    if (body.shortcut !== undefined) patch.shortcut = body.shortcut || null;
    if (body.category !== undefined) patch.category = body.category || null;
    if (body.is_active !== undefined) patch.is_active = Boolean(body.is_active);
    if (Array.isArray(body.article_slugs)) {
      patch.article_slugs = body.article_slugs.filter((s: unknown) => typeof s === 'string');
    }
    const updated = await updateCannedReply(id, patch);
    if (!updated) return fail('not_found', 'Canned reply not found.', 404);
    return ok(updated);
  } catch (error) {
    return adminFail(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireMayaAgent(request, { minRole: 'lead' });
    const { id } = await params;
    await deleteCannedReply(id);
    return ok({ deleted: true });
  } catch (error) {
    return adminFail(error);
  }
}
