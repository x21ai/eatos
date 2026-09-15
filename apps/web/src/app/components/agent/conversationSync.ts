const VISITOR_KEY = 'maya_visitor_id';
const TRACE_KEY = 'maya_trace_id';

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
  return id;
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

/** Fire-and-forget sync to the helpdesk inbox. Never throws to callers. */
export async function syncConversation(opts: SyncOpts): Promise<void> {
  try {
    const [visitorId, traceId] = await Promise.all([
      ensureVisitorId(),
      Promise.resolve(ensureTraceId()),
    ]);
    const pageUrl = typeof window !== 'undefined' ? window.location.href : null;
    const pageTitle = typeof document !== 'undefined' ? document.title : null;

    await fetch('/api/support/conversations', {
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
  } catch {
    // inbox sync is best-effort; chat must keep working offline
  }
}
