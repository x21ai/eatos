import OrderStatusClient from './OrderStatusClient';
import { normalizeLookupEmail, normalizeOrderNumber } from '@/lib/shop/order-lookup';

export const metadata = {
  title: 'Order status | eatOS',
  description: 'Look up an eatOS shop order by order number and email.',
  alternates: { canonical: '/order-status' },
};

export default async function OrderStatusPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; email?: string; paid?: string }>;
}) {
  const params = await searchParams;
  return (
    <OrderStatusClient
      initialOrder={normalizeOrderNumber(params.order || '')}
      initialEmail={normalizeLookupEmail(params.email || '')}
      initialPaidHint={params.paid === '1'}
    />
  );
}
