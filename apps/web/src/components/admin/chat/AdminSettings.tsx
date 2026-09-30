'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarClock,
  ChevronDown,
  CreditCard,
  ExternalLink,
  Inbox,
  Mail,
  MessageCircle,
  Search,
  Settings,
  Shield,
  SquareActivity,
  SquareUserRound,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import AdminChatShell from './AdminChatShell';
import AdminAccountSettings, { type AccountSection } from './AdminAccountSettings';
import AdminWorkspaceSettings, { type WorkspaceSection } from './AdminWorkspaceSettings';
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

const accountSections: { key: AccountSection; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'information', label: 'Information', icon: UserRound },
  { key: 'notifications', label: 'Notification', icon: Bell },
  { key: 'availability', label: 'Availability', icon: CalendarClock },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'interface', label: 'Interface', icon: SquareUserRound },
  { key: 'shortcuts', label: 'Keyboard Shortcuts', icon: SquareActivity },
];

const workspaceSections: { key: WorkspaceSection; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'information', label: 'Information', icon: UserRound },
  { key: 'setup', label: 'Setup & Integrations', icon: Settings },
  { key: 'operators', label: 'Operators & Teams', icon: Users },
  { key: 'log', label: 'Team Transparency Log', icon: SquareActivity },
  { key: 'advanced', label: 'Advanced Configuration', icon: Settings },
  { key: 'danger', label: 'Danger Zone', icon: Shield },
];

function WorkspaceGroup({ active, section }: { active: SettingsKey; section: WorkspaceSection }) {
  return (
    <details className="group/ws" open={active === 'workspace'}>
      <Button asChild variant="ghost" className={cn('h-11 w-full justify-start px-3 text-sm', active === 'workspace' && 'bg-accent text-foreground')}>
        <summary className="cursor-pointer list-none marker:hidden [&::-webkit-details-marker]:hidden">
          <Settings className="size-4" />Workspace<ChevronDown className="ml-auto size-4 transition-transform group-open/ws:rotate-180" />
        </summary>
      </Button>
      <div className="ml-4 mt-1 space-y-1 border-l pl-2">
        {workspaceSections.map((s) => (
          <Button key={s.key} asChild variant="ghost" className={cn('h-9 w-full justify-start px-3 text-xs', active === 'workspace' && section === s.key && 'bg-accent text-foreground')}>
            <a href={`/chatapp/settings?category=workspace&section=${s.key}`} aria-current={active === 'workspace' && section === s.key ? 'page' : undefined}><s.icon className="size-4" />{s.label}</a>
          </Button>
        ))}
      </div>
    </details>
  );
}

function SettingsSidebar({ active, accountSection, workspaceSection }: { active: SettingsKey; accountSection: AccountSection; workspaceSection: WorkspaceSection }) {
  return (
    <aside className="scrollbar-hidden hidden w-72 shrink-0 overflow-y-auto border-r bg-background p-4 lg:flex lg:flex-col">
      <nav aria-label="Settings categories" className="space-y-1">
        <details className="group/account" open={active === 'account'}>
          <Button
            asChild
            variant="ghost"
            className={cn('h-11 w-full justify-start px-3 text-sm', active === 'account' && 'bg-accent text-foreground')}
          >
            <summary className="cursor-pointer list-none marker:hidden [&::-webkit-details-marker]:hidden">
              <UserRound className="size-4" />Account<ChevronDown className="ml-auto size-4 transition-transform group-open/account:rotate-180" />
            </summary>
          </Button>
          <div className="ml-4 mt-1 space-y-1 border-l pl-2">
            {accountSections.map((section) => (
              <Button key={section.key} asChild variant="ghost" className={cn('h-9 w-full justify-start px-3 text-xs', active === 'account' && accountSection === section.key && 'bg-accent text-foreground')}>
                <a href={`/chatapp/settings?category=account&section=${section.key}`} aria-current={active === 'account' && accountSection === section.key ? 'page' : undefined}><section.icon className="size-4" />{section.label}</a>
              </Button>
            ))}
          </div>
        </details>
        {groups.filter((group) => group.key !== 'account').map((group) => group.key === 'workspace' ? <WorkspaceGroup key="workspace" active={active} section={workspaceSection} /> : (
          <Button key={group.key} asChild variant="ghost" className={cn('h-11 w-full justify-start px-3 text-sm', active === group.key && 'bg-accent text-foreground')}>
            <a href={`/chatapp/settings?category=${group.key}`} aria-current={active === group.key ? 'page' : undefined}><group.icon className="size-4" />{group.label}<ChevronDown className={cn('ml-auto size-4 transition-transform', active === group.key && 'rotate-180')} /></a>
          </Button>
        ))}
      </nav>

    </aside>
  );
}

