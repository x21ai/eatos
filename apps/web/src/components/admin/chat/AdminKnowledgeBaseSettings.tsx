'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { ComponentType, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import {
  ArrowLeft, Check, ChevronRight, CircleAlert, CloudDownload, CloudUpload, Code2, Copy, Database,
  ExternalLink, FileUp, Globe2, Image as ImageIcon, KeyRound, Languages, Link2, List, MoreHorizontal,
  Paintbrush, Plus, RefreshCw, RotateCcw, Search, Settings, SlidersHorizontal, Trash2, Upload,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import AdminChatShell from './AdminChatShell';

type SectionId = 'domain' | 'localization' | 'customization' | 'features' | 'authentication' | 'redirections' | 'data' | 'advanced';
type IconType = typeof Globe2;

const sections: { id: SectionId; label: string; icon: IconType }[] = [
  { id: 'domain', label: 'Domain Setup', icon: Globe2 },
  { id: 'localization', label: 'Localization', icon: Languages },
  { id: 'customization', label: 'Customization', icon: Paintbrush },
  { id: 'features', label: 'Features', icon: SlidersHorizontal },
  { id: 'authentication', label: 'Authentication', icon: KeyRound },
  { id: 'redirections', label: 'Page Redirections', icon: RotateCcw },
  { id: 'data', label: 'Data Import & Export', icon: Database },
  { id: 'advanced', label: 'Advanced Settings', icon: MoreHorizontal },
];

const details: Record<SectionId, { title: string; description: string }> = {
  domain: { title: 'Setup a domain name for your Knowledge Base', description: 'Set up a base domain, and an optional custom domain using your own domain name for your site.' },
  localization: { title: 'Configure your multilingual Knowledge Base', description: 'Your Knowledge Base can speak multiple languages. Define how localization behaves here.' },
  customization: { title: 'Customize the appearance of your Knowledge Base', description: 'Change how your Knowledge Base site appears to your users.' },
  features: { title: 'Configure the features of your Knowledge Base', description: 'Enable or disable features, and change the behavior of certain functions of your Knowledge Base.' },
  authentication: { title: 'Password-protect your Knowledge Base', description: 'Set up authentication to protect certain or all pages, and only allow certain users through.' },
  redirections: { title: 'Redirect old page URLs to new URLs', description: 'Configure a list of page URLs to redirect to other URLs. This can be used to migrate from a previous provider.' },
  data: { title: 'Import & Export your Knowledge Base data', description: 'Import content from your previous provider, or export your Knowledge Base data.' },
  advanced: { title: 'Advanced settings for your Knowledge Base', description: 'Advanced options for special needs can be configured here.' },
};

function Panel({ title, icon: Icon, children }: { title: string; icon: IconType; children: ReactNode }) {
  return <section className="overflow-hidden rounded-lg border bg-background shadow-xs">
    <header className="flex min-h-12 items-center gap-2 border-b px-4 py-3"><Icon className="size-4 text-muted-foreground" /><h2 className="text-sm font-semibold">{title}</h2></header>
    {children}
  </section>;
}

function SettingRow({ label, checked, onCheckedChange, disabled }: { label: string; checked: boolean; onCheckedChange: (value: boolean) => void; disabled?: boolean }) {
  return <div className={cn('flex min-h-11 items-center justify-between gap-4 px-4 py-2 text-sm', disabled && 'text-muted-foreground')}><span>{label}</span><Switch checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} aria-label={label} /></div>;
}

