'use client';

import { useEffect, useRef } from 'react';
import {
  PRIVACY_POLICY_HREF,
  fixPrivacyPolicyLinks,
  isPrivacyPolicyLabel,
  privacyHrefNeedsFix,
} from './privacyPolicyLink';

const HS_SCRIPT_SRC = 'https://js.hsforms.net/forms/embed/v2.js';

type Props = {
  formId?: string;
  targetId?: string;
  className?: string;
};

export default function ResellerForm({
  formId = 'a2a3be3d-16bc-429d-9e55-010af450fcd5',
  targetId = 'hubspot-reseller-form',
  className = 'mt-2',
}: Props) {
  const created = useRef(false);

  useEffect(() => {
    const create = () => {
      if (created.current) return;
      const hbspt = (window as any).hbspt;
      if (!hbspt?.forms) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      created.current = true;
      hbspt.forms.create({
        region: 'na1',
        portalId: '6789180',
        formId,
        target: `#${targetId}`,
      });
    };

    if ((window as any).hbspt?.forms) {
      create();
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${HS_SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = HS_SCRIPT_SRC;
      script.charset = 'utf-8';
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener('load', create);
    return () => script?.removeEventListener('load', create);
  }, [formId, targetId]);

  useEffect(() => {
    const root = document.getElementById(targetId);
    if (!root) return;

    const fix = () => fixPrivacyPolicyLinks(root);
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.('a');
      if (!anchor || !root.contains(anchor)) return;
      if (!isPrivacyPolicyLabel(anchor.textContent)) return;
      if (!privacyHrefNeedsFix(anchor.getAttribute('href'))) return;
      event.preventDefault();
      window.location.assign(PRIVACY_POLICY_HREF);
    };

    fix();
    const observer = new MutationObserver(fix);
    observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });
    root.addEventListener('click', onClick);
    return () => {
      observer.disconnect();
      root.removeEventListener('click', onClick);
    };
  }, [targetId]);

  return <div id={targetId} className={`hs-form-full ${className}`} />;
}
