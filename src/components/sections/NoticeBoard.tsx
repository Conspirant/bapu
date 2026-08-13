import { motion } from "framer-motion";
import { SectionHeading } from "@/components/Reveal";
import { notices } from "@/data/site-content";

export function NoticeBoard() {
  return (
    <section id="notice-board" className="scroll-mt-16 border-t border-border py-14 sm:scroll-mt-20 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <SectionHeading
          eyebrow="The Notice Board"
          title="What's happening at school?"
          lead="The same notices pinned to the board in the corridor, kept up to date here."
        />

        <ul className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-8">
          {notices.map((n, i) => (
            <motion.li
              key={n.id}
              initial={{ opacity: 0, y: 22, rotate: n.tilt }}
              whileInView={{ opacity: 1, y: 0, rotate: n.tilt }}
              whileHover={{ rotate: 0, y: -4 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col bg-card px-4 pb-5 pt-8 shadow-[0_14px_30px_-24px_oklch(0.14_0.04_250/0.5)] ring-1 ring-border sm:px-6 sm:pb-7 sm:pt-10"
            >
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-2.5 size-2 -translate-x-1/2 rounded-full bg-saffron shadow-[0_2px_4px_oklch(0.14_0.04_250/0.25)] sm:top-3 sm:size-2.5"
              />
              <p className="text-[9px] uppercase tracking-[0.2em] text-khadi-green sm:text-[10px] sm:tracking-[0.24em]">{n.label}</p>
              <h3 className="mt-2 font-display text-xl leading-tight tracking-tight text-ink sm:mt-3 sm:text-2xl">
                {n.title}
              </h3>
              <div className="mt-4 border-t border-dashed border-border pt-3 sm:mt-6 sm:pt-4">
                <p className="text-[13px] text-ink sm:text-sm">{n.date}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-ink-soft sm:text-xs">{n.detail}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}