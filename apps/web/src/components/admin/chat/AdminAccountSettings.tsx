'use client';

import { useState } from 'react';
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Command,
  ExternalLink,
  ImageIcon,
  Inbox,
  Mail,
  MapPin,
  Monitor,
  ShieldCheck,
  Trash2,
  UserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

export type AccountSection = 'information' | 'notifications' | 'availability' | 'security' | 'interface' | 'shortcuts';

export function PageHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      <span className="flex items-center gap-1.5 rounded-md border bg-card px-3 py-2 text-xs text-muted-foreground">
        <CheckCircle2 className="size-4 text-chart-2" /> Automatically Saved
      </span>
    </div>
  );
}

export function Card({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded-md border bg-card shadow-sm">
      <div className="flex items-center gap-2 border-b px-4 py-3 text-sm font-semibold sm:px-5">
        <Icon className="size-4 text-muted-foreground" /> {title}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

export function ToggleRow({ label, initial = false, disabled = false }: { label: string; initial?: boolean; disabled?: boolean }) {
  const [checked, setChecked] = useState(initial);
  return (
    <div className="flex min-h-11 items-center justify-between gap-4 border-b py-2.5 last:border-0">
      <span className={disabled ? 'text-sm text-muted-foreground' : 'text-sm font-medium'}>{label}</span>
      <Switch checked={checked} onCheckedChange={setChecked} disabled={disabled} aria-label={label} className="data-[state=checked]:bg-brand" />
    </div>
  );
}

function Information() {
  return (
    <div>
      <PageHeading title="Information" />
      <div className="space-y-5">
        <Card title="Avatar" icon={ImageIcon}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="grid size-20 shrink-0 place-items-center rounded-full border-4 border-background bg-brand text-2xl font-bold text-primary-foreground shadow">e</div>
            <div className="space-y-3">
              <div><p className="text-sm font-medium">File smaller than 10 MB and at least 400px by 400px (1:1 ratio).</p><p className="mt-1 text-xs text-muted-foreground">This image will be shown to your visitors.</p></div>
              <div className="flex gap-2"><Button size="sm" className="bg-brand text-primary-foreground hover:bg-brand-strong">Upload image</Button><Button size="icon-sm" variant="ghost" aria-label="Delete avatar"><Trash2 className="text-destructive" /></Button></div>
            </div>
          </div>
        </Card>
        <Card title="Personal Details" icon={UserRound}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-xs font-medium">First Name *<Input defaultValue="eatOS PM" className="mt-2" /><span className="mt-1 block font-normal text-muted-foreground">Only your first name is visible to users.</span></label>
            <label className="text-xs font-medium">Last Name *<Input defaultValue="Team" className="mt-2" /><span className="mt-1 block font-normal text-muted-foreground">Your last name is kept private.</span></label>
            <label className="text-xs font-medium">Email *<Input type="email" defaultValue="pmt@eatos.com" className="mt-2" /><span className="mt-1 block font-normal text-muted-foreground">Used to send you notifications.</span></label>
            <label className="text-xs font-medium">Phone<Input type="tel" defaultValue="+1 323-963-3876" className="mt-2" /><span className="mt-1 block font-normal text-muted-foreground">Used for account recovery and two-step verification.</span></label>
          </div>
        </Card>
        <Card title="Security" icon={ShieldCheck}>
          <div className="grid items-center gap-4 text-sm sm:grid-cols-[7rem_1fr]"><span>Password</span><Button size="sm" className="w-fit bg-brand text-primary-foreground hover:bg-brand-strong">Change password</Button><span>2-Step</span><Button variant="link" className="h-auto w-fit p-0 text-destructive">Disable Two Factor Authentication</Button></div>
        </Card>
        <p className="text-xs">Looking to remove your eatOS Chat account? <Button variant="link" className="h-auto p-0 text-xs text-muted-foreground">Delete your account here.</Button></p>
      </div>
    </div>
  );
}

function Notifications() {
  return (
    <div>
      <PageHeading title="Notifications" />
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3 rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"><span>Notifications are disabled in your browser settings.</span><Button size="sm" variant="outline">How to enable notifications?</Button></div>
      <p className="mb-7 text-sm text-muted-foreground">Choose how you want to manage your notifications.<br /><strong>It is not recommended to disable them, as you won&apos;t get notified when you receive new messages.</strong></p>
      <div className="space-y-5"><Card title="General Options" icon={ShieldCheck}><ToggleRow label="Disable all notifications" /></Card><Card title="Push notifications" icon={Bell}><ToggleRow label="Notify me of messages when I am online" initial /><ToggleRow label="Notify me of messages when I am offline" initial /><ToggleRow label="Notify me when a visitor is browsing my website" disabled /><ToggleRow label="Play notification sounds" initial /></Card><Card title="Email notifications" icon={Mail}><ToggleRow label="Email me unread messages" initial /><ToggleRow label="Email me transcripts of conversations" /><ToggleRow label="Email me user ratings" initial /><ToggleRow label="Email me paid invoices (only if you use a paid plan)" initial /></Card></div>
    </div>
  );
}

function Availability() {
  const [schedule, setSchedule] = useState(false);
  const [days, setDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  const toggleDay = (day: string) => setDays((current) => current.includes(day) ? current.filter((item) => item !== day) : [...current, day]);
  return (
    <div>
      <PageHeading title="Availability" />
      <div className="mb-7 rounded-md border border-chart-2/20 bg-chart-2/10 p-4 text-sm text-chart-2"><p className="font-medium">You are currently seen as: <strong>Online</strong></p><p className="mt-2 leading-6">Set yourself available on schedule by configuring days and times in your timezone. Visitors will see you as away outside scheduled hours, but they can still send you messages.</p></div>
      <div className="space-y-5"><Card title="General Options" icon={ShieldCheck}><ToggleRow label="Force offline (invisible mode)" /><ToggleRow label="Set me available when using the app" initial /></Card><Card title="Availability Schedule" icon={CalendarDays}><div className="mb-4 flex min-h-11 items-center justify-between gap-4 border-b pb-4"><span className="text-sm font-medium">Enable availability schedule</span><Switch checked={schedule} onCheckedChange={setSchedule} aria-label="Enable availability schedule" className="data-[state=checked]:bg-brand" /></div><div className="grid gap-5 sm:grid-cols-[9rem_1fr]"><span className="text-sm font-medium">Days ({days.length}/7)</span><div className="flex flex-wrap gap-2">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day) => <Button key={day} type="button" size="sm" variant={days.includes(day) ? 'default' : 'outline'} onClick={() => toggleDay(day)} className={days.includes(day) ? 'bg-brand text-primary-foreground hover:bg-brand-strong' : ''}>{day}</Button>)}</div><label className="text-sm font-medium">Timezone</label><select className="h-10 rounded-md border bg-background px-3 text-sm"><option>America/New_York (Eastern Time)</option><option>America/Chicago (Central Time)</option><option>America/Denver (Mountain Time)</option><option>America/Los_Angeles (Pacific Time)</option></select><span className="text-sm font-medium">Hours</span><Button variant="secondary" className="w-fit" disabled={!schedule}>Add an interval +</Button></div></Card></div>
    </div>
  );
}