function SettingRow({ title, description, enabled, onChange }: { title: string; description: string; enabled: boolean; onChange: (value: boolean) => void }) {
  return <div className="flex items-start gap-4 border-b py-5 last:border-0"><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p></div><Switch checked={enabled} onCheckedChange={onChange} aria-label={title} className="data-[state=checked]:bg-brand" /></div>;
}

function VisitorWidgetPreview() {
  return (
    <div className="grid min-h-64 place-items-center rounded-md border bg-muted/20 p-4 sm:p-7">
      <div className="w-full max-w-xl rounded-lg border bg-card p-5 shadow-lg sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold sm:text-xl">Do you have any question?</h2>
          <X className="size-5 text-muted-foreground" />
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-base font-semibold text-brand sm:text-lg"><span className="size-3 rounded-full bg-chart-2" />eatOS team is online</p>
          <div className="flex -space-x-2" aria-label="Available team members">
            {['JM', 'AS', 'RB'].map((initials) => <span key={initials} className="grid size-9 place-items-center rounded-full border-2 border-card bg-secondary text-[10px] font-bold">{initials}</span>)}
            <span className="grid size-9 place-items-center rounded-full border-2 border-card bg-brand text-primary-foreground"><MessageCircle className="size-4" /></span>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-[1.3fr_1fr]">
          <Button size="lg" className="h-12 bg-brand text-primary-foreground hover:bg-brand-strong"><MessageCircle />Chat with eatOS</Button>
          <Button size="lg" variant="secondary" className="h-12"><Search />Helpdesk</Button>
        </div>
      </div>
    </div>
  );
}

