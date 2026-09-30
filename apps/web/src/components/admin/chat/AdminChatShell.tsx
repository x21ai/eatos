'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  BarChart3, Bell, BookOpen, Bookmark, Bot, Calendar, CirclePlus, Contact, Flag, Folder,
  Heart, HelpCircle, Inbox, ListFilter as FilterIcon, Megaphone, MessageCircle, PanelLeftClose, PanelLeftOpen, Plug,
  Plus, Search, Settings, ShieldCheck, Star, Tag, UserRound, Users, X, Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const iconChoices = [Calendar, Star, Heart, Flag, Tag, Bell, Bookmark, Folder];

const nav = [
  { label: 'Inbox', icon: Inbox, href: '/chatapp' },
  { label: 'AI Agent', icon: Zap },
  { label: 'Visitors', icon: Users, href: '/chatapp/visitors', badge: '6' },
  { label: 'Contacts', icon: Contact, href: '/chatapp/contacts' },
  { label: 'Knowledge Base', icon: BookOpen, href: '/chatapp/knowledge-base' },
  { label: 'Campaigns', icon: Megaphone },
  { label: 'Analytics', icon: BarChart3 },
];

export default function AdminChatShell({
  children,
  collapsed,
  onCollapsedChange,
  inbox,
  onInboxChange,
  contactFilters,
  activeContactFilter,
  onContactFilterChange,
}: {
  children: React.ReactNode;
  collapsed: boolean;
  onCollapsedChange: (value: boolean) => void;
  inbox?: 'all' | 'main' | 'assigned' | 'automated' | 'spam';
  onInboxChange?: (value: 'all' | 'main' | 'assigned' | 'automated' | 'spam') => void;
  contactFilters?: { id: string; name: string }[];
  activeContactFilter?: string;
  onContactFilterChange?: (id: string) => void;
}) {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const hadDarkTheme = root.classList.contains('dark');
    root.classList.add('dark', 'chatapp-admin-theme');
    return () => {
      root.classList.remove('chatapp-admin-theme');
      if (!hadDarkTheme) root.classList.remove('dark');
    };
  }, []);
  const currentPath = pathname?.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  const isInbox = currentPath === '/chatapp';
  const [subInboxes, setSubInboxes] = useState<{ name: string; icon: number }[]>([]);
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState(0);
  const createSubInbox = () => {
    const name = newName.trim();
    if (!name) return;
    setSubInboxes((list) => [...list, { name, icon: newIcon }]);
    toast.success(`Sub-inbox "${name}" created`);
    setNewName('');
    setNewIcon(0);
  };
  const SelectedIcon = iconChoices[newIcon] ?? Calendar;
  const inboxOptions = onInboxChange && inbox ? <>
    <p className="px-2 text-xs font-medium text-muted-foreground">Default Inboxes</p>
    <div className="mt-1 space-y-1">
      {[{ key: 'main' as const, label: 'Main Inbox', icon: MessageCircle }, { key: 'assigned' as const, label: 'Assigned to me', icon: UserRound }].map(({ key, label, icon: Icon }) => <Button key={key} asChild variant="ghost" className={cn('h-9 w-full justify-start px-2', inbox === key && 'bg-accent')}><a href={`/chatapp?inbox=${key}`} aria-current={inbox === key ? 'page' : undefined} onClick={(event) => { event.preventDefault(); onInboxChange(key); window.history.replaceState(null, '', `/chatapp?inbox=${key}`); }}><Icon />{label}</a></Button>)}
    </div>
    <p className="mt-4 px-2 text-xs font-medium text-muted-foreground">Your Inboxes</p>
    {subInboxes.length > 0 && <div className="mt-1 space-y-1">
      {subInboxes.map((box) => { const BoxIcon = iconChoices[box.icon] ?? Calendar; return <Button key={box.name} variant="ghost" className="h-9 w-full justify-start px-2"><BoxIcon />{box.name}</Button>; })}
    </div>}
    <div className="mt-1">
      <button type="button" popoverTarget="chat-sub-inbox" className="flex h-9 w-full cursor-pointer items-center gap-2 rounded-md px-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"><Plus className="size-4 shrink-0" />New sub-inbox</button>
    </div>
    <p className="mt-4 px-2 text-xs font-medium text-muted-foreground">Other Inboxes</p>
    <div className="mt-1 space-y-1">
      {[{ key: 'automated' as const, label: 'Automated', icon: Bot }, { key: 'spam' as const, label: 'Spam', icon: ShieldCheck }].map(({ key, label, icon: Icon }) => <Button key={key} asChild variant="ghost" className={cn('h-9 w-full justify-start px-2', inbox === key && 'bg-accent')}><a href={`/chatapp?inbox=${key}`} aria-current={inbox === key ? 'page' : undefined} onClick={(event) => { event.preventDefault(); onInboxChange(key); window.history.replaceState(null, '', `/chatapp?inbox=${key}`); }}><Icon />{label}</a></Button>)}
    </div>
  </> : null;
  const subInboxDialog = <div id="chat-sub-inbox" popover="auto" className="fixed inset-0 z-50 m-0 grid h-full w-full max-w-none place-items-center border-none bg-foreground/50 p-4 [&:not(:popover-open)]:hidden">
    <div role="dialog" aria-modal="true" aria-label="Create New Sub-Inbox" className="w-full max-w-[54rem] rounded-xl bg-background p-6 shadow-xl sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Create New Sub-Inbox</h2>
          <p className="mt-1 text-sm text-muted-foreground">Pick an icon and a name for your sub-inbox</p>
        </div>
        <Button variant="ghost" size="icon-sm" aria-label="Close" popoverTarget="chat-sub-inbox" popoverTargetAction="hide"><X /></Button>
      </div>
      <form onSubmit={(event) => { event.preventDefault(); createSubInbox(); }}>
      <div className="mt-6 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-end">
        <div>
          <p className="text-sm font-medium">Icon <span className="text-destructive">*</span></p>
          <details className="group/iconpicker relative mt-2">
            <summary className="grid size-14 cursor-pointer list-none place-items-center rounded-lg border bg-muted text-brand marker:hidden [&::-webkit-details-marker]:hidden"><SelectedIcon className="size-6" /></summary>
            <div className="absolute left-0 top-full z-10 mt-2 grid w-56 grid-cols-4 gap-1 rounded-lg border bg-popover p-2 shadow-lg">
              {iconChoices.map((Icon, index) => <Button key={index} variant={index === newIcon ? 'secondary' : 'ghost'} size="icon" aria-label={`Icon ${index + 1}`} onClick={(event) => { setNewIcon(index); const picker = (event.currentTarget.closest('details')); if (picker) picker.open = false; }}><Icon /></Button>)}
            </div>
          </details>
        </div>
        <div>
          <label htmlFor="sub-inbox-name" className="text-sm font-medium">Name of the Sub-Inbox <span className="text-destructive">*</span></label>
          <input id="sub-inbox-name" required value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="Enter the name of the sub-inbox" className="mt-2 h-14 w-full rounded-lg border bg-muted px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between gap-4">
        <a href="https://docs.lovable.dev" target="_blank" rel="noreferrer" className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground">Learn more</a>
        <Button type="submit" size="lg" popoverTarget="chat-sub-inbox" popoverTargetAction="hide">Create <CirclePlus /></Button>
      </div>
      </form>
    </div>
  </div>;
  return (
    <div className="chatapp-admin-theme dark flex h-dvh overflow-hidden bg-background text-foreground">
      {subInboxDialog}
      <aside className={cn('hidden shrink-0 flex-col border-r bg-sidebar transition-[width] md:flex', collapsed ? 'w-18' : 'w-62')}>
        <div className="flex h-22 items-center gap-3 border-b px-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-md border bg-background shadow-xs"><MessageCircle className="size-5 text-brand" /></span>
          {!collapsed && <div className="min-w-0"><p className="truncate text-sm font-bold">eatOS POS inc.</p><p className="truncate text-xs text-muted-foreground">www.eatos.com</p></div>}
        </div>
        <nav className="scrollbar-hidden flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {nav.map((item) => {
               const active = item.href ? currentPath === item.href || (item.href !== '/chatapp' && currentPath.startsWith(`${item.href}/`)) : false;
              const content = <><item.icon className="size-4 shrink-0" />{!collapsed && <span className="truncate">{item.label}</span>}{!collapsed && item.badge && <span className="ml-auto rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">{item.badge}</span>}</>;
              if (item.href && active && !collapsed && inboxOptions) return <details key={item.label} open className="group/inbox">
                <summary className="flex h-10 cursor-pointer list-none items-center gap-3 rounded-md bg-accent px-3 text-sm font-medium text-foreground shadow-xs marker:hidden [&::-webkit-details-marker]:hidden">{content}</summary>
                <div className="px-2 pb-3 pt-4">{inboxOptions}</div>
              </details>;
               if (item.label === 'Contacts' && active && !collapsed) return <div key={item.label}>
                 <Link href="/chatapp/contacts" className="flex h-10 items-center gap-3 rounded-md bg-accent px-3 text-sm font-medium text-foreground shadow-xs">{content}</Link>
                 <div className="px-2 pb-3 pt-3">
                   <p className="px-2 text-xs font-medium text-muted-foreground">Filters</p>
                    {contactFilters && contactFilters.length > 0 && <div className="mt-1 space-y-1">
                      {contactFilters.map((filter) => <Button key={filter.id} variant="ghost" onClick={() => onContactFilterChange?.(filter.id)} className={cn('h-9 w-full justify-start px-2', activeContactFilter === filter.id && 'bg-accent text-foreground')}><FilterIcon />{filter.name}</Button>)}
                    </div>}
                   <button type="button" popoverTarget="contacts-filter-create" className="mt-1 flex h-9 w-full items-center gap-2 rounded-md px-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"><Plus className="size-4" />Create filter</button>
                 </div>
               </div>;
              return <div key={item.label}>
                {item.href ? <Link href={item.href} title={collapsed ? item.label : undefined} onClick={() => { if (collapsed) onCollapsedChange(false); }} className={cn('flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors', active ? 'bg-accent text-foreground shadow-xs' : 'text-muted-foreground hover:bg-accent hover:text-foreground')}>{content}</Link> : <div title={collapsed ? item.label : undefined} className="flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground"><item.icon className="size-4 shrink-0" />{!collapsed && <span className="truncate">{item.label}</span>}{!collapsed && item.badge && <span className="ml-auto rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">{item.badge}</span>}</div>}
              </div>;
            })}
          </div>
        </nav>
        <div className="space-y-1 border-t p-3">
          {[{ label: 'Get help', icon: HelpCircle }, { label: 'Search', icon: Search }, { label: 'Plugins', icon: Plug }].map(({ label, icon: Icon }) => <div key={label} className="flex h-9 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground"><Icon className="size-4" />{!collapsed && label}</div>)}
          <Link href="/chatapp/settings" className={cn('flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium', currentPath === '/chatapp/settings' ? 'bg-accent shadow-xs' : 'hover:bg-accent')}><Settings className="size-4" />{!collapsed && 'Settings'}</Link>
          <div className="flex items-center gap-3 pt-3"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-primary-foreground">JS</span>{!collapsed && <div className="min-w-0"><p className="truncate text-xs font-semibold">eatOS Support</p><p className="truncate text-[11px] text-muted-foreground">Admin team</p></div>}</div>
        </div>
        <Button variant="outline" size="icon-sm" onClick={() => onCollapsedChange(!collapsed)} className="absolute bottom-4 z-10 hidden md:inline-flex" style={{ left: collapsed ? 56 : 236 }} aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}>{collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}</Button>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="relative flex h-14 shrink-0 items-center justify-between border-b bg-background px-4 md:hidden">
          <Link href="/chatapp" className="flex items-center gap-2 text-sm font-bold"><span className="grid size-8 place-items-center rounded-md bg-brand text-primary-foreground"><MessageCircle className="size-4" /></span>eatOS Chat</Link>
          <div className="flex items-center gap-1">
            {isInbox && inboxOptions ? <details className="group/mobile-inbox"><Button asChild variant="secondary" size="sm"><summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden"><Inbox /> Inbox</summary></Button><nav aria-label="Inbox folders" className="scrollbar-hidden absolute inset-x-0 top-full z-30 max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b bg-sidebar px-4 py-4 shadow-lg">{inboxOptions}</nav></details> : <Button asChild variant="ghost" size="sm"><Link href="/chatapp"><Inbox /> Inbox</Link></Button>}
            <Button asChild variant={currentPath === '/chatapp/settings' ? 'secondary' : 'ghost'} size="icon-sm"><Link href="/chatapp/settings" aria-label="Settings"><Settings /></Link></Button>
          </div>
        </header>
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}