'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  ArrowRight, AtSign, Check, ChevronDown, CircleDashed, Clock3, Filter,
  ListFilter, Mail, Plus, RotateCcw, SortAsc, UserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

  const menuItem = 'flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm hover:bg-accent focus-visible:bg-accent focus-visible:outline-none';
  return <>
    <div className="flex min-w-0 flex-1 items-center justify-between gap-1">
      <Button variant="outline" popoverTarget="chat-status-menu" style={{ anchorName: '--chat-status' } as React.CSSProperties} className="h-10 min-w-20 justify-between px-3 text-sm font-semibold" aria-label="Conversation status">
        {currentView.label}<ChevronDown className="size-4" />
      </Button>
      <div id="chat-status-menu" popover="auto" role="menu" style={{ positionAnchor: '--chat-status', top: 'anchor(bottom)', left: 'anchor(left)' } as React.CSSProperties} className="fixed m-0 mt-1 w-[15rem] max-w-[calc(100vw-1rem)] rounded-lg border bg-popover p-2 text-popover-foreground shadow-lg">
        {conversationViews.map((item, index) => <div key={item.value}>
          {(index === 2 || index === 5) && <div className="-mx-2 my-1 h-px bg-border" />}
          <button type="button" role="menuitem" popoverTarget="chat-status-menu" popoverTargetAction="hide" onClick={() => { onViewChange(item.value); onCustomFilterChange(undefined); }} className={cn(menuItem, 'h-11', view === item.value && !customFilter && 'bg-accent font-semibold')}>
            <item.icon className="size-4" />{item.label}
          </button>
        </div>)}
      </div>

      <div className="ml-auto flex items-center gap-1">
        <Button variant={customFilter ? 'secondary' : 'ghost'} popoverTarget="chat-filter-menu" style={{ anchorName: '--chat-filter' } as React.CSSProperties} className="h-10 px-3" aria-label="Custom filters"><Filter /> <span className="hidden sm:inline">Filters</span></Button>
        <div id="chat-filter-menu" popover="auto" role="menu" style={{ positionAnchor: '--chat-filter', top: 'anchor(bottom)', right: 'anchor(right)', left: 'auto' } as React.CSSProperties} className="fixed m-0 mt-1 w-[15.5rem] max-w-[calc(100vw-1rem)] rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg">
          {filters.length === 0 ? <div className="m-1 grid min-h-40 place-items-center rounded-md bg-muted/60 px-5 text-center"><div><p className="font-semibold">No custom filters</p><p className="mt-2 text-sm text-muted-foreground">You have no available<br />custom filters</p></div></div> : <div className="p-1">{filters.map((filter) => <button type="button" key={filter.id} popoverTarget="chat-filter-menu" popoverTargetAction="hide" onClick={() => onCustomFilterChange(filter)} className={cn(menuItem, customFilter?.id === filter.id && 'bg-accent font-semibold')}><ListFilter className="size-4" />{filter.label}</button>)}</div>}
          {customFilter && <button type="button" popoverTarget="chat-filter-menu" popoverTargetAction="hide" onClick={() => onCustomFilterChange(undefined)} className={menuItem}><RotateCcw className="size-4" />Clear custom filter</button>}
          <div className="-mx-1 my-1 h-px bg-border" />
          <button type="button" popoverTarget="chat-advanced-filter" popoverTargetAction="show" className="flex h-11 w-full items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90">New custom filter...</button>
        </div>
        <Button variant="ghost" size="icon" popoverTarget="chat-new-conversation" aria-label="Create a new conversation"><Plus /></Button>
      </div>
    </div>
    <AdvancedFilterDialog onSave={(filter) => { setFilters((items) => [...items, filter]); onCustomFilterChange(filter); toast.success(`Filter "${filter.label}" created`); }} />
    <NewConversationDialog onCreate={onCreateConversation} />
  </>;
}

const popupClass = 'fixed inset-0 m-auto max-h-[92dvh] w-[calc(100vw-1.5rem)] max-w-[48rem] overflow-y-auto rounded-lg border bg-background p-0 text-foreground shadow-xl backdrop:bg-foreground/40';

function AdvancedFilterDialog({ onSave }: { onSave: (filter: CustomFilter) => void }) {
  const [label, setLabel] = useState('');
  const [conditions, setConditions] = useState<Condition[]>([]);
  const valid = label.trim().length > 0 && conditions.length > 0 && conditions.every((item) => item.value.trim().length > 0);
  function reset() { setLabel(''); setConditions([]); }
  function addCondition() { setConditions((items) => [...items, { id: `${Date.now()}-${items.length}`, field: 'state', value: 'unresolved' }]); }
  function updateCondition(id: string, next: Partial<Condition>) { setConditions((items) => items.map((item) => item.id === id ? { ...item, ...next, value: next.field ? defaultConditionValue(next.field) : item.value } : item)); }
  return <div id="chat-advanced-filter" popover="auto" role="dialog" aria-modal="true" aria-labelledby="chat-advanced-filter-title" className={popupClass}>
      <div className="flex items-center justify-between border-b px-6 py-5"><h2 id="chat-advanced-filter-title" className="text-lg font-semibold">Advanced Filter</h2><button type="button" popoverTarget="chat-advanced-filter" popoverTargetAction="hide" aria-label="Close" className="text-xl text-muted-foreground hover:text-foreground">×</button></div>
      <div className="space-y-6 px-6 py-2">
        <div><Label htmlFor="filter-label">Label for the custom filter <span className="text-destructive">*</span></Label><Input id="filter-label" value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Enter a label... (eg. 'Chats with segment: sales')" className="mt-3 h-12" /></div>
        <div className="rounded-md border p-4">
          {conditions.length === 0 ? <div className="grid min-h-48 place-items-center rounded-md border bg-muted/30 px-4 text-center"><div><p className="font-semibold">Create a filter</p><p className="mt-2 text-sm text-muted-foreground">Filter conversations by state, inbox, assignee, email, and more.</p><Button variant="outline" onClick={addCondition} className="mt-5"><Plus />New Filter</Button></div></div> : <div className="space-y-3"><p className="text-sm font-semibold">All conditions must match</p>{conditions.map((condition) => <ConditionRow key={condition.id} condition={condition} onChange={(next) => updateCondition(condition.id, next)} onRemove={() => setConditions((items) => items.filter((item) => item.id !== condition.id))} />)}<Button variant="outline" size="sm" onClick={addCondition}><Plus />Add condition</Button></div>}
        </div>
      </div>
      <div className="border-t p-6"><Button disabled={!valid} className="w-full" popoverTarget="chat-advanced-filter" popoverTargetAction="hide" onClick={() => { onSave({ id: `${Date.now()}`, label: label.trim(), conditions }); reset(); }}><Check />Done</Button></div>
  </div>;
}

