// @ts-nocheck
'use client';

import { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Handshake,
  CalendarDays,
  Megaphone,
  FileText,
} from 'lucide-react';
import { showcaseLogos } from '@/components/marketing/customerShowcase';
import ResellerForm from './ResellerForm';
import ResellerApplyModal from './ResellerApplyModal';
import { heroImage, glanceBenefits, faqs } from './content';

const benefitIcons = [Handshake, CalendarDays, Megaphone, FileText];

export default function ResellerPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [applyOpen, setApplyOpen] = useState(false);


  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="pt-[128px] md:pt-[176px] pb-16 md:pb-24">
        <div className="site-container">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 md:rounded-[36px]">
            <img
              src={heroImage}
              alt="An eatOS reseller partner shaking hands with a restaurant operator"
              width={1600}
              height={900}
              className="h-[320px] w-full object-cover md:h-[460px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-14">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-on-dark" />
                Reseller Program
              </span>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.06] tracking-tighter sm:text-5xl md:text-6xl lg:text-[64px]">
                Start Your
                <br />
                Reseller Journey
              </h1>
              <a
                href="#reseller-apply"
                className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
              >
                Join Our Team Today
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Solve it with your solution */}
      <section className="border-y border-white/10 py-16 md:py-24">
        <div className="site-container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold leading-[1.08] tracking-tighter md:text-4xl lg:text-5xl">
              Solve it with your solution.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
              Specialize in our products and work one-on-one with eatOS sellers to design bespoke
              experiences. Solutions partners get platform access and exclusive benefits.
            </p>
            <button
              type="button"
              onClick={() => setApplyOpen(true)}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
            >
              Apply to be a Reseller Partner
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Program at a glance */}
      <section className="py-20 md:py-28">
        <div className="site-container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
              Reseller program at a glance
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
              We value every eatOS reseller, providing them essential benefits. For Silver & Gold
              Partners seeking accelerated growth, we offer exclusive resources on marketing and
              sales platforms.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {glanceBenefits.map((item, i) => {
              const Icon = benefitIcons[i];
              return (
                <div
                  key={item.title}
                  className="flex h-full flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-7 text-center transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-on-dark">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-6 text-base font-bold leading-snug tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="border-y border-white/10 py-16 md:py-20">
        <div className="site-container">
          <h2 className="text-center text-base font-bold tracking-tight sm:text-lg md:text-2xl whitespace-nowrap overflow-hidden text-ellipsis">
            Our technology cloud powers the world&rsquo;s best restaurant brands
          </h2>
        </div>
        <div className="group relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent md:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent md:w-28" />
          <div className="marquee-track flex w-max items-center gap-6 md:gap-10">
            {[...showcaseLogos, ...showcaseLogos].map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex h-20 w-[170px] shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white px-5 py-3 md:h-24 md:w-[210px]"
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  loading="lazy"
                  className="max-h-full w-auto max-w-full object-contain"
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Let's connect */}
      <section id="reseller-apply" className="py-20 md:py-28">
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Let&rsquo;s Connect</h2>
            <p className="mt-4 text-base text-white/70">
              Receive eatOS partnership updates directly in your inbox.
            </p>
          </div>
          <div className="mt-10 w-full rounded-3xl bg-white p-6 text-black md:p-12">
            <ResellerForm />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="site-container">
          <h2 className="text-center text-3xl font-bold tracking-tighter md:text-4xl">FAQs</h2>
          <div className="mx-auto mt-12 max-w-4xl divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-white/5 md:px-8"
                  >
                    <span className="text-sm font-semibold leading-snug md:text-base">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-white/60 transition-transform ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {open && (
                    <p className="px-6 pb-6 text-sm leading-relaxed text-white/70 md:px-8 md:text-base">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>


      <ResellerApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  );
}
