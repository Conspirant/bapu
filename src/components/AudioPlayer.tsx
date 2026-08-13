import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX, Mic, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { audioConfig, todaysMessage } from "@/data/site-content";
import { cn } from "@/lib/utils";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const BAR_COUNT = 40;
const BAR_SEED = Array.from(
  { length: BAR_COUNT },
  (_, i) =>
    Math.round(
      (0.35 + Math.abs(Math.sin(i * 1.7) * 0.45) + Math.abs(Math.cos(i * 0.6) * 0.2)) * 1000,
    ) / 10,
);

function Waveform({ playing, progress }: { playing: boolean; progress: number }) {
  return (
    <div className="flex h-10 items-end gap-[2px] sm:h-12 sm:gap-[3px]" aria-hidden="true">
      {BAR_SEED.map((h, i) => {
        const passed = i / BAR_COUNT <= progress;
        return (
          <motion.span
            key={i}
            className={cn(
              "w-full min-w-[2px] origin-bottom rounded-[1px] transition-colors duration-200",
              passed ? "bg-surface" : "bg-rule",
            )}
            style={{ height: `${h}%` }}
            animate={
              playing
                ? { scaleY: [1, 0.4 + ((i * 41) % 65) / 100, 1] }
                : { scaleY: 1 }
            }
            transition={
              playing
                ? {
                    duration: 0.7 + ((i * 17) % 7) / 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 8) * 0.05,
                  }
                : { duration: 0.3 }
            }
          />
        );
      })}
    </div>
  );
}

const TTS_TEXT = `Today's message. ${todaysMessage.quote}. ${todaysMessage.reflection}`;

function estimateTTSDuration(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.ceil((words / 140) * 60);
}

const MALE_KEYWORDS = [
  "male",
  "david",
  "george",
  "rishi",
  "daniel",
  "james",
  "guy",
  "stefan",
  "alex",
  "fred",
  "mark",
  "prabhat",
  "google uk english male",
  "google us english male",
];

const FEMALE_KEYWORDS = [
  "female",
  "zira",
  "hazel",
  "heera",
  "susan",
  "catherine",
  "samantha",
  "victoria",
  "karen",
  "veena",
  "fiona",
  "eva",
];

/** Filters available browser voices specifically for male voices, defaulting to Indian English (en-IN) male voice */
function getMaleVoices(): SpeechSynthesisVoice[] {
  if (typeof speechSynthesis === "undefined") return [];
  const voices = speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return [];

  // Filter out any explicitly female voices
  const filtered = voices.filter(
    (v) =>
      v.lang.startsWith("en") &&
      !FEMALE_KEYWORDS.some((fk) => v.name.toLowerCase().includes(fk)),
  );

  const list = filtered.length > 0 ? filtered : voices;

  // Sort logic:
  // 1. Indian English Male Voice (en-IN) -> FIRST / DEFAULT PRIORITY
  // 2. Other Male voices
  // 3. Rest of voices
  return [...list].sort((a, b) => {
    const aIsIndian =
      a.lang.toLowerCase().includes("in") ||
      a.name.toLowerCase().includes("india") ||
      a.name.toLowerCase().includes("rishi") ||
      a.name.toLowerCase().includes("prabhat");
    const bIsIndian =
      b.lang.toLowerCase().includes("in") ||
      b.name.toLowerCase().includes("india") ||
      b.name.toLowerCase().includes("rishi") ||
      b.name.toLowerCase().includes("prabhat");

    if (aIsIndian && !bIsIndian) return -1;
    if (!aIsIndian && bIsIndian) return 1;

    const aMale = MALE_KEYWORDS.some((mk) => a.name.toLowerCase().includes(mk));
    const bMale = MALE_KEYWORDS.some((mk) => b.name.toLowerCase().includes(mk));
    if (aMale && !bMale) return -1;
    if (!aMale && bMale) return 1;

    return 0;
  });
}

