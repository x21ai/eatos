# Fix Cookie Settings on a first visit

## What I verified

Two checks were requested. One passes already, one has a real bug.

### Blog brand token audit: passes, no work needed

Every blog layout component now draws its accent from the single brand token. A scan of
the blog index, the article template, the blog content file, the newsletter section, the
image placeholder, and the cookie banner found no `green`, `emerald`, `teal`, `lime`, or
raw hex accent values at all.

Blog accents resolve to exactly three token-backed classes:

| Element | Class | Token |
| --- | --- | --- |
| Category labels, NEWSROOM eyebrow, links, dates | `text-brand-on-dark` (9 uses) | `--brand-on-dark` |
| List bullets | `bg-brand` | `--brand` |
| Divider and active filter state | `border-brand` | `--brand` |

All four tokens are declared once in `app/global.css` and mapped to Tailwind colors, so
changing `--brand` still propagates everywhere. No edits required.

### Cookie Settings: works with saved consent, broken on a first visit

Behavior confirmed in the browser across four cases:

| Case | Result |
| --- | --- |
| Fresh visit, no consent, click footer Cookie Settings | FAILS, click never lands, nothing opens |
| Consent bar "Manage Preferences" | Opens preferences dialog correctly |
| Save Preferences, then reload | Consent and per-category choices both persist |
| Consent saved, click footer Cookie Settings | Opens preferences dialog, never the consent bar |

The good news: the original complaint is fixed. Cookie Settings dispatches
`openCookiePreferences` and no longer clears stored consent, so it opens the preferences
dialog and saved state survives a reload.

The remaining bug: on a first visit the consent bar is a full-width fixed element pinned
to the bottom of the viewport. The footer Cookie Settings link sits underneath it, so the
bar intercepts the click and the preferences dialog never opens. A brand-new visitor
literally cannot reach Cookie Settings from the footer.

## The fix

Make the consent bar stop blocking the page behind it, so the footer link is reachable
whether or not consent has been saved.

1. In the cookie banner, let clicks pass through the bar's outer positioning wrapper and
   re-enable them only on the actual bar panel. The wrapper spans the full width but is
   mostly empty space over the footer; only the visible panel should capture clicks.
2. Reserve space at the bottom of the page while the consent bar is visible, so the bar
   never overlaps the final footer row instead of merely letting clicks slip past it.
3. Keep the bar above normal content but below the preferences dialog, so opening
   preferences from the bar still layers correctly.

No changes to consent storage, the event names, the saved preference shape, or any
styling of the dialog itself.

## Verification

- First visit with cleared storage: click footer Cookie Settings, confirm the preferences
  dialog opens and the consent bar is not in the way.
- Confirm the consent bar's own Accept All, Manage Preferences, and dismiss buttons still
  work and are still clickable.
- Confirm saved consent and per-category preferences still persist across a reload.
- Check the footer's last row is not covered by the bar at mobile, tablet, and desktop
  widths.
- Run the copy guard and confirm key routes still return 200.

## Technical notes

- Files touched: `apps/web/src/components/CookieBanner.tsx`, plus a small bottom-padding
  hook where the bar is rendered if step 2 needs it.
- Root cause is pointer-event interception by a fixed full-width overlay, not the event
  wiring, which the tests show is already correct.
