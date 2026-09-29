'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * Shared header for the /kb-demo preview. It is a published help center page, so
 * it carries no chat workspace chrome, only a way back to the editor.
 */
export default function KbDemoHeader() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-3 px-5 py-4">
        <Link href="/kb-demo" className="text-lg font-extrabold tracking-tight">
          eat<span className="text-brand">OS</span>
        </Link>
        <span className="text-sm text-muted-foreground">Knowledge Base</span>
        <Link
          href="/chatapp/knowledge-base"
          className="ml-auto inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent"
        >
          <ArrowLeft className="size-4" />
          Back to editor
        </Link>
      </div>
    </header>
  );
}
