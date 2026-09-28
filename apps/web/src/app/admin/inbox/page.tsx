import AdminInbox from '@/components/admin/chat/AdminInbox';

export const metadata = {
  title: 'Inbox | eatOS Admin',
  description: 'Manage eatOS visitor conversations and support activity.',
  robots: { index: false, follow: false },
};

export default function AdminInboxPage() {
  return <AdminInbox />;
}