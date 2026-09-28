import AdminSettings from '@/components/admin/chat/AdminSettings';

export const metadata = {
  title: 'Settings | eatOS Chat',
  description: 'Build and preview the eatOS visitor chat settings.',
  robots: { index: false, follow: false },
};

export default function ChatAppSettingsPage() {
  return <AdminSettings />;
}