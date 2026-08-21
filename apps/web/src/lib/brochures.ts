// @ts-nocheck
// Brochure registry. Resolves a product page key to a brochure entry
// from the shared brochures content so links live in one place.

import { brochures } from '@/app/brochures/content';

export const FALLBACK_BROCHURE_ID = 'restaurants-made-simple';

// Page keys that differ from the brochure id.
const ALIASES = {
  'reporting-analytics': 'reporting-and-analytics',
  apponlineorderingdelivery: 'online-ordering-and-delivery',
  'online-ordering': 'online-ordering-and-delivery',
};

export function getBrochure(id) {
  const key = ALIASES[id] || id;
  return (
    brochures.find((b) => b.id === key) ||
    brochures.find((b) => b.id === FALLBACK_BROCHURE_ID) ||
    brochures[0]
  );
}
