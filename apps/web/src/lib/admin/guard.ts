import { auth } from '@/lib/auth';
import { queryOne } from '@/lib/db/client';

export type AdminRole = 'owner' | 'editor';

export type AdminUser = {
  userId: string;
  email: string;
  role: AdminRole;
};

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

  if (!session?.user?.id) {
    throw new AdminAuthError(401, 'unauthorized', 'Sign in required.');
  }

  const email = String(session.user.email || '').trim().toLowerCase();
  const row = await queryOne<{ user_id: string; email: string; role: string }>(
    `SELECT user_id, email, role FROM admin_users
      WHERE user_id = ? OR lower(email) = ?
      LIMIT 1`,
    [session.user.id, email],
  );

  if (!row) {
    throw new AdminAuthError(
      403,
      'forbidden',
      'This account is not an admin.',
    );
  }

  return {
    userId: row.user_id || session.user.id,
    email: row.email || email,
    role: (row.role === 'editor' ? 'editor' : 'owner') as AdminRole,
  };
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