function DomainSettings() {
  const [baseDomain, setBaseDomain] = useState('eatos');
  const copy = async (value: string) => { await navigator.clipboard?.writeText(value); toast.success('Copied to clipboard'); };
  return <div className="space-y-5">
    <Panel title="Domain name" icon={Globe2}><div className="grid gap-5 p-4 sm:p-5">
      <label className="grid max-w-xl gap-2 text-sm font-medium">Base domain <span className="flex"><Input value={baseDomain} onChange={(event) => setBaseDomain(event.target.value)} className="rounded-r-none" /><span className="grid min-w-24 place-items-center rounded-r-md border border-l-0 bg-muted px-3 text-xs text-muted-foreground">eatos.com</span></span></label>
      <label className="grid max-w-xl gap-2 text-sm font-medium">Custom domain <span className="flex items-center gap-3"><Input defaultValue="support.eatos.com" /><span className="hidden shrink-0 items-center gap-1 text-xs text-emerald-500 sm:flex"><Check className="size-4" />Custom domain online</span></span></label>
    </div></Panel>
    <Panel title="Setup instructions" icon={Check}><div className="space-y-4 p-4 sm:p-5">
      <p className="text-sm font-medium">Custom domain setup instructions:</p>
      <ol className="space-y-3 text-sm"><li className="flex gap-3"><span className="grid size-5 shrink-0 place-items-center rounded bg-primary text-xs text-primary-foreground">1</span><span>Login to your DNS manager for <strong>support.eatos.com</strong></span></li><li className="flex gap-3"><span className="grid size-5 shrink-0 place-items-center rounded bg-primary text-xs text-primary-foreground">2</span><span>Add these DNS records:</span></li></ol>
      <div className="overflow-x-auto rounded-md border"><table className="w-full min-w-[560px] text-left text-xs"><thead className="bg-muted/50 text-muted-foreground"><tr><th className="p-3 font-medium">Sub-Domain</th><th className="p-3 font-medium">Type</th><th className="p-3 font-medium">Value</th></tr></thead><tbody><tr className="border-t"><td className="p-3"><button onClick={() => copy('_crisp.support.eatos.com')} className="inline-flex items-center gap-2">_crisp.support.eatos.com <Copy className="size-3" /></button></td><td className="p-3">TXT</td><td className="p-3"><button onClick={() => copy('crisp-website-id=demo-workspace')} className="inline-flex items-center gap-2">crisp-website-id=demo-workspace <Copy className="size-3" /></button></td></tr><tr className="border-t"><td className="p-3">support.eatos.com</td><td className="p-3">CNAME</td><td className="p-3">custom.help.eatos.com</td></tr></tbody></table></div>
      <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center"><p className="text-xs italic text-emerald-500 sm:mr-auto">Domain is currently in use on your workspace.</p><Button variant="secondary" onClick={() => toast.success('Domain setup verified')}><Check />Verify domain setup</Button><Button asChild><Link href="/kb-demo"><ExternalLink />View online</Link></Button></div>
    </div></Panel>
  </div>;
}

function LocalizationSettings() {
  const [languages, setLanguages] = useState(['English (US)']);
  const [newLanguage, setNewLanguage] = useState('Spanish');
  return <div className="space-y-5">
    <Panel title="Main language" icon={Languages}><div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-muted-foreground">Reference language for writing</p><Select defaultValue="english"><SelectTrigger className="w-full sm:w-64"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="english">🇺🇸 English</SelectItem><SelectItem value="spanish">🇪🇸 Spanish</SelectItem><SelectItem value="french">🇫🇷 French</SelectItem></SelectContent></Select></div></Panel>
    <Panel title="All languages" icon={List}><div className="border-b p-3 text-right"><Dialog><DialogTrigger asChild><Button size="sm">Add a language <Plus /></Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Add a language</DialogTitle><DialogDescription>Add another language to your Knowledge Base.</DialogDescription></DialogHeader><Select value={newLanguage} onValueChange={setNewLanguage}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Spanish">Spanish</SelectItem><SelectItem value="French">French</SelectItem><SelectItem value="German">German</SelectItem></SelectContent></Select><DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><DialogClose asChild><Button onClick={() => { if (!languages.includes(newLanguage)) setLanguages((items) => [...items, newLanguage]); toast.success(`${newLanguage} added`); }}>Add language</Button></DialogClose></DialogFooter></DialogContent></Dialog></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm"><thead className="text-muted-foreground"><tr><th className="p-4 font-medium">Language</th><th className="p-4 font-medium">Article Count</th><th className="p-4 font-medium">View</th><th className="w-14 p-4" /></tr></thead><tbody>{languages.map((language, index) => <tr key={language} className="border-t"><td className="p-4">{index === 0 ? '🇺🇸' : '🌐'} {language}</td><td className="p-4">{index === 0 ? 5 : 0}</td><td className="p-4"><Link href="/kb-demo" className="inline-flex items-center gap-1 text-primary"><ExternalLink className="size-4" />View online</Link></td><td className="p-4"><Button variant="ghost" size="icon-sm" disabled={index === 0} aria-label={`Remove ${language}`} onClick={() => setLanguages((items) => items.filter((item) => item !== language))}><Trash2 className="text-destructive" /></Button></td></tr>)}</tbody></table></div>
    </Panel>
  </div>;
}

