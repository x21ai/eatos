/**
 * Whether any cookie consent UI (the bottom bar or the preferences dialog) is
 * currently on screen. Floating widgets subscribe to this so they can stay out
 * of the way until the visitor has made a choice.
 *
 * The value is only ever written from browser effects, so the module-level
 * state is never shared between server renders.
 */
let visible = false;

const subscribers = new Set<(visible: boolean) => void>();

export function isCookieBannerVisible(): boolean {
  return visible;
}

export function setCookieBannerVisible(next: boolean): void {
  if (next === visible) return;

  visible = next;

  for (const subscriber of subscribers) {
    subscriber(next);
  }
}

/**
 * Subscribers are called immediately with the current value so they do not
 * depend on mounting before the consent UI publishes its state.
 */
export function subscribeCookieBannerVisible(
  subscriber: (visible: boolean) => void,
): () => void {
  subscribers.add(subscriber);
  subscriber(visible);

  return () => {
    subscribers.delete(subscriber);
  };
}
