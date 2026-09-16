import { fail } from '@/lib/api';
import { getConversationByTraceId } from '@/lib/maya/helpdesk/store';
import { forwardConversationWebSocket } from '@/lib/maya/helpdesk/realtime';

/** WebSocket upgrade for visitor widget realtime channel. */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ traceId: string }> },
) {
  const { traceId } = await params;
  const url = new URL(request.url);
  const visitorId = (url.searchParams.get('visitor_id') || '').trim().slice(0, 80);

  if (!traceId?.trim()) return fail('validation_failed', 'trace_id is required.');
  if (!visitorId) return fail('validation_failed', 'visitor_id is required.');
  if (request.headers.get('Upgrade')?.toLowerCase() !== 'websocket') {
    return fail('validation_failed', 'WebSocket upgrade required.', 426);
  }

  const conversation = await getConversationByTraceId(traceId.trim());
  if (!conversation) {
    return fail('not_found', 'Conversation not found.', 404);
  }
  if (conversation.visitor_id !== visitorId) {
    return fail('forbidden', 'Visitor session does not match this conversation.', 403);
  }

  const response = await forwardConversationWebSocket(conversation.id, request, 'visitor');
  if (!response) {
    return fail('realtime_unavailable', 'Realtime transport is unavailable.', 503);
  }
  return response;
}
