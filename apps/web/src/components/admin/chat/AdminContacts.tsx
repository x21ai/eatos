'use client';

import { useMemo, useState } from 'react';
import {
  BadgePlus, Building2, Check, ChevronDown, CircleHelp, Eye, Filter, Mail, MapPin,
  Phone, Plus, Search, Tag, Trash2, UserRound, Users, X,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import AdminChatShell from './AdminChatShell';
import { initialContacts, type ChatContact, type ContactTone } from './contact-data';

const toneClasses: Record<ContactTone, string> = {
  rose: 'bg-destructive/35', peach: 'bg-chart-5/55', sage: 'bg-chart-2/35', gold: 'bg-chart-5/45',
  violet: 'bg-chart-4/45', blue: 'bg-chart-1/35', mint: 'bg-chart-2/55', stone: 'bg-muted',
};

const columns = [
  { key: 'name', label: 'Full Name', icon: UserRound, width: 'w-[14rem]' },
  { key: 'email', label: 'Email', icon: Mail, width: 'w-[14rem]' },
  { key: 'phone', label: 'Phone', icon: Phone, width: 'w-[11rem]' },
  { key: 'location', label: 'Location', icon: MapPin, width: 'w-[14rem]' },
  { key: 'company', label: 'Company', icon: Building2, width: 'w-[10rem]' },
  { key: 'segments', label: 'Segments', icon: Tag, width: 'w-[11rem]' },
  { key: 'activity', label: 'Last Activity', icon: CircleHelp, width: 'w-[9rem]' },
] as const;

function ContactAvatar({ contact, large = false }: { contact: ChatContact; large?: boolean }) {
  return <span className={cn('grid shrink-0 place-items-center rounded-full font-semibold text-foreground', large ? 'size-16 text-lg' : 'size-8 text-xs', toneClasses[contact.tone])}>{contact.initials}</span>;
}

function ContactPreview({ contact }: { contact: ChatContact }) {
  const popoverId = `contact-preview-${contact.id}`;
  return <aside id={popoverId} popover="auto" className="fixed inset-y-0 right-0 left-auto z-40 m-0 hidden h-full w-full max-w-[24rem] flex-col border-y-0 border-l bg-background p-0 shadow-xl open:flex sm:w-[24rem]">
    <header className="flex h-16 items-center justify-between border-b px-5"><h2 className="font-bold">Contact preview</h2><Button variant="ghost" size="icon-sm" popoverTarget={popoverId} popoverTargetAction="hide" aria-label="Close contact preview"><X /></Button></header>
    <div className="scrollbar-hidden flex-1 overflow-y-auto p-6">
      <div className="flex flex-col items-center text-center"><ContactAvatar contact={contact} large /><h3 className="mt-4 text-lg font-bold">{contact.name}</h3><p className="mt-1 text-sm text-muted-foreground">{contact.email}</p><span className="mt-4 inline-flex items-center gap-2 rounded-full bg-chart-2/15 px-3 py-1 text-xs font-semibold text-chart-2"><Check className="size-3" />Contact</span></div>
      <div className="mt-7 divide-y border-y">
        {[{ icon: Mail, label: 'Email', value: contact.email }, { icon: Phone, label: 'Phone', value: contact.phone || 'Unknown' }, { icon: MapPin, label: 'Location', value: `${contact.flag} ${contact.location}` }, { icon: Building2, label: 'Company', value: contact.company || 'Unknown' }, { icon: Tag, label: 'Segments', value: contact.segments.join(', ') || 'No segments' }].map(({ icon: Icon, label, value }) => <div key={label} className="flex gap-3 py-4"><Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" /><div className="min-w-0"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 break-words text-sm font-medium">{value}</p></div></div>)}
      </div>
      <Button className="mt-6 w-full" onClick={() => toast.success(`Conversation opened with ${contact.name}`)}>Start conversation</Button>
    </div>
  </aside>;
}

function NewContactDialog({ onCreate }: { onCreate: (contact: ChatContact) => void }) {
  return <div id="contacts-new" popover="auto" className="fixed inset-0 z-50 m-0 h-full w-full max-w-none border-none bg-foreground/35 p-4 [&:not(:popover-open)]:hidden">
    <form className="absolute left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6 shadow-xl" onSubmit={(event) => {
      event.preventDefault(); const data = new FormData(event.currentTarget); const name = String(data.get('name') || '').trim(); const email = String(data.get('email') || '').trim(); if (!name || !email) return;
      onCreate({ id: `contact-${Date.now()}`, name, initials: name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase(), email, phone: String(data.get('phone') || '').trim() || undefined, location: String(data.get('location') || 'United States'), flag: '🇺🇸', company: String(data.get('company') || '').trim() || undefined, segments: String(data.get('segment') || '').trim() ? [String(data.get('segment'))] : [], lastActivity: 'Now', tone: 'blue' }); event.currentTarget.reset();
    }}>
      <div className="flex items-start justify-between"><div><h2 className="text-xl font-bold">New Contact</h2><p className="mt-1 text-sm text-muted-foreground">Add a contact to this demo workspace.</p></div><Button type="button" variant="ghost" size="icon-sm" aria-label="Close" popoverTarget="contacts-new" popoverTargetAction="hide"><X /></Button></div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">{[{ name: 'name', label: 'Full name', required: true }, { name: 'email', label: 'Email', required: true, type: 'email' }, { name: 'phone', label: 'Phone' }, { name: 'location', label: 'Location' }, { name: 'company', label: 'Company' }, { name: 'segment', label: 'Segment' }].map((field) => <label key={field.name} className="text-sm font-medium">{field.label}{field.required && <span className="text-destructive"> *</span>}<input name={field.name} type={field.type || 'text'} required={field.required} className="mt-2 h-11 w-full rounded-md border bg-background px-3 outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>)}</div>
      <div className="mt-6 flex justify-end gap-2"><Button type="button" variant="outline" popoverTarget="contacts-new" popoverTargetAction="hide">Cancel</Button><Button type="submit" popoverTarget="contacts-new" popoverTargetAction="hide"><Plus />Create Contact</Button></div>
    </form>
  </div>;
}

