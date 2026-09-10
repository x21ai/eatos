// @ts-nocheck
'use client';

const columns = [
  {
    title: 'One vendor',
    body: 'Point of Sale, payments, kitchen, kiosk and reporting on one contract, one bill and one support line.',
  },
  {
    title: 'Published pricing',
    body: 'Flat card rate and plan pricing you can read before you sign, with no gateway or statement fees behind it.',
  },
  {
    title: 'Hardware ready to run',
    body: 'Devices arrive with your menu, roles and printers configured, so install is a shift, not a project.',
  },
  {
    title: 'Support through the rush',
    body: 'Real people, any time you need it, especially through the rush, with an operator who knows restaurants.',
  },
];

export function EconomicsGradientSection() {
  return (
    <section className="bg-gradient-to-br from-[#d70480] via-[#8b0356] to-[#2b0f5c] py-20 md:py-28">
      <div className="site-container">
        <h2 className="max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
          Better restaurant economics.
          <br />
          <span className="text-white/70">Without rebuilding your floor.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/80 md:text-lg">
          Consolidating on eatOS removes the overlap between the tools most restaurants already pay
          for, and puts the savings back into service.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          {columns.map((column) => (
            <div key={column.title} className="border-t border-white/25 pt-5">
              <h3 className="text-lg font-semibold tracking-tight text-white">{column.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{column.body}</p>
            </div>
          ))}
        </div>

        <a
          href="/pricing"
          className="mt-12 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
        >
          See pricing
        </a>
      </div>
    </section>
  );
}
