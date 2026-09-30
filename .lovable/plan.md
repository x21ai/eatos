# Knowledge Base settings workspace

## Goal
Turn the Settings button inside the Knowledge Base sidebar into a complete settings workspace matching the supplied references, while retaining the Chat App's admin dark theme and existing full-height navigation.

## Layout and navigation
- Replace the current Settings toast with navigation into the Knowledge Base settings workspace.
- Keep the main Chat App sidebar, then show the Knowledge Base sidebar, the settings-section sidebar, and the selected settings content in the same hierarchy as the references.
- Add active states, back navigation, breadcrumbs, page icons, headings, and section descriptions.
- Add these selectable sections in the supplied order: Domain Setup, Localization, Customization, Features, Authentication, Page Redirections, Data Import & Export, and Advanced Settings.
- On smaller screens, progressively show one panel at a time with clear back controls, rather than compressing all sidebars together.

## Settings screens
- **Domain Setup:** base domain and custom domain fields, connection status, DNS instruction table, copy controls, verification state, and View Online action.
- **Localization:** main-language selector, language table, article count, View Online action, add-language dialog, and remove-language confirmation.
- **Customization:** Knowledge Base name, favicon/header/footer logo upload areas, banner preview/upload area, and remove actions.
- **Features:** the General, Homepage, and Content groups with working toggle controls matching the reference states.
- **Authentication:** authentication enable switch and a clear demo configuration state when enabled, without claiming that real access protection is active.
- **Page Redirections:** empty state plus an Add Page Redirect dialog with source URL, destination URL, save, and cancel behavior; saved demo redirects appear in the list and can be removed.
- **Data Import & Export:** separate import and export panels; import opens a demo file-selection flow and export provides clear completion feedback.
- **Advanced Settings:** custom HTML editor dialog and maintenance section with warning copy, re-synchronization action, confirmation, and completion feedback.

## Interaction and state
- Make all visible buttons, switches, selects, copy controls, dialogs, close/cancel actions, uploads, and destructive confirmations respond.
- Keep configuration changes as session-only demo state, consistent with the existing prototype. No real DNS changes, authentication enforcement, imports, exports, or maintenance jobs will be performed.
- Preserve the existing Knowledge Base article editor and View Online behavior when leaving settings.

## Visual and responsive treatment
- Reproduce the spacing, information hierarchy, panel widths, tables, cards, and control placement from the references using the existing semantic dark admin palette.
- Use existing Chat App controls and tokens so menus and dialogs remain themed consistently.
- Verify every section on desktop, tablet, and phone, including scrolling, dialogs, back navigation, and no horizontal overflow.

## Technical details
- Add dedicated Knowledge Base settings navigation under `/chatapp/knowledge-base/settings`, with the selected section represented in the URL so refresh and direct links preserve the view.
- Build focused settings components and shared section primitives instead of expanding the article editor into one oversized component.
- Add page-specific title, description, and no-index metadata for the settings workspace.
- Validate the central flow in-browser: open Knowledge Base Settings, switch through all eight sections, exercise representative forms/dialogs/toggles, return to articles, and confirm the current preview build remains healthy.
