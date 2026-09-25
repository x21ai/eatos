'use client';

import { useEffect, useState } from 'react';
import { subscribeCookieBannerVisible } from '@/lib/cookieBannerVisibility';
import { AGENT_OPEN_EVENT } from './agentBus';
import AgentAssistant from './AgentAssistant';
import { openCrispConversation, type CrispChatSeed } from './crispChat';
import { setCrispLauncherHidden } from './crispLauncherVisibility';
import { publicChatHost } from './publicChatHost';

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
  const host = publicChatHost(hostname);
  if (host === 'maya') return 'maya';
  if (host === 'crisp' && crispWebsiteId?.trim()) return 'crisp';
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

  // Help-center CTAs call openAgent(). On live hosts that event should open
  // Crisp, because Maya is not mounted here.
  useEffect(() => {
    function onOpen(event: Event) {
      const detail = event instanceof CustomEvent ? (event.detail as CrispChatSeed) : undefined;
      openCrispConversation(detail && typeof detail === 'object' ? detail : {});
    }

    window.addEventListener(AGENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(AGENT_OPEN_EVENT, onOpen);
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
