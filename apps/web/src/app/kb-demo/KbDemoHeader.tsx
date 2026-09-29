'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * Demo toolbar for the /kb-demo preview. The published site already supplies its
 * own header and footer, so this bar only names the section and offers a way
 * back to the editor, with no second logo competing with the site branding.
 */
export default function KbDemoHeader() {
  return (
    <div className="border-b bg-muted/40">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-3 gap-y-2 px-5 py-3">
        <span className="text-sm font-semibold tracking-tight">Knowledge Base</span>
        <span className="text-xs text-muted-foreground">Demo preview of your published articles</span>
        <Link
          href="/chatapp/knowledge-base"
          className="ms-auto inline-flex items-center gap-2 rounded-md border bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent"
        >
          <ArrowLeft className="size-4" />
          Back to editor
        </Link>
      </div>
    </div>
  );
}
