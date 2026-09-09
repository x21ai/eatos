// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';

const statusMeta = {
  operational: { label: 'Operational', dot: 'bg-emerald-400', text: 'text-emerald-400' },
  degraded: { label: 'Degraded', dot: 'bg-amber-400', text: 'text-amber-400' },
  outage: { label: 'Outage', dot: 'bg-red-400', text: 'text-red-400' },
  maintenance: { label: 'Maintenance', dot: 'bg-sky-400', text: 'text-sky-400' },
};

export default function StatusClient() {
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/status')
      .then((r) => r.json())
      .then((j) => {
        if (j.error) throw new Error(j.message);
        setPayload(j.data);
      })
      .catch((err) => setError(err.message || 'Failed to load status'));
  }, []);

  const flat = payload?.groups?.flatMap((g) => g.systems) || [];
  const overall = flat.some((s) => s.status === 'outage')
    ? 'outage'
    : flat.some((s) => s.status === 'degraded')
      ? 'degraded'
      : flat.some((s) => s.status === 'maintenance')
        ? 'maintenance'
        : 'operational';
  const meta = statusMeta[overall];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="site-container pt-[128px] md:pt-[176px] pb-16">
        <p className="text-xs tracking-widest text-gray-500 font-semibold mb-6">eatOS SYSTEM STATUS</p>
        <div className="flex items-center gap-4">
          <span className={`relative flex h-4 w-4`}>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 ${meta.dot}`} />
            <span className={`relative inline-flex rounded-full h-4 w-4 ${meta.dot}`} />
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">{meta.label}</h1>
        </div>
        {error ? <p className="mt-6 text-sm text-red-400">{error}</p> : null}
        {!payload && !error ? <p className="mt-6 text-sm text-zinc-400">Loading live status…</p> : null}

        <div className="mt-12 space-y-8">
          {(payload?.groups || []).map((group) => (
            <div key={group.name} className="rounded-3xl border border-white/10 overflow-hidden">
              <div className="bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {group.name}
              </div>
              <ul>
                {group.systems.map((system) => {
                  const s = statusMeta[system.status] || statusMeta.operational;
                  return (
                    <li
                      key={system.id}
                      className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4"
                    >
                      <div>
                        <p className="font-medium text-white">{system.name}</p>
                        {system.description ? (
                          <p className="mt-1 text-xs text-zinc-500">{system.description}</p>
                        ) : null}
                      </div>
                      <span className={`text-sm font-semibold ${s.text}`}>{s.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
