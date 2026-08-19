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

const OPEN_ROLES = [
  {
    slug: "product-engineer",
    title: "Product Engineer",
    team: "Engineering",
    location: "Remote (US) / On-site",
    type: "Full-time",
    blurb:
      "Build fast, clean product experiences across POS, payments, and intelligence.",
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
      desc: "We sweat details. We ship products people love using at 8pm on a Friday.",
    },
    {
      icon: Wrench,
      title: "Ownership",
      desc: "We own outcomes, not tickets. If it breaks on the floor, it matters.",
    },
    {
      icon: Shield,
      title: "Trust",
      desc: "Payments and uptime are serious. We build stable systems and tell the truth.",
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
      desc: "Remote-friendly teams with optional hubs.",
    },
    { title: "Competitive pay", desc: "Market comp plus meaningful equity." },
    {
      title: "Health coverage",
      desc: "Medical, dental, and vision (where applicable).",
    },
    { title: "Time off", desc: "We take rest seriously so we can stay sharp." },
    { title: "Gear", desc: "Tools that let you do your best work." },
    {
      title: "Real impact",
      desc: "What you ship changes a restaurant’s day immediately.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Hero */}
      <section className="pt-32 md:pt-44 pb-16 md:pb-20 bg-gray-50 border-b border-gray-100">
        <div className="site-container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white text-xs font-bold uppercase tracking-widest text-gray-700 mb-6">
              <span className="text-purple-600">✦</span> Careers
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-6">
              Build the system
              <br />
              restaurants run on.
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              We’re building software, payments, and hardware that work together
              like one machine, along with an intelligence layer that helps
              operators act faster and smarter.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#open-roles"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition-colors"
              >
                View open roles <ArrowRight size={18} />
              </a>
              <a
                href="mailto:careers@eatos.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-200 bg-white font-semibold hover:bg-gray-50 transition-colors"
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
            <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">
              How we operate
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Calm. Fast. Honest.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We move quickly, but we don’t break trust. We aim for the kind of
              quality you can feel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl border border-gray-200 bg-white p-8 hover:bg-gray-50 transition-colors"
              >
                <div className="w-11 h-11 rounded-2xl bg-black/5 flex items-center justify-center mb-5">
                  <v.icon size={22} className="text-black" />
                </div>
                <div className="text-xl font-bold mb-2">{v.title}</div>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100">
        <div className="site-container">
          <div className="max-w-2xl">
            <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">
              Benefits
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Support the team.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We keep this simple: take care of people, and they’ll do the best
              work of their careers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-3xl border border-gray-200 bg-white p-8"
              >
                <div className="text-lg font-bold mb-2">{b.title}</div>
                <p className="text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="open-roles" className="py-16 md:py-24 bg-white">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">
                Open roles
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">
                Join <strong>eatOS</strong>.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Don’t see the perfect role? Email us anyway. We’ll read it.
              </p>
            </div>

            <a
              href="mailto:careers@eatos.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-200 bg-white font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Send your resume <ArrowRight size={18} />
            </a>
          </div>

          <div className="mt-10 space-y-4">
            {OPEN_ROLES.map((r) => (
              <a
                key={r.slug}
                href={`/careers/${r.slug}`}
                className="block rounded-3xl border border-gray-200 bg-white p-6 md:p-8 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="text-xl font-bold tracking-tighter">
                      {r.title}
                    </div>
                    <div className="text-gray-600 mt-1">{r.blurb}</div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <Pill text={r.team} />
                      <Pill text={r.location} />
                      <Pill text={r.type} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-black font-semibold">
                    View <ArrowRight size={18} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100">
        <div className="site-container">
          <div className="max-w-2xl">
            <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">
              Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Clear steps.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              No puzzles, no gotchas. We want to see how you think and how you
              work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            <Step
              number="01"
              title="Intro"
              desc="A quick call to align on role and goals."
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
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="site-container">
          <div className="rounded-[2.5rem] bg-black text-white p-10 md:p-14 overflow-hidden relative">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
                  Ready to apply?
                </h3>
                <p className="text-gray-300 text-lg max-w-2xl">
                  Send your resume, a quick note, and links to work you’re proud
                  of.
                </p>
              </div>
              <a
                href="mailto:careers@eatos.com"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                Apply via email <ArrowRight size={18} />
              </a>
            </div>

            <div className="relative z-10 mt-8 text-gray-400 text-sm">
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
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-semibold text-gray-700">
      {text}
    </span>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold">
        <Icon size={16} /> {label}
      </div>
      <div className="text-xl font-bold mt-2 tracking-tighter">{value}</div>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">
      <div className="text-sm font-bold tracking-widest text-gray-400">
        {number}
      </div>
      <div className="text-lg font-bold mt-2">{title}</div>
      <p className="text-gray-600 mt-2 leading-relaxed">{desc}</p>
    </div>
  );
}
