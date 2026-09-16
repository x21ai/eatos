import { fail, ok, readJson, newId } from '@/lib/api';
import {
  appendMessage,
  autoAssignConversation,
  findAgentById,
  upsertConversation,
} from '@/lib/maya/helpdesk/store';
import { publishConversationMessage, publishConversationMeta } from '@/lib/maya/helpdesk/realtime';
import type { ConversationStatus, MessageRole } from '@/lib/maya/helpdesk/types';

const STATUSES = new Set<ConversationStatus>(['open', 'pending', 'resolved']);
const ROLES = new Set<MessageRole>(['visitor', 'agent', 'maya']);

function articleSlugsFromSources(sources: unknown): string[] {
  if (!Array.isArray(sources)) return [];
  return sources
    .map((s) => (s && typeof s === 'object' ? (s as { slug?: string }).slug : null))
    .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0);
}

/** Public endpoint: visitor chat syncs conversation threads for the agent inbox. */
export async function POST(request: Request) {
  const body = (await readJson(request)) || {};
  const traceId =
    typeof body.trace_id === 'string' && body.trace_id.trim()
      ? body.trace_id.trim().slice(0, 80)
      : '';
  const visitorId =
    typeof body.visitor_id === 'string' && body.visitor_id.trim()
      ? body.visitor_id.trim().slice(0, 80)
      : '';
  const messageText = typeof body.message === 'string' ? body.message.trim() : '';
  const role = ROLES.has(body.role) ? body.role : 'visitor';

  if (!traceId) return fail('validation_failed', 'trace_id is required.');
  if (!visitorId) return fail('validation_failed', 'visitor_id is required.');
  if (!messageText || messageText.length > 8000) {
    return fail('validation_failed', 'message is required (max 8000 characters).');
  }

  const pageUrl =
    typeof body.page_url === 'string' ? body.page_url.trim().slice(0, 500) : null;
  const pageTitle =
    typeof body.page_title === 'string' ? body.page_title.trim().slice(0, 200) : null;
  const visitorEmail =
    typeof body.visitor_email === 'string' ? body.visitor_email.trim().slice(0, 200) : null;
  const visitorName =
    typeof body.visitor_name === 'string' ? body.visitor_name.trim().slice(0, 120) : null;
  const subject = typeof body.subject === 'string' ? body.subject.trim().slice(0, 200) : null;
  const articleSlugs = articleSlugsFromSources(body.sources);
  const escalate = Boolean(body.escalate);
  const status =
    typeof body.status === 'string' && STATUSES.has(body.status as ConversationStatus)
      ? (body.status as ConversationStatus)
      : escalate
        ? 'pending'
        : undefined;

  try {
    const conversation = await upsertConversation({
      traceId,
      visitorId,
      visitorEmail,
      visitorName,
      pageUrl,
      pageTitle,
      subject: subject || (messageText.length > 80 ? `${messageText.slice(0, 77)}…` : messageText),
      articleSlugs,
      metadata: {
        seed_context: body.seed_context ?? null,
        user_agent: request.headers.get('user-agent')?.slice(0, 200) ?? null,
      },
      status,
    });

    const message = await appendMessage({
      conversationId: conversation.id,
      role,
      bodyText: messageText,
      articleSlugs,
      metadata: { page_url: pageUrl, page_title: pageTitle },
    });

    let assigned = null;
    if (escalate && !conversation.assigned_agent_id) {
      assigned = await autoAssignConversation(conversation.id);
    }

    await publishConversationMessage(conversation.id, message);

    const effectiveAgentId = assigned?.id ?? conversation.assigned_agent_id;
    if (assigned || status) {
      let assignedAgent = null;
      if (effectiveAgentId) {
        const agent = await findAgentById(effectiveAgentId);
        if (agent) {
          assignedAgent = { display_name: agent.display_name, email: agent.email };
        }
      }
      await publishConversationMeta(conversation.id, {
        status: status ?? (assigned ? 'pending' : conversation.status),
        assigned_agent: assignedAgent,
      });
    }

    return ok({
      conversation_id: conversation.id,
      message_id: message.id,
      assigned_agent_id: assigned?.id ?? conversation.assigned_agent_id,
      status: status ?? conversation.status,
    });
  } catch (error) {
    console.error('support conversation sync failed', error);
    return fail('sync_failed', 'Could not sync conversation.', 503);
  }
}

/** Bootstrap a visitor session id when localStorage is empty. */
export async function GET() {
  return ok({ visitor_id: newId('mvis') });
}
