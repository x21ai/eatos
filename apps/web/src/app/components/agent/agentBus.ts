// @ts-nocheck
// Tiny event bus so any page can open the support agent without threading props
// or context through every layout. The assistant is mounted once in the root
// layout and listens for this event.

export const AGENT_OPEN_EVENT = 'eatos:agent:open';

/**
 * Opens the support agent panel.
 *
 * @param {object} [seed]
 * @param {string} [seed.question] Question to submit immediately.
 * @param {string} [seed.context]  Where the request came from (article title, product name).
 * @param {string} [seed.product]  Product the visitor is asking about, used for triage routing.
 */
export function openAgent(seed = {}) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(AGENT_OPEN_EVENT, { detail: seed }));
}
