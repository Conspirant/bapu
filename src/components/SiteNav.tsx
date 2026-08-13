import { useEffect, useState } from "react";
import { navLinks } from "@/data/site-content";
import { cn } from "@/lib/utils";
import bannerAsset from "@/assets/gtps-banner.png.asset.json";

/**
 * Banner image sources
 */
const BANNER_SOURCES = [
  "/images/gtps-banner.png",
  bannerAsset.url,
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [bannerSrcIdx, setBannerSrcIdx] = useState(0);
  const bannerFailed = bannerSrcIdx >= BANNER_SOURCES.length;

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 120 && y > lastY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border bg-paper/90 backdrop-blur-sm" : "border-b border-transparent",
        hidden && "-translate-y-full",
      )}
    >
      {/* School banner area — dark bg so the white text shows clearly */}
      <div className="bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-3 py-3 sm:px-5 sm:py-4 md:px-8 md:py-5">
          {!bannerFailed ? (
            <img
              src={BANNER_SOURCES[bannerSrcIdx]}
              alt="General Thimayya Public School, sponsored by Kodava Samaja Madikeri"
              className="w-full max-w-2xl h-auto object-contain py-1 sm:h-20 md:h-24 lg:h-28"
              width={768}
              height={170}
              onError={() => setBannerSrcIdx((i) => i + 1)}
            />
          ) : (
            /* Text-based fallback when no image is available */
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-amber-400/80 bg-amber-500/20 sm:size-14 md:size-16">
                <span className="text-base font-bold text-amber-400 sm:text-xl md:text-2xl">G</span>
              </div>
              <div className="text-center">
                <p className="text-[8px] tracking-[0.2em] text-paper/60 sm:text-[9px]">Estd : 1998</p>
                <h1 className="font-display text-sm font-bold uppercase tracking-wide text-paper sm:text-xl md:text-2xl lg:text-[1.7rem]">
                  General Thimayya Public School
                </h1>
                <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-paper/80 sm:text-[10px] sm:tracking-[0.2em] md:text-xs">
                  Sponsored by Kodava Samaja, Madikeri
                </p>
                <p className="mt-0.5 hidden text-[7px] tracking-wide text-paper/50 sm:block sm:text-[8px] md:text-[9px]">
                  Affiliated to Council for the Indian School Certificate Examination, New Delhi
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Blue house tagline strip */}
      <div className="bg-saffron">
        <p className="mx-auto max-w-6xl px-3 py-1.5 text-center font-display text-[11px] italic tracking-tight text-paper sm:px-5 sm:py-2 sm:text-sm md:px-8 md:text-lg">
          Bloom the knowledge with blue
          <span className="mx-1.5 hidden opacity-60 sm:inline">·</span>
          <span className="block text-[8px] uppercase not-italic tracking-[0.14em] opacity-90 sm:inline sm:text-[10px] sm:tracking-[0.18em] md:text-[11px] md:tracking-[0.22em]">
            Presented by Dr. Vikram Ambalal Sarabhai House — Blue House
          </span>
        </p>
      </div>
      {/* Navigation bar */}
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2.5 sm:gap-4 sm:px-5 sm:py-3 md:px-8 md:py-4",
          scrolled ? "" : "bg-paper",
        )}
      >
        <a
          href="#top"
          className="min-w-0 whitespace-nowrap font-display text-sm tracking-tight text-ink sm:text-base md:text-lg"
        >
          Bapu <span className="italic text-ink-soft">Speaks</span>
        </a>
        <ul className="flex shrink-0 items-center gap-3 sm:gap-5 md:gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative whitespace-nowrap text-[9px] uppercase tracking-[0.1em] text-ink-soft transition-colors hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-saffron after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 sm:text-[10px] sm:tracking-[0.14em] md:text-[11px] md:tracking-[0.2em]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}