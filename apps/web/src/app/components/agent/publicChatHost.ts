export const MAYA_HOSTNAME = 's.eatos.dev';
export const LIVE_HOSTNAMES = new Set(['eatos.com', 'www.eatos.com']);

export type PublicChatHost = 'maya' | 'crisp' | null;

/**
 * Which public chat surface a hostname is allowed to use.
 * Crisp is live eatos.com only. Maya is staging only. Other hosts get neither.
 */
export function publicChatHost(hostname: string): PublicChatHost {
  const normalizedHostname = hostname.trim().toLowerCase();
  if (normalizedHostname === MAYA_HOSTNAME) return 'maya';
  if (LIVE_HOSTNAMES.has(normalizedHostname)) return 'crisp';
  return null;
}
