import { beforeEach, describe, expect, it, vi } from 'vitest';

beforeEach(() => {
  vi.resetModules();
  window.$crisp = [];
});

describe('openCrispConversation', () => {
  it('opens the chatbox', async () => {
    const { openCrispConversation } = await import('./crispChat');

    expect(openCrispConversation()).toBe(true);
    expect(window.$crisp).toEqual([['do', 'chat:open']]);
  });

  it('prefills the composer when a question is provided', async () => {
    const { openCrispConversation } = await import('./crispChat');

    openCrispConversation({ question: '  How do I reset an employee PIN?  ' });

    expect(window.$crisp).toEqual([
      ['do', 'chat:open'],
      ['set', 'message:text', ['How do I reset an employee PIN?']],
    ]);
  });

  it('shows the launcher again when the cookie banner had hidden it', async () => {
    const { setCrispLauncherHidden } = await import('./crispLauncherVisibility');
    const { openCrispConversation } = await import('./crispChat');

    setCrispLauncherHidden(true);
    openCrispConversation({ question: 'Printer offline' });

    expect(window.$crisp).toEqual([
      ['do', 'chat:hide'],
      ['do', 'chat:show'],
      ['do', 'chat:open'],
      ['set', 'message:text', ['Printer offline']],
    ]);
  });

  it('queues commands when Crisp has not created $crisp yet', async () => {
    delete window.$crisp;
    const { openCrispConversation } = await import('./crispChat');

    expect(openCrispConversation({ question: 'Add a menu item' })).toBe(true);
    expect(window.$crisp).toEqual([
      ['do', 'chat:open'],
      ['set', 'message:text', ['Add a menu item']],
    ]);
  });

  it('does nothing when the Crisp queue cannot accept commands', async () => {
    window.$crisp = {} as unknown[];
    const { openCrispConversation } = await import('./crispChat');

    expect(openCrispConversation({ question: 'Hi' })).toBe(false);
    expect(window.$crisp).toEqual({});
  });
});
