// @ts-nocheck
'use client';

const points = [
  {
    title: 'Service keeps running when the network does not',
    body: 'edgeOS holds orders and payments locally, then syncs the moment the connection returns, so a dropped line never becomes a closed register.',
  },
  {
    title: 'Every product shares one menu and one ledger',
    body: 'Change a price once and counters, handhelds, kiosks and online ordering follow, with the same check landing in the same reporting.',
  },
  {
    title: 'Onboarding is done with you, not sent to you',
    body: 'Menus are built, hardware arrives configured, and staff are trained before the first live shift, with support that answers through the rush.',
  },
];

export function ProofSection() {
  return (
    <section className="bg-zinc-50 py-20 text-zinc-900 md:py-28">
      <div className="site-container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Proof, not promises
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              From a floor
              <br />
              that never pauses.
            </h2>
          </div>
          <p className="self-end text-[15px] leading-relaxed text-zinc-600 md:text-lg">
            Restaurants do not get a maintenance window. The platform is built for the parts of
            service that break first: connectivity, menu changes and the handover between shifts.
          </p>
        </div>

        <div className="mt-12 divide-y divide-zinc-200 border-t border-zinc-200 md:mt-16">
          {points.map((point, i) => (
            <div
              key={point.title}
              className="grid grid-cols-1 gap-3 py-7 md:grid-cols-12 md:gap-8"
            >
              <div
                className="text-sm font-semibold md:col-span-1"
                style={{ color: 'var(--brand, #d70480)' }}
              >
                0{i + 1}
              </div>
              <h3 className="text-lg font-semibold leading-snug tracking-tight md:col-span-5 md:text-xl">
                {point.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-zinc-600 md:col-span-6">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
