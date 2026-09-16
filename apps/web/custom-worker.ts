// Custom Cloudflare Worker entry: OpenNext fetch handler + Maya realtime DO.
// @ts-ignore `.open-next/worker.js` is generated at build time
import { default as handler } from './.open-next/worker.js';

export { MayaConversationRoom } from './src/lib/maya/helpdesk/conversation-room';

export default {
  fetch: handler.fetch,
} satisfies ExportedHandler<CloudflareEnv>;
