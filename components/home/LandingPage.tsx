import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { BusinessSection } from "@/components/sections/BusinessSection";
import { MarketPulse } from "@/components/sections/MarketPulse";
import { OpportunitiesSection } from "@/components/sections/OpportunitiesSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { FounderServices } from "@/components/sections/FounderServices";
import { Newsletter } from "@/components/sections/Newsletter";

const media = {
  bridge: "/media/tanzania-bridge.jpg",
  business: "/media/dar-es-salaam-business-district.jpg",
  night: "/media/dar-es-salaam-night.jpg",
  askari: "/media/askari-monument.jpg",
  kilimanjaro: "/media/kilimanjaro.jpg",
  aerial: "/media/dar-es-salaam-aerial.jpg",
  street: "/media/dar-es-salaam-street.jpg",
};

export function LandingPage() {
  return <main className="landing-page">
    <section className="landing-hero" id="top">
      <img className="landing-hero-media" src={media.bridge} alt="Dar es Salaam skyline and bridge over the coast" fetchPriority="high" />
      <div className="landing-hero-overlay" />
      <div className="landing-hero-grid" />
      <div className="landing-hero-content mic-container">
        <Reveal><p className="eyebrow">MIC PULSE / EAST AFRICA</p><h1 className="landing-display">The signal<br /><span>behind the region.</span></h1><p className="landing-hero-lede">Business, technology, finance and opportunity intelligence for the people building East Africa&apos;s next chapter.</p><div className="landing-hero-actions"><a className="primary-button landing-button" href="#pulse">Explore MIC <span>↓</span></a><Link className="glass-button" href="/search">Search the archive <span>↗</span></Link></div></Reveal>
        <Reveal className="landing-hero-rail"><div><span className="rail-kicker">LIVE INTELLIGENCE</span><strong>01</strong></div><p>Clear context for the companies, founders, markets and opportunities moving East Africa forward.</p></Reveal>
      </div>
    </section>

    <section className="landing-intro section" id="pulse"><div className="mic-container landing-intro-grid"><Reveal><p className="eyebrow">01 / THE PULSE</p><h2 className="display display-md">Make sense<br /><span>of what moves.</span></h2></Reveal><Reveal className="landing-intro-copy"><p>MIC Pulse is an editorial intelligence platform for the people building, funding and understanding East Africa&apos;s future.</p><div className="landing-link-row"><Link className="text-link" href="/articles">Read the latest stories ↗</Link><Link className="text-link" href="/about">About MIC Pulse ↗</Link></div></Reveal></div></section>

    <section className="landing-photo-band"><div className="mic-container landing-photo-grid"><Reveal className="photo-feature"><img src={media.business} alt="Modern business district in Dar es Salaam" loading="lazy" /><div className="photo-caption"><span>BUSINESS / DAR ES SALAAM</span><strong>Where capital, infrastructure and ambition meet.</strong></div></Reveal><Reveal className="photo-stack"><div className="photo-card"><img src={media.askari} alt="Askari Monument in Dar es Salaam" loading="lazy" /><span>REGION / MEMORY</span></div><div className="photo-card"><img src={media.street} alt="Dar es Salaam street with city buildings and a bus" loading="lazy" /><span>REGION / MOMENTUM</span></div></Reveal></div></section>

    <BusinessSection />
    <section className="landing-context section section-dark"><div className="mic-container landing-context-grid"><Reveal><div className="context-image-wrap"><img src={media.aerial} alt="Aerial view of Dar es Salaam buildings" loading="lazy" /><span className="image-label">THE CITY / IN MOTION</span></div></Reveal><Reveal><p className="eyebrow">03 / REGIONAL CONTEXT</p><h2 className="display display-md">Read the city<br /><span>behind the signal.</span></h2><p className="section-lede">From the street to the skyline, the region&apos;s next story is being built in public. We follow the decisions, systems and people shaping it.</p><Link className="text-link" href="/companies">Explore the company directory ↗</Link></Reveal></div></section>
    <MarketPulse />
    <OpportunitiesSection />
    <section className="landing-night-panel"><img src={media.night} alt="Dar es Salaam skyline at night" loading="lazy" /><div className="landing-night-overlay" /><div className="mic-container landing-night-content"><Reveal><p className="eyebrow">05 / AFTER DARK</p><h2 className="display display-md">The region<br /><span>does not slow down.</span></h2><p className="section-lede">Follow the people and systems working after the headlines move on.</p><Link className="glass-button" href="/events">See what&apos;s happening <span>↗</span></Link></Reveal></div></section>
    <FounderSection />
    <FounderServices />
    <section className="landing-close-panel"><img src={media.kilimanjaro} alt="Mount Kilimanjaro and acacia tree in Tanzania" loading="lazy" /><div className="landing-close-overlay" /><div className="mic-container landing-close-content"><Reveal><p className="eyebrow">08 / MIC PULSE</p><h2 className="display display-md">Stay close to<br /><span>what&apos;s next.</span></h2><p className="section-lede">A clearer view of East Africa, delivered with intention.</p></Reveal></div></section>
    <Newsletter />
  </main>;
}
