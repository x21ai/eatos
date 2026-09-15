import { fail, ok, readJson } from '@/lib/api';
import { adminFail } from '@/lib/admin/guard';
import { requireMayaAgent } from '@/lib/maya/helpdesk/guard';
import { deleteAgent, updateAgent } from '@/lib/maya/helpdesk/store';
import type { MayaAgentRole } from '@/lib/maya/helpdesk/types';

const ROLES = new Set<MayaAgentRole>(['agent', 'lead', 'viewer']);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireMayaAgent(request, { minRole: 'lead' });
    const { id } = await params;
    const body = (await readJson(request)) || {};
    const patch: Parameters<typeof updateAgent>[1] = {};
    if (body.display_name !== undefined) patch.display_name = body.display_name || null;
    if (ROLES.has(body.role)) patch.role = body.role;
    if (body.is_active !== undefined) patch.is_active = Boolean(body.is_active);
    const updated = await updateAgent(id, patch);
    if (!updated) return fail('not_found', 'Agent not found.', 404);
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
    await deleteAgent(id);
    return ok({ deleted: true });
  } catch (error) {
    return adminFail(error);
  }
}
