// @ts-nocheck
'use client';

import {
  Check,
  CreditCard,
  Layers,
  Percent,
  Receipt,
  ShieldCheck,
  Smartphone,
  WifiOff,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  features as tapFeatures,
  heroVideo,
  places,
  requirements,
  images,
  stats,
  steps,
} from '../tap-to-pay/content';

const featureIcons = { CreditCard, ShieldCheck, Percent, WifiOff, Receipt, Layers };

const rise = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export default function TapToPaySection() {
  return (
    <section id="tap-to-pay" className="relative overflow-hidden border-t border-white/5 py-20 md:py-28">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none opacity-40" />

      <div className="site-container relative z-10">
        <motion.div {...rise} className="max-w-3xl">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
            <Smartphone size={28} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-400 mb-4">
            Tap to Pay
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-5">
            Contactless payments on the phone your team already carries
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Take cards, wallets and watches during the order, tableside, at the counter or curbside,
            with no extra terminals to buy and no separate reporting to reconcile.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              {...rise}
              transition={{ delay: index * 0.06 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-2xl md:text-3xl font-bold tracking-tighter text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div {...rise} className="space-y-8">
            {steps.map((item) => (
              <div key={item.step} className="flex gap-5">
                <span className="text-sm font-bold text-blue-400 pt-1">{item.step}</span>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold tracking-tighter">{item.title}</h3>
                  <p className="mt-2 text-white/80 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            {...rise}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
          >
            <video
              src={heroVideo}
              poster={images.poster}
              className="aspect-[4/3] w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tapFeatures.map((feature, index) => {
            const Icon = featureIcons[feature.icon] || CreditCard;
            return (
              <motion.div
                key={feature.title}
                {...rise}
                transition={{ delay: index * 0.06 }}
                className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${feature.iconBg} ${feature.iconBorder} ${feature.iconColor}`}
                >
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold tracking-tighter">{feature.title}</h3>
                <p className="mt-3 text-white/80 leading-relaxed">{feature.body}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
          <motion.div {...rise} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="text-2xl font-bold tracking-tighter mb-6">Where teams use it</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {places.map((place) => (
                <div key={place.title}>
                  <p className="font-semibold text-white">{place.title}</p>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{place.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...rise} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="text-2xl font-bold tracking-tighter mb-6">What you need</h3>
            <ul className="space-y-3">
              {requirements.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/80">
                  <Check size={18} className="mt-0.5 shrink-0 text-blue-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
