import { describe, expect, it } from 'vitest';
import { filterAgentMessagesForVisitor, latestMessageId } from './visitor-poll';
import type { MayaMessage } from './types';

const sample = (id: string, role: MayaMessage['role']): MayaMessage => ({
  id,
  conversation_id: 'c1',
  role,
  body_text: `msg-${id}`,
  article_slugs: [],
  sender_agent_id: role === 'agent' ? 'a1' : null,
  metadata: {},
  created_at: '2026-01-01T00:00:00Z',
});

describe('visitor poll helpers', () => {
  it('returns only human agent messages for the widget', () => {
    const messages = [
      sample('1', 'visitor'),
      sample('2', 'maya'),
      sample('3', 'agent'),
      sample('4', 'agent'),
    ];
    const filtered = filterAgentMessagesForVisitor(messages);
    expect(filtered.map((m) => m.id)).toEqual(['3', '4']);
  });

  it('tracks latest message id for polling cursor', () => {
    expect(latestMessageId([])).toBeNull();
    expect(
      latestMessageId([sample('1', 'visitor'), sample('2', 'agent')]),
    ).toBe('2');
  });
});
