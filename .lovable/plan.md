# Match the Chat App to the Admin Theme

## Goal
Apply the existing `/admin` panel's dark visual style across the entire `/chatapp` workspace while preserving all current pages, demo data, interactions, and responsive layouts.

## Theme foundation
- Add a Chat App scoped dark theme that matches the admin palette: near-black page background, slightly raised dark panels, white primary text, muted gray secondary text, subtle white borders, and restrained dark hover states.
- Map those colors through the existing semantic design tokens so shared buttons, inputs, menus, dialogs, cards, and focus states inherit the theme consistently.
- Keep the theme scoped to `/chatapp`, so the public website and the live Knowledge Base demo remain unchanged.
- Use the admin panel's existing accent treatment for calls to action and selected states, rather than introducing a new Chat App palette.

## Workspace-wide updates
- Restyle the main navigation, mobile header, inbox navigation, conversation list, transcript, composer, and visitor details panel.
- Apply the same treatment to Visitors, Contacts, contact previews and profiles, Knowledge Base editor, and Settings.
- Update overlays, native popovers, dropdowns, forms, tables, status badges, empty states, and slide-over panels so none retain the previous light appearance.
- Preserve clear separation between adjacent panels using the admin panel's subtle border and surface hierarchy.
- Keep current typography, content density, icon placement, and all working controls unchanged unless a small contrast adjustment is required.

## Responsive behavior
- Desktop: retain the current multi-column workspace and persistent side panels.
- Tablet: retain compact navigation and existing slide-over behavior with the new dark surfaces.
- Mobile: retain the current drill-in views, back controls, menus, and full-height panels with readable contrast and no overlap.

## Technical details
- Define route-scoped semantic color overrides in the global design system, using the admin palette as the source of truth.
- Apply the scope at the shared Chat App shell so every Chat App page inherits it without duplicating theme classes.
- Replace the few remaining Chat App-specific hardcoded light/dark colors with semantic tokens where necessary.
- Do not change authentication, demo data, persistence, navigation destinations, or the public `/kb-demo` experience.

## Verification
- Check Inbox, Visitors, Contacts, contact profile, Knowledge Base, and Settings at phone, tablet, 1203px preview, and wide desktop sizes.
- Exercise conversation switching, menus, dialogs, filters, side panels, editor controls, and form fields to confirm dark styling in open and active states.
- Confirm readable contrast, visible focus states, no light-theme remnants, no clipping or overlap, and a healthy project build.
