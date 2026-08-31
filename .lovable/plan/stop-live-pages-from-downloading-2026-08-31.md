# Stop live pages from downloading

## Confirmed diagnosis

- The live homepage renders normally.
- Live clean routes such as `/pricing` and `/platform` still return `application/octet-stream`, which causes the browser download prompt.
- Their explicit `.html` versions return `text/html` and render correctly.
- The current publish script no longer creates extensionless page files, but the live host is still serving those old files. The corrected publish output has not replaced the active deployment yet.

## Plan

1. Check the latest security scan required for publishing and resolve only a blocking critical issue, if one exists.
2. Publish the current corrected build so the old extensionless files are removed from the live deployment.
3. Verify the published site using real HTTP requests for representative top-level and nested routes, including `/pricing`, `/platform`, `/blog`, `/products`, product pages, solution pages, and shop pages.
4. Require every page URL to return a successful HTML response. A route returning `application/octet-stream`, a download header, or a 404 remains a failure.
5. If the host still does not map clean URLs to `.html` files after the fresh publish, update the generated internal links to the host-supported HTML URL form, republish once, and repeat the same live checks.

## Scope

This changes only publishing and route delivery behavior. Page design and content remain unchanged.
