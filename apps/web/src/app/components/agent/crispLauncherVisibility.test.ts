import { beforeEach, describe, expect, it, vi } from 'vitest';

// The module tracks whether it issued a hide, so each test needs a fresh copy.
async function loadModule() {
  const { setCrispLauncherHidden } = await import('./crispLauncherVisibility');
  return setCrispLauncherHidden;
}

beforeEach(() => {
  vi.resetModules();
  window.$crisp = [];
});

describe('setCrispLauncherHidden', () => {
  it('hides the launcher through the Crisp chat API', async () => {
    const setCrispLauncherHidden = await loadModule();

    setCrispLauncherHidden(true);

    expect(window.$crisp).toEqual([['do', 'chat:hide']]);
  });

  it('restores the launcher after a hide', async () => {
    const setCrispLauncherHidden = await loadModule();

    setCrispLauncherHidden(true);
    setCrispLauncherHidden(false);

    expect(window.$crisp).toEqual([
      ['do', 'chat:hide'],
      ['do', 'chat:show'],
    ]);
  });

  it('leaves Crisp alone when it was never hidden', async () => {
    const setCrispLauncherHidden = await loadModule();

    setCrispLauncherHidden(false);

    expect(window.$crisp).toEqual([]);
  });

  it('does not repeat a command that is already in effect', async () => {
    const setCrispLauncherHidden = await loadModule();

    setCrispLauncherHidden(true);
    setCrispLauncherHidden(true);

    expect(window.$crisp).toEqual([['do', 'chat:hide']]);
  });

  it('hides again when the consent UI comes back', async () => {
    const setCrispLauncherHidden = await loadModule();

    setCrispLauncherHidden(true);
    setCrispLauncherHidden(false);
    setCrispLauncherHidden(true);

    expect(window.$crisp).toEqual([
      ['do', 'chat:hide'],
      ['do', 'chat:show'],
      ['do', 'chat:hide'],
    ]);
  });

  it('does nothing when Crisp is not on the page', async () => {
    const setCrispLauncherHidden = await loadModule();
    delete window.$crisp;

    expect(() => setCrispLauncherHidden(true)).not.toThrow();
  });

  it('hides once Crisp appears, even if it was absent earlier', async () => {
    const setCrispLauncherHidden = await loadModule();
    delete window.$crisp;
    setCrispLauncherHidden(true);

    window.$crisp = [];
    setCrispLauncherHidden(true);

    expect(window.$crisp).toEqual([['do', 'chat:hide']]);
  });
});
