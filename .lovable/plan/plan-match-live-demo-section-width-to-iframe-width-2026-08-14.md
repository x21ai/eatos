# Plan: Match Live Demo Section Width to Iframe Width

## Goal
Make the outer width of the Live Demo section exactly equal to the width of the iframe/demo frame inside it, so there is no extra horizontal space around the frame.

## Current State
- `LiveDemoSection.tsx` wraps the section content in a `max-w-7xl mx-auto px-4 md:px-6` container.
- The iframe/demo frame is inside that container as `w-full`.
- Because the section container has horizontal padding, the section content is slightly wider than the iframe frame itself.

## Proposed Changes
1. Remove the horizontal padding from the section's main content container so the iframe frame can define the section width.
2. Keep the section title/description centered and readable by giving the heading its own inner padding/margin, or by moving the heading above the constrained frame.
3. Ensure the iframe container and its chrome bar remain the same width as the section boundary with no overflow.

## Expected Outcome
The Live Demo section will be a single centered block whose width matches the iframe width exactly, eliminating the extra space the user selected around the POS/Open chrome bar.

## Files to Update
- `apps/web/src/app/components/LiveDemoSection.tsx`
