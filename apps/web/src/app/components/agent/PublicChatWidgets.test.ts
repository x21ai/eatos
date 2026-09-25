import { describe, expect, it } from 'vitest';
import { selectPublicChatWidget } from './PublicChatWidgets';
import { publicChatHost } from './publicChatHost';

describe('selectPublicChatWidget', () => {
  it('shows Maya only on staging', () => {
    expect(selectPublicChatWidget('s.eatos.dev', 'crisp-id')).toBe('maya');
  });

  it.each(['eatos.com', 'www.eatos.com'])(
    'shows Crisp on the live hostname when configured: %s',
    (hostname) => {
      expect(selectPublicChatWidget(hostname, 'crisp-id')).toBe('crisp');
    },
  );

  it.each(['eatos.com', 'www.eatos.com'])(
    'shows no widget on the live hostname without a Crisp ID: %s',
    (hostname) => {
      expect(selectPublicChatWidget(hostname, '')).toBe(null);
    },
  );

  it.each(['localhost', 'preview.eatos.dev', 'malicious-eatos.com'])(
    'shows no public chat widget on other hostnames: %s',
    (hostname) => {
      expect(selectPublicChatWidget(hostname, 'crisp-id')).toBe(null);
    },
  );

  it('normalizes hostname casing and whitespace', () => {
    expect(selectPublicChatWidget(' S.EATOS.DEV ', 'crisp-id')).toBe('maya');
    expect(selectPublicChatWidget(' WWW.EATOS.COM ', 'crisp-id')).toBe('crisp');
  });
});

describe('publicChatHost', () => {
  it('keeps Maya on staging and Crisp on the live hostnames', () => {
    expect(publicChatHost('s.eatos.dev')).toBe('maya');
    expect(publicChatHost('eatos.com')).toBe('crisp');
    expect(publicChatHost('www.eatos.com')).toBe('crisp');
  });

  it('returns no chat host elsewhere, even when a Crisp id exists', () => {
    expect(publicChatHost('localhost')).toBe(null);
    expect(publicChatHost('preview.eatos.dev')).toBe(null);
  });
});
