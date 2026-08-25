# Mobile Menu: Expand the Group for the Current Page

## Problem
The mobile menu always opens with the "Operations" group expanded, regardless of which page the user is on. Example: on `/products/loyalty` the "Growth & Payments" group should be expanded instead.

## Change
In `apps/web/src/components/Header.tsx`:

1. Add a helper that maps the current pathname to its menu group:
   - Operations: `/point-of-sale`, `/products/kitchen-display-system`, `/products/simplified-inventory-management`, `/products/workforce-management`
   - Guest Experience: `/products/self-service-kiosk`, `/products/tableside-order-and-pay`, `/products/apponlineorderingdelivery`
   - Growth & Payments: `/accept-payments`, `/products/loyalty`, `/products/automated-marketing`
   - Intelligence & Hardware: `/ai`, `/hardware`
   - Falls back to `Operations` when no match (e.g. home page).
2. When the mobile menu opens, set `openGroup` from the current pathname instead of always `"Operations"` (move the reset logic: on close, clear state; on open, compute from path).
3. If the current path starts with `/solutions`, also switch the top tab to the Solutions tab on open so the matching list is visible.
4. Optional highlight: mark the current page's link inside the expanded group with a subtle active style (slightly bolder text) so users see where they are.

## Technical notes
- Pathname is read the same way the existing `checkTheme` effect does (`window.location.pathname`), so no router dependency is added.
- The reset effect on `mobileMenuOpen` is updated: when closed, reset tab to "products" and group to null; when opened, compute tab/group from the path.
- No changes to the desktop mega menu.
- Verified afterwards at a mobile viewport on a product page (e.g. `/products/loyalty`) confirming Growth & Payments is expanded on open.
