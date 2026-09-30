# Workspace settings subpages

## Goal
Make Workspace in the Settings sidebar collapsible, like Account, with six sublinks, and build each page to match the supplied screenshots using the existing dark Chat App theme.

## Sidebar
- Workspace expands to show, in order: Information, Setup & Integrations, Operators & Teams, Team Transparency Log, Advanced Configuration, Danger Zone.
- It stays open while one of its pages is active. The selected page is kept in the web address, so refresh and back/forward keep the right page.
- Tablet and phone get a row of subpage tabs, the same as Account has now.

## Pages (demo data only, US details)
- **Information:** General information card (icon upload, Upload image and delete, Domain and Name fields, Add additional domains link). Contact information card (Email, Phone with US flag, Messenger, Telegram, X, WhatsApp, Instagram).
- **Setup & Integrations:** General Options (Website ID with Copy, Chatbox setup instructions button). Integrations grid: HTML, WordPress, Shopify, Prestashop, WooCommerce, WHMCS, Adobe Commerce, Notion, iFrame.
- **Operators & Teams:** "Support is Online" notice, General Options with two switches, Teams card (Add Team, empty state), Operators list (sort by Name, Empty Last Active, rows with email, Owner/Member badge, info icon).
- **Team Transparency Log:** collect-logs switch, filter bar (date range, All operators, All actions), log table (Action with write/delete badge, Operator, Time Ago, IP Address using US IPs).
- **Advanced Configuration:** Workspace Defaults language selector, REST API + MCP Server Tokens (Create Token, empty state, View API reference), Web Hooks (0 hooks, Add a Web Hook, empty state), Identity Verification (enabled badge, switch, secret key with copy, Roll secret).
- **Danger Zone:** Leave workspace and Delete workspace cards (demo only, nothing is deleted).
- Each page has the title, help icon, description, and "Automatically Saved" chip where shown. "Crisp" wording becomes "eatOS".

## Validation
- Check every page and the sidebar at desktop, tablet, and phone widths with no sideways overflow, and confirm a clean build.

## Technical details
- New `AdminWorkspaceSettings.tsx` with a `WorkspaceSection` type and six panels, reusing `PageHeading`, `Card`, `ToggleRow` from `AdminAccountSettings`.
- `AdminSettings.tsx`: Workspace becomes a `<details>` group like Account; links use `?category=workspace&section=...`; replaces the old WorkspacePanel.
- `settings/page.tsx`: validate `section` per category (workspace default `information`).
- Native links/details only, per the non-hydrating preview.
