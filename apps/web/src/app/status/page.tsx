import StatusClient from './StatusClient';

export const metadata = {
  title: 'Status | eatOS',
  description: 'Live status of eatOS services.',
  alternates: { canonical: '/status' },
};

export default function StatusPage() {
  return <StatusClient />;
}
