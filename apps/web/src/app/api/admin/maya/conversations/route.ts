import { fail, ok } from '@/lib/api';
import { adminFail } from '@/lib/admin/guard';
import { requireMayaAgent } from '@/lib/maya/helpdesk/guard';
import { listConversations } from '@/lib/maya/helpdesk/store';
import type { ConversationStatus } from '@/lib/maya/helpdesk/types';

const STATUSES = new Set<ConversationStatus>(['open', 'pending', 'resolved']);

export async function GET(request: Request) {
  try {
    const ctx = await requireMayaAgent(request, { minRole: 'viewer' });
    const url = new URL(request.url);
    const status = (url.searchParams.get('status') || 'all').trim().toLowerCase();
    const assigned = (url.searchParams.get('assigned') || 'all').trim().toLowerCase();
    const limit = Math.min(
      Math.max(parseInt(url.searchParams.get('limit') || '50', 10) || 50, 1),
      100,
    );

    if (status !== 'all' && !STATUSES.has(status as ConversationStatus)) {
      return fail('validation_failed', 'Invalid status filter.');
    }

    let assignedAgentId: string | 'unassigned' | 'all' = 'all';
    if (assigned === 'unassigned') assignedAgentId = 'unassigned';
    else if (assigned === 'me') assignedAgentId = ctx.agent.id;
    else if (assigned && assigned !== 'all') assignedAgentId = assigned;

    const rows = await listConversations({
      status: status as ConversationStatus | 'all',
      assignedAgentId,
      limit,
    });
    if (rows === null) return fail('database_unavailable', 'Database unavailable.', 503);

    return ok({ conversations: rows, agent: ctx.agent });
  } catch (error) {
    return adminFail(error);
  }
}
