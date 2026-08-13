import { AudioPlayer } from "@/components/AudioPlayer";
import { Reveal } from "@/components/Reveal";
import { todaysMessage } from "@/data/site-content";

export function TodaysMessage() {
  return (
    <section id="today" className="scroll-mt-16 border-t border-border bg-paper-deep/50 py-14 sm:scroll-mt-20 sm:py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:gap-14 sm:px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow">Today&rsquo;s Message</p>
            <blockquote className="mt-6 sm:mt-8">
              <p className="font-display text-2xl leading-[1.15] tracking-tight text-ink sm:text-3xl md:text-4xl lg:text-[2.9rem]">
                &ldquo;{todaysMessage.quote}&rdquo;
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6 border-l-2 border-saffron/60 pl-4 sm:mt-8 sm:pl-5">
              <p className="eyebrow">On attribution</p>
              <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-ink-soft sm:text-sm">
                {todaysMessage.attributionNote}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink sm:mt-8 sm:text-base">
              {todaysMessage.reflection}
            </p>
            <p className="mt-5 text-[11px] leading-relaxed text-ink-soft sm:mt-6 sm:text-xs">
              The recording is read aloud by a member of the school. No audio of
              Gandhi&rsquo;s voice is used or imitated here.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:pt-14">
          <AudioPlayer />
        </Reveal>
      </div>
    </section>
  );
}