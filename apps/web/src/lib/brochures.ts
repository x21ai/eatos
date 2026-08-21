// @ts-nocheck
// Brochure registry. Resolves a product page key to a brochure entry
// from the shared brochures content so links live in one place.

import { brochures } from '@/app/brochures/content';

export const FALLBACK_BROCHURE_ID = 'restaurants-made-simple';

export function getBrochure(id) {
  return (
    brochures.find((b) => b.id === id) ||
    brochures.find((b) => b.id === FALLBACK_BROCHURE_ID) ||
    brochures[0]
  );
}
