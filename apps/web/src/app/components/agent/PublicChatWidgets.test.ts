import { describe, expect, it } from 'vitest';
import { selectPublicChatWidget } from './PublicChatWidgets';

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
