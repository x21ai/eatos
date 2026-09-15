import { newId } from '@/lib/api';
import { execute, parseJson, queryAll, queryOne } from '@/lib/db/client';
import type {
  ConversationDetail,
  ConversationStatus,
  ConversationSummary,
  MayaAgent,
  MayaAgentRole,
  MayaCannedReply,
  MayaConversation,
  MayaMessage,
  MessageRole,
} from './types';

const STATUSES = new Set<ConversationStatus>(['open', 'pending', 'resolved']);
const AGENT_ROLES = new Set<MayaAgentRole>(['agent', 'lead', 'viewer']);
const MESSAGE_ROLES = new Set<MessageRole>(['visitor', 'agent', 'maya']);

function parseSlugs(value: unknown): string[] {
  const parsed = parseJson<string[]>(value, []);
  return Array.isArray(parsed) ? parsed.filter((s) => typeof s === 'string') : [];
}

function parseMeta(value: unknown): Record<string, unknown> {
  return parseJson<Record<string, unknown>>(value, {});
}

function rowToAgent(row: Record<string, unknown>): MayaAgent {
  return {
    id: String(row.id),
    user_id: String(row.user_id),
    email: String(row.email),
    display_name: row.display_name ? String(row.display_name) : null,
    role: (AGENT_ROLES.has(row.role as MayaAgentRole) ? row.role : 'agent') as MayaAgentRole,
    is_active: Number(row.is_active) === 1,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

function rowToConversation(row: Record<string, unknown>): MayaConversation {
  return {
    id: String(row.id),
    trace_id: String(row.trace_id),
    visitor_id: String(row.visitor_id),
    visitor_email: row.visitor_email ? String(row.visitor_email) : null,
    visitor_name: row.visitor_name ? String(row.visitor_name) : null,
    page_url: row.page_url ? String(row.page_url) : null,
    page_title: row.page_title ? String(row.page_title) : null,
    status: (STATUSES.has(row.status as ConversationStatus) ? row.status : 'open') as ConversationStatus,
    assigned_agent_id: row.assigned_agent_id ? String(row.assigned_agent_id) : null,
    priority: (['low', 'normal', 'high'].includes(String(row.priority)) ? row.priority : 'normal') as MayaConversation['priority'],
    subject: row.subject ? String(row.subject) : null,
    article_slugs: parseSlugs(row.article_slugs),
    metadata: parseMeta(row.metadata_json),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
    resolved_at: row.resolved_at ? String(row.resolved_at) : null,
  };
}

function rowToMessage(row: Record<string, unknown>): MayaMessage {
  return {
    id: String(row.id),
    conversation_id: String(row.conversation_id),
    role: (MESSAGE_ROLES.has(row.role as MessageRole) ? row.role : 'visitor') as MessageRole,
    body_text: String(row.body_text),
    article_slugs: parseSlugs(row.article_slugs),
    sender_agent_id: row.sender_agent_id ? String(row.sender_agent_id) : null,
    metadata: parseMeta(row.metadata_json),
    created_at: String(row.created_at),
  };
}

function rowToCanned(row: Record<string, unknown>): MayaCannedReply {
  return {
    id: String(row.id),
    title: String(row.title),
    shortcut: row.shortcut ? String(row.shortcut) : null,
    body_text: String(row.body_text),
    article_slugs: parseSlugs(row.article_slugs),
    category: row.category ? String(row.category) : null,
    created_by: row.created_by ? String(row.created_by) : null,
    is_active: Number(row.is_active) === 1,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

function summaryFromRow(row: Record<string, unknown>): ConversationSummary {
  const base = rowToConversation(row);
  return {
    ...base,
    message_count: Number(row.message_count ?? 0),
    last_message_at: row.last_message_at ? String(row.last_message_at) : null,
    last_message_preview: row.last_message_preview ? String(row.last_message_preview) : null,
    assigned_agent_name: row.assigned_agent_name ? String(row.assigned_agent_name) : null,
    assigned_agent_email: row.assigned_agent_email ? String(row.assigned_agent_email) : null,
  };
}

export async function findAgentByUserId(userId: string): Promise<MayaAgent | null> {
  const row = await queryOne<Record<string, unknown>>(
    `SELECT * FROM maya_agents WHERE user_id = ? AND is_active = 1 LIMIT 1`,
    [userId],
  );
  return row ? rowToAgent(row) : null;
}

export async function findAgentById(id: string): Promise<MayaAgent | null> {
  const row = await queryOne<Record<string, unknown>>(
    `SELECT * FROM maya_agents WHERE id = ? LIMIT 1`,
    [id],
  );
  return row ? rowToAgent(row) : null;
}

export async function listAgents(activeOnly = true): Promise<MayaAgent[]> {
  const clause = activeOnly ? 'WHERE is_active = 1' : '';
  const rows = await queryAll<Record<string, unknown>>(
    `SELECT * FROM maya_agents ${clause} ORDER BY display_name, email`,
  );
  return (rows ?? []).map(rowToAgent);
}

export async function createAgent(opts: {
  userId: string;
  email: string;
  displayName?: string | null;
  role?: MayaAgentRole;
}): Promise<MayaAgent> {
  const id = newId('magent');
  const role = opts.role && AGENT_ROLES.has(opts.role) ? opts.role : 'agent';
  await execute(
    `INSERT INTO maya_agents (id, user_id, email, display_name, role)
     VALUES (?, ?, ?, ?, ?)`,
    [id, opts.userId, opts.email.toLowerCase(), opts.displayName ?? null, role],
  );
  const row = await queryOne<Record<string, unknown>>(`SELECT * FROM maya_agents WHERE id = ?`, [id]);
  if (!row) throw new Error('Failed to create agent');
  return rowToAgent(row);
}

export async function updateAgent(
  id: string,
  patch: Partial<{ display_name: string | null; role: MayaAgentRole; is_active: boolean }>,
): Promise<MayaAgent | null> {
  const sets: string[] = ["updated_at = datetime('now')"];
  const args: unknown[] = [];
  if (patch.display_name !== undefined) {
    sets.push('display_name = ?');
    args.push(patch.display_name);
  }
  if (patch.role !== undefined && AGENT_ROLES.has(patch.role)) {
    sets.push('role = ?');
    args.push(patch.role);
  }
  if (patch.is_active !== undefined) {
    sets.push('is_active = ?');
    args.push(patch.is_active ? 1 : 0);
  }
  if (sets.length === 1) return null;
  args.push(id);
  await execute(`UPDATE maya_agents SET ${sets.join(', ')} WHERE id = ?`, args);
  const row = await queryOne<Record<string, unknown>>(`SELECT * FROM maya_agents WHERE id = ?`, [id]);
  return row ? rowToAgent(row) : null;
}

export async function deleteAgent(id: string): Promise<void> {
  await execute(`UPDATE maya_agents SET is_active = 0, updated_at = datetime('now') WHERE id = ?`, [id]);
}

export async function upsertConversation(opts: {
  traceId: string;
  visitorId: string;
  visitorEmail?: string | null;
  visitorName?: string | null;
  pageUrl?: string | null;
  pageTitle?: string | null;
  subject?: string | null;
  articleSlugs?: string[];
  metadata?: Record<string, unknown>;
  status?: ConversationStatus;
}): Promise<MayaConversation> {
  const existing = await queryOne<Record<string, unknown>>(
    `SELECT * FROM maya_conversations WHERE trace_id = ? LIMIT 1`,
    [opts.traceId],
  );

  if (existing) {
    const sets = ["updated_at = datetime('now')"];
    const args: unknown[] = [];
    if (opts.visitorEmail) {
      sets.push('visitor_email = ?');
      args.push(opts.visitorEmail);
    }
    if (opts.visitorName) {
      sets.push('visitor_name = ?');
      args.push(opts.visitorName);
    }
    if (opts.pageUrl) {
      sets.push('page_url = ?');
      args.push(opts.pageUrl);
    }
    if (opts.pageTitle) {
      sets.push('page_title = ?');
      args.push(opts.pageTitle);
    }
    if (opts.subject) {
      sets.push('subject = ?');
      args.push(opts.subject);
    }
    if (opts.articleSlugs?.length) {
      sets.push('article_slugs = ?');
      args.push(JSON.stringify(opts.articleSlugs));
    }
    if (opts.metadata) {
      sets.push('metadata_json = ?');
      args.push(JSON.stringify(opts.metadata));
    }
    if (opts.status && STATUSES.has(opts.status)) {
      sets.push('status = ?');
      args.push(opts.status);
      if (opts.status === 'resolved') {
        sets.push("resolved_at = datetime('now')");
      }
    }
    args.push(existing.id);
    await execute(`UPDATE maya_conversations SET ${sets.join(', ')} WHERE id = ?`, args);
    const row = await queryOne<Record<string, unknown>>(
      `SELECT * FROM maya_conversations WHERE id = ?`,
      [existing.id],
    );
    if (!row) throw new Error('Conversation update failed');
    return rowToConversation(row);
  }

  const id = newId('mconv');
  const status = opts.status && STATUSES.has(opts.status) ? opts.status : 'open';
  await execute(
    `INSERT INTO maya_conversations (
       id, trace_id, visitor_id, visitor_email, visitor_name,
       page_url, page_title, status, subject, article_slugs, metadata_json
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      opts.traceId,
      opts.visitorId,
      opts.visitorEmail ?? null,
      opts.visitorName ?? null,
      opts.pageUrl ?? null,
      opts.pageTitle ?? null,
      status,
      opts.subject ?? null,
      opts.articleSlugs?.length ? JSON.stringify(opts.articleSlugs) : null,
      opts.metadata ? JSON.stringify(opts.metadata) : null,
    ],
  );
  const row = await queryOne<Record<string, unknown>>(`SELECT * FROM maya_conversations WHERE id = ?`, [id]);
  if (!row) throw new Error('Conversation create failed');
  return rowToConversation(row);
}

export async function getConversationByTraceId(traceId: string): Promise<MayaConversation | null> {
  const row = await queryOne<Record<string, unknown>>(
    `SELECT * FROM maya_conversations WHERE trace_id = ? LIMIT 1`,
    [traceId],
  );
  return row ? rowToConversation(row) : null;
}

export async function listMessagesAfter(
  conversationId: string,
  afterMessageId?: string | null,
): Promise<MayaMessage[]> {
  let rows: Record<string, unknown>[] | null;
  if (afterMessageId) {
    const anchor = await queryOne<Record<string, unknown>>(
      `SELECT created_at FROM maya_messages WHERE id = ? AND conversation_id = ? LIMIT 1`,
      [afterMessageId, conversationId],
    );
    if (!anchor?.created_at) {
      rows = await queryAll<Record<string, unknown>>(
        `SELECT * FROM maya_messages WHERE conversation_id = ? ORDER BY created_at ASC`,
        [conversationId],
      );
    } else {
      rows = await queryAll<Record<string, unknown>>(
        `SELECT * FROM maya_messages
         WHERE conversation_id = ? AND created_at > ?
         ORDER BY created_at ASC`,
        [conversationId, anchor.created_at],
      );
    }
  } else {
    rows = await queryAll<Record<string, unknown>>(
      `SELECT * FROM maya_messages WHERE conversation_id = ? ORDER BY created_at ASC`,
      [conversationId],
    );
  }
  return (rows ?? []).map(rowToMessage);
}

export async function appendMessage(opts: {
  conversationId: string;
  role: MessageRole;
  bodyText: string;
  articleSlugs?: string[];
  senderAgentId?: string | null;
  metadata?: Record<string, unknown>;
}): Promise<MayaMessage> {
  const id = newId('mmsg');
  await execute(
    `INSERT INTO maya_messages (
       id, conversation_id, role, body_text, article_slugs, sender_agent_id, metadata_json
     ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      opts.conversationId,
      opts.role,
      opts.bodyText.slice(0, 8000),
      opts.articleSlugs?.length ? JSON.stringify(opts.articleSlugs) : null,
      opts.senderAgentId ?? null,
      opts.metadata ? JSON.stringify(opts.metadata) : null,
    ],
  );
  await execute(
    `UPDATE maya_conversations SET updated_at = datetime('now') WHERE id = ?`,
    [opts.conversationId],
  );
  const row = await queryOne<Record<string, unknown>>(`SELECT * FROM maya_messages WHERE id = ?`, [id]);
  if (!row) throw new Error('Message create failed');
  return rowToMessage(row);
}

export async function listConversations(opts: {
  status?: ConversationStatus | 'all';
  assignedAgentId?: string | 'unassigned' | 'all';
  limit?: number;
}): Promise<ConversationSummary[]> {
  const where: string[] = [];
  const args: unknown[] = [];

  if (opts.status && opts.status !== 'all' && STATUSES.has(opts.status)) {
    where.push('c.status = ?');
    args.push(opts.status);
  }
  if (opts.assignedAgentId === 'unassigned') {
    where.push('c.assigned_agent_id IS NULL');
  } else if (opts.assignedAgentId && opts.assignedAgentId !== 'all') {
    where.push('c.assigned_agent_id = ?');
    args.push(opts.assignedAgentId);
  }

  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const limit = Math.min(Math.max(opts.limit ?? 50, 1), 100);

  const rows = await queryAll<Record<string, unknown>>(
    `SELECT c.*,
            a.display_name AS assigned_agent_name,
            a.email AS assigned_agent_email,
            COUNT(m.id) AS message_count,
            MAX(m.created_at) AS last_message_at,
            (
              SELECT body_text FROM maya_messages
              WHERE conversation_id = c.id
              ORDER BY created_at DESC LIMIT 1
            ) AS last_message_preview
       FROM maya_conversations c
       LEFT JOIN maya_agents a ON a.id = c.assigned_agent_id
       LEFT JOIN maya_messages m ON m.conversation_id = c.id
       ${clause}
       GROUP BY c.id
       ORDER BY c.updated_at DESC
       LIMIT ?`,
    [...args, limit],
  );
  return (rows ?? []).map(summaryFromRow);
}

export async function getConversationDetail(id: string): Promise<ConversationDetail | null> {
  const row = await queryOne<Record<string, unknown>>(
    `SELECT * FROM maya_conversations WHERE id = ? LIMIT 1`,
    [id],
  );
  if (!row) return null;

  const conversation = rowToConversation(row);
  const messageRows = await queryAll<Record<string, unknown>>(
    `SELECT * FROM maya_messages WHERE conversation_id = ? ORDER BY created_at ASC`,
    [id],
  );
  const messages = (messageRows ?? []).map(rowToMessage);

  let assigned_agent: MayaAgent | null = null;
  if (conversation.assigned_agent_id) {
    const agentRow = await queryOne<Record<string, unknown>>(
      `SELECT * FROM maya_agents WHERE id = ? LIMIT 1`,
      [conversation.assigned_agent_id],
    );
    assigned_agent = agentRow ? rowToAgent(agentRow) : null;
  }

  const pageHistory = new Set<string>();
  if (conversation.page_url) pageHistory.add(conversation.page_url);
  for (const msg of messages) {
    const url = msg.metadata?.page_url;
    if (typeof url === 'string' && url) pageHistory.add(url);
  }

  return {
    ...conversation,
    messages,
    assigned_agent,
    visitor_page_history: [...pageHistory],
  };
}

export async function updateConversation(
  id: string,
  patch: Partial<{
    status: ConversationStatus;
    assigned_agent_id: string | null;
    priority: 'low' | 'normal' | 'high';
    visitor_email: string | null;
    visitor_name: string | null;
  }>,
): Promise<MayaConversation | null> {
  const sets = ["updated_at = datetime('now')"];
  const args: unknown[] = [];

  if (patch.status && STATUSES.has(patch.status)) {
    sets.push('status = ?');
    args.push(patch.status);
    if (patch.status === 'resolved') {
      sets.push("resolved_at = datetime('now')");
    } else {
      sets.push('resolved_at = NULL');
    }
  }
  if (patch.assigned_agent_id !== undefined) {
    sets.push('assigned_agent_id = ?');
    args.push(patch.assigned_agent_id);
  }
  if (patch.priority && ['low', 'normal', 'high'].includes(patch.priority)) {
    sets.push('priority = ?');
    args.push(patch.priority);
  }
  if (patch.visitor_email !== undefined) {
    sets.push('visitor_email = ?');
    args.push(patch.visitor_email);
  }
  if (patch.visitor_name !== undefined) {
    sets.push('visitor_name = ?');
    args.push(patch.visitor_name);
  }

  if (sets.length === 1) return null;
  args.push(id);
  await execute(`UPDATE maya_conversations SET ${sets.join(', ')} WHERE id = ?`, args);
  const row = await queryOne<Record<string, unknown>>(`SELECT * FROM maya_conversations WHERE id = ?`, [id]);
  return row ? rowToConversation(row) : null;
}

/** Round-robin: pick the active agent with the fewest open/pending conversations. */
export async function suggestAssignee(): Promise<MayaAgent | null> {
  const row = await queryOne<Record<string, unknown>>(
    `SELECT a.*
       FROM maya_agents a
       LEFT JOIN maya_conversations c
         ON c.assigned_agent_id = a.id AND c.status IN ('open', 'pending')
      WHERE a.is_active = 1 AND a.role IN ('agent', 'lead')
      GROUP BY a.id
      ORDER BY COUNT(c.id) ASC, a.created_at ASC
      LIMIT 1`,
  );
  return row ? rowToAgent(row) : null;
}

export async function autoAssignConversation(conversationId: string): Promise<MayaAgent | null> {
  const agent = await suggestAssignee();
  if (!agent) return null;
  await updateConversation(conversationId, { assigned_agent_id: agent.id, status: 'pending' });
  return agent;
}

export async function listCannedReplies(activeOnly = true): Promise<MayaCannedReply[]> {
  const clause = activeOnly ? 'WHERE is_active = 1' : '';
  const rows = await queryAll<Record<string, unknown>>(
    `SELECT * FROM maya_canned_replies ${clause} ORDER BY category, title`,
  );
  return (rows ?? []).map(rowToCanned);
}

export async function createCannedReply(opts: {
  title: string;
  bodyText: string;
  shortcut?: string | null;
  articleSlugs?: string[];
  category?: string | null;
  createdBy?: string | null;
}): Promise<MayaCannedReply> {
  const id = newId('mcanned');
  await execute(
    `INSERT INTO maya_canned_replies (id, title, shortcut, body_text, article_slugs, category, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      opts.title,
      opts.shortcut ?? null,
      opts.bodyText,
      opts.articleSlugs?.length ? JSON.stringify(opts.articleSlugs) : null,
      opts.category ?? null,
      opts.createdBy ?? null,
    ],
  );
  const row = await queryOne<Record<string, unknown>>(`SELECT * FROM maya_canned_replies WHERE id = ?`, [id]);
  if (!row) throw new Error('Canned reply create failed');
  return rowToCanned(row);
}

export async function updateCannedReply(
  id: string,
  patch: Partial<{
    title: string;
    body_text: string;
    shortcut: string | null;
    article_slugs: string[];
    category: string | null;
    is_active: boolean;
  }>,
): Promise<MayaCannedReply | null> {
  const sets = ["updated_at = datetime('now')"];
  const args: unknown[] = [];
  if (patch.title !== undefined) {
    sets.push('title = ?');
    args.push(patch.title);
  }
  if (patch.body_text !== undefined) {
    sets.push('body_text = ?');
    args.push(patch.body_text);
  }
  if (patch.shortcut !== undefined) {
    sets.push('shortcut = ?');
    args.push(patch.shortcut);
  }
  if (patch.article_slugs !== undefined) {
    sets.push('article_slugs = ?');
    args.push(JSON.stringify(patch.article_slugs));
  }
  if (patch.category !== undefined) {
    sets.push('category = ?');
    args.push(patch.category);
  }
  if (patch.is_active !== undefined) {
    sets.push('is_active = ?');
    args.push(patch.is_active ? 1 : 0);
  }
  if (sets.length === 1) return null;
  args.push(id);
  await execute(`UPDATE maya_canned_replies SET ${sets.join(', ')} WHERE id = ?`, args);
  const row = await queryOne<Record<string, unknown>>(`SELECT * FROM maya_canned_replies WHERE id = ?`, [id]);
  return row ? rowToCanned(row) : null;
}

export async function deleteCannedReply(id: string): Promise<void> {
  await execute(
    `UPDATE maya_canned_replies SET is_active = 0, updated_at = datetime('now') WHERE id = ?`,
    [id],
  );
}
