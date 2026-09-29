'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ArrowLeft, Ban, ChevronDown, FileText, Languages, MessageCircle, Minus, MonitorUp,
  MoreHorizontal, Phone, Plus, Search, Send, Smile, Sparkle, UserRound, Video,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import AdminChatShell from './AdminChatShell';
import { findLiveVisitor, liveVisitors, type LiveVisitor } from './visitor-data';
import worldMap from './assets/visitor-world-map.jpg';

const toneClasses: Record<LiveVisitor['tone'], string> = {
  violet: 'bg-chart-4',
  mint: 'bg-chart-2',
  blue: 'bg-chart-1',
  gold: 'bg-chart-5',
  coral: 'bg-destructive/75',
};

function VisitorAvatar({ visitor, compact = false }: { visitor: LiveVisitor; compact?: boolean }) {
  return <span className={cn('relative grid shrink-0 place-items-center rounded-full text-primary-foreground shadow-sm', compact ? 'size-11' : 'size-12', toneClasses[visitor.tone])}>
    <UserRound className={compact ? 'size-5' : 'size-6'} />
    <span className={cn('absolute -left-0.5 top-0 size-3 rounded-full border-2 border-background', visitor.activity === 'online' ? 'bg-visitor-online' : 'bg-visitor-away')} />
    <span className="absolute -bottom-1 -right-1 text-sm leading-none" aria-label={visitor.country}>{visitor.flag}</span>
  </span>;
}

function HoverActions({ visitor }: { visitor: LiveVisitor }) {
  return <div className="pointer-events-none absolute inset-x-2 top-2 z-10 flex translate-y-1 items-center gap-2 rounded-lg bg-accent p-3 opacity-0 shadow-sm transition group-hover/visitor:pointer-events-auto group-hover/visitor:translate-y-0 group-hover/visitor:opacity-100 group-focus-within/visitor:pointer-events-auto group-focus-within/visitor:translate-y-0 group-focus-within/visitor:opacity-100">
    <VisitorAvatar visitor={visitor} compact />
    <Button asChild className="h-10 flex-1 bg-visitor-pending text-primary-foreground hover:bg-visitor-pending/90">
      <Link href={`/chatapp/visitors/${visitor.id}`}><Sparkle />MagicBrowse</Link>
    </Button>
    <Button asChild variant="outline" size="icon" className="size-10 bg-background" aria-label={`Open conversation with ${visitor.name}`}>
      <Link href={`/chatapp?visitor=${visitor.id}`}><MessageCircle /></Link>
    </Button>
    <Button asChild size="icon" className="size-10" aria-label={`View ${visitor.name}`}>
      <Link href={`/chatapp/visitors/${visitor.id}`}><MonitorUp /></Link>
    </Button>
  </div>;
}

function VisitorRow({ visitor, compact = false, selected = false }: { visitor: LiveVisitor; compact?: boolean; selected?: boolean }) {
  if (compact) return <Link href={`/chatapp/visitors/${visitor.id}`} aria-label={`Select ${visitor.name}`} className={cn('flex h-20 items-center justify-center border-b transition-colors hover:bg-accent', selected && 'bg-accent')}><VisitorAvatar visitor={visitor} compact /></Link>;
  return <div className="group/visitor relative min-h-21 border-b px-4 py-4">
    <HoverActions visitor={visitor} />
    <Link href={`/chatapp/visitors/${visitor.id}`} className="flex items-center gap-4 outline-none">
      <VisitorAvatar visitor={visitor} />
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold">{visitor.name}</span>
        <span className="mt-1 block truncate text-sm text-muted-foreground">{visitor.page}</span>
      </span>
    </Link>
  </div>;
}

