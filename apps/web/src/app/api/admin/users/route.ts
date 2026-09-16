import { adminFail, requireCapability } from '@/lib/admin/guard';
import { execute, queryAll, queryOne } from '@/lib/db/client';
import {
  ALL_ADMIN_ROLES,
  type AdminRole,
  buildAdminIdentity,
  normalizeAssignedRoles,
} from '@/lib/admin/permissions';
import { sendAdminInvite } from '@/lib/email/invites';
import { isSuperadminEmail } from '@/lib/auth/allowlist';

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

const INVITE_TTL_DAYS = 14;

function buildInviteExpirySql() {
  return `datetime('now', '+${INVITE_TTL_DAYS} days')`;
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

  const rolesInput = Array.isArray(body.roles) ? body.roles : [body.role];
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

  const safeRoles = isSuperadminEmail(email)
    ? (['superadmin'] as AdminRole[])
    : roles;

  const primaryRole = safeRoles[0] ?? 'draft_editor';

  const authUser = await queryOne<{ id: string }>(
    `SELECT id FROM user WHERE lower(email) = ? LIMIT 1`,
    [email],
  );
  const userId = authUser?.id ?? email;

  const previousAdmin = await queryOne<{
    user_id: string;
    email: string;
    role: string;
    roles: string;
  }>(
    `SELECT user_id, email, role, roles FROM admin_users WHERE lower(email) = ? LIMIT 1`,
    [email],
  );

  const previousInvite = await queryOne<{
    id: string;
    roles: string;
    invited_by: string;
    invited_by_email: string;
    token: string | null;
    expires_at: string | null;
  }>(
    `SELECT id, roles, invited_by, invited_by_email, token, expires_at
       FROM admin_invites
      WHERE lower(email) = ? AND accepted_at IS NULL
      LIMIT 1`,
    [email],
  );

  const inviteId = crypto.randomUUID();
  const inviteToken = crypto.randomUUID();

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

    if (previousInvite) {
      await execute(
        `UPDATE admin_invites
           SET roles = ?, invited_by = ?, invited_by_email = ?,
               token = ?, expires_at = ${buildInviteExpirySql()}, created_at = datetime('now')
         WHERE id = ?`,
        [
          JSON.stringify(safeRoles),
          admin.userId,
          admin.email,
          inviteToken,
          previousInvite.id,
        ],
      );
    } else {
      await execute(
        `INSERT INTO admin_invites (id, email, roles, invited_by, invited_by_email, token, expires_at)
         VALUES (?, ?, ?, ?, ?, ?, ${buildInviteExpirySql()})`,
        [
          inviteId,
          email,
          JSON.stringify(safeRoles),
          admin.userId,
          admin.email,
          inviteToken,
        ],
      );
    }
  } catch (error) {
    console.error('invite admin failed', error);
    return fail('write_failed', 'Could not invite admin user.', 500);
  }

  const signupUrl = `${(process.env.BETTER_AUTH_URL || 'https://s.eatos.dev').replace(/\/$/, '')}/account/signup?email=${encodeURIComponent(email)}`;
  const emailResult = await sendAdminInvite({
    to: email,
    roles: safeRoles,
    invitedByEmail: admin.email,
    signupUrl,
  });

  if (!emailResult.ok) {
    try {
      if (previousAdmin) {
        await execute(
          `UPDATE admin_users SET user_id = ?, role = ?, roles = ? WHERE lower(email) = ?`,
          [
            previousAdmin.user_id,
            previousAdmin.role,
            previousAdmin.roles,
            email,
          ],
        );
      } else {
        await execute(`DELETE FROM admin_users WHERE lower(email) = ?`, [email]);
      }

      if (previousInvite) {
        await execute(
          `UPDATE admin_invites
             SET roles = ?, invited_by = ?, invited_by_email = ?, token = ?, expires_at = ?
           WHERE id = ?`,
          [
            previousInvite.roles,
            previousInvite.invited_by,
            previousInvite.invited_by_email,
            previousInvite.token,
            previousInvite.expires_at,
            previousInvite.id,
          ],
        );
      } else {
        await execute(
          `DELETE FROM admin_invites
            WHERE lower(email) = ? AND accepted_at IS NULL AND token = ?`,
          [email, inviteToken],
        );
      }
    } catch (rollbackError) {
      console.error('invite rollback failed', rollbackError);
    }

    return fail(
      emailResult.code === 'not_configured' ? 'email_not_configured' : 'email_failed',
      emailResult.message,
      502,
    );
  }

  const row = await queryOne<Record<string, unknown>>(
    `SELECT user_id, email, role, roles, created_at FROM admin_users WHERE lower(email) = ?`,
    [email],
  );

  return Response.json(
    {
      data: row ? toApiUser(row) : { email, roles: safeRoles },
      email_sent: true,
      message: `Invite email sent to ${email}.`,
    },
    { status: 201 },
  );
}
