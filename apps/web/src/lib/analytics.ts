// Lightweight, tool-agnostic event tracking.
// Events are pushed into window.dataLayer, the standard queue read by
// Google Tag Manager, GA4 and most analytics tools. With no tag installed
// the pushes are harmless, so a measurement ID can be added later without
// touching any call to action code.

export type TrackPayload = Record<string, string | number | boolean | undefined>;

export function trackEvent(event: string, payload: TrackPayload = {}) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: unknown[] };
  if (!Array.isArray(w.dataLayer)) w.dataLayer = [];
  w.dataLayer.push({ event, ...payload });
}

export const BOOK_DEMO_PATH = '/book-demo';

export function trackBookDemoClick(location: string, label?: string) {
  trackEvent('book_demo_click', { location, label, destination: BOOK_DEMO_PATH });
}
