import AdminInbox from '@/components/admin/chat/AdminInbox';

export const metadata = {
  title: 'Inbox | eatOS Chat',
  description: 'Build and preview the eatOS visitor conversation workspace.',
  robots: { index: false, follow: false },
};

export default async function ChatAppPage({ searchParams }: { searchParams: Promise<{ c?: string | string[]; inbox?: string | string[] }> }) {
  const { c, inbox } = await searchParams;
  const box = Array.isArray(inbox) ? inbox[0] : inbox;
  const id = Array.isArray(c) ? c[0] : c;
  return <AdminInbox key={`${id ?? ''}-${box ?? ''}`} initialId={id} initialInbox={box} />;
}
