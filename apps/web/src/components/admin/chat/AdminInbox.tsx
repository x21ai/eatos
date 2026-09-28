'use client';

import { useMemo, useState } from 'react';
import {
  ArrowLeft, Check, CircleUserRound, Clock3, Filter, Globe2,
  Info, Laptop, Mail, MessageCircle, MoreHorizontal, PanelRight, Plus,
  Search, Send, Smile, Sparkles, UserRound, Users, X,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import AdminChatShell from './AdminChatShell';
import { initialConversations, type Conversation, type Message as ChatMessage } from './mock-data';

type InboxKey = Conversation['inbox'] | 'all';

const inboxItems: { key: InboxKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'main', label: 'Main Inbox', icon: MessageCircle },
  { key: 'assigned', label: 'Assigned to me', icon: UserRound },
  { key: 'automated', label: 'Automated', icon: MessageCircle },
  { key: 'spam', label: 'Spam', icon: MessageCircle },
];

function ConversationList({ conversations, activeId, onSelect, inbox, onInboxChange }: { conversations: Conversation[]; activeId: string; onSelect: (id: string) => void; inbox: InboxKey; onInboxChange: (key: InboxKey) => void }) {
  const [query, setQuery] = useState('');
  const [openOnly, setOpenOnly] = useState(false);
  const filtered = conversations.filter((item) => (!openOnly || !item.resolved) && `${item.name} ${item.email} ${item.preview}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <section className="flex min-w-0 flex-1 flex-col border-r bg-background lg:max-w-100 xl:max-w-112">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-3">
        <select value={inbox} onChange={(event) => onInboxChange(event.target.value as InboxKey)} aria-label="Select inbox" className="h-9 min-w-0 rounded-md border bg-background px-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring lg:hidden">
          <option value="all">All conversations</option>{inboxItems.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
        </select>
        <div className="relative min-w-0 flex-1"><Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search conversations" className="pl-8" /></div>
        <Button variant={openOnly ? 'secondary' : 'ghost'} size="icon" onClick={() => setOpenOnly((value) => !value)} aria-label={openOnly ? 'Show all conversations' : 'Show open conversations only'} title={openOnly ? 'Showing open conversations' : 'Filter open conversations'}><Filter /></Button>
        <Button variant="ghost" size="icon" aria-label="Start conversation"><Plus /></Button>
      </header>
      <div className="scrollbar-hidden flex-1 overflow-y-auto">
        {filtered.length ? filtered.map((conversation) => (
          <Button key={conversation.id} variant="ghost" onClick={() => onSelect(conversation.id)} className={cn('h-auto w-full rounded-none border-b px-4 py-4 text-left hover:bg-accent/60', activeId === conversation.id && 'bg-accent')}>
            <Avatar className="size-11"><AvatarFallback className="bg-brand-soft font-semibold text-brand">{conversation.initials}</AvatarFallback></Avatar>
            <span className="min-w-0 flex-1"><span className="flex items-center gap-2"><span className="truncate font-semibold">{conversation.name}</span><span className="ml-auto shrink-0 text-[11px] font-normal text-muted-foreground">{conversation.date}</span></span><span className="mt-1 flex items-center gap-2 text-xs font-normal text-muted-foreground"><span>{conversation.flag}</span><span className="truncate">{conversation.preview}</span>{conversation.unread && <span className="ml-auto size-2 shrink-0 rounded-full bg-brand" />}</span></span>
          </Button>
        )) : <div className="grid h-48 place-items-center px-8 text-center text-sm text-muted-foreground">No conversations match this view.</div>}
      </div>
      <footer className="flex h-13 items-center justify-between border-t px-4 text-xs text-muted-foreground"><span>{filtered.length} conversations</span><span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-chart-2" /> Team online</span></footer>
    </section>
  );
}

function Transcript({ conversation, onBack, onShowDetails, onResolve, onSend }: { conversation: Conversation; onBack: () => void; onShowDetails: () => void; onResolve: () => void; onSend: (body: string, note: boolean) => void }) {
  const [draft, setDraft] = useState('');
  const [note, setNote] = useState(false);
  function submit() { const body = draft.trim(); if (!body) return; onSend(body, note); setDraft(''); }
  return (
    <section className="flex min-w-0 flex-1 flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onBack} aria-label="Back to conversations"><ArrowLeft /></Button>
        <Avatar><AvatarFallback className="bg-brand-soft text-brand">{conversation.initials}</AvatarFallback></Avatar>
        <div className="min-w-0 flex-1"><h1 className="truncate text-sm font-semibold">{conversation.name}</h1><p className="text-[11px] text-muted-foreground">{conversation.flag} {conversation.location}</p></div>
        <Button variant="ghost" size="icon" aria-label="Conversation actions"><MoreHorizontal /></Button>
        <Button variant={conversation.resolved ? 'outline' : 'default'} size="sm" onClick={onResolve}><Check />{conversation.resolved ? 'Reopen' : 'Resolve'}</Button>
        <Button variant="ghost" size="icon" className="xl:hidden" onClick={onShowDetails} aria-label="Show visitor details"><PanelRight /></Button>
      </header>
      <div className="scrollbar-hidden flex-1 space-y-5 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto w-fit rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground">21 September</div>
        {conversation.messages.map((message) => <MessageBubble key={message.id} message={message} initials={conversation.initials} />)}
      </div>
      <div className="shrink-0 border-t p-3">
        <div className={cn('rounded-md border bg-background shadow-sm', note && 'border-chart-4 bg-chart-4/10')}>
          <div className="flex items-center gap-1 border-b px-2 py-1.5">
            <Button variant={!note ? 'secondary' : 'ghost'} size="xs" onClick={() => setNote(false)}>Reply</Button>
            <Button variant={note ? 'secondary' : 'ghost'} size="xs" onClick={() => setNote(true)}>Note</Button>
            <Button variant="ghost" size="xs" className="ml-1">Reminder</Button><Button variant="ghost" size="xs">Shortcuts</Button>
          </div>
          <textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submit(); } }} placeholder={note ? 'Leave an internal note…' : `Send your message to ${conversation.name}…`} className="min-h-20 w-full resize-none bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground" />
          <div className="flex items-center gap-1 px-2 pb-2"><Button variant="ghost" size="icon-sm" aria-label="Add emoji"><Smile /></Button><Button variant="ghost" size="icon-sm" aria-label="AI tools"><Sparkles /></Button><Button onClick={submit} size="icon" className="ml-auto bg-brand text-primary-foreground hover:bg-brand-strong" aria-label={note ? 'Add note' : 'Send reply'}><Send /></Button></div>
        </div>
      </div>
    </section>
  );
}

function MessageBubble({ message, initials }: { message: ChatMessage; initials: string }) {
  if (message.author === 'note') return <div className="mx-auto max-w-xl rounded-md border border-chart-4/40 bg-chart-4/15 p-4 text-sm"><p className="mb-1 text-xs font-semibold">Internal note</p>{message.body}<p className="mt-2 text-[10px] text-muted-foreground">{message.time}</p></div>;
  const agent = message.author === 'agent';
  return <div className={cn('flex items-end gap-2', agent && 'justify-end')}>
    {!agent && <Avatar size="sm"><AvatarFallback className="text-[10px]">{initials}</AvatarFallback></Avatar>}
    <div className={cn('max-w-[78%] rounded-md px-4 py-3 text-sm leading-6', agent ? 'bg-primary text-primary-foreground' : 'border bg-card')}><p>{message.body}</p><p className={cn('mt-1 text-[10px]', agent ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{message.time}</p></div>
    {agent && <Avatar size="sm"><AvatarFallback className="bg-brand text-[10px] text-primary-foreground">JS</AvatarFallback></Avatar>}
  </div>;
}

function VisitorDetails({ conversation, onClose, onAssign }: { conversation: Conversation; onClose?: () => void; onAssign: (assignee: string) => void }) {
  return <aside className="scrollbar-hidden h-full w-full overflow-y-auto bg-background xl:w-86 xl:border-l">
    <div className="flex items-center justify-between border-b p-4 xl:hidden"><p className="font-semibold">Visitor details</p><Button variant="ghost" size="icon" onClick={onClose} aria-label="Close visitor details"><X /></Button></div>
    <div className="border-b p-5 text-center"><Avatar className="mx-auto size-16"><AvatarFallback className="bg-brand-soft text-lg font-semibold text-brand">{conversation.initials}</AvatarFallback></Avatar><h2 className="mt-3 truncate font-bold">{conversation.name}</h2><p className="mt-1 text-xs text-muted-foreground">{conversation.location}</p><Button className="mt-4 w-full bg-brand text-primary-foreground hover:bg-brand-strong"><CircleUserRound /> View visitor profile</Button></div>
    <DetailSection title="Conversation routing"><DetailRow icon={Users} text={conversation.assignee} /><select value={conversation.assignee} onChange={(event) => onAssign(event.target.value)} className="mt-3 h-9 w-full rounded-md border bg-background px-3 text-sm"><option>eatOS Support Team</option><option>Jaspreet Singh</option><option>Maya AI</option><option>Unassigned</option></select></DetailSection>
    <DetailSection title="Main information"><DetailRow icon={Globe2} text={conversation.location} /><DetailRow icon={Clock3} text={conversation.localTime} /><DetailRow icon={MessageCircle} text="Chat" /><DetailRow icon={Mail} text={conversation.email} /></DetailSection>
    <DetailSection title="Visitor device"><DetailRow icon={Laptop} text={conversation.browser} /><DetailRow icon={Globe2} text={conversation.ip} /><DetailRow icon={Info} text={conversation.page} /></DetailSection>
  </aside>;
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) { return <div className="border-b p-5"><h3 className="mb-4 text-xs font-bold">{title}</h3><div className="space-y-3">{children}</div></div>; }
function DetailRow({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) { return <div className="flex min-w-0 items-start gap-3 text-xs text-muted-foreground"><Icon className="mt-0.5 size-4 shrink-0" /><span className="min-w-0 break-words">{text}</span></div>; }

export default function AdminInbox() {
  const [collapsed, setCollapsed] = useState(false);
  const [inbox, setInbox] = useState<InboxKey>('main');
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(initialConversations[0].id);
  const [mobileChat, setMobileChat] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const visible = useMemo(() => inbox === 'all' ? conversations : conversations.filter((item) => item.inbox === inbox), [conversations, inbox]);
  const active = conversations.find((item) => item.id === activeId) ?? visible[0] ?? conversations[0];
  function selectConversation(id: string) { setActiveId(id); setMobileChat(true); setConversations((items) => items.map((item) => item.id === id ? { ...item, unread: false } : item)); }
  function send(body: string, note: boolean) { setConversations((items) => items.map((item) => item.id === active.id ? { ...item, preview: body, messages: [...item.messages, { id: `${Date.now()}`, author: note ? 'note' : 'agent', body, time: 'Now' }] } : item)); }
  function assign(assignee: string) { setConversations((items) => items.map((item) => item.id === active.id ? { ...item, assignee } : item)); }
  function changeInbox(key: InboxKey) { setInbox(key); const next = conversations.find((item) => item.inbox === key); if (next) setActiveId(next.id); }
  return <AdminChatShell collapsed={collapsed} onCollapsedChange={setCollapsed} inbox={inbox} onInboxChange={changeInbox}>
    <div className="flex h-full min-w-0">
      <div className={cn('min-w-0 flex-1 md:flex', mobileChat ? 'hidden md:flex' : 'flex')}><ConversationList conversations={visible} activeId={active.id} onSelect={selectConversation} inbox={inbox} onInboxChange={changeInbox} /></div>
      <div className={cn('min-w-0 flex-[1.55] md:flex', mobileChat ? 'flex' : 'hidden')}><Transcript conversation={active} onBack={() => setMobileChat(false)} onShowDetails={() => setShowDetails(true)} onResolve={() => setConversations((items) => items.map((item) => item.id === active.id ? { ...item, resolved: !item.resolved } : item))} onSend={send} /></div>
      <div className="hidden xl:block"><VisitorDetails conversation={active} onAssign={assign} /></div>
      {showDetails && <div className="fixed inset-0 z-50 flex justify-end bg-foreground/20 xl:hidden" onClick={() => setShowDetails(false)}><div className="h-full w-[min(90vw,22rem)] shadow-xl" onClick={(event) => event.stopPropagation()}><VisitorDetails conversation={active} onClose={() => setShowDetails(false)} onAssign={assign} /></div></div>}
    </div>
  </AdminChatShell>;
}