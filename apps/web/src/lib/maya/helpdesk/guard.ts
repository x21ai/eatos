import { AdminAuthError, requireAdmin, type AdminUser } from '@/lib/admin/guard';
import { findAgentByUserId } from './store';
import type { MayaAgent } from './types';

export type MayaAgentContext = AdminUser & { agent: MayaAgent };

export async function requireMayaAgent(
  request: Request,
  opts?: { minRole?: 'viewer' | 'agent' | 'lead' },
): Promise<MayaAgentContext> {
  const admin = await requireAdmin(request);
  const agent = await findAgentByUserId(admin.userId);
  if (!agent) {
    throw new AdminAuthError(
      403,
      'not_maya_agent',
      'This account is not registered as a Maya helpdesk agent.',
    );
  }

  const minRole = opts?.minRole ?? 'viewer';
  const rank = { viewer: 0, agent: 1, lead: 2 };
  if (rank[agent.role] < rank[minRole]) {
    throw new AdminAuthError(
      403,
      'insufficient_maya_role',
      'Your helpdesk role cannot perform this action.',
    );
  }

  return { ...admin, agent };
}
