'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft, ChevronDown, CircleHelp, EllipsisVertical, MessageCircle, Phone, PlusCircle,
  Send, UserRound,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import AdminChatShell from './AdminChatShell';
import ContactMap from './ContactMap';
import { CompanyCard, ContactInformationCard, LocationSummary, ProfileCard, SegmentsCard } from './ContactProfileCards';
import { findContact } from './contact-data';

function EmptyCard({ title, action, children = 'No data added.' }: { title: string; action?: React.ReactNode; children?: React.ReactNode }) {
  return <ProfileCard title={title} action={action}><div className="grid min-h-22 place-items-center px-5 py-6 text-center text-xs italic text-muted-foreground">{children}</div></ProfileCard>;
}

export default function AdminContactProfile({ contactId }: { contactId: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const [note, setNote] = useState('');
  const contact = findContact(contactId);
  if (!contact) return <AdminChatShell collapsed={collapsed} onCollapsedChange={setCollapsed}><div className="grid h-full place-items-center bg-muted/20 p-6 text-center"><div><UserRound className="mx-auto size-10 text-muted-foreground" /><h1 className="mt-4 text-xl font-bold">Contact not found</h1><Button asChild className="mt-5"><Link href="/chatapp/contacts"><ArrowLeft />Back to Contacts</Link></Button></div></div></AdminChatShell>;
  return <AdminChatShell collapsed={collapsed} onCollapsedChange={setCollapsed}>
    <main className="scrollbar-hidden h-full overflow-y-auto bg-muted/20">
      <div className="mx-auto w-full max-w-[96rem] px-4 pb-10 pt-3 md:px-6">
        <nav className="flex h-9 items-center gap-3 text-xs text-muted-foreground"><Button asChild variant="ghost" size="icon-xs"><Link href="/chatapp/contacts" aria-label="Back to contacts"><ArrowLeft /></Link></Button><Link href="/chatapp/contacts">Contacts</Link><span>|</span><UserRound className="size-3.5" /><strong className="text-foreground">{contact.name}</strong></nav>
        <header className="flex flex-wrap items-center gap-4 py-5">
          <span className="relative grid size-18 shrink-0 place-items-center rounded-full bg-destructive/55 text-xl font-bold text-primary-foreground">{contact.initials}<span className="absolute bottom-0 right-0 text-base">{contact.flag}</span></span>
          <div className="min-w-0 flex-1"><div className="flex flex-wrap items-baseline gap-3"><h1 className="text-2xl font-bold">{contact.name}</h1><span className="text-xs text-muted-foreground">Last active: <strong>{contact.lastActivity}</strong></span></div><div className="mt-2 flex flex-wrap gap-1"><Button variant="ghost" size="sm" onClick={() => toast.success(`Message opened for ${contact.name}`)}><MessageCircle />Send a message</Button><Button variant="ghost" size="sm" onClick={() => toast.success(`New conversation opened with ${contact.name}`)}><PlusCircle />New Conversation</Button><Button variant="ghost" size="sm" onClick={() => toast.info(`Demo call started with ${contact.name}`)}><Phone />Start a call</Button><Button variant="ghost" size="icon-sm" aria-label="More contact actions"><EllipsisVertical /></Button></div></div>
        </header>
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(17rem,0.82fr)_minmax(22rem,1.45fr)] xl:grid-cols-[minmax(17rem,0.9fr)_minmax(24rem,1.45fr)_minmax(16rem,0.9fr)]">
          <div className="space-y-5"><ContactMap contact={contact} className="aspect-[1.36] rounded-lg" /><ContactInformationCard contact={contact} /><SegmentsCard contact={contact} /><CompanyCard contact={contact} /></div>
          <div className="space-y-5"><EmptyCard title={`Data for ${contact.name.split(' ')[0]}`} action={<Button variant="ghost" size="xs"><PlusCircle />Add Data<ChevronDown /></Button>}>No data added.<br /><span className="not-italic">Visitor data can be set there and from chatbox.</span></EmptyCard><EmptyCard title={`Conversations with ${contact.name.split(' ')[0]}`} action={<Button variant="ghost" size="xs"><PlusCircle />New Conversation<ChevronDown /></Button>}>No conversations found.</EmptyCard><EmptyCard title="Recently browsed pages">No pages browsed.</EmptyCard><EmptyCard title={`Campaigns for ${contact.name.split(' ')[0]}`}>No campaigns found.</EmptyCard><ProfileCard title={`Private Notepad on ${contact.name.split(' ')[0]}`} className="border-chart-5 bg-chart-5/15"><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Write your private notes..." className="min-h-32 w-full resize-none bg-transparent p-4 text-sm outline-none placeholder:text-muted-foreground" /><div className="flex gap-1 p-3 pt-0"><Button variant="outline" size="icon-xs" aria-label="Bold note"><strong>B</strong></Button><Button variant="outline" size="icon-xs" aria-label="Italic note"><em>I</em></Button><Button variant="outline" size="icon-xs" aria-label="Underline note"><u>U</u></Button><Button size="icon-xs" className="ml-auto" onClick={() => toast.success('Private note saved')} aria-label="Save private note"><Send /></Button></div></ProfileCard></div>
          <div className="space-y-5 lg:col-start-2 xl:col-start-auto"><ProfileCard title="Last Reported Location" action={<ChevronDown className="size-4" />}><LocationSummary contact={contact} /></ProfileCard><EmptyCard title={`Recent events for ${contact.name.split(' ')[0]}`}>No events added.<br /><span className="not-italic">Visitor events are sent from chatbox.</span></EmptyCard><EmptyCard title={`Rating Scores from ${contact.name.split(' ')[0]}`}>No ratings submitted.</EmptyCard></div>
        </div>
      </div>
    </main>
  </AdminChatShell>;
}