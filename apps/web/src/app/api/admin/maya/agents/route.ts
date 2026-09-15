import { fail, ok, readJson } from '@/lib/api';
import { adminFail, requireAdmin } from '@/lib/admin/guard';
import { requireMayaAgent } from '@/lib/maya/helpdesk/guard';
import { createAgent, listAgents } from '@/lib/maya/helpdesk/store';
import { queryOne } from '@/lib/db/client';
import type { MayaAgentRole } from '@/lib/maya/helpdesk/types';

const ROLES = new Set<MayaAgentRole>(['agent', 'lead', 'viewer']);

export async function GET(request: Request) {
  try {
    await requireMayaAgent(request, { minRole: 'viewer' });
    const agents = await listAgents(false);
    return ok(agents);
  } catch (error) {
    return adminFail(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireMayaAgent(request, { minRole: 'lead' });
    const body = (await readJson(request)) || {};
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const displayName =
      typeof body.display_name === 'string' ? body.display_name.trim() : null;
    const role = ROLES.has(body.role) ? body.role : 'agent';

    if (!email) return fail('validation_failed', 'email is required.');

    const adminRow = await queryOne<{ user_id: string; email: string }>(
      `SELECT user_id, email FROM admin_users WHERE lower(email) = ? LIMIT 1`,
      [email],
    );
    if (!adminRow) {
      return fail(
        'validation_failed',
        'User must exist in admin_users before becoming a Maya agent.',
      );
    }

    const agent = await createAgent({
      userId: adminRow.user_id,
      email: adminRow.email,
      displayName,
      role,
    });
    return ok(agent, 201);
  } catch (error) {
    return adminFail(error);
  }
}

/** Allow first agent bootstrap when table is empty (admin only). */
export async function PUT(request: Request) {
  try {
    const admin = await requireAdmin(request);
    const existing = await listAgents(false);
    if (existing.length > 0) {
      return fail('validation_failed', 'Bootstrap only allowed when no agents exist.');
    }
    const agent = await createAgent({
      userId: admin.userId,
      email: admin.email,
      displayName: admin.email.split('@')[0],
      role: 'lead',
    });
    return ok(agent, 201);
  } catch (error) {
    return adminFail(error);
  }
}
