'use client';

import { useState } from 'react';
import {
  ArrowRight, AtSign, Check, ChevronDown, CircleDashed, Clock3, Filter,
  ListFilter, Mail, Plus, RotateCcw, SortAsc, UserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { Conversation } from './mock-data';

export type ConversationView = 'all' | 'unread' | 'pending' | 'unresolved' | 'resolved' | 'mentions' | 'recent' | 'waiting';

export const conversationViews: { value: ConversationView; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: 'all', label: 'All', icon: ListFilter },
  { value: 'unread', label: 'Unread', icon: CircleDashed },
  { value: 'pending', label: 'Pending', icon: Clock3 },
  { value: 'unresolved', label: 'Unresolved', icon: ArrowRight },
  { value: 'resolved', label: 'Resolved', icon: Check },
  { value: 'mentions', label: 'Mentions', icon: AtSign },
  { value: 'recent', label: 'Most Recent', icon: SortAsc },
  { value: 'waiting', label: 'Longest Waiting', icon: Clock3 },
];

type ConditionField = 'state' | 'inbox' | 'assignee' | 'email';
type Condition = { id: string; field: ConditionField; value: string };
type CustomFilter = { id: string; label: string; conditions: Condition[] };

export function matchesCustomFilter(conversation: Conversation, filter?: CustomFilter) {
  if (!filter) return true;
  return filter.conditions.every((condition) => {
    if (condition.field === 'state') return condition.value === 'resolved' ? conversation.resolved : !conversation.resolved;
    if (condition.field === 'inbox') return conversation.inbox === condition.value;
    if (condition.field === 'assignee') return conversation.assignee === condition.value;
    return conversation.email.toLowerCase().includes(condition.value.toLowerCase());
  });
}

export function ConversationToolbar({
  view,
  onViewChange,
  customFilter,
  onCustomFilterChange,
  onCreateConversation,
}: {
  view: ConversationView;
  onViewChange: (value: ConversationView) => void;
  customFilter?: CustomFilter;
  onCustomFilterChange: (filter?: CustomFilter) => void;
  onCreateConversation: (values: { email: string; name: string; subject: string }) => void;
}) {
  const [filters, setFilters] = useState<CustomFilter[]>([]);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [conversationDialogOpen, setConversationDialogOpen] = useState(false);
  const currentView = conversationViews.find((item) => item.value === view) ?? conversationViews[0];

  return <>
    <div className="flex min-w-0 flex-1 items-center justify-between gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-10 min-w-20 justify-between px-3 text-sm font-semibold" aria-label="Conversation status">
            {currentView.label}<ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-61 p-2">
          {conversationViews.map((item, index) => <div key={item.value}>
            {(index === 2 || index === 5) && <DropdownMenuSeparator />}
            <DropdownMenuItem onSelect={() => { onViewChange(item.value); onCustomFilterChange(undefined); }} className={cn('h-11 gap-3 px-3', view === item.value && !customFilter && 'bg-accent font-semibold')}>
              <item.icon className="size-4" />{item.label}
            </DropdownMenuItem>
          </div>)}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="ml-auto flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant={customFilter ? 'secondary' : 'ghost'} className="h-10 px-3" aria-label="Custom filters"><Filter /> <span className="hidden sm:inline">Filters</span></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-62 p-1">
            {filters.length === 0 ? <div className="m-1 grid min-h-40 place-items-center rounded-md bg-muted/60 px-5 text-center"><div><p className="font-semibold">No custom filters</p><p className="mt-2 text-sm text-muted-foreground">You have no available<br />custom filters</p></div></div> : <div className="p-1">{filters.map((filter) => <DropdownMenuItem key={filter.id} onSelect={() => onCustomFilterChange(filter)} className={cn('h-10', customFilter?.id === filter.id && 'bg-accent font-semibold')}><ListFilter />{filter.label}</DropdownMenuItem>)}</div>}
            {customFilter && <DropdownMenuItem onSelect={() => onCustomFilterChange(undefined)}><RotateCcw />Clear custom filter</DropdownMenuItem>}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setFilterDialogOpen(true)} className="h-11 justify-center bg-primary font-semibold text-primary-foreground focus:bg-primary/90 focus:text-primary-foreground">New custom filter...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" onClick={() => setConversationDialogOpen(true)} aria-label="Create a new conversation"><Plus /></Button>
      </div>
    </div>
    <AdvancedFilterDialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen} onSave={(filter) => { setFilters((items) => [...items, filter]); onCustomFilterChange(filter); }} />
    <NewConversationDialog open={conversationDialogOpen} onOpenChange={setConversationDialogOpen} onCreate={onCreateConversation} />
  </>;
}

