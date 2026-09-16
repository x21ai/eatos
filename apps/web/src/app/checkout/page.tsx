import CheckoutClient from './CheckoutClient';

export const metadata = {
  title: 'Checkout | eatOS',
  description: 'Complete your eatOS shop order with shipping and secure card payment.',
  alternates: { canonical: '/checkout' },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
