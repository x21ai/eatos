// @ts-nocheck
'use client';

import {
  Building2,
  ChevronRight,
  Handshake,
  Newspaper,
  Scale,
  ShieldAlert,
  Star,
  Users,
  Mail,
} from 'lucide-react';
import { motion } from 'motion/react';

const companyLinks = [
  {
    title: 'About Us',
    href: '/about-eatos',
    Icon: Building2,
    tagline: 'Why we build restaurant technology that gets out of the way.',
  },
  {
    title: 'Careers',
    href: '/work-with-us',
    Icon: Users,
    tagline: 'Open roles for people who want to ship work restaurants rely on.',
  },
  {
    title: 'Partners',
    href: '/partners',
    Icon: Handshake,
    tagline: 'Referral, ambassador and reseller programs with real support.',
  },
  {
    title: 'Customers',
    href: '/customers',
    Icon: Star,
    tagline: 'Operators running service on eatOS, in their own words.',
  },
  {
    title: 'Contact Sales',
    href: '/contact',
    Icon: Mail,
    tagline: 'Talk to a specialist about your concept and locations.',
  },
  {
    title: 'Report Fraud',
    href: '/report-fraud',
    Icon: ShieldAlert,
    tagline: 'Report suspicious activity or impersonation attempts.',
  },
  {
    title: 'Newsroom',
    href: '/blog',
    Icon: Newspaper,
    tagline: 'Announcements, product news and industry perspective.',
  },
  {
    title: 'Comparison',
    href: '/comparison',
    Icon: Scale,
    tagline: 'How eatOS lines up against other restaurant platforms.',
  },
];

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <section className="relative page-hero-top pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-soft via-black to-black pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-soft rounded-full blur-[120px] pointer-events-none" />

        <div className="site-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium mb-8 text-brand-on-dark"
          >
            <Building2 size={14} />
            <span>Company</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Restaurants made <br />
            <span className="text-brand-on-dark">simple.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto leading-relaxed"
          >
            Who we are, who we work with and how to reach us.
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyLinks.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
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
                  Visit
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
                Let us talk about your restaurant.
              </h2>
              <p className="text-xl text-white/80">
                A short call is usually enough to know whether we are the right fit.
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
                href="/contact"
                className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors text-center"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
