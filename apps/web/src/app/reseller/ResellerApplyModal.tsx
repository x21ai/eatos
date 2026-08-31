'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import ResellerForm from './ResellerForm';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ResellerApplyModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm md:items-center md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Apply to be a reseller partner"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-white p-6 text-black shadow-2xl md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-black transition-colors hover:bg-black/10"
        >
          <X size={18} />
        </button>
        <h2 className="pr-12 text-2xl font-bold tracking-tight md:text-3xl">
          Apply to be a Reseller Partner
        </h2>
        <p className="mt-2 text-sm text-black/60">
          Tell us about your business and our partnerships team will be in touch.
        </p>
        <div className="mt-6 w-full">
          <ResellerForm
            formId="2f9b623f-5139-470e-83ee-95da08d21c86"
            targetId="hubspot-reseller-apply-modal"
            className=""
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
