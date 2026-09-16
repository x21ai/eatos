import { headers } from 'next/headers';
import CookieBanner from '@/components/CookieBanner';
import BookDemoTracker from '@/components/BookDemoTracker';
import AgentAssistant from '@/app/components/agent/AgentAssistant';
import { isAdminPath } from '@/lib/admin-chrome';

export default async function MarketingExtras() {
  const pathname = (await headers()).get('x-pathname') || '';

  if (isAdminPath(pathname)) {
    return null;
  }

  return (
    <>
      <CookieBanner />
      <BookDemoTracker />
      <AgentAssistant />
    </>
  );
}
