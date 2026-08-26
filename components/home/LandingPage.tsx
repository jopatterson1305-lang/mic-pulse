import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { BusinessSection } from "@/components/sections/BusinessSection";
import { MarketPulse } from "@/components/sections/MarketPulse";
import { OpportunitiesSection } from "@/components/sections/OpportunitiesSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { FounderServices } from "@/components/sections/FounderServices";
import { Newsletter } from "@/components/sections/Newsletter";
import { SlideRail } from "@/components/motion/SlideRail";
import { CommunityShowcase } from "@/components/sections/CommunityShowcase";

const darEsSalaamImage = "/media/dar-es-salaam-night.jpg";

const ecosystemReasons = [
  ["Connections", "Meet the people moving ideas, capital and companies forward."],
  ["Opportunities", "Find the openings that turn ambition into momentum."],
  ["Exposure", "Put your work in front of the ecosystem that can move it."],
  ["Knowledge", "Build with sharper context, practical insight and regional perspective."],
  ["Collaboration", "Cross paths with builders who make better work together."],
  ["Access", "Stay close to Tanzania's wider innovation ecosystem."],
] as const;

export function LandingPage() {
  return <main className="landing-page landing-reference">
    <section className="reference-hero" id="top">
      <img className="reference-hero-image" src={darEsSalaamImage} alt="Dar es Salaam skyline at night" fetchPriority="high" />
      <div className="reference-hero-shade" />
      <div className="reference-hero-orbit reference-hero-orbit-one" />
      <div className="reference-hero-orbit reference-hero-orbit-two" />
      <div className="reference-container reference-hero-inner">
        <Reveal className="reference-hero-copy"><p className="eyebrow">MIC PULSE / EAST AFRICA</p><h1 className="reference-title">The signal<br /><span>behind the region.</span></h1><p className="reference-lede">Business, technology, finance and opportunity reporting for the people building East Africa&apos;s next chapter.</p><div className="reference-actions"><a className="reference-primary magnetic-button" href="#pulse">Explore MIC <span>↓</span></a><Link className="reference-secondary glass-surface magnetic-button" href="/search">Search the archive <span>↗</span></Link></div></Reveal>
        <Reveal className="reference-hero-panel glass-surface"><div className="reference-panel-top"><span>LIVE BRIEF</span><strong>01</strong></div><p>Context for the companies, founders, markets and opportunities moving East Africa forward.</p><div className="reference-panel-rule" /><div className="reference-panel-meta"><span>Dar es Salaam</span><span>06:24 EAT</span></div></Reveal>
      </div>
    </section>

    <section className="reference-intro" id="pulse"><div className="reference-container reference-intro-grid"><Reveal><p className="eyebrow">THE PULSE</p><h2 className="reference-heading">Make sense<br /><span>of what moves.</span></h2></Reveal><Reveal className="reference-intro-panel glass-surface"><p>MIC Pulse is an editorial platform for the people building, funding and understanding East Africa&apos;s future.</p><div className="reference-panel-links"><Link href="/articles">Read the latest stories <span>↗</span></Link><Link href="/about">About MIC Pulse <span>↗</span></Link></div></Reveal></div></section>

    <section className="reference-mission"><div className="reference-container"><Reveal className="reference-section-head"><div><p className="eyebrow">ABOUT MIC</p><h2 className="reference-heading">Motivate.<br /><span>Innovate. Create.</span></h2></div><p>MIC exists to give ambitious people the clarity, confidence and connections to build what matters in Tanzania and beyond.</p></Reveal><div className="reference-mission-grid"><Reveal className="reference-mission-statement glass-surface"><p>We motivate ambitious people, highlight innovators and create the conditions for meaningful ideas and businesses to grow.</p><Link href="/about">Read the MIC story <span>↗</span></Link></Reveal><div className="reference-mission-list"><Reveal><span>01</span><strong>Motivate</strong><p>Turn ambition into movement.</p></Reveal><Reveal><span>02</span><strong>Innovate</strong><p>Connect people to better possibilities.</p></Reveal><Reveal><span>03</span><strong>Create</strong><p>Build opportunities that last.</p></Reveal></div></div></div></section>

    <section className="reference-slide-section"><div className="reference-container"><Reveal className="reference-section-head"><div><p className="eyebrow">THE MIC RAIL</p><h2 className="reference-heading">Explore the<br /><span>ecosystem.</span></h2></div><p>Use the rail to move through the business, market, opportunity, and founder views that shape MIC Pulse.</p></Reveal><Reveal><SlideRail /></Reveal></div></section>

    <BusinessSection />
    <MarketPulse />
    <OpportunitiesSection />
    <CommunityShowcase />

    <section className="reference-ecosystem"><div className="reference-container"><Reveal className="reference-section-head"><div><p className="eyebrow">JOIN MIC</p><h2 className="reference-heading">Build closer<br /><span>to the people.</span></h2></div><p>MIC is for founders, innovators, investors, builders and ambitious young people who want to move with the ecosystem, not around it.</p></Reveal><div className="reference-ecosystem-grid">{ecosystemReasons.map(([title, text], index) => <Reveal key={title} className="reference-ecosystem-card glass-surface"><span className="reference-card-index">0{index + 1}</span><strong>{title}</strong><p>{text}</p></Reveal>)}</div><Reveal className="reference-ecosystem-cta"><p>Come for the signal. Stay for what you can build together.</p><Link className="reference-primary magnetic-button" href="/#newsletter">Join the ecosystem <span>↗</span></Link></Reveal></div></section>

    <section className="reference-interlude"><div className="reference-container reference-interlude-grid"><Reveal><p className="eyebrow">THE REGION</p><h2 className="reference-heading">Designed for<br /><span>what comes next.</span></h2></Reveal><Reveal className="reference-orbit-panel glass-surface"><div className="orbit-lines"><span /><span /><span /></div><div className="reference-orbit-copy"><strong>East Africa</strong><p>Build with better information. Move with clearer intent.</p><Link href="/founders">Meet the builders <span>↗</span></Link></div></Reveal></div></section>

    <FounderSection />
    <FounderServices />
    <Newsletter />
  </main>;
}
