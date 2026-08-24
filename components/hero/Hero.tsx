import { MarketGrid } from "@/components/motion/MarketGrid";

export function Hero() {
  return <section className="hero" id="top">
    <MarketGrid />
    <div className="hero-glow" />
    <div className="mic-container hero-inner">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">MIC PULSE / EAST AFRICA</p>
        <h1 className="display display-hero">THE INTELLIGENCE<br />BEHIND EAST AFRICA&apos;S<br /><span>NEXT GENERATION.</span></h1>
        <div className="hero-bottom"><p>Business, technology, finance and opportunity intelligence for the people building East Africa&apos;s future.</p><a className="primary-button" href="#pulse">Explore MIC <span>↓</span></a></div>
      </div>
      <div className="hero-status"><span className="status-dot" /> LIVE INTELLIGENCE / 01</div>
    </div>
  </section>;
}
