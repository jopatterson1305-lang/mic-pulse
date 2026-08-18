import { Reveal } from "@/components/motion/Reveal";

const items = [
  ["WHO OWNS WHAT?", "Map the companies, brands and industries shaping East Africa."],
  ["FOUNDER FILES", "The people, decisions and businesses behind the region's growth."],
  ["BUSINESS BREAKDOWNS", "Understand how companies make money, grow and compete."],
];

export function BusinessSection() {
  return <section className="section" id="business"><div className="mic-container">
    <Reveal><p className="eyebrow">02 / BUSINESS INTELLIGENCE</p><h2 className="display display-md">Understand the<br /><span>business behind it.</span></h2></Reveal>
    <div className="feature-grid">{items.map(([title, text], i) => <Reveal key={title} className="feature-card"><span className="card-index">0{i + 1}</span><h3>{title}</h3><p>{text}</p><span className="arrow">↗</span></Reveal>)}</div>
  </div></section>;
}
