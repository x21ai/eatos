// @ts-nocheck
import { ArrowRight, Users, Megaphone, BarChart3, Puzzle, CheckCircle2 } from 'lucide-react';
import PartnerForm from './PartnerForm';
import { heroImage, programsImage, partnerTracks, integrationPartners } from './content';

export const metadata = {
  alternates: { canonical: '/partners' },
  title: 'Partner Program',
  description:
    'Join the eatOS partner ecosystem as a referral partner, ambassador, reseller or integration partner and grow alongside restaurants of every size.',
};

const trackIcons = [Users, Megaphone, BarChart3, Puzzle];

export default function PartnersPage() {
  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="pt-[128px] md:pt-[176px] pb-16 md:pb-24">
        <div className="site-container">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-on-dark" />
                eatOS Partner Program
              </span>
              <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.06] tracking-tighter">
                It&rsquo;s you and eatOS,
                <br className="hidden sm:block" /> working together
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                Join forces with us to help merchants run better restaurants. Through our partner
                program you get the tools to integrate with our ecosystem, and the resources to
                build, grow and scale your own business with eatOS.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
                >
                  Become a partner
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/bookademo"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Talk to our team
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 md:rounded-[36px]">
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
      <section className="border-y border-white/10 py-20 md:py-28">
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Explore partnership opportunities
            </h2>
            <p className="mt-4 text-base text-white/70">
              There are four main ways to partner with eatOS, how would you like to get started?
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnerTracks.map((track, i) => {
              const Icon = trackIcons[i];
              return (
                <div
                  key={track.title}
                  className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-7 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-6 text-lg font-bold tracking-tighter">{track.title}</h3>
                  <p className="mt-3 flex-grow text-sm leading-relaxed text-white/70">
                    {track.body}
                  </p>
                  <a
                    href="/bookademo"
                    className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-white"
                  >
                    Book a Demo
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awesome programs */}
      <section className="py-20 md:py-28">
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
              Programs
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tighter">
              Built for businesses and individuals
            </h2>
          </div>

          <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 md:rounded-[36px]">
              <img
                src={programsImage}
                alt="Restaurant owner standing in their dining room"
                loading="lazy"
                width={1408}
                height={1200}
                className="h-full min-h-[280px] w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center rounded-[28px] border border-white/10 bg-white/5 p-8 md:rounded-[36px] md:p-12">
              <h3 className="text-2xl font-bold tracking-tighter md:text-3xl">
                Introduce eatOS in a few simple steps
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-white/70 md:text-base">
                Getting approved to introduce eatOS products and services is a breeze. Refer your
                clients to eatOS, earn commission and stay informed while we take care of setup and
                training.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
                Accountants, bookkeepers and anyone else can earn valuable commissions
                without any obligation, simply by connecting restaurants with the right business
                solutions.
              </p>
              <a
                href="/contact"
                className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
              >
                Apply now
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Integration partners */}
      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Meet our integration partners
            </h2>
            <p className="mt-4 text-base text-white/70">
               eatOS works with the hardware, back-office platforms restaurants already
              rely on.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
            {integrationPartners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center bg-white px-6 py-12 sm:py-14 transition-colors hover:bg-zinc-100"
              >
                <img
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  loading="lazy"
                  className="h-14 w-auto max-w-[210px] object-contain opacity-90 transition-opacity hover:opacity-100 sm:h-16 md:h-20"
                />
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm font-medium text-white/55">+ many more</p>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="site-container">
          {/* Why partner */}
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Partner program
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tighter md:text-4xl">
              Why partner with us?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
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
                className="rounded-3xl border border-white/10 bg-white/5 p-7 md:p-8"
              >
                <div className="h-fit w-fit rounded-xl bg-white/10 p-2">
                  <CheckCircle2 size={22} className="text-white" />
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tighter">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70 md:text-base">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center">
            <blockquote className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-white md:text-xl">
              &ldquo;Partnering with eatOS has been the best decision for our agency. The product
              sells itself and the support is unmatched.&rdquo;
            </blockquote>
            <div className="mt-4 text-sm font-bold text-white/60">
              Sarah J., Digital Dining Solutions
            </div>
          </div>

          {/* Full width form */}
          <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-7 md:p-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold tracking-tighter md:text-3xl">
                Apply to become a partner
              </h3>
              <p className="mt-3 text-sm text-white/70 md:text-base">
                Tell us about your business and our partner team will follow up shortly.
              </p>
            </div>
            <div className="mx-auto mt-8 w-full rounded-2xl bg-white p-6 text-black md:p-8">
              <PartnerForm />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