function AvailabilityPanel() {
  const [online, setOnline] = useState(true);
  const [weekends, setWeekends] = useState(false);

  return (
    <Panel title="Set your Availability days and hours" description="Let visitors know when you're available to chat by setting up your schedule.">
      <VisitorWidgetPreview />
      <details className="group/schedule mt-6">
        <Button asChild size="lg" className="bg-brand text-primary-foreground hover:bg-brand-strong"><summary className="cursor-pointer list-none marker:hidden [&::-webkit-details-marker]:hidden">Define availability schedule<ArrowRight className="group-open/schedule:rotate-90" /></summary></Button>
        <div className="mt-4 rounded-md border bg-muted/20 p-4 sm:p-5">
          <div><h3 className="text-sm font-bold">Availability schedule</h3><p className="mt-1 text-xs text-muted-foreground">Set the hours your team appears online.</p></div>
          <SettingRow title="Show team as online" description="The chatbox displays your team as available during scheduled hours." enabled={online} onChange={setOnline} />
          <SettingRow title="Weekend coverage" description="Include Saturday and Sunday in the support schedule." enabled={weekends} onChange={setWeekends} />
          <div className="grid gap-3 pt-5 sm:grid-cols-2"><label className="text-xs font-medium">Weekday start<Input type="time" defaultValue="09:00" className="mt-2" /></label><label className="text-xs font-medium">Weekday end<Input type="time" defaultValue="18:00" className="mt-2" /></label></div>
        </div>
      </details>
    </Panel>
  );
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

function Panel({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <section className="mx-auto w-full max-w-4xl rounded-md border bg-card p-5 shadow-sm md:p-7"><h1 className="text-xl font-bold">{title}</h1><p className="mt-2 text-sm text-muted-foreground">{description}</p><div className="mt-5">{children}</div></section>;
}

export default function AdminSettings({ initialActive = 'chatbox', initialAccountSection = 'information', initialWorkspaceSection = 'information' }: { initialActive?: SettingsKey; initialAccountSection?: AccountSection; initialWorkspaceSection?: WorkspaceSection }) {
  const [collapsed, setCollapsed] = useState(false);
  const active = initialActive;
  return (
    <AdminChatShell collapsed={collapsed} onCollapsedChange={setCollapsed}>
      <div className="flex h-full min-w-0">
        <SettingsSidebar active={active} accountSection={initialAccountSection} workspaceSection={initialWorkspaceSection} />
        <main className="scrollbar-hidden min-w-0 flex-1 overflow-y-auto bg-muted/20">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-1 border-b bg-background/95 px-3 backdrop-blur sm:px-5">
            <Button variant="ghost" size="icon-sm" aria-label="Back" onClick={() => window.history.back()}><ArrowLeft /></Button>
            <Button variant="ghost" size="icon-sm" aria-label="Forward" onClick={() => window.history.forward()}><ArrowRight /></Button>
            <h2 className="ml-2 text-sm font-medium text-muted-foreground">Settings</h2>
             <nav aria-label="Settings categories" className="scrollbar-hidden ml-auto flex max-w-[55%] gap-1 overflow-x-auto lg:hidden">{groups.map((group) => <Button key={group.key} asChild variant={active === group.key ? 'secondary' : 'ghost'} size="sm"><a href={group.key === 'account' ? '/chatapp/settings?category=account&section=information' : group.key === 'workspace' ? '/chatapp/settings?category=workspace&section=information' : `/chatapp/settings?category=${group.key}`}>{group.label}</a></Button>)}</nav>
            <Button variant="ghost" size="sm" className="ml-auto hidden text-muted-foreground lg:inline-flex"><Search />Search</Button>
          </header>
           {active === 'account' ? <nav aria-label="Account settings" className="scrollbar-hidden flex gap-1 overflow-x-auto border-b px-3 py-2 lg:hidden">{accountSections.map((section) => <Button key={section.key} asChild variant={initialAccountSection === section.key ? 'secondary' : 'ghost'} size="sm" className="shrink-0"><a href={`/chatapp/settings?category=account&section=${section.key}`}>{section.label}</a></Button>)}</nav> : null}
           {active === 'workspace' ? <nav aria-label="Workspace settings" className="scrollbar-hidden flex gap-1 overflow-x-auto border-b px-3 py-2 lg:hidden">{workspaceSections.map((s) => <Button key={s.key} asChild variant={initialWorkspaceSection === s.key ? 'secondary' : 'ghost'} size="sm" className="shrink-0"><a href={`/chatapp/settings?category=workspace&section=${s.key}`}>{s.label}</a></Button>)}</nav> : null}
           <div className="px-4 py-8 sm:px-6 md:py-12 xl:px-12 xl:py-16">
             {active === 'account' ? <div className="mx-auto w-full max-w-4xl"><AdminAccountSettings section={initialAccountSection} /></div> : active === 'chatbox' ? <AvailabilityPanel /> : active === 'workspace' ? <div className="mx-auto w-full max-w-4xl"><AdminWorkspaceSettings section={initialWorkspaceSection} /></div> : active === 'inbox' ? <InboxPanel /> : active === 'email' ? <EmailPanel /> : active === 'status' ? <StatusPanel /> : <BasicPanel active={active} />}
          </div>
          <div className="mx-auto flex max-w-4xl justify-end px-4 pb-8 sm:px-6 xl:px-12"><Button variant="ghost" size="sm" className="text-muted-foreground"><ExternalLink />Open help center</Button></div>
        </main>
      </div>
    </AdminChatShell>
  );
}