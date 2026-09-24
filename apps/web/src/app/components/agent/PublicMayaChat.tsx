'use client';

import { usePathname } from 'next/navigation';
import AgentAssistant from './AgentAssistant';
import { shouldShowPublicMayaChat } from './publicChatVisibility';

export default function PublicMayaChat() {
  const pathname = usePathname();
  const hostname = typeof window === 'undefined' ? '' : window.location.hostname;
  const visible = shouldShowPublicMayaChat({
    enabled: process.env.NEXT_PUBLIC_MAYA_CHAT_ENABLED,
    allowedHosts: process.env.NEXT_PUBLIC_MAYA_CHAT_HOSTS,
    hostname,
    pathname,
  });

  return visible ? <AgentAssistant /> : null;
}
