import AdminVisitors from '@/components/admin/chat/AdminVisitors';

export const metadata = {
  title: 'Visitor Workspace | eatOS Chat',
  description: 'Browse a live visitor session and start an eatOS chat conversation.',
  robots: { index: false, follow: false },
};

export default async function VisitorPage({ params }: { params: Promise<{ visitorId: string }> }) {
  const { visitorId } = await params;
  return <AdminVisitors visitorId={visitorId} />;
}
