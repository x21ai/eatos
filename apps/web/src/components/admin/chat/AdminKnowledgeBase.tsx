@@
-          <button type="button" onClick={() => toast('Knowledge Base settings')} className="flex h-9 w-full items-center justify-center gap-2 rounded-md px-3 text-sm text-muted-foreground hover:bg-accent lg:justify-start"><Settings className="size-4" /><span className="hidden lg:inline">Settings</span></button>
+          <Button asChild variant="ghost" className="w-full justify-center text-muted-foreground lg:justify-start"><Link href="/chatapp/knowledge-base/settings"><Settings /><span className="hidden lg:inline">Settings</span></Link></Button>
'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  AlertCircle, ArrowLeft, Baseline, Bold, BookOpen, ChevronDown, ChevronRight, CloudUpload, Code, FileText, Film,
  Folder, Globe, Image as ImageIcon, Info, Italic, Link2, List, ListFilter, ListOrdered, MoreVertical, PanelLeftClose,
  Pencil, Plus, Quote, Search, Settings, Settings2, SeparatorHorizontal, Table, Type, Underline, X, Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import AdminChatShell from './AdminChatShell';
import type { KbArticle } from './kb-data';
import { kbStore, useKbArticles } from './kb-store';

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default function AdminKnowledgeBase() {
  const [collapsed, setCollapsed] = useState(false);
  const articles = useKbArticles();
  const [selectedId, setSelectedId] = useState('');
  const [query, setQuery] = useState('');
  const [mobileEditor, setMobileEditor] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);

  const filtered = useMemo(
    () => articles.filter((a) => a.title.toLowerCase().includes(query.toLowerCase())),
    [articles, query],
  );

  // The list groups from the data itself, so a new article lands in its category
  // instead of a hardcoded heading.
  const groups = useMemo(() => {
    const map = new Map<string, KbArticle[]>();
    for (const a of filtered) {
      const list = map.get(a.category) ?? [];
      list.push(a);
      map.set(a.category, list);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const article = articles.find((a) => a.id === selectedId) ?? articles[0];
  const publishedCount = articles.filter((a) => a.status === 'published').length;

  const update = (patch: Partial<KbArticle>) => {
    if (article) kbStore.update(article.id, patch);
  };

  const open = (id: string) => { setSelectedId(id); setMobileEditor(true); setEditingTitle(false); };
  const newArticle = () => {
    const id = `new-${Date.now()}`;
    kbStore.add({
      id,
      title: 'Untitled article',
      category: 'Frequently Asked Questions',
      status: 'unpublished',
      subtitle: 'Add a subtitle',
      intro: 'Start writing your article here.',
      sections: [],
    });
    open(id);
    toast.success('New article created');
  };
  const republish = () => { update({ status: 'published' }); toast.success('Article published'); };
  const exec = (cmd: string, value?: string) => { if (typeof document !== 'undefined') document.execCommand(cmd, false, value); };

  const tools: { icon: typeof Bold; label: string; run: () => void }[][] = [
    [{ icon: Bold, label: 'Bold', run: () => exec('bold') }, { icon: Italic, label: 'Italic', run: () => exec('italic') }, { icon: Underline, label: 'Underline', run: () => exec('underline') }, { icon: Baseline, label: 'Text color', run: () => exec('foreColor', '#2563eb') }],
    [{ icon: Type, label: 'Large heading', run: () => exec('formatBlock', 'h2') }, { icon: Type, label: 'Medium heading', run: () => exec('formatBlock', 'h3') }, { icon: Type, label: 'Paragraph', run: () => exec('formatBlock', 'p') }],
    [{ icon: ListOrdered, label: 'Numbered list', run: () => exec('insertOrderedList') }, { icon: List, label: 'Bulleted list', run: () => exec('insertUnorderedList') }],
    [{ icon: Code, label: 'Code', run: () => exec('formatBlock', 'pre') }, { icon: Quote, label: 'Quote', run: () => exec('formatBlock', 'blockquote') }],
    [{ icon: Table, label: 'Table', run: () => toast('Table inserted') }, { icon: SeparatorHorizontal, label: 'Divider', run: () => exec('insertHorizontalRule') }],
    [{ icon: Link2, label: 'Link', run: () => { const url = window.prompt('Link URL'); if (url) exec('createLink', url); } }, { icon: ImageIcon, label: 'Image', run: () => toast('Image upload coming soon') }, { icon: Film, label: 'Video', run: () => toast('Video embed coming soon') }],
    [{ icon: Zap, label: 'Tip callout', run: () => exec('insertHTML', '<p><strong>Tip:</strong> </p>') }, { icon: Info, label: 'Info callout', run: () => exec('insertHTML', '<p><strong>Note:</strong> </p>') }, { icon: AlertCircle, label: 'Warning callout', run: () => exec('insertHTML', '<p><strong>Warning:</strong> </p>') }],
  ];

  const calloutColor = (label: string) => label === 'Tip callout' ? 'text-emerald-600' : label === 'Info callout' ? 'text-amber-500' : label === 'Warning callout' ? 'text-orange-600' : '';

  if (!article) {
    return <AdminChatShell collapsed={collapsed} onCollapsedChange={setCollapsed}>
      <div className="grid h-full place-items-center bg-muted/40 p-6">
        <div className="text-center">
          <p className="text-sm font-semibold">No articles yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Create your first article to start filling the Knowledge Base.</p>
          <Button className="mt-4" onClick={newArticle}><Plus />New Article</Button>
        </div>
      </div>
    </AdminChatShell>;
  }

  return <AdminChatShell collapsed={collapsed} onCollapsedChange={setCollapsed}>
    <div className="flex h-full min-h-0 gap-2 bg-muted/40 p-2">
      {/* Knowledge base sidebar */}
      <aside className="hidden w-14 shrink-0 flex-col rounded-xl border bg-background p-2 lg:w-56 lg:p-4 md:flex">
        <div className="hidden items-center justify-between lg:flex"><h2 className="text-sm font-bold">Knowledge Base</h2><PanelLeftClose className="size-4 text-muted-foreground" /></div>
        <button type="button" className="mt-5 flex h-10 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium shadow-xs lg:justify-start" title="User Docs"><BookOpen className="size-4" /><span className="hidden lg:inline">User Docs</span></button>
        <div className="mt-auto space-y-3">
          <button type="button" onClick={() => toast('Knowledge Base settings')} className="flex h-9 w-full items-center justify-center gap-2 rounded-md px-3 text-sm text-muted-foreground hover:bg-accent lg:justify-start"><Settings className="size-4" /><span className="hidden lg:inline">Settings</span></button>
          <Button asChild className="w-full" title="View published Knowledge Base"><Link href="/kb-demo"><Globe /><span className="hidden lg:inline">View Online</span></Link></Button>
        </div>
      </aside>

      {/* Article list */}
      <section className={cn('min-h-0 w-full shrink-0 flex-col rounded-xl border bg-background md:flex md:w-72 lg:w-80', mobileEditor ? 'hidden' : 'flex')}>
        <div className="flex items-center gap-2 border-b p-3">
          <Button variant="ghost" size="icon-sm" aria-label="Back"><ArrowLeft /></Button>
          <h2 className="flex-1 truncate text-sm font-bold">User Docs</h2>
          <div className="flex">
            <Button size="sm" onClick={newArticle} className="rounded-r-none"><Plus />New Article</Button>
            <details className="relative">
              <summary className="flex h-8 cursor-pointer list-none items-center rounded-r-md border-l border-primary-foreground/30 bg-primary px-2 text-primary-foreground [&::-webkit-details-marker]:hidden"><ChevronDown className="size-4" /></summary>
              <div className="absolute right-0 z-30 mt-1 w-44 rounded-md border bg-popover p-1 shadow-lg">
                <button type="button" onClick={newArticle} className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-accent"><FileText className="size-4" />New article</button>
                <button type="button" onClick={() => toast('New category added')} className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-accent"><Folder className="size-4" />New category</button>
              </div>
            </details>
          </div>
        </div>
        <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto p-3">
          {groups.map(([category, list]) => <div key={category}>
            <p className="flex items-center gap-2 px-1 py-2 text-sm font-semibold"><Folder className="size-4" />{category}</p>
            <ul className="ml-2 space-y-0.5 border-l pl-2">
              {list.map((a) => <li key={a.id}>
                <button type="button" onClick={() => open(a.id)} className={cn('flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-accent', a.id === article.id && 'bg-accent', a.status === 'unpublished' && 'text-muted-foreground')}>
                  <FileText className={cn('size-4 shrink-0', a.status === 'unpublished' ? 'text-muted-foreground' : 'text-brand')} />
                  <span className="min-w-0 flex-1 truncate">{a.title}</span>
                  {a.status !== 'published' && <span className="shrink-0 rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{a.status === 'hidden' ? 'Hidden' : 'Unpublished'}</span>}
                </button>
              </li>)}
            </ul>
          </div>)}
          {filtered.length === 0 && <p className="px-2 py-4 text-sm text-muted-foreground">No articles found.</p>}
        </div>
        <div className="space-y-2 border-t p-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground"><span className="flex items-center gap-1"><Info className="size-3.5" />{articles.length} articles, {publishedCount} published</span><span className="flex items-center gap-1 font-medium text-foreground">English (United States)<ChevronDown className="size-3.5" /></span></div>
          <div className="flex items-center gap-2">
            <label className="flex h-10 flex-1 items-center gap-2 rounded-md border px-3"><Search className="size-4 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search in your articles..." className="w-full bg-transparent text-sm outline-none" /></label>
            <Button variant="ghost" size="icon-sm" aria-label="Filter articles"><ListFilter /></Button>
          </div>
        </div>
      </section>

      {/* Editor */}
      <section className={cn('min-h-0 min-w-0 flex-1 flex-col rounded-xl border bg-background md:flex', mobileEditor ? 'flex' : 'hidden')}>
        <div className="flex items-center gap-2 border-b p-3">
          <Button variant="ghost" size="icon-sm" className="md:hidden" onClick={() => setMobileEditor(false)} aria-label="Back to articles"><ArrowLeft /></Button>
          <Button variant="outline" size="icon-sm" aria-label="Article settings"><Settings2 /></Button>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
            {editingTitle ? <input autoFocus value={article.title} onChange={(e) => update({ title: e.target.value })} onBlur={() => setEditingTitle(false)} onKeyDown={(e) => { if (e.key === 'Enter') setEditingTitle(false); }} className="w-full max-w-md rounded border px-2 py-1 text-center text-sm font-semibold" />
              : <><h1 className="truncate text-sm font-semibold sm:text-base">{article.title}</h1><button type="button" onClick={() => setEditingTitle(true)} aria-label="Edit title"><Pencil className="size-4 text-muted-foreground" /></button></>}
          </div>
          <Button size="sm" onClick={republish} className="bg-orange-500 text-primary-foreground hover:bg-orange-600"><CloudUpload /><span className="hidden sm:inline">Republish Now</span></Button>
          <details className="relative">
            <summary className="grid size-8 cursor-pointer list-none place-items-center rounded-md border [&::-webkit-details-marker]:hidden"><MoreVertical className="size-4" /></summary>
            <div className="absolute right-0 z-30 mt-1 w-48 rounded-md border bg-popover p-1 shadow-lg">
              {article.status === 'hidden'
                ? <button type="button" onClick={() => { update({ status: 'published' }); toast('Article unhidden and published'); }} className="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-accent">Unhide article</button>
                : <button type="button" onClick={() => { update({ status: 'hidden' }); toast('Article hidden'); }} className="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-accent">Hide article</button>}
              <button type="button" onClick={() => { update({ status: 'unpublished' }); toast('Article unpublished'); }} className="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-accent">Unpublish</button>
              <button type="button" onClick={() => { const rest = articles.filter((a) => a.id !== article.id); kbStore.remove(article.id); if (rest[0]) setSelectedId(rest[0].id); setMobileEditor(false); toast('Article deleted'); }} className="w-full rounded px-2 py-1.5 text-left text-sm text-destructive hover:bg-accent">Delete article</button>
            </div>
          </details>
          <Button variant="outline" size="icon-sm" onClick={() => setMobileEditor(false)} aria-label="Close"><X /></Button>
        </div>
        <div className="border-b px-3 py-2">
          <div className="scrollbar-hidden flex items-center gap-1 overflow-x-auto">
            {tools.map((group, gi) => <div key={gi} className="flex shrink-0 items-center rounded-md border">
              {group.map((t, ti) => <button key={t.label} type="button" title={t.label} aria-label={t.label} onMouseDown={(e) => e.preventDefault()} onClick={t.run} className="grid size-8 place-items-center hover:bg-accent">
                <t.icon className={cn(gi === 1 ? ['size-4.5', 'size-4', 'size-3'][ti] : 'size-4', calloutColor(t.label))} />
              </button>)}
            </div>)}
          </div>
        </div>
        <div className="relative min-h-0 flex-1 overflow-y-auto">
          {article.status !== 'published' && <div className="m-3 rounded-md bg-slate-500 px-4 py-3 text-center text-sm font-medium text-primary-foreground">This content is unpublished. It is hidden from your Knowledge Base, until you republish it.</div>}
          <article key={article.id} contentEditable suppressContentEditableWarning className="mx-auto max-w-3xl px-5 pb-28 pt-6 outline-none sm:px-10 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:font-bold [&_p]:mt-4 [&_p]:leading-relaxed">
            <h2 className="!mt-2">Introduction</h2>
            <h3>{article.subtitle}</h3>
            <p>{article.intro}</p>
            {article.sections.length > 0 && <>
              <h2>Table of Contents</h2>
              <ul className="mt-4 list-disc space-y-1 pl-6 marker:text-muted-foreground">
                {article.sections.map((s) => <li key={s.heading}><a href={`#${slug(s.heading)}`} className="font-medium underline underline-offset-2">{s.heading}</a></li>)}
              </ul>
              {article.sections.map((s) => <div key={s.heading}><h2 id={slug(s.heading)}>{s.heading}</h2><p>{s.body}</p></div>)}
            </>}
          </article>
          <div className="pointer-events-none sticky bottom-4 flex justify-center gap-2">
            <button type="button" className="pointer-events-auto rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-sm">🇺🇸 English (US)</button>
            <button type="button" onClick={() => toast('Author picker coming soon')} className="pointer-events-auto flex items-center gap-1 rounded-full border bg-background px-4 py-2 text-sm shadow-sm">Define an author<ChevronRight className="size-4" /></button>
          </div>
        </div>
      </section>
    </div>
  </AdminChatShell>;
}
