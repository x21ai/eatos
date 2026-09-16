import { describe, expect, it } from 'vitest';

/** Pure helper mirrored from markMessagesRead role filtering. */
function unreadRolesForReader(readBy: 'visitor' | 'agent'): string[] {
  return readBy === 'visitor' ? ['agent', 'maya'] : ['visitor'];
}

describe('read receipt role targeting', () => {
  it('visitor reads agent and maya messages', () => {
    expect(unreadRolesForReader('visitor')).toEqual(['agent', 'maya']);
  });

  it('agent reads visitor messages only', () => {
    expect(unreadRolesForReader('agent')).toEqual(['visitor']);
  });
});
