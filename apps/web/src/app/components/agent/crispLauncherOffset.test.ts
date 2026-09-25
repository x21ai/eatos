import { beforeEach, describe, expect, it } from 'vitest';
import {
  crispLauncherOffsetCss,
  crispLauncherOffsetPx,
  syncCrispLauncherOffset,
} from './crispLauncherOffset';

const styleElement = () =>
  document.getElementById('eatos-crisp-launcher-offset');

describe('crispLauncherOffsetPx', () => {
  it('adds breathing room above a measured bottom inset', () => {
    expect(crispLauncherOffsetPx(75)).toBe(87);
    expect(crispLauncherOffsetPx(142)).toBe(154);
  });

  it('rounds fractional measurements up', () => {
    expect(crispLauncherOffsetPx(74.4)).toBe(87);
  });

  it.each([0, -10, Number.NaN, Number.POSITIVE_INFINITY])(
    'returns no offset for %s',
    (inset) => {
      expect(crispLauncherOffsetPx(inset)).toBe(0);
    },
  );
});

describe('crispLauncherOffsetCss', () => {
  it('overrides the desktop and mobile launcher offsets', () => {
    const css = crispLauncherOffsetCss(87);

    expect(css).toContain(
      '--crisp-customization-default-button-vertical: 87px !important;',
    );
    expect(css).toContain(
      '--crisp-customization-mobile-button-vertical: 87px !important;',
    );
  });
});

describe('syncCrispLauncherOffset', () => {
  beforeEach(() => {
    styleElement()?.remove();
  });

  it('adds a single style element and updates it in place', () => {
    syncCrispLauncherOffset(75);
    expect(styleElement()?.textContent).toContain('87px');

    syncCrispLauncherOffset(142);
    expect(
      document.querySelectorAll('#eatos-crisp-launcher-offset'),
    ).toHaveLength(1);
    expect(styleElement()?.textContent).toContain('154px');
  });

  it('removes the override once nothing occupies the bottom of the page', () => {
    syncCrispLauncherOffset(75);
    syncCrispLauncherOffset(0);

    expect(styleElement()).toBeNull();
  });
});
