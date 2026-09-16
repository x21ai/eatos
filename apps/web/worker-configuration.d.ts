import type { MayaConversationRoom } from './src/lib/maya/helpdesk/conversation-room';

declare global {
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
