import { describe, expect, it } from 'vitest';
import {
  PRIVACY_POLICY_HREF,
  fixPrivacyPolicyLinks,
  privacyHrefNeedsFix,
} from './privacyPolicyLink';

describe('reseller privacy policy link', () => {
  it('flags the schemeless HubSpot URL that browsers treat as a host', () => {
    expect(privacyHrefNeedsFix('://eatos.com')).toBe(true);
    expect(privacyHrefNeedsFix('https://://eatos.com')).toBe(true);
    expect(privacyHrefNeedsFix('https://eatos.com')).toBe(true);
    expect(privacyHrefNeedsFix('')).toBe(true);
  });

  it('leaves the real privacy policy URLs alone', () => {
    expect(privacyHrefNeedsFix('/privacy-policy')).toBe(false);
    expect(privacyHrefNeedsFix('https://www.eatos.com/privacy-policy')).toBe(false);
    expect(privacyHrefNeedsFix('https://eatos.com/privacy')).toBe(false);
  });

  it('rewrites a Privacy Policy anchor onto the site policy', () => {
    document.body.innerHTML =
      '<div id="form"><a href="://eatos.com" target="_blank">Privacy Policy</a></div>';
    const root = document.getElementById('form')!;
    fixPrivacyPolicyLinks(root);
    const anchor = root.querySelector('a')!;
    expect(anchor.getAttribute('href')).toBe(PRIVACY_POLICY_HREF);
    expect(anchor.getAttribute('target')).toBeNull();
  });
});
