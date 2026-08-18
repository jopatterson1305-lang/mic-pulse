import { Reveal } from "@/components/motion/Reveal";

const signals = [
  ["DSE", "Market intelligence", "+12.4%"],
  ["FINTECH", "Digital finance", "RISING"],
  ["STARTUPS", "Venture activity", "ACTIVE"],
];

export function MarketPulse() {
  return <section className="section section-dark" id="market-pulse">
    <div className="mic-container">
      <Reveal><p className="eyebrow">03 / MARKET PULSE</p><h2 className="display display-md">Know the signal<br /><span>before the noise.</span></h2></Reveal>
      <div className="signal-grid">
        {signals.map(([name, label, value]) => <Reveal key={name} className="signal-card"><div><span className="signal-name">{name}</span><p>{label}</p></div><strong>{value}</strong></Reveal>)}
      </div>
    </div>
  </section>;
}