function UploadBox({ label, note, wide }: { label: string; note: string; wide?: boolean }) {
  const [file, setFile] = useState('');
  return <div className={cn('grid gap-3', wide && 'sm:grid-cols-[1fr_auto] sm:items-end')}><div><p className="text-sm font-medium">{label}</p><p className="mt-1 text-xs text-muted-foreground">{note}</p>{file && <p className="mt-2 truncate text-xs text-emerald-500">{file}</p>}</div><div className="flex gap-2"><Button asChild size="sm"><label className="cursor-pointer"><Upload />Upload image<input type="file" accept="image/*" className="sr-only" onChange={(event) => { const name = event.target.files?.[0]?.name; if (name) { setFile(name); toast.success(`${label} selected`); } }} /></label></Button>{file && <Button variant="ghost" size="icon-sm" onClick={() => setFile('')} aria-label={`Remove ${label}`}><Trash2 className="text-destructive" /></Button>}</div></div>;
}

function CustomizationSettings() {
  return <div className="space-y-5"><Panel title="General" icon={Paintbrush}><label className="grid max-w-md gap-2 p-4 text-sm font-medium">Knowledge Base name <Input defaultValue="eatOS Support Helpdesk" onBlur={() => toast.success('Knowledge Base name saved')} /></label></Panel>
    <Panel title="Logo" icon={ImageIcon}><div className="grid gap-6 p-4 sm:grid-cols-2"><UploadBox label="Favicon" note="File smaller than 10 MB and at least 128px by 128px." /><UploadBox label="Header logo" note="File smaller than 10 MB and at least 300px by 100px." /><UploadBox label="Footer logo" note="File smaller than 10 MB and at least 300px by 100px." /></div></Panel>
    <Panel title="Banner" icon={ImageIcon}><div className="p-4"><div className="mb-4 grid h-24 place-items-center rounded-md border bg-muted/40"><ImageIcon className="size-9 text-muted-foreground" /></div><UploadBox wide label="Banner image" note="File smaller than 10 MB and at least 1000px by 200px." /></div></Panel></div>;
}

function FeaturesSettings() {
  const initial = { chatbox: true, locale: true, crisp: false, status: true, popular: true, categories: true, feedback: true, markdown: true, indexing: false };
  const [values, setValues] = useState(initial);
  const row = (key: keyof typeof initial, label: string, disabled?: boolean) => <SettingRow label={label} checked={values[key]} disabled={disabled} onCheckedChange={(checked) => setValues((current) => ({ ...current, [key]: checked }))} />;
  return <div className="space-y-5"><Panel title="General" icon={Settings}>{row('chatbox', 'Display the eatOS chatbox on the Knowledge Base')}{row('locale', 'Show a locale selector in the header of the Knowledge Base')}{row('crisp', 'Show a link to eatOS in the footer of the Knowledge Base', true)}{row('status', 'Show an alert when status reports degraded service')}</Panel><Panel title="Homepage" icon={Globe2}>{row('popular', 'Show a list of most frequently read articles on homepage')}{row('categories', 'Show category images on homepage')}</Panel><Panel title="Content" icon={List}>{row('feedback', 'Ask users for feedback at the end of the articles')}{row('markdown', 'Serve articles as Markdown files when requested with .md extension')}{row('indexing', 'Forbid search engine indexing of all pages')}</Panel></div>;
}

function AuthenticationSettings() {
  const [enabled, setEnabled] = useState(false);
  return <Panel title="Authentication provider" icon={KeyRound}><SettingRow label="Enable Knowledge Base authentication" checked={enabled} onCheckedChange={setEnabled} />{enabled && <div className="grid gap-4 border-t p-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-medium">Access method<Select defaultValue="password"><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="password">Shared password</SelectItem><SelectItem value="email">Approved email domains</SelectItem></SelectContent></Select></label><label className="grid gap-2 text-sm font-medium">Demo password<Input type="password" defaultValue="knowledge-demo" /></label><p className="text-xs text-muted-foreground sm:col-span-2">Demo only. This does not protect the published Knowledge Base.</p><Button className="sm:col-span-2 sm:justify-self-end" onClick={() => toast.success('Demo authentication settings saved')}>Save settings</Button></div>}</Panel>;
}

