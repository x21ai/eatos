import { fail, ok, readJson } from '@/lib/api';
import { execute, queryOne } from '@/lib/db/client';
import { adminFail, requireCapability } from '@/lib/admin/guard';

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireCapability(request, 'shop:write');
  } catch (error) {
    return adminFail(error);
  }

  const { id } = await context.params;
  const body = (await readJson(request)) || {};

  const existing = await queryOne<{ id: string }>(
    `SELECT id FROM discount_codes WHERE id = ? LIMIT 1`,
    [id],
  );
  if (!existing) return fail('not_found', 'Discount code not found.', 404);

  if (body.enabled === false || body.enabled === 0) {
    await execute(
      `UPDATE discount_codes SET enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [id],
    );
    return ok({ id, enabled: false });
  }

  if (body.enabled === true || body.enabled === 1) {
    await execute(
      `UPDATE discount_codes SET enabled = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [id],
    );
    return ok({ id, enabled: true });
  }

  return fail('validation_failed', 'Only enabled true/false is supported.');
}
