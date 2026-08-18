# Remove VoiceOS Demo Phone Numbers

## Goal
Remove the displayed phone numbers from the VoiceOS section on the AI Intelligence page.

## Scope
- File: `apps/web/src/components/AIIntelligence/sections/VoiceOSSection.tsx`
- Change: Remove the block containing the US and UK demo phone numbers (`+1 (270) 482 5808` and `+44 (7428) 327607`) from the CTA area below the "Try the demo" link.

## Plan
1. Read the current `VoiceOSSection.tsx` to confirm exact lines.
2. Remove the phone number div while keeping the "Try the demo" link intact.
3. Verify no other references to those numbers remain in the file.
