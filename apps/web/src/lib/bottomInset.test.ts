import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getBottomInset,
  setBottomInset,
  subscribeBottomInset,
} from './bottomInset';

afterEach(() => {
  setBottomInset(0);
});

describe('bottomInset', () => {
  it('replays the current inset to new subscribers', () => {
    setBottomInset(75);

    const subscriber = vi.fn();
    subscribeBottomInset(subscriber)();

    expect(subscriber).toHaveBeenCalledWith(75);
  });

  it('notifies subscribers only when the value changes', () => {
    const subscriber = vi.fn();
    const unsubscribe = subscribeBottomInset(subscriber);
    subscriber.mockClear();

    setBottomInset(75);
    setBottomInset(75);
    setBottomInset(142);

    expect(subscriber.mock.calls).toEqual([[75], [142]]);

    unsubscribe();
    setBottomInset(0);
    expect(subscriber).toHaveBeenCalledTimes(2);
  });

  it.each([-5, Number.NaN])('treats %s as no inset', (value) => {
    setBottomInset(75);
    setBottomInset(value);

    expect(getBottomInset()).toBe(0);
  });
});
