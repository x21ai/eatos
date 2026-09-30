import AdminKnowledgeBaseSettings from '@/components/admin/chat/AdminKnowledgeBaseSettings';

export const metadata = {
  title: 'Knowledge Base Settings | eatOS Chat',
  description: 'Configure the eatOS Chat Knowledge Base experience.',
  robots: { index: false, follow: false },
};

export default function KnowledgeBaseSettingsPage() {
  return <AdminKnowledgeBaseSettings />;
}