export function AudioPlayer({ className }: { className?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [ready, setReady] = useState(false);
  const [ttsMode, setTtsMode] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(audioConfig.fallbackDurationSeconds);
  const [volume, setVolume] = useState(0.9);
  const [muted, setMuted] = useState(false);

  const [maleVoices, setMaleVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>("");

  const ttsDuration = estimateTTSDuration(TTS_TEXT);

  // Load and pick male voices
  useEffect(() => {
    if (typeof speechSynthesis === "undefined") return;

    const loadVoices = () => {
      const voices = getMaleVoices();
      setMaleVoices(voices);
      if (voices.length > 0 && !selectedVoiceName && voices[0]) {
        setSelectedVoiceName(voices[0].name);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, [selectedVoiceName]);

  // Audio volume sync
  useEffect(() => {
    const el = audioRef.current;
    if (el) el.volume = muted ? 0 : volume;
  }, [volume, muted]);

  const stopTTS = useCallback(() => {
    if (typeof speechSynthesis !== "undefined") {
      speechSynthesis.cancel();
    }
    utteranceRef.current = null;
  }, []);

  const startTTS = useCallback(() => {
    if (typeof speechSynthesis === "undefined") return;

    stopTTS();

    const utterance = new SpeechSynthesisUtterance(TTS_TEXT);
    utterance.rate = 0.92;
    utterance.pitch = 0.95; // Slightly lower pitch for a calm, natural male voice
    utterance.volume = muted ? 0 : volume;

    // Attach selected male voice
    const voiceToUse =
      maleVoices.find((v) => v.name === selectedVoiceName) || maleVoices[0];
    if (voiceToUse) {
      utterance.voice = voiceToUse;
    }

    // Precise real-time word boundary sync
    utterance.onboundary = (event) => {
      if (event.charIndex !== undefined && TTS_TEXT.length > 0) {
        const ratio = Math.min(event.charIndex / TTS_TEXT.length, 1);
        setCurrent(ratio * ttsDuration);
      }
    };

    utterance.onend = () => {
      setPlaying(false);
      setCurrent(0);
    };

    utterance.onerror = () => {
      setPlaying(false);
      setCurrent(0);
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
    setPlaying(true);
    setDuration(ttsDuration);
  }, [muted, volume, stopTTS, ttsDuration, maleVoices, selectedVoiceName]);

  const toggle = useCallback(() => {
    if (ttsMode) {
      if (typeof speechSynthesis !== "undefined") {
        if (speechSynthesis.speaking) {
          if (speechSynthesis.paused) {
            speechSynthesis.resume();
            setPlaying(true);
          } else {
            speechSynthesis.pause();
            setPlaying(false);
          }
          return;
        }
      }
      setCurrent(0);
      startTTS();
      return;
    }

    const el = audioRef.current;
    if (!el || !ready) {
      setPlaying((p) => !p);
      return;
    }
    if (el.paused) {
      void el.play().then(
        () => setPlaying(true),
        () => {
          setTtsMode(true);
          setCurrent(0);
          startTTS();
        },
      );
    } else {
      el.pause();
      setPlaying(false);
    }
  }, [ready, ttsMode, startTTS]);

  // Update volume live
  useEffect(() => {
    if (utteranceRef.current && ttsMode && playing) {
      utteranceRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted, ttsMode, playing]);

  // Hero button listener
  useEffect(() => {
    const handler = () => {
      if (!playing) toggle();
    };
    window.addEventListener("bapu:play", handler);
    return () => window.removeEventListener("bapu:play", handler);
  }, [playing, toggle]);

  useEffect(() => {
    return () => stopTTS();
  }, [stopTTS]);

  const seek = (value: number) => {
    const next = Math.min(Math.max(value, 0), duration);
    setCurrent(next);
    const el = audioRef.current;
    if (el && ready && !ttsMode) el.currentTime = next;
  };

  const progress = duration > 0 ? current / duration : 0;
  const activeVoice = maleVoices.find((v) => v.name === selectedVoiceName) || maleVoices[0];

  return (
    <div
      className={cn(
        "border border-border bg-card px-4 py-5 transition-all duration-500 sm:px-5 sm:py-6 md:px-8 md:py-8",
        playing ? "shadow-[0_18px_40px_-28px_oklch(0.14_0.04_250/0.45)] ring-1 ring-saffron/30" : "",
        className,
      )}
    >
      <audio
        ref={audioRef}
        src={audioConfig.src}
        preload="metadata"
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration;
          if (Number.isFinite(d) && d > 0) setDuration(d);
          setReady(true);
        }}
        onTimeUpdate={(e) => {
          if (!ttsMode) setCurrent(e.currentTarget.currentTime);
        }}
        onEnded={() => {
          setPlaying(false);
          setCurrent(0);
        }}
        onError={() => {
          setTtsMode(true);
          setDuration(ttsDuration);
        }}
      />

      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:gap-4 md:gap-6">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause message" : "Play message"}
          aria-pressed={playing}
          className="group grid size-12 shrink-0 place-items-center rounded-full border border-surface bg-surface text-paper transition-all duration-200 hover:bg-transparent hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-saffron active:scale-95 sm:size-14 md:size-16"
        >
          {playing ? (
            <Pause className="size-4 sm:size-5" strokeWidth={1.5} />
          ) : (
            <Play className="size-4 translate-x-[1px] sm:size-5" strokeWidth={1.5} />
          )}
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="eyebrow">{audioConfig.title}</p>
            {ttsMode && (
              <span className="inline-flex items-center gap-1 rounded-full bg-saffron/15 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-saffron">
                <Mic className="size-2.5" />
                Male Voice
              </span>
            )}
          </div>
          <p className="mt-1 truncate font-display text-base text-ink sm:text-lg">
            {playing ? "Speaking..." : "Ready to play"}
          </p>
          {ttsMode && activeVoice && (
            <p className="mt-0.5 truncate text-[11px] font-medium text-ink-soft">
              Voice: <span className="text-ink">{activeVoice.name.replace(/Microsoft |Google /g, "")}</span>
            </p>
          )}
        </div>
      </div>

      {/* Male Voice Selector if multiple voices are available */}
      {ttsMode && maleVoices.length > 1 && (
        <div className="mt-4 border-t border-border/60 pt-3">
          <label htmlFor="male-voice-select" className="sr-only">
            Select Male Voice
          </label>
          <div className="relative">
            <select
              id="male-voice-select"
              value={selectedVoiceName}
              onChange={(e) => {
                setSelectedVoiceName(e.target.value);
                if (playing) {
                  stopTTS();
                  setPlaying(false);
                }
              }}
              className="w-full cursor-pointer appearance-none rounded border border-border bg-paper-deep/60 px-3 py-1.5 pr-8 text-[11px] font-medium text-ink transition-colors hover:border-saffron/50 focus:outline-none focus:ring-1 focus:ring-saffron"
            >
              {maleVoices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name.replace(/Microsoft |Google /g, "")} ({v.lang})
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-soft" />
          </div>
        </div>
      )}

      {/* Dynamic Animated Waveform */}
      <div className="mt-4 sm:mt-6">
        <Waveform playing={playing} progress={progress} />
      </div>

      {/* Seek & Timer */}
      <div className="mt-4 flex items-center gap-3 sm:mt-5 sm:gap-4">
        <span className="w-9 shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground sm:w-10 sm:text-xs">
          {formatTime(current)}
        </span>
        <label className="sr-only" htmlFor="seek">
          Seek
        </label>
        <input
          id="seek"
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={current}
          onChange={(e) => seek(Number(e.target.value))}
          className="h-1 w-full cursor-pointer appearance-none bg-rule accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-saffron"
          style={{
            background: `linear-gradient(to right, var(--ink) ${progress * 100}%, var(--rule) ${progress * 100}%)`,
          }}
        />
        <span className="w-9 shrink-0 text-right font-mono text-[11px] tabular-nums text-muted-foreground sm:w-10 sm:text-xs">
          {formatTime(duration)}
        </span>
      </div>

      {/* Bottom Controls Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 sm:mt-5 sm:gap-4 sm:pt-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute" : "Mute"}
            className="text-ink-soft transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-saffron"
          >
            {muted || volume === 0 ? (
              <VolumeX className="size-4" strokeWidth={1.5} />
            ) : (
              <Volume2 className="size-4" strokeWidth={1.5} />
            )}
          </button>
          <label className="sr-only" htmlFor="volume">
            Volume
          </label>
          <input
            id="volume"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              setMuted(false);
            }}
            className="h-1 w-20 cursor-pointer appearance-none bg-rule accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-saffron sm:w-24"
          />
        </div>
        <p className="text-[11px] text-muted-foreground sm:text-xs">
          {ttsMode
            ? `Male Reader (${activeVoice ? activeVoice.name.replace(/Microsoft |Google /g, "") : "Male Voice"})`
            : audioConfig.credit}
        </p>
      </div>
    </div>
  );
}