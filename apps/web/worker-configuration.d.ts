import type { MayaConversationRoom } from './src/lib/maya/helpdesk/conversation-room';

declare global {
  interface DurableObjectStub {
    fetch(request: Request): Promise<Response>;
  }

  interface DurableObjectNamespace<T = unknown> {
    getByName(name: string): DurableObjectStub & T;
  }

  interface DurableObjectStorage {
    setAlarm(scheduledTime: number): Promise<void>;
    deleteAlarm(): Promise<void>;
  }

  interface DurableObjectState {
    storage: DurableObjectStorage;
    acceptWebSocket(socket: WebSocket, tags?: string[]): void;
    getTags(socket: WebSocket): string[];
    getWebSockets(): WebSocket[];
  }

  interface R2Object {
    key: string;
    size: number;
    uploaded?: Date;
    etag?: string;
    httpMetadata?: { contentType?: string };
  }

  interface R2Bucket {
    head(key: string): Promise<R2Object | null>;
    get(
      key: string,
      options?: { range?: { offset: number; length: number } },
    ): Promise<(R2Object & { body: BodyInit | null }) | null>;
    put(key: string, value: BodyInit, options?: unknown): Promise<unknown>;
    list(options?: {
      prefix?: string;
      limit?: number;
      cursor?: string;
    }): Promise<{
      objects: R2Object[];
      truncated: boolean;
      cursor?: string;
    }>;
  }

  interface Fetcher {
    fetch(request: Request): Promise<Response>;
  }

  class WebSocketPair {
    0: WebSocket;
    1: WebSocket;
  }

  interface ResponseInit {
    webSocket?: WebSocket;
  }

  interface CloudflareEnv {
    DB: D1Database;
    MAYA_CONVERSATION_ROOM: DurableObjectNamespace<MayaConversationRoom>;
    NEXT_INC_CACHE_R2_BUCKET: R2Bucket;
    MEDIA_R2: R2Bucket;
    ASSETS: Fetcher;
    BETTER_AUTH_URL: string;
    BETTER_AUTH_TRUSTED_ORIGINS: string;
    NEXT_PUBLIC_CREATE_HOST: string;
  }
}

export {};
