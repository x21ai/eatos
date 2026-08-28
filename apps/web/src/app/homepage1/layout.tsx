import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'eatOS Homepage1 Preview',
  description: 'Internal preview of the eatOS homepage with the horizontal product showcase.',
  robots: { index: false, follow: false },
};

export default function Homepage1Layout({ children }: { children: React.ReactNode }) {
  return children;
}
