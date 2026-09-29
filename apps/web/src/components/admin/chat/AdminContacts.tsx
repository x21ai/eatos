'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight, Building2, Check, ChevronDown, CircleCheck, CircleHelp, CloudDownload,
  CloudUpload, Eye, FileText, Filter, Mail, MapPin, Phone, Plus, Search,
  Tag, UploadCloud, UserRound, Users, X,
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return <div id="contacts-new" popover="auto" className="fixed inset-0 z-50 m-0 h-full w-full max-w-none border-none bg-foreground/35 p-4 [&:not(:popover-open)]:hidden">
    <form className="group/new absolute left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background px-10 py-9 shadow-xl max-sm:px-5" onSubmit={(event) => {
      event.preventDefault(); const data = new FormData(event.currentTarget); const name = String(data.get('name') || '').trim(); const email = String(data.get('email') || '').trim(); if (!name || !email) return;
      onCreate({ id: `contact-${Date.now()}`, name, initials: name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase(), email, location: 'United States', flag: '🇺🇸', segments: [], lastActivity: 'Now', tone: 'blue' }); event.currentTarget.reset(); setName(''); setEmail('');
    }}>
      <div className="space-y-6">
        <label className="block text-sm font-semibold text-muted-foreground">Name of the Contact <span className="text-destructive">*</span><input name="name" value={name} onChange={(event) => setName(event.target.value)} required placeholder="Enter the full name of the contact..." className="mt-2 h-14 w-full rounded-xl border bg-muted/55 px-4 text-base text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" /></label>
        <label className="block text-sm font-semibold text-muted-foreground">Email of the Contact <span className="text-destructive">*</span><input name="email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="Enter the email of the contact..." className="mt-2 h-14 w-full rounded-xl border bg-muted/55 px-4 text-base text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" /></label>
      </div>
      <div className="mt-8 flex justify-end gap-3"><Button type="button" variant="outline" size="lg" popoverTarget="contacts-new" popoverTargetAction="hide">Cancel</Button><Button type="submit" size="lg" aria-disabled={!name.trim() || !email.includes('@')} className="bg-visitor-pending text-primary-foreground hover:bg-visitor-pending/90 group-has-[input:invalid]/new:pointer-events-none group-has-[input:invalid]/new:bg-visitor-pending/20" popoverTarget="contacts-new" popoverTargetAction="hide"><Plus className="rounded-full border" />Add Contact</Button></div>
    </form>
  </div>;
}

function ExportContactsDialog({ count, scope }: { count: number; scope: 'all' | 'filtered' | 'selected' }) {
  return <div id="contacts-export" popover="auto" className="fixed inset-0 z-50 m-0 h-full w-full max-w-none border-none bg-foreground/70 p-4 [&:not(:popover-open)]:hidden">
    <div role="dialog" aria-modal="true" aria-labelledby="contacts-export-title" className="absolute left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-[55rem] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background px-10 py-9 shadow-xl max-sm:px-5">
      <h2 id="contacts-export-title" className="text-xl font-bold">You are going to export your contacts</h2>
      <p className="mt-3 text-base text-muted-foreground"><strong>{scope === 'all' ? 'All contacts' : scope === 'selected' ? `${count} selected contacts` : `${count} filtered contacts`}</strong> are going to be exported. To export only some contacts, use a filter or select contacts.</p>
      <p className="mt-6 text-base text-muted-foreground">It will take a few minutes. You will get an email when the export is over.</p>
      <div className="mt-8 flex flex-wrap items-center gap-3"><a href="https://docs.lovable.dev" target="_blank" rel="noreferrer" className="mr-auto text-sm font-semibold text-muted-foreground underline underline-offset-2">Learn more</a><Button variant="outline" size="lg" popoverTarget="contacts-export" popoverTargetAction="hide">Cancel</Button><Button size="lg" className="bg-visitor-pending text-primary-foreground hover:bg-visitor-pending/90" popoverTarget="contacts-export" popoverTargetAction="hide" onClick={() => toast.success(`${count} contacts queued for export`)}><CircleCheck />Export Contacts</Button></div>
    </div>
  </div>;
}

