import { headers } from 'next/headers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { isAdminPath } from '@/lib/admin-chrome';

export default async function AppChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get('x-pathname') || '';

  if (isAdminPath(pathname)) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
