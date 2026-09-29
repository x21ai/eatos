import AdminInbox from '@/components/admin/chat/AdminInbox';

export const metadata = {
  title: 'Inbox | eatOS Chat',
  description: 'Build and preview the eatOS visitor conversation workspace.',
  robots: { index: false, follow: false },
};

export default async function ChatAppPage({ searchParams }: { searchParams: Promise<{ c?: string | string[] }> }) {
  const { c } = await searchParams;
  const id = Array.isArray(c) ? c[0] : c;
  return <AdminInbox key={id ?? 'default'} initialId={id} />;
}
