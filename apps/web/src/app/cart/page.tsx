import CartClient from './CartClient';

export const metadata = {
  title: 'Cart | eatOS',
  description: 'Review your eatOS hardware cart and checkout securely.',
  alternates: { canonical: '/cart' },
};

export default function CartPage() {
  return <CartClient />;
}
