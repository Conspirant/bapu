import { Reveal } from "@/components/Reveal";
import { motion } from "framer-motion";

const blueHouseTeam = {
  headMistress: "Mrs. Hemavathi B S",
  members: [
    "Mrs. Gangamma I G",
    "Mrs. Sumithra A P",
    "Mrs. Sreela K",
    "Mrs. Shashi K",
    "Mrs. Veena K G",
    "Mrs. Manasa C D",
    "Mrs. Ashwini M"
  ],
};

export function Closing() {
  return (
    <footer className="border-t border-border py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 md:px-8">
        <Reveal>
          <h2 className="font-display text-[2rem] leading-[0.95] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl">
            Truth is <span className="italic text-ink-soft">timeless.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink-soft sm:mt-6">
            Learn something. Share something. Make something better.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mx-auto mt-10 max-w-3xl border border-saffron/40 bg-saffron/10 px-4 py-8 sm:mt-14 sm:px-6 sm:py-10">
            <p className="eyebrow">Created by</p>
            <p className="mt-3 font-display text-2xl leading-tight tracking-tight text-ink sm:mt-4 sm:text-3xl md:text-4xl">
              Dr. Vikram Ambalal Sarabhai House
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-saffron sm:text-sm sm:tracking-[0.28em]">
              Blue House Team
            </p>
            <p className="mt-4 font-display text-lg italic text-ink-soft sm:mt-5 sm:text-xl md:text-2xl">
              Bloom the knowledge with blue
            </p>
          </div>
        </Reveal>

        {/* ── Blue House Team Members ── */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-12 max-w-3xl sm:mt-16">
            <div className="mb-8 sm:mb-10">
              <p className="eyebrow">Our Team</p>
              <h3 className="mt-3 font-display text-2xl tracking-tight text-ink sm:mt-4 sm:text-3xl md:text-4xl">
                Blue House Members
              </h3>
            </div>

            {/* Head Mistress Card */}
            <motion.div
              className="relative mx-auto mb-8 max-w-sm border border-saffron/50 bg-saffron/8 px-5 py-6 sm:mb-10 sm:px-8 sm:py-8"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
            >
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-0 h-[2px] w-12 -translate-x-1/2 bg-saffron sm:w-16"
              />
              <p className="text-[10px] uppercase tracking-[0.24em] text-saffron sm:text-[11px]">
                Head Mistress
              </p>
              <p className="mt-2 font-display text-xl tracking-tight text-ink sm:mt-3 sm:text-2xl">
                {blueHouseTeam.headMistress}
              </p>
            </motion.div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {blueHouseTeam.members.map((member, i) => (
                <motion.div
                  key={member}
                  className="group relative border border-border bg-card px-4 py-4 text-left transition-colors duration-300 hover:border-saffron/40 hover:bg-saffron/5 sm:px-5 sm:py-5"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -2 }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-3 top-3 size-1.5 rounded-full bg-saffron/60 transition-colors group-hover:bg-saffron sm:left-4 sm:top-4"
                  />
                  <p className="pl-4 font-display text-base tracking-tight text-ink sm:pl-5 sm:text-lg">
                    {member}
                  </p>
                  <p className="mt-1 pl-4 text-[10px] uppercase tracking-[0.18em] text-ink-soft sm:pl-5 sm:text-[11px]">
                    Member
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Decorative bottom line */}
            <div
              aria-hidden="true"
              className="mx-auto mt-8 h-px w-20 bg-gradient-to-r from-transparent via-saffron/50 to-transparent sm:mt-10 sm:w-24"
            />
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 items-end gap-3 border-t border-border pt-5 text-left sm:mt-16 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-4 sm:pt-6">
            <div className="min-w-0">
              <p className="font-display text-base text-ink sm:text-lg">Bapu Speaks</p>
              <p className="mt-1 text-[11px] text-ink-soft sm:text-xs">
                An interactive school learning experience
              </p>
            </div>
            <p className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              Notice Board Edition
            </p>
          </div>
          <p className="mx-auto mt-5 max-w-3xl text-left text-[10px] leading-relaxed text-ink-soft sm:mt-6 sm:text-[11px]">
            Historical dates and events on this page follow standard published
            accounts. Reflections are clearly marked as interpretation, and quotations
            of uncertain origin are noted as such.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}