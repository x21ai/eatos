# Permanently fix live page downloads and missing comparison links

## Confirmed live cause

- `https://eatos.lovable.app/home-1` returns `200 application/octet-stream` with `nosniff`, so the browser downloads it instead of rendering it.
- `https://eatos.lovable.app/home-1.html` returns valid `text/html` and renders normally.
- `https://eatos.lovable.app/comparison` serves an older page containing no competitor links.
- `https://eatos.lovable.app/comparison.html` serves the current page and contains all 14 competitor links.
- Individual clean competitor URLs such as `/comparison/square` also return `application/octet-stream`, while `/comparison/square.html` returns valid HTML.
- Trailing-slash URLs return 404, so they are not a viable fallback on this host.

The live host is prioritizing stale extensionless static files over the current pages. Its content-type behavior cannot safely render those files. The reliable URL format on this host is the explicit `.html` page URL.

## Fix

1. **Make `.html` URLs canonical in the app source**
   - Update internal page navigation in the shared header, footer, home pages, comparison table, competitor pages, and other route links to use the host-safe `.html` form.
   - Keep `/` unchanged.
   - Leave external URLs, asset URLs, hashes, mail links, and API paths untouched.
   - This removes dependence on fragile post-build string replacement and ensures client-side navigation and copied links use the same working URL.

2. **Harden the publish artifact generator**
   - Continue emitting every prerendered route as `<route>.html`.
   - Do not emit extensionless files or rely on `_headers` and `_redirects`, because the live host is demonstrably ignoring those hints for exact-path objects.
   - Add a build-time validation that fails publishing if an extensionless page artifact remains or if generated HTML still links to a clean internal page URL.
   - Ensure nested routes such as `/comparison/square.html` are validated too.

3. **Prevent stale and conflicting route output**
   - Verify the generated `dist` contains the current comparison page and all seven competitor pages only in render-safe HTML forms.
   - Confirm the deployment artifact is rebuilt from a clean `dist` so old extensionless files are not carried forward.

4. **Verify before calling it fixed**
   - Locally inspect every generated page for unresolved clean internal links.
   - Test navigation at desktop, tablet, and mobile widths.
   - Publish the corrected artifact.
   - Curl every live route and require `200` plus `content-type: text/html` for all canonical `.html` URLs.
   - Open `/home-1.html`, `/comparison.html`, and every competitor page in a browser, confirm pages render rather than download, and confirm every comparison link opens the correct individual page.

## User-facing URL outcome

Use these live URLs:

- `https://eatos.lovable.app/home-1.html`
- `https://eatos.lovable.app/comparison.html`
- `https://eatos.lovable.app/comparison/square.html`, and the equivalent `.html` URL for each competitor

All site navigation will point to these render-safe URLs consistently.