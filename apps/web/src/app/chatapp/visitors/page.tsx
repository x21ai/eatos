import AdminVisitors from '@/components/admin/chat/AdminVisitors';

export const metadata = {
  title: 'Live Visitors | eatOS Chat',
  description: 'View active eatOS website visitors and start a live conversation.',
  robots: { index: false, follow: false },
};

export default function VisitorsPage() {
  return <AdminVisitors />;
}
