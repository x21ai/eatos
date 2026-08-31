// @ts-nocheck
'use client';

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
  UserRound,
} from 'lucide-react';
import SupportSearch from './SupportSearch';
import supportTeam from '@/assets/support/support-team.jpg.asset.json';
import deviceLineup from '@/assets/point-of-purchase-terminals-v2.png.asset.json';
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

export default function SupportHomeClient() {
  return (
    <div className="bg-black text-zinc-200">
      {/* Hero */}
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
                Support team online
              </p>
              <h1 className="mt-5 text-3xl font-bold leading-[1.05] tracking-tighter text-white sm:text-4xl md:text-5xl">
                24/7 professional assistance for everything you run on eatOS
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
                {supportHero.intro}
              </p>
              <div className="mt-8">
                <SupportSearch />
              </div>
              <p className="mt-4 text-xs text-zinc-500">
                {articles.length} articles across {categories.length} categories, updated as the
                platform ships.
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact channels */}
      <section className="border-t border-white/10 bg-zinc-950 py-14 md:py-20">
        <div className="site-container">
          <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl">
            Reach a real specialist
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            Four ways to reach us, all staffed by the same team that installs and runs eatOS in live
            restaurants.
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
                  className="group flex min-w-0 flex-col rounded-3xl border border-white/10 bg-black p-6 transition-colors hover:border-white/30"
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
              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
                Our support team is available around the clock. Check live service health, or reach out
                and we will get you back up and running.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
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
