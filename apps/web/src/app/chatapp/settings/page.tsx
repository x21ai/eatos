import AdminSettings from '@/components/admin/chat/AdminSettings';

export const metadata = {
  title: 'Settings | eatOS Chat',
  description: 'Build and preview the eatOS visitor chat settings.',
  robots: { index: false, follow: false },
};

const categories = ['account', 'billing', 'workspace', 'chatbox', 'inbox', 'email', 'status'] as const;

export default async function ChatAppSettingsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const initialActive = categories.find((item) => item === category) ?? 'chatbox';
  return <AdminSettings initialActive={initialActive} />;
}