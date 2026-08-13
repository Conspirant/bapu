/**
 * Single source of truth for all editable content on Bapu Speaks.
 * Edit this file to change messages, notices, timeline entries and audio.
 */

/* ------------------------------------------------------------------ */
/* AUDIO — replace `src` with your own recording (e.g. an MP3 you own). */
/* Put the file in `public/audio/` and reference it as "/audio/....mp3" */
/* ------------------------------------------------------------------ */
export const audioConfig = {
  src: "/audio/gandhi-message.mp3",
  title: "Today's Message",
  /** Spoken by a school reader — not a historical recording. */
  credit: "Read aloud by a student volunteer",
  /** Used only while no real file is present, so the player stays demoable. */
  fallbackDurationSeconds: 42,
};

export const todaysMessage = {
  heading: "Today's Message",
  quote: "Be the change you wish to see in the world.",
  attributionNote:
    "Popularly associated with Gandhi, this exact wording does not appear in his collected writings. It is a modern paraphrase of his idea that change in the world begins with change in ourselves.",
  reflection:
    "A reminder for the school day: the smallest honest act — returning what isn't yours, speaking up for someone, cleaning what you did not dirty — is where any larger change starts.",
};

export type DiscoverItem = {
  id: string;
  index: string;
  label: string;
  title: string;
  subtitle: string;
  body: string[];
  facts: { k: string; v: string }[];
};

export const discoverItems: DiscoverItem[] = [
  {
    id: "early-life",
    index: "01",
    label: "Early Life",
    title: "Early Life",
    subtitle: "1869 — Porbandar",
    body: [
      "Mohandas Karamchand Gandhi was born on 2 October 1869 in Porbandar, a coastal town in present-day Gujarat. His father served as a senior official in the local princely state; his mother was known for her religious observance and fasting.",
      "He married Kasturba in 1883, while both were teenagers, and travelled to London in 1888 to study law, qualifying as a barrister in 1891.",
    ],
    facts: [
      { k: "Born", v: "2 October 1869" },
      { k: "Place", v: "Porbandar, Gujarat" },
      { k: "Studied", v: "Law, London (1888–1891)" },
    ],
  },
  {
    id: "struggle",
    index: "02",
    label: "The Struggle",
    title: "The Struggle",
    subtitle: "South Africa → India",
    body: [
      "In 1893 Gandhi sailed to South Africa on a one-year legal contract and stayed for more than two decades. Confronted with racial discrimination against Indians there, he began organising petitions, strikes and mass refusals of unjust laws.",
      "It was in South Africa that he developed satyagraha — literally 'holding firmly to truth' — a method of disciplined, non-violent resistance. He returned to India in 1915.",
    ],
    facts: [
      { k: "Arrived", v: "South Africa, 1893" },
      { k: "Method", v: "Satyagraha" },
      { k: "Returned", v: "India, 1915" },
    ],
  },
  {
    id: "movement",
    index: "03",
    label: "The Movement",
    title: "The Movement",
    subtitle: "Non-violence & Civil Disobedience",
    body: [
      "Back in India, Gandhi became a central figure in the Indian National Congress. He led campaigns of non-cooperation and civil disobedience, urging Indians to withdraw consent from unjust rule rather than answer it with violence.",
      "In March 1930 he walked roughly 385 km from Sabarmati to Dandi to make salt from seawater, breaking the colonial salt law. In 1942 he called for the British to Quit India.",
    ],
    facts: [
      { k: "Salt March", v: "March–April 1930" },
      { k: "Quit India", v: "August 1942" },
      { k: "Principle", v: "Ahimsa (non-violence)" },
    ],
  },
  {
    id: "legacy",
    index: "04",
    label: "The Legacy",
    title: "The Legacy",
    subtitle: "Truth. Peace. Simplicity.",
    body: [
      "Gandhi was assassinated in New Delhi on 30 January 1948, months after Indian independence. He left behind an enormous body of writing, including his autobiography 'The Story of My Experiments with Truth'.",
      "His methods influenced later civil-rights and freedom movements around the world. Historians continue to study and debate his life and views — reading his own words is the best place to begin.",
    ],
    facts: [
      { k: "Died", v: "30 January 1948" },
      { k: "Autobiography", v: "Experiments with Truth" },
      { k: "Observed", v: "2 October — Gandhi Jayanti" },
    ],
  },
];

export const timeline = [
  { year: "1869", title: "Born in Porbandar", note: "2 October, in coastal Gujarat." },
  { year: "1893", title: "Went to South Africa", note: "A legal contract that became a 21-year stay." },
  { year: "1915", title: "Returned to India", note: "Began travelling the country before leading campaigns." },
  { year: "1930", title: "Salt March", note: "A 24-day march to Dandi to break the salt law." },
  { year: "1942", title: "Quit India Movement", note: "A mass call for the end of colonial rule." },
  { year: "1948", title: "Passed away", note: "Assassinated in New Delhi on 30 January." },
];

export type Notice = {
  id: string;
  label: "Event" | "Competition" | "Announcement";
  title: string;
  date: string;
  detail: string;
  tilt: number;
};

/** Edit, add or remove notices here — the board renders whatever is listed. */
export const notices: Notice[] = [
  {
    id: "independence-day",
    label: "Event",
    title: "Independence Day Programme",
    date: "15 August",
    detail: "Main Auditorium · Assembly at 8:00 AM",
    tilt: -1.4,
  },
  {
    id: "inter-house-quiz",
    label: "Competition",
    title: "Inter-House Quiz",
    date: "20 August",
    detail: "Registration closes soon · See your house captain",
    tilt: 0.9,
  },
  {
    id: "essay-competition",
    label: "Announcement",
    title: "Essay Competition",
    date: "Entries open",
    detail: "Theme: Truth, Peace & India · 600 words max",
    tilt: -0.6,
  },
];

export const navLinks = [
  { label: "Today", href: "#today" },
  { label: "His Story", href: "#his-story" },
  { label: "Members", href: "#members" },
];