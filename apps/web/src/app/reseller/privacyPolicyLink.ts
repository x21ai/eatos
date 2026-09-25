/** Site privacy policy used by the footer, cookie banner, and booking page. */
export const PRIVACY_POLICY_HREF = '/privacy-policy';

const PRIVACY_PATHS = new Set(['/privacy-policy', '/privacy-policy.html', '/privacy']);

export function isPrivacyPolicyLabel(text: string | null | undefined): boolean {
  const label = (text || '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/[.:]+$/, '');
  return label === 'privacy policy' || label.endsWith(' privacy policy');
}

/**
 * HubSpot's reseller newsletter consent link is stored without a scheme, so the
 * browser requests a host like `://eatos.com` and DNS fails. Any Privacy Policy
 * anchor that does not already land on the site policy needs to be rewritten.
 */
export function privacyHrefNeedsFix(href: string | null | undefined): boolean {
  const raw = (href || '').trim();
  if (!raw || raw === '#' || raw.toLowerCase().startsWith('javascript:')) return true;
  if (raw.startsWith('://') || /^https?:\/\/\/\//i.test(raw)) return true;

  try {
    const url = new URL(raw, 'https://www.eatos.com');
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return true;
    const path = url.pathname.replace(/\/+$/, '') || '/';
    return !PRIVACY_PATHS.has(path);
  } catch {
    return true;
  }
}

export function fixPrivacyPolicyLinks(root: ParentNode) {
  const anchors = root.querySelectorAll('a');
  anchors.forEach((anchor) => {
    if (!isPrivacyPolicyLabel(anchor.textContent)) return;
    if (!privacyHrefNeedsFix(anchor.getAttribute('href'))) return;
    anchor.setAttribute('href', PRIVACY_POLICY_HREF);
    if (anchor.getAttribute('target') && anchor.getAttribute('target') !== '_self') {
      anchor.removeAttribute('target');
    }
  });
}
