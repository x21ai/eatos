# Knowledge Base: trim to 5 demo articles and make publishing visible

## Summary

The Knowledge Base currently ships 20 placeholder articles and a fake "648 articles" counter, and "View Online" goes to the real help center, so nothing you do in the editor has a visible result. This plan shrinks it to 5 believable demo articles and adds a live preview page that shows exactly what is published, so you can walk the real flow: write, publish, see it live, hide it, watch it disappear.

Everything stays session-only demo data. A page reload resets it to the 5 seeded articles. The real /support help center is not touched.

## What changes

### 1. Five demo articles replace the twenty

`kb-data.ts` is rewritten with 5 hand-written articles, each with its own subtitle, intro and 3 to 4 sections of real-sounding setup steps (no repeated boilerplate). The generic `make()` / `sections()` generators and the fake `kbTotalArticles = 648` export are removed.

| Article | Status | Why it is in the demo |
| --- | --- | --- |
| Setting Up the Kitchen Display System | Published | The default article you land on, full length with a table of contents |
| Selling and Redeeming Gift Cards | Published | Shows a second published article in the live list |
| Account & Password Update | Published | Short article, shows list density |
| Can My Customers Leave Tips? | Unpublished | Shows the "This content is unpublished" banner and the Republish Now button |
| Card Reader Not Connecting | Hidden | Shows the Hidden badge and the Hide/Unhide flow |

That is 3 published, 1 unpublished, 1 hidden, so all three states are reachable in one click. All 5 stay under "Frequently Asked Questions" so the list grouping matches your screenshot.

### 2. One shared demo store, so the editor and the live page agree

A small store module (`kb-store.ts`) holds the article list and exposes read, update, add and remove calls. Both the editor and the new preview page read from it, so a publish in the editor is instantly reflected on the live page without a database.

```text
Editor  /chatapp/knowledge-base
   |  publish / hide / unpublish / new article / edit
   v
kb-store.ts   (single in-memory list, seeded from kb-data.ts)
   ^
   |  reads only published articles
   v
Preview /kb-demo   (looks like a published help center)
```

Because the store lives in the page's own memory, a reload restores the original 5 articles. Nothing is written to a database or a file.

### 3. New live preview page at /kb-demo

A clean, public help-center style page with no chat workspace chrome and no sign-in:

- Header with the eatOS mark, a search box, and a "Back to editor" link.
- A list of the published articles only, each showing title, subtitle and read time.
- Clicking one opens the full article: title, subtitle, intro, table of contents, then each section heading and body, plus "Related articles".
- Hidden and unpublished articles never appear, and going straight to one by URL shows a "This article is not available" state instead of the content.
- A small note at the top: demo preview, resets on reload.
- Marked noindex so it never competes with the real /support pages in search.

Layout is single column with a centered reading width, so it works at phone, tablet and desktop sizes.

### 4. Editor wiring and honest counts

- The left rail "View Online" button now opens /kb-demo in the same tab (it opened the real /support in a new tab), which is what lets your latest publish show up there.
- The bottom counter shows the real number, for example "5 articles, 3 published", instead of 648.
- The article list groups from the data itself rather than a hardcoded label, so new articles land in their category.
- Publishing, hiding, unpublishing and deleting already work; each gets a confirmation message and updates both the list badge and the preview page.

## Files

- `apps/web/src/components/admin/chat/kb-data.ts`: 5 seeded articles, types kept, generators and fake total removed
- `apps/web/src/components/admin/chat/kb-store.ts`: new shared in-memory store
- `apps/web/src/components/admin/chat/AdminKnowledgeBase.tsx`: reads/writes through the store, real counts, "View Online" points at /kb-demo
- `apps/web/src/app/kb-demo/page.tsx`: new preview list page
- `apps/web/src/app/kb-demo/[articleId]/page.tsx`: new single article page

No changes to /support, /chatapp shell, or any other page.

## Verification

- Build and type check pass.
- In the preview at desktop, tablet and phone widths: open the Knowledge Base, confirm 5 articles and the real count, switch to the unpublished one and see the banner, click Republish Now, then open /kb-demo and confirm that article now appears and its full content renders.
- Hide an article in the editor, return to /kb-demo, confirm it is gone and its direct link shows the not-available state.
- Create a new article, type a title, publish, confirm it appears in the live list.
- Reload the page and confirm the list is back to the 5 seeded articles.

## Not included

- No database, no persistence across reloads, no real article images or videos in the editor toolbar.
- The live preview does not add categories or a language switcher; it mirrors the single category the demo uses.
- The real /support help center keeps its 320 migrated articles exactly as they are.
