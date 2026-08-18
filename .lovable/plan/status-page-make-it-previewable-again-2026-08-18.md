# Status page: make it previewable again

## What is happening

`status-theme.html` is not a web page. It is a paste-in block for your status provider's custom-code field: a Montserrat font link, a scoped `<style>` sheet, and an optional header fragment. It restyles markup the provider renders (service groups, uptime bars, incident history). Opened on its own there is no such markup, so you correctly see only the header on a black background.

Nothing is broken, but you cannot review the design, which is the real problem.

## Plan

Ship two files instead of one, so the thing you review and the thing you paste stay in sync.

1. `status-preview_v2.html` (new, for reviewing only)
   - A complete standalone page embedding the same theme CSS plus a faithful mock of the provider's DOM: overall status banner, service groups with 90-day uptime bars and uptime percentages, incident history list, footer.
   - This is what you open to judge the design. It is never pasted anywhere.

2. `status-theme_v2.html` (revision of the current paste-in block)
   - Same CSS as the preview, identical, with the paste instructions kept at the top.
   - A short note at the very top stating the file looks blank if opened directly, pointing to the preview file.

## Verification

Render `status-preview_v2.html` at desktop, tablet and mobile widths and check each screenshot for: bars not colliding with uptime percentages, groups collapsing to one column on mobile, legend reading correctly when bars are trimmed, and no console errors.

## Notes

Mock content in the preview is placeholder only. On your live status page the provider still supplies all real uptime and incident data.

## Optional, needs your input

If you paste the rendered HTML of your live status page (view source, with my earlier code removed), I can pin every selector to your provider's real class names rather than generic ones, and build the mock from your actual markup.