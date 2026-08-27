# Footer boxes, favicon, then the shop re-theme

## 1. Footer: why it still looks wrong in your preview

The footer code already has the change you asked for: the four contact icons (WhatsApp, SMS, Messenger, chat) render inside the Sales card under the phone number, and both the Support and Sales cards are set to equal height in a stretched two-column row.

What your screenshots show is the older render. The preview is currently throwing a runtime error, `BookDemoTracker is not defined`, which comes from the tracking component added in the last task. While that error is live the page can fail to re-render the newest footer.

Steps:
- Fix the `BookDemoTracker` runtime error so the current build renders (it is a client component pulled into the root layout; the fix is to make that import/usage safe, no behavior change to tracking).
- Re-verify the footer in a real browser at 390px, 768px, and 1280px: both cards identical height, the icon row sitting inside the Sales card under the phone line, every icon independently clickable.
- If the render then still shows icons outside the box, treat it as a second footer instance and locate it, but the current single Footer component is the only one in the app.

## 2. Favicon

The site currently serves a 64x64 `favicon.png` (a small, low-detail version of the "e" mark). www.eatos.com serves a 192x192 pink circular "e" badge.

Steps:
- Replace `apps/web/public/favicon.png` with the 192x192 mark used on www.eatos.com, and add a 32x32 variant plus an `apple-touch-icon` sized copy so it stays crisp in tabs and on mobile bookmarks.
- Keep the reference in the root layout metadata `icons` block pointing at the new files.
- Note: browsers cache favicons aggressively, so a hard reload may be needed to see the change.

## 3. Shop re-theme (next task, after the two items above)

Confirmed as the following task: re-theme the shop.eatos.com pages into the site's black Montserrat look and feel, visual only, no checkout or commerce backend work in this pass.

## Technical notes

- `apps/web/src/components/BookDemoTracker.tsx` / `apps/web/src/app/layout.tsx`: resolve the undefined reference; keep `dataLayer` events (`book_demo_click`, `book_demo_view`, `book_demo_submit`) intact.
- `apps/web/src/components/Footer.tsx`: no structural change expected, verification only.
- `apps/web/public/favicon.png` (and `public/favicon.png` mirror used by the static build): swap in the higher resolution brand mark; favicons stay real files, not CDN pointers.
