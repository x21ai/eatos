import { describe, expect, it } from 'vitest';
import { filterAgentMessagesForVisitor, latestMessageId } from './visitor-poll';
import type { MayaMessage } from './types';

const sample = (id: string, role: MayaMessage['role']): MayaMessage => ({
  id,
  conversation_id: 'conversation-1',
  role,
  body_text: `message-${id}`,
  article_slugs: [],
  sender_agent_id: role === 'agent' ? 'agent-1' : null,
  metadata: {},
  read_at: null,
  created_at: '2026-01-01T00:00:00Z',
});

describe('visitor polling', () => {
  it('only exposes human agent replies', () => {
    const filtered = filterAgentMessagesForVisitor([
      sample('1', 'visitor'),
      sample('2', 'maya'),
      sample('3', 'agent'),
    ]);
    expect(filtered.map((message) => message.id)).toEqual(['3']);
  });

  it('returns the latest cursor', () => {
    expect(latestMessageId([])).toBeNull();
    expect(latestMessageId([sample('1', 'visitor'), sample('2', 'agent')])).toBe('2');
  });
});
