// @ts-nocheck
import {
  Building2,
  ClipboardList,
  Landmark,
  Users,
  Utensils,
  ChefHat,
  MapPin,
  LineChart,
  FileText,
  CalendarDays,
  ShieldAlert,
  TrendingUp,
  ShieldCheck,
  Tag,
  Heart,
  Mic,
  DollarSign,
  HandCoins,
  Flame,
  Package,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { Reveal } from "../Reveal";

function StatusPill({ status }) {
  const styles =
    status === "Priority"
      ? "text-[#F5B23B] border-[#F5B23B]/40 bg-[#F5B23B]/10"
      : status === "Live"
        ? "text-white border-white/15 bg-white/10"
        : "text-[#9CA3AF] border-white/15 bg-transparent";

  return (
    <span
      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${styles}`}
    >
      {status}
    </span>
  );
}

export function AgentsSection() {
  const [activeRole, setActiveRole] = useState(null);

  const roles = useMemo(
    () => [
      {
        title: "Operator",
        desc: "Operator could be the owner, or general manager running multiple locations. This is the view above any single restaurant.",
        Icon: Building2,
        capabilities: [
          {
            title: "Multi-location intelligence",
            status: "Candidate",
            Icon: MapPin,
            desc: "Compares sites side by side, using the same metrics a single unit sees, to surface which location is underperforming this month and why.",
            sources: "Cross-site gross sales, labor cost %, refund rate",
          },
          {
            title: "Revenue & margin intelligence",
            status: "Priority",
            Icon: LineChart,
            desc: "Surfaces which location is underperforming, where margin is being lost, and why refunds spiked this week, rolled up across the business.",
            sources: "Gross sales, product sales, itemized sales, tax report",
          },
          {
            title: "Executive brief intelligence",
            status: "Candidate",
            Icon: FileText,
            desc: "Pulls one daily snapshot of revenue, guests and labor across every location, so the day starts already briefed instead of chasing reports.",
            sources: "Dashboard home, gross sales, guests, payroll",
          },
        ],
      },
      {
        title: "Manager",
        desc: "Shift and unit operations. Staffing, exceptions, and what's coming next in the next few days.",
        Icon: ClipboardList,
        capabilities: [
          {
            title: "Labor intelligence",
            status: "Live",
            Icon: CalendarDays,
            desc: "Builds schedules from demand forecasts, identifies coverage gaps before they hit the floor, and cuts labor cost 18%.",
            sources: "Payroll, cashout, tip",
          },
          {
            title: "Loss prevention intelligence",
            status: "Priority",
            Icon: ShieldAlert,
            desc: "Catches discount abuse, void patterns & tax discrepancies while they're still small, before they surface as a finance review issue.",
            sources:
              "Cash drawers, deposits, discounts, voids, refunds, cancelled orders",
          },
          {
            title: "Covers forecast intelligence",
            status: "Candidate",
            Icon: TrendingUp,
            desc: "Projects next week's covers and revenue so staffing and ordering decisions get made ahead of the problem, not after.",
            sources: "Daily services transactions, online order report trends",
          },
        ],
      },
      {
        title: "Finance",
        desc: "Accounting and margin. The money side of the business, from daily transactions up to monthly close.",
        Icon: Landmark,
        capabilities: [
          {
            title: "Revenue & margin intelligence",
            status: "Priority",
            Icon: LineChart,
            desc: "Surfaces which location is underperforming, where margin is being lost, and why refunds spiked this week.",
            sources: "Gross sales, product sales, itemized sales, tax report",
          },
          {
            title: "Payments intelligence",
            status: "Live",
            Icon: ShieldCheck,
            desc: "Monitors failures by card and device, catches fee spikes as they happen, and flags fraud patterns early.",
            sources: "Cash drawers, deposits, service charges",
          },
          {
            title: "Pricing & discount intelligence",
            status: "Candidate",
            Icon: Tag,
            desc: "Tracks discount leakage and promo abuse, showing exactly where discounting is eating margin faster than it drives volume.",
            sources: "Discounts, promo code, tax itemized sales",
          },
        ],
      },
      {
        title: "Guest",
        desc: "The diner's experience of the restaurant. Are they known, are they being seated, and how easy is it to order.",
        Icon: Users,
        capabilities: [
          {
            title: "Guest intelligence",
            status: "Live",
            Icon: Heart,
            desc: "Predicts churn, triggers retention offers, remembers preferences, and increases repeat visits 23%.",
            sources: "Guests, feedback",
          },
          {
            title: "Guest traffic intelligence",
            status: "Priority",
            Icon: Users,
            desc: "Tracks whether the restaurant is full, why not, and which hours matter most for seating and staffing.",
            sources: "Guests, daily services transactions, online order report",
          },
          {
            title: "Voice order intelligence",
            status: "Candidate",
            Icon: Mic,
            desc: "Captures a voice order placed on the guest portal and hands it straight to order intelligence, so a spoken order moves exactly like a typed one.",
            sources: "Guest ordering portal, voice channel",
          },
        ],
      },
      {
        title: "Server",
        desc: "Table-side staff. Taking the order and knowing the guest in front of them.",
        Icon: Utensils,
        capabilities: [
          {
            title: "Order intelligence",
            status: "Live",
            Icon: DollarSign,
            desc: "Captures orders via voice or text, routes to kitchen intelligence, and suggests upsells, 40% faster than manual.",
            sources: "Sales transaction, online order report",
          },
          {
            title: "Guest intelligence",
            status: "Live",
            Icon: Heart,
            desc: "Remembers guest preferences table-side and flags who's a repeat visitor before the greeting.",
            sources: "Guests, feedback",
          },
          {
            title: "Tips intelligence",
            status: "Candidate",
            Icon: HandCoins,
            desc: "Tracks tip trends per shift and flags gratuity anomalies, so servers see where they stand in real time.",
            sources: "Tip report",
          },
        ],
      },
      {
        title: "Kitchen",
        desc: "Back-of-house production. The line, prep, and what's on the menu.",
        Icon: ChefHat,
        capabilities: [
          {
            title: "Kitchen intelligence",
            status: "Live",
            Icon: Flame,
            desc: "Detects bottlenecks, balances stations, and predicts delays before they happen.",
            sources: "Live ticket flow, station load, prep timing",
          },
          {
            title: "Inventory intelligence",
            status: "Live",
            Icon: Package,
            desc: "Tracks real consumption, auto-reorders, flags waste, and protects your margins.",
            sources: "86 report, product sales",
          },
          {
            title: "Menu performance intelligence",
            status: "Candidate",
            Icon: BookOpen,
            desc: "Flags underperforming products to cut and modifiers that are quietly killing margin.",
            sources: "Menu builder, products, price category, variant sales report",
          },
        ],
      },
    ],
    [],
  );

  const active = roles.find((r) => r.title === activeRole) || null;

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActiveRole(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section className="py-20 md:py-28">
      <div className="site-container">
        <Reveal id="agents-head">
          <div className="max-w-4xl">
            <SectionLabel>Autonomous intelligence</SectionLabel>
            <h2 className="mt-5 text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05]">
              Six roles.
              <br />
              One system of intelligence.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-[#9CA3AF] leading-relaxed max-w-3xl">
              Choose where you work. See only the intelligence built for that role.
            </p>
          </div>
        </Reveal>

        {active ? (
          <>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg md:text-xl text-[#9CA3AF]">
                Intelligence built for{" "}
                <span className="text-[#A855F7]">
                  {active.title.toLowerCase()}
                </span>
                .
              </p>
              <button
                type="button"
                onClick={() => setActiveRole(null)}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[#8B5CF6]/60 px-5 py-2.5 text-sm font-medium text-[#C4B5FD] transition-colors hover:bg-[#8B5CF6]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
              >
                <ArrowLeft size={16} />
                Show all roles
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {active.capabilities.map((c, idx) => {
                const Icon = c.Icon;
                return (
                  <Reveal
                    id={`cap-${active.title}-${idx}`}
                    key={`${active.title}-${c.title}`}
                    className="h-full"
                  >
                    <Card className="flex h-full flex-col p-6 md:p-7">
                      <div className="flex items-start justify-between gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-center">
                          <Icon size={20} className="text-[#A855F7]" />
                        </div>
                        <StatusPill status={c.status} />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold tracking-tight">
                        {c.title}
                      </h3>
                      <p className="mt-3 text-[15px] text-[#9CA3AF] leading-relaxed">
                        {c.desc}
                      </p>

                    </Card>
                  </Reveal>
                );
              })}
            </div>
          </>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((a, idx) => {
              const Icon = a.Icon;
              return (
                <Reveal id={`agent-${idx}`} key={a.title} className="h-full">
                  <button
                    type="button"
                    onClick={() => setActiveRole(a.title)}
                    className="h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded-3xl"
                  >
                    <Card className="h-full p-6 md:p-7 transition-colors hover:border-[#8B5CF6]/50">
                      <div className="w-12 h-12 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-center">
                        <Icon size={22} className="text-[#A855F7]" />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold tracking-tight">
                        {a.title}
                      </h3>
                      <p className="mt-3 text-[15px] text-[#9CA3AF] leading-relaxed">
                        {a.desc}
                      </p>
                    </Card>
                  </button>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
