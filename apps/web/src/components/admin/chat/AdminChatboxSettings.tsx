'use client';

import { useState } from 'react';
import {
  Bell,
  Bot,
  CheckCircle2,
  FileAudio,
  FileUp,
  Globe2,
  ImageIcon,
  Languages,
  LayoutPanelTop,
  ListPlus,
  LockKeyhole,
  MessageCircle,
  MonitorSmartphone,
  Palette,
  Plus,
  Search,
  ShieldCheck,
  Smartphone,
  Trash2,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, PageHeading, ToggleRow } from './AdminAccountSettings';

export type ChatboxSection = 'appearance' | 'behavior' | 'search-ai' | 'security' | 'restrictions' | 'push-notifications';

type SelectFieldProps = { label: string; defaultValue: string; options: string[] };

function SelectField({ label, defaultValue, options }: SelectFieldProps) {
  return (
    <label className="grid gap-2 border-b py-3 text-sm last:border-0 sm:grid-cols-[minmax(0,1fr)_minmax(12rem,20rem)] sm:items-center">
      <span>{label}</span>
      <select defaultValue={defaultValue} className="h-10 min-w-0 rounded-md border bg-background px-3 text-sm">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function WidgetPreview() {
  return (
    <aside className="rounded-md border bg-accent/40 p-4 lg:sticky lg:top-5">
      <h2 className="text-center text-lg font-bold">Preview your widget:</h2>
      <div className="mx-auto mt-4 max-w-sm overflow-hidden rounded-md border bg-background shadow-xl">
        <div className="bg-foreground p-4 text-background">
          <div className="flex justify-center gap-2 text-xs"><span className="rounded-full bg-background/15 px-3 py-1">Messages</span><span className="px-3 py-1">Articles</span></div>
          <div className="mt-5 flex justify-center -space-x-2">{['JM', 'AS', 'RB', 'e'].map((name) => <span key={name} className="grid size-10 place-items-center rounded-full border-2 border-foreground bg-brand text-[10px] font-bold text-primary-foreground">{name}</span>)}</div>
          <p className="mt-4 truncate text-sm font-bold">Hey! I&apos;m Maya. How can I help your restaurant?</p>
          <p className="mt-1 text-center text-[10px]">● Typically replies under one minute</p>
        </div>
        <div className="space-y-3 p-4">
          <div className="rounded-md bg-destructive/10 p-3 text-xs text-destructive"><strong>Some services are unavailable.</strong><br />See our status page for updates.</div>
          <p className="py-2 text-center text-[10px] font-semibold text-muted-foreground">Today</p>
          <div className="h-3 w-2/3 rounded-full bg-muted" /><div className="ml-auto h-3 w-1/2 rounded-full bg-brand/25" />
          <div className="rounded-md bg-chart-3/15 p-2 text-center text-xs">Please set your email to continue.</div>
          <div className="mt-6 flex h-12 items-center rounded-md border px-3 text-xs text-muted-foreground">Compose your message...</div>
        </div>
      </div>
      <p className="mt-4 rounded-md bg-background/50 p-3 text-center text-xs text-muted-foreground">This is a simulated chatbox. No message sent here will be delivered.</p>
    </aside>
  );
}

function Appearance() {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="min-w-0 space-y-5">
        <PageHeading title="Appearance" description="Customize how your chatbox looks on your website or app." />
        <Card title="Chatbox Theme" icon={Palette}>
          <SelectField label="Color theme (chatbox color)" defaultValue="Colorized" options={['Colorized', 'Classic', 'Minimal']} />
          <SelectField label="Layout theme (chatbox header, etc.)" defaultValue="Colorized" options={['Colorized', 'Plain', 'Compact']} />
          <SelectField label="Color mode (light or dark)" defaultValue="Dark Mode" options={['Dark Mode', 'Light Mode', 'Auto']} />
          <SelectField label="Text theme (text visible on chatbox header)" defaultValue="Questions? Chat with me!" options={['Questions? Chat with me!', 'Need help?', 'Chat with our team']} />
          <SelectField label="Welcome message (first message seen by users)" defaultValue="Hello! How can I help you?" options={['Hello! How can I help you?', 'Welcome to eatOS support!', 'How can we help?']} />
          <SelectField label="Chatbox background (messages texture)" defaultValue="Shapes" options={['Shapes', 'Plain', 'Dots']} />
          <SelectField label="Chatbox language" defaultValue="Detect from user country" options={['Detect from user country', 'English (US)', 'Spanish']} />
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 text-sm"><span>Advanced chatbox customization</span><Button variant="link" className="text-brand">Open advanced customization</Button></div>
        </Card>
        <Card title="Chatbox Button" icon={MessageCircle}>
          <ToggleRow label="Show workspace logo in chatbox button" />
          <ToggleRow label="Show last active operator face when no chat is ongoing" initial />
          <ToggleRow label="Show operator face when a chat is ongoing" initial />
          <ToggleRow label="Show activity metrics in the chatbox" initial />
          <ToggleRow label="Show the availability tooltip when the chatbox is closed" initial />
          <ToggleRow label="Reverse the position of the chatbox" />
        </Card>
      </div>
      <WidgetPreview />
    </div>
  );
}

function Behavior() {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="min-w-0 space-y-5">
        <PageHeading title="Behavior" description="Enable or disable features on your chatbox." />
        <Card title="Chatbox Home" icon={LayoutPanelTop}><SelectField label="Default section to show when the chatbox is opened" defaultValue="Messages (default)" options={['Messages (default)', 'Home', 'Helpdesk']} /><ToggleRow label="Show a home section in the chatbox" /></Card>
        <Card title="Visitors" icon={Users}><ToggleRow label="Ask visitors for their email address" initial /><ToggleRow label="Ask visitors for their phone number" initial /><ToggleRow label="Force visitors to identify themselves (email or phone)" initial /></Card>
        <Card title="Files" icon={FileAudio}><ToggleRow label="Allow files to be sent from the chatbox" /><ToggleRow label="Allow audio recordings to be sent from the chatbox" initial /></Card>
        <Card title="Knowledge Base" icon={Search}><ToggleRow label="Show Knowledge Base in the chatbox" initial /><ToggleRow label="Knowledge Base-only mode on the chatbox" /><SelectField label="Knowledge Base navigation mode" defaultValue="Frequently-Read Articles" options={['Frequently-Read Articles', 'Categories', 'Search']} /></Card>
        <Card title="Status" icon={MonitorSmartphone}><ToggleRow label="Show an alert when status reports degraded" initial /></Card>
        <Card title="Hide Chatbox" icon={LayoutPanelTop}><ToggleRow label="Hide the chatbox if all operators are away" /><ToggleRow label="Hide the chatbox on mobile devices" /><div className="pt-3 text-right"><Button variant="link" className="text-brand">Go to restrictions</Button></div></Card>
        <Card title="Privacy" icon={LockKeyhole}><ToggleRow label="Operator privacy mode (disable read markers in chatbox)" initial /><ToggleRow label="Operators can see what visitors write in real-time" initial /></Card>
        <Card title="Other" icon={ListPlus}><ToggleRow label="Allow visitors to create new conversations" initial /><ToggleRow label="Suggest a wait game when operators are slow to reply" initial /></Card>
      </div>
      <WidgetPreview />
    </div>
  );
}

