/**
 * Height, in CSS pixels, currently occupied by page furniture pinned to the
 * bottom of the viewport (today only the cookie consent bar). Floating widgets
 * subscribe to this so they can sit above it instead of on top of it.
 *
 * The value is only ever written from browser effects, so the module-level
 * state is never shared between server renders.
 */
let bottomInsetPx = 0;

const subscribers = new Set<(px: number) => void>();

export function getBottomInset(): number {
  return bottomInsetPx;
}

export function setBottomInset(px: number): void {
  const next = Number.isFinite(px) && px > 0 ? px : 0;

  if (next === bottomInsetPx) return;

  bottomInsetPx = next;

  for (const subscriber of subscribers) {
    subscriber(next);
  }
}

/**
 * Subscribers are called immediately with the current inset so they do not
 * depend on mounting before whichever component publishes the measurement.
 */
export function subscribeBottomInset(
  subscriber: (px: number) => void,
): () => void {
  subscribers.add(subscriber);
  subscriber(bottomInsetPx);

  return () => {
    subscribers.delete(subscriber);
  };
}
