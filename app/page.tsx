import { Hero } from "@/components/hero/Hero";
import { Navigation } from "@/components/sections/Navigation";
import { IntelligenceSection } from "@/components/sections/IntelligenceSection";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <IntelligenceSection />
    </main>
  );
}
