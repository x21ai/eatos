'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3, BookOpen, Contact, HelpCircle,
  Inbox, Megaphone, MessageCircle, PanelLeftClose, PanelLeftOpen, Plug,
  Search, Settings, Users, Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const nav = [
  { label: 'Inbox', icon: Inbox, href: '/chatapp' },
  { label: 'AI Agent', icon: Zap },
  { label: 'Visitors', icon: Users, badge: '4' },
  { label: 'Contacts', icon: Contact },
  { label: 'Knowledge Base', icon: BookOpen },
  { label: 'Campaigns', icon: Megaphone },
  { label: 'Analytics', icon: BarChart3 },
];

export default function AdminChatShell({
  children,
  collapsed,
  onCollapsedChange,
}: {
  children: React.ReactNode;
  collapsed: boolean;
  onCollapsedChange: (value: boolean) => void;
}) {
  const pathname = usePathname();
  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      <aside className={cn('hidden shrink-0 flex-col border-r bg-sidebar transition-[width] md:flex', collapsed ? 'w-18' : 'w-62')}>
        <div className="flex h-22 items-center gap-3 border-b px-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-md border bg-background shadow-xs"><MessageCircle className="size-5 text-brand" /></span>
          {!collapsed && <div className="min-w-0"><p className="truncate text-sm font-bold">eatOS POS inc.</p><p className="truncate text-xs text-muted-foreground">www.eatos.com</p></div>}
        </div>
        <nav className="scrollbar-hidden flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {nav.map((item) => {
              const active = item.href ? pathname?.startsWith(item.href) : false;
              const content = <><item.icon className="size-4 shrink-0" />{!collapsed && <span className="truncate">{item.label}</span>}{!collapsed && item.badge && <span className="ml-auto rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">{item.badge}</span>}</>;
              return item.href ? <Link key={item.label} href={item.href} title={collapsed ? item.label : undefined} className={cn('flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors', active ? 'bg-accent text-foreground shadow-xs' : 'text-muted-foreground hover:bg-accent hover:text-foreground')}>{content}</Link> : <div key={item.label} title={collapsed ? item.label : undefined} className="flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground"><item.icon className="size-4 shrink-0" />{!collapsed && <span className="truncate">{item.label}</span>}{!collapsed && item.badge && <span className="ml-auto rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">{item.badge}</span>}</div>;
            })}
          </div>
        </nav>
        <div className="space-y-1 border-t p-3">
          {[{ label: 'Get help', icon: HelpCircle }, { label: 'Search', icon: Search }, { label: 'Plugins', icon: Plug }].map(({ label, icon: Icon }) => <div key={label} className="flex h-9 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground"><Icon className="size-4" />{!collapsed && label}</div>)}
          <Link href="/chatapp/settings" className={cn('flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium', pathname === '/chatapp/settings' ? 'bg-accent shadow-xs' : 'hover:bg-accent')}><Settings className="size-4" />{!collapsed && 'Settings'}</Link>
          <div className="flex items-center gap-3 pt-3"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-primary-foreground">JS</span>{!collapsed && <div className="min-w-0"><p className="truncate text-xs font-semibold">eatOS Support</p><p className="truncate text-[11px] text-muted-foreground">Admin team</p></div>}</div>
        </div>
        <Button variant="outline" size="icon-sm" onClick={() => onCollapsedChange(!collapsed)} className="absolute bottom-4 z-10 hidden md:inline-flex" style={{ left: collapsed ? 56 : 236 }} aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}>{collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}</Button>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-4 md:hidden">
          <Link href="/chatapp" className="flex items-center gap-2 text-sm font-bold"><span className="grid size-8 place-items-center rounded-md bg-brand text-primary-foreground"><MessageCircle className="size-4" /></span>eatOS Chat</Link>
          <div className="flex items-center gap-1">
            <Button asChild variant={pathname === '/chatapp' ? 'secondary' : 'ghost'} size="sm"><Link href="/chatapp"><Inbox /> Inbox</Link></Button>
            <Button asChild variant={pathname === '/chatapp/settings' ? 'secondary' : 'ghost'} size="icon-sm"><Link href="/chatapp/settings" aria-label="Settings"><Settings /></Link></Button>
          </div>
        </header>
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}