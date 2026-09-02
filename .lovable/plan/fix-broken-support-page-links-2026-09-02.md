# Fix broken Support page links

The Support page points "Contact sales" to `/contactsales` and "Book a demo" to `/book-demo`. Neither route exists in the app, so both land on the Not Found page. The rest of the site uses `/contact` and `/bookademo`.

## Changes

- `apps/web/src/app/support/content.ts`
  - Contact channel href: `/contactsales` becomes `/contact`
  - Demo href: `/book-demo` becomes `/bookademo`
- `apps/web/src/app/support/SupportHomeClient.tsx`
  - CTA links updated to `/contact` and `/bookademo`
- `apps/web/src/app/support/article/[slug]/ArticleClient.tsx`
  - "Contact support" link updated to `/contact`

No copy, layout, or styling changes. After the edits, I will verify no remaining references to the dead paths anywhere in the support section and confirm both pages open from the Support page in the preview.