function AddFrequentSearch() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState<string[]>([]);
  return (
    <Card title="Frequent searches" icon={ListPlus}>
      <p className="text-sm leading-6 text-muted-foreground">Add frequently asked questions so they appear as one-click suggestions in your search widget.</p>
      <div className="mt-4 flex flex-wrap gap-2"><span className="rounded-full border px-3 py-1 text-xs"><Globe2 className="mr-1 inline size-3" />Default language</span></div>
      <div className="mt-4 flex gap-2"><Input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Add a frequent search" /><Button disabled={!value.trim()} onClick={() => { setItems((current) => [...current, value.trim()]); setValue(''); }} className="bg-brand text-primary-foreground hover:bg-brand-strong"><Plus />Add</Button></div>
      {items.length ? <div className="mt-4 divide-y rounded-md border">{items.map((item) => <div key={item} className="flex items-center justify-between gap-3 px-3 py-2 text-sm"><span>{item}</span><Button size="icon-sm" variant="ghost" aria-label={`Remove ${item}`} onClick={() => setItems((current) => current.filter((entry) => entry !== item))}><Trash2 /></Button></div>)}</div> : <p className="mt-6 rounded-md bg-muted/30 p-8 text-center text-sm">There is nothing there (yet!).</p>}
    </Card>
  );
}

function SearchAI() {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="min-w-0 space-y-5">
        <PageHeading title="Search AI" description="Let your users use AI search to find answers from your AI Agent training data, right from your chatbox." />
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-secondary px-4 py-3 text-sm font-medium"><span>Please install the Overlay plugin to use Search AI on your website.</span><Button variant="outline">Install Plugin</Button></div>
        <Card title="Search AI Setup" icon={Search}><ToggleRow label="Enable Search AI on my eatOS Chatbox widget" disabled /><ToggleRow label="Direct users to use search before reaching out" disabled /></Card>
        <AddFrequentSearch />
      </div>
      <WidgetPreview />
    </div>
  );
}

