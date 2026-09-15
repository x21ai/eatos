import { fail, ok, readJson } from '@/lib/api';
import { adminFail } from '@/lib/admin/guard';
import { requireMayaAgent } from '@/lib/maya/helpdesk/guard';
import {
  appendMessage,
  autoAssignConversation,
  getConversationDetail,
  updateConversation,
} from '@/lib/maya/helpdesk/store';
import type { ConversationStatus } from '@/lib/maya/helpdesk/types';

const STATUSES = new Set<ConversationStatus>(['open', 'pending', 'resolved']);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireMayaAgent(request, { minRole: 'viewer' });
    const { id } = await params;
    const detail = await getConversationDetail(id);
    if (!detail) return fail('not_found', 'Conversation not found.', 404);
    return ok(detail);
  } catch (error) {
    return adminFail(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const ctx = await requireMayaAgent(request, { minRole: 'agent' });
    const { id } = await params;
    const body = (await readJson(request)) || {};

    const patch: Parameters<typeof updateConversation>[1] = {};

    if (typeof body.status === 'string' && STATUSES.has(body.status as ConversationStatus)) {
      patch.status = body.status as ConversationStatus;
    }
    if (body.assigned_agent_id === null) {
      patch.assigned_agent_id = null;
    } else if (typeof body.assigned_agent_id === 'string') {
      patch.assigned_agent_id = body.assigned_agent_id;
    }
    if (body.assign_to_me === true) {
      patch.assigned_agent_id = ctx.agent.id;
      if (!patch.status) patch.status = 'pending';
    }
    if (body.auto_assign === true) {
      const agent = await autoAssignConversation(id);
      return ok({ assigned_agent: agent });
    }
    if (['low', 'normal', 'high'].includes(body.priority)) {
      patch.priority = body.priority;
    }
    if (body.visitor_email !== undefined) {
      patch.visitor_email = body.visitor_email ? String(body.visitor_email) : null;
    }
    if (body.visitor_name !== undefined) {
      patch.visitor_name = body.visitor_name ? String(body.visitor_name) : null;
    }

    const updated = await updateConversation(id, patch);
    if (!updated) return fail('not_found', 'Conversation not found or no changes.', 404);
    return ok(updated);
  } catch (error) {
    return adminFail(error);
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const ctx = await requireMayaAgent(request, { minRole: 'agent' });
    const { id } = await params;
    const body = (await readJson(request)) || {};
    const messageText = typeof body.message === 'string' ? body.message.trim() : '';
    if (!messageText || messageText.length > 8000) {
      return fail('validation_failed', 'message is required (max 8000 characters).');
    }

    const articleSlugs = Array.isArray(body.article_slugs)
      ? body.article_slugs.filter((s: unknown) => typeof s === 'string')
      : [];

    const message = await appendMessage({
      conversationId: id,
      role: 'agent',
      bodyText: messageText,
      articleSlugs,
      senderAgentId: ctx.agent.id,
    });

    await updateConversation(id, {
      assigned_agent_id: ctx.agent.id,
      status: 'pending',
    });

    return ok(message);
  } catch (error) {
    return adminFail(error);
  }
}
