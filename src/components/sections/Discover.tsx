import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { discoverItems, type DiscoverItem } from "@/data/site-content";

function Panel({ item, onClose }: { item: DiscoverItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-surface/50 backdrop-blur-[2px]"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-border bg-card px-4 py-6 sm:max-h-[88vh] sm:px-6 sm:py-8 md:px-10 md:py-12"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          className="absolute right-3 top-3 text-ink-soft transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-saffron sm:right-5 sm:top-5"
        >
          <X className="size-5" strokeWidth={1.5} />
        </button>

        <p className="eyebrow">
          {item.index} — {item.subtitle}
        </p>
        <h3 className="mt-3 font-display text-2xl tracking-tight text-ink sm:mt-4 sm:text-3xl md:text-4xl">
          {item.title}
        </h3>
        <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
          {item.body.map((p) => (
            <p key={p.slice(0, 24)} className="text-[0.875rem] leading-relaxed text-ink-soft sm:text-[0.95rem]">
              {p}
            </p>
          ))}
        </div>
        <dl className="mt-6 grid gap-px border border-border bg-border sm:mt-8 sm:grid-cols-3">
          {item.facts.map((f) => (
            <div key={f.k} className="bg-card px-3 py-3 sm:px-4 sm:py-4">
              <dt className="eyebrow">{f.k}</dt>
              <dd className="mt-1 text-[13px] text-ink sm:text-sm">{f.v}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </motion.div>
  );
}

export function Discover() {
  const [open, setOpen] = useState<DiscoverItem | null>(null);

  return (
    <section id="his-story" className="scroll-mt-16 border-t border-border py-14 sm:scroll-mt-20 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <SectionHeading
          eyebrow="Discover Gandhi"
          title="Four chapters, briefly told."
          lead="Open any chapter for a short, sourced summary — dates and events only, with interpretation kept separate."
        />

        <div className="mt-10 border-t border-border sm:mt-14">
          {discoverItems.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <button
                type="button"
                onClick={() => setOpen(item)}
                className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border py-5 text-left transition-colors duration-300 hover:bg-paper-deep/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-saffron sm:gap-5 sm:py-7 md:gap-10 md:py-9"
              >
                <span className="font-mono text-[11px] text-ink-soft sm:pl-2 sm:text-xs">{item.index}</span>
                <span className="min-w-0">
                  <span className="block font-display text-xl tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl md:text-3xl">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-[10px] uppercase tracking-[0.14em] text-ink-soft sm:mt-1 sm:text-xs sm:tracking-[0.16em]">
                    {item.subtitle}
                  </span>
                </span>
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-ink-soft transition-all duration-300 group-hover:rotate-90 group-hover:border-ink group-hover:text-ink sm:mr-2 sm:size-9">
                  <Plus className="size-3.5 sm:size-4" strokeWidth={1.25} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open ? <Panel item={open} onClose={() => setOpen(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}