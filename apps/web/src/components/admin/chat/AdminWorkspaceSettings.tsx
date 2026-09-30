'use client';

import {
  AtSign,
  Building2,
  Code2,
  Copy,
  Globe,
  Info,
  Link2,
  ListFilter,
  LogOut,
  MessageCircle,
  Plus,
  PlusCircle,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  UserRound,
  Users,
  Zap,
  ArrowRight,
  Calendar,
  LayoutGrid,
  ScrollText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, PageHeading, ToggleRow } from './AdminAccountSettings';

export type WorkspaceSection = 'information' | 'setup' | 'operators' | 'log' | 'advanced' | 'danger';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block text-xs font-medium">
      {label}
      {required ? <span className="text-destructive"> *</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Empty({ icon: Icon, title, text }: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }) {
  return (
    <div className="grid min-h-40 place-items-center rounded-md bg-muted/30 p-6 text-center">
      <div>
        <Icon className="mx-auto size-5 text-muted-foreground" />
        <p className="mt-2 text-sm font-medium">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

function Information() {
  const contacts: [string, string, string][] = [
    ['Email', 'support@eatos.com', ''],
    ['Phone', '+1 844-973-2867', ''],
    ['Messenger', '', 'Messenger username'],
    ['Telegram', '', 'Telegram username'],
    ['X (Twitter)', 'myeatOS', ''],
    ['WhatsApp', '+14244010198', ''],
    ['Instagram', 'myeatOS', ''],
  ];
  return (
    <div className="space-y-6">
      <PageHeading title="Information" description="Configure your workspace information. This defines how your workspace appears to your users." />
      <Card title="General information" icon={Building2}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="grid size-28 shrink-0 place-items-center rounded-full border border-dashed"><MessageCircle className="size-10" /></div>
          <div>
            <p className="text-sm font-medium">Icon</p>
            <p className="mt-1 text-xs text-muted-foreground">File smaller than 5 MB and at least 400px by 400px (1:1 ratio).</p>
            <div className="mt-4 flex items-center gap-3">
              <Button className="bg-brand text-primary-foreground hover:bg-brand-strong">Upload image</Button>
              <Button variant="ghost" size="icon" aria-label="Remove icon" className="text-destructive"><Trash2 /></Button>
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Domain" required><Input defaultValue="www.eatos.com" /></Field>
          <Field label="Name" required><Input defaultValue="eatOS POS inc." /></Field>
        </div>
        <a href="#" className="mt-4 inline-block text-sm font-medium text-brand">Add additional domains</a>
      </Card>
      <Card title="Contact information" icon={AtSign}>
        <p className="mb-4 text-sm text-muted-foreground">Set your public contact information so that visitors have other ways to directly contact you.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {contacts.map(([label, value, ph]) => (
            <Field key={label} label={label}><Input defaultValue={value} placeholder={ph} /></Field>
          ))}
        </div>
      </Card>
    </div>
  );
}

const integrations = ['HTML', 'WordPress', 'Shopify', 'Prestashop', 'WooCommerce', 'WHMCS', 'Adobe Commerce', 'Notion', 'iFrame'];

function Setup() {
  return (
    <div className="space-y-6">
      <PageHeading title="Setup & Integrations" />
      <Card title="General Options" icon={Settings}>
        <div className="grid gap-3 sm:grid-cols-[8rem_1fr_auto] sm:items-center">
          <span className="text-sm">Website ID</span>
          <Input readOnly value="cf9ee4db-97df-4864-8fa6-194ad4762b95" className="font-mono text-xs" />
          <Button variant="secondary"><Copy />Copy</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm">Chatbox</span>
          <Button className="bg-brand text-primary-foreground hover:bg-brand-strong"><ArrowRight />Chatbox setup instructions</Button>
        </div>
      </Card>
      <Card title="Integrate with eatOS" icon={LayoutGrid}>
        <p className="text-sm text-muted-foreground">Integrate eatOS on one of these channels to get in touch with your customers.</p>
        <h3 className="mt-5 text-sm font-semibold">Website</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((name) => (
            <button key={name} className="flex items-center gap-3 rounded-md border p-4 text-left text-sm font-medium hover:bg-accent">
              <span className="grid size-9 place-items-center rounded-md bg-muted">{name === 'HTML' ? <Code2 className="size-4" /> : name === 'Shopify' ? <ShoppingBag className="size-4" /> : <Globe className="size-4" />}</span>
              {name}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

const operators: [string, string, 'Owner' | 'Member'][] = [
  ['eatOS | PM Team (you)', 'pmt@eatos.com', 'Owner'],
  ['eatOS | APP Support Team', 'support.app@eatos.com', 'Member'],
  ['eatOS Support', 'support.jw@eatos.com', 'Member'],
  ['eatOS | Support Team EC', 'support.ec@eatos.com', 'Member'],
  ['eatOS | Support Team CC', 'support.cc@eatos.com', 'Member'],
  ['eatOS Live | Support Team 198', 'live.support@eatos.com', 'Owner'],
  ['eatOS | Support Dashboard Team', 'support.dashboard@eatos.com', 'Member'],
  ['eatOS | Support Team JL', 'support.jl@eatos.com', 'Member'],
  ['eatOS | Support Team SC', 'support.sc@eatos.com', 'Owner'],
];

function Operators() {
  return (
    <div className="space-y-6">
      <PageHeading title="Operators & Teams" description="Add people that will be able to handle support for the workspace." />
      <p className="flex items-center gap-2 rounded-md border border-chart-2/40 bg-chart-2/10 px-4 py-3 text-sm text-chart-2"><ShieldCheck className="size-4" />Support is <strong>Online</strong> as at least one operator is online.</p>
      <Card title="General Options" icon={Settings}>
        <ToggleRow label="Prevent non-owner operators to remove data (conversations & contacts)" initial />
        <ToggleRow label="Force operators to have Two Factor Authentication enabled" />
      </Card>
      <Card title="Teams" icon={Users}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-muted-foreground">Create and manage teams</p><Button size="sm" className="bg-brand text-primary-foreground hover:bg-brand-strong"><PlusCircle />Add Team</Button></div>
        <Empty icon={Users} title="No team created yet." text="Group your operators into teams, and reuse those teams across your eatOS workspace." />
      </Card>
      <Card title="Operators" icon={UserRound}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-muted-foreground">Invite and manage operators</p><Button size="sm" className="bg-brand text-primary-foreground hover:bg-brand-strong"><PlusCircle />Add Operator</Button></div>
        <div className="mb-3 flex items-center justify-between"><span className="text-xs font-medium">Name ↕</span><Button size="sm" variant="secondary"><ListFilter />Empty Last Active</Button></div>
        <div className="divide-y rounded-md border">
          {operators.map(([name, email, role]) => (
            <div key={email} className="flex flex-wrap items-center gap-3 px-3 py-3">
              <span className="grid size-8 place-items-center rounded-full bg-brand/20 text-[10px] font-bold text-brand">eO</span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{name}</span>
              <span className="w-full truncate text-xs text-muted-foreground sm:w-56">{email}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold">{role}</span>
              <Info className="size-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

const logs: [string, 'write' | 'delete', string, string, string][] = [
  ['Operator profile', 'write', 'eatOS | PM Team', '2h (4:26 PM)', '99.45.217.2'],
  ['Operator logged in', 'write', 'eatOS | PM Team', '28 Sep (9:34 AM)', '99.45.217.2'],
  ['Operator password', 'write', 'eatOS | PM Team', '28 Sep (9:33 AM)', '99.45.217.2'],
  ['Operator profile', 'write', 'eatOS | PM Team', '28 Sep (9:33 AM)', '99.45.217.2'],
  ['Operator profile', 'write', 'eatOS | PM Team', '28 Sep (9:22 AM)', '99.45.217.2'],
  ['Operator MFA', 'write', 'eatOS | PM Team', '28 Sep (9:21 AM)', '99.45.217.2'],
  ['Operator invite', 'write', 'eatOS Live | Support', '28 Sep (9:15 AM)', '68.183.42.10'],
  ['Operator invite', 'delete', 'eatOS Live | Support', '28 Sep (9:14 AM)', '68.183.42.10'],
  ['Operator membership', 'write', 'eatOS Live | Support', '28 Sep (9:14 AM)', '68.183.42.10'],
];

function Log() {
  return (
    <div className="space-y-6">
      <PageHeading title="Team Transparency Log" description="Security log of important actions that workspace operators have taken." />
      <Card title="Team Transparency Log" icon={ScrollText}>
        <ToggleRow label="Collect transparency logs from all team members" initial />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted-foreground">Filter by</span>
          <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-xs"><Calendar className="size-4" /><input type="date" className="bg-transparent" aria-label="From" /> - <input type="date" className="bg-transparent" aria-label="To" /></div>
          <select className="h-9 rounded-md border bg-background px-3 text-xs sm:ml-auto"><option>All operators</option><option>eatOS | PM Team</option></select>
          <select className="h-9 rounded-md border bg-background px-3 text-xs"><option>All actions</option><option>write</option><option>delete</option></select>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left text-xs text-muted-foreground"><tr className="border-b"><th className="py-2">Action</th><th>Operator</th><th>Time Ago</th><th>IP Address</th></tr></thead>
            <tbody>
              {logs.map(([action, kind, op, time, ip], i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className={`py-3 ${kind === 'delete' ? 'text-destructive' : ''}`}>{action} <span className={`ml-2 rounded px-1.5 py-0.5 text-[10px] font-semibold ${kind === 'delete' ? 'bg-destructive/15 text-destructive' : 'bg-chart-4/15 text-chart-4'}`}>{kind}</span></td>
                  <td>{op}</td><td className="text-muted-foreground">{time}</td><td className="text-muted-foreground">🇺🇸 {ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function Advanced() {
  return (
    <div className="space-y-6">
      <PageHeading title="Advanced Configuration" description="Configure API token, Web Hooks, identity verification, and more." />
      <Card title="Workspace Defaults" icon={Settings}>
        <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-sm">Workspace default language (if user language is unknown)</span><select className="h-10 w-full rounded-md border bg-background px-3 text-sm sm:w-72"><option>Do not use any fallback language</option><option>English (US)</option><option>Spanish</option></select></div>
      </Card>
      <Card title="REST API + MCP Server Tokens" icon={Zap}>
        <div className="mb-4 flex justify-end"><Button size="sm" className="bg-brand text-primary-foreground hover:bg-brand-strong">Create Token<Plus /></Button></div>
        <Empty icon={Zap} title="You have no API Token" text="Your API Token will appear here." />
        <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">View API reference<Link2 className="size-3" /></a>
      </Card>
      <Card title="Web Hooks" icon={Globe}>
        <div className="mb-4 flex items-center justify-end gap-3"><span className="rounded-full bg-muted px-2 py-0.5 text-xs">0 hooks</span><Button size="sm" className="bg-brand text-primary-foreground hover:bg-brand-strong">Add a Web Hook<Plus /></Button></div>
        <Empty icon={Globe} title="You have no Web Hook" text="Your Web Hooks will appear here." />
      </Card>
      <Card title="Identity Verification" icon={ShieldCheck}>
        <p className="mb-2 inline-block rounded-full bg-chart-2/15 px-2 py-0.5 text-xs text-chart-2">● enabled</p>
        <ToggleRow label="Verify user emails with cryptographic signatures" initial />
        <div className="mt-3 grid gap-3 sm:grid-cols-[6rem_1fr_auto] sm:items-center">
          <span className="text-sm">Secret key</span>
          <Input readOnly value="3e60e867c668b7d1ed6a4bdb6acb89d8" className="font-mono text-xs" />
          <Button variant="destructive">Roll secret</Button>
        </div>
      </Card>
    </div>
  );
}

function Danger() {
  return (
    <div className="space-y-6">
      <PageHeading title="Danger Zone" description="Perform dangerous operations on this workspace." />
      <Card title="Leave workspace" icon={LogOut}>
        <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm">You will not be able to access the workspace anymore.</p><Button variant="secondary">Leave workspace</Button></div>
      </Card>
      <Card title="Delete workspace" icon={Trash2}>
        <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm">All eatOS data will be permanently deleted and non-recoverable.</p><Button variant="destructive">Delete workspace</Button></div>
      </Card>
    </div>
  );
}

const screens: Record<WorkspaceSection, () => React.ReactElement> = { information: Information, setup: Setup, operators: Operators, log: Log, advanced: Advanced, danger: Danger };

export default function AdminWorkspaceSettings({ section }: { section: WorkspaceSection }) {
  const Screen = screens[section];
  return <Screen />;
}
