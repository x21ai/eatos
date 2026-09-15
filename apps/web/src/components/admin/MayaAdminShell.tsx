// @ts-nocheck
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Inbox, MessageSquareQuote, Users, Sparkles, Shield } from 'lucide-react';

const NAV = [
  { href: '/admin/maya', label: 'Overview', icon: Sparkles, exact: true },
  { href: '/admin/maya/inbox', label: 'Inbox', icon: Inbox },
  { href: '/admin/maya/canned', label: 'Quick replies', icon: MessageSquareQuote },
  { href: '/admin/maya/agents', label: 'Agents', icon: Users },
  { href: '/admin/maya/access', label: 'RBAC access', icon: Shield },
];

export default function MayaAdminShell({ title, subtitle, children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <aside className="lg:w-56 shrink-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-on-dark">
              Maya Helpdesk
            </p>
            <nav className="mt-4 space-y-1">
              {NAV.map(({ href, label, icon: Icon, exact }) => {
                const active = exact ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={
                      active
                        ? 'flex items-center gap-2.5 rounded-xl bg-white/10 px-3 py-2.5 text-sm font-medium text-white'
                        : 'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-white'
                    }
                  >
                    <Icon size={16} aria-hidden />
                    {label}
                  </Link>
                );
              })}
            </nav>
            <p className="mt-8 text-[11px] leading-5 text-zinc-600">
              Visitor chat syncs here from the site-wide Maya assistant. Help articles stay at{' '}
              <Link href="/support" className="text-zinc-400 underline hover:text-white">
                /support
              </Link>
              .
            </p>
          </aside>

          <main className="min-w-0 flex-1 space-y-6">
            {(title || subtitle) && (
              <header>
                {title ? (
                  <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                ) : null}
                {subtitle ? <p className="mt-2 text-sm text-zinc-400">{subtitle}</p> : null}
              </header>
            )}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
