/**
 * Lifts the Crisp launcher so it clears fixed bottom page furniture.
 *
 * Crisp positions the launcher from two custom properties it declares on its
 * `.crisp-client` root, and its own runtime writes them as a non-important
 * inline style. An author rule marked `!important` therefore wins over both the
 * default and the inline value, while every other selector in the Crisp
 * stylesheet is a build-hashed class that changes on each client release. If
 * Crisp ever renames these properties the override simply stops applying and
 * the launcher keeps its default position.
 */
const STYLE_ELEMENT_ID = 'eatos-crisp-launcher-offset';

const LAUNCHER_GAP_PX = 12;

export function crispLauncherOffsetPx(bottomInsetPx: number): number {
  if (!Number.isFinite(bottomInsetPx) || bottomInsetPx <= 0) return 0;

  return Math.ceil(bottomInsetPx) + LAUNCHER_GAP_PX;
}

export function crispLauncherOffsetCss(offsetPx: number): string {
  return [
    '.crisp-client {',
    `  --crisp-customization-default-button-vertical: ${offsetPx}px !important;`,
    `  --crisp-customization-mobile-button-vertical: ${offsetPx}px !important;`,
    '}',
  ].join('\n');
}

export function syncCrispLauncherOffset(bottomInsetPx: number): void {
  if (typeof document === 'undefined') return;

  const offsetPx = crispLauncherOffsetPx(bottomInsetPx);
  const existing = document.getElementById(STYLE_ELEMENT_ID);

  if (offsetPx === 0) {
    existing?.remove();
    return;
  }

  const style = existing ?? document.createElement('style');
  style.id = STYLE_ELEMENT_ID;
  style.textContent = crispLauncherOffsetCss(offsetPx);

  if (!existing) {
    document.head.appendChild(style);
  }
}
