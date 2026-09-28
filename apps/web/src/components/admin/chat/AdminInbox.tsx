'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, BadgeCheck, Ban, Check, ChevronDown, CircleUserRound, Clock3, Download, Globe2,
  Info, Laptop, Link, Mail, MapPin, MessageCircle, MessageSquareOff, MoreHorizontal, PanelRight,
  PenLine, Phone, Send, Smile, Sparkles, Trash2, UserRound, Users, Video, X, Zap,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import AdminChatShell from './AdminChatShell';
import { ConversationToolbar, matchesCustomFilter, type ConversationView } from './ConversationToolbar';
import { initialConversations, type Conversation, type Message as ChatMessage } from './mock-data';

type InboxKey = Conversation['inbox'] | 'all';

function ConversationList({ conversations, activeId, onSelect, onCreateConversation }: { conversations: Conversation[]; activeId: string; onSelect: (id: string) => void; onCreateConversation: (values: { email: string; name: string; subject: string }) => void }) {
  const [view, setView] = useState<ConversationView>('all');
  const [customFilter, setCustomFilter] = useState<Parameters<typeof matchesCustomFilter>[1]>();
  const filtered = useMemo(() => {
    const items = conversations.filter((item) => {
      if (!matchesCustomFilter(item, customFilter)) return false;
      if (customFilter || view === 'all' || view === 'recent' || view === 'waiting') return true;
      if (view === 'unread') return item.unread;
      if (view === 'pending') return !item.resolved && item.assignee === 'Unassigned';
      if (view === 'unresolved') return !item.resolved;
      if (view === 'resolved') return item.resolved;
      return item.messages.some((message) => message.author === 'note' && message.body.includes('@'));
    });
    return view === 'waiting' ? [...items].reverse() : items;
  }, [conversations, customFilter, view]);
  return (
    <section className="flex min-w-0 flex-1 flex-col border-r bg-background lg:max-w-100 xl:max-w-112">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-3">
        <ConversationToolbar view={view} onViewChange={setView} customFilter={customFilter} onCustomFilterChange={setCustomFilter} onCreateConversation={onCreateConversation} />
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

const inboxTargets: { key: Conversation['inbox']; label: string }[] = [
  { key: 'main', label: 'Main Inbox' },
  { key: 'assigned', label: 'Assigned to me' },
  { key: 'automated', label: 'Automated' },
  { key: 'spam', label: 'Spam' },
];

function copyConversationLink() {
  try { void navigator.clipboard?.writeText(window.location.href); } catch { /* clipboard unavailable */ }
}

function Transcript({
  conversation, onBack, onShowDetails, onResolve, onSend, onNavigate, onMarkUnread, onMoveToInbox, onDelete, onSetSubject,
}: {
  conversation: Conversation;
  onBack: () => void;
  onShowDetails: () => void;
  onResolve: () => void;
  onSend: (body: string, note: boolean) => void;
  onNavigate: (direction: 1 | -1) => void;
  onMarkUnread: () => void;
  onMoveToInbox: (inbox: Conversation['inbox']) => void;
  onDelete: () => void;
  onSetSubject: (subject: string) => void;
}) {
  const [draft, setDraft] = useState('');
  const [note, setNote] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [subjectDraft, setSubjectDraft] = useState(conversation.subject ?? '');
  const navigateRef = useRef(onNavigate);
  useEffect(() => { navigateRef.current = onNavigate; });
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!event.ctrlKey || !event.altKey) return;
      if (event.key === 'ArrowUp') { event.preventDefault(); navigateRef.current(-1); }
      else if (event.key === 'ArrowDown') { event.preventDefault(); navigateRef.current(1); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  function submit() { const body = draft.trim(); if (!body) return; onSend(body, note); setDraft(''); }
  function saveSubject() { onSetSubject(subjectDraft.trim()); setSubjectOpen(false); }
  return (
    <section className="flex min-w-0 flex-1 flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center gap-1 border-b px-2 md:gap-1.5 md:px-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onBack} aria-label="Back to conversations"><ArrowLeft /></Button>
        <Avatar><AvatarFallback className="bg-brand-soft text-brand">{conversation.initials}</AvatarFallback></Avatar>
        <div className="min-w-0 flex-1"><h1 className="truncate text-sm font-semibold">{conversation.name}</h1><p className="text-[11px] text-muted-foreground">{conversation.flag} {conversation.location}</p></div>
        <div className="flex shrink-0 items-center gap-0.5">
          <Button variant="ghost" size="icon-sm" aria-label="Call visitor"><Phone /></Button>
          <Button variant="ghost" size="icon-sm" aria-label="Start video call"><Video /></Button>
          <Button variant="ghost" size="icon-sm" aria-label="Block visitor"><Ban /></Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon-sm" aria-label="Conversation actions"><MoreHorizontal /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuItem onSelect={onMarkUnread}><MessageSquareOff /> Mark as unread</DropdownMenuItem>
              <DropdownMenuItem onSelect={copyConversationLink}><Link /> Copy link</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => { setSubjectDraft(conversation.subject ?? ''); setSubjectOpen(true); }}><PenLine /> Set Subject</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger><Mail /> Transcript</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem><Mail /> Email transcript</DropdownMenuItem>
                  <DropdownMenuItem><Download /> Download transcript</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger><ArrowRight /> Move to inbox</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {inboxTargets.map((target) => (
                    <DropdownMenuItem key={target.key} onSelect={() => onMoveToInbox(target.key)}>{target.label}</DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => onNavigate(1)}>Next<DropdownMenuShortcut>Ctrl Alt ↑</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onNavigate(-1)}>Previous<DropdownMenuShortcut>Ctrl Alt ↓</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => onMoveToInbox('spam')}><Trash2 /> Mark as spam</DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onSelect={onDelete}><Trash2 /> Delete conversation</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onResolve}
          className={cn('ml-1 shrink-0 gap-1.5 text-white', conversation.resolved ? 'bg-chart-2 hover:bg-chart-2/90' : 'bg-chart-5 hover:bg-chart-5/90')}
        >
          {conversation.resolved ? <Check /> : <ArrowRight />}
          <span className="whitespace-nowrap">{conversation.resolved ? 'Resolved' : 'Unresolved'}</span>
        </Button>
        <Button variant="ghost" size="icon" className="hidden xl:inline-flex" onClick={onShowDetails} aria-label="Show visitor details"><PanelRight /></Button>
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
      <Dialog open={subjectOpen} onOpenChange={setSubjectOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Set Subject</DialogTitle>
            <DialogDescription>Add a subject to this conversation.</DialogDescription>
          </DialogHeader>
          <Input value={subjectDraft} onChange={(event) => setSubjectDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); saveSubject(); } }} placeholder="Subject" aria-label="Conversation subject" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setSubjectOpen(false)}>Cancel</Button>
            <Button onClick={saveSubject}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
  const [participants, setParticipants] = useState(conversation.participants);
  return <aside className="scrollbar-hidden h-full w-full overflow-y-auto bg-background xl:w-86 xl:border-l">
    <div className="flex items-center justify-between border-b p-4 xl:hidden"><p className="font-semibold">Visitor details</p><Button variant="ghost" size="icon" onClick={onClose} aria-label="Close visitor details"><X /></Button></div>
    <div className="border-b p-5 text-center">
      <Avatar className="mx-auto size-16"><AvatarFallback className="bg-brand-soft text-lg font-semibold text-brand">{conversation.initials}</AvatarFallback></Avatar>
      <h2 className="mt-3 truncate font-bold">{conversation.name}</h2>
      <p className="mt-1 flex items-center justify-center gap-1 truncate text-xs text-muted-foreground">{conversation.verified && <BadgeCheck className="size-3.5 shrink-0 text-chart-2" />}<span className="truncate underline">{conversation.email}</span></p>
      <p className="mt-1 text-xs text-muted-foreground">{conversation.flag} {conversation.location}</p>
      <Button className="mt-4 w-full bg-brand text-primary-foreground hover:bg-brand-strong"><CircleUserRound /> View {conversation.name.split(' ')[0]} profile</Button>
    </div>
    <DetailSection title="Conversation Routing">
      <DetailRow icon={Users} text={conversation.assignee} />
      <select value={conversation.assignee} onChange={(event) => onAssign(event.target.value)} className="mt-3 h-9 w-full rounded-md border bg-background px-3 text-sm"><option>eatOS Support Team</option><option>Jaspreet Singh</option><option>Maya AI</option><option>Unassigned</option></select>
    </DetailSection>
    <DetailSection title="Main information">
      <DetailRow icon={MapPin} text={conversation.location} />
      <DetailRow icon={Clock3} text={conversation.localTime} />
      <DetailRow icon={Globe2} text={conversation.languages} />
      <DetailRow icon={MessageCircle} text="Chat" />
      <DetailRow icon={Info} text={conversation.page} />
      <DetailRow icon={Mail} text={conversation.email} />
    </DetailSection>
    <DetailSection title="Visitor device">
      <DetailRow icon={Laptop} text={conversation.browser} />
      <DetailRow icon={Globe2} text={`${conversation.ip} ${conversation.isp}`} />
    </DetailSection>
    <DetailSection title="Conversation participants" action={<Button variant="link" size="xs" className="text-brand" onClick={() => setParticipants((items) => [...items, `guest${items.length + 1}@example.com`])}>Add</Button>}>
      {participants.map((participant) => <DetailRow key={participant} icon={Mail} text={participant} />)}
    </DetailSection>
    <DetailSection title="Quick jump">
      <DetailRow icon={Zap} text="No quick jump links yet." />
    </DetailSection>
  </aside>;
}

