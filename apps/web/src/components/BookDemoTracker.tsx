'use client';

import { useEffect } from 'react';
import { trackBookDemoClick } from '@/lib/analytics';

// Captures every click on a link that points at /book-demo, anywhere on the
// site (header, mobile menu, footer, hero, pricing, product and solution
// pages) without each call to action needing its own handler.
function locationForElement(el: HTMLElement): string {
  if (el.closest('header')) return 'header';
  if (el.closest('footer')) return 'footer';
  const section = el.closest('section');
  const heading = section?.querySelector('h1, h2');
  const label = heading?.textContent?.trim().slice(0, 60);
  if (label) return label;
  return 'page';
}

export default function BookDemoTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      if (!href.startsWith('/bookademo')) return;
      trackBookDemoClick(
        locationForElement(anchor),
        anchor.textContent?.trim().slice(0, 60) || undefined,
      );
    }

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