function ImportContactsDialog({ onImport }: { onImport: (contacts: ChatContact[]) => void }) {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState('');
  const [rows, setRows] = useState<ChatContact[]>([]);
  const chooseFile = async (file?: File) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.csv')) { toast.error('Please select a CSV file'); return; }
    const text = await file.text();
    const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const parsed = lines.slice(1).map((line, index) => {
      const [name = '', email = ''] = line.split(',').map((value) => value.trim().replace(/^"|"$/g, ''));
      if (!name || !email.includes('@')) return undefined;
      return { id: `import-${Date.now()}-${index}`, name, initials: name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase(), email, location: 'United States', flag: '🇺🇸', segments: [], lastActivity: 'Now', tone: 'mint' as const };
    }).filter((contact): contact is ChatContact => Boolean(contact));
    setFileName(file.name); setRows(parsed);
  };
  const reset = () => { setStep(1); setFileName(''); setRows([]); };
  return <div id="contacts-import" popover="auto" className="fixed inset-0 z-50 m-0 h-full w-full max-w-none overflow-y-auto border-none bg-foreground/70 p-4 [&:not(:popover-open)]:hidden">
    <div role="dialog" aria-modal="true" aria-labelledby="contacts-import-title" className="relative mx-auto my-[4vh] w-full max-w-[62rem] overflow-hidden rounded-lg bg-background shadow-xl">
      <header className="flex items-center justify-between px-9 py-7"><h2 id="contacts-import-title" className="text-lg font-bold">Import Contact Profiles</h2><Button variant="ghost" size="icon-sm" aria-label="Close import" popoverTarget="contacts-import" popoverTargetAction="hide" onClick={reset}><X /></Button></header>
      <div className="flex gap-3 border-b px-9 text-sm max-sm:overflow-x-auto">{['Select File', 'Configure Import', 'Proceed Import'].map((label, index) => <div key={label} className={cn('shrink-0 border-b-2 px-0 pb-3', step === index + 1 ? 'border-visitor-pending font-semibold text-visitor-pending' : 'border-transparent text-muted-foreground/55')}><span>{index + 1}</span> {label}</div>)}</div>
      {step === 1 && <div className="px-9 py-7 max-sm:px-5"><h3 className="font-bold">Upload a CSV file to import contact profiles</h3><p className="mt-2 max-w-[42rem] text-sm leading-6 text-muted-foreground">You can upload a standard CSV file containing the full name and email of your contacts, to add them to your contact database.</p><label onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); chooseFile(event.dataTransfer.files[0]); }} onPaste={(event) => chooseFile(event.clipboardData.files[0])} className="mt-6 grid min-h-[20rem] cursor-pointer place-items-center rounded-lg border border-dashed bg-muted/10 text-center hover:bg-muted/30"><input type="file" accept=".csv,text/csv" className="sr-only" onChange={(event) => chooseFile(event.target.files?.[0])} /><span><Plus className="mx-auto size-5 rounded-full border" /><strong className="mt-3 block text-sm">{fileName || 'Paste, select or drag file'}</strong><span className="mt-1 block text-sm text-muted-foreground">{fileName ? `${rows.length} valid contacts detected` : 'Upload CSV file (UTF-8 encoded)'}</span></span></label><div className="mt-6 flex flex-wrap items-center gap-4"><p className="mr-auto text-sm text-muted-foreground"><a href="https://docs.lovable.dev" target="_blank" rel="noreferrer" className="font-semibold underline">Learn more</a> about contacts import, or <a href="data:text/csv;charset=utf-8,full_name%2Cemail%0AJane%20Smith%2Cjane%40example.com" download="contacts-sample.csv" className="font-semibold underline">download this sample CSV file</a></p><Button size="lg" disabled={!fileName || rows.length === 0} onClick={() => setStep(2)} className="bg-visitor-pending text-primary-foreground"><span>Continue</span><ArrowRight /></Button></div></div>}
      {step === 2 && <div className="px-9 py-10 max-sm:px-5"><FileText className="size-8 text-visitor-pending" /><h3 className="mt-4 text-lg font-bold">Configure your import</h3><p className="mt-2 text-sm text-muted-foreground">We found {rows.length} valid contacts in {fileName}. Full name and email columns are ready to import.</p><div className="mt-7 flex justify-end gap-3"><Button variant="outline" onClick={() => setStep(1)}>Back</Button><Button className="bg-visitor-pending text-primary-foreground" onClick={() => setStep(3)}>Proceed Import <ArrowRight /></Button></div></div>}
      {step === 3 && <div className="grid min-h-[24rem] place-items-center px-9 py-10 text-center max-sm:px-5"><div><CircleCheck className="mx-auto size-12 text-chart-2" /><h3 className="mt-5 text-xl font-bold">Ready to import {rows.length} contacts</h3><p className="mt-2 text-sm text-muted-foreground">The contacts will be added to this demo workspace.</p><Button className="mt-7 bg-visitor-pending text-primary-foreground" popoverTarget="contacts-import" popoverTargetAction="hide" onClick={() => { onImport(rows); reset(); }}><UploadCloud />Import Contacts</Button></div></div>}
    </div>
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

  return <AdminChatShell collapsed={collapsed} onCollapsedChange={setCollapsed}>
    <NewContactDialog onCreate={createContact} />
    <ExportContactsDialog count={selected.length || shown.length} scope={selected.length ? 'selected' : query || segment !== 'all' ? 'filtered' : 'all'} />
    <ImportContactsDialog onImport={(imported) => { setContacts((current) => [...imported, ...current]); toast.success(`${imported.length} contacts imported`); }} />
    <CreateFilterDialog />
    <main className="relative flex h-full min-h-0 flex-col overflow-hidden bg-muted/25">
      <header className="flex min-h-20 shrink-0 flex-wrap items-center gap-3 border-b bg-background px-4 py-3 lg:flex-nowrap lg:px-6">
        <div className="flex shrink-0 items-center gap-3 font-bold"><Users className="size-5" /><span>{contacts.length.toLocaleString()} Contacts</span></div>
        <label className="flex h-11 min-w-[13rem] flex-1 items-center gap-3 rounded-lg border bg-background px-4 text-muted-foreground lg:max-w-[22rem]"><Search className="size-4" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none" /></label>
        <div className="ml-auto flex items-center gap-2">
          <details className="relative"><summary className="grid size-11 cursor-pointer list-none place-items-center rounded-md border bg-background hover:bg-accent [&::-webkit-details-marker]:hidden" aria-label="Filter contacts"><Filter className="size-4" /></summary><div className="absolute right-0 top-full z-20 mt-2 w-[13rem] rounded-md border bg-popover p-2 shadow-lg"><p className="px-2 py-1 text-xs font-semibold text-muted-foreground">Show contacts</p>{[['all','All contacts'],['segmented','With segments'],['chat','Chat'],['shopify','Shopify']].map(([value,label]) => <Button key={value} variant="ghost" className="w-full justify-start" onClick={() => setSegment(value)}>{segment === value && <Check />}{label}</Button>)}</div></details>
          <Button variant="outline" className="hidden h-11 text-chart-1 sm:inline-flex"><CircleHelp />Documentation</Button>
          <Button className="h-11 bg-foreground text-background hover:bg-foreground/90" popoverTarget="contacts-new"><Plus />New Contact</Button>
          <details className="group/actions relative"><summary className="flex h-11 cursor-pointer list-none items-center gap-2 rounded-md border bg-background px-4 text-sm font-medium hover:bg-accent [&::-webkit-details-marker]:hidden">Actions<ChevronDown className="size-4 transition-transform group-open/actions:rotate-180" /></summary><div className="absolute right-0 top-full z-20 mt-2 w-[16rem] rounded-md border bg-popover p-1 shadow-lg"><Button variant="ghost" className="h-11 w-full justify-start" popoverTarget="contacts-export"><CloudDownload />Export contact profiles</Button><Button variant="ghost" className="h-11 w-full justify-start" popoverTarget="contacts-import"><CloudUpload />Import contact profiles</Button></div></details>
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