function VisitorsList() {
  const [query, setQuery] = useState('');
  const shown = useMemo(() => liveVisitors.filter((visitor) => `${visitor.name} ${visitor.city} ${visitor.country}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <section className="flex h-full min-h-0 w-full shrink-0 flex-col border-r bg-background md:w-86 lg:w-92">
    <header className="flex h-16 shrink-0 items-center justify-center gap-4 border-b px-4">
      <h1 className="text-sm font-bold uppercase">Visitors</h1>
      <span className="inline-flex items-center gap-2 rounded-md bg-visitor-away px-3 py-1.5 text-xs font-semibold text-primary-foreground"><span className="size-2 rounded-full bg-primary-foreground" />Live</span>
    </header>
    <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto px-3">{shown.map((visitor) => <VisitorRow key={visitor.id} visitor={visitor} />)}</div>
    <div className="shrink-0 border-t p-4">
      <label className="flex h-12 items-center gap-3 rounded-lg border bg-background px-4 text-muted-foreground shadow-xs"><Search className="size-4" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter by name, city..." className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" /></label>
    </div>
  </section>;
}

function VisitorsMap() {
  const [zoom, setZoom] = useState(1);
  return <section className="relative hidden min-w-0 flex-1 overflow-hidden bg-visitor-map md:block" aria-label="Live visitor map">
    <Image src={worldMap} alt="World map showing live visitor locations" fill priority sizes="(min-width: 768px) 75vw, 100vw" className="object-cover" style={{ transform: `scale(${zoom})` }} />
    <div className="absolute left-3 top-3 overflow-hidden rounded-md bg-visitor-map-panel text-primary-foreground shadow-lg">
      <div className="space-y-2 px-7 py-5"><p><strong className="mr-2 text-2xl">6</strong>online users</p><p className="text-sm"><strong className="mr-2 text-xl text-visitor-online">2</strong>active users now</p></div>
      <p className="border-t border-primary-foreground/10 px-7 py-4 text-xs font-semibold text-primary-foreground/70">Live view from MagicMap</p>
    </div>
    {liveVisitors.map((visitor) => <Link key={visitor.id} href={`/chatapp/visitors/${visitor.id}`} aria-label={`${visitor.name} in ${visitor.city}`} className="absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-primary-foreground/50 bg-primary-foreground shadow-lg transition-transform hover:scale-125" style={{ left: `${visitor.mapX}%`, top: `${visitor.mapY}%` }} />)}
    <div className="absolute bottom-4 right-4 flex flex-col gap-2 rounded-xl bg-primary-foreground/35 p-2 shadow-lg">
      <Button size="icon" onClick={() => setZoom((value) => Math.min(1.35, value + 0.08))} aria-label="Zoom in"><Plus /></Button>
      <Button size="icon" variant="secondary" onClick={() => setZoom((value) => Math.max(1, value - 0.08))} aria-label="Zoom out"><Minus /></Button>
    </div>
  </section>;
}

function VisitorRail({ selected }: { selected: LiveVisitor }) {
  return <aside className="scrollbar-hidden flex shrink-0 overflow-x-auto border-b bg-background md:h-full md:w-20 md:flex-col md:overflow-y-auto md:border-b-0 md:border-r">
    {liveVisitors.map((visitor) => <VisitorRow key={visitor.id} visitor={visitor} compact selected={visitor.id === selected.id} />)}
  </aside>;
}

function MagicBrowse({ visitor }: { visitor: LiveVisitor }) {
  return <section className="relative flex min-h-65 min-w-0 flex-1 flex-col bg-muted/35 md:min-h-0">
    <header className="flex h-14 shrink-0 items-center justify-center border-b bg-background px-4 text-xs text-muted-foreground"><Sparkle className="mr-2 size-4" />MagicBrowse</header>
    <div className="m-3 flex flex-1 items-center justify-center rounded-lg border bg-muted/20 p-8 text-center">
      <div><h2 className="flex items-center justify-center gap-3 text-xl font-bold"><Sparkle />MagicBrowse</h2><p className="mt-6 font-semibold">Oops, connection to the user chatbox was lost.</p><p className="mt-3 text-sm text-muted-foreground">{visitor.name} may have gone offline, or closed their browser.</p></div>
    </div>
  </section>;
}

function VisitorConversation({ visitor }: { visitor: LiveVisitor }) {
  const [status, setStatus] = useState('Pending');
  const [message, setMessage] = useState('');
  return <section className="flex min-h-0 w-full shrink-0 flex-col border-l bg-background md:w-[34%] md:min-w-80 xl:w-[31%]">
    <header className="flex h-14 shrink-0 items-center gap-1 border-b px-3">
      <Button variant="ghost" size="icon-sm" onClick={() => toast.success('Demo phone call started')} aria-label="Call visitor"><Phone /></Button>
      <Button variant="ghost" size="icon-sm" onClick={() => toast.success('Demo video call started')} aria-label="Video call"><Video /></Button>
      <Button variant="ghost" size="icon-sm" onClick={() => toast.success('Visitor blocked in this demo')} aria-label="Block visitor"><Ban /></Button>
      <details className="relative"><summary className="grid size-8 cursor-pointer list-none place-items-center rounded-md hover:bg-accent [&::-webkit-details-marker]:hidden" aria-label="More options"><MoreHorizontal className="size-4" /></summary><div className="absolute right-0 top-full z-40 mt-2 w-[13rem] rounded-md border bg-popover p-1 shadow-lg"><Button variant="ghost" className="w-full justify-start">Mark as unread</Button><Button variant="ghost" className="w-full justify-start">Set subject</Button><Button variant="ghost" className="w-full justify-start">View profile</Button></div></details>
      <Button variant="ghost" size="icon-sm" className="ml-1" aria-label="View transcript"><FileText /></Button>
      <Button className="ml-auto bg-visitor-pending text-primary-foreground hover:bg-visitor-pending/90" onClick={() => setStatus((value) => value === 'Pending' ? 'Resolved' : 'Pending')}><Send className="rotate-180" />{status}</Button>
    </header>
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex justify-center py-3"><Button variant="outline" className="rounded-full text-visitor-pending" onClick={() => toast.success('LiveTranslate started')}><Languages />Start LiveTranslate</Button></div>
      <div className="min-h-30 flex-1" />
      <p className="mx-3 mb-3 truncate rounded-md bg-visitor-map-highlight/45 px-4 py-3 text-xs font-semibold">This conversation has not yet been started. Send a message to begin.</p>
      <div className="m-3 mt-0 overflow-hidden rounded-lg border shadow-xs">
        <div className="scrollbar-hidden flex items-center gap-1 overflow-x-auto border-b px-3 py-2 text-xs font-medium"><span className="rounded-md border border-visitor-pending px-3 py-2 text-visitor-pending">Reply</span><span className="px-3 py-2">Edit</span><span className="px-3 py-2">Note</span><span className="px-3 py-2">Shortcuts</span><span className="px-3 py-2">Knowledge Base</span><ChevronDown className="ml-auto size-4 shrink-0" /></div>
        <div className="flex min-h-16 items-end gap-2 px-4 py-3"><textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Send your message in chat..." className="min-h-10 min-w-0 flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground" /><Button variant="ghost" size="icon-sm" aria-label="Format message">Aa</Button><Button variant="ghost" size="icon-sm" aria-label="Add emoji"><Smile /></Button><Button size="icon" className="bg-visitor-pending text-primary-foreground hover:bg-visitor-pending/90" onClick={() => { if (!message.trim()) return; toast.success('Demo message sent'); setMessage(''); }} aria-label="Send message"><Send /></Button></div>
      </div>
    </div>
  </section>;
}

function SelectedVisitor({ visitor }: { visitor: LiveVisitor }) {
  return <div className="flex h-full min-h-0 flex-col md:flex-row">
    <div className="flex items-center border-b px-3 py-2 md:hidden"><Button asChild variant="ghost" size="sm"><Link href="/chatapp/visitors"><ArrowLeft />All visitors</Link></Button><span className="ml-auto text-xs font-semibold">{visitor.name}</span></div>
    <VisitorRail selected={visitor} />
    <div className="scrollbar-hidden flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto md:flex-row md:overflow-hidden"><MagicBrowse visitor={visitor} /><VisitorConversation visitor={visitor} /></div>
  </div>;
}

export default function AdminVisitors({ visitorId }: { visitorId?: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const selected = visitorId ? findLiveVisitor(visitorId) : undefined;
  return <AdminChatShell collapsed={collapsed} onCollapsedChange={setCollapsed}>
    {selected ? <SelectedVisitor visitor={selected} /> : <div className="flex h-full min-w-0"><VisitorsList /><VisitorsMap /></div>}
  </AdminChatShell>;
}