function DetailSection({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return <div className="border-b">
    <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center gap-2 px-5 py-3 text-left text-xs font-bold" aria-expanded={open}>
      <span className="flex-1">{title}</span>{action}<ChevronDown className={cn('size-4 text-muted-foreground transition-transform', !open && '-rotate-90')} />
    </button>
    {open && <div className="space-y-3 px-5 pb-4">{children}</div>}
  </div>;
}
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
  function createConversation({ email, name, subject }: { email: string; name: string; subject: string }) {
    const displayName = name.trim() || email.split('@')[0] || 'New visitor';
    const id = `conversation-${Date.now()}`;
    const created: Conversation = { id, name: displayName, initials: displayName.split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'NV', email, location: 'Unknown', country: 'Unknown', flag: '🌐', localTime: 'Now', browser: 'Unknown device', ip: 'Pending', isp: 'Pending', languages: '🌐', verified: false, participants: [email], page: 'Email conversation', preview: subject.trim() || 'New email conversation', date: 'Now', inbox: 'main', unread: false, resolved: false, assignee: 'Unassigned', messages: subject.trim() ? [{ id: `message-${Date.now()}`, author: 'note', body: `Subject: ${subject.trim()}`, time: 'Now' }] : [] };
    setConversations((items) => [created, ...items]); setInbox('main'); setActiveId(id); setMobileChat(true);
  }
  return <AdminChatShell collapsed={collapsed} onCollapsedChange={setCollapsed} inbox={inbox} onInboxChange={changeInbox}>
    <div className="flex h-full min-w-0">
      <div className={cn('min-w-0 flex-1 md:flex', mobileChat ? 'hidden md:flex' : 'flex')}><ConversationList conversations={visible} activeId={active.id} onSelect={selectConversation} onCreateConversation={createConversation} /></div>
      <div className={cn('min-w-0 flex-[1.55] md:flex', mobileChat ? 'flex' : 'hidden')}><Transcript conversation={active} onBack={() => setMobileChat(false)} onShowDetails={() => setShowDetails(true)} onResolve={() => setConversations((items) => items.map((item) => item.id === active.id ? { ...item, resolved: !item.resolved } : item))} onSend={send} /></div>
      <div className="hidden xl:block"><VisitorDetails conversation={active} onAssign={assign} /></div>
      {showDetails && <div className="fixed inset-0 z-50 flex justify-end bg-foreground/20 xl:hidden" onClick={() => setShowDetails(false)}><div className="h-full w-[min(90vw,22rem)] shadow-xl" onClick={(event) => event.stopPropagation()}><VisitorDetails conversation={active} onClose={() => setShowDetails(false)} onAssign={assign} /></div></div>}
    </div>
  </AdminChatShell>;
}