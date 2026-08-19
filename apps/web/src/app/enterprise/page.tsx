// @ts-nocheck
'use client';

import {
  Building2,
  Globe,
  Lock,
  ArrowRight,
  TrendingUp,
  Activity,
  Server,
  ChevronLeft,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function EnterprisePage() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-indigo-500/50">
      {/* Hero Section */}
      <section className="pt-48 pb-32 relative overflow-hidden">
        <div className="site-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Building2 size={12} />
            Global Scale
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight"
          >
            Control at <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient">
              Light Speed.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            The operating system for multi-location brands. Real-time telemetry, centralized
            configuration, and infinite scalability.
          </motion.p>
        </div>

        {/* Dashboard Visualization */}
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="perspective-[2000px]"
          >
            <div className="bg-black border border-white/10 rounded-t-3xl shadow-2xl overflow-hidden relative">
              {/* Header Bar */}
              <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-zinc-900/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="ml-4 text-xs font-mono text-gray-500">
                  admin.eatos.com/dashboard/global
                </div>
              </div>

              {/* Dashboard Grid */}
              <div className="p-8 grid grid-cols-4 gap-6 bg-zinc-950/80 backdrop-blur-xl h-[600px]">
                {/* Map Widget */}
                <div className="col-span-3 bg-zinc-900/50 rounded-2xl border border-white/5 p-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 to-transparent opacity-50" />
                  <div className="relative z-10 flex justify-between">
                    <div>
                      <div className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-1">
                        Live Locations
                      </div>
                      <div className="text-4xl font-bold text-white">4,281</div>
                    </div>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1 text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded">
                        <Activity size={12} /> 99.99% UP
                      </span>
                    </div>
                  </div>
                  {/* Abstract Map Dots */}
                  <div className="mt-12 grid grid-cols-12 gap-4 opacity-30">
                    {[...Array(48)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full ${i % 4 === 0 ? 'bg-indigo-500' : 'bg-white/10'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Stats Widget */}
                <div className="col-span-1 bg-zinc-900/50 rounded-2xl border border-white/5 p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-1">
                      Revenue (24h)
                    </div>
                    <div className="text-2xl font-bold text-white">$2.4M</div>
                  </div>
                  <div className="h-32 flex items-end gap-1">
                    {[30, 50, 45, 80, 60, 90, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-indigo-500/40 rounded-t-sm"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* List Widget */}
                <div className="col-span-2 bg-zinc-900/50 rounded-2xl border border-white/5 p-6">
                  <div className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-4">
                    System Alerts
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                      <span className="text-sm text-gray-300">High Latency: US-East-1</span>
                      <span className="ml-auto text-xs text-gray-600 font-mono">2m ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm text-gray-300">Menu Sync Completed: EMEA</span>
                      <span className="ml-auto text-xs text-gray-600 font-mono">5m ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-sm text-gray-300">New Deployment: v2.4.0</span>
                      <span className="ml-auto text-xs text-gray-600 font-mono">1h ago</span>
                    </div>
                  </div>
                </div>

                {/* Info Widget */}
                <div className="col-span-2 bg-zinc-900/50 rounded-2xl border border-white/5 p-6 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent" />
                  <div className="relative z-10 text-center">
                    <Server size={48} className="mx-auto text-purple-500 mb-4" />
                    <div className="text-2xl font-bold">Dedicated Infrastructure</div>
                    <p className="text-gray-500 text-sm mt-2">
                      Single-tenant database architecture available.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Feature
              icon={Globe}
              title="Unified Command"
              desc="Push menu updates, price changes, and promotions to all locations instantly. Or schedule them for later."
            />
            <Feature
              icon={Lock}
              title="Enterprise Security"
              desc="SSO (SAML/OIDC), Role-Based Access Control, and detailed audit logs for every action taken."
            />
            <Feature
              icon={TrendingUp}
              title="Data Warehouse"
              desc="Direct SQL access to your data. Connect Tableau, Looker, or PowerBI without ETL pipelines."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="group">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-gray-300 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}
