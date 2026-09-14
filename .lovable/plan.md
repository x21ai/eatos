# Remove the "3 capabilities" line from the role cards

On the AI page, each of the six role cards (Operator, Manager, Finance, Guest, Server, Kitchen) shows a small "3 capabilities" line under the description. That line comes out of every card.

## What changes

- The small grey "3 capabilities" text is removed from all six cards.
- Card icon, title, description, spacing, and layout stay exactly as they are.

## Technical detail

In `apps/web/src/components/AIIntelligence/sections/AgentsSection.tsx`:

- Delete the `<p className="mt-5 text-xs text-[#6B7280]">{a.capabilities} capabilities</p>` block from the card markup.
- Remove the now-unused `capabilities: 3` field from each of the six role objects so no dead data remains.

No other page or component is touched.
