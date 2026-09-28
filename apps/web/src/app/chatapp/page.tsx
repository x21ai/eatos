import AdminInbox from '@/components/admin/chat/AdminInbox';

export const metadata = {
  title: 'Inbox | eatOS Chat',
  description: 'Build and preview the eatOS visitor conversation workspace.',
  robots: { index: false, follow: false },
};

export default function ChatAppPage() {
  return <AdminInbox />;
}