function Security() {
  return (
    <div className="space-y-5">
      <PageHeading title="Security" description="Configure security and privacy preferences here." />
      <Card title="General Options" icon={ShieldCheck}><ToggleRow label="Lock the chatbox to website domain (and subdomains)" /></Card>
      <Card title="Privacy" icon={LockKeyhole}><div className="flex flex-wrap items-center justify-between gap-3 border-b py-3 text-sm"><span>Ignore user privacy choices (MagicType, MagicBrowse)</span><Button variant="outline" className="border-chart-2 text-chart-2">Privacy choices honored</Button></div><div className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"><span>Do not auto-create chat sessions and cookies without user intent</span><Button variant="outline">Total Privacy is inactive</Button></div></Card>
      <Card title="Anti-Bot Protections" icon={Bot}><SelectField label="Anti-bot protection level (only enable if under attack)" defaultValue="Default (Recommended)" options={['Default (Recommended)', 'Elevated', 'Maximum']} /></Card>
    </div>
  );
}

type RestrictionListProps = { title: string; empty: string; button: string; placeholder: string; icon: React.ComponentType<{ className?: string }> };

function RestrictionList({ title, empty, button, placeholder, icon: Icon }: RestrictionListProps) {
  const [items, setItems] = useState<string[]>([]);
  const [value, setValue] = useState('');
  return (
    <Card title={title} icon={Icon}>
      <div className="flex gap-2"><Input value={value} onChange={(event) => setValue(event.target.value)} placeholder={placeholder} /><Button disabled={!value.trim()} onClick={() => { setItems((current) => [...current, value.trim()]); setValue(''); }} className="shrink-0 bg-brand text-primary-foreground hover:bg-brand-strong"><Plus />{button}</Button></div>
      {items.length ? <div className="mt-4 divide-y rounded-md border">{items.map((item) => <div key={item} className="flex items-center justify-between gap-3 px-3 py-2 text-sm"><span className="break-all">{item}</span><Button size="icon-sm" variant="ghost" aria-label={`Remove ${item}`} onClick={() => setItems((current) => current.filter((entry) => entry !== item))}><Trash2 className="text-destructive" /></Button></div>)}</div> : <p className="mt-4 rounded-md bg-muted/30 p-7 text-center text-sm text-muted-foreground">{empty}</p>}
    </Card>
  );
}

function Restrictions() {
  const [blockedVisitors, setBlockedVisitors] = useState(12);
  return (
    <div className="space-y-5">
      <PageHeading title="Restrictions" description="Hide or block your chatbox for certain pages of your website, countries, and more." />
      <Card title="General Options" icon={ShieldCheck}><ToggleRow label="Place support in vacation mode (hide chatbox)" /></Card>
      <RestrictionList title="Show chatbox only on pages" button="Add page" placeholder="https://eatos.com/support" empty="No allowed page added yet" icon={LayoutPanelTop} />
      <RestrictionList title="Hide chatbox on pages" button="Block page" placeholder="https://eatos.com/private" empty="No blocked page added yet" icon={LayoutPanelTop} />
      <RestrictionList title="Hide chatbox for countries" button="Block country" placeholder="Country name" empty="No blocked country added yet" icon={Globe2} />
      <RestrictionList title="Hide chatbox for locales" button="Block locale" placeholder="Locale, for example en-US" empty="No blocked locale added yet" icon={Languages} />
      <RestrictionList title="Hide chatbox for IPs" button="Block IP" placeholder="IP address" empty="No blocked IP added yet" icon={MonitorSmartphone} />
      <Card title="Blocked visitors" icon={Users}><div className="flex flex-wrap items-center justify-between gap-3"><span className="text-sm">{blockedVisitors} blocked visitors</span><Button variant="destructive" disabled={!blockedVisitors} onClick={() => setBlockedVisitors(0)}>Clear all block rules <Trash2 /></Button></div></Card>
    </div>
  );
}

function NotificationService({ title, label, icon: Icon }: { title: string; label: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <Card title={title} icon={Icon}>
      <div className="mb-2 flex justify-end"><span className="rounded-full bg-destructive/10 px-2 py-1 text-xs font-semibold text-destructive">● disabled</span></div>
      <div className="flex items-center justify-between gap-4"><span className="text-sm text-muted-foreground">{label}</span><Switch disabled aria-label={label} /></div>
    </Card>
  );
}

function PushNotifications() {
  return (
    <div className="space-y-5">
      <PageHeading title="Push Notifications" description="Enable push notifications for your chatbox mobile SDKs for mobile apps." />
      <NotificationService title="Firebase Cloud Messaging" label="Notify users using Android" icon={Smartphone} />
      <NotificationService title="Apple Push Notification Service" label="Notify users using iOS" icon={Bell} />
    </div>
  );
}

const screens: Record<ChatboxSection, () => React.ReactElement> = {
  appearance: Appearance,
  behavior: Behavior,
  'search-ai': SearchAI,
  security: Security,
  restrictions: Restrictions,
  'push-notifications': PushNotifications,
};

export default function AdminChatboxSettings({ section }: { section: ChatboxSection }) {
  const Screen = screens[section];
  return <Screen />;
}
