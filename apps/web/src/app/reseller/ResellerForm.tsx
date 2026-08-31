'use client';

import { useEffect, useRef } from 'react';

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

  return <div id={targetId} className={`hs-form-full ${className}`} />;
}
