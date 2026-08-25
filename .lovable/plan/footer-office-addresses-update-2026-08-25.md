# Footer Office Addresses Update

## Goal
Update the four office address blocks in the footer to the new wording and format the user provided.

## Change
Edit the `OFFICES` array in `apps/web/src/components/Footer.tsx` only.

Current entries: Cupertino, Miami, Los Angeles, Houston with their existing `city` / `address` / `state` fields.

New content (verbatim from the request):

- Cupertino, CA
  - 20289 Stevens Creek Blvd PH 1019,
  - Cupertino - California - 95014.
- Miami, FL
  - 1111 Brickell Ave FL 10,
  - Miami - FLlorida - 33131.
- Los Angeles, CA
  - 750 N. San Vicente Blvd Ste 800
  - Los Angeles, California - 90048.
- Houston, TX
  - 21755 Interstate 45, Bldg 1 Ste 107
  - Spring, Texas - 77388.

Mapping into the existing structure:
- `city` gets the combined label (e.g. "Cupertino, CA")
- `address` gets line 1 (e.g. "20289 Stevens Creek Blvd PH 1019,")
- `state` gets line 2 (e.g. "Cupertino - California - 95014.")

Note: "FLlorida" is kept verbatim as requested (appears to be a typo for "Florida" but I will preserve it exactly).

## Notes
- No layout, styling, or other footer changes.
- No em dashes introduced (the hyphens in the copy are regular hyphens).
- Verify in the preview that the offices section renders correctly.