function CreateFilterDialog() {
  return <div id="contacts-filter-create" popover="auto" className="fixed inset-0 z-50 m-0 h-full w-full max-w-none border-none bg-foreground/35 p-4 [&:not(:popover-open)]:hidden">
    <form className="absolute left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6 shadow-xl" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const name = String(data.get('filter-name') || '').trim(); if (name) toast.success(`Filter “${name}” created`); event.currentTarget.reset(); }}>
      <div className="flex items-start justify-between"><div><h2 className="text-xl font-bold">Create filter</h2><p className="mt-1 text-sm text-muted-foreground">Save a contact view for this demo session.</p></div><Button type="button" variant="ghost" size="icon-sm" aria-label="Close" popoverTarget="contacts-filter-create" popoverTargetAction="hide"><X /></Button></div>
      <label className="mt-6 block text-sm font-medium">Filter name <span className="text-destructive">*</span><input name="filter-name" required placeholder="Enter a filter name" className="mt-2 h-11 w-full rounded-md border bg-background px-3 outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
      <label className="mt-4 block text-sm font-medium">Condition<select name="condition" className="mt-2 h-11 w-full rounded-md border bg-background px-3 outline-none"><option>Has a segment</option><option>Location contains United States</option><option>Last active this week</option><option>Phone is known</option></select></label>
      <div className="mt-6 flex justify-end gap-2"><Button type="button" variant="outline" popoverTarget="contacts-filter-create" popoverTargetAction="hide">Cancel</Button><Button type="submit" popoverTarget="contacts-filter-create" popoverTargetAction="hide">Create filter</Button></div>
    </form>
  </div>;
}

