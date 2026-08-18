import { Reveal } from "@/components/motion/Reveal";

const tags = ["SCHOLARSHIPS", "FUNDING", "GRANTS", "EVENTS", "JOBS", "COMPETITIONS"];

export function OpportunitiesSection() {
  return <section className="section section-accent" id="opportunities"><div className="mic-container opportunity-layout">
    <Reveal><p className="eyebrow">05 / OPPORTUNITIES</p><h2 className="display display-md">Find where<br />the <span>door opens.</span></h2></Reveal>
    <Reveal className="opportunity-panel"><p>One place for the opportunities worth knowing about across East Africa and beyond.</p><div className="tag-list">{tags.map(tag => <span key={tag}>{tag}</span>)}</div></Reveal>
  </div></section>;
}
