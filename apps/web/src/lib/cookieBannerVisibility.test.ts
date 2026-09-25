import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  isCookieBannerVisible,
  setCookieBannerVisible,
  subscribeCookieBannerVisible,
} from './cookieBannerVisibility';

afterEach(() => {
  setCookieBannerVisible(false);
});

describe('cookieBannerVisibility', () => {
  it('replays the current value to new subscribers', () => {
    setCookieBannerVisible(true);

    const subscriber = vi.fn();
    subscribeCookieBannerVisible(subscriber)();

    expect(subscriber).toHaveBeenCalledWith(true);
  });

  it('notifies subscribers only when the value changes', () => {
    const subscriber = vi.fn();
    const unsubscribe = subscribeCookieBannerVisible(subscriber);
    subscriber.mockClear();

    setCookieBannerVisible(true);
    setCookieBannerVisible(true);
    setCookieBannerVisible(false);

    expect(subscriber.mock.calls).toEqual([[true], [false]]);

    unsubscribe();
    setCookieBannerVisible(true);
    expect(subscriber).toHaveBeenCalledTimes(2);
  });

  it('tracks the latest value', () => {
    setCookieBannerVisible(true);
    expect(isCookieBannerVisible()).toBe(true);

    setCookieBannerVisible(false);
    expect(isCookieBannerVisible()).toBe(false);
  });
});
