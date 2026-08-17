// @ts-nocheck
'use client';

import { useEffect } from 'react';

const SKIPPED_PREFIXES = ['/api/', '/_next/', '/__l5e/'];

function publishedHref(rawHref: string) {
  if (!rawHref || rawHref.startsWith('#')) return null;

  let url: URL;
  try {
    url = new URL(rawHref, window.location.href);
  } catch {
    return null;
  }

  if (url.origin !== window.location.origin) return null;
  if (url.pathname === '/' || url.pathname.endsWith('/')) return null;
  if (url.pathname.includes('.') || SKIPPED_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
    return null;
  }

  return `${url.pathname}.html${url.search}${url.hash}`;
}

export default function PublishedLinkNormalizer() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    const normalize = (root: ParentNode) => {
      root.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((anchor) => {
        const nextHref = publishedHref(anchor.getAttribute('href') ?? '');
        if (nextHref) anchor.setAttribute('href', nextHref);
      });
    };

    normalize(document);
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node instanceof Element) {
            if (node.matches('a[href]')) {
              const anchor = node as HTMLAnchorElement;
              const nextHref = publishedHref(anchor.getAttribute('href') ?? '');
              if (nextHref) anchor.setAttribute('href', nextHref);
            }
            normalize(node);
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}