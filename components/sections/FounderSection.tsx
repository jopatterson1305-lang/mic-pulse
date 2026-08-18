import { Reveal } from "@/components/motion/Reveal";

export function FounderSection() {
  return <section className="section" id="founders"><div className="mic-container founder-layout">
    <Reveal><p className="eyebrow">06 / FOUNDERS</p><h2 className="display display-md">People building<br /><span>what comes next.</span></h2></Reveal>
    <Reveal className="founder-copy"><p>MIC tells the stories behind the companies, products and ideas moving East Africa forward.</p><a className="text-link" href="#newsletter">Meet the builders <span>↗</span></a></Reveal>
  </div></section>;
}
