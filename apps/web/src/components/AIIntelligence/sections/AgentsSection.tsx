// @ts-nocheck
import {
  Building2,
  ClipboardList,
  Landmark,
  Users,
  Utensils,
  ChefHat,
} from "lucide-react";
import { useMemo } from "react";
import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { Reveal } from "../Reveal";

export function AgentsSection() {
  const agents = useMemo(
    () => [
      {
        title: "Operator",
        desc: "Operator could be the owner, or the general manager running more than one location. This is the view above any single restaurant.",
        Icon: Building2,
        capabilities: 3,
      },
      {
        title: "Manager",
        desc: "Shift and unit operations. Staffing, exceptions, and what's coming next in the next few days.",
        Icon: ClipboardList,
        capabilities: 3,
      },
      {
        title: "Finance",
        desc: "Accounting and margin. The money side of the business, from daily transactions up to monthly close.",
        Icon: Landmark,
        capabilities: 3,
      },
      {
        title: "Guest",
        desc: "The diner's experience of the restaurant. Are they known, are they being seated, and how easy is it to order.",
        Icon: Users,
        capabilities: 3,
      },
      {
        title: "Server",
        desc: "Table-side staff. Taking the order and knowing the guest in front of them.",
        Icon: Utensils,
        capabilities: 3,
      },
      {
        title: "Kitchen",
        desc: "Back-of-house production. The line, prep, and what's on the menu.",
        Icon: ChefHat,
        capabilities: 3,
      },
    ],
    [],
  );

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

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((a, idx) => {
            const Icon = a.Icon;
            const revealId = `agent-${idx}`;
            return (
              <Reveal id={revealId} key={a.title} className="h-full">
                <Card className="h-full p-6 md:p-7">
                  <div className="w-12 h-12 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-center">
                    <Icon size={22} className="text-[#A855F7]" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-[#9CA3AF] leading-relaxed">
                    {a.desc}
                  </p>
                  <p className="mt-5 text-xs text-[#6B7280]">
                    {a.capabilities} capabilities
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
