import { Reveal, SectionHeading } from "@/components/Reveal";
import { timeline } from "@/data/site-content";

export function Timeline() {
  return (
    <section className="border-t border-border bg-paper-deep/50 py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <SectionHeading eyebrow="Timeline" title="A life, in six dates." />

        <div className="relative mt-10 border-l border-border pl-5 sm:mt-14 sm:border-l-0 sm:pl-0">
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 hidden h-px w-full bg-border sm:block"
          />
          <ol className="grid gap-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 md:gap-x-8 md:gap-y-14 lg:grid-cols-6 lg:gap-x-4">
            {timeline.map((t, i) => (
              <li key={t.year} className="relative sm:pt-8">
                <Reveal delay={i * 0.07}>
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.35rem] top-1.5 size-2 rounded-full bg-saffron sm:-top-1 sm:left-0"
                  />
                  <p className="font-display text-xl tracking-tight text-ink sm:text-2xl md:text-3xl">
                    {t.year}
                  </p>
                  <p className="mt-1.5 text-[13px] font-medium text-ink sm:mt-2 sm:text-sm">{t.title}</p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-ink-soft sm:mt-2 sm:text-xs">{t.note}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}