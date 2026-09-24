import type { ConversationStatus, MayaMessage } from './types';
import type { MayaConversationRoom } from './conversation-room';
import type { RealtimeAssignedAgent, RealtimeServerEvent } from './realtime-types';
import { toRealtimeMessage } from './realtime-types';

type ConversationRoomBinding = DurableObjectNamespace<MayaConversationRoom>;

async function resolveConversationRoomBinding(): Promise<ConversationRoomBinding | null> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const { env } = getCloudflareContext();
    const binding = (env as { MAYA_CONVERSATION_ROOM?: ConversationRoomBinding })
      .MAYA_CONVERSATION_ROOM;
    return binding ?? null;
  } catch {
    return null;
  }
}

export async function getConversationRoomStub(conversationId: string) {
  const binding = await resolveConversationRoomBinding();
  if (!binding) return null;
  return binding.getByName(conversationId);
}

export async function publishConversationEvent(
  conversationId: string,
  event: RealtimeServerEvent,
): Promise<void> {
  try {
    const stub = await getConversationRoomStub(conversationId);
    if (!stub) return;
    await stub.publish(event);
  } catch (error) {
    console.warn('maya realtime publish failed', error);
  }
}

export async function publishConversationMessage(
  conversationId: string,
  message: MayaMessage,
): Promise<void> {
  await publishConversationEvent(conversationId, {
    type: 'message',
    message: toRealtimeMessage(message),
  });
}

export async function publishConversationMeta(
  conversationId: string,
  meta: {
    status?: ConversationStatus;
    assigned_agent?: RealtimeAssignedAgent | null;
  },
): Promise<void> {
  await publishConversationEvent(conversationId, {
    type: 'meta',
    status: meta.status,
    assigned_agent: meta.assigned_agent,
  });
}

export async function forwardConversationWebSocket(
  conversationId: string,
  request: Request,
  role: 'visitor' | 'agent',
): Promise<Response | null> {
  const stub = await getConversationRoomStub(conversationId);
  if (!stub) return null;

  const url = new URL(request.url);
  url.searchParams.set('role', role);
  url.searchParams.set('conversation_id', conversationId);

  return stub.fetch(
    new Request(url.toString(), {
      headers: request.headers,
    }),
  );
}
