// @ts-nocheck
'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const VISIBLE_CHIPS = 3;

export function categoryHref(category) {
  return category === 'All Posts' ? '/blog' : `/blog?category=${encodeURIComponent(category)}`;
}

export default function CategoryFilter({ available, active, onSelect, asLinks = false }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const primary = available.slice(0, VISIBLE_CHIPS + 1);
  const overflow = available.slice(VISIBLE_CHIPS + 1);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const chipClass = (isActive) =>
    `shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
      isActive
        ? 'border-white bg-white text-black'
        : 'border-white/15 bg-white/5 text-zinc-300 hover:border-white/40 hover:text-white'
    }`;

  const overflowActive = overflow.includes(active);

  const menuItemClass = (isActive) =>
    `block w-full rounded-xl px-3 py-2 text-left text-[13px] transition-colors ${
      isActive ? 'bg-white/10 text-white' : 'text-zinc-300 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <div className="scrollbar-hidden -mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      {primary.map((c) =>
        asLinks ? (
          <a key={c} href={categoryHref(c)} className={chipClass(active === c)}>
            {c}
          </a>
        ) : (
          <button key={c} type="button" onClick={() => onSelect(c)} className={chipClass(active === c)}>
            {c}
          </button>
        ),
      )}

      {overflow.length > 0 && (
        <div ref={wrapRef} className="relative shrink-0">
          <button
            type="button"
            aria-expanded={open}
            aria-haspopup="menu"
            onClick={() => setOpen((v) => !v)}
            className={`${chipClass(overflowActive)} inline-flex items-center gap-1.5`}
          >
            {overflowActive ? active : 'More'}
            <ChevronDown size={13} className={open ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>
          {open && (
            <div
              role="menu"
              className="absolute right-0 top-[calc(100%+8px)] z-20 w-56 overflow-hidden rounded-2xl border border-white/15 bg-black p-2 shadow-2xl"
            >
              {overflow.map((c) =>
                asLinks ? (
                  <a key={c} role="menuitem" href={categoryHref(c)} className={menuItemClass(active === c)}>
                    {c}
                  </a>
                ) : (
                  <button
                    key={c}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      onSelect(c);
                      setOpen(false);
                    }}
                    className={menuItemClass(active === c)}
                  >
                    {c}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
