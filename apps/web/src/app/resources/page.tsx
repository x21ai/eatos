// @ts-nocheck
'use client';

import {
  Activity,
  BookOpen,
  CalendarCheck,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  LifeBuoy,
  Tag,
} from 'lucide-react';
import { motion } from 'motion/react';

const resourceLinks = [
  {
    title: 'Pricing',
    href: '/pricing',
    Icon: Tag,
    tagline: 'Processing options, plans and what each setup includes.',
  },
  {
    title: 'Blog',
    href: '/blog',
    Icon: BookOpen,
    tagline: 'Operating guides and product news for restaurant teams.',
  },
  {
    title: 'Brochures',
    href: '/brochures',
    Icon: FileText,
    tagline: 'One brochure for every product in eatOS restaurant technology cloud.',
  },
  {
    title: 'Media Kit',
    href: '/media-kit',
    Icon: ImageIcon,
    tagline: 'Brand guidelines, logos, icons and approved eatOS imagery.',
  },
  {
    title: 'Book a Demo',
    href: '/bookademo',
    Icon: CalendarCheck,
    tagline: 'Pick a time and see the platform running on real hardware.',
  },
  {
    title: 'Help Center',
    href: '/support',
    Icon: LifeBuoy,
    tagline: 'Setup guides, troubleshooting and answers by category.',
  },
  {
    title: 'System Status',
    href: '/system-status',
    Icon: Activity,
    tagline: 'Live availability for payments, sync and reporting services.',
  },
  {
    title: 'Dashboard',
    href: 'https://dashboard.eatos.com/#/account/login',
    Icon: LayoutDashboard,
    tagline: 'Sign in to manage menus, staff, reporting and settings.',
    external: true,
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <section className="relative pt-[128px] md:pt-[176px] pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-soft via-black to-black pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-soft rounded-full blur-[120px] pointer-events-none" />

        <div className="site-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium mb-8 text-brand-on-dark"
          >
            <LifeBuoy size={14} />
            <span>Resources</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Everything you need, <br />
            <span className="text-brand-on-dark">in one place.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto leading-relaxed"
          >
            Pricing, brochures, guides, live status and your dashboard login.
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourceLinks.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-white/25"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-brand-on-dark">
                  <item.Icon size={24} />
                </div>
                <h2 className="text-xl font-bold tracking-tight mb-2">{item.title}</h2>
                <p className="text-white/75 text-[15px] leading-relaxed mb-6">{item.tagline}</p>
                <span className="flex items-center gap-1 text-sm font-semibold text-white">
                  Open
                  <ChevronRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="site-container">
          <div className="rounded-[3rem] border border-white/10 bg-white/[0.03] p-12 md:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                Still deciding?
              </h2>
              <p className="text-xl text-white/80">
                Book a walkthrough and we will answer the specifics for your concept.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/bookademo"
                className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform text-center"
              >
                Book a Demo
              </a>
              <a
                href="/support"
                className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors text-center"
              >
                Help Center
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
