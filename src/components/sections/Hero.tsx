import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import portrait from "@/assets/gandhi-portrait.png";

export function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(Math.min(window.scrollY, 600));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const listen = () => {
    document.getElementById("today")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => window.dispatchEvent(new CustomEvent("bapu:play")), 700);
  };

  return (
    <section id="top" className="relative overflow-hidden pt-52 pb-10 sm:pt-60 sm:pb-16 md:pt-64 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:gap-12 sm:px-6 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            An interactive school notice board
          </motion.p>

          <motion.p
            className="mt-3 font-display text-[1.5rem] italic leading-[1.1] tracking-tight text-saffron sm:mt-4 sm:text-[2rem] md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
          >
            Bloom the knowledge with blue
          </motion.p>

          <motion.h1
            className="mt-4 font-display text-[2rem] leading-[0.95] tracking-tight text-ink sm:mt-6 sm:text-[2.6rem] md:text-6xl lg:text-[4.6rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            Some lessons
            <br />
            <span className="italic text-ink-soft">never</span> grow old.
          </motion.h1>

          <motion.div
            className="mt-6 max-w-md sm:mt-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42 }}
          >
            <p className="text-base tracking-[0.08em] text-ink sm:text-lg">Scan. Listen. Discover.</p>
            <div className="mt-4 h-px w-20 bg-saffron/70 sm:mt-6 sm:w-24" />
            <p className="mt-4 text-[13px] leading-relaxed text-ink/85 sm:mt-6 sm:text-sm">
              A small exhibition that lives beside the board in the corridor — a message
              to hear, a life to read about, and everything happening at school this month.
            </p>
            <p className="mt-4 inline-flex flex-wrap items-center gap-2 bg-surface px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-paper shadow-lg shadow-surface/20 sm:mt-6 sm:gap-3 sm:px-4 sm:py-2.5 sm:text-[11px] sm:tracking-[0.18em]">
              <span className="size-2 rounded-full bg-saffron" aria-hidden="true" />
              Presented by Dr. Vikram Ambalal Sarabhai House — Blue House
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center gap-4 sm:mt-10 sm:gap-5"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <span className="relative grid place-items-center">
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full border border-ink/25"
                animate={{ scale: [1, 1.22, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
              />
              <button
                type="button"
                onClick={listen}
                className="grid size-20 place-items-center rounded-full border border-surface bg-surface text-paper transition-all duration-200 hover:bg-transparent hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-saffron active:scale-95 sm:size-24 md:size-28"
              >
                <span className="flex flex-col items-center gap-1">
                  <Play className="size-3.5 translate-x-[1px] sm:size-4" strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-[0.18em] sm:text-[11px] sm:tracking-[0.2em]">Listen</span>
                </span>
              </button>
            </span>
            <p className="max-w-[10rem] text-[11px] leading-relaxed text-ink/70 sm:text-xs">
              Tap to hear today&rsquo;s message
            </p>
          </motion.div>
        </div>

        <motion.div
          className="relative order-first flex flex-col items-center justify-center lg:order-none"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={portrait}
            alt="Stencil portrait illustration of Mahatma Gandhi"
            width={800}
            height={800}
            className="relative mx-auto w-[65%] max-w-xs opacity-95 mix-blend-multiply sm:w-[75%] sm:max-w-sm lg:w-full lg:max-w-md"
            style={{ transform: `translateY(${offset * -0.05}px)` }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <p className="relative mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-ink/80 sm:mt-4 sm:text-[11px] sm:tracking-[0.2em]">
            Mohandas K. Gandhi &middot; 1869&ndash;1948
          </p>
        </motion.div>
      </div>
    </section>
  );
}