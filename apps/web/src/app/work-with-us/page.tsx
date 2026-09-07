// @ts-nocheck
import {
  ArrowRight,
  Briefcase,
  Globe,
  Sparkles,
  HeartHandshake,
  Shield,
  Wrench,
} from "lucide-react";

export const metadata = {
  alternates: { canonical: '/work-with-us' },
  title: 'Careers at eatOS | Restaurant Technology Cloud',
  description:
    'Join the eatOS team building restaurant technology used by operators across the country. See open engineering, design and go to market roles.',
  openGraph: {
    url: '/work-with-us',
    type: 'website',
    title: 'Careers at eatOS | Restaurant Technology Cloud',
    description:
      'Join the eatOS team building restaurant technology used by operators across the country. See open engineering, design and go to market roles.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at eatOS | Restaurant Technology Cloud',
    description:
      'Join the eatOS team building restaurant technology used by operators across the country. See open engineering, design and go to market roles.',
  },
};


const OPEN_ROLES = [
  {
    slug: "product-engineer",
    title: "Product Engineer",
    team: "Engineering",
    location: "Remote (US) / On-site",
    type: "Full-time",
    blurb:
      "Build fast, clean product experiences across Point of Sale, payments, and intelligence.",
  },
  {
    slug: "backend-platform-engineer",
    title: "Backend / Platform Engineer",
    team: "Engineering",
    location: "Remote (US) / On-site",
    type: "Full-time",
    blurb:
      "Own core services, reliability, and the infrastructure that keeps restaurants running.",
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    team: "Design",
    location: "Remote / Hybrid",
    type: "Full-time",
    blurb: "Design calm, high-trust interfaces for high-stress environments.",
  },
  {
    slug: "implementation-specialist",
    title: "Implementation Specialist",
    team: "Operations",
    location: "On-site / Travel",
    type: "Full-time",
    blurb:
      "Onboard new restaurants, train teams, and turn messy realities into smooth launches.",
  },
];

export default function CareersPage() {
  const values = [
    {
      icon: Sparkles,
      title: "Craft",
      desc: "We sweat the details. We ship products people genuinely love using at 8pm on a Friday night.",
    },
    {
      icon: Wrench,
      title: "Ownership",
      desc: "We own the final outcomes, not just tickets. If it breaks on the floor, it matters deeply.",
    },
    {
      icon: Shield,
      title: "Trust",
      desc: "Payments and uptime are serious business. We build rock-solid, stable systems and always tell the truth.",
    },
    {
      icon: HeartHandshake,
      title: "Hospitality",
      desc: "We care about operators, staff, and guests, the whole chain.",
    },
  ];

  const benefits = [
    {
      title: "Flexible location",
      desc: "Remote-friendly teams.",
    },
    { title: "Competitive pay", desc: "Market comp plus meaningful equity." },
    {
      title: "Health coverage",
      desc: "Medical, dental, and vision (where applicable).",
    },
    {
      title: "Time off",
      desc: "We take rest seriously so we can stay sharp and active.",
    },
    { title: "Gear", desc: "Tools that let you do your best work." },
    {
      title: "Real impact",
      desc: "What you ship changes a restaurant’s day immediately.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero */}
      <section className="pt-[128px] md:pt-[176px] pb-16 md:pb-20 border-b border-white/10">
        <div className="site-container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-bold uppercase tracking-widest text-white/70 mb-6">
              <span className="text-brand-on-dark">✦</span> Careers
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-6">
              Build the system
              <br />
              restaurants run on.
            </h1>

            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              We’re building software, payments, and hardware that work together
              like one machine, along with an intelligence layer that helps
              operators act smarter.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#open-roles"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors"
              >
                View open roles <ArrowRight size={18} />
              </a>
              <a
                href="mailto:careers@eatos.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Email us <ArrowRight size={18} />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
              <MiniStat icon={Globe} label="Remote-friendly" value="Global" />
              <MiniStat icon={Briefcase} label="Teams" value="Product + Ops" />
              <MiniStat icon={Sparkles} label="Focus" value="Craft" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="site-container">
          <div className="max-w-2xl">
            <div className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3">
              How we operate
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Calm. Fast. Honest.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              We move quickly, but we don’t break trust. We aim for the kind of
              quality you can feel and depend on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-colors"
              >
                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                  <v.icon size={22} className="text-white" />
                </div>
                <div className="text-xl font-bold mb-2">{v.title}</div>
                <p className="text-white/70 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="site-container">
          <div className="max-w-2xl">
            <div className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3">
              Benefits
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Support the team.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              We keep it simple: take care of people, they’ll do the best
              work of their careers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <div className="text-lg font-bold mb-2">{b.title}</div>
                <p className="text-white/70 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="open-roles" className="py-16 md:py-24 border-t border-white/10">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3">
                Open roles
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">
                Join <strong>eatOS</strong>.
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Don’t see the perfect role? Email us anyway. We’ll read it.
              </p>
            </div>

            <a
              href="mailto:careers@eatos.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 font-semibold text-white hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              Send your resume <ArrowRight size={18} />
            </a>
          </div>

          <div className="mt-10 space-y-4">
            {OPEN_ROLES.map((r) => (
              <a
                key={r.slug}
                href={`/work-with-us/${r.slug}`}
                className="block rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="text-xl font-bold tracking-tighter">
                      {r.title}
                    </div>
                    <div className="text-white/70 mt-1">{r.blurb}</div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <Pill text={r.team} />
                      <Pill text={r.location} />
                      <Pill text={r.type} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-white font-semibold">
                    View <ArrowRight size={18} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="site-container">
          <div className="max-w-2xl">
            <div className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3">
              Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Clear steps.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              No puzzles, no gotchas. We want to see how you think and how you
              work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            <Step
              number="01"
              title="Intro"
                desc="A quick call to align on role and goals easily."
            />
            <Step
              number="02"
              title="Work sample"
              desc="A small, realistic task (paid when appropriate)."
            />
            <Step
              number="03"
              title="Team chat"
              desc="Meet the people you’ll work with day-to-day."
            />
            <Step
              number="04"
              title="Offer"
              desc="Fast close. Clear expectations. No drama."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="site-container">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 text-white p-10 md:p-14 overflow-hidden relative">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand/25 blur-3xl rounded-full" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
                  Ready to apply?
                </h3>
                <p className="text-white/70 text-lg max-w-2xl">
                  Send your resume, a quick note, and links to work you’re proud
                  of.
                </p>
              </div>
              <a
                href="mailto:careers@eatos.com"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                Apply via email <ArrowRight size={18} />
              </a>
            </div>

            <div className="relative z-10 mt-8 text-white/55 text-sm">
              Or browse roles above. We respond as quickly as we can.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Pill({ text }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white/80">
      {text}
    </span>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-white/60 text-sm font-semibold">
        <Icon size={16} /> {label}
      </div>
      <div className="text-xl font-bold mt-2 tracking-tighter">{value}</div>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="text-sm font-bold tracking-widest text-white/45">
        {number}
      </div>
      <div className="text-lg font-bold mt-2">{title}</div>
      <p className="text-white/70 mt-2 leading-relaxed">{desc}</p>
    </div>
  );
}
