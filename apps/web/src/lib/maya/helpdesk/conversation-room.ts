import { DurableObject } from 'cloudflare:workers';
import type { RealtimeClientEvent, RealtimeRole, RealtimeServerEvent } from './realtime-types';
import { parseRealtimeClientEvent } from './realtime-types';

const TYPING_TTL_MS = 4000;

type Env = {
  MAYA_CONVERSATION_ROOM: DurableObjectNamespace;
};

type TypingState = {
  role: RealtimeRole;
  expiresAt: number;
};

export class MayaConversationRoom extends DurableObject<Env> {
  private typingByRole = new Map<RealtimeRole, TypingState>();

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const role = url.searchParams.get('role');
    const conversationId = url.searchParams.get('conversation_id')?.trim() ?? '';

    if (role !== 'visitor' && role !== 'agent') {
      return new Response('Invalid role', { status: 400 });
    }
    if (!conversationId) {
      return new Response('conversation_id is required', { status: 400 });
    }
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket upgrade', { status: 426 });
    }

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];

    this.ctx.acceptWebSocket(server, [role, conversationId]);

    const connected: RealtimeServerEvent = {
      type: 'connected',
      role,
      conversation_id: conversationId,
    };
    server.send(JSON.stringify(connected));

    return new Response(null, { status: 101, webSocket: client });
  }

  /** RPC: broadcast a server event to every socket in the room. */
  async publish(event: RealtimeServerEvent): Promise<void> {
    this.broadcast(event);
  }

  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer): Promise<void> {
    const tags = this.ctx.getTags(ws);
    const role = tags.find((tag) => tag === 'visitor' || tag === 'agent') as RealtimeRole | undefined;
    if (!role) return;

    const text = typeof message === 'string' ? message : new TextDecoder().decode(message);
    const event = parseRealtimeClientEvent(text);
    if (!event) return;

    if (event.type === 'ping') {
      ws.send(JSON.stringify({ type: 'pong' } satisfies RealtimeServerEvent));
      return;
    }

    if (event.type === 'typing') {
      this.setTyping(role, Boolean(event.is_typing));
      return;
    }

    if (event.type === 'read') {
      this.broadcast(
        {
          type: 'read',
          message_ids: event.message_ids,
          read_at: new Date().toISOString(),
          read_by: role,
        },
        ws,
      );
    }
  }

  async webSocketClose(ws: WebSocket): Promise<void> {
    const tags = this.ctx.getTags(ws);
    const role = tags.find((tag) => tag === 'visitor' || tag === 'agent') as RealtimeRole | undefined;
    if (role) {
      this.typingByRole.delete(role);
      this.broadcast({ type: 'typing', role, is_typing: false }, ws);
    }
  }

  async alarm(): Promise<void> {
    const now = Date.now();
    for (const [role, state] of this.typingByRole.entries()) {
      if (state.expiresAt <= now) {
        this.typingByRole.delete(role);
        this.broadcast({ type: 'typing', role, is_typing: false });
      }
    }
    await this.scheduleTypingAlarm();
  }

  private setTyping(role: RealtimeRole, isTyping: boolean): void {
    if (!isTyping) {
      this.typingByRole.delete(role);
      this.broadcast({ type: 'typing', role, is_typing: false });
      return;
    }

    this.typingByRole.set(role, { role, expiresAt: Date.now() + TYPING_TTL_MS });
    this.broadcast({ type: 'typing', role, is_typing: true });
    void this.scheduleTypingAlarm();
  }

  private async scheduleTypingAlarm(): Promise<void> {
    const soonest = [...this.typingByRole.values()]
      .map((state) => state.expiresAt)
      .sort((a, b) => a - b)[0];
    if (!soonest) {
      await this.ctx.storage.deleteAlarm();
      return;
    }
    await this.ctx.storage.setAlarm(soonest);
  }

  private broadcast(event: RealtimeServerEvent, except?: WebSocket): void {
    const payload = JSON.stringify(event);
    for (const ws of this.ctx.getWebSockets()) {
      if (except && ws === except) continue;
      try {
        ws.send(payload);
      } catch {
        // Ignore broken sockets; hibernation cleanup handles the rest.
      }
    }
  }
}
