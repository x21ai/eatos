# Print the paste-in theme block directly in chat

You want the code in the chat window as a copyable block, because opening the file in a browser shows a black page with only a header.

## Why the file looks empty in a browser

`status-theme_v2.html` is not a page. It is a fragment: a Montserrat font link, a scoped stylesheet, and a small optional header. It restyles markup your status provider renders. With no provider markup present, there is nothing for it to style, so a browser shows only the header on black.

## What I will do

Post the theme block in chat as fenced code, split into two clearly labelled parts:

1. **Part 1, custom head / custom CSS field:** the Montserrat `<link>` plus the full `<style>` sheet. This is the part that does all the theming.
2. **Part 2, optional header fragment:** the small eatOS header markup, only if your provider has a custom header HTML field.

Each part gets a one-line note saying which field it goes into. No document wrapper, no placeholder service list, no bar-generating script, so it cannot stack a second page under your provider's page.

Nothing in the project source changes, and the existing files stay where they are for download.

## Also included

A one-line reminder that `status-preview_v2.html` is the file to open in a browser when you want to review the design.

## Optional, needs your input

If you paste your live status page's rendered HTML (view source with my earlier code removed), I can pin every selector to your provider's exact class names instead of the generic hooks.
