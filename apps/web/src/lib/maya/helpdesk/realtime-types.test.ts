import { describe, expect, it } from 'vitest';
import { parseRealtimeClientEvent, parseRealtimeServerEvent, toRealtimeMessage } from './realtime-types';

describe('realtime-types', () => {
  it('parses server events', () => {
    const event = parseRealtimeServerEvent(
      JSON.stringify({ type: 'typing', role: 'agent', is_typing: true }),
    );
    expect(event).toEqual({ type: 'typing', role: 'agent', is_typing: true });
  });

  it('rejects invalid server events', () => {
    expect(parseRealtimeServerEvent('not-json')).toBeNull();
    expect(parseRealtimeServerEvent('{}')).toBeNull();
  });

  it('parses client events', () => {
    const event = parseRealtimeClientEvent(JSON.stringify({ type: 'read', message_ids: ['m1'] }));
    expect(event).toEqual({ type: 'read', message_ids: ['m1'] });
  });

  it('maps messages to realtime payloads', () => {
    expect(
      toRealtimeMessage({
        id: 'm1',
        conversation_id: 'c1',
        role: 'agent',
        body_text: 'Hello',
        created_at: '2026-01-01',
        read_at: null,
      }),
    ).toMatchObject({ id: 'm1', body_text: 'Hello', read_at: null });
  });
});
