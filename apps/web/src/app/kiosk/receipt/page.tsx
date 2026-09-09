import type { Metadata } from 'next';
import ReceiptClient from './ReceiptClient';

export const metadata: Metadata = {
  title: 'Kiosk receipt | eatOS',
  robots: { index: false, follow: false },
};

export default async function KioskReceiptPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; email?: string }>;
}) {
  const params = await searchParams;
  return (
    <ReceiptClient
      initialOrder={(params.order || '').toUpperCase()}
      initialEmail={(params.email || '').toLowerCase()}
    />
  );
}
