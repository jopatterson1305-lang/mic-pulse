import { Reveal } from "@/components/motion/Reveal";

const pillars = [["01","BUSINESS","Companies, founders and the forces shaping East African markets."],["02","TECHNOLOGY","AI, fintech and the digital economy — without the noise."],["03","OPPORTUNITY","Funding, events, scholarships and openings worth knowing about."]];

export function IntelligenceSection(){return <section className="section" id="intelligence"><div className="mic-container"><Reveal><p className="eyebrow">01 / MIC INTELLIGENCE</p><h2 className="display display-md">The signal for<br /><span>what&apos;s next.</span></h2><p className="section-lede">MIC turns business, technology, finance and opportunity into clear intelligence for East Africa&apos;s next generation of builders.</p></Reveal><div className="feature-grid">{pillars.map(([n,t,d])=><Reveal className="feature-card" key={n}><span className="card-index">{n}</span><h3>{t}</h3><p>{d}</p><span className="arrow">↗</span></Reveal>)}</div></div></section>}
