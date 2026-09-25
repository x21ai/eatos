'use client';

import { useEffect, useState } from 'react';
import { subscribeCookieBannerVisible } from '@/lib/cookieBannerVisibility';
import AgentAssistant from './AgentAssistant';
import { setCrispLauncherHidden } from './crispLauncherVisibility';

const MAYA_HOSTNAME = 's.eatos.dev';
const LIVE_HOSTNAMES = new Set(['eatos.com', 'www.eatos.com']);
const CRISP_SCRIPT_SRC = 'https://client.crisp.chat/l.js';

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
    script.dataset.eatosCrisp = 'true';
    document.head.appendChild(script);
  }, [websiteId]);

  // The consent UI owns the bottom of the page while it is up, so the launcher
  // stays out of sight until the visitor has answered it.
  useEffect(() => {
    const unsubscribe = subscribeCookieBannerVisible(setCrispLauncherHidden);

    return () => {
      unsubscribe();
      setCrispLauncherHidden(false);
    };
  }, []);

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
    return <AgentAssistant />;
  }

  if (widget === 'crisp' && crispWebsiteId) {
    return <CrispChat websiteId={crispWebsiteId.trim()} />;
  }

  return null;
}