function Security() {
  return (
    <div><PageHeading title="Security" description="Manage apps connected to your eatOS Chat account. Review session history." /><div className="space-y-5"><Card title="Authorized apps" icon={ShieldCheck}><div className="overflow-x-auto"><table className="w-full min-w-[560px] text-left text-sm"><thead className="text-muted-foreground"><tr><th className="pb-3 font-medium">User Agent</th><th className="pb-3 font-medium">Location</th><th className="pb-3 text-center font-medium">Actions</th></tr></thead><tbody><tr className="border-t"><td className="py-3">Chrome (Mac OS)</td><td><span className="flex items-center gap-2"><MapPin className="size-4" />United States (99.45.217.2)</span></td><td className="text-center"><Button size="icon-sm" variant="ghost" aria-label="Remove Mac session"><Trash2 className="text-destructive" /></Button></td></tr><tr className="border-t"><td className="py-3">Chrome (Windows)</td><td><span className="flex items-center gap-2"><MapPin className="size-4" />United States (104.28.53.14)</span></td><td className="text-center"><Button size="icon-sm" variant="ghost" aria-label="Remove Windows session"><Trash2 className="text-destructive" /></Button></td></tr></tbody></table></div></Card><Card title="Recent login history" icon={Clock3}><div className="overflow-x-auto"><table className="w-full min-w-[560px] text-left text-sm"><thead className="text-muted-foreground"><tr><th className="pb-3 font-medium">Date</th><th className="pb-3 font-medium">Location</th><th className="pb-3 text-center font-medium">State</th></tr></thead><tbody>{[['Today, 9:36 PM','Chrome (Mac OS)','Authorized'],['Today, 9:34 PM','Chrome (Windows)','Authorized'],['Yesterday, 9:20 PM','Chrome (Mac OS)','Closed']].map(([date,agent,state]) => <tr key={date} className="border-t"><td className="py-3">{date} <span className="text-muted-foreground">from {agent}</span></td><td>United States</td><td className="text-center"><span className="rounded-full bg-chart-2/10 px-2 py-1 text-xs text-chart-2">{state}</span></td></tr>)}</tbody></table></div></Card></div></div>
  );
}

function Interface() {
  return <div><PageHeading title="Interface" description="Manage your interface preferences for a personalized experience." /><Card title="General Options" icon={Monitor}><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-medium">Language<select className="mt-2 block h-11 w-full rounded-md border bg-background px-3"><option>Auto-Detect</option><option>English (US)</option><option>Spanish</option></select></label><label className="text-sm font-medium">Appearance<select className="mt-2 block h-11 w-full rounded-md border bg-background px-3"><option>Dark Mode</option><option>Light Mode</option><option>System</option></select></label></div></Card></div>;
}

function Shortcuts() {
  return <div><PageHeading title="Keyboard Shortcuts" /><div className="space-y-5"><Card title="General Interface" icon={Command}><div className="flex items-center justify-between gap-4 border-b pb-4"><span className="text-sm font-medium">Search <kbd className="ml-2 rounded border bg-muted px-1.5 py-0.5">Ctrl F</kbd></span><Switch defaultChecked className="data-[state=checked]:bg-brand" /></div><div className="flex items-center justify-between gap-4 pt-4"><span className="text-sm font-medium">Command palette <kbd className="ml-2 rounded border bg-muted px-1.5 py-0.5">Ctrl P</kbd></span><Switch defaultChecked className="data-[state=checked]:bg-brand" /></div></Card><Card title="Inbox" icon={Inbox}><ToggleRow label="Enable editor actions shortcuts (? and !)" initial /><div className="flex items-center justify-between gap-4 pt-3 text-sm"><span className="text-muted-foreground">All keyboard shortcuts</span><Button variant="link" className="text-brand">See keyboard shortcuts <ExternalLink /></Button></div></Card></div></div>;
}

export default function AdminAccountSettings({ section }: { section: AccountSection }) {
  if (section === 'notifications') return <Notifications />;
  if (section === 'availability') return <Availability />;
  if (section === 'security') return <Security />;
  if (section === 'interface') return <Interface />;
  if (section === 'shortcuts') return <Shortcuts />;
  return <Information />;
}