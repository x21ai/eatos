import { fail, ok, readJson } from '@/lib/api';
import { adminFail } from '@/lib/admin/guard';
import { requireMayaAgent } from '@/lib/maya/helpdesk/guard';
import {
  getConversationDetail,
  listUnreadMessageIds,
  markMessagesRead,
} from '@/lib/maya/helpdesk/store';
import { publishConversationEvent } from '@/lib/maya/helpdesk/realtime';

/** Agent marks visitor messages as read. */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireMayaAgent(request, { minRole: 'viewer' });
    const { id } = await params;
    const body = (await readJson(request)) || {};
    const messageIds = Array.isArray(body.message_ids)
      ? body.message_ids.filter((mid: unknown) => typeof mid === 'string')
      : [];

    const detail = await getConversationDetail(id);
    if (!detail) return fail('not_found', 'Conversation not found.', 404);

    const ids =
      messageIds.length > 0
        ? messageIds
        : await listUnreadMessageIds({ conversationId: detail.id, readBy: 'agent' });

    const updated = await markMessagesRead({
      conversationId: detail.id,
      messageIds: ids,
      readBy: 'agent',
    });

    const readAt = updated.find((m) => m.read_at)?.read_at ?? new Date().toISOString();
    await publishConversationEvent(detail.id, {
      type: 'read',
      message_ids: updated.map((m) => m.id),
      read_at: readAt,
      read_by: 'agent',
    });

    return ok({ message_ids: updated.map((m) => m.id), read_at: readAt });
  } catch (error) {
    return adminFail(error);
  }
}
