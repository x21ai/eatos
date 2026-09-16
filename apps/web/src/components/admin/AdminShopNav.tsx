// @ts-nocheck
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

const LINKS = [
  { href: '/admin/shop', label: 'Products', cap: 'shop:read', exact: true },
  { href: '/admin/shop/discounts', label: 'Discounts', cap: 'shop:read' },
  { href: '/admin/shop/shipping', label: 'Shipping', cap: 'shop:read' },
  { href: '/admin/shop/analytics', label: 'Analytics', cap: 'orders:read' },
];

export default function AdminShopNav() {
  const pathname = usePathname();
  const { data: me } = useQuery({
    queryKey: ['admin-me'],
    queryFn: async () => {
      const res = await fetch('/api/admin/me');
      if (!res.ok) return null;
      return (await res.json()).data;
    },
  });

  const caps = new Set(me?.capabilities ?? []);
  const visible = LINKS.filter((link) => caps.has(link.cap));

  if (visible.length <= 1) return null;

  return (
    <nav className="flex flex-wrap gap-2">
      {visible.map(({ href, label, exact }) => {
        const active = exact
          ? pathname === href
          : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
              active
                ? 'bg-white/15 text-white'
                : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
