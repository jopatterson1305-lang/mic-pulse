import { Hero } from "@/components/hero/Hero";
import { Navigation } from "@/components/sections/Navigation";
import { IntelligenceSection } from "@/components/sections/IntelligenceSection";
import { BusinessSection } from "@/components/sections/BusinessSection";
import { MarketPulse } from "@/components/sections/MarketPulse";
import { OpportunitiesSection } from "@/components/sections/OpportunitiesSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { FounderServices } from "@/components/sections/FounderServices";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return <main><Navigation /><Hero /><IntelligenceSection /><BusinessSection /><MarketPulse /><OpportunitiesSection /><FounderSection /><FounderServices /><Newsletter /><Footer /></main>;
}
