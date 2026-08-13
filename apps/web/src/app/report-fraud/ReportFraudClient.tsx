// @ts-nocheck
'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Placeholder } from '@/components/marketing/Placeholder';
import { closing, helpChannels, hero, report, safetyRules, spotlights } from './content';

const rise = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div {...rise} transition={{ ...rise.transition, delay }} className={className}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, className = '' }) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-500 sm:text-xs ${className}`}
    >
      {children}
    </p>
  );
}

/* -------------------------------- Hero -------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[140px]"
      />
      <div className="container relative mx-auto px-4 pt-28 pb-4 md:px-6 md:pt-36 md:pb-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              <Eyebrow className="!text-emerald-400">{hero.eyebrow}</Eyebrow>
            </div>
            <h1 className="mt-6 max-w-[20ch] font-bold leading-[1.06] tracking-tighter text-4xl sm:text-5xl md:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              {hero.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={hero.primaryCta.href}
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-85 sm:w-auto"
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/40 hover:text-white sm:w-auto"
              >
                {hero.secondaryCta.label}
                <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Placeholder
              label={hero.imageLabel}
              src={hero.image}
              ratio="aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5]"
            />
          </Reveal>
        </div>
      </div>

      <div className="container relative mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {safetyRules.map((rule, i) => (
            <Reveal key={rule.title} delay={i * 0.06}>
              <div className="h-full rounded-[24px] border border-white/10 bg-white/[0.03] p-7">
                <ShieldCheck size={20} className="text-emerald-400" />
                <h3 className="mt-5 text-lg font-bold tracking-tighter">{rule.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{rule.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Spotlights ----------------------------- */

function Spotlight({ item, index }) {
  const flip = index % 2 === 1;
  return (
    <Reveal>
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className={flip ? 'md:order-2' : ''}>
          <Eyebrow>{item.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-[22ch] font-bold leading-[1.12] tracking-tighter text-3xl md:text-5xl text-white">
            {item.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            {item.body}
          </p>
          {item.note ? (
            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500">{item.note}</p>
          ) : null}
        </div>
        <div className={flip ? 'md:order-1' : ''}>
          <Placeholder
            label={item.imageLabel}
            src={item.image}
            ratio="aspect-[4/3]"
            pad={Boolean(item.pad)}
          />
        </div>
      </div>
    </Reveal>
  );
}

function Guidance() {
  return (
    <section className="bg-black">
      <div className="container mx-auto space-y-24 px-4 py-20 md:space-y-32 md:px-6 md:py-28">
        {spotlights.map((item, i) => (
          <Spotlight key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- Form -------------------------------- */

const initialForm = { firstName: '', email: '', phone: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.firstName.trim()) errors.firstName = 'Please enter your first name.';
  else if (values.firstName.trim().length > 100) errors.firstName = 'Please use 100 characters or fewer.';

  const email = values.email.trim();
  if (!email) errors.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.';
  else if (email.length > 255) errors.email = 'Please use 255 characters or fewer.';

  const phone = values.phone.trim();
  if (!phone) errors.phone = 'Please enter a phone number.';
  else if (!/^[\d\s()+.-]{7,20}$/.test(phone)) errors.phone = 'Please enter a valid phone number.';

  const message = values.message.trim();
  if (!message) errors.message = 'Please describe what happened.';
  else if (message.length > 2000) errors.message = 'Please use 2000 characters or fewer.';

  return errors;
}

function ReportForm() {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).some((key) => nextErrors[key])) return;

    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus('done');
    setValues(initialForm);
  };

  if (status === 'done') {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 text-center sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 size={26} className="text-emerald-400" />
        </div>
        <h3 className="mt-6 text-xl font-bold tracking-tighter text-white">
          Report received
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-400">
          Thank you for reporting this incident. Our fraud prevention team will review your
          submission and reach out if we need more information.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-7 inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Submit another report
        </button>
      </div>
    );
  }

  const fieldClass = (name) =>
    `w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-emerald-500/60 ${
      errors[name] ? 'border-red-500/60' : 'border-white/10'
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8"
    >
      <h3 className="text-lg font-bold tracking-tighter text-white">Share details</h3>
      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="firstName" className="block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            maxLength={100}
            value={values.firstName}
            onChange={handleChange}
            placeholder="Jordan"
            className={`mt-2 ${fieldClass('firstName')}`}
          />
          {errors.firstName ? <p className="mt-2 text-xs text-red-400">{errors.firstName}</p> : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              maxLength={255}
              value={values.email}
              onChange={handleChange}
              placeholder="you@restaurant.com"
              className={`mt-2 ${fieldClass('email')}`}
            />
            {errors.email ? <p className="mt-2 text-xs text-red-400">{errors.email}</p> : null}
          </div>
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              maxLength={20}
              value={values.phone}
              onChange={handleChange}
              placeholder="+1 555 123 4567"
              className={`mt-2 ${fieldClass('phone')}`}
            />
            {errors.phone ? <p className="mt-2 text-xs text-red-400">{errors.phone}</p> : null}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={2000}
            value={values.message}
            onChange={handleChange}
            placeholder="Tell us what happened, dates, amounts, transaction IDs, merchant names and any suspicious addresses."
            className={`mt-2 resize-none ${fieldClass('message')}`}
          />
          {errors.message ? <p className="mt-2 text-xs text-red-400">{errors.message}</p> : null}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {status === 'loading' ? 'Submitting…' : 'Submit report'}
      </button>
      <p className="mt-4 text-xs leading-5 text-zinc-500">{report.privacyNote}</p>
    </form>
  );
}

function ReportSection() {
  return (
    <section id="report" className="scroll-mt-24 bg-zinc-950">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <Eyebrow>{report.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-bold leading-[1.12] tracking-tighter text-3xl md:text-5xl text-white">
              {report.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              {report.description}
            </p>
            <ol className="mt-8 space-y-4">
              {report.steps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-500/15 text-[11px] font-semibold text-emerald-400">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-6 text-zinc-400">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.08}>
            <ReportForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Help + CTA ---------------------------- */

function Help() {
  return (
    <section className="bg-black">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-24">
        <Reveal>
          <h2 className="font-bold leading-[1.12] tracking-tighter text-3xl md:text-4xl text-white">
            Need immediate assistance?
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {helpChannels.map((channel, i) => (
            <Reveal key={channel.title} delay={i * 0.06}>
              <div className="h-full rounded-[24px] border border-white/10 bg-white/[0.03] p-8">
                <h3 className="text-lg font-bold tracking-tighter text-white">
                  {channel.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{channel.body}</p>
                <a
                  href={channel.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:underline"
                >
                  {channel.linkLabel}
                  <ArrowRight size={15} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="bg-black text-white">
      <div className="container mx-auto px-4 py-20 text-center md:px-6 md:py-28">
        <Reveal>
          <h2 className="mx-auto max-w-[24ch] font-bold leading-[1.12] tracking-tighter text-3xl md:text-5xl">
            {closing.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            {closing.description}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={closing.primaryCta.href}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-85 sm:w-auto"
            >
              {closing.primaryCta.label}
            </a>
            <a
              href={closing.secondaryCta.href}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/40 hover:text-white sm:w-auto"
            >
              {closing.secondaryCta.label}
              <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function ReportFraudClient() {
  return (
    <main className="bg-black">
      <Hero />
      <Guidance />
      <ReportSection />
      <Help />
      <Closing />
    </main>
  );
}