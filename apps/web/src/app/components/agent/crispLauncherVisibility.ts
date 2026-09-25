/**
 * Hides and restores the Crisp launcher through Crisp's own chat API.
 *
 * Commands pushed onto `$crisp` before the client finishes loading are queued
 * and replayed once the launcher has spawned, so a hide requested during the
 * initial page load still lands. `chat:show` is only ever sent to undo a hide
 * we issued, which leaves Crisp's own visibility rules in charge otherwise.
 */
let hiddenByUs = false;

export function setCrispLauncherHidden(hidden: boolean): void {
  if (typeof window === 'undefined') return;
  if (hidden === hiddenByUs) return;

  const crisp = window.$crisp;
  if (typeof crisp?.push !== 'function') return;

  hiddenByUs = hidden;
  crisp.push(['do', hidden ? 'chat:hide' : 'chat:show']);
}