export default function AdminContacts() {
  const [collapsed, setCollapsed] = useState(false);
  const [contacts, setContacts] = useState(initialContacts);
  const [query, setQuery] = useState('');
  const [segment, setSegment] = useState('all');
  const [selected, setSelected] = useState<string[]>([]);
  const shown = useMemo(() => contacts.filter((contact) => {
    const matchesQuery = `${contact.name} ${contact.email} ${contact.phone || ''} ${contact.location} ${contact.company || ''} ${contact.segments.join(' ')}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (segment === 'all' || (segment === 'segmented' ? contact.segments.length > 0 : contact.segments.includes(segment)));
  }), [contacts, query, segment]);
  const allSelected = shown.length > 0 && shown.every((contact) => selected.includes(contact.id));
  const createContact = (contact: ChatContact) => { setContacts((current) => [contact, ...current]); toast.success(`${contact.name} added`); };
  const removeSelected = () => { if (!selected.length) return; setContacts((current) => current.filter((contact) => !selected.includes(contact.id))); setSelected([]); toast.success('Selected contacts removed'); };

  return <AdminChatShell collapsed={collapsed} onCollapsedChange={setCollapsed}>
    <NewContactDialog onCreate={createContact} />
    <CreateFilterDialog />
    <main className="relative flex h-full min-h-0 flex-col overflow-hidden bg-muted/25">
      <header className="flex min-h-20 shrink-0 flex-wrap items-center gap-3 border-b bg-background px-4 py-3 lg:flex-nowrap lg:px-6">
        <div className="flex shrink-0 items-center gap-3 font-bold"><Users className="size-5" /><span>{contacts.length.toLocaleString()} Contacts</span></div>
        <label className="flex h-11 min-w-[13rem] flex-1 items-center gap-3 rounded-lg border bg-background px-4 text-muted-foreground lg:max-w-[22rem]"><Search className="size-4" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none" /></label>
        <div className="ml-auto flex items-center gap-2">
          <details className="relative"><summary className="grid size-11 cursor-pointer list-none place-items-center rounded-md border bg-background hover:bg-accent [&::-webkit-details-marker]:hidden" aria-label="Filter contacts"><Filter className="size-4" /></summary><div className="absolute right-0 top-full z-20 mt-2 w-[13rem] rounded-md border bg-popover p-2 shadow-lg"><p className="px-2 py-1 text-xs font-semibold text-muted-foreground">Show contacts</p>{[['all','All contacts'],['segmented','With segments'],['chat','Chat'],['shopify','Shopify']].map(([value,label]) => <Button key={value} variant="ghost" className="w-full justify-start" onClick={() => setSegment(value)}>{segment === value && <Check />}{label}</Button>)}</div></details>
          <Button variant="outline" className="hidden h-11 text-chart-1 sm:inline-flex"><CircleHelp />Documentation</Button>
          <Button className="h-11 bg-foreground text-background hover:bg-foreground/90" popoverTarget="contacts-new"><Plus />New Contact</Button>
          <details className="relative hidden sm:block"><summary className="flex h-11 cursor-pointer list-none items-center gap-2 rounded-md border bg-background px-4 text-sm font-medium hover:bg-accent [&::-webkit-details-marker]:hidden">Actions<ChevronDown className="size-4" /></summary><div className="absolute right-0 top-full z-20 mt-2 w-[13rem] rounded-md border bg-popover p-1 shadow-lg"><Button variant="ghost" className="w-full justify-start" onClick={() => toast.success(`${selected.length} contacts exported`)}><BadgePlus />Export selected</Button><Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" onClick={removeSelected}><Trash2 />Delete selected</Button></div></details>
        </div>
      </header>
      {selected.length > 0 && <div className="flex h-11 shrink-0 items-center gap-3 border-b bg-chart-1/10 px-5 text-sm"><strong>{selected.length} selected</strong><Button variant="ghost" size="sm" className="ml-auto" onClick={() => setSelected([])}>Clear</Button></div>}
      <div className="scrollbar-hidden min-h-0 flex-1 overflow-auto bg-background">
        <table className="w-full min-w-[78rem] table-fixed border-separate border-spacing-0 text-sm">
          <thead className="sticky top-0 z-10 bg-background text-left text-muted-foreground shadow-[0_1px_0_var(--border)]"><tr><th className="w-14 border-r px-4 py-3 text-center"><input type="checkbox" checked={allSelected} onChange={() => setSelected(allSelected ? selected.filter((id) => !shown.some((contact) => contact.id === id)) : Array.from(new Set([...selected, ...shown.map((contact) => contact.id)])))} aria-label="Select all contacts" /></th>{columns.map(({ key, label, icon: Icon, width }) => <th key={key} className={cn('border-r px-4 py-3 font-semibold', width)}><span className="flex items-center gap-2"><Icon className="size-4" />{label}</span></th>)}<th className="w-[10rem] px-4 py-3"><span className="flex items-center gap-2"><Eye className="size-4" />Preview</span></th></tr></thead>
          <tbody>{shown.map((contact) => <tr key={contact.id} className="h-13 border-b hover:bg-accent/45"><td className="border-b border-r px-4 text-center"><input type="checkbox" checked={selected.includes(contact.id)} onChange={() => setSelected((current) => current.includes(contact.id) ? current.filter((id) => id !== contact.id) : [...current, contact.id])} aria-label={`Select ${contact.name}`} /></td><td className="border-b border-r px-4"><div className="flex min-w-0 items-center gap-3"><ContactAvatar contact={contact} /><span className="truncate font-medium">{contact.name}</span></div></td><td className="truncate border-b border-r px-4">{contact.email}</td><td className={cn('truncate border-b border-r px-4', !contact.phone && 'text-muted-foreground/60')}>{contact.phone || 'Unknown'}</td><td className="truncate border-b border-r px-4"><span className="mr-2">{contact.flag}</span>{contact.location}</td><td className={cn('truncate border-b border-r px-4', !contact.company && 'text-muted-foreground/60')}>{contact.company || 'Unknown'}</td><td className="border-b border-r px-4">{contact.segments.length ? <div className="flex gap-1">{contact.segments.map((item) => <span key={item} className={cn('rounded-md border px-2 py-1 text-xs', item === 'shopify' ? 'border-chart-2/30 bg-chart-2/10 text-chart-2' : 'border-chart-5/35 bg-chart-5/10 text-chart-5')}>{item}</span>)}</div> : <span className="text-muted-foreground/60">No segments</span>}</td><td className="border-b border-r px-4">{contact.lastActivity}</td><td className="border-b px-4"><Button className="w-full bg-chart-1/25 text-chart-1 hover:bg-chart-1/35" popoverTarget={`contact-preview-${contact.id}`}><Eye />Preview</Button></td></tr>)}</tbody>
        </table>
        {shown.length === 0 && <div className="grid min-h-60 place-items-center text-center"><div><Users className="mx-auto size-8 text-muted-foreground" /><p className="mt-3 font-semibold">No contacts found</p><p className="mt-1 text-sm text-muted-foreground">Try another search or filter.</p></div></div>}
      </div>
      {contacts.map((contact) => <ContactPreview key={contact.id} contact={contact} />)}
    </main>
  </AdminChatShell>;
}
