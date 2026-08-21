# Pricing FAQ: processing rates answer

## What changes
One FAQ answer on the Pricing page (question: "What are the processing rates?"). No other copy or layout changes.

Current answer: "We offer flat rate processing starting at 2.4% + 10¢. Custom rates available for high volume."

Problem: it names a single rate that is not the rate used elsewhere on the site (the site now shows 2.99% + 20¢), and it hides the fact that more than one pricing model is available.

## Suggested wording (pick one)

Option A, plain and direct:
"We offer several pricing models: flat rate, interchange plus, and custom rates for high volume merchants. We will look at your current statement and recommend the option that costs you less."

Option B, benefit first:
"You choose the model that fits your volume. Flat rate keeps it simple and predictable, interchange plus passes through the true cost with a clear markup, and high volume merchants get custom pricing. Send us a recent statement and we will show you the difference side by side."

Option C, shortest:
"Flat rate, interchange plus, or custom pricing for high volume merchants. eatOS is processor agnostic, so you can keep your current processor or move to a better rate without changing software."

Recommendation: Option A, with the processor agnostic line from Option C added as a second sentence. It answers the question, avoids quoting a rate that can go stale, and reinforces a real differentiator already stated on the Payments page.

## Technical note
Single string edit in `apps/web/src/app/pricing/page.tsx` (the `FaqItem` answer). No em dashes.
