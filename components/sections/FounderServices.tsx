import { Reveal } from "@/components/motion/Reveal";

const services = ["VALIDATE", "GROW", "CONNECT", "RAISE"];

export function FounderServices() {
  return <section className="section section-dark" id="for-founders"><div className="mic-container">
    <Reveal><p className="eyebrow">07 / MIC FOR FOUNDERS</p><h2 className="display display-md">From idea to<br /><span>momentum.</span></h2><p className="section-lede">For founders building something that matters. Validate the opportunity, reach customers, connect to the ecosystem and prepare for capital.</p></Reveal>
    <div className="service-grid">{services.map((service, i) => <Reveal key={service} className="service-card"><span>0{i + 1}</span><strong>{service}</strong></Reveal>)}</div>
  </div></section>;
}
