'use client';

import { useEffect, useRef } from 'react';

const HS_SCRIPT_SRC = 'https://js.hsforms.net/forms/embed/v2.js';
const TARGET_ID = 'hubspot-reseller-form';

export default function ResellerForm() {
  const created = useRef(false);

  useEffect(() => {
    const create = () => {
      if (created.current) return;
      const hbspt = (window as any).hbspt;
      if (!hbspt?.forms) return;
      created.current = true;
      hbspt.forms.create({
        region: 'na1',
        portalId: '6789180',
        formId: 'a2a3be3d-16bc-429d-9e55-010af450fcd5',
        target: `#${TARGET_ID}`,
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
  }, []);

  return <div id={TARGET_ID} className="mt-2" />;
}
