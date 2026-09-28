# Chat transcript header rework

## What changes

The selected conversation's top bar (inside /chatapp) is rebuilt:

1. Action buttons move to the left: Phone, Video, Block, and the "..." more-options menu sit at the start of the header, right after the mobile back arrow.
2. The visitor avatar, name, and location are removed from the header. That information already lives in the visitor details sidebar, so it no longer repeats here.
3. The visitor details sidebar is always open (expanded) on the right side on desktop. The expand/collapse toggle button is removed; the panel no longer collapses on its own.

## Layout after the change

```text
| back (phone only) | Phone  Video  Block  ... | ....... | Unresolved/Resolved | Visitor details |
|                   +-- action buttons, LEFT --+         +-- stays right --+   +-- always open --+
```

## Small screens

- Phone and tablet: the details panel cannot fit next to the chat, so it stays available as a slide-over panel opened from the details button in the header (kept only below desktop width). On desktop it is permanently visible with no toggle.

## Files touched

- `apps/web/src/components/admin/chat/AdminInbox.tsx`: rework the Transcript header row, remove the avatar/name/location block, remove the always-visible toggle on desktop, keep the slide-over trigger below desktop width, and keep the details panel rendered permanently at desktop width.

No data, mock content, or other pages change. Verified at phone (390), tablet (834), and desktop (1280+) widths.
