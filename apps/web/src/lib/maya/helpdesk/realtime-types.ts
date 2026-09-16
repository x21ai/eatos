import type { ConversationStatus, MessageRole } from './types';

export type RealtimeRole = 'visitor' | 'agent';

export type RealtimeMessagePayload = {
  id: string;
  conversation_id: string;
  role: MessageRole;
  body_text: string;
  article_slugs?: string[];
  sender_agent_id?: string | null;
  created_at: string;
  read_at?: string | null;
};

export type RealtimeAssignedAgent = {
  display_name: string | null;
  email: string;
};

/** Events broadcast from the conversation room DO to connected clients. */
export type RealtimeServerEvent =
  | { type: 'connected'; role: RealtimeRole; conversation_id: string }
  | { type: 'message'; message: RealtimeMessagePayload }
  | { type: 'typing'; role: RealtimeRole; is_typing: boolean }
  | { type: 'read'; message_ids: string[]; read_at: string; read_by: RealtimeRole }
  | {
      type: 'meta';
      status?: ConversationStatus;
      assigned_agent?: RealtimeAssignedAgent | null;
    }
  | { type: 'pong' };

/** Events sent from clients to the conversation room DO. */
export type RealtimeClientEvent =
  | { type: 'typing'; is_typing: boolean }
  | { type: 'read'; message_ids: string[] }
  | { type: 'ping' };

export type RealtimeConnectionStatus =
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'disconnected'
  | 'fallback';

export function parseRealtimeServerEvent(raw: string): RealtimeServerEvent | null {
  try {
    const data = JSON.parse(raw) as RealtimeServerEvent;
    if (!data || typeof data !== 'object' || typeof data.type !== 'string') return null;
    return data;
  } catch {
    return null;
  }
}

export function parseRealtimeClientEvent(raw: string): RealtimeClientEvent | null {
  try {
    const data = JSON.parse(raw) as RealtimeClientEvent;
    if (!data || typeof data !== 'object' || typeof data.type !== 'string') return null;
    return data;
  } catch {
    return null;
  }
}

export function toRealtimeMessage(message: {
  id: string;
  conversation_id: string;
  role: MessageRole;
  body_text: string;
  article_slugs?: string[];
  sender_agent_id?: string | null;
  created_at: string;
  read_at?: string | null;
}): RealtimeMessagePayload {
  return {
    id: message.id,
    conversation_id: message.conversation_id,
    role: message.role,
    body_text: message.body_text,
    article_slugs: message.article_slugs,
    sender_agent_id: message.sender_agent_id ?? null,
    created_at: message.created_at,
    read_at: message.read_at ?? null,
  };
}
