import { adminFail, requireCapability } from '@/lib/admin/guard';
import { execute, queryAll, queryOne } from '@/lib/db/client';
import {
  ALL_ADMIN_ROLES,
  type AdminRole,
  buildAdminIdentity,
} from '@/lib/admin/permissions';
import { isSuperadminEmail, isSignupEmailAllowed } from '@/lib/auth/allowlist';

function fail(code: string, message: string, status: number) {
  return Response.json({ error: true, code, message }, { status });
}

function toApiUser(row: Record<string, unknown>) {
  const identity = buildAdminIdentity(
    String(row.user_id),
    String(row.email),
    row.roles as string | null,
    String(row.role || ''),
  );
  return {
    userId: identity.userId,
    email: identity.email,
    roles: identity.roles,
    isSuperadmin: identity.isSuperadmin,
    createdAt: row.created_at ?? null,
  };
}

export async function GET(request: Request) {
  try {
    await requireCapability(request, 'users:manage');
  } catch (error) {
    return adminFail(error);
  }

  const rows = await queryAll<Record<string, unknown>>(
    `SELECT user_id, email, role, roles, created_at FROM admin_users ORDER BY created_at ASC`,
  );

  return Response.json({ data: (rows ?? []).map(toApiUser) });
}

export async function POST(request: Request) {
  let admin;
  try {
    admin = await requireCapability(request, 'users:invite');
  } catch (error) {
    return adminFail(error);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('invalid_json', 'Request body must be JSON.', 400);
  }

  const email = String(body.email || '')
    .trim()
    .toLowerCase();
  if (!email || !email.includes('@')) {
    return fail('validation_failed', 'A valid email is required.', 400);
  }

  if (!isSignupEmailAllowed(email)) {
    return fail(
      'email_not_allowlisted',
      'This email is not on the signup allowlist. Only approved eatOS accounts can be invited.',
      400,
    );
  }

  const rolesInput = Array.isArray(body.roles) ? body.roles : [body.role];
  const roles = rolesInput.filter((r): r is AdminRole =>
    ALL_ADMIN_ROLES.includes(r as AdminRole),
  );

  if (!roles.length) {
    return fail('validation_failed', 'At least one valid role is required.', 400);
  }

  if (roles.includes('superadmin') && !isSuperadminEmail(email)) {
    return fail(
      'forbidden',
      'Superadmin role can only be assigned to pmt@eatos.com.',
      403,
    );
  }

  const safeRoles = isSuperadminEmail(email)
    ? (['superadmin'] as AdminRole[])
    : roles.filter((r) => r !== 'superadmin');

  const primaryRole = safeRoles[0] ?? 'draft_editor';

  const authUser = await queryOne<{ id: string }>(
    `SELECT id FROM user WHERE lower(email) = ? LIMIT 1`,
    [email],
  );
  const userId = authUser?.id ?? email;

  try {
    await execute(
      `INSERT INTO admin_users (user_id, email, role, roles)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(email) DO UPDATE SET
         user_id = excluded.user_id,
         role = excluded.role,
         roles = excluded.roles`,
      [userId, email, primaryRole, JSON.stringify(safeRoles)],
    );

    await execute(
      `INSERT INTO admin_invites (id, email, roles, invited_by, invited_by_email)
       VALUES (?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), email, JSON.stringify(safeRoles), admin.userId, admin.email],
    );
  } catch (error) {
    console.error('invite admin failed', error);
    return fail('write_failed', 'Could not invite admin user.', 500);
  }

  const row = await queryOne<Record<string, unknown>>(
    `SELECT user_id, email, role, roles, created_at FROM admin_users WHERE lower(email) = ?`,
    [email],
  );

  return Response.json({ data: row ? toApiUser(row) : { email, roles: safeRoles } }, { status: 201 });
}