function defaultConditionValue(field: ConditionField) { return field === 'state' ? 'unresolved' : field === 'inbox' ? 'main' : field === 'assignee' ? 'eatOS Support Team' : ''; }

function ConditionRow({ condition, onChange, onRemove }: { condition: Condition; onChange: (next: Partial<Condition>) => void; onRemove: () => void }) {
  return <div className="grid gap-2 rounded-md border p-3 sm:grid-cols-[10rem_1fr_auto]">
    <select aria-label="Condition field" value={condition.field} onChange={(event) => onChange({ field: event.target.value as ConditionField })} className="h-10 w-full rounded-md border bg-background px-3 text-sm"><option value="state">Conversation state</option><option value="inbox">Inbox</option><option value="assignee">Assignee</option><option value="email">Visitor email</option></select>
    {condition.field === 'email' ? <Input value={condition.value} onChange={(event) => onChange({ value: event.target.value })} placeholder="Email contains..." /> : <select aria-label="Condition value" value={condition.value} onChange={(event) => onChange({ value: event.target.value })} className="h-10 w-full rounded-md border bg-background px-3 text-sm">{condition.field === 'state' ? <><option value="unresolved">Unresolved</option><option value="resolved">Resolved</option></> : condition.field === 'inbox' ? <><option value="main">Main Inbox</option><option value="assigned">Assigned to me</option><option value="automated">Automated</option><option value="spam">Spam</option></> : <><option value="eatOS Support Team">eatOS Support Team</option><option value="Jaspreet Singh">Jaspreet Singh</option><option value="Maya AI">Maya AI</option><option value="Unassigned">Unassigned</option></>}</select>}
    <Button variant="ghost" size="icon" onClick={onRemove} aria-label="Remove condition">×</Button>
  </div>;
}

function NewConversationDialog({ onCreate }: { onCreate: (values: { email: string; name: string; subject: string }) => void }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  function reset() { setEmail(''); setName(''); setSubject(''); setParticipants([]); }
  return <div id="chat-new-conversation" popover="auto" role="dialog" aria-modal="true" aria-labelledby="chat-new-conversation-title" className={popupClass}>
      <div className="flex items-center justify-between border-b px-6 py-5"><h2 id="chat-new-conversation-title" className="text-lg font-semibold">Create a new conversation</h2><button type="button" popoverTarget="chat-new-conversation" popoverTargetAction="hide" aria-label="Close" className="text-xl text-muted-foreground hover:text-foreground">×</button></div>
      <div className="space-y-5 px-6 py-2">
        <div><Label>Channel</Label><div className="mt-3 flex h-12 items-center gap-3 rounded-md border border-ring px-4 ring-2 ring-ring/20"><Mail className="size-5 text-brand" /><span className="font-semibold">Email</span><ChevronDown className="ml-auto size-4 text-muted-foreground" /></div></div>
        <div className="border-t pt-5"><Label htmlFor="new-email">Email address <span className="text-destructive">*</span></Label><Input id="new-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter the email of the user..." className="mt-3 h-12" /></div>
        <div><Label htmlFor="new-name">Name</Label><Input id="new-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter the full name of the user..." className="mt-3 h-12" /></div>
        {participants.map((participant, index) => <div key={index}><Label htmlFor={`participant-${index}`}>Participant email</Label><Input id={`participant-${index}`} value={participant} onChange={(event) => setParticipants((items) => items.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} placeholder="Enter participant email..." className="mt-3 h-12" /></div>)}
        <Button variant="ghost" className="px-0 text-brand hover:text-brand" onClick={() => setParticipants((items) => [...items, ''])}><Plus />Add a participant</Button>
        <div className="border-t pt-5"><Label htmlFor="new-subject">Subject</Label><Input id="new-subject" value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Enter the subject of the email..." className="mt-3 h-12" /></div>
      </div>
      <div className="flex flex-col-reverse gap-2 border-t p-6 sm:flex-row sm:justify-end"><Button variant="outline" popoverTarget="chat-new-conversation" popoverTargetAction="hide" onClick={reset}>Cancel</Button><Button disabled={!valid} popoverTarget="chat-new-conversation" popoverTargetAction="hide" onClick={() => { onCreate({ email, name, subject }); reset(); }}><Plus />Create Conversation</Button></div>
  </div>;
}