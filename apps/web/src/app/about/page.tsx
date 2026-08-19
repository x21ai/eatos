// @ts-nocheck
import { ArrowRight, HeartHandshake, Sparkles, Shield, Wrench } from 'lucide-react';

export const metadata = {
  title: 'About Us',
  description:
    'eatOS is building the operating system for modern hospitality. Learn about our mission, our principles, and the team behind the software.',
  openGraph: {
    title: 'About eatOS - Built for the People Who Run the Shift',
    description:
      'Learn about eatOS: the team, mission, and values behind the restaurant operating system.',
  },
};

export default function AboutPage() {
  const principles = [
    {
      icon: Sparkles,
      title: 'Taste matters',
      desc: 'Operators live in the details. So do we: design, speed, and the little things that keep a shift smooth.',
    },
    {
      icon: Wrench,
      title: 'Built for real service',
      desc: 'We ship for the chaos: modifiers, split checks, outages, late nights, and the Friday rush.',
    },
    {
      icon: Shield,
      title: 'Trust over hype',
      desc: 'Payments, data, and uptime are sacred. We build systems that are stable, secure, and boring in the best way.',
    },
    {
      icon: HeartHandshake,
      title: 'Operators first',
      desc: 'We measure success in minutes saved, fewer mistakes, happier staff, and guests who come back.',
    },
  ];

  const stats = [
    { value: '47+', label: 'Active codebases' },
    { value: '24/7', label: 'Operational monitoring' },
    { value: '97%+', label: 'Edge uptime targets' },
    { value: '< 1 day', label: 'Typical onboarding' },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Hero */}
      <section className="pt-32 md:pt-44 pb-16 md:pb-20 bg-gray-50 border-b border-gray-100">
        <div className="site-container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white text-xs font-bold uppercase tracking-widest text-gray-700 mb-6">
              <span className="text-purple-600">✦</span> About
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-6">
              Built for the people
              <br />
              who run the shift.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              <strong>eatOS</strong> is building the operating system for modern hospitality:
              software, payments, and hardware that work together like one machine.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition-colors"
              >
                Get Started <ArrowRight size={18} />
              </a>
              <a
                href="/careers"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-200 bg-white font-semibold hover:bg-gray-50 transition-colors"
              >
                Join the team <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Story */}
      <section className="py-16 md:py-24">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Our mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Restaurants are the hardest businesses to run: thin margins, nonstop urgency, and a
                hundred moving parts at once. We exist to make operations calmer, faster, and more
                profitable.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mt-4">
                That means fewer clicks, fewer surprises, fewer outages, and more time spent where
                it matters: guests, food, and team.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-10 shadow-sm">
              <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                What we build
              </div>
              <ul className="space-y-4 text-gray-700">
                <li>
                  <span className="font-semibold">POS + KDS</span> that keeps front and back in
                  sync.
                </li>
                <li>
                  <span className="font-semibold">Payments</span> that are fast, reliable, and
                  transparent.
                </li>
                <li>
                  <span className="font-semibold">Intelligence</span> that spots patterns and
                  recommends the next best action.
                </li>
                <li>
                  <span className="font-semibold">Hardware</span> designed for the floor, not the
                  office.
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 md:mt-20">
            {stats.map((s) => (
              <div key={s.label} className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
                <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">
                  {s.value}
                </div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="site-container">
          <div className="max-w-2xl">
            <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">
              How we work
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Principles, not slogans.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Hospitality is real-time. Our software should feel the same.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {principles.map((p) => (
              <div
                key={p.title}
                className="rounded-3xl border border-gray-200 bg-white p-8 hover:bg-gray-50 transition-colors"
              >
                <div className="w-11 h-11 rounded-2xl bg-black/5 flex items-center justify-center mb-5">
                  <p.icon size={22} className="text-black" />
                </div>
                <div className="text-xl font-bold mb-2">{p.title}</div>
                <p className="text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100">
        <div className="site-container">
          <div className="rounded-[2.5rem] bg-black text-white p-10 md:p-14 overflow-hidden relative">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
                  Want to build it with us?
                </h3>
                <p className="text-gray-300 text-lg max-w-2xl">
                  We hire engineers, designers, and operators who care about craft and who want
                  restaurants to win.
                </p>
              </div>
              <a
                href="/careers"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                View open roles <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
