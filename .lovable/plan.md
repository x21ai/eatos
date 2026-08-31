# Get the new support page (and the routing fix) actually live

## Confirmed current live state

Checked `https://eatos.lovable.app` just now:

- `/support` returns 404 (`text/plain`).
- `/support.html` returns 200 but serves the **old** help-center page: none of the new copy ("24/7 professional assistance", "Reach a real specialist") is present.
- `/support/` returns 404.
- `/pricing` still returns `application/octet-stream`, so it downloads instead of opening.

So no, it is not live. The published deployment is still an older build, which also means the earlier routing repair never reached production.

## Plan

1. Publish the current project so the new `/support` page and the routing artifact repair ship together.
2. After the deploy settles, re-check the live URLs directly:
   - `/support` and `/support.html` must return `text/html` and contain the new hero and contact sections.
   - `/pricing`, `/platform`, `/system-status` must return `text/html`, not `application/octet-stream`.
   - `/blog`, `/products`, `/news`, and a nested Shop route must return 200 instead of 404.
3. If any route still serves stale or binary content after the deploy, treat it as a host artifact problem, not a code problem: inspect what the publish step actually uploaded for that path and correct the emitted files, then publish again and re-verify.
4. Report the exact per-route results rather than a general "should be live".

## Note

Publishing is the only state change here. No page code needs to change for this step; the new support page is already verified working in preview at mobile and desktop.
