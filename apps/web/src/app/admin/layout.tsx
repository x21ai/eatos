import AdminShell from '@/components/admin/AdminShell';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { queryOne } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

export const metadata = {
  alternates: { canonical: '/admin' },
  title: 'Admin',
  robots: { index: false, follow: false },
};

async function resolveAdmin() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user?.id) return null;
    const email = String(session.user.email || '')
      .trim()
      .toLowerCase();
    const row = await queryOne<{ user_id: string }>(
      `SELECT user_id FROM admin_users
        WHERE user_id = ? OR lower(email) = ?
        LIMIT 1`,
      [session.user.id, email],
    );
    return row ? session : null;
  } catch {
    return null;
  }
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await resolveAdmin();
  if (!admin) {
    redirect('/account/signin?callbackUrl=/admin');
  }
  return <AdminShell>{children}</AdminShell>;
}
