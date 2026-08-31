// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
import { heroImage, glanceBenefits, faqs } from './content';

const MEETINGS_SCRIPT_SRC =
  'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';

const benefitIcons = [Handshake, CalendarDays, Megaphone, FileText];

export default function ResellerPage() {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (document.querySelector(`script[src="${MEETINGS_SCRIPT_SRC}"]`)) return;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = MEETINGS_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
              <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.06] tracking-tighter md:text-6xl">
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
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
              Solve it with your solution.
            </h2>
            <div>
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
                Grow your business by specializing in our products and working one-on-one with eatOS
                sellers to design and implement all sorts of bespoke experiences. From eCommerce
                partners to systems integrators, eatOS solutions partners receive platform access
                and exclusive benefits.
              </p>
              <a
                href="#reseller-apply"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
              >
                Apply to be a Reseller Partner
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
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
              We value every eatOS reseller, providing them with essential benefits. For Silver and
              Gold Partners seeking accelerated growth, we offer exclusive resources on our
              marketing and sales platforms.
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
          <h2 className="mx-auto max-w-3xl text-center text-xl font-bold tracking-tight md:text-2xl">
            Our restaurant management technology cloud powers the world&rsquo;s best restaurant
            brands
          </h2>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
            {showcaseLogos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center bg-white px-6 py-10 transition-colors hover:bg-zinc-100"
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  loading="lazy"
                  className="h-12 w-auto max-w-[170px] object-contain opacity-90 transition-opacity hover:opacity-100 md:h-14"
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
          <div className="mx-auto mt-10 w-full max-w-3xl rounded-3xl bg-white p-6 text-black md:p-10">
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

      {/* Closing CTA */}
      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="site-container">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold leading-[1.1] tracking-tighter md:text-5xl">
                Unlock New Opportunities: Become a Reseller with eatOS Today!
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                Pick a time that works for you and our partner team will walk you through tiers,
                economics and the enablement you get from day one.
              </p>
              <Link
                href="/bookademo"
                className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Book a Demo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div>
              <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
                Connect With Us
              </p>
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black md:rounded-[36px]">
                <div
                  className="meetings-iframe-container bg-black"
                  data-src="https://meetings.hubspot.com/booka/initial-meeting?embed=true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
