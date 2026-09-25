import { setCrispLauncherHidden } from './crispLauncherVisibility';

export type CrispChatSeed = {
  question?: string;
};

/**
 * Opens the Crisp chatbox and, when a question was provided, prefills the
 * composer. Commands are queued on `$crisp` so they still run if the visitor
 * clicks before the Crisp client finishes loading.
 *
 * Call this only from the live-hostname Crisp mount. It does not decide which
 * host gets Crisp.
 */
export function openCrispConversation(seed: CrispChatSeed = {}): boolean {
  if (typeof window === 'undefined') return false;

  window.$crisp ??= [];
  const crisp = window.$crisp;
  if (typeof crisp?.push !== 'function') return false;

  // The cookie banner hides the launcher. An explicit request to talk should
  // bring it back; this is a no-op when we never hid it.
  setCrispLauncherHidden(false);
  crisp.push(['do', 'chat:open']);

  const question = typeof seed.question === 'string' ? seed.question.trim() : '';
  if (question) {
    crisp.push(['set', 'message:text', [question]]);
  }

  return true;
}
