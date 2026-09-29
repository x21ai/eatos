import AdminContactProfile from '@/components/admin/chat/AdminContactProfile';

export const metadata = {
  title: 'Contact Profile | eatOS Chat',
  description: 'Review a contact profile and activity in the eatOS chat workspace.',
  robots: { index: false, follow: false },
};

export default async function ContactProfilePage({ params }: { params: Promise<{ contactId: string }> }) {
  const { contactId } = await params;
  return <AdminContactProfile contactId={contactId} />;
}