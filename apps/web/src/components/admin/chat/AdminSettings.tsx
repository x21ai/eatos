'use client';

import { useState } from 'react';
import {
  AtSign, Bell, Bot, BriefcaseBusiness, ChevronDown, ChevronRight, Clock3,
  CreditCard, Inbox, Mail, MessageCircle, Settings, Shield, UserRound,
} from 'lucide-react';
import AdminChatShell from './AdminChatShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

type SettingsKey = 'account' | 'billing' | 'workspace' | 'chatbox' | 'inbox' | 'email' | 'status';

const groups: { key: SettingsKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'account', label: 'Account', icon: UserRound },
  { key: 'billing', label: 'Billing', icon: CreditCard },
  { key: 'workspace', label: 'Workspace', icon: Settings },
  { key: 'chatbox', label: 'Chatbox', icon: MessageCircle },
  { key: 'inbox', label: 'Inbox', icon: Inbox },
  { key: 'email', label: 'Email', icon: Mail },
  { key: 'status', label: 'Status Page', icon: Shield },
];

function SettingsSidebar({ active, onSelect }: { active: SettingsKey; onSelect: (key: SettingsKey) => void }) {
  return <aside className="scrollbar-hidden hidden w-72 shrink-0 overflow-y-auto border-r bg-background p-4 lg:flex lg:flex-col">
    <div className="space-y-1">{groups.map((group) => <Button key={group.key} variant="ghost" onClick={() => onSelect(group.key)} className={cn('h-11 w-full justify-start', active === group.key && 'bg-accent')}><group.icon />{group.label}<ChevronDown className="ml-auto size-4" /></Button>)}</div>
    <div className="mt-auto space-y-1 pt-10 text-sm text-muted-foreground"><p className="px-3 py-2">Create a new workspace</p><p className="px-3 py-2">Help translate the chatbox</p><p className="px-3 py-2">Get help using eatOS Chat</p><p className="px-3 py-2">Service status</p><p className="px-3 py-2">What's new?</p><p className="px-3 pt-5 text-[11px]">Front-end preview</p></div>
  </aside>;
}

function SettingRow({ title, description, enabled, onChange }: { title: string; description: string; enabled: boolean; onChange: (value: boolean) => void }) {
  return <div className="flex items-start gap-4 border-b py-5 last:border-0"><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p></div><Switch checked={enabled} onCheckedChange={onChange} aria-label={title} className="data-[state=checked]:bg-brand" /></div>;
}

function AvailabilityPanel() {
  const [online, setOnline] = useState(true);
  const [weekends, setWeekends] = useState(false);
  return <Panel title="Set your availability days and hours" description="Let visitors know when your team is available to chat by setting up your schedule.">
    <div className="grid gap-6 xl:grid-cols-[1fr_18rem]">
      <div>
        <SettingRow title="Show team as online" description="The chatbox displays your team as available during scheduled hours." enabled={online} onChange={setOnline} />
        <SettingRow title="Weekend coverage" description="Include Saturday and Sunday in the support schedule." enabled={weekends} onChange={setWeekends} />
        <div className="mt-5 grid gap-3 sm:grid-cols-2"><label className="text-xs font-medium">Weekday start<Input type="time" defaultValue="09:00" className="mt-2" /></label><label className="text-xs font-medium">Weekday end<Input type="time" defaultValue="18:00" className="mt-2" /></label></div>
      </div>
      <div className="self-start rounded-md border bg-muted/30 p-5 shadow-sm"><div className="flex items-center justify-between"><span className="size-3 rounded-full bg-chart-2" /><span className="text-xs text-muted-foreground">Preview</span></div><h3 className="mt-5 text-lg font-bold">Do you have any questions?</h3><p className="mt-3 flex items-center gap-2 text-sm font-semibold text-brand"><span className="size-2 rounded-full bg-chart-2" />eatOS team is online</p><div className="mt-5 grid grid-cols-2 gap-2"><Button className="bg-brand text-primary-foreground hover:bg-brand-strong"><MessageCircle /> Chat</Button><Button variant="secondary">Helpdesk</Button></div></div>
    </div>
  </Panel>;
}

function WorkspacePanel() {
  const [mentions, setMentions] = useState(true);
  const [digest, setDigest] = useState(false);
  return <Panel title="Workspace preferences" description="Manage how the eatOS support workspace behaves for your team."><label className="text-xs font-medium">Workspace name<Input defaultValue="eatOS POS inc." className="mt-2 max-w-md" /></label><div className="mt-5"><SettingRow title="Mention notifications" description="Notify team members when they are mentioned in an internal note." enabled={mentions} onChange={setMentions} /><SettingRow title="Daily activity digest" description="Show a summary of open and resolved conversations." enabled={digest} onChange={setDigest} /></div></Panel>;
}

