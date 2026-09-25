import { composeReply } from '../components/agent/retrieval';
import { publicChatHost } from '../components/agent/publicChatHost';

export const SUPPORT_ASK_INPUT_ID = 'support-agent-ask';

export type SupportAskAction = 'maya' | 'inline' | 'open-widget' | 'ignore';

/**
 * What the help-center composer should do with a question on this hostname.
 * Maya owns the staged agent panel. Everywhere else, including live Crisp
 * hosts, the composer answers from the help index on the page.
 */
export function resolveSupportAsk(hostname: string, question: string): SupportAskAction {
  const host = publicChatHost(hostname);
  if (!question.trim()) return host ? 'open-widget' : 'ignore';
  return host === 'maya' ? 'maya' : 'inline';
}

/**
 * "Start with the agent" opens the mounted chat widget on Maya and Crisp
 * hosts. Other hosts focus the ask field, which is the agent entry point.
 */
export function resolveStartAgent(hostname: string): 'widget' | 'focus-ask' {
  return publicChatHost(hostname) ? 'widget' : 'focus-ask';
}

export function focusSupportAsk() {
  if (typeof document === 'undefined') return;
  const input = document.getElementById(SUPPORT_ASK_INPUT_ID);
  if (!(input instanceof HTMLElement)) return;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  input.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  if (typeof input.focus === 'function') input.focus({ preventScroll: true });
}

let indexPromise: Promise<unknown> | null = null;

function loadIndex() {
  if (!indexPromise) {
    indexPromise = import('../components/agent/assistantIndex.generated.json').then(
      (mod) => (mod as { default?: unknown }).default ?? mod,
    );
  }
  return indexPromise;
}

export async function answerSupportQuestion(question: string) {
  const index = await loadIndex();
  return composeReply(String(question ?? ''), index);
}
