import { adminFail, requireCapability } from '@/lib/admin/guard';
import { execute, queryOne } from '@/lib/db/client';
import {
  ALL_ADMIN_ROLES,
  type AdminRole,
  buildAdminIdentity,
  normalizeAssignedRoles,
} from '@/lib/admin/permissions';
import { isSuperadminEmail } from '@/lib/auth/allowlist';

function fail(code: string, message: string, status: number) {
  return Response.json({ error: true, code, message }, { status });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ user_id: string }> },
) {
  let admin;
  try {
    admin = await requireCapability(request, 'users:manage');
  } catch (error) {
    return adminFail(error);
  }

  const { user_id: userId } = await context.params;
  const existing = await queryOne<{ user_id: string; email: string; role: string; roles: string }>(
    `SELECT user_id, email, role, roles FROM admin_users WHERE user_id = ? OR lower(email) = ?`,
    [userId, userId.toLowerCase()],
  );

  if (!existing) {
    return fail('not_found', 'Admin user not found.', 404);
  }

  const target = buildAdminIdentity(
    existing.user_id,
    existing.email,
    existing.roles,
    existing.role,
  );

  if (target.isSuperadmin && !admin.isSuperadmin) {
    return fail('forbidden', 'Only a superadmin can modify a superadmin account.', 403);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('invalid_json', 'Request body must be JSON.', 400);
  }

  const rolesInput = Array.isArray(body.roles) ? body.roles : null;
  if (!rolesInput) {
    return fail('validation_failed', 'roles array is required.', 400);
  }

  const roles = normalizeAssignedRoles(
    rolesInput.filter((r): r is AdminRole => ALL_ADMIN_ROLES.includes(r as AdminRole)),
  );
  if (!roles.length) {
    return fail('validation_failed', 'At least one valid role is required.', 400);
  }

  if (roles.includes('superadmin') && !admin.isSuperadmin) {
    return fail(
      'forbidden',
      'Only an existing superadmin may assign the superadmin role.',
      403,
    );
  }

  const safeRoles = isSuperadminEmail(existing.email)
    ? (['superadmin'] as AdminRole[])
    : roles;

  const primaryRole = safeRoles[0] ?? 'draft_editor';
  const updatedIdentity = buildAdminIdentity(
    existing.user_id,
    existing.email,
    JSON.stringify(safeRoles),
    primaryRole,
  );

  try {
    await execute(
      `UPDATE admin_users SET role = ?, roles = ? WHERE user_id = ?`,
      [primaryRole, JSON.stringify(safeRoles), existing.user_id],
    );
  } catch (error) {
    console.error('update admin roles failed', error);
    return fail('write_failed', 'Could not update admin user.', 500);
  }

  const row = await queryOne<Record<string, unknown>>(
    `SELECT user_id, email, role, roles, created_at FROM admin_users WHERE user_id = ?`,
    [existing.user_id],
  );

  return Response.json({
    data: row
      ? {
          userId: row.user_id,
          email: row.email,
          roles: updatedIdentity.roles,
          isSuperadmin: updatedIdentity.isSuperadmin,
          createdAt: row.created_at,
        }
      : null,
  });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ user_id: string }> },
) {
  let admin;
  try {
    admin = await requireCapability(request, 'users:manage');
  } catch (error) {
    return adminFail(error);
  }

  const { user_id: userId } = await context.params;
  const existing = await queryOne<{ user_id: string; email: string; role: string; roles: string }>(
    `SELECT user_id, email, role, roles FROM admin_users WHERE user_id = ? OR lower(email) = ?`,
    [userId, userId.toLowerCase()],
  );

  if (!existing) {
    return fail('not_found', 'Admin user not found.', 404);
  }

  const target = buildAdminIdentity(
    existing.user_id,
    existing.email,
    existing.roles,
    existing.role,
  );

  if (target.isSuperadmin) {
    return fail('forbidden', 'Superadmin accounts cannot be removed.', 403);
  }

  if (existing.user_id === admin.userId) {
    return fail('forbidden', 'You cannot remove your own admin access.', 403);
  }

  try {
    await execute(`DELETE FROM admin_users WHERE user_id = ?`, [existing.user_id]);
  } catch (error) {
    console.error('delete admin failed', error);
    return fail('write_failed', 'Could not remove admin user.', 500);
  }

  return Response.json({ data: { userId: existing.user_id, email: existing.email } });
}
