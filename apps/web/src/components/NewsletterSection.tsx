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
    <section className="border-t border-white/5 bg-black py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 p-8 sm:p-12 md:rounded-[3rem] md:p-16">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-[280px] w-[280px] max-w-full -translate-x-1/2 rounded-full bg-green-500/10 blur-[110px] sm:h-[420px] sm:w-[420px]" />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-green-400">
              Newsletter
            </p>
            <h2 className="mt-5 font-bold leading-[1.05] tracking-tighter text-white text-[clamp(1.5rem,5vw,3.5rem)]">
              Connect to the Future
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
              Get valuable tips on the future of restaurant technology, industry trends, and strategies to help your business grow.
            </p>

            <form onSubmit={onSubmit} className="mx-auto mt-9 w-full max-w-xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:border sm:border-white/10 sm:bg-black/60 sm:p-2">
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
                  placeholder="Add your email"
                  className="h-[4rem] w-full min-w-0 flex-1 rounded-full border border-white/10 bg-black/60 px-5 text-base text-white placeholder:text-gray-500 focus:border-green-500/50 focus:outline-none sm:h-11 sm:text-sm sm:border-transparent sm:bg-transparent"
                />
                <button
                  type="submit"
                  className="h-[3.25rem] w-full shrink-0 rounded-full bg-white px-7 text-sm font-semibold text-black transition-opacity hover:opacity-85 sm:h-11 sm:w-auto"
                >
                  Subscribe
                </button>
              </div>

              <p
                role="status"
                className={`mt-4 min-h-5 text-sm ${
                  status === 'success'
                    ? 'text-green-400'
                    : status === 'error'
                      ? 'text-red-400'
                      : 'text-gray-500'
                }`}
              >
                {status === 'success'
                  ? "Thanks, you're on the list."
                  : status === 'error'
                    ? 'Please enter a valid email address.'
                    : 'No spam. Unsubscribe anytime.'}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}