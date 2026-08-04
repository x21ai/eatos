// @ts-nocheck
'use client';

import { useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const onSubmit = (e) => {
    e.preventDefault();
    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 255;
    setStatus(valid ? 'success' : 'error');
    if (valid) setEmail('');
  };

  return (
    <section className="bg-[#efefef] py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <h2 className="font-bold leading-[1.05] tracking-[-0.03em] text-black text-[clamp(2rem,5vw,3.25rem)]">
              Connect to the Future
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-700 sm:text-base">
              Get valuable tips on the future of restaurant technology and industry trends.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:justify-end"
          >
            <div className="min-w-0 flex-1 sm:max-w-[420px]">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                maxLength={255}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus('idle');
                }}
                placeholder="Add Your Email"
                className="h-12 w-full border border-zinc-400 bg-white px-4 text-sm text-black placeholder:text-zinc-500 focus:border-black focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="h-12 shrink-0 bg-black px-8 text-sm font-bold text-white transition-opacity hover:opacity-85 sm:px-10"
            >
              Subscribe
            </button>
          </form>
        </div>

        {status !== 'idle' ? (
          <p
            role="status"
            className={`mt-4 text-sm ${status === 'success' ? 'text-emerald-700' : 'text-red-600'}`}
          >
            {status === 'success'
              ? "Thanks — you're on the list."
              : 'Please enter a valid email address.'}
          </p>
        ) : null}
      </div>
    </section>
  );
}