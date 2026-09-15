import type { MayaMessage } from './types';

/** Messages the public widget should surface (human agent replies only). */
export function filterAgentMessagesForVisitor(messages: MayaMessage[]): MayaMessage[] {
  return messages.filter((m) => m.role === 'agent');
}

/** Pick the latest message id from a batch for cursor-based polling. */
export function latestMessageId(messages: MayaMessage[]): string | null {
  if (!messages.length) return null;
  return messages[messages.length - 1]?.id ?? null;
}
