# Re-date the blog archive: May 2017 to today

Spread all 971 blog posts across a realistic publishing history that starts 9 May 2017 and ends at the current date, so /blog page 1 shows the newest posts and the final page shows the oldest.

## What changes for a reader

- Page 1 = most recent posts, last page = May 2017.
- The archive reads like a real publishing schedule: light in the early years, busier in the peak years, steady now.
- No post is dated on a public holiday, a weekend, or during the early COVID shutdown window, so nothing looks tone-deaf or auto-generated.

## Cadence (weekly early, denser later)

Target volumes per year, tuned so the total lands exactly on 971:

```text
2017 (from 9 May)  ~1 / week        ~34 posts
2018               ~1 / week        ~52
2019               ~1.5 / week      ~78
2020               reduced          ~40
2021               ~2 / week       ~104
2022               ~2.5 / week     ~130
2023               ~3 / week       ~156
2024               ~3 / week       ~156
2025               ~2.5 / week     ~130
2026 (to today)    ~2 / week        ~70
```

Any rounding remainder is absorbed into 2023 and 2024, the peak years.

## Date rules

- Publish days: Tuesday, Wednesday and Thursday first, adding Monday and Friday in the denser years. Never Saturday or Sunday.
- Skipped dates: New Year's Day, Memorial Day, Independence Day, Labor Day, Thanksgiving and the day after, Christmas Eve, Christmas Day, New Year's Eve. If a slot lands on one, it moves to the next allowed weekday.
- COVID window: 16 March 2020 to 30 June 2020 gets no posts at all; 2020's reduced count sits in the rest of that year.
- No two posts share the exact same date unless the year's volume requires it, in which case same-day posts are kept to a maximum of two.
- Newest date = today, oldest = 9 May 2017 (the first slot on or after that date).

## Order

The current article order is preserved and simply re-stamped: the post currently at the top of /blog gets the newest date, and dates walk backwards from there to 9 May 2017 for the last post. This keeps the existing curation intact and avoids reshuffling content.

## Technical notes

- A one-off Node script generates the date slot list from the rules above and rewrites the `date` field of every entry in `apps/web/src/app/blog/posts.generated.json` (966 migrated posts) and the five curated posts in `apps/web/src/app/blog/content.ts`.
- Dates stay in `YYYY-MM-DD` form and continue to render through the existing UTC-pinned formatter, so no hydration mismatch is introduced.
- The blog index already sorts by `date` descending and paginates 12 per page, so pagination and category filtering pick up the new ordering with no component changes.
- Sitemap entries and any `datePublished` JSON-LD are regenerated from the same field, keeping metadata consistent with what is displayed.
- Note: these URLs are already indexed with their previous dates, so search engines will see updated publish dates for the migrated posts. The URLs themselves do not change, so links and rankings stay intact.
