import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-2xl leading-[1.05] tracking-tight text-ink sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:mt-5 sm:text-base md:text-lg">{lead}</p>
      ) : null}
    </Reveal>
  );
}