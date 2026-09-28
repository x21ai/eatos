# eatOS Chat Dashboard Front-End

## Goal
Create an admin-only chat workspace inspired by the three reference screenshots. This release is a complete interactive front-end prototype using realistic sample conversations. It will not connect to Crisp, save messages, or add database tables.

## Pages and navigation
- Make `/admin` open the chat dashboard instead of ending on a missing page.
- Add `/admin/inbox` as the primary workspace and `/admin/settings` as the settings workspace.
- Use the existing admin sign-in and owner allow-list protection for both pages.
- Give admin pages a dedicated full-height workspace without the public website header, footer, cookie banner, or public chat launcher.
- Build a collapsible main sidebar with Inbox, AI Agent, Visitors, Contacts, Knowledge Base, Campaigns, Analytics, Search, Plugins, and Settings.
- Inbox expands to show Main Inbox, Assigned to me, New sub-inbox, Automated, and Spam.
- Settings opens a second sidebar with Account, Billing, Workspace, Chatbox, Inbox, Email, and Status Page sections.

## Inbox workspace
- Match the reference desktop structure with four working areas:
  1. Main app navigation
  2. Inbox navigation and conversation list
  3. Selected conversation and reply composer
  4. Visitor details and conversation routing
- Add realistic sample visitors, unread counts, avatars, timestamps, countries, latest-message previews, assigned agents, resolved states, and spam/automated examples.
- Make conversation selection update the transcript and visitor panel.
- Add working front-end controls for search, filtering, assignment, resolve/reopen, internal notes, and sending a temporary reply.
- Keep replies and state changes in React memory only. Refreshing the page restores the sample state, as requested by the no-persistence choice.
- Include clear empty states when filters or inboxes contain no conversations.

## Settings workspace
- Recreate the screenshot's two-sidebar settings structure and content area.
- Build front-end settings panels for availability, workspace, chatbox, inbox routing, email, and status page options.
- Use interactive toggles, selects, accordions, schedules, and preview panels, but do not save changes after refresh.

## Responsive behavior
- Desktop: show all four inbox areas at once.
- Tablet: keep main navigation compact and allow the visitor panel to slide in.
- Mobile: use a drill-in flow from inboxes to conversations to chat details, with persistent back controls and no overlapping panels.
- Keep sidebars independently scrollable with hidden visual scrollbars, while preserving keyboard and touch scrolling.

## Visual direction
- Follow the reference's clean white support-console layout, adapted to eatOS branding and brand pink accents.
- Use compact typography, restrained borders, status colors, familiar icons, and fixed panel dimensions for a dense professional workspace.
- Use the uploaded screenshots only as visual references, not as embedded images.

## Technical details
- Create focused client components for the app shell, inbox tree, conversation list, transcript, composer, visitor profile, and settings panels.
- Keep mock conversations and visitors in a typed local data module so a later D1 integration can replace it without redesigning the interface.
- Reuse the project's existing button, input, avatar, scroll-area, tabs, tooltip, dropdown, and sheet components where suitable.
- Preserve the existing Better Auth admin guard. No new authentication, API routes, migrations, or chat provider integration in this release.
- Add noindex metadata for the admin chat pages.

## Verification
- Confirm `/admin`, `/admin/inbox`, and `/admin/settings` open for an authorized admin and remain protected otherwise.
- Test selecting visitors, switching inboxes, filtering, resolving/reopening, adding a note, sending a temporary reply, opening visitor details, and changing temporary settings.
- Check the complete interface at phone, tablet, and desktop widths for readable content, working navigation, independent scrolling, and no overlap.
- Confirm the project build completes without errors.
