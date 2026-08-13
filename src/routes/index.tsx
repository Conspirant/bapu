import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/sections/Hero";
import { TodaysMessage } from "@/components/sections/TodaysMessage";
import { Discover } from "@/components/sections/Discover";
import { Timeline } from "@/components/sections/Timeline";
import { QrSection } from "@/components/sections/QrSection";
import { Closing } from "@/components/sections/Closing";

const title = "Bapu Speaks — An Interactive School Notice Board";
const description =
  "Scan, listen and discover: a museum-style school exhibit with today's message, Gandhi's story, and timeline.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="grain min-h-screen bg-paper">
      <SiteNav />
      <main>
        <Hero />
        <TodaysMessage />
        <Discover />
        <Timeline />
        <QrSection />
      </main>
      <Closing />
    </div>
  );
}