function AdvancedFilterDialog({ open, onOpenChange, onSave }: { open: boolean; onOpenChange: (open: boolean) => void; onSave: (filter: CustomFilter) => void }) {
  const [label, setLabel] = useState('');
  const [conditions, setConditions] = useState<Condition[]>([]);
  const valid = label.trim().length > 0 && conditions.length > 0 && conditions.every((item) => item.value.trim().length > 0);
  function close(value: boolean) { onOpenChange(value); if (!value) { setLabel(''); setConditions([]); } }
  function addCondition() { setConditions((items) => [...items, { id: `${Date.now()}-${items.length}`, field: 'state', value: 'unresolved' }]); }
  function updateCondition(id: string, next: Partial<Condition>) { setConditions((items) => items.map((item) => item.id === id ? { ...item, ...next, value: next.field ? defaultConditionValue(next.field) : item.value } : item)); }
  return <Dialog open={open} onOpenChange={close}>
    <DialogContent className="max-h-[90dvh] overflow-y-auto p-0 sm:max-w-3xl">
      <DialogHeader className="border-b px-6 py-5"><DialogTitle>Advanced Filter</DialogTitle><DialogDescription className="sr-only">Create a reusable conversation filter.</DialogDescription></DialogHeader>
      <div className="space-y-6 px-6 py-2">
        <div><Label htmlFor="filter-label">Label for the custom filter <span className="text-destructive">*</span></Label><Input id="filter-label" value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Enter a label... (eg. 'Chats with segment: sales')" className="mt-3 h-12" /></div>
        <div className="rounded-md border p-4">
          {conditions.length === 0 ? <div className="grid min-h-48 place-items-center rounded-md border bg-muted/30 px-4 text-center"><div><p className="font-semibold">Create a filter</p><p className="mt-2 text-sm text-muted-foreground">Filter conversations by state, inbox, assignee, email, and more.</p><Button variant="outline" onClick={addCondition} className="mt-5"><Plus />New Filter</Button></div></div> : <div className="space-y-3"><p className="text-sm font-semibold">All conditions must match</p>{conditions.map((condition) => <ConditionRow key={condition.id} condition={condition} onChange={(next) => updateCondition(condition.id, next)} onRemove={() => setConditions((items) => items.filter((item) => item.id !== condition.id))} />)}<Button variant="outline" size="sm" onClick={addCondition}><Plus />Add condition</Button></div>}
        </div>
      </div>
      <DialogFooter className="border-t p-6"><Button disabled={!valid} className="w-full" onClick={() => { onSave({ id: `${Date.now()}`, label: label.trim(), conditions }); close(false); }}><Check />Done</Button></DialogFooter>
    </DialogContent>
  </Dialog>;
}

function defaultConditionValue(field: ConditionField) { return field === 'state' ? 'unresolved' : field === 'inbox' ? 'main' : field === 'assignee' ? 'eatOS Support Team' : ''; }

function ConditionRow({ condition, onChange, onRemove }: { condition: Condition; onChange: (next: Partial<Condition>) => void; onRemove: () => void }) {
  return <div className="grid gap-2 rounded-md border p-3 sm:grid-cols-[10rem_1fr_auto]">
    <Select value={condition.field} onValueChange={(field) => onChange({ field: field as ConditionField })}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="state">Conversation state</SelectItem><SelectItem value="inbox">Inbox</SelectItem><SelectItem value="assignee">Assignee</SelectItem><SelectItem value="email">Visitor email</SelectItem></SelectContent></Select>
    {condition.field === 'email' ? <Input value={condition.value} onChange={(event) => onChange({ value: event.target.value })} placeholder="Email contains..." /> : <Select value={condition.value} onValueChange={(value) => onChange({ value })}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{condition.field === 'state' ? <><SelectItem value="unresolved">Unresolved</SelectItem><SelectItem value="resolved">Resolved</SelectItem></> : condition.field === 'inbox' ? <><SelectItem value="main">Main Inbox</SelectItem><SelectItem value="assigned">Assigned to me</SelectItem><SelectItem value="automated">Automated</SelectItem><SelectItem value="spam">Spam</SelectItem></> : <><SelectItem value="eatOS Support Team">eatOS Support Team</SelectItem><SelectItem value="Jaspreet Singh">Jaspreet Singh</SelectItem><SelectItem value="Maya AI">Maya AI</SelectItem><SelectItem value="Unassigned">Unassigned</SelectItem></>}</SelectContent></Select>}
    <Button variant="ghost" size="icon" onClick={onRemove} aria-label="Remove condition">×</Button>
  </div>;
}

function NewConversationDialog({ open, onOpenChange, onCreate }: { open: boolean; onOpenChange: (open: boolean) => void; onCreate: (values: { email: string; name: string; subject: string }) => void }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  function close(value: boolean) { onOpenChange(value); if (!value) { setEmail(''); setName(''); setSubject(''); setParticipants([]); } }
  return <Dialog open={open} onOpenChange={close}>
    <DialogContent className="max-h-[92dvh] overflow-y-auto p-0 sm:max-w-3xl">
      <DialogHeader className="border-b px-6 py-5"><DialogTitle>Create a new conversation</DialogTitle><DialogDescription className="sr-only">Start a conversation by email.</DialogDescription></DialogHeader>
      <div className="space-y-5 px-6 py-2">
        <div><Label>Channel</Label><div className="mt-3 flex h-12 items-center gap-3 rounded-md border border-ring px-4 ring-2 ring-ring/20"><Mail className="size-5 text-brand" /><span className="font-semibold">Email</span><ChevronDown className="ml-auto size-4 text-muted-foreground" /></div></div>
        <div className="border-t pt-5"><Label htmlFor="new-email">Email address <span className="text-destructive">*</span></Label><Input id="new-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter the email of the user..." className="mt-3 h-12" /></div>
        <div><Label htmlFor="new-name">Name</Label><Input id="new-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter the full name of the user..." className="mt-3 h-12" /></div>
        {participants.map((participant, index) => <div key={index}><Label htmlFor={`participant-${index}`}>Participant email</Label><Input id={`participant-${index}`} value={participant} onChange={(event) => setParticipants((items) => items.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} placeholder="Enter participant email..." className="mt-3 h-12" /></div>)}
        <Button variant="ghost" className="px-0 text-brand hover:text-brand" onClick={() => setParticipants((items) => [...items, ''])}><Plus />Add a participant</Button>
        <div className="border-t pt-5"><Label htmlFor="new-subject">Subject</Label><Input id="new-subject" value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Enter the subject of the email..." className="mt-3 h-12" /></div>
      </div>
      <DialogFooter className="border-t p-6"><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button disabled={!valid} onClick={() => { onCreate({ email, name, subject }); close(false); }}><Plus />Create Conversation</Button></DialogFooter>
    </DialogContent>
  </Dialog>;
}