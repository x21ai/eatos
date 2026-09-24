import { describe, expect, it } from 'vitest';
import { shouldShowPublicMayaChat } from './publicChatVisibility';

const base = {
  enabled: 'true',
  allowedHosts: 'eatos.com,www.eatos.com',
  hostname: 'eatos.com',
  pathname: '/',
};

describe('public Maya chat visibility', () => {
  it('shows on enabled marketing hosts', () => {
    expect(shouldShowPublicMayaChat(base)).toBe(true);
    expect(shouldShowPublicMayaChat({ ...base, hostname: 'www.eatos.com' })).toBe(true);
  });

  it('keeps staging independently disabled by the host allowlist', () => {
    expect(shouldShowPublicMayaChat({ ...base, hostname: 's.eatos.dev' })).toBe(false);
    expect(
      shouldShowPublicMayaChat({
        ...base,
        hostname: 's.eatos.dev',
        allowedHosts: 'eatos.com,www.eatos.com,s.eatos.dev',
      }),
    ).toBe(true);
  });

  it('does not mount on auth or admin routes', () => {
    expect(shouldShowPublicMayaChat({ ...base, pathname: '/login' })).toBe(false);
    expect(shouldShowPublicMayaChat({ ...base, pathname: '/admin/maya' })).toBe(false);
  });

  it('requires an explicit enable flag', () => {
    expect(shouldShowPublicMayaChat({ ...base, enabled: undefined })).toBe(false);
  });
});
