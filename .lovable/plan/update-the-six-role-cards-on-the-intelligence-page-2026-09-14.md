# Update the six role cards on the Intelligence page

Replace the six agent cards with the role-based content from the screenshot, keeping the exact same grid layout, card styling, icon treatment, and reveal animation.

## New card content (in order)

1. **Operator** - Operator could be the owner, or the general manager running more than one location. This is the view above any single restaurant.
2. **Manager** - Shift and unit operations. Staffing, exceptions, and what's coming next in the next few days.
3. **Finance** - Accounting and margin. The money side of the business, from daily transactions up to monthly close.
4. **Guest** - The diner's experience of the restaurant. Are they known, are they being seated, and how easy is it to order.
5. **Server** - Table-side staff. Taking the order and knowing the guest in front of them.
6. **Kitchen** - Back-of-house production. The line, prep, and what's on the menu.

Each card also gets a small muted "3 capabilities" line at the bottom, as shown in the screenshot.

## Icons

Swap to icons matching each role: building for Operator, clipboard for Manager, bank for Finance, people for Guest, utensils for Server, chef hat for Kitchen. Same purple accent and rounded icon tile as today.

## Technical notes

- Single file: `apps/web/src/components/AIIntelligence/sections/AgentsSection.tsx`
- Update the `agents` array items (title, desc, Icon) and add a `capabilities: 3` field rendered as a muted caption below the description.
- Swap the lucide-react imports to the new icon set.
- Layout classes, `Card`, `Reveal`, and section heading/label stay unchanged; responsive behavior (1 / 2 / 3 columns) is untouched so mobile, tablet, and desktop all follow.
