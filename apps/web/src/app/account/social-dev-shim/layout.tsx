import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

export default function SocialDevShimLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.NEXT_PUBLIC_CREATE_ENV !== 'DEVELOPMENT'
  ) {
    notFound();
  }

  return children;
}
