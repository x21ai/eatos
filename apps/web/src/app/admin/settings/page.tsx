import AdminSettings from '@/components/admin/chat/AdminSettings';

export const metadata = {
  title: 'Chat Settings | eatOS Admin',
  description: 'Configure the eatOS visitor chat workspace.',
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return <AdminSettings />;
}