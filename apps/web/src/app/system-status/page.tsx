// @ts-nocheck
import { systems, statusMeta, overallStatus, LAST_UPDATED } from './systems';

export const metadata = {
  title: 'System Status',
  description:
    'Live status of eatOS services including Point of Sale, Dashboard, Online Ordering, Payments, and API. Real-time uptime and incident information.',
  openGraph: {
    title: 'eatOS System Status',
    description:
      'Live status of eatOS services including Point of Sale, Dashboard, Online Ordering, Payments, and API.',
  },
};

const bannerCopy = {
  operational: 'All Systems Operational',
  maintenance: 'Scheduled Maintenance in Progress',
  degraded: 'Some Systems Experiencing Degraded Performance',
  outage: 'Major Outage Affecting Some Systems',
};

export default function SystemStatusPage() {
  const overall = overallStatus(systems);
  const meta = statusMeta[overall];
  const updated = new Date(LAST_UPDATED).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="site-container pt-36 pb-12 md:pt-44 md:pb-16">
        <p className="text-xs md:text-sm uppercase tracking-widest text-gray-500 font-semibold mb-6">
          eatOS System Status
        </p>
        <div className="flex items-center gap-4">
          <span className={`relative flex h-4 w-4 md:h-5 md:w-5`}>
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 ${meta.dot}`}
            />
            <span
              className={`relative inline-flex rounded-full h-4 w-4 md:h-5 md:w-5 ${meta.dot}`}
            />
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
            {bannerCopy[overall]}
          </h1>
        </div>
        <p className="mt-4 text-sm text-gray-400">Last updated: {updated}</p>
      </section>

      {/* Systems list */}
      <section className="site-container pb-16 md:pb-24">
        <div className="rounded-2xl border border-white/10 divide-y divide-white/10 overflow-hidden bg-white/[0.02]">
          {systems.map((s) => {
            const m = statusMeta[s.status];
            return (
              <div
                key={s.name}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-5 md:px-8 py-5 hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${m.dot}`} />
                  <span className="font-semibold text-base md:text-lg truncate">
                    {s.name}
                  </span>
                </div>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors truncate sm:max-w-[240px]"
                >
                  {s.url.replace('https://', '')}
                </a>
                <div className="flex items-center gap-6 sm:ml-auto">
                  <span className="text-sm text-gray-400">
                    Uptime <span className="text-white font-medium">{s.uptime}</span>
                  </span>
                  <span className={`text-sm font-medium ${m.text}`}>{m.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {Object.entries(statusMeta).map(([key, m]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${m.dot}`} />
              <span className="text-xs text-gray-400">{m.label}</span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-gray-500">
          Questions about an incident? Contact us at{' '}
          <a
            href="mailto:support@eatos.com"
            className="text-white underline underline-offset-4 hover:text-gray-300"
          >
            support@eatos.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
