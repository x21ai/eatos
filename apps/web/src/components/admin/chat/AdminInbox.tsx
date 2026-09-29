'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
  ArrowLeft, ArrowRight, BadgeCheck, Ban, Check, ChevronDown, CircleUserRound, Clock3, Download, Globe2,
  Info, Laptop, Link, Mail, MapPin, MessageCircle, MoreHorizontal, PanelRight,
  Phone, Send, Smile, Sparkles, Trash2, UserRound, Users, Video, X, Zap,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
    <section className="flex min-w-0 flex-1 flex-col border-r bg-background">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-3">
        <ConversationToolbar view={view} onViewChange={setView} customFilter={customFilter} onCustomFilterChange={setCustomFilter} onCreateConversation={onCreateConversation} />
      </header>
      <div className="scrollbar-hidden flex-1 overflow-y-auto">
        {filtered.length ? filtered.map((conversation) => (
          <Button key={conversation.id} asChild variant="ghost" className={cn('h-auto w-full justify-start rounded-none border-b px-4 py-4 text-left hover:bg-accent/60', activeId === conversation.id && 'bg-accent')}><a href={`/chatapp?c=${encodeURIComponent(conversation.id)}`} aria-current={activeId === conversation.id ? 'true' : undefined} onClick={(event) => { event.preventDefault(); onSelect(conversation.id); window.history.replaceState(null, '', `/chatapp?c=${encodeURIComponent(conversation.id)}`); }}>
            <Avatar className="size-11"><AvatarFallback className="bg-brand-soft font-semibold text-brand">{conversation.initials}</AvatarFallback></Avatar>
            <span className="min-w-0 flex-1"><span className="flex items-center gap-2"><span className="truncate font-semibold">{conversation.name}</span><span className="ml-auto shrink-0 text-[11px] font-normal text-muted-foreground">{conversation.date}</span></span><span className="mt-1 flex items-center gap-2 text-xs font-normal text-muted-foreground"><span>{conversation.flag}</span><span className="truncate">{conversation.preview}</span>{conversation.unread && <span className="ml-auto size-2 shrink-0 rounded-full bg-brand" />}</span></span>
          </a></Button>
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

function ShortcutKeys({ direction }: { direction: 'up' | 'down' }) {
  return (
    <span className="ml-auto flex items-center gap-1 tracking-normal text-muted-foreground">
      <kbd className="grid h-6 min-w-7 place-items-center rounded border border-muted-foreground bg-muted px-1 text-[11px] font-semibold leading-none text-foreground shadow-[inset_0_-1px_0_var(--color-muted-foreground)]">Ctrl</kbd>
      <kbd className="grid h-6 min-w-7 place-items-center rounded border border-muted-foreground bg-muted px-1 text-[11px] font-semibold leading-none text-foreground shadow-[inset_0_-1px_0_var(--color-muted-foreground)]">Alt</kbd>
      <kbd className="grid size-6 place-items-center rounded border border-muted-foreground bg-muted text-sm font-semibold leading-none text-foreground shadow-[inset_0_-1px_0_var(--color-muted-foreground)]" aria-label={direction === 'up' ? 'Up arrow' : 'Down arrow'}>{direction === 'up' ? '↑' : '↓'}</kbd>
    </span>
  );
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
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Conversation link copied');
    } catch {
      toast.error('The conversation link could not be copied');
    }
  }
  function downloadTranscript() {
    const lines = conversation.messages.map((message) => `${message.time}  ${message.author}: ${message.body}`);
    const blob = new Blob([[conversation.subject, ...lines].filter(Boolean).join('\n\n')], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.download = `${conversation.id}-transcript.txt`;
    anchor.click();
    URL.revokeObjectURL(href);
    toast.success('Transcript downloaded');
  }
  return (
    <section className="flex min-w-0 flex-1 flex-col bg-background">
      <header className="relative z-50 flex h-14 shrink-0 items-center gap-1 border-b px-2 md:gap-1.5 md:px-3">
        <Button asChild variant="ghost" size="icon" className="md:hidden"><a href="/chatapp" aria-label="Back to conversations" onClick={(event) => { event.preventDefault(); onBack(); }}><ArrowLeft /></a></Button>
        <div className="flex shrink-0 items-center gap-0.5">
          <Button variant="ghost" size="icon-sm" onClick={() => toast.info(`Demo call started with ${conversation.name}`)} aria-label="Call visitor"><Phone /></Button>
          <Button variant="ghost" size="icon-sm" onClick={() => toast.info(`Demo video call started with ${conversation.name}`)} aria-label="Start video call"><Video /></Button>
          <Button variant="ghost" size="icon-sm" onClick={() => toast.warning(`${conversation.name} is blocked for this demo session`)} aria-label="Block visitor"><Ban /></Button>
          <details className="group/actions relative">
            <summary className="flex size-8 cursor-pointer list-none items-center justify-center rounded-md text-foreground outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden" aria-label="Conversation actions"><MoreHorizontal className="size-4" /></summary>
            <div role="menu" className="absolute left-0 top-full z-50 mt-1.5 w-68 overflow-visible rounded-lg border bg-popover text-popover-foreground shadow-lg">
              <Button variant="ghost" className="h-10 w-full justify-start rounded-none px-4 text-[15px] font-normal" onClick={onMarkUnread}><MessageCircle /> Mark as unread</Button>
              <Button variant="ghost" className="h-10 w-full justify-start rounded-none px-4 text-[15px] font-normal" onClick={() => void copyLink()}><Link /> Copy link</Button>
              <Button variant="ghost" className="h-10 w-full justify-start rounded-none px-4 text-[15px] font-normal" onClick={() => { setSubjectDraft(conversation.subject ?? ''); setSubjectOpen(true); }}><Mail /> Set Subject</Button>
              <details className="group/transcript relative">
                <summary className="flex h-10 cursor-pointer list-none items-center gap-2 px-4 text-[15px] hover:bg-accent [&::-webkit-details-marker]:hidden"><Mail className="size-4 text-muted-foreground" /> Transcript <span className="ml-auto">›</span></summary>
                <div className="absolute left-full top-0 z-50 ml-1 w-[14rem] overflow-hidden rounded-md border bg-popover p-1 shadow-lg max-md:left-0 max-md:top-full max-md:ml-0">
                  <Button variant="ghost" className="h-10 w-full justify-start" onClick={() => toast.success('Transcript will be sent to you')}>Send to me</Button>
                  <Button variant="ghost" className="h-10 w-full justify-start" onClick={() => toast.success('Transcript will be sent to Wazirabad')}>Send to Wazirabad</Button>
                  <Button variant="ghost" className="h-10 w-full justify-start" onClick={() => toast.info('Choose a teammate to receive the transcript')}>Send to someone else</Button>
                  <div className="my-1 h-px bg-border" />
                  <Button variant="ghost" className="h-10 w-full justify-start" onClick={() => toast.success(`Text transcript queued for ${conversation.email}`)}><Mail /> Email text transcript</Button>
                  <Button variant="ghost" className="h-10 w-full justify-start" onClick={downloadTranscript}><Download /> Download</Button>
                </div>
              </details>
              <div className="h-px bg-border" />
              <details className="group/inbox relative">
                <summary className="flex h-12 cursor-pointer list-none items-center gap-2 px-4 text-[15px] hover:bg-accent [&::-webkit-details-marker]:hidden"><ArrowRight className="size-4 text-muted-foreground" /> Move to inbox <span className="ml-auto">›</span></summary>
                <div className="absolute left-full top-0 z-50 ml-1 w-52 overflow-hidden rounded-md border bg-popover p-1 shadow-lg max-md:left-0 max-md:top-full max-md:ml-0">
                  {inboxTargets.map((target) => <Button variant="ghost" className="h-10 w-full justify-start" key={target.key} onClick={() => onMoveToInbox(target.key)}>{target.label}</Button>)}
                </div>
              </details>
              <div className="h-px bg-border" />
              <Button variant="ghost" className="h-12 w-full justify-start rounded-none pl-12 pr-4 text-[15px] font-normal" onClick={() => onNavigate(-1)}>Next<ShortcutKeys direction="up" /></Button>
              <Button variant="ghost" className="h-12 w-full justify-start rounded-none pl-12 pr-4 text-[15px] font-normal" onClick={() => onNavigate(1)}>Previous<ShortcutKeys direction="down" /></Button>
              <div className="h-px bg-border" />
              <Button variant="ghost" className="h-10 w-full justify-start rounded-none px-4 text-[15px] font-normal" onClick={() => onMoveToInbox('spam')}><Trash2 /> Mark as spam</Button>
              <Button variant="ghost" className="h-10 w-full justify-start rounded-none px-4 text-[15px] font-normal text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={onDelete}><Trash2 /> Delete conversation</Button>
            </div>
          </details>
        </div>
        <div className="min-w-0 flex-1" />
        <Button
          variant="ghost"
          size="sm"
          onClick={onResolve}
          className={cn('shrink-0 gap-1.5 text-white', conversation.resolved ? 'bg-chart-2 hover:bg-chart-2/90' : 'bg-chart-5 hover:bg-chart-5/90')}
        >
          {conversation.resolved ? <Check /> : <ArrowRight />}
          <span className="whitespace-nowrap">{conversation.resolved ? 'Resolved' : 'Unresolved'}</span>
        </Button>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onShowDetails} aria-label="Show visitor details"><PanelRight /></Button>
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
  useEffect(() => setParticipants(conversation.participants), [conversation.id, conversation.participants]);
  return <aside className="scrollbar-hidden h-full w-full overflow-y-auto bg-background lg:w-80 lg:border-l 2xl:w-96">
    <div className="flex items-center justify-between border-b p-4 lg:hidden"><p className="font-semibold">Visitor details</p><Button variant="ghost" size="icon" onClick={onClose} aria-label="Close visitor details"><X /></Button></div>
    <div className="border-b px-6 py-6">
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative shrink-0">
          <Avatar className="size-18"><AvatarFallback className="bg-brand-soft text-2xl font-medium text-brand">{conversation.initials}</AvatarFallback></Avatar>
          <span className="absolute -left-0.5 -top-0.5 size-4 rounded-full border-2 border-background bg-chart-4" aria-label="Online" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-bold">{conversation.name}</h2>
          <p className="mt-1 flex min-w-0 items-center gap-1 text-sm font-semibold text-foreground">{conversation.verified && <BadgeCheck className="size-4 shrink-0 text-chart-4" />}<span className="truncate underline">{conversation.email}</span></p>
          <p className="mt-1 truncate text-sm text-muted-foreground">{conversation.flag} {conversation.location}</p>
        </div>
      </div>
      <Button className="mt-5 w-full"><CircleUserRound /> View {conversation.name.split(' ')[0]} Profile</Button>
    </div>
    <DetailSection title="Conversation Routing" defaultOpen>
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
    <DetailSection title="Segments for conversation">
      <DetailRow icon={Users} text="No segments assigned." />
    </DetailSection>
    <DetailSection title="Custom data">
      <DetailRow icon={Info} text="No custom data available." />
    </DetailSection>
    <DetailSection title="Last profile events">
      <DetailRow icon={Clock3} text={`Conversation viewed ${conversation.date}.`} />
    </DetailSection>
    <DetailSection title="Private notepad">
      <DetailRow icon={MessageCircle} text="No private notes yet." />
    </DetailSection>
    <DetailSection title="Videosupport" icon={Video}>
      <DetailRow icon={Video} text="Start a demo video support session." />
    </DetailSection>
    <DetailSection title="Bot (Beta)" icon={Sparkles}>
      <DetailRow icon={Sparkles} text="Maya AI assistance is available." />
    </DetailSection>
    <DetailSection title="Message Scheduler" icon={Clock3}>
      <DetailRow icon={Clock3} text="No messages scheduled." />
    </DetailSection>
    <DetailSection title="Ask Rating" icon={BadgeCheck}>
      <DetailRow icon={BadgeCheck} text="Send a satisfaction rating request." />
    </DetailSection>
    <DetailSection title="Hugo" icon={CircleUserRound}>
      <DetailRow icon={CircleUserRound} text="Hugo is ready for this conversation." />
    </DetailSection>
  </aside>;
}

function DetailSection({ title, action, children, icon: Icon, defaultOpen = false }: { title: string; action?: React.ReactNode; children: React.ReactNode; icon?: React.ComponentType<{ className?: string }>; defaultOpen?: boolean }) {
  return <details className="group/details border-b" open={defaultOpen || undefined}>
    <summary className="flex h-12 cursor-pointer list-none items-center px-6 text-left text-sm font-medium outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
        {Icon && <span className="mr-2 grid size-5 shrink-0 place-items-center rounded border bg-muted"><Icon className="size-3.5" /></span>}
        <span className="min-w-0 flex-1 truncate">{title}</span><ChevronDown className="ml-auto size-4 shrink-0 -rotate-90 text-muted-foreground transition-transform group-open/details:rotate-0" />
    </summary>
    <div className="space-y-3 px-6 pb-5">
      {action && <div className="flex justify-end">{action}</div>}
      {children}
    </div>
  </details>;
}
function DetailRow({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) { return <div className="flex min-w-0 items-start gap-3 text-xs text-muted-foreground"><Icon className="mt-0.5 size-4 shrink-0" /><span className="min-w-0 break-words">{text}</span></div>; }

export default function AdminInbox({ initialId, initialInbox }: { initialId?: string; initialInbox?: string }) {
  const inboxKeys: InboxKey[] = ['all', 'main', 'assigned', 'automated', 'spam'];
  const startInbox = inboxKeys.find((key) => key === initialInbox);
  const startConversation = initialConversations.find((item) => item.id === initialId) ?? (startInbox && startInbox !== 'all' ? initialConversations.find((item) => item.inbox === startInbox) : undefined);
  const [collapsed, setCollapsed] = useState(false);
  const [inbox, setInbox] = useState<InboxKey>(startInbox ?? startConversation?.inbox ?? 'main');
  const [conversations, setConversations] = useState(() => initialConversations.map((item) => item.id === startConversation?.id ? { ...item, unread: false } : item));
  const [activeId, setActiveId] = useState(startConversation?.id ?? initialConversations[0].id);
  const [mobileChat, setMobileChat] = useState(Boolean(initialId && startConversation));
  const [showDetails, setShowDetails] = useState(false);
  const visible = useMemo(() => inbox === 'all' ? conversations : conversations.filter((item) => item.inbox === inbox), [conversations, inbox]);
  const active = conversations.find((item) => item.id === activeId) ?? visible[0] ?? conversations[0];
  function selectConversation(id: string) { setActiveId(id); setMobileChat(true); setConversations((items) => items.map((item) => item.id === id ? { ...item, unread: false } : item)); }
  function send(body: string, note: boolean) { setConversations((items) => items.map((item) => item.id === active.id ? { ...item, preview: body, messages: [...item.messages, { id: `${Date.now()}`, author: note ? 'note' : 'agent', body, time: 'Now' }] } : item)); toast.success(note ? 'Internal note added' : 'Demo reply sent'); }
  function assign(assignee: string) { setConversations((items) => items.map((item) => item.id === active.id ? { ...item, assignee } : item)); toast.success(`Conversation assigned to ${assignee}`); }
  function changeInbox(key: InboxKey) { setInbox(key); const next = conversations.find((item) => item.inbox === key); if (next) setActiveId(next.id); }
  function createConversation({ email, name, subject }: { email: string; name: string; subject: string }) {
    const displayName = name.trim() || email.split('@')[0] || 'New visitor';
    const id = `conversation-${Date.now()}`;
    const created: Conversation = { id, name: displayName, initials: displayName.split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'NV', email, location: 'Unknown', country: 'Unknown', flag: '🌐', localTime: 'Now', browser: 'Unknown device', ip: 'Pending', isp: 'Pending', languages: '🌐', verified: false, participants: [email], page: 'Email conversation', subject: subject.trim() || undefined, preview: subject.trim() || 'New email conversation', date: 'Now', inbox: 'main', unread: false, resolved: false, assignee: 'Unassigned', messages: subject.trim() ? [{ id: `message-${Date.now()}`, author: 'note', body: `Subject: ${subject.trim()}`, time: 'Now' }] : [] };
    setConversations((items) => [created, ...items]); setInbox('main'); setActiveId(id); setMobileChat(true); toast.success('Demo conversation created');
  }
  function navigate(direction: 1 | -1) {
    const index = visible.findIndex((item) => item.id === active.id);
    if (index === -1 || visible.length < 2) return;
    const next = visible[(index + direction + visible.length) % visible.length];
    if (next) selectConversation(next.id);
  }
  function markUnread() { setConversations((items) => items.map((item) => item.id === active.id ? { ...item, unread: true } : item)); toast.success('Conversation marked as unread'); }
  function moveToInbox(key: Conversation['inbox']) {
    setConversations((items) => items.map((item) => item.id === active.id ? { ...item, inbox: key } : item));
    setInbox(key); setActiveId(active.id); toast.success(`Conversation moved to ${inboxTargets.find((target) => target.key === key)?.label ?? key}`);
  }
  function removeActive() {
    const remaining = conversations.filter((item) => item.id !== active.id);
    if (!remaining.length) { toast.error('The final demo conversation cannot be deleted'); return; }
    const next = inbox === 'all' ? remaining[0] : remaining.find((item) => item.inbox === inbox) ?? remaining[0];
    setConversations(remaining);
    setActiveId(next.id);
    if (inbox !== 'all' && next.inbox !== inbox) setInbox(next.inbox);
    toast.success('Conversation deleted from this demo session');
  }
  function setSubject(subject: string) { setConversations((items) => items.map((item) => item.id === active.id ? { ...item, subject: subject || undefined } : item)); toast.success(subject ? 'Conversation subject updated' : 'Conversation subject cleared'); }
  return <AdminChatShell collapsed={collapsed} onCollapsedChange={setCollapsed} inbox={inbox} onInboxChange={changeInbox}>
    <div className="flex h-full min-w-0">
       <div className={cn('min-w-0 flex-1 md:flex lg:max-w-72 2xl:max-w-112', mobileChat ? 'hidden md:flex' : 'flex')}><ConversationList conversations={visible} activeId={active.id} onSelect={selectConversation} onCreateConversation={createConversation} /></div>
       <div className={cn('min-w-0 flex-[1.55] md:flex', mobileChat ? 'flex' : 'hidden')}><Transcript conversation={active} onBack={() => setMobileChat(false)} onShowDetails={() => setShowDetails(true)} onResolve={() => { setConversations((items) => items.map((item) => item.id === active.id ? { ...item, resolved: !item.resolved } : item)); toast.success(active.resolved ? 'Conversation reopened' : 'Conversation resolved'); }} onSend={send} onNavigate={navigate} onMarkUnread={markUnread} onMoveToInbox={moveToInbox} onDelete={removeActive} onSetSubject={setSubject} /></div>
       <div className="hidden shrink-0 lg:block"><VisitorDetails conversation={active} onAssign={assign} /></div>
       {showDetails && <div className="fixed inset-0 z-50 flex justify-end bg-foreground/20 lg:hidden" onClick={() => setShowDetails(false)}><div className="h-full w-[min(90vw,22rem)] shadow-xl" onClick={(event) => event.stopPropagation()}><VisitorDetails conversation={active} onClose={() => setShowDetails(false)} onAssign={assign} /></div></div>}
    </div>
  </AdminChatShell>;
}