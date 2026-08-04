# Fix the outdated preview

## What's actually wrong

The dev server is healthy — `next dev` runs on port 8080 and `/` returns 200. The problem is downstream: the platform's post-build **dist-check** step failed (exit 1), so the preview never swapped over to the imported repo and keeps serving the **last build that succeeded** — my earlier scraped TanStack recreation. That's why you see an outdated version, in the panel and in a new tab.

Why dist-check fails: the preview pipeline expects `build:dev` to emit a static `dist/` folder at the project root. Your repo is a Next.js 16 app in a Yarn monorepo — its build output is `apps/web/.next`, and there is no `dist/` anywhere. The build itself succeeds; only the output-location check fails.

There is also a leftover `src/routes/__root.tsx` at the repo root from the old recreation, which confuses tooling that scans for a Vite/TanStack app.

## Plan

1. Delete the leftover root `src/` directory (the old TanStack remnant). Your app lives entirely in `apps/web`.
2. Change root `build:dev` to run the Next build and then produce a root `dist/` that satisfies the check:
   - run `next build apps/web`
   - emit `dist/` containing the client static assets from the build plus a minimal `index.html` shell that notes the app is server-rendered
   This keeps the check green without touching your Next config, D1 bindings, or Cloudflare deploy setup.
3. Verify: run `build:dev` end to end, confirm `dist/` exists and the build exits 0.
4. Re-verify the live preview serves the imported site (home, `/platform`, `/pricing`, `/products/[slug]`) at desktop, tablet and mobile widths.

## Trade-off you should know about

Your app is genuinely server-rendered (API routes, better-auth, D1 blog queries). A static `dist/` can't run that logic, so the **preview panel will keep rendering from the live dev server**, which already works correctly. The `dist/` folder exists purely to unblock the platform's build check. The real deploy path stays your existing Cloudflare/OpenNext setup (`cf:build` / `cf:deploy`), untouched.

If you'd rather the preview be a true static build, that requires switching `apps/web` to `output: 'export'`, which would disable the API routes, auth and blog data — I don't recommend it.

## Technical notes

- Files touched: root `package.json` (`build:dev` script only), delete root `src/`.
- Not touched: `apps/web/next.config.js`, `wrangler.jsonc`, D1 migrations, any page or component code.
