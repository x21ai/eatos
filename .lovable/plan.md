# Knowledge Base page in the chat workspace

Build `/chatapp/knowledge-base` matching the reference, and link "Knowledge Base" in the main sidebar.

## Layout (desktop, left to right)
1. **Main sidebar** (existing shell), Knowledge Base highlighted.
2. **Second sidebar**: "Knowledge Base" title with collapse icon, "User Docs" knowledge base button, Settings link at the bottom, dark "View Online" button.
3. **Article list column**: back arrow + "User Docs", blue "New Article" split button (dropdown: New article, New category). Category folder "Frequently Asked Questions" with scrollable article rows (doc icon, truncated title, "Hidden" / "Unpublished" badge; unpublished rows dimmed). Footer: article count, language picker "English (United States)", search box "Search in your articles..." with filter icon.
4. **Editor area**: settings icon, editable centered title with pencil, orange "Republish Now" button, three-dot menu, close X. Formatting toolbar (bold, italic, underline, color, heading sizes, lists, code, quote, table, divider, embed, link, image, GIF, video, callouts). Gray banner "This content is unpublished..." when the article isn't published. Rich article body (Introduction, Table of Contents with anchor links, sections). Floating bottom pills: "English (US)" and "Define an author".

## Behavior (demo data, session only)
- Selecting an article loads it in the editor; search filters the list.
- The body is editable; Republish Now marks it published and hides the banner.
- New Article adds an "Untitled article" and opens it.
- Toolbar buttons apply basic formatting to the editable body.

## Responsive
- Tablet: second sidebar collapses to icons; list + editor side by side.
- Phone: list view first; tapping an article opens the editor full-screen with a back button.

## Technical details
- New typed local module `kb-data.ts` (about 20 US-English eatOS support articles, status published/hidden/unpublished).
- New `AdminKnowledgeBase.tsx` rendered inside `AdminChatShell`; route `apps/web/src/app/chatapp/knowledge-base/page.tsx` (noindex, public like other /chatapp pages).
- Add `href` to the Knowledge Base nav item. Native popovers for menus, matching the other chat pages.
