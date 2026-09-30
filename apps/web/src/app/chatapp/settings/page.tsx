import AdminSettings from '@/components/admin/chat/AdminSettings';

export const metadata = {
  title: 'Settings | eatOS Chat',
  description: 'Build and preview the eatOS visitor chat settings.',
  robots: { index: false, follow: false },
};

const categories = ['account', 'billing', 'workspace', 'chatbox', 'inbox', 'email', 'status'] as const;
const workspaceSections = ['information', 'setup', 'operators', 'log', 'advanced', 'danger'] as const;
const accountSections = ['information', 'notifications', 'availability', 'security', 'interface', 'shortcuts'] as const;
const chatboxSections = ['appearance', 'behavior', 'search-ai', 'security', 'restrictions', 'push-notifications'] as const;

export default async function ChatAppSettingsPage({ searchParams }: { searchParams: Promise<{ category?: string; section?: string }> }) {
  const { category, section } = await searchParams;
  const initialActive = categories.find((item) => item === category) ?? 'chatbox';
  const initialAccountSection = accountSections.find((item) => item === section) ?? 'information';
  const initialWorkspaceSection = workspaceSections.find((item) => item === section) ?? 'information';
  const initialChatboxSection = chatboxSections.find((item) => item === section) ?? 'appearance';
  return <AdminSettings initialActive={initialActive} initialAccountSection={initialAccountSection} initialWorkspaceSection={initialWorkspaceSection} initialChatboxSection={initialChatboxSection} />;
}