function RedirectionsSettings() {
  const [redirects, setRedirects] = useState<{ source: string; destination: string }[]>([]);
  const [source, setSource] = useState(''); const [destination, setDestination] = useState('');
  return <Panel title="Page redirections" icon={Link2}><div className="border-b p-3 text-right"><Dialog><DialogTrigger asChild><Button size="sm">Add a page redirect <Plus /></Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Add a page redirect</DialogTitle><DialogDescription>Send an old Knowledge Base address to a new location.</DialogDescription></DialogHeader><label className="grid gap-2 text-sm font-medium">Old page URL<Input value={source} onChange={(event) => setSource(event.target.value)} placeholder="/old-article" /></label><label className="grid gap-2 text-sm font-medium">New page URL<Input value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="/new-article" /></label><DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><DialogClose asChild><Button disabled={!source.trim() || !destination.trim()} onClick={() => { setRedirects((items) => [...items, { source, destination }]); setSource(''); setDestination(''); toast.success('Page redirect added'); }}>Add redirect</Button></DialogClose></DialogFooter></DialogContent></Dialog></div>{redirects.length === 0 ? <div className="grid min-h-28 place-items-center p-6 text-center"><div><RotateCcw className="mx-auto size-5" /><p className="mt-3 text-sm font-medium">No page redirection yet.</p></div></div> : <div>{redirects.map((redirect, index) => <div key={`${redirect.source}-${index}`} className="flex items-center gap-3 border-b p-4 text-sm last:border-0"><span className="min-w-0 flex-1 truncate">{redirect.source}</span><ChevronRight className="size-4 text-muted-foreground" /><span className="min-w-0 flex-1 truncate">{redirect.destination}</span><Button variant="ghost" size="icon-sm" onClick={() => setRedirects((items) => items.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remove redirect ${redirect.source}`}><Trash2 className="text-destructive" /></Button></div>)}</div>}</Panel>;
}

function DataSettings() {
  const [importFile, setImportFile] = useState('');
  return <div className="space-y-5"><Panel title="Import Knowledge Base" icon={CloudDownload}><div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"><p className="text-sm text-muted-foreground sm:mr-auto">Import content from another provider</p><Button asChild><label className="cursor-pointer"><FileUp />{importFile || 'Import from another Knowledge Base'}<input type="file" accept=".zip,.json,.csv" className="sr-only" onChange={(event) => { const name = event.target.files?.[0]?.name; if (name) { setImportFile(name); toast.success('Import file selected'); } }} /></label></Button></div></Panel><Panel title="Export Knowledge Base" icon={CloudUpload}><div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"><p className="text-sm text-muted-foreground sm:mr-auto">Export all demo Knowledge Base content</p><Button variant="secondary" onClick={() => toast.success('Demo export prepared')}><Upload />Export my Knowledge Base</Button></div></Panel></div>;
}

function AdvancedSettings() {
  const [code, setCode] = useState('<!-- Add custom Knowledge Base HTML here -->');
  return <div className="space-y-5"><Panel title="Code includes" icon={Code2}><div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"><p className="text-sm text-muted-foreground sm:mr-auto">Include custom HTML code</p><Dialog><DialogTrigger asChild><Button><Code2 />Edit included HTML code</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Included HTML code</DialogTitle><DialogDescription>Add demo HTML that would be included on Knowledge Base pages.</DialogDescription></DialogHeader><Textarea value={code} onChange={(event) => setCode(event.target.value)} className="min-h-44 font-mono text-xs" /><DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><DialogClose asChild><Button onClick={() => toast.success('Custom HTML saved')}>Save code</Button></DialogClose></DialogFooter></DialogContent></Dialog></div></Panel><Panel title="Maintenance tasks" icon={RefreshCw}><div className="p-4"><div className="flex gap-3 rounded-md border border-chart-3/30 bg-chart-3/10 p-4 text-sm text-chart-3"><CircleAlert className="size-5 shrink-0" /><p>You normally do not have to run these tasks, but if something feels broken then it might be a good time to run maintenance.</p></div><div className="mt-4 flex flex-col gap-4 rounded-md border p-4 sm:flex-row sm:items-center"><div className="sm:mr-auto"><h3 className="text-sm font-semibold">Re-generate all your Knowledge Base pages</h3><p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground">Request a full re-synchronization of all online pages and force a manual refresh of the demo Knowledge Base.</p></div><Dialog><DialogTrigger asChild><Button variant="destructive"><RefreshCw />Run full re-synchronization</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Run full re-synchronization?</DialogTitle><DialogDescription>This demo action will simulate rebuilding every Knowledge Base page.</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><DialogClose asChild><Button variant="destructive" onClick={() => toast.success('Knowledge Base pages re-synchronized')}>Run task</Button></DialogClose></DialogFooter></DialogContent></Dialog></div></div></Panel></div>;
}

const screens: Record<SectionId, ComponentType> = { domain: DomainSettings, localization: LocalizationSettings, customization: CustomizationSettings, features: FeaturesSettings, authentication: AuthenticationSettings, redirections: RedirectionsSettings, data: DataSettings, advanced: AdvancedSettings };

export default function AdminKnowledgeBaseSettings() {
  const searchParams = useSearchParams();
  const requested = searchParams.get('section') as SectionId | null;
  const initial = sections.some((section) => section.id === requested) ? requested as SectionId : 'domain';
  const [collapsed, setCollapsed] = useState(true);
  const menu = searchParams.get('menu');
  const mobileStage: 'knowledge' | 'sections' | 'content' = requested ? 'content' : menu === 'sections' ? 'sections' : 'knowledge';
  const current = useMemo(() => sections.find((section) => section.id === initial) ?? sections[0], [initial]);
  const Screen = screens[initial];
  return <AdminChatShell collapsed={collapsed} onCollapsedChange={setCollapsed}><div className="flex h-full min-h-0 gap-2 bg-muted/40 p-2">
    <aside className={cn('w-full shrink-0 flex-col rounded-lg border bg-background p-3 md:flex md:w-14 lg:w-56 lg:p-4', mobileStage === 'knowledge' ? 'flex' : 'hidden')}><h2 className="hidden text-sm font-bold lg:block">Knowledge Base</h2><Link href="/chatapp/knowledge-base" title="User Docs" className="mt-5 flex h-10 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium hover:bg-accent lg:justify-start"><List className="size-4 shrink-0" /><span className="lg:inline md:hidden">User Docs</span></Link><div className="mt-auto space-y-3"><Link href="/chatapp/knowledge-base/settings?menu=sections" title="Settings" className="flex h-10 w-full items-center justify-center gap-2 rounded-md border bg-accent px-3 text-sm font-medium lg:justify-start"><Settings className="size-4 shrink-0" /><span className="lg:inline md:hidden">Settings</span></Link><Button asChild className="w-full px-2"><Link href="/kb-demo" title="View Online"><ExternalLink /><span className="lg:inline md:hidden">View Online</span></Link></Button></div></aside>
    <aside className={cn('w-full shrink-0 flex-col rounded-lg border bg-background p-3 md:flex md:w-64', mobileStage === 'sections' ? 'flex' : 'hidden')}><div className="flex items-center gap-2 px-1 py-1"><Button asChild variant="ghost" size="icon-sm"><Link href="/chatapp/knowledge-base/settings" aria-label="Back to Knowledge Base"><ArrowLeft /></Link></Button><h2 className="text-sm font-bold">Settings</h2></div><nav className="mt-4 space-y-1">{sections.map((section) => <Link key={section.id} href={`/chatapp/knowledge-base/settings?section=${section.id}`} className={cn('flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm hover:bg-accent', section.id === initial && 'bg-accent shadow-xs')}><section.icon className="size-4 text-muted-foreground" />{section.label}</Link>)}</nav></aside>
    <main className={cn('min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg border bg-background md:flex', mobileStage === 'content' ? 'flex' : 'hidden')}><header className="flex h-12 shrink-0 items-center gap-2 border-b px-3 text-xs text-muted-foreground"><Button asChild variant="ghost" size="icon-sm" className="md:hidden"><Link href="/chatapp/knowledge-base/settings?menu=sections" aria-label="Back to settings"><ArrowLeft /></Link></Button><span className="hidden sm:inline">Knowledge Base</span><ChevronRight className="hidden size-3 sm:block" /><span>Settings</span><ChevronRight className="size-3" /><span className="truncate text-foreground">{current.label}</span><Search className="ml-auto size-4" /></header><div className="min-h-0 flex-1 overflow-y-auto bg-muted/20 p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-5xl"><div className="mb-6 flex items-start gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-muted"><current.icon className="size-6 text-muted-foreground" /></span><div><h1 className="text-xl font-semibold sm:text-2xl">{details[initial].title}</h1><p className="mt-1 text-sm text-muted-foreground">{details[initial].description}</p></div></div><Screen /></div></div></main>
  </div></AdminChatShell>;
}