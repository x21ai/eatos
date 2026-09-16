import { fail, ok, readJson } from '@/lib/api';
import {
  getConversationByTraceId,
  listUnreadMessageIds,
  markMessagesRead,
} from '@/lib/maya/helpdesk/store';
import { publishConversationEvent } from '@/lib/maya/helpdesk/realtime';

/** Visitor marks agent/maya messages as read. */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ traceId: string }> },
) {
  const { traceId } = await params;
  const body = (await readJson(request)) || {};
  const visitorId =
    typeof body.visitor_id === 'string' ? body.visitor_id.trim().slice(0, 80) : '';
  const messageIds = Array.isArray(body.message_ids)
    ? body.message_ids.filter((id: unknown) => typeof id === 'string')
    : [];

  if (!traceId?.trim()) return fail('validation_failed', 'trace_id is required.');
  if (!visitorId) return fail('validation_failed', 'visitor_id is required.');

  const conversation = await getConversationByTraceId(traceId.trim());
  if (!conversation) return fail('not_found', 'Conversation not found.', 404);
  if (conversation.visitor_id !== visitorId) {
    return fail('forbidden', 'Visitor session does not match this conversation.', 403);
  }

  const ids =
    messageIds.length > 0
      ? messageIds
      : await listUnreadMessageIds({ conversationId: conversation.id, readBy: 'visitor' });

  const updated = await markMessagesRead({
    conversationId: conversation.id,
    messageIds: ids,
    readBy: 'visitor',
  });

  const readAt = updated.find((m) => m.read_at)?.read_at ?? new Date().toISOString();
  await publishConversationEvent(conversation.id, {
    type: 'read',
    message_ids: updated.map((m) => m.id),
    read_at: readAt,
    read_by: 'visitor',
  });

  return ok({ message_ids: updated.map((m) => m.id), read_at: readAt });
}
