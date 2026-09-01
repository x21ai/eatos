// @ts-nocheck
'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Clock,
  LifeBuoy,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Route,
  Sparkles,
  UserRound,
  Wand2,
} from 'lucide-react';
import SupportSearch from './SupportSearch';
import supportTeam from '@/assets/support/support-team.jpg.asset.json';
import deviceLineup from '@/assets/point-of-purchase-terminals-v2.png.asset.json';
import { openAgent } from '../components/agent/agentBus';
import { agentCapabilities } from '../components/agent/knowledge';
import { starterQuestions } from '../components/agent/retrieval';
import {
  articleHref,
  articles,
  categories,
  categoryHref,
  popularArticles,
  supportChannels,
  supportHero,
  supportPillars,
  supportPromise,
  supportSteps,
} from './content';

const channelIcons = {
  chat: MessageSquare,
  mail: Mail,
  whatsapp: MessageCircle,
  phone: Phone,
};

const capabilityIcons = {
  answer: Sparkles,
  triage: Route,
  act: Wand2,
};

const pillarIcons = {
  award: Award,
  clock: Clock,
  user: UserRound,
};

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CategoryCard({ category, index }) {
  return (
    <motion.a
      href={categoryHref(category.slug)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.04 }}
      className="group flex min-w-0 flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/30"
    >
      <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/12 bg-white/[0.05] text-brand-on-dark">
        <BookOpen size={18} aria-hidden />
      </span>
      <h3 className="mt-5 text-lg font-bold tracking-tighter text-white transition-colors group-hover:text-brand-on-dark sm:text-xl">
        {category.title}
      </h3>
      {category.description ? (
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">{category.description}</p>
      ) : null}
      <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {category.articleCount} {category.articleCount === 1 ? 'article' : 'articles'}
        <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" aria-hidden />
      </span>
    </motion.a>
  );
}

function AgentComposer() {
  const [question, setQuestion] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        openAgent({ question, context: 'Help center' });
        setQuestion('');
      }}
      className="w-full max-w-2xl"
    >
      <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3.5 focus-within:border-white/40">
        <Sparkles size={18} className="shrink-0 text-brand-on-dark" aria-hidden />
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask anything: reset a PIN, printer offline, add a menu item"
          aria-label="Ask the eatOS support agent"
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500 sm:text-base"
        />
        <button
          type="submit"
          className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black transition-colors hover:bg-zinc-200 sm:inline-flex"
        >
          Ask
          <ArrowRight size={13} aria-hidden />
        </button>
        <button
          type="submit"
          aria-label="Ask the support agent"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-black sm:hidden"
        >
          <ArrowRight size={15} />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {starterQuestions.slice(0, 3).map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => openAgent({ question: preset, context: 'Help center' })}
            className="rounded-full border border-white/12 bg-white/[0.02] px-3.5 py-1.5 text-left text-[11px] font-semibold text-zinc-300 transition-colors hover:border-white/35 hover:text-white"
          >
            {preset}
          </button>
        ))}
      </div>
    </form>
  );
}

