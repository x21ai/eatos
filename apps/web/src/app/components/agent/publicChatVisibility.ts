const PRIVATE_PATH_PREFIXES = [
  '/account',
  '/admin',
  '/api',
  '/cart',
  '/checkout',
  '/kiosk',
  '/login',
  '/order-status',
];

export function shouldShowPublicMayaChat(options: {
  enabled: string | undefined;
  allowedHosts: string | undefined;
  hostname: string;
  pathname: string;
}): boolean {
  const enabled = ['1', 'true', 'yes'].includes((options.enabled || '').toLowerCase());
  if (!enabled) return false;

  const hostname = options.hostname.toLowerCase();
  const hosts = (options.allowedHosts || 'eatos.com,www.eatos.com')
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
  if (!hosts.includes(hostname)) return false;

  return !PRIVATE_PATH_PREFIXES.some(
    (prefix) => options.pathname === prefix || options.pathname.startsWith(`${prefix}/`),
  );
}
