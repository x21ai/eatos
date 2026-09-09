import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Login | eatOS',
  alternates: { canonical: '/login' },
};

export default function LoginPage() {
  redirect('/account/signin');
}
