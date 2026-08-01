// @ts-nocheck
import { CreditCard, Shield, ShieldCheck } from "lucide-react";
import { useMemo } from "react";
import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { Reveal } from "../Reveal";
import { BarMiniIcon } from "../Icons";

export function PaymentsIntelligenceSection() {
  const paymentsCards = useMemo(
    () => [
      {
        title: "Failure monitoring",
        body: "By card type, network, device",
        Icon: CreditCard,
      },
      {
        title: "Fee spike detection",
        body: "Catches processor overcharges",
        Icon: Shield,
      },
      {
        title: "Fraud patterns",
        body: "Void abuse, retry storms, partial approvals",
        Icon: ShieldCheck,
      },
      {
        title: "True cost analysis",
        body: "Effective rate vs. advertised",
        Icon: BarMiniIcon,
      },
    ],
    [],
  );

  return (
    <section className="py-28">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal id="payments-head">
          <div className="max-w-4xl">
            <SectionLabel>PAYMENTS INTELLIGENCE</SectionLabel>
            <h2 className="mt-5 text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05]">
              Where eatOS
              <br />
              quietly saves you money.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-[#9CA3AF] leading-relaxed max-w-3xl">
              Monitors every transaction. Catches what you'd miss. Explains
              effective cost, not headline rates.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paymentsCards.map((c, idx) => {
            const Icon = c.Icon;
            const revealId = `pay-${idx}`;
            return (
              <Reveal id={revealId} key={c.title}>
                <Card className="p-6">
                  <div className="w-10 h-10 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center">
                    <Icon size={20} className="text-[#A855F7]" />
                  </div>
                  <div className="mt-4 text-sm font-semibold text-white">
                    {c.title}
                  </div>
                  <div className="mt-2 text-[13px] text-[#9CA3AF] leading-relaxed">
                    {c.body}
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