function ChatboxPanel() {
  const [greeting, setGreeting] = useState(true);
  const [helpdesk, setHelpdesk] = useState(true);
  return <Panel title="Chatbox appearance" description="Preview the experience visitors see on the eatOS website."><label className="text-xs font-medium">Welcome message<Input defaultValue="Welcome to eatOS. How can we help?" className="mt-2" /></label><div className="mt-5"><SettingRow title="Show welcome greeting" description="Display a short greeting before a visitor starts a conversation." enabled={greeting} onChange={setGreeting} /><SettingRow title="Show Helpdesk option" description="Let visitors search help articles before starting a chat." enabled={helpdesk} onChange={setHelpdesk} /></div></Panel>;
}

function InboxPanel() {
  const [autoAssign, setAutoAssign] = useState(true);
  const [closeInactive, setCloseInactive] = useState(false);
  return <Panel title="Inbox routing" description="Control how new conversations reach your support team."><label className="text-xs font-medium">Default team<select className="mt-2 block h-10 w-full max-w-md rounded-md border bg-background px-3 text-sm"><option>eatOS Support Team</option><option>Sales Team</option><option>Technical Support</option></select></label><div className="mt-5"><SettingRow title="Automatically assign conversations" description="Send each new visitor to the next available teammate." enabled={autoAssign} onChange={setAutoAssign} /><SettingRow title="Resolve inactive conversations" description="Automatically resolve conversations after seven days without a reply." enabled={closeInactive} onChange={setCloseInactive} /></div></Panel>;
}

function EmailPanel() {
  const [transcripts, setTranscripts] = useState(true);
  const [replies, setReplies] = useState(true);
  return <Panel title="Email preferences" description="Choose how chat activity continues through email."><label className="text-xs font-medium">Reply-to address<Input defaultValue="support@eatos.com" className="mt-2 max-w-md" /></label><div className="mt-5"><SettingRow title="Send conversation transcripts" description="Email visitors a copy after a conversation is resolved." enabled={transcripts} onChange={setTranscripts} /><SettingRow title="Accept replies by email" description="Add visitor email replies back into their conversation." enabled={replies} onChange={setReplies} /></div></Panel>;
}

function StatusPanel() {
  const [publicStatus, setPublicStatus] = useState(true);
  const [incidentBanner, setIncidentBanner] = useState(false);
  return <Panel title="Status page" description="Control support availability and service updates shown to visitors."><SettingRow title="Publish service status" description="Show the current eatOS service status in the chatbox." enabled={publicStatus} onChange={setPublicStatus} /><SettingRow title="Show incident banner" description="Display a notice when a service incident is active." enabled={incidentBanner} onChange={setIncidentBanner} /></Panel>;
}

function BasicPanel({ active }: { active: 'account' | 'billing' }) {
  return <Panel title={active === 'account' ? 'Account settings' : 'Billing settings'} description={active === 'account' ? 'Manage your profile and notification preferences.' : 'Review the workspace plan and billing contact.'}>{active === 'account' ? <div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-medium">Display name<Input defaultValue="eatOS Support" className="mt-2" /></label><label className="text-xs font-medium">Email<Input defaultValue="support@eatos.com" className="mt-2" /></label></div> : <div className="rounded-md border p-5"><p className="text-sm font-semibold">eatOS Chat Preview</p><p className="mt-2 text-xs text-muted-foreground">No billing is connected to this front-end prototype.</p></div>}</Panel>;
}

function Panel({ title, description, children }: { title: string; description: string; children: React.ReactNode }) { return <section className="mx-auto w-full max-w-3xl rounded-md border bg-card p-5 shadow-sm md:p-7"><h1 className="text-xl font-bold">{title}</h1><p className="mt-2 text-sm text-muted-foreground">{description}</p><div className="mt-6">{children}</div></section>; }

export default function AdminSettings() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState<SettingsKey>('chatbox');
  return <AdminChatShell collapsed={collapsed} onCollapsedChange={setCollapsed}>
    <div className="flex h-full min-w-0">
      <SettingsSidebar active={active} onSelect={setActive} />
      <main className="scrollbar-hidden min-w-0 flex-1 overflow-y-auto bg-muted/20">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur md:px-6"><h2 className="text-sm font-semibold">Settings</h2><select value={active} onChange={(event) => setActive(event.target.value as SettingsKey)} className="ml-auto h-9 rounded-md border bg-background px-3 text-sm lg:hidden">{groups.map((group) => <option key={group.key} value={group.key}>{group.label}</option>)}</select></header>
        <div className="p-4 md:p-8 xl:p-12">{active === 'chatbox' ? <AvailabilityPanel /> : active === 'workspace' ? <WorkspacePanel /> : active === 'inbox' ? <InboxPanel /> : active === 'email' ? <EmailPanel /> : active === 'status' ? <StatusPanel /> : active === 'account' || active === 'billing' ? <BasicPanel active={active} /> : <ChatboxPanel />}</div>
      </main>
    </div>
  </AdminChatShell>;
}