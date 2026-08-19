// @ts-nocheck
import { ArrowLeft, ArrowRight } from "lucide-react";

const ROLES = {
  "product-engineer": {
    title: "Product Engineer",
    team: "Engineering",
    location: "Remote (US) / On-site",
    type: "Full-time",
    intro:
      "Build fast, clean product experiences across POS, payments, and intelligence, with a strong focus on polish and reliability.",
    whatYoullDo: [
      "Ship user-facing features across the web app and internal tools.",
      "Collaborate closely with design to keep quality high.",
      "Own performance and correctness. Restaurants can't wait.",
      "Work end-to-end: UI, APIs, data, and instrumentation.",
    ],
    whatWereLookingFor: [
      "Strong JavaScript/React skills and a love for clean UI.",
      "Comfortable working across the stack when needed.",
      "A bias for shipping and iterating with real customer feedback.",
      "Good taste: you notice when something feels off.",
    ],
  },
  "backend-platform-engineer": {
    title: "Backend / Platform Engineer",
    team: "Engineering",
    location: "Remote (US) / On-site",
    type: "Full-time",
    intro:
      "Own core services, reliability, and the infrastructure that keeps restaurants running, even when networks don't.",
    whatYoullDo: [
      "Build and maintain backend services for POS, payments, and intelligence.",
      "Improve uptime, observability, and incident response.",
      "Design safe rollouts and migrations that avoid downtime.",
      "Partner with product engineering to ship features without regressions.",
    ],
    whatWereLookingFor: [
      "Experience designing and operating production systems.",
      "Strong fundamentals: data, latency, and failure modes.",
      "Comfort with Postgres and API design.",
      "A calm, ownership-driven approach to debugging.",
    ],
  },
  "product-designer": {
    title: "Product Designer",
    team: "Design",
    location: "Remote / Hybrid",
    type: "Full-time",
    intro:
      "Design calm, high-trust interfaces for high-stress environments. The bar is Apple-level clarity.",
    whatYoullDo: [
      "Design flows for POS, payments, and management tools.",
      "Create systems (type, spacing, components) that scale.",
      "Run lightweight research with operators and staff.",
      "Partner with engineering to ship pixel-perfect work.",
    ],
    whatWereLookingFor: [
      "A portfolio with product UI that shipped.",
      "Strong visual design and typography.",
      "Ability to simplify complex workflows.",
      "Comfort working fast without losing quality.",
    ],
  },
  "implementation-specialist": {
    title: "Implementation Specialist",
    team: "Operations",
    location: "On-site / Travel",
    type: "Full-time",
    intro:
      "Onboard new restaurants, train teams, and turn messy realities into smooth launches. You'll be the calm in the chaos.",
    whatYoullDo: [
      "Lead on-site installs and training for new customers.",
      "Translate restaurant workflows into configuration and best practices.",
      "Spot issues early and coordinate fixes with product/engineering.",
      "Create playbooks that make the next install faster.",
    ],
    whatWereLookingFor: [
      "Experience in restaurant ops, hospitality tech, or implementation.",
      "Great communication under pressure.",
      "Comfort traveling and being customer-facing.",
      "A practical mindset: you make things work.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(ROLES).map((role) => ({ role }));
}

export default async function CareerRolePage({ params }) {
  const { role: roleKey } = await params;
  const role = roleKey ? ROLES[roleKey] : null;

  if (!role) {
    return (
      <div className="min-h-screen bg-white text-black font-sans">
        <div className="site-container pt-32 md:pt-44 pb-24">
          <a
            href="/careers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black"
          >
            <ArrowLeft size={16} /> Back to Careers
          </a>

          <div className="mt-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Role not found
            </h1>
            <p className="text-gray-600 text-lg mt-4">
              This opening may have been filled or moved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const applySubject = encodeURIComponent(`Application: ${role.title}`);
  const applyBody = encodeURIComponent(
    `Hi eatOS team,\n\nI’m interested in the ${role.title} role.\n\nHere are a few links: \n- LinkedIn: \n- Portfolio/GitHub: \n\nThanks!\n`,
  );
  const applyHref = `mailto:careers@eatos.com?subject=${applySubject}&body=${applyBody}`;

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <section className="pt-32 md:pt-44 pb-16 bg-gray-50 border-b border-gray-100">
        <div className="site-container">
          <a
            href="/careers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black"
          >
            <ArrowLeft size={16} /> Back to Careers
          </a>

          <div className="mt-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white text-xs font-bold uppercase tracking-widest text-gray-700 mb-6">
              <span className="text-purple-600">✦</span> {role.team}
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05]">
              {role.title}
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mt-5 leading-relaxed">
              {role.intro}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              <Pill text={role.location} />
              <Pill text={role.type} />
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href={applyHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition-colors"
              >
                Apply via email <ArrowRight size={18} />
              </a>
              <a
                href="/careers#open-roles"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-200 bg-white font-semibold hover:bg-gray-50 transition-colors"
              >
                Browse roles <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="rounded-3xl border border-gray-200 bg-white p-8">
              <h2 className="text-2xl font-bold tracking-tighter">
                What you’ll do
              </h2>
              <ul className="mt-6 space-y-3 text-gray-700">
                {role.whatYoullDo.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8">
              <h2 className="text-2xl font-bold tracking-tighter">
                What we’re looking for
              </h2>
              <ul className="mt-6 space-y-3 text-gray-700">
                {role.whatWereLookingFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-[2.5rem] bg-black text-white p-10 md:p-14 overflow-hidden relative">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
                  Apply in 2 minutes.
                </h3>
                <p className="text-gray-300 text-lg max-w-2xl">
                  Email your resume and a short note. Links help (LinkedIn,
                  portfolio, GitHub).
                </p>
              </div>
              <a
                href={applyHref}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                Apply now <ArrowRight size={18} />
              </a>
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
