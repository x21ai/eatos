# Plan: Stat typography fix + custom System Status page

## 1. "Over $2 Billion+" typography
In `apps/web/src/app/page.tsx` (and the `home-1` variant), split the stat value so "Over" renders in a small font using the same gray color as the "Processed" label, with "$2 Billion+" staying large and white.

- Add an optional `prefix` field to the stat object: `{ prefix: 'Over', value: '$2 Billion+', label: 'Processed' }`
- Render `prefix` in a small span styled like the label (`text-gray-500`), value unchanged
- No layout shift for the other stats (99.9% Uptime, 24/7 Live support)

## 2. Custom System Status page (`/system-status`)
Replace the external `https://status.eatos.com/en/` link with our own branded page. No database, no external service.

**Data source ("backend"):** a plain config file `apps/web/src/app/system-status/systems.ts` where each system is an entry you can edit:
```ts
{ name: 'Point of Sale API', url: 'https://api.eatos.com', status: 'operational', uptime: '99.99%' }
```
Statuses: `operational` (green), `degraded` (amber), `outage` (red), `maintenance` (blue). Adding a system = adding one line to this file.

**Page design:** dark eatOS branding matching the site (Montserrat, black background, shared container, header/footer):
- Hero: overall status banner derived from the data (e.g. "All Systems Operational" in green, or worst current status)
- Systems list: rows/cards per system with colored status dot, name, URL, uptime
- Legend explaining status colors
- Last-updated timestamp from the config file
- SEO head metadata (title, description, og tags)
- Registered in sitemap.ts

**Header updates (`Header.tsx`):**
- Desktop status icon (line ~577) links to `/system-status` instead of the external URL
- Mobile menu status link (line ~975) same change
- Keep the live color dot driven by the config: import the systems list and compute the worst status color, replacing the external fetch to status.eatos.com

**Footer:** point any System Status link (if present) to `/system-status` as well.

## 3. Verify
- Screenshot the new stat typography and the status page on desktop and mobile
- Confirm header icon navigates to `/system-status`