export default function SupportHomeClient() {
  return (
    <div className="bg-black text-zinc-200">
      {/* Hero: the agent is the front door */}
      <section className="relative overflow-hidden bg-black pt-[128px] md:pt-[176px] pb-14 md:pb-20">
        <div className="site-container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              className="min-w-0"
            >
              <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-on-dark">
                <span className="relative grid h-2 w-2 place-items-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-brand-on-dark/60" />
                  <span className="h-2 w-2 rounded-full bg-brand-on-dark" />
                </span>
                AI agent online 24/7
              </p>
              <h1 className="mt-5 text-3xl font-bold leading-[1.05] tracking-tighter text-white sm:text-4xl md:text-5xl">
                Support that resolves, not just responds queries.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
                Ask the eatOS support agent in plain language. It answers from {articles.length} help
                articles, shows you the exact guide it used, and hands you to a specialist with your
                details already attached when a person is faster.
              </p>
              <div className="mt-8">
                <AgentComposer />
              </div>
              <p className="mt-4 text-xs text-zinc-500">
                Grounded in {articles.length} articles across {categories.length} categories. Prefer to
                browse? Everything is still below.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="relative min-w-0 overflow-hidden rounded-[28px] border border-white/10"
            >
              <img
                src={supportTeam.url}
                alt="eatOS support specialists wearing headsets at their workstations"
                width={1600}
                height={912}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/12 bg-black/70 p-4 backdrop-blur">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-on-dark">
                  Agent first, humans always
                </p>
                <p className="mt-2 text-[13px] leading-5 text-zinc-300">
                  The agent handles the answer. The same specialists who install eatOS in live
                  restaurants take it from there.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What the agent does */}
      <section className="border-t border-white/10 bg-zinc-950 py-14 md:py-20">
        <div className="site-container">
          <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl">
            An agent that answers, triages and acts
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            Three tiers, each stated plainly so you know exactly what happens when you ask.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {agentCapabilities.map((capability, index) => {
              const Icon = capabilityIcons[capability.id] ?? Sparkles;
              return (
                <Reveal key={capability.id} delay={Math.min(index, 3) * 0.06}>
                  <div className="flex h-full min-w-0 flex-col rounded-3xl border border-white/10 bg-black p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-white/[0.05] text-brand-on-dark">
                        <Icon size={19} aria-hidden />
                      </span>
                      <span className="rounded-full border border-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                        {capability.status}
                      </span>
                    </div>
                    <span className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-on-dark">
                      {capability.tier}
                    </span>
                    <h3 className="mt-2 text-lg font-bold tracking-tight text-white sm:text-xl">
                      {capability.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{capability.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => openAgent({ context: 'Help center' })}
            className="mt-8 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            Start with the agent
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Escalation channels */}
      <section className="border-t border-white/10 bg-black py-14 md:py-20">
        <div className="site-container">
          <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl">
            Where the agent hands you off
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            Triage picks the channel that matches the severity and carries your context into it. You can
            also go straight to any of them.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {supportChannels.map((channel, index) => {
              const Icon = channelIcons[channel.icon] ?? LifeBuoy;
              return (
                <motion.a
                  key={channel.id}
                  href={channel.href}
                  target={channel.external ? '_blank' : undefined}
                  rel={channel.external ? 'noreferrer' : undefined}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: Math.min(index, 4) * 0.05 }}
                  className="group flex min-w-0 flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/30"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-white/[0.05] text-brand-on-dark">
                    <Icon size={19} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-base font-bold tracking-tight text-white transition-colors group-hover:text-brand-on-dark sm:text-lg">
                    {channel.label}
                  </h3>
                  <p className="mt-2 break-words text-sm leading-6 text-zinc-300">{channel.detail}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    {channel.meta}
                    <ArrowUpRight
                      size={13}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Get started in 3 steps */}
      <section className="border-t border-white/10 bg-black py-16 md:py-20">
        <div className="site-container">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl">
              Get started in three steps
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              From choosing a plan to serving your first ticket, with a specialist alongside you the
              whole way.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {supportSteps.map((step, index) => (
              <Reveal key={step.number} delay={Math.min(index, 3) * 0.06}>
                <div className="flex h-full min-w-0 flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                  <span className="text-3xl font-bold tracking-tighter text-brand-on-dark">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-white sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{step.body}</p>
                  <a
                    href={step.href}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:text-brand-on-dark"
                  >
                    {step.linkLabel}
                    <ArrowRight size={14} aria-hidden />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Popular articles */}
      <section className="border-t border-white/10 bg-zinc-950 py-16 md:py-20">
        <div className="site-container">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl">
                Most read guides
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                The articles our customers open most, from resetting an employee PIN to adding a new
                location.
              </p>
            </div>
            <div className="w-full md:max-w-md">
              <SupportSearch placeholder="Search all support articles" />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularArticles.map((article, index) => (
              <motion.a
                key={article.slug}
                href={articleHref(article.slug)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.04 }}
                className="group flex min-w-0 flex-col rounded-3xl border border-white/10 bg-black p-6 transition-colors hover:border-white/30"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-on-dark">
                  {article.categoryTitle}
                </span>
                <h3 className="mt-3 text-base font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-brand-on-dark sm:text-lg">
                  {article.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-zinc-400">
                  {article.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {article.readMinutes} min read
                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-white/10 bg-black py-16 md:py-24">
        <div className="site-container">
          <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl">
            Browse all categories
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <CategoryCard key={category.slug} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Personal team of experts */}
      <section className="border-t border-white/10 bg-zinc-950 py-16 md:py-20">
        <div className="site-container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="min-w-0">
              <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl">
                Your personal team of experts
              </h2>
              <p className="mt-4 text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
                {supportPromise.body}
              </p>
              <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {supportPromise.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-black p-5">
                    <dt className="text-2xl font-bold tracking-tighter text-brand-on-dark">
                      {stat.value}
                    </dt>
                    <dd className="mt-2 text-xs leading-5 text-zinc-400">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.08} className="min-w-0">
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black">
                <img
                  src={deviceLineup.url}
                  alt="eatOS terminals, handheld and kiosk hardware lineup"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-white/10 bg-black py-16 md:py-20">
        <div className="site-container">
          <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl">
            Advanced technical support
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {supportPillars.map((pillar, index) => {
              const Icon = pillarIcons[pillar.icon] ?? LifeBuoy;
              return (
                <Reveal key={pillar.title} delay={Math.min(index, 3) * 0.06}>
                  <div className="flex h-full min-w-0 flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-white/[0.05] text-brand-on-dark">
                      <Icon size={19} aria-hidden />
                    </span>
                    <h3 className="mt-5 text-lg font-bold leading-snug tracking-tight text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">{pillar.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-white/10 bg-zinc-950 py-16 md:py-20">
        <div className="site-container">
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-white/10 bg-black p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="min-w-0">
              <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/12 bg-white/[0.05] text-brand-on-dark">
                <LifeBuoy size={18} aria-hidden />
              </span>
              <h2 className="mt-5 text-xl font-bold tracking-tighter text-white sm:text-2xl">
                Still need a hand?
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
                Our support team is available around the clock. Check live service health, or reach out we will get you back up & running.
              </p>
            </div>
            <div className="flex shrink-0 flex-nowrap items-center gap-2 sm:gap-3">

              <a
                href="/contactsales"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                Contact support
                <ArrowRight size={16} />
              </a>
              <a
                href="/book-demo"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                Book a demo
              </a>
              <a
                href="/system-status"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                System status
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
