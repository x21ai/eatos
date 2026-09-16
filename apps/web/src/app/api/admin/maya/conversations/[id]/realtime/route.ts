import { fail } from '@/lib/api';
import { adminFail } from '@/lib/admin/guard';
import { requireMayaAgent } from '@/lib/maya/helpdesk/guard';
import { getConversationDetail } from '@/lib/maya/helpdesk/store';
import { forwardConversationWebSocket } from '@/lib/maya/helpdesk/realtime';

/** WebSocket upgrade for admin inbox thread realtime channel. */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireMayaAgent(request, { minRole: 'viewer' });
    const { id } = await params;

    if (request.headers.get('Upgrade')?.toLowerCase() !== 'websocket') {
      return fail('validation_failed', 'WebSocket upgrade required.', 426);
    }

    const detail = await getConversationDetail(id);
    if (!detail) return fail('not_found', 'Conversation not found.', 404);

    const response = await forwardConversationWebSocket(detail.id, request, 'agent');
    if (!response) {
      return fail('realtime_unavailable', 'Realtime transport is unavailable.', 503);
    }
    return response;
  } catch (error) {
    return adminFail(error);
  }
}
