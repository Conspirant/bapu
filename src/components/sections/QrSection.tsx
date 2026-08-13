import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const steps = [
  "Find the QR code on the school notice board.",
  "Scan it with your phone camera.",
  "Listen to the message.",
  "Explore Gandhi's story.",
];

function QrGlyph() {
  const cells = Array.from({ length: 121 }, (_, i) => {
    const r = Math.floor(i / 11);
    const c = i % 11;
    const corner =
      (r < 3 && c < 3) || (r < 3 && c > 7) || (r > 7 && c < 3);
    const on = corner || (r * 7 + c * 13 + ((r * c) % 5)) % 3 === 0;
    return { i, on };
  });

  return (
    <div className="relative overflow-hidden border border-border bg-card p-3 sm:p-5">
      <div className="grid grid-cols-11 gap-[2px] sm:gap-[3px]">
        {cells.map(({ i, on }) => (
          <span
            key={i}
            className={on ? "aspect-square bg-surface" : "aspect-square bg-transparent"}
          />
        ))}
      </div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 motion-reduce:hidden sm:h-20"
        animate={{ y: ["-25%", "480%"] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-full w-full bg-gradient-to-b from-transparent via-saffron/20 to-saffron/10" />
        <div className="h-px w-full bg-saffron/70 shadow-[0_0_12px_2px_color-mix(in_oklab,var(--saffron)_55%,transparent)]" />
      </motion.div>
      <p className="mt-3 text-center text-[9px] uppercase tracking-[0.2em] text-ink-soft sm:mt-4 sm:text-[10px] sm:tracking-[0.24em]">
        Placeholder code
      </p>
    </div>
  );
}

export function QrSection() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-paper-deep/50 py-14 sm:py-20 md:py-28">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 motion-reduce:hidden sm:h-40"
        initial={{ y: "-100%" }}
        animate={{ y: ["-100%", "700%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      >
        <div className="h-full w-full bg-gradient-to-b from-transparent to-saffron/[0.07]" />
        <div className="h-px w-full bg-saffron/25" />
      </motion.div>
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:gap-14 sm:px-6 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="mx-auto max-w-[220px] sm:max-w-xs">
            <QrGlyph />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow">The installation</p>
            <h2 className="mt-3 font-display text-2xl leading-[1.05] tracking-tight text-ink sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
              See the board. Scan the code.
              <br className="hidden sm:block" /> Hear the story.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
              {steps.map((s, i) => (
                <li key={s} className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 sm:gap-4">
                  <span className="mt-[2px] font-mono text-[11px] text-saffron sm:text-xs">
                    0{i + 1}
                  </span>
                  <span className="min-w-0 text-[15px] leading-relaxed text-ink sm:text-base">{s}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 flex items-center gap-3 border-t border-border pt-5 sm:mt-10 sm:gap-4 sm:pt-6">
              <span className="grid h-10 w-7 shrink-0 place-items-center border border-ink/30 sm:h-12 sm:w-9">
                <span className="h-5 w-3 border border-dashed border-ink/40 sm:h-6 sm:w-4" />
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-ink/30 to-saffron/60" />
              <span className="grid h-10 w-6 shrink-0 place-items-center rounded-[3px] border border-ink/30 sm:h-12 sm:w-7">
                <span className="h-4 w-2.5 bg-ink/15 sm:h-5 sm:w-3" />
              </span>
              <p className="min-w-0 text-[11px] leading-relaxed text-ink-soft sm:text-xs">
                The corridor board and this page are one exhibit.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}