# Filter panel: step-by-step conditions

## Goal
Make each condition in the Advanced Filter panel reveal its fields step by step, and let users stack multiple conditions.

## Changes
- Each condition row starts with only the **Select a criterion** dropdown (and its remove button).
- The operator dropdown and value input for a condition appear only after a criterion is chosen for that row. Changing the criterion resets its operator and value.
- **Add another condition** appends a fresh condition row showing just the criterion picker, so users can build two or more conditions. Each new row follows the same reveal behavior.
- Remove stays available on every row once more than one condition exists.
- Save Filter stays disabled until every added condition has a criterion and a value, so no half-filled condition can be saved.
- Saved filters continue to apply all their conditions to the contacts table.

## Technical details
- Edit the `CreateFilterDialog` in `apps/web/src/components/admin/chat/AdminContacts.tsx` only: render the operator/value block conditionally on `criterion.field`, reset operator and value when the field changes.
- Keep the existing native select/input controls so everything works in the preview without scripts.

## Verification
- Open Create filter, confirm a new condition shows only the criterion picker, then operator and value appear after choosing one.
- Add a second and third condition, remove one, save, and confirm the filter applies and appears in the sidebar.
- Check at phone, tablet, and desktop widths; confirm the build passes.
