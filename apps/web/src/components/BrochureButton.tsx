// @ts-nocheck
'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Download, X } from 'lucide-react';
import { getBrochure } from '@/lib/brochures';

function BrochureModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} brochure`}
      style={{ zIndex: 2147483000 }}
      className="fixed inset-0 flex items-center justify-center bg-black/80 p-0 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-[1200px] flex-col overflow-hidden bg-zinc-950 shadow-2xl sm:h-[88vh] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-500">
              Brochure
            </p>
            <h2 className="truncate text-sm font-bold text-white sm:text-base">{item.title}</h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={item.flipbook}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10 sm:inline-flex"
            >
              Open in new tab
              <ArrowUpRight size={14} />
            </a>
            <a
              href={item.download}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-85"
            >
              <Download size={14} />
              PDF
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close brochure"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <iframe
          src={item.flipbook}
          title={`${item.title} flipbook`}
          className="h-full w-full flex-1 bg-white"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function BrochureButton({
  brochureId,
  label = 'Brochure',
  className = 'px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors text-center',
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const item = getBrochure(brochureId);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>
      {open ? <BrochureModal item={item} onClose={close} /> : null}
    </>
  );
}
