import AdminContacts from '@/components/admin/chat/AdminContacts';

export const metadata = {
  title: 'Contacts | eatOS Chat',
  description: 'Browse and preview contacts in the eatOS chat workspace.',
  robots: { index: false, follow: false },
};

export default function ContactsPage() {
  return <AdminContacts />;
}
