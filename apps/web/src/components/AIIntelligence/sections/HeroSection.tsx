// @ts-nocheck
import { SectionLabel } from "../SectionLabel";
import { GradientWord } from "../GradientWord";
import { Reveal } from "../Reveal";

export function HeroSection() {
  return (
    <>
      <div className="pt-24" />
      <section className="py-20">
        <div className="site-container">
          <Reveal id="top">
            <div className="max-w-4xl">
              <SectionLabel>eatOS AI: Deep Dive</SectionLabel>
              <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05]">
                Operational
                <br />
                <GradientWord>intelligence</GradientWord>
                <br />
                that acts.
              </h1>
              <p className="mt-6 text-lg md:text-2xl text-[#9CA3AF] leading-relaxed max-w-3xl">
                Not a chatbot bolted onto a POS. An intelligence layer that
                perceives, predicts, and executes.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
