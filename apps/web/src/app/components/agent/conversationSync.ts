const VISITOR_KEY = 'maya_visitor_id';
const TRACE_KEY = 'maya_trace_id';
const CONVERSATION_KEY = 'maya_conversation_id';
const LAST_AGENT_MSG_KEY = 'maya_last_agent_msg';

function readStorage(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // ignore quota / private mode
  }
}

export async function ensureVisitorId(): Promise<string> {
  const existing = readStorage(VISITOR_KEY);
  if (existing) return existing;

  try {
    const res = await fetch('/api/support/conversations');
    const json = await res.json();
    const id = json?.data?.visitor_id;
    if (typeof id === 'string' && id) {
      writeStorage(VISITOR_KEY, id);
      return id;
    }
  } catch {
    // fall through
  }

  const fallback =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? `mvis_${crypto.randomUUID()}`
      : `mvis_${Date.now()}`;
  writeStorage(VISITOR_KEY, fallback);
  return fallback;
}

export function ensureTraceId(): string {
  const existing = readStorage(TRACE_KEY);
  if (existing) return existing;
  const id =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? `maya_${crypto.randomUUID()}`
      : `maya_${Date.now()}`;
  writeStorage(TRACE_KEY, id);
  return id;
}

export function resetTraceId(): string {
  const id =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? `maya_${crypto.randomUUID()}`
      : `maya_${Date.now()}`;
  writeStorage(TRACE_KEY, id);
  writeStorage(CONVERSATION_KEY, '');
  writeStorage(LAST_AGENT_MSG_KEY, '');
  return id;
}

export function getLastAgentMessageId(): string | null {
  return readStorage(LAST_AGENT_MSG_KEY);
}

export function setLastAgentMessageId(id: string) {
  writeStorage(LAST_AGENT_MSG_KEY, id);
}

type SyncOpts = {
  message: string;
  role?: 'visitor' | 'maya';
  sources?: { slug?: string }[];
  escalate?: boolean;
  seedContext?: string | null;
  visitorEmail?: string | null;
  visitorName?: string | null;
};

type SyncResult = {
  conversation_id?: string | null;
  assigned_agent_id?: string | null;
  status?: string | null;
};

/** Fire-and-forget sync to the helpdesk inbox. Never throws to callers. */
export async function syncConversation(opts: SyncOpts): Promise<SyncResult | null> {
  try {
    const [visitorId, traceId] = await Promise.all([
      ensureVisitorId(),
      Promise.resolve(ensureTraceId()),
    ]);
    const pageUrl = typeof window !== 'undefined' ? window.location.href : null;
    const pageTitle = typeof document !== 'undefined' ? document.title : null;

    const res = await fetch('/api/support/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trace_id: traceId,
        visitor_id: visitorId,
        message: opts.message,
        role: opts.role ?? 'visitor',
        sources: opts.sources ?? [],
        escalate: Boolean(opts.escalate),
        page_url: pageUrl,
        page_title: pageTitle,
        seed_context: opts.seedContext ?? null,
        visitor_email: opts.visitorEmail ?? null,
        visitor_name: opts.visitorName ?? null,
      }),
    });
    const json = await res.json();
    const data = json?.data as SyncResult | undefined;
    if (data?.conversation_id) {
      writeStorage(CONVERSATION_KEY, data.conversation_id);
    }
    return data ?? null;
  } catch {
    return null;
  }
}

export type VisitorPollMessage = {
  id: string;
  body_text: string;
  article_slugs?: string[];
  created_at: string;
};

export type VisitorPollResult = {
  conversation_id: string | null;
  status: string | null;
  assigned_agent: { display_name: string | null; email: string } | null;
  messages: VisitorPollMessage[];
  latest_message_id: string | null;
};

/** Poll for new human-agent replies. Returns null on network failure. */
export async function pollAgentMessages(after?: string | null): Promise<VisitorPollResult | null> {
  try {
    const [visitorId, traceId] = await Promise.all([
      ensureVisitorId(),
      Promise.resolve(ensureTraceId()),
    ]);
    const params = new URLSearchParams({ visitor_id: visitorId });
    const cursor = after ?? getLastAgentMessageId();
    if (cursor) params.set('after', cursor);

    const res = await fetch(
      `/api/support/conversations/${encodeURIComponent(traceId)}/messages?${params}`,
    );
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data as VisitorPollResult) ?? null;
  } catch {
    return null;
  }
}
