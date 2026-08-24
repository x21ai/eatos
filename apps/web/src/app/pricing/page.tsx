// @ts-nocheck

export const metadata = {
  title: 'Pricing',
  description:
    'Simple restaurant Point of Sale pricing. $0 upfront hardware cost at 2.99%+20¢ per tap, dip or swipe, or build your own bundle at 2.39%+15¢. Send us your quote and we will beat it.',
  openGraph: {
    title: 'eatOS Pricing - Simple Pricing',
    description:
      'No hardware to purchase, no monthly SaaS fees. Upload your statement or quote and we will beat it.',
  },
};

const QUOTE_BULLETS_LEFT = [
  'Low Monthly Software or SaaS Fees',
  'Lowest Payment Processing Rates in the Industry',
  'NO Setup and Maintenance Costs',
  'Live Training and Setup',
];

const QUOTE_BULLETS_RIGHT = [
  'World-Class Hardware, Lowest Prices',
  '24x7, 365 Days Live Customer Support',
  'Get Started in 24 hours.',
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#efefef] font-sans text-black">
      <section className="pt-40 pb-24">
        <div className="site-container">
          <h1 className="mb-8 text-4xl font-bold tracking-tighter md:text-5xl">Simple Pricing</h1>

          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="flex items-center rounded-xl bg-white p-8 shadow-sm md:p-10">
              <p className="text-2xl leading-snug tracking-tight md:text-3xl">
                Don&apos;t Pay More, <span className="font-bold">Eliminate Complex Pricing</span> and
                Simplify for the Future.
              </p>
            </div>

            <RateCard
              title="$0 Upfront Hardware Cost"
              rate="2.99%+20¢"
              subline={<>No Hardware to Purchase,<br />No Monthly SaaS Fees*</>}
              finePrint="*Restaurant qualification criteria applies. Pricing is per location per Point of Sale, excluding accessories."
            />

            <RateCard
              title="Build your Own Bundle"
              rate="2.39%+15¢"
              subline="Customize Your Hardware*"
              finePrint="*Pricing is per location cost. Terms apply."
            />
          </div>

          {/* Row 2 */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="flex items-center rounded-xl bg-white p-8 shadow-sm md:p-10">
              <p className="text-2xl leading-snug tracking-tight md:text-3xl">
                Discuss your requirements with our team, upload your quote, statement and bill, it&apos;s
                that simple, <span className="font-bold">we will beat it</span>.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow-sm lg:col-span-2">
              <div className="py-6 text-center">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">YOUR PRICE</h2>
              </div>
              <div className="bg-black px-6 py-10 text-white md:px-12">
                <h3 className="text-center text-xl font-bold tracking-tight md:text-2xl">
                  Any Point of Sale or Payment Processing Quote
                </h3>
                <p className="mt-3 text-center text-base text-white/90 md:text-lg">
                  Upload last three months statements or a quote.
                </p>

                <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                  <ul className="space-y-3">
                    {QUOTE_BULLETS_LEFT.map((item) => (
                      <Bullet key={item} text={item} />
                    ))}
                  </ul>
                  <ul className="space-y-3">
                    {QUOTE_BULLETS_RIGHT.map((item) => (
                      <Bullet key={item} text={item} />
                    ))}
                  </ul>
                </div>

                <div className="mt-10 text-center">
                  <a
                    href="/book-demo"
                    className="inline-block rounded-md bg-white px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-white/90"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-black/10 py-24">
        <div className="site-container max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter">Questions?</h2>
          <div className="space-y-8">
            <FaqItem
              q="Do I need to sign a long-term contract?"
              a="No. All our plans are month-to-month. You can cancel at any time with no penalties."
            />
            <FaqItem
              q="Does it work with my existing hardware?"
              a="Likely yes. eatOS runs on iPads and most Android tablets. Contact us to check specific compatibility."
            />
            <FaqItem
              q="What are the processing rates?"
              a="We offer several pricing models: flat rate, interchange plus, and custom rates for high volume merchants. We will look at your current statements and recommend the option that best fits your need and costs you less."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function RateCard({ title, rate, subline, finePrint }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="bg-black px-6 py-5 text-center">
        <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">{title}</h2>
      </div>
      <div className="flex flex-1 flex-col px-6 py-10 text-center">
        <p className="text-2xl font-bold tracking-tight md:text-3xl">{rate}</p>
        <p className="text-2xl font-bold tracking-tight md:text-3xl">per tap, dip or swipe</p>
        <p className="mt-4 text-sm font-medium text-black/80">{subline}</p>
        <div className="mt-6">
          <a
            href="/book-demo"
            className="inline-block rounded-md bg-black px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-black/85"
          >
            Book a Demo
          </a>
        </div>
        <p className="mt-auto pt-8 text-[11px] leading-relaxed text-black/60">{finePrint}</p>
      </div>
    </div>
  );
}

function Bullet({ text }) {
  return (
    <li className="flex gap-3 text-base leading-snug md:text-lg">
      <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
      <span>{text}</span>
    </li>
  );
}

function FaqItem({ q, a }) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-bold">{q}</h3>
      <p className="leading-relaxed text-black/60">{a}</p>
    </div>
  );
}
