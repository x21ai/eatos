import AdminKnowledgeBase from '@/components/admin/chat/AdminKnowledgeBase';

export const metadata = {
  title: 'Knowledge Base | eatOS Chat',
  description: 'Write, edit, and publish eatOS support articles.',
  robots: { index: false, follow: false },
};

export default function KnowledgeBasePage() {
  return <AdminKnowledgeBase />;
}
