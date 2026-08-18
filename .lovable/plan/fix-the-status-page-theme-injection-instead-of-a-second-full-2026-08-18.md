# Fix the status page: theme injection instead of a second full page

## What actually went wrong

Your status tool renders its own complete page (Crisp/Instatus style). The file I gave you was a complete standalone HTML document, so when it was pasted into the custom-code box the browser ended up with two documents stacked: a second `<!DOCTYPE>`, `<head>`, `<body>`, footer and script inside the first one. That is why you see my dark page with placeholder bars on top and the provider's real light-theme service list underneath, plus misaligned text where the two stylesheets fight each other.

Nothing about the visual direction was wrong. The delivery format was.

## What I will deliver instead

One paste-in block with no document wrapper: only a `<style>` section plus a small optional header/banner fragment. It retheme's the provider's own live markup, so uptime values and incidents stay automatic and there is no duplicate placeholder list.

Contents:

1. Design tokens and font link kept, but delivered as a `<link>` plus `<style>` only, no `<head>`.
2. All rules scoped so they target the provider's real classes (`css-home-services`, `css-home-services-group`, `css-home-services-group-node`, `css-home-services-group-node-label`, `css-home-services-group-node-replicas`, and the provider's status pill, banner, incident and footer elements) rather than my invented duplicates.
3. The placeholder service list, placeholder incident history and the 90-day bar generator script are removed entirely. The provider already renders those.
4. Global resets kept minimal so they cannot break the provider's own layout: no aggressive `*` overrides, dark surface applied on `body` and the provider's page wrapper.
5. Responsive rules preserved: two-column groups on desktop, single column on tablet and phone, bars trimmed on narrow screens with the legend label matching.

## What you get back

- `status-theme.html`: the block to paste into the custom code / custom CSS field, clearly split into "paste in CSS box" and "optional HTML header fragment" sections with comments.
- A short note on which field each part goes into.

## Note on exactness

Your paste showed my markup, not the provider's rendered service markup. To scope the CSS precisely I will target the `css-home-services-*` hooks that are already in play plus the common provider class patterns, and include commented fallbacks. If you paste the provider's own rendered HTML (view source of the live page with my code removed), I can pin every selector exactly in one pass.
