import { fail, ok } from '@/lib/api';
import {
  findAgentById,
  getConversationByTraceId,
  listMessagesAfter,
} from '@/lib/maya/helpdesk/store';
import {
  filterAgentMessagesForVisitor,
  latestMessageId,
} from '@/lib/maya/helpdesk/visitor-poll';

/** Public polling fallback for human-agent replies. */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ traceId: string }> },
) {
  const { traceId } = await params;
  const url = new URL(request.url);
  const visitorId = (url.searchParams.get('visitor_id') || '').trim().slice(0, 80);
  const after = (url.searchParams.get('after') || '').trim().slice(0, 80) || null;

  if (!traceId?.trim()) return fail('validation_failed', 'trace_id is required.');
  if (!visitorId) return fail('validation_failed', 'visitor_id is required.');

  const conversation = await getConversationByTraceId(traceId.trim());
  if (!conversation) {
    return ok({
      conversation_id: null,
      status: null,
      assigned_agent: null,
      messages: [],
      latest_message_id: after,
    });
  }
  if (conversation.visitor_id !== visitorId) {
    return fail('forbidden', 'Visitor session does not match this conversation.', 403);
  }

  const allMessages = await listMessagesAfter(conversation.id, null);
  const newMessages = after ? await listMessagesAfter(conversation.id, after) : allMessages;
  const agentMessages = filterAgentMessagesForVisitor(newMessages);

  let assignedAgent: { display_name: string | null; email: string } | null = null;
  if (conversation.assigned_agent_id) {
    const agent = await findAgentById(conversation.assigned_agent_id);
    if (agent) {
      assignedAgent = { display_name: agent.display_name, email: agent.email };
    }
  }

  return ok({
    conversation_id: conversation.id,
    status: conversation.status,
    assigned_agent: assignedAgent,
    messages: agentMessages.map((message) => ({
      id: message.id,
      role: message.role,
      body_text: message.body_text,
      article_slugs: message.article_slugs,
      read_at: message.read_at,
      created_at: message.created_at,
    })),
    latest_message_id: latestMessageId(allMessages) ?? after,
  });
}
