// @ts-nocheck
import Link from 'next/link';
import { ArrowRight, Users, Megaphone, BarChart3, Puzzle, CheckCircle2 } from 'lucide-react';
import PartnerForm from './PartnerForm';
import { heroImage, programsImage, partnerTracks, integrationPartners } from './content';

export const metadata = {
  title: 'Partner Program',
  description:
    'Join the eatOS partner ecosystem as a referral partner, ambassador, reseller or integration partner and grow alongside restaurants of every size.',
};

const trackIcons = [Users, Megaphone, BarChart3, Puzzle];

export default function PartnersPage() {
  return (
    <div className="bg-white text-black">
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="site-container">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-black/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                <span className="h-1.5 w-1.5 rounded-full bg-black" />
                eatOS Partner Program
              </span>
              <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.06] tracking-tighter">
                It&rsquo;s you and eatOS,
                <br className="hidden sm:block" /> working together
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg">
                Join forces with us to help merchants run better restaurants. Through our partner
                program you get the tools to integrate with our ecosystem, and the resources to
                build, grow and scale your own business with eatOS.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact-sales"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  Become a partner
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/book-demo"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:border-black"
                >
                  Talk to our team
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[28px] bg-zinc-50 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.45)] md:rounded-[36px]">
                <div className="p-6 sm:p-8 md:p-10">
                  <img
                    src={heroImage}
                    alt="A restaurant operator and an eatOS partner shaking hands over a point-of-sale terminal"
                    width={1600}
                    height={1200}
                    className="w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership opportunities */}
      <section className="border-y border-zinc-200 bg-zinc-50 py-20 md:py-28">
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Explore partnership opportunities
            </h2>
            <p className="mt-4 text-base text-zinc-600">
              There are four main ways to partner with eatOS &mdash; how would you like to get
              started?
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnerTracks.map((track, i) => {
              const Icon = trackIcons[i];
              return (
                <div
                  key={track.title}
                  className="flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_30px_60px_-40px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-6 text-lg font-bold tracking-tighter">{track.title}</h3>
                  <p className="mt-3 flex-grow text-sm leading-relaxed text-zinc-600">
                    {track.body}
                  </p>
                  <Link
                    href="/contact-sales"
                    className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-black"
                  >
                    Get started
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awesome programs */}
      <section className="bg-black py-20 text-white md:py-28">
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Programs
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tighter">
              Built for businesses and individuals
            </h2>
          </div>

          <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[28px] bg-zinc-900 md:rounded-[36px]">
              <img
                src={programsImage}
                alt="Restaurant owner standing in their dining room"
                loading="lazy"
                width={1408}
                height={1200}
                className="h-full min-h-[280px] w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center rounded-[28px] bg-zinc-900 p-8 md:rounded-[36px] md:p-12">
              <h3 className="text-2xl font-bold tracking-tighter md:text-3xl">
                Introduce eatOS in a few simple steps
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-zinc-400 md:text-base">
                Getting approved to introduce eatOS products and services is a breeze. Refer your
                clients to eatOS, earn commission and stay informed while we take care of setup and
                training.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
                Accountants, bookkeepers, consultants and anyone else can earn valuable commissions
                without any obligation &mdash; simply by connecting restaurants with the right
                business solutions.
              </p>
              <Link
                href="/contact-sales"
                className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                Apply now
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Integration partners */}
      <section className="bg-white py-20 md:py-28">
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Meet our integration partners
            </h2>
            <p className="mt-4 text-base text-zinc-600">
              eatOS works with the hardware, payments and back-office platforms restaurants already
              rely on.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 sm:grid-cols-3 lg:grid-cols-4">
            {integrationPartners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center bg-white px-6 py-12 sm:py-14 transition-colors hover:bg-zinc-50"
              >
                <img
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  loading="lazy"
                  className="h-14 w-auto max-w-[210px] object-contain opacity-80 transition-opacity hover:opacity-100 sm:h-16 md:h-20"
                />
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm font-medium text-zinc-500">+ many more</p>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 py-20 md:py-28">
        <div className="site-container">
          {/* Why partner */}
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Partner program
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tighter md:text-4xl">
              Why partner with us?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 md:text-lg">
              Grow recurring revenue with a platform restaurants keep using, backed by a team that
              supports every merchant you bring on.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: 'Generous revenue share',
                body: 'Earn ongoing residuals on payments and software subscriptions. We believe in sharing the success.',
              },
              {
                title: 'Dedicated support',
                body: 'Get a dedicated partner manager and priority support for your merchants.',
              },
              {
                title: 'Co-marketing',
                body: 'Access marketing resources, leads and co-branded collateral to help you sell more.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-zinc-200 bg-white p-7 md:p-8"
              >
                <div className="h-fit w-fit rounded-xl bg-black/5 p-2">
                  <CheckCircle2 size={22} className="text-black" />
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tighter">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 md:text-base">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-zinc-200 bg-white px-8 py-10 text-center">
            <blockquote className="mx-auto max-w-3xl text-lg font-medium leading-relaxed md:text-xl">
              &ldquo;Partnering with eatOS has been the best decision for our agency. The product
              sells itself and the support is unmatched.&rdquo;
            </blockquote>
            <div className="mt-4 text-sm font-bold text-zinc-700">
              Sarah J., Digital Dining Solutions
            </div>
          </div>

          {/* Full width form */}
          <div className="mt-16 rounded-3xl border border-zinc-200 bg-white p-7 shadow-[0_40px_90px_-60px_rgba(0,0,0,0.4)] md:p-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold tracking-tighter md:text-3xl">
                Apply to become a partner
              </h3>
              <p className="mt-3 text-sm text-zinc-600 md:text-base">
                Tell us about your business and our partner team will follow up shortly.
              </p>
            </div>
            <div className="mx-auto mt-8 w-full max-w-3xl">
              <PartnerForm />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
