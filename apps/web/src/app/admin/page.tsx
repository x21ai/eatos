// @ts-nocheck
'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  Bot,
  FileText,
  Loader2,
  Newspaper,
  Package,
  ShoppingBag,
  Users,
} from 'lucide-react';

const quickLinks = [
  { href: '/admin/blog', label: 'Blog', icon: FileText, cap: 'blog:read' },
  { href: '/admin/news', label: 'Newsroom', icon: Newspaper, cap: 'news:read' },
  { href: '/admin/shop', label: 'Shop', icon: ShoppingBag, cap: 'shop:read' },
  { href: '/admin/orders', label: 'Orders', icon: Package, cap: 'orders:read' },
  { href: '/admin/users', label: 'Team', icon: Users, cap: 'users:manage' },
  { href: '/admin/maya', label: 'Maya Helpdesk', icon: Bot, cap: 'maya:access' },
];

export default function AdminHomePage() {
  const { data: me } = useQuery({
    queryKey: ['admin-me'],
    queryFn: async () => {
      const res = await fetch('/api/admin/me');
      if (!res.ok) throw new Error('Unauthorized');
      return (await res.json()).data;
    },
  });

  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await fetch('/api/admin/stats');
      if (!res.ok) throw new Error('Failed to load stats');
      return (await res.json()).data;
    },
  });

  const caps = new Set(me?.capabilities ?? []);
  const links = quickLinks.filter((item) => {
    if (item.href === '/admin/maya') {
      return (
        caps.has('maya:access') ||
        caps.has('maya:manage') ||
        caps.has('help:access') ||
        caps.has('help:manage')
      );
    }
    return caps.has(item.cap);
  });

  return (
    <div className="p-8 pt-28 max-w-5xl mx-auto space-y-10">
      <header>
        <h1 className="text-3xl font-bold">Admin home</h1>
        <p className="text-gray-400 mt-2">
          Welcome back{me?.email ? `, ${me.email}` : ''}. Quick stats and shortcuts for eatOS CMS.
        </p>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Products', value: stats?.products },
          { label: 'Orders', value: stats?.orders },
          { label: 'Open chats', value: stats?.open_maya_conversations },
          { label: 'Publish queue', value: stats?.pending_publish_requests },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl border border-white/10 bg-[#111] p-5"
          >
            <p className="text-xs uppercase tracking-wider text-gray-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold">
              {isLoading ? <Loader2 size={20} className="animate-spin inline" /> : (value ?? '—')}
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Quick links</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-gray-200 transition-colors hover:border-white/25 hover:text-white"
            >
              <Icon size={18} className="text-brand-on-dark" />
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
