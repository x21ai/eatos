'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import BookDemoTracker from '@/components/BookDemoTracker';
import StaticLinkFix from '@/components/StaticLinkFix';
import PublicChatWidgets from '@/app/components/agent/PublicChatWidgets';

export default function SiteChrome({
  children,
  crispWebsiteId,
}: {
  children: React.ReactNode;
  crispWebsiteId?: string | null;
}) {
  const pathname = usePathname();
  const isWorkspace = pathname?.startsWith('/admin') || pathname?.startsWith('/chatapp');

  if (isWorkspace) return <main className="min-h-dvh">{children}</main>;

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <CookieBanner />
      <BookDemoTracker />
      <StaticLinkFix />
      <PublicChatWidgets crispWebsiteId={crispWebsiteId} />
    </>
  );
}