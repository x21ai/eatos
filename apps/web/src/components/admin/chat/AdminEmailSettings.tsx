'use client';
import {
  AtSign,
  CheckCircle2,
  CircleHelp,
  Info,
  Mail,
  Send,
  Server,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, PageHeading } from './AdminAccountSettings';

export type EmailSection = 'behavior' | 'domains' | 'delivery';

function StatusBadge({ children, tone = 'success' }: { children: React.ReactNode; tone?: 'success' | 'warning' }) {
  return (
    <span className={tone === 'success' ? 'inline-flex items-center gap-1.5 rounded-full bg-chart-2/10 px-2.5 py-1 text-xs font-medium text-chart-2' : 'inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive'}>
      <span className={tone === 'success' ? 'size-2 rounded-full bg-chart-2' : 'size-2 rounded-full bg-destructive'} />
      {children}
    </span>
  );
}

function NativeToggleRow({ label, initial = false }: { label: string; initial?: boolean }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center justify-between gap-4 border-b py-2.5 last:border-0">
      <span className="text-sm font-medium">{label}</span>
      <input type="checkbox" defaultChecked={initial} aria-label={label} className="h-5 w-9 shrink-0 cursor-pointer accent-brand" />
    </label>
  );
}

function EmailBehavior() {
  return (
    <div>
      <PageHeading title="Email Behavior" />
      <div className="space-y-5">
        <Card title="General Options" icon={Settings}>
          <NativeToggleRow label="Email users transcripts of conversations" initial />
          <NativeToggleRow label="Enable ratings (in chatbox and transcript emails)" initial />
          <NativeToggleRow label="Include tracking pixels in emails sent to users (from Inbox and Campaigns)" initial />
          <NativeToggleRow label="Send emails that might be junk to the Spam inbox" initial />
        </Card>

        <section className="overflow-hidden rounded-md border bg-card shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-5">
            <span className="flex items-center gap-2 text-sm font-semibold"><Mail className="size-4 text-muted-foreground" />Custom Email Signature</span>
            <StatusBadge tone="warning">disabled</StatusBadge>
          </div>
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-5">
            <span className="text-sm text-muted-foreground">Append a text signature at the bottom of all sent emails</span>
            <Switch disabled aria-label="Append a custom email signature" />
          </div>
        </section>
      </div>
    </div>
  );
}

function Domains() {
  return (
    <div>
      <PageHeading title="Domains" />
      <div className="space-y-5">
        <Card title="Email Domains" icon={AtSign}>
          <div className="grid gap-5">
            <label className="text-sm font-medium">
              Basic domain <span className="text-destructive">*</span>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex w-full max-w-md overflow-hidden rounded-md border bg-background">
                  <Input value="eatos" readOnly className="rounded-none border-0 shadow-none" aria-label="Basic email domain" />
                  <span className="flex items-center border-l px-3 text-xs text-muted-foreground">.on.eatos.email</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-chart-2"><CheckCircle2 className="size-4" />Basic domain online</span>
              </div>
            </label>
            <label className="max-w-md text-sm font-medium">
              Custom domain
              <Input defaultValue="" placeholder="emails.your-restaurant.com" className="mt-2" />
            </label>
          </div>
        </Card>

        <Card title="Setup instructions" icon={CheckCircle2}>
          <div className="rounded-md bg-brand/10 p-4 text-sm text-muted-foreground">
            <p className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />This domain does not require any setup. It is the default domain provided by eatOS.</p>
          </div>
          <div className="mt-5 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium italic text-chart-2">Domain is currently in use on your workspace.</p>
            <Button disabled><CheckCircle2 />Verify domain setup</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function EmailDelivery() {
  return (
    <div>
      <PageHeading title="Email Delivery" />
      <div className="space-y-5">
        <Card title="Outbound Email IPs" icon={Send}>
          <div className="rounded-md bg-brand/10 p-4 sm:p-5">
            <p className="flex items-center gap-2 text-sm font-semibold"><Info className="size-4" />What are outbound email IPs?</p>
            <p className="mt-3 text-sm font-medium leading-6">When emails are sent to your users for eatOS messages and campaigns, they use an IP address with a reputation attached to it. The likelihood that your emails go to spam is based on the IP reputation.</p>
            <p className="mt-3 text-sm text-muted-foreground">You can use the default shared IP pool, or a dedicated IP address to improve email deliverability.</p>
          </div>
          <div className="mt-5 overflow-hidden rounded-md border">
            <div className="flex flex-wrap items-center gap-3 border-b bg-muted/20 px-4 py-3 text-sm">
              <Server className="size-4 text-muted-foreground" />
              <span>Your outbound email IP status</span>
              <StatusBadge>High</StatusBadge>
            </div>
            <div className="flex flex-col gap-5 p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm">You are using the shared email IP pool</p>
                <details className="group/install">
                  <Button asChild variant="outline"><summary className="cursor-pointer list-none marker:hidden [&::-webkit-details-marker]:hidden"><CheckCircle2 /><span className="group-open/install:hidden">Install the Dedicated Email IP plugin</span><span className="hidden group-open/install:inline">Request noted</span></summary></Button>
                </details>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-chart-2"><StatusBadge>High</StatusBadge><span>Using high-reputation shared pool</span><Button variant="link" size="sm" className="h-auto p-0 text-brand"><CircleHelp />Why?</Button></div>
            </div>
          </div>
        </Card>

        <section className="overflow-hidden rounded-md border bg-card shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-5">
            <span className="flex items-center gap-2 text-sm font-semibold"><Mail className="size-4 text-muted-foreground" />Custom Email SMTP</span>
            <StatusBadge tone="warning">inactive</StatusBadge>
          </div>
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-5">
            <span className="text-sm text-muted-foreground">Send all emails using my custom outbound SMTP server</span>
            <Switch disabled aria-label="Use custom outbound SMTP server" />
          </div>
        </section>
      </div>
    </div>
  );
}

export default function AdminEmailSettings({ section }: { section: EmailSection }) {
  if (section === 'domains') return <Domains />;
  if (section === 'delivery') return <EmailDelivery />;
  return <EmailBehavior />;
}