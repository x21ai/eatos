// @ts-nocheck
import {
  Receipt,
  Flame,
  Package,
  Calendar,
  Heart,
  ShieldCheck,
} from "lucide-react";
import { useMemo } from "react";
import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { Reveal } from "../Reveal";

export function AgentsSection() {
  const agents = useMemo(
    () => [
      {
        title: "Order Agent",
        desc: "Captures orders via voice or text. Routes to kitchen. Suggests upsells. 40% faster than manual.",
        Icon: Receipt,
      },
      {
        title: "Kitchen Agent",
        desc: "Detects bottlenecks. Balances stations. Predicts delays before they happen.",
        Icon: Flame,
      },
      {
        title: "Inventory Agent",
        desc: "Tracks real consumption. Auto-reorders. Flags waste. Protects your margins.",
        Icon: Package,
      },
      {
        title: "Labor Agent",
        desc: "Builds schedules from demand forecasts. Identifies gaps. Cuts labor cost 18%.",
        Icon: Calendar,
      },
      {
        title: "Customer Agent",
        desc: "Predicts churn. Triggers retention offers. Remembers preferences. Increases repeat visits 23%.",
        Icon: Heart,
      },
      {
        title: "Payments Agent",
        desc: "Monitors failures by card and device. Catches fee spikes. Flags fraud patterns.",
        Icon: ShieldCheck,
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
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
