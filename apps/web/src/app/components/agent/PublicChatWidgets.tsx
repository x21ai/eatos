'use client';

import { lazy, Suspense, useEffect, useState } from 'react';

const MAYA_HOSTNAME = 's.eatos.dev';
const LIVE_HOSTNAMES = new Set(['eatos.com', 'www.eatos.com']);
const CRISP_SCRIPT_SRC = 'https://client.crisp.chat/l.js';
const AgentAssistant = lazy(() => import('./AgentAssistant'));

type PublicChatWidget = 'maya' | 'crisp' | null;

declare global {
  interface Window {
    $crisp?: unknown[];
    CRISP_WEBSITE_ID?: string;
  }
}

export function selectPublicChatWidget(
  hostname: string,
  crispWebsiteId?: string | null,
): PublicChatWidget {
  const normalizedHostname = hostname.trim().toLowerCase();

  if (normalizedHostname === MAYA_HOSTNAME) {
    return 'maya';
  }

  if (LIVE_HOSTNAMES.has(normalizedHostname) && crispWebsiteId?.trim()) {
    return 'crisp';
  }

  return null;
}

function CrispChat({ websiteId }: { websiteId: string }) {
  useEffect(() => {
    window.$crisp ??= [];
    window.CRISP_WEBSITE_ID = websiteId;

    if (document.querySelector(`script[src="${CRISP_SCRIPT_SRC}"]`)) {
      return;
    }

    const script = document.createElement('script');
    script.src = CRISP_SCRIPT_SRC;
    script.async = true;
    document.head.appendChild(script);
  }, [websiteId]);

  return null;
}

export default function PublicChatWidgets({
  crispWebsiteId,
}: {
  crispWebsiteId?: string | null;
}) {
  const [widget, setWidget] = useState<PublicChatWidget>(null);

  useEffect(() => {
    setWidget(selectPublicChatWidget(window.location.hostname, crispWebsiteId));
  }, [crispWebsiteId]);

  if (widget === 'maya') {
    return (
      <Suspense fallback={null}>
        <AgentAssistant />
      </Suspense>
    );
  }

  if (widget === 'crisp' && crispWebsiteId) {
    return <CrispChat websiteId={crispWebsiteId.trim()} />;
  }

  return null;
}
