// @ts-nocheck
'use client';

import { useEffect } from 'react';

/**
 * On the published static host, pages are only served under `<route>.html` keys.
 * The publish step rewrites hrefs that exist in the built HTML, but links that
 * are created after hydration (mobile menu, mega menu panels, modals) keep the
 * clean path and 404. This delegated click handler sends those clicks to the
 * `.html` address the host can actually serve.
 *
 * It activates only when the current document already contains `.html` links,
 * which is true on the published static build and false in local preview.
 */
export default function StaticLinkFix() {
  useEffect(() => {
    const isStaticHost =
      window.location.pathname.endsWith('.html') ||
      !!document.querySelector('a[href$=".html"]');
    if (!isStaticHost) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as Element | null;
      const anchor = target?.closest?.('a');
      if (!anchor) return;

      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;
      if ((anchor.getAttribute('rel') || '').includes('external')) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#')) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
      if (url.origin !== window.location.origin) return;

      const pathname = url.pathname.replace(/\/+$/, '');
      if (!pathname) return; // home page is served as "/"
      const lastSegment = pathname.slice(pathname.lastIndexOf('/') + 1);
      if (lastSegment.includes('.')) return; // already a file, e.g. .html or an asset

      event.preventDefault();
      window.location.href = `${pathname}.html${url.search}${url.hash}`;
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
