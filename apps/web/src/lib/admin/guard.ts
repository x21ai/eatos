import { auth } from '@/lib/auth';
import { queryOne } from '@/lib/db/client';
import {
  buildAdminIdentity,
  hasCapability,
  type AdminIdentity,
  type Capability,
} from '@/lib/admin/permissions';

export type AdminUser = AdminIdentity;

export class AdminAuthError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = 'AdminAuthError';
    this.status = status;
    this.code = code;
  }
}

export function adminFail(error: unknown) {
  if (error instanceof AdminAuthError) {
    return Response.json(
      { error: true, code: error.code, message: error.message },
      { status: error.status },
    );
  }
  console.error('admin guard unexpected error', error);
  return Response.json(
    { error: true, code: 'admin_check_failed', message: 'Admin check failed.' },
    { status: 500 },
  );
}

async function loadAdminFromSession(
  session: Awaited<ReturnType<typeof auth.api.getSession>>,
): Promise<AdminUser | null> {
  if (!session?.user?.id) return null;

  const email = String(session.user.email || '').trim().toLowerCase();
  const row = await queryOne<{
    user_id: string;
    email: string;
    role: string;
    roles: string | null;
  }>(
    `SELECT user_id, email, role, roles FROM admin_users
      WHERE user_id = ? OR lower(email) = ?
      LIMIT 1`,
    [session.user.id, email],
  );

  if (!row) return null;

  return buildAdminIdentity(
    row.user_id || session.user.id,
    row.email || email,
    row.roles,
    row.role,
  );
}

/**
 * Require a Better Auth session whose user is listed in admin_users.
 * Throws AdminAuthError: 401 (no session) or 403 (signed in, not admin).
 */
export async function requireAdmin(request: Request): Promise<AdminUser> {
  let session: Awaited<ReturnType<typeof auth.api.getSession>> = null;
  try {
    session = await auth.api.getSession({ headers: request.headers });
  } catch (error) {
    console.error('requireAdmin getSession failed', error);
    throw new AdminAuthError(401, 'unauthorized', 'Sign in required.');
  }

  const admin = await loadAdminFromSession(session);
  if (!admin) {
    throw new AdminAuthError(
      403,
      'forbidden',
      'This account is not an admin.',
    );
  }

  if (!hasCapability(admin, 'admin:access')) {
    throw new AdminAuthError(
      403,
      'forbidden',
      'This account does not have admin access.',
    );
  }

  return admin;
}

/** Returns admin identity or null without throwing. */
export async function tryGetAdmin(request: Request): Promise<AdminUser | null> {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    return await loadAdminFromSession(session);
  } catch {
    return null;
  }
}

export async function requireCapability(
  request: Request,
  capability: Capability,
): Promise<AdminUser> {
  const admin = await requireAdmin(request);
  if (!hasCapability(admin, capability)) {
    throw new AdminAuthError(
      403,
      'forbidden',
      'You do not have permission for this action.',
    );
  }
  return admin;
}

export async function requireSuperadmin(request: Request): Promise<AdminUser> {
  const admin = await requireAdmin(request);
  if (!admin.isSuperadmin) {
    throw new AdminAuthError(
      403,
      'forbidden',
      'Superadmin access required.',
    );
  }
  return admin;
}

/** True when the current request has an admin session (no throw). */
export async function isAdminRequest(request: Request): Promise<boolean> {
  try {
    await requireAdmin(request);
    return true;
  } catch {
    return false;
  }
}
